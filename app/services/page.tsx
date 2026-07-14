import Link from "next/link";
import { JsonLd } from "../JsonLd";
import { createPageMetadata } from "../metadata";
import { MobileContactBar } from "../MobileContactBar";
import { ServiceDirectory } from "../ServiceDirectory";
import { SiteFooter } from "../SiteFooter";
import { SiteHeader } from "../SiteHeader";
import { SITE_URL, servicePageList } from "../seo-content";
import { BUSINESS, DEFAULT_WHATSAPP_QUOTE_URL } from "../site-config";

const servicesUrl = `${SITE_URL}/services`;

export const metadata = createPageMetadata({
  title: "Cleaning & Building Maintenance Services UAE | Evolura",
  description:
    "Compare Evolura commercial cleaning, deep cleaning, building maintenance, MEP, HVAC and integrated facility services in Dubai and across the UAE.",
  path: "/services",
});

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${servicesUrl}#webpage`,
      url: servicesUrl,
      name: "Evolura cleaning and building maintenance services",
      description:
        "Commercial cleaning, deep cleaning, building maintenance, MEP, HVAC and integrated facility services in Dubai and across the UAE.",
      inLanguage: "en-AE",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      breadcrumb: { "@id": `${servicesUrl}#breadcrumb` },
      mainEntity: { "@id": `${servicesUrl}#service-list` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${servicesUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: servicesUrl },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${servicesUrl}#service-list`,
      name: "Evolura service directory",
      numberOfItems: servicePageList.length,
      itemListElement: servicePageList.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/services/${service.slug}`,
        item: {
          "@type": "Service",
          "@id": `${SITE_URL}/services/${service.slug}#service`,
          name: service.directoryTitle,
          description: service.metaDescription,
          image: `${SITE_URL}${service.image.src}`,
          provider: { "@id": `${SITE_URL}/#business` },
        },
      })),
    },
  ],
};

export default function ServicesPage() {
  return (
    <div className="service-page">
      <JsonLd data={servicesJsonLd} />
      <a className="skip-link" href="#services-main">Skip to main content</a>
      <SiteHeader home={false} currentPath="/services" quoteHref="/contact#quote-form" />

      <main id="services-main" tabIndex={-1}>
        <section className="service-page-hero service-hub-hero" id="services-top" tabIndex={-1}>
          <div className="service-page-hero__orbit" aria-hidden="true" />
          <div className="site-shell relative z-10 py-28 md:py-36">
            <nav className="service-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Services</span>
            </nav>
            <p className="section-kicker section-kicker--light mt-14">Service directory · Dubai & UAE</p>
            <h1>Cleaning and technical maintenance services</h1>
            <p className="service-page-hero__intro">
              Compare each Evolura service, see the property types it supports and choose
              the most relevant scope before requesting a quotation.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a className="primary-button" href={DEFAULT_WHATSAPP_QUOTE_URL} target="_blank" rel="noreferrer" aria-label="Request a quote on WhatsApp (opens in a new tab)">
                Request a WhatsApp quote <span aria-hidden="true">↗</span>
              </a>
              <a className="secondary-button" href={BUSINESS.phoneHref}>
                Call {BUSINESS.phoneDisplay} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="services-section services-directory-section py-24 md:py-32" aria-labelledby="services-directory-heading">
          <div className="site-shell">
            <p className="section-kicker">Explore by service</p>
            <h2 id="services-directory-heading" className="section-title mt-5 max-w-[900px]">
              Find the right service for your property.
            </h2>
            <p className="services-directory-intro">
              Every service page explains the available scope, suitable property types,
              quotation process and frequently asked questions.
            </p>
            <ServiceDirectory headingId="services-directory-heading" headingLevel={3} />
          </div>
        </section>

        <section className="service-comparison py-24 md:py-32" aria-labelledby="service-comparison-heading">
          <div className="site-shell">
            <p className="section-kicker">Service comparison</p>
            <h2 id="service-comparison-heading" className="section-title mt-5">
              Compare the service focus at a glance.
            </h2>
            <p id="service-comparison-instructions" className="sr-only">
              On a narrow screen, scroll horizontally to review all table columns.
            </p>
            <div
              className="service-comparison__scroll"
              role="region"
              tabIndex={0}
              aria-labelledby="service-comparison-heading"
              aria-describedby="service-comparison-instructions"
            >
              <table>
                <caption className="sr-only">
                  Evolura service focus, suitable property types and available service options
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col">Suitable for</th>
                    <th scope="col">Service options</th>
                  </tr>
                </thead>
                <tbody>
                  {servicePageList.map((service) => (
                    <tr key={service.slug}>
                      <th scope="row"><Link href={`/services/${service.slug}`}>{service.directoryTitle}</Link></th>
                      <td>{service.propertyTypes.slice(0, 2).join("; ")}</td>
                      <td>{service.serviceFormat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="service-final-cta">
          <div className="site-shell grid gap-10 py-20 lg:grid-cols-[1fr_auto] lg:items-end md:py-24">
            <div>
              <p>Not sure which service fits?</p>
              <h2>Share the property and issue. Evolura can review the next step.</h2>
            </div>
            <Link href="/contact?service=not-sure#quote-form">
              Ask for guidance <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter backToTopHref="#services-top" />
      <MobileContactBar />
    </div>
  );
}
