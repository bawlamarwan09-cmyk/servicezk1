export const siteNavigation = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Why Evolura", href: "/#benefits", homeHref: "#benefits" },
  {
    label: "Service areas",
    href: "/#coverage",
    homeHref: "#coverage",
  },
  { label: "FAQs", href: "/#faq", homeHref: "#faq" },
] as const;

export type SiteCurrentPath = "/services" | "/about" | "/contact";
