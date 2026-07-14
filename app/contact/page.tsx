import Link from "next/link";
import { JsonLd } from "../JsonLd";
import { MobileContactBar } from "../MobileContactBar";
import { QuoteRequestForm } from "../QuoteRequestForm";
import { SiteFooter } from "../SiteFooter";
import { SiteHeader } from "../SiteHeader";
import { createPageMetadata } from "../metadata";
import { SITE_URL } from "../seo-content";
import { BUSINESS, DEFAULT_WHATSAPP_QUOTE_URL } from "../site-config";

const contactUrl = `${SITE_URL}/contact`;

export const metadata = createPageMetadata({
  title: "Contact Evolura Technical Services Dubai | Request a Quote",
  description:
    "Contact Evolura in Al Barsha 1, Dubai for commercial cleaning, building maintenance, MEP, HVAC and facility service requests across the UAE.",
  path: "/contact",
});

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${contactUrl}#webpage`,
      url: contactUrl,
      name: "Contact Evolura Technical Services",
      description:
        "Phone, WhatsApp, email, address and quotation form for Evolura Technical Services in Dubai.",
      inLanguage: "en-AE",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      breadcrumb: { "@id": `${contactUrl}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${contactUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Contact", item: contactUrl },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <div className="service-page">
      <JsonLd data={contactJsonLd} />
      <a className="skip-link" href="#contact-main">Skip to main content</a>
      <SiteHeader home={false} currentPath="/contact" quoteHref="#quote-form" />

      <main id="contact-main" tabIndex={-1}>
        <section className="service-page-hero contact-hero" id="contact-top" tabIndex={-1}>
          <div className="service-page-hero__orbit" aria-hidden="true" />
          <div className="site-shell relative z-10 py-28 md:py-36">
            <nav className="service-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Contact</span>
            </nav>
            <p className="section-kicker section-kicker--light mt-14">Contact Evolura · Dubai</p>
            <h1>Request cleaning or maintenance support</h1>
            <p className="service-page-hero__intro">
              Share the property location, service and scope. Evolura will review the request
              and confirm coverage, timing and the appropriate next step.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a className="primary-button" href={DEFAULT_WHATSAPP_QUOTE_URL} target="_blank" rel="noreferrer" aria-label="Request a quote on WhatsApp (opens in a new tab)">
                Request on WhatsApp <span aria-hidden="true">↗</span>
              </a>
              <a className="secondary-button" href={BUSINESS.phoneHref}>
                Call {BUSINESS.phoneDisplay} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section id="quote-form" className="section-anchor request-section py-24 md:py-32" aria-labelledby="contact-quote-heading" tabIndex={-1}>
          <div className="site-shell grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <p className="section-kicker">Direct contact</p>
              <h2 id="contact-quote-heading" className="section-title mt-5">Tell us what the property needs.</h2>
              <p className="mt-7 max-w-[540px] text-base leading-8 text-[#5e707b] md:text-lg">
                Use the form to prepare a WhatsApp request, or contact Evolura directly by
                phone, email or the office address below.
              </p>
              <address className="contact-page-details">
                <a href={BUSINESS.phoneHref}><span>Phone</span><strong>{BUSINESS.phoneDisplay}</strong></a>
                <a href={`mailto:${BUSINESS.email}`}><span>Email</span><strong>{BUSINESS.email}</strong></a>
                <a href={BUSINESS.mapsUrl} target="_blank" rel="noreferrer" aria-label="View Evolura's office location in Google Maps (opens in a new tab)"><span>Office</span><strong>{BUSINESS.shortAddress}</strong></a>
              </address>
            </div>
            <QuoteRequestForm />
          </div>
        </section>
      </main>

      <SiteFooter backToTopHref="#contact-top" />
      <MobileContactBar />
    </div>
  );
}
