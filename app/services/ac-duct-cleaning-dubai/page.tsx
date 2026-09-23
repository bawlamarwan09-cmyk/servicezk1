import {
  createServiceMetadata,
} from "../../ServiceLanding";
import { AcDuctLanding, acDuctLandingFaqs } from "../../AcDuctLanding";
import { JsonLd } from "../../JsonLd";
import { SITE_URL, servicePages } from "../../seo-content";

const page = servicePages["ac-duct-cleaning-dubai"];

export const metadata = createServiceMetadata(page);

const url = `${SITE_URL}/services/${page.slug}`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.title,
      serviceType: "Air-conditioning duct cleaning",
      description: page.metaDescription,
      url,
      image: `${SITE_URL}${page.image.src}`,
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: { "@type": "City", name: "Dubai" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: page.shortTitle, item: url },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: acDuctLandingFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function AcDuctCleaningPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <AcDuctLanding />
    </>
  );
}
