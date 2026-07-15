"use client";

import { useEffect, useRef, useState } from "react";
import type { ApprovedReview } from "./reviews";
import { getServiceLabel } from "./site-config";

type ReviewLoadState = "loading" | "ready" | "unavailable";

const REVIEW_REFRESH_INTERVAL_MS = 30_000;
const REVIEW_REFRESH_MAX_BACKOFF_MS = 5 * 60_000;

const reviewDateFormatter = new Intl.DateTimeFormat("en-AE", {
  month: "short",
  year: "numeric",
});

function reviewsMatch(current: ApprovedReview[], next: ApprovedReview[]) {
  return (
    current.length === next.length &&
    current.every((review, index) => {
      const candidate = next[index];
      return (
        candidate &&
        review.name === candidate.name &&
        review.rating === candidate.rating &&
        review.review === candidate.review &&
        review.service === candidate.service &&
        review.createdAt === candidate.createdAt
      );
    })
  );
}

function ReviewCard({ review }: { review: ApprovedReview }) {
  const publishedDate = review.createdAt
    ? reviewDateFormatter.format(new Date(review.createdAt))
    : null;

  return (
    <article className="review-card">
      <div className="review-card__top">
        <div>
          <h4>{review.name}</h4>
          {review.service ? <p>{getServiceLabel(review.service)}</p> : null}
        </div>
        <span className="review-card__stars">
          <span aria-hidden="true">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </span>
          <span className="sr-only">Rated {review.rating} out of 5 stars</span>
        </span>
      </div>
      <blockquote>“{review.review}”</blockquote>
      {publishedDate ? <time dateTime={review.createdAt ?? undefined}>{publishedDate}</time> : null}
    </article>
  );
}

function ReviewGroup({
  reviews,
  clone = false,
}: {
  reviews: ApprovedReview[];
  clone?: boolean;
}) {
  return (
    <ul
      className={`review-carousel__group${clone ? " review-carousel__group--clone" : ""}`}
      aria-hidden={clone || undefined}
    >
      {reviews.map((review, index) => (
        <li key={`${review.name}-${review.createdAt ?? "undated"}-${index}`}>
          <ReviewCard review={review} />
        </li>
      ))}
    </ul>
  );
}

export function ReviewCarousel() {
  const [reviews, setReviews] = useState<ApprovedReview[]>([]);
  const [loadState, setLoadState] = useState<ReviewLoadState>("loading");
  const [paused, setPaused] = useState(false);
  const [feedAnnouncement, setFeedAnnouncement] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const pausedRef = useRef(false);
  const resumeRefreshRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    pausedRef.current = paused;
    if (!paused) resumeRefreshRef.current();
  }, [paused]);

  useEffect(() => {
    let activeController: AbortController | null = null;
    let fallbackTimer = 0;
    let refreshTimer = 0;
    let hasLoaded = false;
    let isNearSection = false;
    let latestReviews: ApprovedReview[] = [];
    let requestInFlight = false;
    let retryDelay = REVIEW_REFRESH_INTERVAL_MS;
    let disposed = false;

    function clearRefreshTimer() {
      window.clearTimeout(refreshTimer);
      refreshTimer = 0;
    }

    function canRefresh() {
      return (
        isNearSection &&
        document.visibilityState === "visible" &&
        navigator.onLine &&
        !(hasLoaded && pausedRef.current)
      );
    }

    function scheduleRefresh() {
      clearRefreshTimer();
      if (disposed || !canRefresh()) return;

      const jitter = Math.floor(Math.random() * 2_500);
      refreshTimer = window.setTimeout(loadReviews, retryDelay + jitter);
    }

    async function loadReviews() {
      if (disposed || requestInFlight || !navigator.onLine) return;
      if (hasLoaded && pausedRef.current) return;

      requestInFlight = true;
      activeController = new AbortController();

      try {
        const response = await fetch("/api/reviews?limit=24", {
          headers: { Accept: "application/json" },
          signal: activeController.signal,
        });
        const result = (await response.json().catch(() => null)) as
          | { reviews?: ApprovedReview[] }
          | null;

        if (!response.ok || !Array.isArray(result?.reviews)) {
          throw new Error("Reviews are unavailable");
        }

        retryDelay = REVIEW_REFRESH_INTERVAL_MS;
        if (!reviewsMatch(latestReviews, result.reviews)) {
          const wasAlreadyLoaded = hasLoaded;
          latestReviews = result.reviews;
          setReviews(result.reviews);
          if (wasAlreadyLoaded) {
            setFeedAnnouncement(
              `${result.reviews.length} approved customer reviews now available.`,
            );
          }
        }
        hasLoaded = true;
        setLoadState("ready");
      } catch {
        if (disposed || activeController?.signal.aborted) return;
        retryDelay = Math.min(
          retryDelay * 2,
          REVIEW_REFRESH_MAX_BACKOFF_MS,
        );
        if (!hasLoaded) setLoadState("unavailable");
      } finally {
        requestInFlight = false;
        activeController = null;
        scheduleRefresh();
      }
    }

    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      isNearSection = true;
      loadReviews();
    }

    const observer = section && "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            isNearSection = entries.some((entry) => entry.isIntersecting);
            if (isNearSection) {
              loadReviews();
            } else {
              clearRefreshTimer();
            }
          },
          { rootMargin: "500px 0px" },
        )
      : null;

    observer?.observe(section as HTMLElement);

    fallbackTimer = window.setTimeout(() => {
      if (!hasLoaded && !requestInFlight) loadReviews();
    }, 6_000);

    function refreshWhenActive() {
      if (canRefresh()) {
        loadReviews();
      } else {
        clearRefreshTimer();
      }
    }

    function pauseWhenOffline() {
      clearRefreshTimer();
      activeController?.abort();
    }

    resumeRefreshRef.current = refreshWhenActive;
    document.addEventListener("visibilitychange", refreshWhenActive);
    window.addEventListener("online", refreshWhenActive);
    window.addEventListener("offline", pauseWhenOffline);

    return () => {
      disposed = true;
      observer?.disconnect();
      window.clearTimeout(fallbackTimer);
      clearRefreshTimer();
      activeController?.abort();
      resumeRefreshRef.current = () => undefined;
      document.removeEventListener("visibilitychange", refreshWhenActive);
      window.removeEventListener("online", refreshWhenActive);
      window.removeEventListener("offline", pauseWhenOffline);
    };
  }, []);

  const shouldAnimate = reviews.length >= 4;

  return (
    <section
      ref={sectionRef}
      className="approved-reviews"
      aria-labelledby="approved-reviews-heading"
    >
      <div className="approved-reviews__heading">
        <div>
          <p className="section-kicker section-kicker--light">Customer feedback</p>
          <h3 id="approved-reviews-heading">Approved customer reviews</h3>
        </div>
        {shouldAnimate ? (
          <button
            type="button"
            className="review-carousel__control"
            aria-controls="review-carousel-track"
            aria-label={
              paused
                ? "Resume automatic review scrolling"
                : "Pause automatic review scrolling"
            }
            onClick={() => setPaused((current) => !current)}
          >
            <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
            {paused ? "Resume reviews" : "Pause reviews"}
          </button>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {feedAnnouncement}
      </p>

      {loadState === "loading" ? (
        <p className="reviews-empty" role="status">
          Loading approved reviews...
        </p>
      ) : null}

      {loadState === "unavailable" ? (
        <p className="reviews-empty" role="status">
          Approved customer reviews are temporarily unavailable.
        </p>
      ) : null}

      {loadState === "ready" && reviews.length === 0 ? (
        <p className="reviews-empty">
          No customer reviews have been published yet. Be the first to share your
          experience using the form above.
        </p>
      ) : null}

      {loadState === "ready" && reviews.length > 0 ? (
        <div
          className={`review-carousel${shouldAnimate ? " review-carousel--animated" : ""}`}
          data-paused={paused}
        >
          <div className="review-carousel__viewport">
            <div id="review-carousel-track" className="review-carousel__track">
              <ReviewGroup reviews={reviews} />
              {shouldAnimate ? <ReviewGroup reviews={reviews} clone /> : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
