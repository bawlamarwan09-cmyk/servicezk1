"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Brand } from "./Brand";

const navigation = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "How it works", href: "/#how-it-works", homeHref: "#how-it-works" },
  { label: "Service gallery", href: "/#service-gallery", homeHref: "#service-gallery" },
  { label: "Contact", href: "/contact" },
] as const;

function focusDestination(href: string) {
  window.setTimeout(() => {
    const target = document.querySelector<HTMLElement>(href);
    target?.focus({ preventScroll: true });
  }, 0);
}

export function SiteHeader({
  home = true,
  quoteHref = "#request-service",
  currentPath,
}: {
  home?: boolean;
  quoteHref?: string;
  currentPath?: "/services" | "/about" | "/contact";
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const compactRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    const updateHeader = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const compact = window.scrollY > 40;
        if (compact !== compactRef.current) {
          compactRef.current = compact;
          setIsHeaderCompact(compact);
        }
        frame = 0;
      });
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateHeader);
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

  const handleNavigation = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) focusDestination(href);
  };

  return (
    <header className={`site-header ${isHeaderCompact ? "site-header--compact" : ""}`}>
      <div className="site-shell site-header__inner">
        <Brand href={home ? "#top" : "/"} />
        <nav className="desktop-navigation" aria-label="Main navigation">
          {navigation.map((item) => {
            const href = home && "homeHref" in item ? item.homeHref : item.href;
            return (
            <Link
              className="nav-link"
              href={href}
              key={item.href}
              aria-current={currentPath === item.href ? "page" : undefined}
              onClick={() => {
                if (href.startsWith("#")) focusDestination(href);
              }}
            >
              {item.label}
            </Link>
            );
          })}
        </nav>
        <div className="header-actions">
          <a
            className="header-cta"
            href={quoteHref}
            onClick={() => {
              if (home && quoteHref.startsWith("#")) focusDestination(quoteHref);
            }}
          >
            Request a quote
            <span aria-hidden="true">↘</span>
          </a>
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
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-navigation ${menuOpen ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        {navigation.map((item) => {
          const href = home && "homeHref" in item ? item.homeHref : item.href;
          return (
            <Link
              href={href}
              key={item.href}
              aria-current={currentPath === item.href ? "page" : undefined}
              onClick={() => handleNavigation(href)}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
