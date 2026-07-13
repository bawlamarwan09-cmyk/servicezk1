import type { Metadata } from "next";
import Link from "next/link";
import {
  SITE_URL,
  servicePages,
  type ServicePageContent,
} from "./seo-content";

export function createServiceMetadata(page: ServicePageContent): Metadata {
  const url = `${SITE_URL}/services/${page.slug}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_AE",
      url,
      siteName: "Evolura Technical Services",
      title: page.metaTitle,
      description: page.metaDescription,
    },
    twitter: {
      card: "summary",
      title: page.metaTitle,
      description: page.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

function ServiceBrand() {
  return (
    <Link className="brand" href="/" aria-label="Evolura Technical Services home">
      <span className="brand__mark" aria-hidden="true">
        E
      </span>
      <span className="brand__copy">
        <strong>EVOLURA</strong>
        <small>TECHNICAL SERVICES</small>
      </span>
    </Link>
  );
}

export function ServiceLanding({ page }: { page: ServicePageContent }) {
  const url = `${SITE_URL}/services/${page.slug}`;
  const related = page.related
    .map((slug) => servicePages[slug])
    .filter((item): item is ServicePageContent => Boolean(item));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.title,
        serviceType: page.shortTitle,
        description: page.metaDescription,
        url,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: {
          "@type": "Country",
          name: "United Arab Emirates",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_URL}/#services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.shortTitle,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
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

  return (
    <div className="service-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <a className="skip-link" href="#service-main">
        Skip to main content
      </a>

      <header className="site-header">
        <div className="site-shell flex h-[74px] items-center justify-between gap-6">
          <ServiceBrand />
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            <Link className="nav-link" href="/#services">
              Services
            </Link>
            <Link className="nav-link" href="/#why-evolura">
              Why Evolura
            </Link>
            <Link className="nav-link" href="/#contact">
              Contact
            </Link>
          </nav>
          <Link className="header-cta" href="/#request-service">
            Request a service
            <span aria-hidden="true">↘</span>
          </Link>
        </div>
      </header>

      <main id="service-main">
        <section className="service-page-hero">
          <div className="service-page-hero__orbit" aria-hidden="true" />
          <div className="site-shell relative z-10 py-28 md:py-36">
            <nav className="service-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/#services">Services</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{page.shortTitle}</span>
            </nav>
            <p className="section-kicker section-kicker--light mt-14">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="service-page-hero__intro">{page.introduction}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link className="primary-button" href="/#request-service">
                Request this service <span aria-hidden="true">↘</span>
              </Link>
              <a className="secondary-button" href="tel:+971503112307">
                Call +971 50 311 2307 <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="service-page-hero__proof" aria-label="Service highlights">
              <span>Dubai based</span>
              <i />
              <span>UAE coverage</span>
              <i />
              <span>24/7 support</span>
            </div>
          </div>
        </section>

        <section className="service-overview py-24 md:py-32">
          <div className="site-shell grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-24">
            <div>
              <p className="section-kicker">Service overview</p>
              <h2 className="section-title mt-5">A clear scope for a better-maintained property.</h2>
              <p className="service-lead">{page.summary}</p>
            </div>
            <div className="service-standards">
              <p>What you can expect</p>
              <ol>
                {page.standards.map((standard, index) => (
                  <li key={standard}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {standard}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="service-inclusions py-24 md:py-32" aria-labelledby="included-heading">
          <div className="site-shell">
            <p className="section-kicker">What is included</p>
            <h2 id="included-heading" className="section-title mt-5 max-w-[920px]">
              Practical services shaped around the facility.
            </h2>
            <div className="service-inclusions__grid">
              {page.inclusions.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="service-properties py-24 md:py-28">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="section-kicker section-kicker--light">Properties we support</p>
              <h2 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">
                Built around how your property is used.
              </h2>
            </div>
            <ul>
              {page.propertyTypes.map((property) => (
                <li key={property}>
                  <span aria-hidden="true">↗</span>
                  {property}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="service-process py-24 md:py-32" aria-labelledby="service-process-heading">
          <div className="site-shell">
            <p className="section-kicker">How it works</p>
            <h2 id="service-process-heading" className="section-title mt-5">
              From request to a clear next step.
            </h2>
            <ol className="service-process__grid">
              <li>
                <span>01</span>
                <h3>Share the property details</h3>
                <p>Tell us the location, service required, timing and the condition or issue.</p>
              </li>
              <li>
                <span>02</span>
                <h3>Confirm the service scope</h3>
                <p>Our team reviews the request and confirms the appropriate visit or plan.</p>
              </li>
              <li>
                <span>03</span>
                <h3>Arrange the service</h3>
                <p>We coordinate access, timing and the team needed for the agreed work.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="service-faq py-24 md:py-32" aria-labelledby="faq-heading">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="section-kicker">Frequently asked questions</p>
              <h2 id="faq-heading" className="section-title mt-5">
                Helpful answers before you request service.
              </h2>
            </div>
            <div className="faq-list">
              {page.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>
                    {faq.question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="related-services py-24 md:py-28" aria-labelledby="related-heading">
          <div className="site-shell">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="section-kicker">Related services</p>
                <h2 id="related-heading" className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                  Keep exploring Evolura.
                </h2>
              </div>
              <Link className="text-link" href="/#services">
                View all services <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="related-services__grid">
              {related.map((item, index) => (
                <Link href={`/services/${item.slug}`} key={item.slug}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.shortTitle}</h3>
                  <p>{item.metaDescription}</p>
                  <i aria-hidden="true">↗</i>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="service-final-cta">
          <div className="site-shell grid gap-10 py-20 lg:grid-cols-[1fr_auto] lg:items-end md:py-24">
            <div>
              <p>Ready to discuss the property?</p>
              <h2>Request cleaning or maintenance support across the UAE.</h2>
            </div>
            <Link href="/#request-service">
              Start your request <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-shell grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Link className="brand brand--inverse" href="/" aria-label="Evolura Technical Services home">
              <span className="brand__mark" aria-hidden="true">E</span>
              <span className="brand__copy">
                <strong>EVOLURA</strong>
                <small>TECHNICAL SERVICES</small>
              </span>
            </Link>
            <address className="service-footer-address">
              Ground Floor, Levana Residence, Al Barsha 1, Dubai, United Arab Emirates
              <br />
              <a href="tel:+971503112307">+971 50 311 2307</a>
              <span aria-hidden="true"> · </span>
              <a href="mailto:info@evolurats.com">info@evolurats.com</a>
            </address>
          </div>
          <a className="footer-top" href="#service-main">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </footer>

      <div className="mobile-action-bar" aria-label="Quick contact actions">
        <a href="tel:+971503112307">Call</a>
        <Link href="/#request-service">
          Request service <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
