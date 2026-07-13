"use client";

import { FormEvent, useState } from "react";
import { homeFaqs } from "./seo-content";

const cleaningServices = [
  "Daily, weekly & periodic cleaning",
  "Office & commercial cleaning",
  "Floor care, scrubbing, polishing & shampooing",
  "Carpet & upholstery cleaning",
  "Window cleaning",
  "Washroom hygiene & sanitization",
  "Post-construction & deep cleaning",
];

const maintenanceServices = [
  "Civil & building maintenance",
  "Mechanical, electrical & plumbing",
  "HVAC maintenance",
  "Painting & wall maintenance",
  "Carpentry & flooring works",
  "Preventive & breakdown maintenance",
  "Emergency repair services",
];

const differentiators = [
  {
    number: "01",
    title: "Trained & verified staff",
    copy: "Professional teams selected for care, conduct and consistent workmanship.",
  },
  {
    number: "02",
    title: "Quality assurance",
    copy: "Clear standards and attentive supervision from first visit to final check.",
  },
  {
    number: "03",
    title: "Flexible service",
    copy: "One-time, periodic and ongoing plans shaped around your facility.",
  },
  {
    number: "04",
    title: "Safe, eco-friendly care",
    copy: "Thoughtful practices that support healthier people, spaces and surroundings.",
  },
  {
    number: "05",
    title: "24/7 quick response",
    copy: "Reliable support when an urgent repair or service request cannot wait.",
  },
];

const processSteps = [
  ["01", "Tell us what you need", "Share the space, service and preferred timing."],
  ["02", "Receive a clear plan", "We review the request and arrange the right team."],
  ["03", "Enjoy a better space", "Your service is delivered with care and attention."],
];

const serviceHighlights = [
  {
    slug: "commercial-office-cleaning-dubai",
    number: "01",
    title: "Commercial & office cleaning",
    copy: "Scheduled workplace cleaning, floors, carpets, windows and washroom hygiene in Dubai.",
    image: "/services/commercial-office-cleaning.webp",
    imageWidth: 1672,
    imageHeight: 941,
  },
  {
    slug: "deep-post-construction-cleaning-dubai",
    number: "02",
    title: "Deep & post-construction cleaning",
    copy: "Detailed cleaning for properties preparing for use, reopening or handover.",
    image: "/services/post-construction-cleaning.webp",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    slug: "building-maintenance-dubai",
    number: "03",
    title: "Building maintenance",
    copy: "Civil works, painting, carpentry, flooring, preventive care and emergency repairs.",
    image: "/services/building-maintenance.webp",
    imageWidth: 1660,
    imageHeight: 948,
  },
  {
    slug: "mep-hvac-maintenance-dubai",
    number: "04",
    title: "MEP & HVAC maintenance",
    copy: "Mechanical, electrical, plumbing and air-conditioning support for managed properties.",
    image: "/services/mep-hvac-maintenance.webp",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    slug: "facility-management-services-uae",
    number: "05",
    title: "Facility management across the UAE",
    copy: "Coordinated cleaning and technical maintenance under one service relationship.",
    image: "/services/facility-management.webp",
    imageWidth: 1780,
    imageHeight: 883,
  },
];

const contactItems = [
  {
    label: "Call us",
    value: "+971 50 311 2307",
    href: "tel:+971503112307",
  },
  {
    label: "Email",
    value: "info@evolurats.com",
    href: "mailto:info@evolurats.com",
  },
  {
    label: "Visit",
    value: "Ground Floor, Levana Residence, Al Barsha 1, Dubai, UAE",
    href: "https://maps.google.com/?q=Levana+Residence+Al+Barsha+1+Dubai",
  },
];

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a
      className={`brand ${inverse ? "brand--inverse" : ""}`}
      href="#top"
      aria-label="Evolura Technical Services home"
    >
      <span className="brand__mark" aria-hidden="true">
        E
      </span>
      <span className="brand__copy">
        <strong>EVOLURA</strong>
        <small>TECHNICAL SERVICES</small>
      </span>
    </a>
  );
}

export function EvoluraLanding() {
  const [formStatus, setFormStatus] = useState("");
  const [selectedService, setSelectedService] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setFormStatus("Please complete the required fields before continuing.");
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const requiredTextFields = ["name", "phone", "location", "message"];
    const emptyField = requiredTextFields.find((name) => !value(name));

    if (emptyField) {
      setFormStatus("Please complete the required fields before continuing.");
      (form.elements.namedItem(emptyField) as HTMLElement | null)?.focus();
      return;
    }

    if (value("phone").replace(/\D/g, "").length < 7) {
      setFormStatus("Please enter a valid phone or WhatsApp number.");
      (form.elements.namedItem("phone") as HTMLInputElement | null)?.focus();
      return;
    }

    const message = [
      "Hello Evolura, I would like to request a service.",
      "",
      `Name: ${value("name")}`,
      `Phone / WhatsApp: ${value("phone")}`,
      `Email: ${value("email") || "Not provided"}`,
      `Service: ${value("service")}`,
      `Property / company: ${value("property") || "Not provided"}`,
      `Location: ${value("location")}`,
      `Preferred date: ${value("date") || "Flexible"}`,
      `Request details: ${value("message")}`,
    ].join("\n");

    setFormStatus("Your details are ready — continue in WhatsApp to send them.");
    window.open(
      `https://wa.me/971503112307?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#0b2434]">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <div className="site-shell flex h-[74px] items-center justify-between gap-6">
          <Brand />
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            <a className="nav-link" href="#services">
              Services
            </a>
            <a className="nav-link" href="#why-evolura">
              Why Evolura
            </a>
            <a className="nav-link" href="#commitment">
              Commitment
            </a>
            <a className="nav-link" href="#contact">
              Contact
            </a>
          </nav>
          <a className="header-cta" href="#request-service">
            Request a service
            <span aria-hidden="true">↘</span>
          </a>
        </div>
      </header>

      <main id="main-content">
        <section id="top" className="hero-section" aria-labelledby="hero-heading">
          {/* Pre-sized WebP sources keep the brochure hero responsive without a runtime image transformer. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hero-section__image"
            src="/evolura-hero.webp"
            srcSet="/evolura-hero-960.webp 960w, /evolura-hero-1440.webp 1440w, /evolura-hero.webp 1823w"
            sizes="100vw"
            alt="Facility technician operating a floor scrubber in a bright modern lobby"
            width="1823"
            height="863"
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero-section__veil" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--two" aria-hidden="true" />

          <div className="site-shell relative z-10 flex min-h-[760px] items-center pb-24 pt-28 lg:min-h-[820px]">
            <div className="max-w-[900px] text-white">
              <p className="hero-eyebrow hero-enter hero-enter--1">
                <span /> Commercial cleaning & building maintenance · Dubai & UAE
              </p>
              <h1
                id="hero-heading"
                className="hero-enter hero-enter--2 mt-6 text-[clamp(3.4rem,7vw,7.1rem)] font-bold uppercase leading-[0.89] tracking-[-0.07em]"
              >
                Commercial cleaning.
                <br />
                Building maintenance.
                <br />
                <em>Dubai & UAE.</em>
              </h1>
              <p className="hero-enter hero-enter--3 mt-8 max-w-[640px] text-base leading-7 text-white/76 md:text-lg md:leading-8">
                Clean spaces. Well-maintained places. Better living. Evolura provides
                professional cleaning, MEP, HVAC and facility maintenance solutions for
                offices, commercial buildings and managed properties.
              </p>
              <div className="hero-enter hero-enter--4 mt-9 flex flex-col gap-3 sm:flex-row">
                <a className="primary-button" href="#request-service">
                  Request a service <span aria-hidden="true">↘</span>
                </a>
                <a className="secondary-button" href="#services">
                  Explore our services <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>

          <div className="hero-proof">
            <div className="site-shell grid items-center gap-6 py-5 md:grid-cols-[1.4fr_1fr]">
              <p className="text-lg font-semibold uppercase leading-tight tracking-[-0.025em] text-white md:text-2xl">
                We maintain standards. <span>You focus on what matters.</span>
              </p>
              <div className="flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65 md:justify-end md:gap-8">
                <span>Verified teams</span>
                <i />
                <span>Safe practices</span>
                <i />
                <span>24/7 response</span>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services-section section-anchor bg-[#f4f8fa] py-24 md:py-32">
          <div className="services-section__halo" aria-hidden="true" />
          <div className="site-shell">
            <div className="reveal grid items-end gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="section-kicker">Our services</p>
                <h2 className="section-title mt-5 max-w-[700px]">
                  Cleaning and technical maintenance.
                  <br />
                  One trusted UAE team.
                </h2>
              </div>
              <p className="max-w-[600px] text-base leading-8 text-[#536b79] lg:justify-self-end lg:pb-2 md:text-lg">
                From the everyday care that keeps your workplace fresh to the technical
                support that keeps your building performing, Evolura makes facility care
                feel straightforward.
              </p>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              <article className="service-card service-card--cleaning reveal reveal--left">
                <div className="service-card__topline">
                  <span>01 / Cleaning</span>
                  <span>Healthy spaces</span>
                </div>
                <figure className="service-card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/services/commercial-office-cleaning.webp"
                    alt=""
                    width="1672"
                    height="941"
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
                <a
                  href="#request-service"
                  onClick={() => setSelectedService("Cleaning services")}
                >
                  Request cleaning <span aria-hidden="true">→</span>
                </a>
              </article>

              <article className="service-card service-card--maintenance reveal reveal--right">
                <div className="service-card__topline">
                  <span>02 / Maintenance</span>
                  <span>Reliable solutions</span>
                </div>
                <figure className="service-card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/services/mep-hvac-maintenance.webp"
                    alt=""
                    width="1536"
                    height="1024"
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
                    Responsive building, MEP and HVAC maintenance that protects comfort,
                    safety and property value.
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
                <a
                  href="#request-service"
                  onClick={() => setSelectedService("Maintenance services")}
                >
                  Request maintenance <span aria-hidden="true">→</span>
                </a>
              </article>
            </div>

            <div className="seo-services-heading reveal">
              <div>
                <p className="section-kicker">Explore by service</p>
                <h3 id="explore-services-heading">
                  Find the right expertise for every corner of your property.
                </h3>
              </div>
              <div className="seo-services-heading__side">
                <p>
                  Explore each service scope, the properties we support and how to arrange
                  a tailored visit across the United Arab Emirates.
                </p>
                <div className="seo-services-heading__meta" aria-label="Five services available across Dubai and the UAE">
                  <span>05 focused services</span>
                  <i aria-hidden="true" />
                  <span>Dubai + UAE</span>
                </div>
              </div>
            </div>
            <div className="seo-services-grid" aria-labelledby="explore-services-heading">
              {serviceHighlights.map((service, index) => (
                <a
                  className={`seo-service-card seo-service-card--${index + 1} reveal`}
                  href={`/services/${service.slug}`}
                  key={service.slug}
                >
                  <figure className="seo-service-card__media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.image}
                      alt=""
                      width={service.imageWidth}
                      height={service.imageHeight}
                      loading="lazy"
                      decoding="async"
                    />
                    <span>{service.number}</span>
                  </figure>
                  <div className="seo-service-card__body">
                    <span className="seo-service-card__eyebrow">View service</span>
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
                    <i aria-hidden="true">↗</i>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="process-section py-24 md:py-28" aria-labelledby="process-heading">
          <div className="site-shell">
            <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="section-kicker section-kicker--light">Simple from the start</p>
                <h2 id="process-heading" className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
                  Service without the friction.
                </h2>
              </div>
              <p className="max-w-[390px] text-sm leading-7 text-white/58 md:text-base">
                One clear request is all it takes to get the right cleaning or maintenance
                support moving.
              </p>
            </div>
            <ol className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/12 md:grid-cols-3">
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

        <section id="why-evolura" className="section-anchor bg-white py-24 md:py-32">
          <div className="site-shell">
            <div className="reveal max-w-[860px]">
              <p className="section-kicker">Why choose Evolura?</p>
              <h2 className="section-title mt-5">
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
          </div>
        </section>

        <section id="commitment" className="section-anchor commitment-section">
          <div className="site-shell grid min-h-[700px] items-stretch lg:grid-cols-[1.05fr_0.95fr]">
            <div className="reveal flex flex-col justify-between py-24 pr-0 text-white lg:py-32 lg:pr-20">
              <div>
                <p className="section-kicker section-kicker--light">Our commitment</p>
                <h2 className="mt-5 max-w-[760px] text-[clamp(3.2rem,6.3vw,6.7rem)] font-semibold leading-[0.93] tracking-[-0.07em]">
                  Better care for every space we touch.
                </h2>
              </div>
              <p className="mt-16 max-w-[720px] text-base leading-8 text-white/65 md:text-lg md:leading-9">
                We deliver high-quality cleaning and maintenance services with integrity,
                reliability and attention to detail. Our goal is to enhance the value,
                safety and comfort of every facility we manage in Dubai and across the UAE.
              </p>
            </div>

            <div className="commitment-panel reveal reveal--delay">
              <div className="commitment-panel__glow" aria-hidden="true" />
              <p>Our standard</p>
              <div className="commitment-panel__seal" aria-hidden="true">
                E
              </div>
              <ul>
                <li>
                  <span>01</span> Cleaning excellence
                </li>
                <li>
                  <span>02</span> Expert maintenance
                </li>
                <li>
                  <span>03</span> Healthy environments
                </li>
                <li>
                  <span>04</span> Reliable solutions
                </li>
              </ul>
              <a href="#request-service">
                Start your request <span aria-hidden="true">↘</span>
              </a>
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

        <section id="request-service" className="section-anchor request-section py-24 md:py-32">
          <div className="site-shell grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div className="reveal">
              <p className="section-kicker">Request a service</p>
              <h2 className="section-title mt-5">Tell us what your space needs.</h2>
              <p className="mt-7 max-w-[540px] text-base leading-8 text-[#5e707b] md:text-lg">
                Share a few details and continue in WhatsApp. Our team can then confirm the
                best service, timing and next step for your property.
              </p>

              <div id="contact" className="mt-12 divide-y divide-[#d5e0e5] border-y border-[#d5e0e5]">
                {contactItems.map((item) => (
                  <a
                    className="contact-row"
                    href={item.href}
                    key={item.label}
                    target={item.label === "Visit" ? "_blank" : undefined}
                    rel={item.label === "Visit" ? "noreferrer" : undefined}
                  >
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <i aria-hidden="true">↗</i>
                  </a>
                ))}
              </div>
            </div>

            <form className="request-form reveal reveal--delay" onSubmit={handleSubmit} noValidate>
              <div className="form-heading">
                <span>Service request</span>
                <span>Fields marked * are required</span>
              </div>

              <div className="form-grid">
                <label className="form-field">
                  <span>Full name *</span>
                  <input name="name" type="text" autoComplete="name" placeholder="Your name" required />
                </label>
                <label className="form-field">
                  <span>Phone / WhatsApp *</span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+971 50 123 4567"
                    pattern="[+() 0-9-]{7,20}"
                    required
                  />
                </label>
                <label className="form-field">
                  <span>Email</span>
                  <input name="email" type="email" autoComplete="email" placeholder="name@company.com" />
                </label>
                <label className="form-field">
                  <span>Property / company</span>
                  <input name="property" type="text" autoComplete="organization" placeholder="Building or company name" />
                </label>
                <label className="form-field">
                  <span>Service needed *</span>
                  <select
                    name="service"
                    value={selectedService}
                    onChange={(event) => setSelectedService(event.currentTarget.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option>Cleaning services</option>
                    <option>Maintenance services</option>
                    <option>MEP services</option>
                    <option>HVAC maintenance</option>
                    <option>Emergency repair</option>
                    <option>Not sure — advise me</option>
                  </select>
                </label>
                <label className="form-field">
                  <span>Preferred date</span>
                  <input name="date" type="date" />
                </label>
                <label className="form-field form-field--full">
                  <span>Property location *</span>
                  <input
                    name="location"
                    type="text"
                    autoComplete="street-address"
                    placeholder="Area, building or full address"
                    required
                  />
                </label>
                <label className="form-field form-field--full">
                  <span>How can we help? *</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about the space, issue, size or timing..."
                    required
                  />
                </label>
              </div>

              <label className="consent-field">
                <input name="consent" type="checkbox" required />
                <span>
                  I agree that Evolura may use these details only to respond to my service
                  request. *
                </span>
              </label>

              <div className="form-submit-row">
                <button type="submit">
                  Continue in WhatsApp <span aria-hidden="true">↗</span>
                </button>
                <p aria-live="polite">{formStatus}</p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-shell">
          <div className="grid gap-10 py-14 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <Brand inverse />
              <p className="mt-7 max-w-[670px] text-3xl font-semibold uppercase leading-tight tracking-[-0.04em] text-white md:text-5xl">
                Cleaner environments. Stronger buildings. <span>Better tomorrow.</span>
              </p>
              <address className="service-footer-address">
                Ground Floor, Levana Residence, Al Barsha 1, Dubai, United Arab Emirates
                <br />
                <a href="tel:+971503112307">+971 50 311 2307</a>
                <span aria-hidden="true"> · </span>
                <a href="mailto:info@evolurats.com">info@evolurats.com</a>
              </address>
            </div>
            <a className="footer-top" href="#top">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
          <div className="flex flex-col gap-4 border-t border-white/12 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Evolura Technical Services.</p>
            <nav className="footer-service-nav" aria-label="Service pages">
              {serviceHighlights.map((service) => (
                <a href={`/services/${service.slug}`} key={service.slug}>
                  {service.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>

      <a className="floating-service" href="#request-service">
        <span>Request service</span>
        <i aria-hidden="true">↘</i>
      </a>

      <div className="mobile-action-bar" aria-label="Quick contact actions">
        <a href="tel:+971503112307">Call</a>
        <a href="#request-service">Request service <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  );
}
