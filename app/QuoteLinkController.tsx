"use client";

import { useEffect } from "react";
import { isServiceOption } from "./site-config";

export function QuoteLinkController() {
  useEffect(() => {
    const selectService = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[data-quote-service]");
      const service = link?.dataset.quoteService;
      if (!link || !service || !isServiceOption(service)) return;
      if (window.location.pathname !== "/") return;

      event.preventDefault();
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("service", service);
      nextUrl.hash = "request-service";
      window.history.replaceState(null, "", nextUrl);
      window.dispatchEvent(
        new CustomEvent("evolura:select-service", { detail: { service } }),
      );

      const requestSection = document.getElementById("request-service");
      requestSection?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      window.setTimeout(() => requestSection?.focus({ preventScroll: true }), 0);
    };

    document.addEventListener("click", selectService);
    return () => document.removeEventListener("click", selectService);
  }, []);

  return null;
}
