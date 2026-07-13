import type { Metadata } from "next";
import { EvoluraLanding } from "./EvoluraLanding";
import { SITE_URL, homeFaqs } from "./seo-content";

export const metadata: Metadata = {
  title: {
    absolute: "Commercial Cleaning & Maintenance Services Dubai | Evolura",
  },
  description:
    "Evolura provides commercial cleaning, deep cleaning, MEP, HVAC, plumbing, electrical and building maintenance in Dubai and across the UAE. Request a quote.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
    title: "Commercial Cleaning & Maintenance Services Dubai | Evolura",
    description:
      "Commercial cleaning, deep cleaning, MEP, HVAC and building maintenance services in Dubai and across the UAE.",
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
