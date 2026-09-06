export const siteNavigation = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "How it works", href: "/#how-it-works", homeHref: "#how-it-works" },
  {
    label: "Service gallery",
    href: "/#service-gallery",
    homeHref: "#service-gallery",
  },
  { label: "Contact", href: "/contact" },
] as const;

export type SiteCurrentPath = "/services" | "/about" | "/contact";
