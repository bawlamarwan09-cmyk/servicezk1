import Link from "next/link";
import { JsonLd } from "../JsonLd";
import { createPageMetadata } from "../metadata";
import { MobileContactBar } from "../MobileContactBar";
import { SiteFooter } from "../SiteFooter";
import { SiteHeader } from "../SiteHeader";
import { SITE_URL } from "../seo-content";
import { BUSINESS, DEFAULT_WHATSAPP_QUOTE_URL } from "../site-config";

const privacyUrl = `${SITE_URL}/privacy`;

export const metadata = createPageMetadata({
  title: "Privacy & WhatsApp Quote Form Information | Evolura",
  description:
    "Understand how the Evolura website prepares WhatsApp quote requests and what happens to the contact details you choose to enter.",
  path: "/privacy",
});

const privacyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${privacyUrl}#webpage`,
      url: privacyUrl,
      name: "Privacy and WhatsApp quote form information",
      description:
        "Information about how the Evolura website prepares WhatsApp quote requests.",
      inLanguage: "en-AE",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      breadcrumb: { "@id": `${privacyUrl}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${privacyUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Privacy", item: privacyUrl },
      ],
    },
  ],
};

export default function PrivacyPage() {
  return (
    <div className="service-page">
      <JsonLd data={privacyJsonLd} />
      <a className="skip-link" href="#privacy-main">Skip to main content</a>
      <SiteHeader home={false} quoteHref="/contact#quote-form" />

      <main id="privacy-main" tabIndex={-1}>
        <section className="service-page-hero policy-hero" id="privacy-top" tabIndex={-1}>
          <div className="service-page-hero__orbit" aria-hidden="true" />
          <div className="site-shell relative z-10 py-28 md:py-36">
            <nav className="service-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Privacy</span>
            </nav>
            <p className="section-kicker section-kicker--light mt-14">Website information</p>
            <h1>Privacy and WhatsApp quote form information</h1>
            <p className="service-page-hero__intro">
              A plain-language explanation of what happens when you complete the quotation
              form or choose a contact link on this website.
            </p>
          </div>
        </section>

        <article className="policy-content py-24 md:py-32">
          <div className="site-shell">
            <section aria-labelledby="quote-form-data">
              <p className="section-kicker">Quote form</p>
              <h2 id="quote-form-data">The form prepares a WhatsApp message.</h2>
              <p>
                The quotation form does not submit or store your details in an Evolura
                website database. When you submit the completed form, its details are passed
                to WhatsApp in order to prepare the message. You can review, edit or cancel
                that message, and Evolura receives it only after you choose to tap Send.
              </p>
            </section>

            <section aria-labelledby="information-entered">
              <p className="section-kicker">Information you choose to enter</p>
              <h2 id="information-entered">Only share details relevant to the service request.</h2>
              <p>The form asks for:</p>
              <ul>
                <li>Your name</li>
                <li>Your phone or WhatsApp number</li>
                <li>The service required</li>
                <li>The property location</li>
                <li>A description of the space, issue or preferred timing</li>
              </ul>
              <p>Do not include passwords, payment card details or unrelated sensitive information.</p>
            </section>

            <section aria-labelledby="external-services">
              <p className="section-kicker">External contact services</p>
              <h2 id="external-services">WhatsApp, phone and email open outside this website.</h2>
              <p>
                WhatsApp links, telephone links, email links and the map link transfer you to
                another application or service. Any information you send there is handled
                under that service&apos;s terms and privacy practices.
              </p>
            </section>

            <section aria-labelledby="privacy-contact">
              <p className="section-kicker">Questions</p>
              <h2 id="privacy-contact">Contact Evolura about a service request or this page.</h2>
              <address>
                {BUSINESS.address}<br />
                <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a><br />
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              </address>
              <div className="policy-actions">
                <Link className="primary-button" href="/contact#quote-form">Go to the quote form <span aria-hidden="true">↘</span></Link>
                <a className="secondary-button secondary-button--dark" href={DEFAULT_WHATSAPP_QUOTE_URL} target="_blank" rel="noreferrer" aria-label="Open WhatsApp (opens in a new tab)">Open WhatsApp <span aria-hidden="true">↗</span></a>
              </div>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter backToTopHref="#privacy-top" />
      <MobileContactBar />
    </div>
  );
}
