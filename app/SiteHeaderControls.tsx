"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { siteNavigation, type SiteCurrentPath } from "./site-navigation";

function focusDestination(href: string) {
  window.setTimeout(() => {
    const target = document.querySelector<HTMLElement>(href);
    target?.focus({ preventScroll: true });
  }, 0);
}

export function SiteHeaderControls({
  children,
  currentPath,
  home,
}: {
  children: ReactNode;
  currentPath?: SiteCurrentPath;
  home: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;

    let frame = 0;
    let compact = header.classList.contains("site-header--compact");

    const updateHeader = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const nextCompact = window.scrollY > 40;
        if (nextCompact !== compact) {
          compact = nextCompact;
          header.classList.toggle("site-header--compact", nextCompact);
        }
        frame = 0;
      });
    };

    const focusHashDestination = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
      const href = link?.getAttribute("href");
      if (href) focusDestination(href);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    header.addEventListener("click", focusHashDestination);

    return () => {
      window.removeEventListener("scroll", updateHeader);
      header.removeEventListener("click", focusHashDestination);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    document.body.toggleAttribute("data-mobile-menu-open", menuOpen);
    return () => document.body.removeAttribute("data-mobile-menu-open");
  }, [menuOpen]);

  return (
    <div className="site-header-controller">
      <div className="header-actions">
        {children}
        <button
          ref={menuButtonRef}
          className={`mobile-menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-navigation ${menuOpen ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        {siteNavigation.map((item) => {
          const href = home && "homeHref" in item ? item.homeHref : item.href;
          return (
            <Link
              href={href}
              key={item.href}
              prefetch={false}
              aria-current={currentPath === item.href ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
