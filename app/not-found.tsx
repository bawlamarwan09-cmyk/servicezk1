import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Evolura" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="service-page">
      <a className="skip-link" href="#not-found-main">Skip to main content</a>
      <SiteHeader home={false} quoteHref="/contact#quote-form" />
      <main id="not-found-main" className="not-found-page" tabIndex={-1}>
        <div className="site-shell">
          <p className="section-kicker">404 · Page not found</p>
          <h1>This page is not available.</h1>
          <p>
            The address may have changed. Return to the homepage or explore Evolura&apos;s
            cleaning and technical maintenance services.
          </p>
          <div>
            <Link className="primary-button" href="/">Return home <span aria-hidden="true">↗</span></Link>
            <Link className="secondary-button" href="/services">View services <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </main>
      <SiteFooter backToTopHref="#not-found-main" />
    </div>
  );
}
