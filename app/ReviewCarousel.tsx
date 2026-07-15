"use client";

import { useEffect, useRef, useState } from "react";
import type { ApprovedReview } from "./reviews";
import { getServiceLabel } from "./site-config";

type ReviewLoadState = "loading" | "ready" | "unavailable";

const reviewDateFormatter = new Intl.DateTimeFormat("en-AE", {
  month: "short",
  year: "numeric",
});

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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadReviews() {
      try {
        const response = await fetch("/api/reviews?limit=24", {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        const result = (await response.json().catch(() => null)) as
          | { reviews?: ApprovedReview[] }
          | null;

        if (!response.ok || !Array.isArray(result?.reviews)) {
          throw new Error("Reviews are unavailable");
        }

        setReviews(result.reviews);
        setLoadState("ready");
      } catch {
        if (controller.signal.aborted) return;
        setLoadState("unavailable");
      }
    }

    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      loadReviews();
      return () => controller.abort();
    }

    let started = false;
    let fallbackTimer = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        if (started) return;
        started = true;
        observer.disconnect();
        window.clearTimeout(fallbackTimer);
        loadReviews();
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(section);
    fallbackTimer = window.setTimeout(() => {
      if (started) return;
      started = true;
      observer.disconnect();
      loadReviews();
    }, 6_000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
      controller.abort();
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
