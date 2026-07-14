import Link from "next/link";
import { JsonLd } from "../JsonLd";
import { createPageMetadata } from "../metadata";
import { MobileContactBar } from "../MobileContactBar";
import { ServiceDirectory } from "../ServiceDirectory";
import { SiteFooter } from "../SiteFooter";
import { SiteHeader } from "../SiteHeader";
import { SITE_URL } from "../seo-content";
import { BUSINESS, DEFAULT_WHATSAPP_QUOTE_URL } from "../site-config";

const aboutUrl = `${SITE_URL}/about`;

export const metadata = createPageMetadata({
  title: "About Evolura Technical Services Dubai | Cleaning & Maintenance",
  description:
    "Learn how Evolura coordinates commercial cleaning, building maintenance, MEP, HVAC and integrated facility service requests from Al Barsha 1, Dubai.",
  path: "/about",
});

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${aboutUrl}#webpage`,
      url: aboutUrl,
      name: "About Evolura Technical Services",
      description:
        "Evolura Technical Services coordinates commercial cleaning and technical maintenance requests from Al Barsha 1, Dubai.",
      inLanguage: "en-AE",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      breadcrumb: { "@id": `${aboutUrl}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${aboutUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "About", item: aboutUrl },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="service-page">
      <JsonLd data={aboutJsonLd} />
      <a className="skip-link" href="#about-main">Skip to main content</a>
      <SiteHeader home={false} currentPath="/about" quoteHref="/contact#quote-form" />

      <main id="about-main" tabIndex={-1}>
        <section className="service-page-hero about-hero" id="about-top" tabIndex={-1}>
          <div className="service-page-hero__orbit" aria-hidden="true" />
          <div className="site-shell relative z-10 py-28 md:py-36">
            <nav className="service-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">About Evolura</span>
            </nav>
            <p className="section-kicker section-kicker--light mt-14">About Evolura · Dubai</p>
            <h1>Cleaning and technical maintenance coordinated from Dubai</h1>
            <p className="service-page-hero__intro">
              Evolura Technical Services is based in Al Barsha 1, Dubai and coordinates
              commercial cleaning, deep cleaning, building maintenance, MEP, HVAC and
              integrated facility service requests across the UAE.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link className="primary-button" href="/contact#quote-form">
                Request a service quote <span aria-hidden="true">↘</span>
              </Link>
              <a className="secondary-button" href={BUSINESS.phoneHref}>
                Call {BUSINESS.phoneDisplay} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="service-overview py-24 md:py-32" aria-labelledby="about-overview-heading">
          <div className="site-shell grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-24">
            <div>
              <p className="section-kicker">Company overview</p>
              <h2 id="about-overview-heading" className="section-title mt-5">
                One contact point for cleaning and property maintenance requests.
              </h2>
              <p className="service-lead">
                Each request starts with the property location, required service, timing,
                access and a description of the space or issue. Evolura reviews those details
                before confirming coverage, scope and the appropriate next step.
              </p>
            </div>
            <dl className="about-facts" aria-label="Evolura business information">
              <div>
                <dt>Business</dt>
                <dd>{BUSINESS.name}</dd>
              </div>
              <div>
                <dt>Dubai base</dt>
                <dd>{BUSINESS.shortAddress}</dd>
              </div>
              <div>
                <dt>Service area</dt>
                <dd>Dubai; UAE requests reviewed by property, timing and scope</dd>
              </div>
              <div>
                <dt>Direct contact</dt>
                <dd>
                  <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
                  <br />
                  <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="service-process py-24 md:py-32" aria-labelledby="about-process-heading">
          <div className="site-shell">
            <p className="section-kicker">How requests are handled</p>
            <h2 id="about-process-heading" className="section-title mt-5">
              Clear details before a service is arranged.
            </h2>
            <ol className="service-process__grid">
              <li>
                <span>01</span>
                <h3>Share the request</h3>
                <p>Provide the location, service, preferred timing and relevant property or issue details.</p>
              </li>
              <li>
                <span>02</span>
                <h3>Review the scope</h3>
                <p>Coverage, access, requested work and the suitable service approach are reviewed.</p>
              </li>
              <li>
                <span>03</span>
                <h3>Confirm the next step</h3>
                <p>Evolura coordinates the quotation, visit or service plan based on the reviewed request.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="services-section services-directory-section py-24 md:py-32" aria-labelledby="about-services-heading">
          <div className="site-shell">
            <p className="section-kicker">Service directory</p>
            <h2 id="about-services-heading" className="section-title mt-5 max-w-[900px]">
              Explore the services Evolura coordinates.
            </h2>
            <p className="services-directory-intro">
              Each service page describes the available scope, suitable property types,
              service format and information needed for a quotation.
            </p>
            <ServiceDirectory headingId="about-services-heading" headingLevel={3} />
          </div>
        </section>

        <section className="service-final-cta">
          <div className="site-shell grid gap-10 py-20 lg:grid-cols-[1fr_auto] lg:items-end md:py-24">
            <div>
              <p>Have a cleaning or maintenance request?</p>
              <h2>Share the property details for a clear next step.</h2>
            </div>
            <a href={DEFAULT_WHATSAPP_QUOTE_URL} target="_blank" rel="noreferrer" aria-label="Start a quote request on WhatsApp (opens in a new tab)">
              Start on WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <SiteFooter backToTopHref="#about-top" />
      <MobileContactBar />
    </div>
  );
}
