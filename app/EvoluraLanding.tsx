"use client";

import { FormEvent, useEffect, useState } from "react";
import { homeFaqs } from "./seo-content";

const WHATSAPP_NUMBER = "971503112307";
const WHATSAPP_QUOTE_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello Evolura, I would like a free quote for cleaning or building maintenance.",
)}`;

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
  ["02", "Receive a free quotation", "We review the scope and provide a clear next step."],
  ["03", "Our team completes the service", "The right team arrives and delivers with care."],
];

// Replace these qualitative indicators only when approved, verifiable figures are available.
const trustIndicators = [
  {
    label: "Fast quotations",
    copy: "Direct support through WhatsApp or phone.",
  },
  {
    label: "Trained teams",
    copy: "Professional staff selected for care and conduct.",
  },
  {
    label: "Dubai-wide service",
    copy: "Support for offices, properties and facilities.",
  },
  {
    label: "Flexible contracts",
    copy: "One-time, periodic and ongoing service plans.",
  },
];

const serviceHighlights = [
  {
    slug: "commercial-office-cleaning-dubai",
    number: "01",
    title: "Commercial & office cleaning",
    copy: "Scheduled workplace cleaning, floors, carpets, windows and washroom hygiene in Dubai.",
    icon: "CL",
    image: "/services/commercial-office-cleaning.webp",
    imageSmall: "/services/commercial-office-cleaning-720.webp",
    imageAlt: "Professional cleaner wiping a glass partition in a modern office",
  },
  {
    slug: "deep-post-construction-cleaning-dubai",
    number: "02",
    title: "Deep & post-construction cleaning",
    copy: "Detailed cleaning for properties preparing for use, reopening or handover.",
    icon: "DC",
    image: "/services/post-construction-cleaning.webp",
    imageSmall: "/services/post-construction-cleaning-720.webp",
    imageAlt: "Cleaning team removing fine dust from a newly finished commercial interior",
  },
  {
    slug: "building-maintenance-dubai",
    number: "03",
    title: "Building maintenance",
    copy: "Civil works, painting, carpentry, flooring, preventive care and emergency repairs.",
    icon: "BM",
    image: "/services/building-maintenance.webp",
    imageSmall: "/services/building-maintenance-720.webp",
    imageAlt: "Building maintenance technician repairing a door fitting",
  },
  {
    slug: "mep-hvac-maintenance-dubai",
    number: "04",
    title: "MEP & HVAC maintenance",
    copy: "Mechanical, electrical, plumbing and air-conditioning support for managed properties.",
    icon: "HV",
    image: "/services/mep-hvac-maintenance.webp",
    imageSmall: "/services/mep-hvac-maintenance-720.webp",
    imageAlt: "HVAC technician checking an air-handling control panel",
  },
  {
    slug: "facility-management-services-uae",
    number: "05",
    title: "Facility management across the UAE",
    copy: "Coordinated cleaning and technical maintenance under one service relationship.",
    icon: "FM",
    image: "/services/facility-management.webp",
    imageSmall: "/services/facility-management-720.webp",
    imageAlt: "Facility manager reviewing a tablet in a modern building lobby",
  },
];

// These are illustrative placeholders, not claimed client projects. Replace with verified project photography.
const recentWork = [
  {
    title: "Commercial cleaning",
    image: "/services/commercial-office-cleaning.webp",
    imageSmall: "/services/commercial-office-cleaning-720.webp",
    alt: "Illustrative commercial cleaning service preview",
  },
  {
    title: "Deep cleaning",
    image: "/services/post-construction-cleaning.webp",
    imageSmall: "/services/post-construction-cleaning-720.webp",
    alt: "Illustrative deep cleaning service preview",
  },
  {
    title: "Building maintenance",
    image: "/services/building-maintenance.webp",
    imageSmall: "/services/building-maintenance-720.webp",
    alt: "Illustrative building maintenance service preview",
  },
  {
    title: "HVAC maintenance",
    image: "/services/mep-hvac-maintenance.webp",
    imageSmall: "/services/mep-hvac-maintenance-720.webp",
    alt: "Illustrative HVAC maintenance service preview",
  },
  {
    title: "Facility management",
    image: "/services/facility-management.webp",
    imageSmall: "/services/facility-management-720.webp",
    alt: "Illustrative facility management service preview",
  },
  {
    title: "Office cleaning",
    image: "/services/commercial-office-cleaning.webp",
    imageSmall: "/services/commercial-office-cleaning-720.webp",
    alt: "Illustrative office cleaning service preview",
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
  const [formStatusType, setFormStatusType] = useState<"success" | "error" | "">("");
  const [selectedService, setSelectedService] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsHeaderCompact(window.scrollY > 40);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setFormStatus("Please complete the required fields before continuing.");
      setFormStatusType("error");
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const requiredTextFields = ["name", "phone", "location", "message"];
    const emptyField = requiredTextFields.find((name) => !value(name));

    if (emptyField) {
      setFormStatus("Please complete the required fields before continuing.");
      setFormStatusType("error");
      (form.elements.namedItem(emptyField) as HTMLElement | null)?.focus();
      return;
    }

    if (value("phone").replace(/\D/g, "").length < 7) {
      setFormStatus("Please enter a valid phone or WhatsApp number.");
      setFormStatusType("error");
      (form.elements.namedItem("phone") as HTMLInputElement | null)?.focus();
      return;
    }

    const message = [
      "Hello Evolura, I would like to request a service.",
      "",
      `Name: ${value("name")}`,
      `Phone / WhatsApp: ${value("phone")}`,
      `Service: ${value("service")}`,
      `Location: ${value("location")}`,
      `Request details: ${value("message")}`,
    ].join("\n");

    setFormStatus("Your quote request is ready. WhatsApp will open so you can send it.");
    setFormStatusType("success");
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

      <header className={`site-header ${isHeaderCompact ? "site-header--compact" : ""}`}>
        <div className="site-shell site-header__inner">
          <Brand />
          <nav className="desktop-navigation" aria-label="Main navigation">
            <a className="nav-link" href="#services">
              Services
            </a>
            <a className="nav-link" href="#why-evolura">
              Why Evolura
            </a>
            <a className="nav-link" href="#how-it-works">
              How it works
            </a>
            <a className="nav-link" href="#recent-work">
              Recent work
            </a>
            <a className="nav-link" href="#contact">
              Contact
            </a>
          </nav>
          <div className="header-actions">
            <a className="header-cta" href="#request-service">
              Get a quote
              <span aria-hidden="true">↘</span>
            </a>
            <button
              className={`mobile-menu-toggle ${menuOpen ? "is-open" : ""}`}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <nav
          id="mobile-navigation"
          className={`mobile-navigation ${menuOpen ? "is-open" : ""}`}
          aria-label="Mobile navigation"
        >
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#why-evolura" onClick={() => setMenuOpen(false)}>Why Evolura</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#recent-work" onClick={() => setMenuOpen(false)}>Recent work</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
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
                properties and facilities. Fast quotations, trained teams and flexible
                service contracts.
              </p>
              <div className="hero-actions hero-enter hero-enter--4">
                <a className="primary-button" href={WHATSAPP_QUOTE_URL} target="_blank" rel="noreferrer">
                  Get a Free WhatsApp Quote <span aria-hidden="true">↗</span>
                </a>
                <a className="secondary-button" href="tel:+971503112307">
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

        <section className="trust-strip" aria-label="Why property teams contact Evolura">
          <div className="site-shell trust-strip__grid">
            {trustIndicators.map((item, index) => (
              <article className="trust-indicator reveal" key={item.label}>
                <span aria-hidden="true">0{index + 1}</span>
                <div>
                  <h2>{item.label}</h2>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
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

            <div id="service-categories" className="section-anchor mt-14 grid gap-5 lg:grid-cols-2">
              <article className="service-card service-card--cleaning reveal reveal--left">
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
                <div
                  className="seo-services-heading__meta"
                  aria-label="Five services available across Dubai and the UAE"
                >
                  <span>05 focused services</span>
                  <i aria-hidden="true" />
                  <span>Dubai + UAE</span>
                </div>
              </div>
            </div>
            <div className="seo-services-grid" aria-labelledby="explore-services-heading">
              {serviceHighlights.map((service, index) => (
                <a
                  className={`seo-service-card seo-service-card--${index + 1}`}
                  href={`/services/${service.slug}`}
                  key={service.slug}
                >
                  <figure className="seo-service-card__media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.image}
                      srcSet={`${service.imageSmall} 720w, ${service.image} 1440w`}
                      sizes="(max-width: 767px) calc(100vw - 36px), (max-width: 1279px) 50vw, 33vw"
                      alt={service.imageAlt}
                      width="1440"
                      height="900"
                      loading="lazy"
                      decoding="async"
                    />
                    <span>{service.number}</span>
                  </figure>
                  <div className="seo-service-card__body">
                    <div className="seo-service-card__meta">
                      <span className="seo-service-card__icon" aria-hidden="true">
                        {service.icon}
                      </span>
                      <span className="seo-service-card__eyebrow">Service {service.number}</span>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
                    <span className="seo-service-card__cta">
                      View Service <i aria-hidden="true">↗</i>
                    </span>
                  </div>
                </a>
              ))}
            </div>
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

        <section
          id="how-it-works"
          className="process-section section-anchor py-24 md:py-28"
          aria-labelledby="process-heading"
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
          id="recent-work"
          className="recent-work section-anchor py-24 md:py-32"
          aria-labelledby="recent-work-heading"
        >
          <div className="site-shell">
            <div className="recent-work__heading reveal">
              <div>
                <p className="section-kicker section-kicker--light">Our Recent Work</p>
                <h2 id="recent-work-heading">
                  A dedicated place for verified project results.
                </h2>
              </div>
              <div>
                <p>
                  This gallery is ready for Evolura&apos;s approved before-and-after and
                  completed-project photography.
                </p>
                <strong>Current images are illustrative service previews—not client projects.</strong>
              </div>
            </div>
            <div className="recent-work__grid">
              {recentWork.map((item) => (
                <a
                  className="recent-work__card reveal"
                  href={item.image}
                  target="_blank"
                  rel="noreferrer"
                  key={item.title}
                  aria-label={`Open ${item.title} illustrative preview`}
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
                    <span>Illustrative preview</span>
                    <figcaption>
                      <div>
                        <h3>{item.title}</h3>
                        <p>Replace with a verified Evolura project photo.</p>
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

        <section id="request-service" className="section-anchor request-section py-24 md:py-32">
          <div className="site-shell grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div className="reveal">
              <p className="section-kicker">Free quotation</p>
              <h2 className="section-title mt-5">Tell us what your space needs.</h2>
              <p className="mt-7 max-w-[540px] text-base leading-8 text-[#5e707b] md:text-lg">
                Share five quick details. Our team can then confirm the right service,
                timing and next step for your property.
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

            <form
              className="request-form reveal reveal--delay"
              aria-labelledby="quote-form-heading"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-heading">
                <span id="quote-form-heading">Free quote request</span>
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

              <div className="form-submit-row">
                <div className="form-submit-actions">
                  <button type="submit">
                    Request a Free Quote <span aria-hidden="true">↗</span>
                  </button>
                  <a href={WHATSAPP_QUOTE_URL} target="_blank" rel="noreferrer">
                    WhatsApp us <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <p
                  className={formStatusType ? `form-status form-status--${formStatusType}` : "form-status"}
                  aria-live="polite"
                >
                  {formStatus}
                </p>
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

      <div className="mobile-action-bar" aria-label="Quick contact actions">
        <a href={WHATSAPP_QUOTE_URL} target="_blank" rel="noreferrer">
          WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <a href="tel:+971503112307">Call <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  );
}
