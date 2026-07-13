import type { MetadataRoute } from "next";
import { SITE_URL, servicePageList } from "./seo-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-13T00:00:00.000Z");

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...servicePageList.map((page) => ({
      url: `${SITE_URL}/services/${page.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
