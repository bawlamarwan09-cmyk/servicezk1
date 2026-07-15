import Link from "next/link";
import { MobileContactBar } from "./MobileContactBar";
import { QuoteRequestForm, QuoteRequestLink } from "./QuoteRequestForm";
import { ServiceDirectory } from "./ServiceDirectory";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { homeFaqs } from "./seo-content";
import { BUSINESS, DEFAULT_WHATSAPP_QUOTE_URL } from "./site-config";

const cleaningServices = [
  "Office & commercial cleaning",
  "Floor, carpet & upholstery care",
  "Window & washroom hygiene",
  "Post-construction & deep cleaning",
  "Daily, weekly & periodic plans",
];

const maintenanceServices = [
  "Civil & building maintenance",
  "Mechanical, electrical, plumbing & HVAC",
  "Painting, carpentry & flooring",
  "Preventive & breakdown support",
  "Emergency repair services",
];

const differentiators = [
  {
    number: "01",
    title: "Trained service teams",
    copy: "Professional staff selected for care, conduct and consistent workmanship.",
  },
  {
    number: "02",
    title: "Scope confirmed first",
    copy: "Timing, access and the requested work are reviewed before service is arranged.",
  },
  {
    number: "03",
    title: "Flexible service plans",
    copy: "One-time, periodic and ongoing plans shaped around your facility.",
  },
  {
    number: "04",
    title: "Property-aware care",
    copy: "The service approach is shaped around the space, surfaces, access and agreed scope.",
  },
  {
    number: "05",
    title: "Urgent request support",
    copy: "Urgent repairs are reviewed based on the issue, location, access and availability.",
  },
];

const processSteps = [
  ["01", "Tell us what you need", "Share the space, service and preferred timing."],
  ["02", "Request a quotation", "We review the scope and provide a clear next step."],
  ["03", "Our team completes the service", "The right team arrives and delivers with care."],
];

// Replace these qualitative indicators only when approved, verifiable figures are available.
const trustIndicators = [
  {
    label: "Dubai based",
    copy: "Located in Al Barsha 1, Dubai.",
  },
  {
    label: "UAE requests",
    copy: "Coverage and timing are confirmed for each property.",
  },
  {
    label: "Direct contact",
    copy: "Contact Evolura by WhatsApp, phone or email.",
  },
  {
    label: "Flexible contracts",
    copy: "One-time, periodic and ongoing service plans.",
  },
];

// These category images illustrate services and are not presented as client projects.
const recentWork = [
  {
    title: "Commercial cleaning",
    slug: "commercial-office-cleaning-dubai",
    image: "/services/commercial-office-cleaning.webp",
    imageSmall: "/services/commercial-office-cleaning-720.webp",
    alt: "Illustrative commercial cleaning service preview",
  },
  {
    title: "Deep cleaning",
    slug: "deep-post-construction-cleaning-dubai",
    image: "/services/post-construction-cleaning.webp",
    imageSmall: "/services/post-construction-cleaning-720.webp",
    alt: "Illustrative deep cleaning service preview",
  },
  {
    title: "Building maintenance",
    slug: "building-maintenance-dubai",
    image: "/services/building-maintenance.webp",
    imageSmall: "/services/building-maintenance-720.webp",
    alt: "Illustrative building maintenance service preview",
  },
  {
    title: "HVAC maintenance",
    slug: "mep-hvac-maintenance-dubai",
    image: "/services/mep-hvac-maintenance.webp",
    imageSmall: "/services/mep-hvac-maintenance-720.webp",
    alt: "Illustrative HVAC maintenance service preview",
  },
  {
    title: "Facility management",
    slug: "facility-management-services-uae",
    image: "/services/facility-management.webp",
    imageSmall: "/services/facility-management-720.webp",
    alt: "Illustrative facility management service preview",
  },
];

const contactItems = [
  {
    label: "Call us",
    value: BUSINESS.phoneDisplay,
    href: BUSINESS.phoneHref,
  },
  {
    label: "Email",
    value: BUSINESS.email,
    href: `mailto:${BUSINESS.email}`,
  },
  {
    label: "Visit",
    value: BUSINESS.shortAddress,
    href: BUSINESS.mapsUrl,
  },
];

export function EvoluraLanding() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#0b2434]">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <section id="top" className="hero-section" aria-labelledby="hero-heading" tabIndex={-1}>
          {/* Pre-sized WebP sources keep the brochure hero responsive without a runtime image transformer. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hero-section__image"
            src="/evolura-hero.webp"
            srcSet="/evolura-hero-960.webp 960w, /evolura-hero-1440.webp 1440w, /evolura-hero.webp 1823w"
            sizes="(max-width: 767px) 160vw, 100vw"
            alt="Facility technician operating a floor scrubber in a bright modern lobby"
            width="1823"
            height="863"
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero-section__veil" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--two" aria-hidden="true" />

          <div className="site-shell hero-section__content">
            <div className="hero-section__copy text-white">
              <p className="hero-eyebrow hero-enter hero-enter--1">
                <span /> Commercial cleaning & building maintenance · Dubai & UAE
              </p>
              <h1 id="hero-heading" className="hero-heading hero-enter hero-enter--2">
                Commercial Cleaning &
                <br />
                Building Maintenance
                <br />
                <em>in Dubai & UAE</em>
              </h1>
              <p className="hero-description hero-enter hero-enter--3">
                Professional cleaning and technical maintenance for offices, commercial
                properties and facilities. Clear quotations, trained teams and flexible
                service contracts.
              </p>
              <div className="hero-actions hero-enter hero-enter--4">
                <a className="primary-button" href={DEFAULT_WHATSAPP_QUOTE_URL} target="_blank" rel="noreferrer" aria-label="Request a quote on WhatsApp (opens in a new tab)">
                  Request a WhatsApp Quote <span aria-hidden="true">↗</span>
                </a>
                <a className="secondary-button" href={BUSINESS.phoneHref}>
                  Call Us Now <span aria-hidden="true">↗</span>
                </a>
              </div>
              <ul className="hero-trust-line hero-enter hero-enter--4" aria-label="Service assurances">
                <li>Fast response</li>
                <li>Trained staff</li>
                <li>Dubai-wide service</li>
                <li>Flexible contracts</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-labelledby="trust-strip-heading">
          <h2 id="trust-strip-heading" className="sr-only">Evolura service information</h2>
          <div className="site-shell trust-strip__grid">
            {trustIndicators.map((item, index) => (
              <article className="trust-indicator reveal" key={item.label}>
                <span aria-hidden="true">0{index + 1}</span>
                <div>
                  <h3>{item.label}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="services"
          className="services-section section-anchor bg-[#f4f8fa] py-16 md:py-20"
          aria-labelledby="services-heading"
          tabIndex={-1}
        >
          <div className="services-section__halo" aria-hidden="true" />
          <div className="site-shell">
            <div className="reveal grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="section-kicker">Our services</p>
                <h2 id="services-heading" className="section-title mt-5 max-w-[700px]">
                  Cleaning and technical maintenance.
                  <br />
                  Coordinated through one request.
                </h2>
              </div>
              <p className="max-w-[600px] text-base leading-8 text-[#536b79] lg:justify-self-end lg:pt-12 md:text-lg">
                From the everyday care that keeps your workplace fresh to the technical
                support that keeps your building performing, Evolura makes facility care
                feel straightforward.
              </p>
            </div>

            <div id="service-categories" className="section-anchor mt-14 grid gap-5 lg:grid-cols-2">
              <article className="service-card service-card--cleaning scroll-lift-card">
                <div className="service-card__topline">
                  <span>01 / Cleaning</span>
                  <span>Healthy spaces</span>
                </div>
                <figure className="service-card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/services/commercial-office-cleaning.webp"
                    srcSet="/services/commercial-office-cleaning-720.webp 720w, /services/commercial-office-cleaning.webp 1440w"
                    sizes="(max-width: 1023px) calc(100vw - 36px), 50vw"
                    alt="Professional cleaner wiping a glass partition in a modern office"
                    width="1440"
                    height="900"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>Workplace care, delivered with precision</figcaption>
                </figure>
                <div className="service-card__intro">
                  <span className="service-card__monogram" aria-hidden="true">
                    CL
                  </span>
                  <h3>Commercial cleaning services</h3>
                  <p>
                    Professional office and commercial cleaning in Dubai, with flexible
                    support for managed facilities across the UAE.
                  </p>
                </div>
                <ul>
                  {cleaningServices.map((service) => (
                    <li key={service}>
                      <span aria-hidden="true">↗</span>
                      {service}
                    </li>
                  ))}
                </ul>
                <QuoteRequestLink service="commercial-office-cleaning-dubai">
                  Request cleaning <span aria-hidden="true">→</span>
                </QuoteRequestLink>
              </article>

              <article className="service-card service-card--maintenance scroll-lift-card">
                <div className="service-card__topline">
                  <span>02 / Maintenance</span>
                  <span>Reliable solutions</span>
                </div>
                <figure className="service-card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/services/mep-hvac-maintenance.webp"
                    srcSet="/services/mep-hvac-maintenance-720.webp 720w, /services/mep-hvac-maintenance.webp 1440w"
                    sizes="(max-width: 1023px) calc(100vw - 36px), 50vw"
                    alt="HVAC technician checking an air-handling control panel"
                    width="1440"
                    height="900"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>Technical expertise, ready when you need it</figcaption>
                </figure>
                <div className="service-card__intro">
                  <span className="service-card__monogram" aria-hidden="true">
                    MT
                  </span>
                  <h3>Building maintenance services</h3>
                  <p>
                    Responsive building, MEP and HVAC maintenance that supports comfort,
                    safety and day-to-day property operation.
                  </p>
                </div>
                <ul>
                  {maintenanceServices.map((service) => (
                    <li key={service}>
                      <span aria-hidden="true">↗</span>
                      {service}
                    </li>
                  ))}
                </ul>
                <QuoteRequestLink service="building-maintenance-dubai">
                  Request maintenance <span aria-hidden="true">→</span>
                </QuoteRequestLink>
              </article>
            </div>

           import Link from "next/link";
            <ServiceDirectory headingId="explore-services-heading" headingLevel={4} />
          </div>
        </section>

        <section
          id="why-evolura"
          className="section-anchor bg-white py-24 md:py-32"
          aria-labelledby="why-evolura-heading"
          tabIndex={-1}
        >
          <div className="site-shell">
            <div className="reveal max-w-[860px]">
              <p className="section-kicker">Why choose Evolura?</p>
              <h2 id="why-evolura-heading" className="section-title mt-5">
                Care you can see.
                <br />
                Standards you can trust.
              </h2>
            </div>

            <div className="mt-14 grid border-y border-[#cfdae0] md:grid-cols-2 xl:grid-cols-5">
              {differentiators.map((item, index) => (
                <article
                  className={`reason-card reveal ${index > 0 ? "reason-card--border" : ""}`}
                  key={item.number}
                >
                  <div className="reason-card__number">{item.number}</div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
            <Link className="text-link mt-9" href="/about">
              About Evolura and how we work <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section
          id="how-it-works"
          className="process-section section-anchor py-24 md:py-28"
          aria-labelledby="process-heading"
          tabIndex={-1}
        >
          <div className="site-shell">
            <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="section-kicker section-kicker--light">How it works</p>
                <h2 id="process-heading" className="process-heading">
                  Three clear steps to a better-maintained space.
                </h2>
              </div>
              <p className="process-section__intro">
                One clear request is all it takes to get the right cleaning or maintenance
                support moving.
              </p>
            </div>
            <ol className="process-grid">
              {processSteps.map(([number, title, copy]) => (
                <li className="process-step reveal" key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="service-gallery"
          className="recent-work section-anchor py-24 md:py-32"
          aria-labelledby="service-gallery-heading"
          tabIndex={-1}
        >
          <div className="site-shell">
            <div className="recent-work__heading reveal">
              <div>
                <p className="section-kicker section-kicker--light">Service preview gallery</p>
                <h2 id="service-gallery-heading">
                  Explore Evolura&apos;s cleaning and maintenance services.
                </h2>
              </div>
              <div>
                <p>
                  These images illustrate Evolura&apos;s service categories and the types of
                  work customers can request.
                </p>
                <strong>They are service previews—not client project photographs.</strong>
              </div>
            </div>
            <div className="recent-work__grid">
              {recentWork.map((item) => (
                <a
                  className="recent-work__card reveal"
                  href={`/services/${item.slug}`}
                  key={item.title}
                  aria-label={`View ${item.title} service details`}
                >
                  <figure>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      srcSet={`${item.imageSmall} 720w, ${item.image} 1440w`}
                      sizes="(max-width: 767px) calc(100vw - 36px), (max-width: 1279px) 50vw, 33vw"
                      alt={item.alt}
                      width="1440"
                      height="900"
                      loading="lazy"
                      decoding="async"
                    />
                    <span>Service preview</span>
                    <figcaption>
                      <div>
                        <h3>{item.title}</h3>
                        <p>View service scope and request details.</p>
                      </div>
                      <i aria-hidden="true">↗</i>
                    </figcaption>
                  </figure>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="coverage-section py-24 md:py-32" aria-labelledby="coverage-heading">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-end lg:gap-24">
            <div className="reveal reveal--left">
              <p className="section-kicker">Dubai based · UAE coverage</p>
              <h2 id="coverage-heading" className="section-title mt-5">
                Facility care for properties across the United Arab Emirates.
              </h2>
            </div>
            <div className="reveal reveal--right">
              <p className="coverage-section__lead">
                Based in Al Barsha 1, Dubai, Evolura accepts cleaning, building maintenance,
                MEP, HVAC and facility management requests across the UAE. Coverage and
                timing are confirmed after reviewing the property location and scope.
              </p>
              <ul className="coverage-section__types">
                <li>Offices & workplaces</li>
                <li>Commercial buildings</li>
                <li>Managed residential facilities</li>
                <li>Retail & shared areas</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="home-faq py-24 md:py-32" aria-labelledby="home-faq-heading">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div className="reveal reveal--left">
              <p className="section-kicker">Frequently asked questions</p>
              <h2 id="home-faq-heading" className="section-title mt-5">
                Cleaning and maintenance answers for UAE properties.
              </h2>
            </div>
            <div className="faq-list reveal reveal--right">
              {homeFaqs.map((faq) => (
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

        <section
          id="request-service"
          className="section-anchor request-section py-24 md:py-32"
          aria-labelledby="request-service-heading"
          tabIndex={-1}
        >
          <div className="site-shell grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div className="reveal">
              <p className="section-kicker">Request a quotation</p>
              <h2 id="request-service-heading" className="section-title mt-5">Tell us what your space needs.</h2>
              <p className="mt-7 max-w-[540px] text-base leading-8 text-[#5e707b] md:text-lg">
                Share five quick details. Our team can then confirm the right service,
                timing and next step for your property.
              </p>

              <div id="contact" className="mt-12 divide-y divide-[#d5e0e5] border-y border-[#d5e0e5]" tabIndex={-1}>
                {contactItems.map((item) => (
                  <a
                    className="contact-row"
                    href={item.href}
                    key={item.label}
                    target={item.label === "Visit" ? "_blank" : undefined}
                    rel={item.label === "Visit" ? "noreferrer" : undefined}
                    aria-label={
                      item.label === "Visit"
                        ? "View Evolura's office location in Google Maps (opens in a new tab)"
                        : undefined
                    }
                  >
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <i aria-hidden="true">↗</i>
                  </a>
                ))}
              </div>
            </div>

            <QuoteRequestForm />
          </div>
        </section>
      </main>

      <SiteFooter backToTopHref="#top" brandHref="#top" showTagline />

      <MobileContactBar />
    </div>
  );
}
