import { EvoluraLanding } from "./EvoluraLanding";
import { JsonLd } from "./JsonLd";
import { createPageMetadata } from "./metadata";
import { SITE_URL, homeFaqs } from "./seo-content";

export const metadata = createPageMetadata({
  title: "Commercial Cleaning & Building Maintenance Dubai | Evolura",
  description:
    "Professional commercial and office cleaning, building maintenance, HVAC and facility management services in Dubai and across the UAE. Request a quote.",
});

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Commercial Cleaning & Building Maintenance Dubai | Evolura",
      description:
        "Professional commercial and office cleaning, building maintenance, HVAC and facility management services in Dubai and across the UAE.",
      inLanguage: "en-AE",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      mainEntity: { "@id": `${SITE_URL}/#faq` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      isPartOf: { "@id": `${SITE_URL}/#webpage` },
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
      <JsonLd data={homepageJsonLd} />
      <EvoluraLanding />
    </>
  );
}
