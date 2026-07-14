import type { MetadataRoute } from "next";
import { CONTENT_LAST_MODIFIED, SITE_URL, servicePageList } from "./seo-content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...servicePageList.map((page) => ({
      url: `${SITE_URL}/services/${page.slug}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
