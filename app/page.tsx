import { acDuctLandingFaqs, EvoluraLanding } from "./EvoluraLanding";
import { JsonLd } from "./JsonLd";
import { createPageMetadata } from "./metadata";
import { SITE_URL } from "./seo-content";

export const metadata = createPageMetadata({
  title: "AC Duct Cleaning Services Dubai | Evolura",
  description:
    "Professional AC duct cleaning in Dubai for apartments, villas, offices and shops. Clean accessible ducts, vents, grilles and diffusers. Request a free quote.",
  image: {
    url: "/og-ac-duct-cleaning.jpg",
    width: 1200,
    height: 630,
    alt: "Bright Dubai living room representing Evolura AC duct cleaning services",
    type: "image/jpeg",
  },
});

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "AC Duct Cleaning Services Dubai | Evolura",
      description:
        "Professional AC duct cleaning in Dubai for apartments, villas, offices, shops and commercial properties.",
      inLanguage: "en-AE",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#ac-duct-cleaning-service` },
      mainEntity: { "@id": `${SITE_URL}/#faq` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-ac-duct-cleaning.jpg`,
        width: 1200,
        height: 630,
      },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#ac-duct-cleaning-service`,
      name: "AC duct cleaning services in Dubai",
      serviceType: "Air-conditioning duct cleaning",
      description:
        "Inspection and professional cleaning of accessible AC ducts, vents, grilles and diffusers for homes and commercial properties in Dubai.",
      url: SITE_URL,
      image: `${SITE_URL}/services/ac-duct-cleaning.webp`,
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: {
        "@type": "City",
        name: "Dubai",
      },
      audience: {
        "@type": "Audience",
        audienceType: "Apartment, villa, office, shop and commercial property owners and managers",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      isPartOf: { "@id": `${SITE_URL}/#webpage` },
      mainEntity: acDuctLandingFaqs.map((faq) => ({
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
