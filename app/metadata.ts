import type { Metadata } from "next";
import { SITE_URL } from "./seo-content";

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  index?: boolean;
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
    type?: string;
  };
};

const sharedSocialImageAlt =
  "Evolura commercial cleaning and building maintenance services in Dubai and the UAE";

export function createPageMetadata({
  title,
  description,
  path = "",
  index = true,
  image,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const socialImage = image ?? {
    url: "/og.jpg",
    width: 1200,
    height: 630,
    alt: sharedSocialImageAlt,
    type: "image/jpeg",
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_AE",
      url,
      siteName: "Evolura Technical Services",
      title,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
