import type { Metadata } from "next";
import { EvoluraLanding } from "./EvoluraLanding";
import { SITE_URL, homeFaqs } from "./seo-content";

export const metadata: Metadata = {
  title: {
    absolute: "Commercial Cleaning & Building Maintenance Dubai | Evolura",
  },
  description:
    "Professional commercial and office cleaning, building maintenance, HVAC and facility management services in Dubai and across the UAE. Get a free quote.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
    title: "Commercial Cleaning & Building Maintenance Dubai | Evolura",
    description:
      "Commercial cleaning, office cleaning, building maintenance, HVAC and facility management services in Dubai and across the UAE.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Evolura commercial cleaning and building maintenance services in Dubai and the UAE",
      },
    ],
  },
};

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Evolura Technical Services",
      inLanguage: "en-AE",
      publisher: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "FAQPage",
      mainEntity: homeFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <EvoluraLanding />
    </>
  );
}
