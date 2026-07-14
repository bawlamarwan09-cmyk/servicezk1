import { Brand } from "./Brand";
import Link from "next/link";
import { servicePageList } from "./seo-content";
import { BUSINESS } from "./site-config";

export function SiteFooter({
  backToTopHref,
  brandHref = "/",
  showTagline = false,
}: {
  backToTopHref: string;
  brandHref?: string;
  showTagline?: boolean;
}) {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="grid gap-10 py-14 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Brand inverse href={brandHref} />
            {showTagline ? (
              <p className="mt-7 max-w-[670px] text-3xl font-semibold uppercase leading-tight tracking-[-0.04em] text-white md:text-5xl">
                Cleaner environments. Stronger buildings. <span>Better tomorrow.</span>
              </p>
            ) : null}
            <address className="service-footer-address">
              {BUSINESS.address}
              <br />
              <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
              <span aria-hidden="true"> · </span>
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </address>
          </div>
          <a className="footer-top" href={backToTopHref}>
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/12 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Evolura Technical Services.</p>
          <nav className="footer-service-nav" aria-label="Company and service pages">
            <Link href="/about">About Evolura</Link>
            <Link href="/services">All services</Link>
            <Link href="/contact">Contact</Link>
            {servicePageList.map((service) => (
              <Link href={`/services/${service.slug}`} key={service.slug}>
                {service.directoryTitle}
              </Link>
            ))}
            <Link href="/privacy">Privacy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
