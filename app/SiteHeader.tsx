import Link from "next/link";
import { Brand } from "./Brand";
import { SiteHeaderControls } from "./SiteHeaderControls";
import { siteNavigation, type SiteCurrentPath } from "./site-navigation";

export function SiteHeader({
  home = true,
  quoteHref = "#request-service",
  currentPath,
}: {
  home?: boolean;
  quoteHref?: string;
  currentPath?: SiteCurrentPath;
}) {
  return (
    <header id="site-header" className="site-header">
      <div className="site-shell site-header__inner">
        <Brand href={home ? "#top" : "/"} />
        <nav className="desktop-navigation" aria-label="Main navigation">
          {siteNavigation.map((item) => {
            const href = home && "homeHref" in item ? item.homeHref : item.href;
            return (
              <Link
                className="nav-link"
                href={href}
                key={item.href}
                prefetch={false}
                aria-current={currentPath === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <SiteHeaderControls home={home} currentPath={currentPath}>
          <a className="header-cta" href={quoteHref}>
            Request a quote
            <span aria-hidden="true">↘</span>
          </a>
        </SiteHeaderControls>
      </div>
    </header>
  );
}
