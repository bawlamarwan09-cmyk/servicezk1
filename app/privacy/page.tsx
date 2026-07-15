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
  title: "Privacy & Website Forms | Evolura Technical Services",
  description:
    "Understand how Evolura handles quotation requests, customer review submissions, contact details, moderation and publication choices.",
  path: "/privacy",
});

const privacyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${privacyUrl}#webpage`,
      url: privacyUrl,
      name: "Privacy and website form information",
      description:
        "Information about how Evolura handles quotation requests and customer review submissions.",
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
            <p className="section-kicker section-kicker--light mt-14">Privacy information</p>
            <h1>Privacy and website form information</h1>
            <p className="service-page-hero__intro">
              A plain-language explanation of what happens when you request a quotation,
              submit a customer review or choose an external contact link.
            </p>
          </div>
        </section>

        <article className="policy-content py-24 md:py-32">
          <div className="site-shell">
            <section aria-labelledby="quote-form-data">
              <p className="section-kicker">Quote form</p>
              <h2 id="quote-form-data">Quotation details are sent to Evolura&apos;s contact workflow.</h2>
              <p>
                When you submit the quotation form, the website sends the information you
                entered to Evolura&apos;s private contact workflow so the team can review the
                request and respond. The form asks for your name, email, phone or WhatsApp
                number, requested service, property location and service details.
              </p>
            </section>

            <section aria-labelledby="review-form-data">
              <p className="section-kicker">Customer review form</p>
              <h2 id="review-form-data">Your email stays private when you submit a review.</h2>
              <p>
                The review form asks for your name, email address, a one-to-five-star rating,
                an optional service category, your written feedback and your agreement to
                publication. Your email is used for confirmation, moderation or a relevant
                service follow-up. It is not displayed in the public review cards.
              </p>
              <p>
                Review submissions pass through Evolura&apos;s protected website endpoint and
                automated review workflow. They may be stored in Evolura&apos;s PostgreSQL review
                database and operational review records, and an email service may deliver a
                confirmation or notify the service team.
              </p>
              <p>
                To reduce spam and automated abuse, the website may create pseudonymous
                hashes from network and email identifiers for rate limiting.
                These hashes are not displayed publicly and should be removed when they are
                no longer needed for abuse prevention.
              </p>
            </section>

            <section aria-labelledby="review-publication">
              <p className="section-kicker">Moderation and publication</p>
              <h2 id="review-publication">Submitting a review does not publish it immediately.</h2>
              <p>
                Reviews are held for moderation. Evolura may publish the name, star rating,
                review text and selected service only after checking authenticity, consent,
                privacy and respectful language. Email addresses are not published. Reviews
                may be rejected when they are spam, unrelated, unsafe, unlawful or contain
                personal information that should not be made public.
              </p>
            </section>

            <section aria-labelledby="information-entered">
              <p className="section-kicker">Information you choose to enter</p>
              <h2 id="information-entered">Only share information relevant to your request or experience.</h2>
              <p>Do not include:</p>
              <ul>
                <li>Passwords or login details</li>
                <li>Payment card or bank information</li>
                <li>Health, identity-document or other unrelated sensitive information</li>
                <li>Personal details about another person without their permission</li>
              </ul>
            </section>

            <section aria-labelledby="retention-rights">
              <p className="section-kicker">Retention and requests</p>
              <h2 id="retention-rights">You can ask about, correct or request deletion of your information.</h2>
              <p>
                Evolura keeps form information only as long as reasonably needed to handle
                the request, moderate and manage a review, maintain appropriate business
                records or meet legal obligations. Contact Evolura using the details below
                if you want to ask what information is held, correct it, withdraw a review
                from publication or request deletion where applicable.
              </p>
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
              <h2 id="privacy-contact">Contact Evolura about your information or this page.</h2>
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
