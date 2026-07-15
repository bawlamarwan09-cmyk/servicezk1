import { NextResponse } from "next/server";
import { isServiceOption } from "../../site-config";
import type {
  ApprovedReview,
  ReviewFieldErrors,
} from "../../reviews";

const MAX_REQUEST_BYTES = 8_192;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000;
const RATE_LIMIT_EMAIL_MAX = 4;
const RATE_LIMIT_IP_MAX = 8;
const REVIEW_LIMIT_DEFAULT = 12;
const REVIEW_LIMIT_MAX = 24;
const MAX_FEED_RESPONSE_BYTES = 64 * 1_024;
const ALLOWED_POST_FIELDS = new Set([
  "name",
  "email",
  "rating",
  "review",
  "service",
  "consentToPublish",
  "website",
  "formStartedAt",
]);

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalReviewRateLimit = globalThis as typeof globalThis & {
  evoluraReviewRateLimit?: Map<string, RateLimitEntry>;
  evoluraReviewRateLimitCleanupAt?: number;
};

const reviewRateLimit =
  globalReviewRateLimit.evoluraReviewRateLimit ?? new Map<string, RateLimitEntry>();
globalReviewRateLimit.evoluraReviewRateLimit = reviewRateLimit;

function json(
  body: Record<string, unknown>,
  init: ResponseInit & { cacheControl?: string } = {},
) {
  const { cacheControl = "no-store", ...responseInit } = init;
  const response = NextResponse.json(body, responseInit);
  response.headers.set("Cache-Control", cacheControl);
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

function normalizedSingleLine(value: unknown, maxLength: number) {
  return String(value ?? "")
    .normalize("NFKC")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function normalizedReview(value: unknown, maxLength: number) {
  return String(value ?? "")
    .normalize("NFKC")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(value: string) {
  if (value.length > 254 || /[\r\n]/.test(value)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function requestIsSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function configuredUrl(name: "N8N_REVIEW_SUBMIT_URL" | "N8N_REVIEW_FEED_URL") {
  const value = process.env[name]?.trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    const localDevelopmentUrl =
      process.env.NODE_ENV !== "production" &&
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1"].includes(url.hostname);

    if (url.protocol !== "https:" && !localDevelopmentUrl) return null;
    return url;
  } catch {
    return null;
  }
}

function n8nHeaders() {
  const secret = process.env.N8N_REVIEW_WEBHOOK_SECRET?.trim();
  if (!secret) return null;

  return {
    Accept: "application/json",
    Authorization: `Bearer ${secret}`,
  };
}

async function hashedRateLimitIdentifier(value: string, label: string) {
  const salt =
    process.env.REVIEW_RATE_LIMIT_SECRET ||
    process.env.N8N_REVIEW_WEBHOOK_SECRET ||
    "evolura-review-rate-limit-v1";
  const encoded = new TextEncoder().encode(`${salt}\u0000${label}\u0000${value}`);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

async function transientClientKeys(request: Request, email: string) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip =
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    forwardedFor ||
    null;

  const [ipHash, emailHash] = await Promise.all([
    ip ? hashedRateLimitIdentifier(ip, "ip") : Promise.resolve(null),
    hashedRateLimitIdentifier(email, "email"),
  ]);
  return { ipHash, emailHash };
}

function consumeTransientRateLimit(key: string, maximum: number) {
  const now = Date.now();

  if ((globalReviewRateLimit.evoluraReviewRateLimitCleanupAt ?? 0) <= now) {
    for (const [storedKey, entry] of reviewRateLimit) {
      if (entry.resetAt <= now) reviewRateLimit.delete(storedKey);
    }
    globalReviewRateLimit.evoluraReviewRateLimitCleanupAt =
      now + RATE_LIMIT_WINDOW_MS;
  }

  if (reviewRateLimit.size > 2_000) {
    while (reviewRateLimit.size > 1_800) {
      const oldestKey = reviewRateLimit.keys().next().value as string | undefined;
      if (!oldestKey) break;
      reviewRateLimit.delete(oldestKey);
    }
  }

  const current = reviewRateLimit.get(key);
  if (!current || current.resetAt <= now) {
    reviewRateLimit.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= maximum) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function validationResponse(fieldErrors: ReviewFieldErrors) {
  return json(
    {
      success: false,
      code: "VALIDATION_ERROR",
      message: "Please review the highlighted fields.",
      fieldErrors,
    },
    { status: 422 },
  );
}

function parseApprovedReview(value: unknown): ApprovedReview | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const row = value as Record<string, unknown>;
  const name = normalizedSingleLine(row.name ?? row.customer_name, 80);
  const review = normalizedReview(row.review, 1_000);
  const rating = Number(row.rating);
  const serviceValue = normalizedSingleLine(row.service, 160);
  const createdAtValue = normalizedSingleLine(
    row.createdAt ?? row.created_at ?? row.approved_at,
    64,
  );
  const createdAtDate = createdAtValue ? new Date(createdAtValue) : null;

  if (
    name.length < 2 ||
    review.length < 10 ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    return null;
  }

  return {
    name,
    rating: rating as ApprovedReview["rating"],
    review,
    service: serviceValue && isServiceOption(serviceValue) ? serviceValue : null,
    createdAt:
      createdAtDate && !Number.isNaN(createdAtDate.getTime())
        ? createdAtDate.toISOString()
        : null,
  };
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const parameterNames = Array.from(requestUrl.searchParams.keys());
  const limitValues = requestUrl.searchParams.getAll("limit");
  const requestedLimit = limitValues.length === 1 ? Number(limitValues[0]) : null;
  const invalidLimit =
    limitValues.length === 1 &&
    (!Number.isInteger(requestedLimit) ||
      requestedLimit === null ||
      requestedLimit < 1 ||
      requestedLimit > REVIEW_LIMIT_MAX ||
      String(requestedLimit) !== limitValues[0]);

  if (
    parameterNames.some((name) => name !== "limit") ||
    limitValues.length > 1 ||
    invalidLimit
  ) {
    return json(
      { success: false, message: "The review feed request is not valid." },
      { status: 400 },
    );
  }

  const limit = requestedLimit ?? REVIEW_LIMIT_DEFAULT;

  const feedUrl = configuredUrl("N8N_REVIEW_FEED_URL");
  const headers = n8nHeaders();
  if (!feedUrl || !headers) {
    return json(
      {
        success: false,
        message: "Approved reviews are temporarily unavailable.",
      },
      { status: 503 },
    );
  }

  feedUrl.searchParams.set("limit", String(limit));

  try {
    const upstream = await fetch(feedUrl, {
      method: "GET",
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (!upstream.ok) {
      return json(
        {
          success: false,
          message: "Approved reviews are temporarily unavailable.",
        },
        { status: 503 },
      );
    }

    const upstreamLength = Number(upstream.headers.get("content-length") ?? "0");
    if (Number.isFinite(upstreamLength) && upstreamLength > MAX_FEED_RESPONSE_BYTES) {
      throw new Error("Review feed response is too large");
    }

    const upstreamText = await upstream.text();
    if (new TextEncoder().encode(upstreamText).byteLength > MAX_FEED_RESPONSE_BYTES) {
      throw new Error("Review feed response is too large");
    }

    const payload = (() => {
      try {
        return JSON.parse(upstreamText) as { reviews?: unknown } | unknown[];
      } catch {
        return null;
      }
    })();
    const rows = Array.isArray(payload)
      ? payload
      : payload && Array.isArray(payload.reviews)
        ? payload.reviews
        : [];
    const reviews = rows
      .map(parseApprovedReview)
      .filter((review): review is ApprovedReview => Boolean(review))
      .slice(0, limit);

    return json(
      { success: true, reviews },
      {
        status: 200,
        cacheControl: "public, s-maxage=300, stale-while-revalidate=3600",
      },
    );
  } catch {
    return json(
      {
        success: false,
        message: "Approved reviews are temporarily unavailable.",
      },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  if (!requestIsSameOrigin(request)) {
    return json(
      { success: false, message: "This request is not allowed." },
      { status: 403 },
    );
  }

  const contentType = request.headers.get("content-type")?.split(";", 1)[0]?.trim();
  if (contentType !== "application/json") {
    return json(
      { success: false, message: "Send the review as JSON." },
      { status: 415 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return json(
      { success: false, message: "The review request is too large." },
      { status: 413 },
    );
  }

  const bodyText = await request.text();
  if (new TextEncoder().encode(bodyText).byteLength > MAX_REQUEST_BYTES) {
    return json(
      { success: false, message: "The review request is too large." },
      { status: 413 },
    );
  }

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(bodyText) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Invalid body");
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return json(
      { success: false, message: "The review request is not valid JSON." },
      { status: 400 },
    );
  }

  if (Object.keys(body).some((key) => !ALLOWED_POST_FIELDS.has(key))) {
    return json(
      { success: false, message: "The review request contains unsupported fields." },
      { status: 400 },
    );
  }

  const name = normalizedSingleLine(body.name, 80);
  const email = normalizedSingleLine(body.email, 254).toLowerCase();
  const review = normalizedReview(body.review, 1_000);
  const service = normalizedSingleLine(body.service, 160);
  const website = normalizedSingleLine(body.website, 200);
  const rating = Number(body.rating);
  const consentToPublish = body.consentToPublish === true;
  const fieldErrors: ReviewFieldErrors = {};

  if (name.length < 2) fieldErrors.name = "Enter your name using at least 2 characters.";
  if (!isValidEmail(email)) fieldErrors.email = "Enter a valid email address.";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    fieldErrors.rating = "Choose a rating from 1 to 5 stars.";
  }
  if (review.length < 20) {
    fieldErrors.review = "Write at least 20 characters about your experience.";
  }
  if (service && !isServiceOption(service)) {
    fieldErrors.service = "Choose a service from the list.";
  }
  if (!consentToPublish) {
    fieldErrors.consentToPublish = "Confirm that Evolura may publish your review.";
  }

  if (Object.keys(fieldErrors).length) return validationResponse(fieldErrors);

  if (website) {
    return json(
      {
        success: true,
        message: "Thank you. Your review has been submitted for approval.",
      },
      { status: 202 },
    );
  }

  const formStartedAt = Number(body.formStartedAt);
  const rawCompletionTime = Date.now() - formStartedAt;
  const formCompletionMs =
    Number.isFinite(formStartedAt) && rawCompletionTime >= 0
      ? Math.min(rawCompletionTime, 24 * 60 * 60 * 1_000)
      : null;

  const { ipHash, emailHash } = await transientClientKeys(request, email);
  const ipRateLimit = ipHash
    ? consumeTransientRateLimit(`ip:${ipHash}`, RATE_LIMIT_IP_MAX)
    : { allowed: true, retryAfter: 0 };
  const emailRateLimit = consumeTransientRateLimit(
    `email:${emailHash}`,
    RATE_LIMIT_EMAIL_MAX,
  );
  const rateLimit = !ipRateLimit.allowed ? ipRateLimit : emailRateLimit;
  if (!ipRateLimit.allowed || !emailRateLimit.allowed) {
    const response = json(
      {
        success: false,
        message: "Too many review attempts. Please try again later.",
      },
      { status: 429 },
    );
    response.headers.set("Retry-After", String(rateLimit.retryAfter));
    return response;
  }

  const submitUrl = configuredUrl("N8N_REVIEW_SUBMIT_URL");
  const headers = n8nHeaders();
  if (!submitUrl || !headers) {
    return json(
      {
        success: false,
        message: "The review service is temporarily unavailable.",
      },
      { status: 503 },
    );
  }

  try {
    const upstream = await fetch(submitUrl, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        rating,
        review,
        service,
        consent_to_publish: true,
        website: "",
        client_hash: ipHash,
        email_hash: emailHash,
        form_completion_ms: formCompletionMs,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (!upstream.ok) {
      return json(
        {
          success: false,
          message: "The review could not be submitted. Please try again.",
        },
        { status: upstream.status === 429 ? 429 : 503 },
      );
    }

    return json(
      {
        success: true,
        message:
          "Thank you. Your review was received and will appear after it is checked.",
      },
      { status: 202 },
    );
  } catch {
    return json(
      {
        success: false,
        message: "The review could not be submitted. Please try again.",
      },
      { status: 503 },
    );
  }
}
