import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";
import { gzipSync } from "node:zlib";

const root = new URL("../", import.meta.url);
const fallbackSiteOrigin =
  "https://evolura-technical-services.bawlamarwan09.chatgpt.site";

function normalizeOrigin(value) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return new URL(withProtocol).origin;
}

const expectedSiteOrigin = normalizeOrigin(
  process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    fallbackSiteOrigin,
);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}`);
const workerPromise = import(workerUrl.href).then(({ default: worker }) => worker);

async function render(pathname = "/", accept = "text/html") {
  const worker = await workerPromise;

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function requestApp(pathname, init) {
  const worker = await workerPromise;

  return worker.fetch(
    new Request(`http://localhost${pathname}`, init),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

function assertCanonical(html, expectedPathname) {
  const canonicalTag = html.match(/<link\b[^>]*\brel="canonical"[^>]*>/i)?.[0];
  assert.ok(canonicalTag, `a canonical link should exist for ${expectedPathname}`);

  const canonicalHref = canonicalTag.match(/\bhref="([^"]+)"/i)?.[1];
  assert.ok(canonicalHref, `the canonical link should have an href for ${expectedPathname}`);

  const canonical = new URL(canonicalHref.replaceAll("&amp;", "&"));
  assert.equal(
    canonical.origin,
    expectedSiteOrigin,
    "canonical URLs should use the configured production origin",
  );
  assert.equal(canonical.pathname, expectedPathname);
  assert.equal(canonical.search, "");
  assert.equal(canonical.hash, "");
}

function documentTitle(html) {
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  assert.ok(title, "the rendered document should include a title");
  return title;
}

test("server-renders the complete Evolura landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="en">/i);
  assert.match(
    html,
    /<title>Commercial Cleaning &amp; Building Maintenance Dubai \| Evolura<\/title>/i,
  );
  assertCanonical(html, "/");
  assert.match(html, /Commercial Cleaning &amp;/i);
  assert.match(html, /Building Maintenance/i);
  assert.match(html, /in Dubai &amp; UAE/i);
  assert.match(html, /Request a WhatsApp Quote/i);
  assert.match(html, /Submit request/i);
  assert.match(html, /WhatsApp us/i);
  assert.match(html, /id="request-service"/i);

  const quoteForm = html.match(
    /<form[^>]*class="[^"]*\brequest-form\b[^"]*"[^>]*>[\s\S]*?<\/form>/i,
  )?.[0];
  assert.ok(quoteForm, "the quote request form should be server-rendered");
  assert.deepEqual(
    [...quoteForm.matchAll(/\bname="([^"]+)"/gi)].map((match) => match[1]),
    ["name", "email", "phone", "service", "location", "message"],
    "the quote form should contain exactly the six approved fields",
  );
  assert.doesNotMatch(quoteForm, /\bname="(?:property|date|consent)"/i);
  assert.doesNotMatch(quoteForm, /type="checkbox"/i);
  assert.match(quoteForm, /action="\/api\/contact"/i);
  assert.match(quoteForm, /method="post"/i);
  assert.equal(
    [...quoteForm.matchAll(/<(?:input|select|textarea)\b[^>]*\bdisabled=""/gi)].length,
    6,
    "all customer fields should remain disabled until the interactive form hydrates",
  );

  const reviewForm = html.match(
    /<form[^>]*class="[^"]*\breview-form\b[^"]*"[^>]*>[\s\S]*?<\/form>/i,
  )?.[0];
  assert.ok(reviewForm, "the customer review form should be server-rendered");
  assert.match(reviewForm, /action="\/api\/reviews"/i);
  assert.match(reviewForm, /<fieldset[^>]+class="[^"]*\breview-rating\b/i);
  assert.equal(
    [...reviewForm.matchAll(/\bname="rating"/gi)].length,
    5,
    "the accessible rating group should contain five native radio options",
  );
  for (const field of ["name", "email", "review", "service", "consentToPublish", "website"]) {
    assert.match(reviewForm, new RegExp(`name="${field}"`, "i"), field);
  }
  assert.match(reviewForm, /type="checkbox"/i);
  assert.match(reviewForm, /My email stays private/i);
  assert.match(reviewForm, /checked before it can appear publicly/i);
  assert.match(html, /id="customer-reviews"/i);
  assert.match(html, /Approved customer reviews/i);

  assert.match(html, /info@evolurats\.com/i);
  assert.match(html, /LocalBusiness/i);
  assert.match(html, /FAQPage/i);
  assert.match(html, /name="twitter:image:alt" content="Evolura commercial cleaning and building maintenance services in Dubai and the UAE"/i);
  assert.match(html, /commercial-office-cleaning-dubai/i);
  assert.match(html, /facility-management-services-uae/i);
  assert.match(html, /<a[^>]+href="\/about"[^>]*>About Evolura<\/a>/i);
  assert.match(html, /<a[^>]+href="\/privacy"[^>]*>Privacy<\/a>/i);
  assert.doesNotMatch(
    html,
    /class="[^"]*\bseo-service-card\b[^"]*\breveal\b/i,
    "service cards must remain fully opaque while they enter the viewport",
  );
  assert.match(html, /service previews[\s\S]{0,80}not client project photographs/i);
  assert.doesNotMatch(html, /AggregateRating|ratingValue|reviewCount|testimonial/i);
  assert.doesNotMatch(
    html,
    /\b\d{2,}\+\s*(?:clients?|customers?|projects?|reviews?|years?|sites?)\b/i,
  );
  assert.doesNotMatch(html, /\b(?:award[- ]winning|ISO(?:\s+\d+)? certified|#1|best[- ]rated)\b/i);
  assert.doesNotMatch(html, /<meta[^>]+name="keywords"/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("publishes one stable Google favicon and the Evolura organization logo", async () => {
  const response = await render();
  assert.equal(response.status, 200);

  const html = await response.text();
  const faviconTags = [
    ...html.matchAll(/<link\b[^>]*\brel="icon"[^>]*>/gi),
  ].map((match) => match[0]);

  assert.equal(
    faviconTags.length,
    1,
    "the homepage should publish one unambiguous Google favicon",
  );
  const faviconHref = faviconTags[0].match(/\bhref="([^"]+)"/i)?.[1];
  assert.ok(faviconHref, "the Google favicon should have an href");
  const faviconUrl = new URL(faviconHref, expectedSiteOrigin);
  assert.equal(faviconUrl.origin, expectedSiteOrigin);
  assert.equal(faviconUrl.pathname, "/evolura-mark-192.png");
  assert.equal(faviconUrl.search, "");
  assert.match(faviconTags[0], /sizes="192x192"/i);
  assert.match(faviconTags[0], /type="image\/png"/i);

  const structuredData = [
    ...html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((match) => JSON.parse(match[1]));
  const graphNodes = structuredData.flatMap((data) => data["@graph"] ?? [data]);
  const business = graphNodes.find((node) => node["@type"] === "LocalBusiness");
  const website = graphNodes.find((node) => node["@type"] === "WebSite");

  assert.ok(business, "the rendered homepage should identify Evolura as a LocalBusiness");
  assert.deepEqual(business.logo, {
    "@type": "ImageObject",
    url: `${expectedSiteOrigin}/evolura-mark.png`,
    width: 512,
    height: 512,
  });
  assert.ok(website, "the rendered homepage should include the linked WebSite entity");

  const ico = await readFile(new URL("public/favicon.ico", root));
  assert.deepEqual(
    [...ico.subarray(0, 4)],
    [0, 0, 1, 0],
    "the conventional fallback should be a genuine ICO file",
  );
});

test("protects review submissions before they reach the private workflow", async () => {
  const validReview = {
    name: "Test Customer",
    email: "customer@example.com",
    rating: 5,
    review: "The service team arrived on time and handled the work carefully.",
    service: "commercial-office-cleaning-dubai",
    consentToPublish: true,
    website: "",
    formStartedAt: Date.now() - 5_000,
  };

  const missingOrigin = await requestApp("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validReview),
  });
  assert.equal(missingOrigin.status, 403);
  assert.equal(missingOrigin.headers.get("cache-control"), "no-store");

  const malformedRating = await requestApp("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost",
    },
    body: JSON.stringify({ ...validReview, rating: "5evil" }),
  });
  assert.equal(malformedRating.status, 422);
  const malformedRatingBody = await malformedRating.json();
  assert.match(malformedRatingBody.fieldErrors.rating, /1 to 5 stars/i);

  const honeypot = await requestApp("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost",
    },
    body: JSON.stringify({ ...validReview, website: "spam.example" }),
  });
  assert.equal(honeypot.status, 202);
  assert.equal((await honeypot.json()).success, true);

  const unconfiguredWorkflow = await requestApp("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost",
    },
    body: JSON.stringify(validReview),
  });
  assert.equal(unconfiguredWorkflow.status, 503);
  const unconfiguredBody = await unconfiguredWorkflow.json();
  assert.doesNotMatch(JSON.stringify(unconfiguredBody), /customer@example\.com/i);

  const unconfiguredFeed = await requestApp("/api/reviews", {
    headers: { Accept: "application/json" },
  });
  assert.equal(unconfiguredFeed.status, 503);
  assert.doesNotMatch(await unconfiguredFeed.text(), /email/i);

  const cacheBustAttempt = await requestApp("/api/reviews?junk=unique", {
    headers: { Accept: "application/json" },
  });
  assert.equal(cacheBustAttempt.status, 400);
  assert.equal(cacheBustAttempt.headers.get("cache-control"), "no-store");
});

test("serves focused, canonical service pages", async () => {
  const routes = [
    ["/services/commercial-office-cleaning-dubai", /Commercial and office cleaning services in Dubai/i],
    ["/services/deep-post-construction-cleaning-dubai", /Deep and post-construction cleaning in Dubai/i],
    ["/services/building-maintenance-dubai", /Reliable building maintenance services in Dubai/i],
    ["/services/mep-hvac-maintenance-dubai", /MEP and HVAC maintenance services in Dubai/i],
    [
      "/services/facility-management-services-uae",
      /Integrated facility cleaning and maintenance across the UAE/i,
    ],
  ];

  for (const [route, heading] of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, heading, route);
    assertCanonical(html, route);
    assert.match(html, /Service/i, route);
    assert.match(html, /BreadcrumbList/i, route);
    assert.match(html, /FAQPage/i, route);
    assert.match(html, /twitter:card" content="summary_large_image/i, route);
    assert.match(html, /<a[^>]+href="\/services"[^>]*>Services<\/a>/i, route);
  }
});

test("serves an indexable services hub with a useful directory", async () => {
  const response = await render("/services");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(
    html,
    /<title>Cleaning &amp; Building Maintenance Services UAE \| Evolura<\/title>/i,
  );
  assertCanonical(html, "/services");
  assert.match(html, /<h1[^>]*>Cleaning and technical maintenance services<\/h1>/i);
  assert.match(html, /CollectionPage/i);
  assert.match(html, /BreadcrumbList/i);
  assert.match(html, /ItemList/i);
  assert.match(html, /Compare the service focus at a glance/i);
  assert.match(html, /<table>/i);
  assert.match(html, /<caption[^>]+class="sr-only"/i);
  assert.match(html, /role="region"/i);
  assert.match(html, /<ul[^>]+class="seo-services-grid"/i);

  for (const slug of [
    "commercial-office-cleaning-dubai",
    "deep-post-construction-cleaning-dubai",
    "building-maintenance-dubai",
    "mep-hvac-maintenance-dubai",
    "facility-management-services-uae",
  ]) {
    assert.match(html, new RegExp(`href="/services/${slug}"`, "i"), slug);
  }
});

test("serves factual About and privacy pages with unique metadata", async () => {
  const [aboutResponse, privacyResponse] = await Promise.all([
    render("/about"),
    render("/privacy"),
  ]);

  assert.equal(aboutResponse.status, 200);
  assert.equal(privacyResponse.status, 200);

  const [about, privacy] = await Promise.all([
    aboutResponse.text(),
    privacyResponse.text(),
  ]);

  assert.match(
    about,
    /<title>About Evolura Technical Services Dubai \| Cleaning &amp; Maintenance<\/title>/i,
  );
  assertCanonical(about, "/about");
  assert.match(
    about,
    /<h1[^>]*>Cleaning and technical maintenance coordinated from Dubai<\/h1>/i,
  );
  assert.match(about, /AboutPage/i);
  assert.match(about, /BreadcrumbList/i);
  assert.match(about, /Al Barsha 1, Dubai/i);
  assert.match(about, /Coverage, scope and the appropriate next step/i);
  assert.match(about, /Evolura business information/i);
  assert.doesNotMatch(about, /AggregateRating|ratingValue|reviewCount|testimonial/i);

  assert.match(
    privacy,
    /<title>Privacy &amp; Website Forms \| Evolura Technical Services<\/title>/i,
  );
  assertCanonical(privacy, "/privacy");
  assert.match(
    privacy,
    /<h1[^>]*>Privacy and website form information<\/h1>/i,
  );
  assert.match(privacy, /WebPage/i);
  assert.match(privacy, /Quotation details are sent to Evolura/i);
  assert.match(privacy, /Your email stays private when you submit a review/i);
  assert.match(privacy, /Submitting a review does not publish it immediately/i);
  assert.match(privacy, /Email addresses are not published/i);
  assert.match(privacy, /WhatsApp, phone and email open outside this website/i);

  assert.notEqual(
    documentTitle(about),
    documentTitle(privacy),
    "About and privacy pages should have unique titles",
  );

  for (const [route, html] of [["/about", about], ["/privacy", privacy]]) {
    assert.match(
      html,
      /<nav[^>]+class="[^"]*footer-service-nav[^"]*"[^>]+aria-label="Company and service pages"/i,
      route,
    );
    assert.match(html, /<a[^>]+href="\/about"[^>]*>About Evolura<\/a>/i, route);
    assert.match(html, /<a[^>]+href="\/services"[^>]*>All services<\/a>/i, route);
    assert.match(html, /<a[^>]+href="\/privacy"[^>]*>Privacy<\/a>/i, route);
    assert.match(html, /aria-label="Quick contact actions"/i, route);
  }
});

test("serves a factual contact page with quotation and local-business details", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(
    html,
    /<title>Contact Evolura Technical Services Dubai \| Request a Quote<\/title>/i,
  );
  assertCanonical(html, "/contact");
  assert.match(html, /<h1[^>]*>Request cleaning or maintenance support<\/h1>/i);
  assert.match(html, /ContactPage/i);
  assert.match(html, /BreadcrumbList/i);
  assert.match(html, /id="quote-form"/i);
  assert.match(html, /Ground Floor, Levana Residence, Al Barsha 1, Dubai, UAE/i);
  assert.match(html, /info@evolurats\.com/i);
});

test("publishes crawl directives and a complete sitemap", async () => {
  const [robotsResponse, sitemapResponse] = await Promise.all([
    render("/robots.txt", "text/plain"),
    render("/sitemap.xml", "application/xml"),
  ]);

  assert.equal(robotsResponse.status, 200);
  assert.equal(sitemapResponse.status, 200);

  const [robots, sitemap] = await Promise.all([
    robotsResponse.text(),
    sitemapResponse.text(),
  ]);

  assert.match(robots, /User-Agent:\s*\*/i);
  assert.match(robots, /Allow:\s*\//i);
  assert.match(robots, /Sitemap:\s*https:\/\/evolurats\.com\/sitemap\.xml/i);
  assert.match(robots, /Host:\s*https:\/\/evolurats\.com/i);
  assert.match(sitemap, new RegExp(`<loc>${expectedSiteOrigin}/services</loc>`, "i"));
  assert.match(sitemap, new RegExp(`<loc>${expectedSiteOrigin}/about</loc>`, "i"));
  assert.match(sitemap, new RegExp(`<loc>${expectedSiteOrigin}/contact</loc>`, "i"));
  assert.match(sitemap, new RegExp(`<loc>${expectedSiteOrigin}/privacy</loc>`, "i"));
  assert.match(sitemap, /<lastmod>2026-07-15T00:00:00\.000Z<\/lastmod>/i);
  assert.match(sitemap, /commercial-office-cleaning-dubai/i);
  assert.match(sitemap, /deep-post-construction-cleaning-dubai/i);
  assert.match(sitemap, /building-maintenance-dubai/i);
  assert.match(sitemap, /mep-hvac-maintenance-dubai/i);
  assert.match(sitemap, /facility-management-services-uae/i);
});

test("keeps service requests accessible and production-ready", async () => {
  const [
    page,
    landing,
    quoteForm,
    reviewForm,
    reviewCarousel,
    reviewApi,
    siteHeader,
    siteConfig,
    metadataHelper,
    jsonLd,
    mobileContactBar,
    serviceLanding,
    servicesPage,
    styles,
    layout,
    packageJson,
  ] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/EvoluraLanding.tsx", root), "utf8"),
    readFile(new URL("app/QuoteRequestForm.tsx", root), "utf8"),
    readFile(new URL("app/ReviewForm.tsx", root), "utf8"),
    readFile(new URL("app/ReviewCarousel.tsx", root), "utf8"),
    readFile(new URL("app/api/reviews/route.ts", root), "utf8"),
    readFile(new URL("app/SiteHeader.tsx", root), "utf8"),
    readFile(new URL("app/site-config.ts", root), "utf8"),
    readFile(new URL("app/metadata.ts", root), "utf8"),
    readFile(new URL("app/JsonLd.tsx", root), "utf8"),
    readFile(new URL("app/MobileContactBar.tsx", root), "utf8"),
    readFile(new URL("app/ServiceLanding.tsx", root), "utf8"),
    readFile(new URL("app/services/page.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("package.json", root), "utf8"),
  ]);

  assert.match(page, /EvoluraLanding/);
  assert.doesNotMatch(
    landing,
    /^\s*["']use client["'];/,
    "the full landing page should remain a Server Component",
  );
  assert.match(landing, /QuoteRequestForm/);
  assert.match(landing, /SiteHeader/);
  assert.match(landing, /MobileContactBar/);
  assert.match(landing, /Skip to main content/);
  assert.doesNotMatch(landing, /<span>\{service\.number\}<\/span>/);

  assert.match(quoteForm, /^"use client";/);
  assert.match(quoteForm, /fetch\("\/api\/contact"/);
  assert.match(quoteForm, /aria-invalid=/);
  assert.match(quoteForm, /aria-describedby=/);
  assert.match(quoteForm, /aria-live=/);
  assert.match(quoteForm, /"alert"\s*:\s*"status"/);
  assert.match(quoteForm, /document\.getElementById\([^)]*\)\?\.focus\(\)/);
  assert.match(quoteForm, /sent securely to Evolura/i);
  assert.match(quoteForm, /disabled=\{!isInteractive\}/);
  assert.match(quoteForm, /action="\/api\/contact"/);
  assert.match(quoteForm, /method="post"/);
  assert.doesNotMatch(quoteForm, /type="checkbox"/);
  assert.doesNotMatch(quoteForm, /name="(?:property|date|consent)"/);

  assert.match(reviewForm, /^"use client";/);
  assert.match(reviewForm, /fetch\("\/api\/reviews"/);
  assert.match(reviewForm, /<fieldset/);
  assert.match(reviewForm, /type="radio"/);
  assert.match(reviewForm, /type="checkbox"/);
  assert.match(reviewForm, /name="website"/);
  assert.match(reviewForm, /consentToPublish/);
  assert.match(reviewForm, /My email stays private/i);
  assert.match(reviewForm, /aria-live=/);
  assert.doesNotMatch(reviewForm, /dangerouslySetInnerHTML/);

  assert.match(reviewCarousel, /^"use client";/);
  assert.match(reviewCarousel, /Pause reviews/);
  assert.match(reviewCarousel, /aria-hidden=\{clone/);
  assert.match(reviewCarousel, /reviews\.length >= 4/);
  assert.doesNotMatch(reviewCarousel, /customer_email|dangerouslySetInnerHTML/);

  assert.match(reviewApi, /MAX_REQUEST_BYTES\s*=\s*8_192/);
  assert.match(reviewApi, /requestIsSameOrigin/);
  assert.match(reviewApi, /N8N_REVIEW_WEBHOOK_SECRET/);
  assert.match(reviewApi, /N8N_REVIEW_SUBMIT_URL/);
  assert.match(reviewApi, /N8N_REVIEW_FEED_URL/);
  assert.match(reviewApi, /status:\s*202/);
  assert.match(reviewApi, /consentToPublish === true/);
  assert.doesNotMatch(reviewApi, /dangerouslySetInnerHTML/);

  assert.match(siteHeader, /^"use client";/);
  assert.match(siteHeader, /event\.key !== "Escape"/);
  assert.match(siteHeader, /aria-expanded=\{menuOpen\}/);
  assert.match(siteHeader, /aria-controls="mobile-navigation"/);
  assert.match(siteHeader, /inert=\{!menuOpen/);

  assert.match(siteConfig, /whatsappNumber:\s*"971503112307"/);
  assert.match(siteConfig, /https:\/\/wa\.me\/\$\{BUSINESS\.whatsappNumber\}/);
  assert.match(metadataHelper, /summary_large_image/);
  assert.match(jsonLd, /JSON\.stringify\(data\)\.replace\(\/<\/g/);
  assert.match(mobileContactBar, /aria-label="Quick contact actions"/);
  assert.match(mobileContactBar, /whatsappHref\s*=\s*DEFAULT_WHATSAPP_QUOTE_URL/);
  assert.match(serviceLanding, /createPageMetadata/);
  assert.match(serviceLanding, /JsonLd/);
  assert.match(serviceLanding, /MobileContactBar/);
  assert.match(serviceLanding, /item:\s*`\$\{SITE_URL\}\/services`/);
  assert.match(serviceLanding, /\/contact\?service=\$\{encodeURIComponent\(page\.slug\)\}#quote-form/);
  assert.match(servicesPage, /CollectionPage/);
  assert.match(servicesPage, /ServiceDirectory/);
  assert.match(servicesPage, /JsonLd/);
  assert.match(servicesPage, /MobileContactBar/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /@keyframes service-card-scroll-lift/);
  assert.match(styles, /@keyframes review-scroll-right/);
  assert.match(styles, /review-carousel__control/);
  assert.match(styles, /review-carousel__group--clone/);
  assert.match(styles, /scroll-margin-top/);
  assert.match(styles, /content-visibility:\s*auto/);
  assert.match(styles, /data-mobile-menu-open/);
  assert.match(page, /Commercial Cleaning & Building Maintenance Dubai \| Evolura/);
  assert.match(layout, /Evolura Technical Services/);
  assert.match(layout, /LocalBusiness/);
  assert.match(layout, /JsonLd/);
  assert.doesNotMatch(layout, /next\/font\/google/);
  const packageConfig = JSON.parse(packageJson);
  assert.equal(packageConfig.engines.node, "22.x");
  assert.equal(packageConfig.scripts.build, "next build");
  assert.match(packageConfig.scripts["build:sites"], /vinext build/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await access(new URL("public/evolura-hero.webp", root));
  await access(new URL("public/evolura-hero-960.webp", root));
  await access(new URL("public/evolura-mark.png", root));
  await access(new URL("public/apple-touch-icon.png", root));
  await access(new URL("public/favicon.ico", root));
  await assert.rejects(access(new URL("app/icon.tsx", root)));
  await assert.rejects(access(new URL("app/_sites-preview", root)));
});

test("keeps critical static assets and deployment output within performance budgets", async () => {
  const [ogStats, css, workerSource, distFiles] = await Promise.all([
    stat(new URL("public/og.jpg", root)),
    readFile(new URL("app/globals.css", root)),
    readFile(new URL("worker/index.ts", root), "utf8"),
    readdir(new URL("dist", root), { recursive: true }),
  ]);

  assert.ok(ogStats.size < 200_000, `social card should stay below 200 KB; received ${ogStats.size}`);
  assert.ok(
    gzipSync(css).byteLength < 15_000,
    `source CSS should stay below 15 KB gzip; received ${gzipSync(css).byteLength}`,
  );
  assert.doesNotMatch(workerSource, /image-optimization|handleImageOptimization|\bIMAGES\b/);
  assert.equal(
    distFiles.some((file) => /(?:resvg|yoga).*\.wasm$/i.test(file)),
    false,
    "the static favicon should not pull SVG/text rendering WASM into the Worker",
  );
});

test("serves the web app manifest and an accessible 404", async () => {
  const [manifestResponse, missingResponse] = await Promise.all([
    render("/manifest.webmanifest", "application/manifest+json"),
    render("/missing-page"),
  ]);

  assert.equal(manifestResponse.status, 200);
  const manifest = JSON.parse(await manifestResponse.text());
  assert.equal(manifest.name, "Evolura Technical Services");
  assert.equal(manifest.theme_color, "#062338");
  assert.ok(manifest.icons.some((icon) => icon.sizes === "512x512"));

  assert.equal(missingResponse.status, 404);
  const missing = await missingResponse.text();
  assert.doesNotMatch(missing, /Page Not Found \| Evolura \| Evolura/i);
  assert.match(missing, /<meta[^>]+content="noindex"[^>]+name="robots"/i);
  assert.match(missing, /<h1[^>]*>This page is not available\.<\/h1>/i);
  assert.match(missing, /class="skip-link"[^>]+href="#not-found-main"/i);
});
