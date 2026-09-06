"use client";

import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";

type ReviewCarouselComponent = ComponentType<{ loadImmediately?: boolean }>;
type LoadedRuntime = {
  Component: ReviewCarouselComponent;
  loadImmediately: boolean;
};

export function ReviewCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [runtime, setRuntime] = useState<LoadedRuntime | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    let loading = false;

    const loadRuntime = (loadImmediately = false) => {
      if (disposed || loading) return;
      loading = true;
      void import("./ReviewCarouselRuntime")
        .then((module) => {
          if (!disposed) {
            setRuntime({
              Component: module.ReviewCarouselRuntime,
              loadImmediately,
            });
          }
        })
        .catch(() => {
          if (!disposed) setLoadFailed(true);
        });
    };

    const section = sectionRef.current;
    const observer =
      section && "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              if (!entries.some((entry) => entry.isIntersecting)) return;
              observer?.disconnect();
              loadRuntime(false);
            },
            { rootMargin: "500px 0px" },
          )
        : null;

    if (observer && section) observer.observe(section);
    else loadRuntime();

    const fallbackTimer = window.setTimeout(() => loadRuntime(true), 6_000);

    return () => {
      disposed = true;
      observer?.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  if (runtime) {
    const { Component, loadImmediately } = runtime;
    return <Component loadImmediately={loadImmediately} />;
  }

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
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true" />
      <p className="reviews-empty" role="status">
        {loadFailed
          ? "Approved customer reviews are temporarily unavailable."
          : "Loading approved reviews..."}
      </p>
    </section>
  );
}
