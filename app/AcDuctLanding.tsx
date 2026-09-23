import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { Buildings } from "@phosphor-icons/react/dist/ssr/Buildings";
import { Broom } from "@phosphor-icons/react/dist/ssr/Broom";
import { CalendarCheck } from "@phosphor-icons/react/dist/ssr/CalendarCheck";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { Clock } from "@phosphor-icons/react/dist/ssr/Clock";
import { Fan } from "@phosphor-icons/react/dist/ssr/Fan";
import { Gauge } from "@phosphor-icons/react/dist/ssr/Gauge";
import { HouseLine } from "@phosphor-icons/react/dist/ssr/HouseLine";
import { Leaf } from "@phosphor-icons/react/dist/ssr/Leaf";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { MapPin } from "@phosphor-icons/react/dist/ssr/MapPin";
import { Phone } from "@phosphor-icons/react/dist/ssr/Phone";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { Sparkle } from "@phosphor-icons/react/dist/ssr/Sparkle";
import { Storefront } from "@phosphor-icons/react/dist/ssr/Storefront";
import { Wind } from "@phosphor-icons/react/dist/ssr/Wind";
import { Wrench } from "@phosphor-icons/react/dist/ssr/Wrench";
import { Brand } from "./Brand";
import { MobileContactBar } from "./MobileContactBar";
import { QuoteLinkController } from "./QuoteLinkController";
import { QuoteRequestForm } from "./QuoteRequestForm";
import { QuoteRequestLink } from "./QuoteRequestLink";
import { ReviewSection } from "./ReviewSection";
import { SiteHeader } from "./SiteHeader";
import { BUSINESS, createWhatsAppUrl } from "./site-config";
import styles from "./AcDuctLanding.module.css";

export const acDuctLandingFaqs = [
  {
    question: "Why is AC duct cleaning important?",
    answer:
      "Dust, dirt and debris can build up inside ducts and around vents over time. Professional cleaning removes accessible buildup, supports cleaner airflow and can help reduce dusty odors in the property.",
  },
  {
    question: "How often should I clean my AC ducts?",
    answer:
      "There is no single schedule for every property. The right timing depends on system use, indoor dust, recent renovation work, odors, airflow and the condition found during inspection.",
  },
  {
    question: "Do you provide AC duct cleaning for apartments and villas?",
    answer:
      "Yes. Evolura accepts AC duct cleaning requests for apartments, villas, offices, shops and managed commercial properties across Dubai, subject to access and system scope.",
  },
  {
    question: "Can duct cleaning help with allergies?",
    answer:
      "Duct cleaning is not a medical treatment, but removing accumulated dust and debris may support a cleaner indoor environment. Speak with a healthcare professional for allergy-specific advice.",
  },
  {
    question: "How long does the service take?",
    answer:
      "Timing depends on the property size, number of vents, duct access and the amount of buildup. Share your property details and Evolura can confirm the likely scope before the visit.",
  },
] as const;

const scopeItems = [
  {
    number: "01",
    icon: MagnifyingGlass,
    title: "Duct and vent inspection",
    copy: "We review accessible ducts, vents and system access points before cleaning begins.",
  },
  {
    number: "02",
    icon: Broom,
    title: "Professional dust removal",
    copy: "High-powered vacuum and cleaning equipment remove accumulated dust, dirt and debris.",
  },
  {
    number: "03",
    icon: Wind,
    title: "Supply and return ducts",
    copy: "Accessible supply and return air ducts are cleaned within the confirmed service scope.",
  },
  {
    number: "04",
    icon: Fan,
    title: "Vents, grilles and diffusers",
    copy: "Accessible covers and air outlets receive detailed cleaning for a cleaner system finish.",
  },
  {
    number: "05",
    icon: CheckCircle,
    title: "Final system check",
    copy: "We review the agreed cleaned areas and access points before completing the visit.",
  },
] as const;

const benefits = [
  {
    icon: Leaf,
    title: "Cleaner indoor air",
    copy: "Helps reduce the circulation of accumulated dust and debris.",
  },
  {
    icon: HouseLine,
    title: "More comfort",
    copy: "Supports fresher airflow throughout homes and workplaces.",
  },
  {
    icon: Gauge,
    title: "Better airflow",
    copy: "A cleaner duct system can support more efficient AC performance.",
  },
  {
    icon: ShieldCheck,
    title: "Peace of mind",
    copy: "A professional scope, careful setup and final inspection.",
  },
] as const;

const processSteps = [
  {
    number: "01",
    icon: Phone,
    title: "Request a quote",
    copy: "Share the property, location and signs you have noticed.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Confirm the scope",
    copy: "We review access, system details and a suitable service time.",
  },
  {
    number: "03",
    icon: Broom,
    title: "Professional cleaning",
    copy: "The team cleans the agreed ducts, vents and access points.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Final inspection",
    copy: "The cleaned areas are checked before the visit is completed.",
  },
] as const;

const relatedServices = [
  {
    title: "MEP & HVAC maintenance",
    copy: "Preventive maintenance and responsive technical support for managed properties.",
    href: "/services/mep-hvac-maintenance-dubai",
    image: "/services/mep-hvac-maintenance.webp",
    alt: "HVAC technician checking an air-handling control panel",
  },
  {
    title: "Deep cleaning",
    copy: "Detailed cleaning for properties preparing for use, reopening or handover.",
    href: "/services/deep-post-construction-cleaning-dubai",
    image: "/services/post-construction-cleaning.webp",
    alt: "Cleaning team removing fine dust from a newly finished commercial interior",
  },
  {
    title: "Building maintenance",
    copy: "Planned and responsive support for the everyday condition of your property.",
    href: "/services/building-maintenance-dubai",
    image: "/services/building-maintenance.webp",
    alt: "Building maintenance technician repairing a door fitting",
  },
] as const;

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`${styles.sectionLabel} ${light ? styles.sectionLabelLight : ""}`}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

export function AcDuctLanding() {
  const whatsappHref = createWhatsAppUrl(
    "Hello Evolura, I would like a quote for AC duct cleaning.",
  );

  return (
    <div className={styles.page}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <SiteHeader quoteHref="#request-service" quoteLabel="Get a free quote" />
      <QuoteLinkController />

      <main id="main-content" tabIndex={-1}>
        <section id="top" className={styles.hero} aria-labelledby="hero-heading" tabIndex={-1}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/services">Services</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">AC Duct Cleaning</span>
              </nav>

              <SectionLabel>Healthier spaces · brighter tomorrows</SectionLabel>
              <h1 id="hero-heading">
                AC Duct Cleaning
                <br />
                <em>in Dubai</em>
              </h1>
              <p className={styles.heroLead}>Cleaner air. Fresher spaces. More comfortable living.</p>
              <p className={styles.heroBody}>
                Professional AC duct cleaning for apartments, villas, offices and businesses
                across Dubai. Remove accumulated dust and debris with a carefully confirmed scope.
              </p>

              <div className={styles.heroActions}>
                <QuoteRequestLink service="ac-duct-cleaning-dubai">
                  Book a service <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
                </QuoteRequestLink>
                <a href="#request-service">
                  Get a free quote <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
                </a>
              </div>

              <ul className={styles.heroProof} aria-label="AC duct cleaning benefits">
                <li><Leaf size={22} aria-hidden="true" /><span>Cleaner indoor air</span></li>
                <li><Wind size={22} aria-hidden="true" /><span>Reduced dust circulation</span></li>
                <li><HouseLine size={22} aria-hidden="true" /><span>Homes & businesses</span></li>
                <li><MapPin size={22} aria-hidden="true" /><span>Dubai based</span></li>
              </ul>
            </div>

            <div className={styles.heroVisual}>
              <Image
                src="/services/ac-duct-cleaning.webp"
                alt="Professional technician cleaning an air-conditioning duct in a modern Dubai apartment"
                fill
                priority
                unoptimized
                sizes="(max-width: 899px) 100vw, 58vw"
              />
              <div className={styles.heroCaption}>
                <span>Clean air.</span>
                Brighter living.
              </div>
              <div className={styles.heroGlass}>
                <Wind size={26} weight="light" aria-hidden="true" />
                <span>Professional duct care for Dubai properties</span>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className={styles.overview} aria-labelledby="overview-heading">
          <div className={styles.shell}>
            <div className={styles.overviewGrid}>
              <div className={styles.overviewCopy}>
                <SectionLabel>Service overview</SectionLabel>
                <h2 id="overview-heading">Fresh air starts with clean ducts.</h2>
                <p>
                  Over time, dust, dirt and debris can build up inside AC ducts and around
                  vents. Professional cleaning removes accessible buildup, supports cleaner
                  airflow and helps maintain a fresher indoor environment.
                </p>
                <ul className={styles.overviewList}>
                  <li><Buildings size={23} aria-hidden="true" />Residential and commercial properties</li>
                  <li><Leaf size={23} aria-hidden="true" />Cleaner, fresher indoor environment</li>
                  <li><Wind size={23} aria-hidden="true" />Reduced circulation of accumulated dust</li>
                  <li><Gauge size={23} aria-hidden="true" />Support for airflow and AC performance</li>
                </ul>
                <Link className={styles.textLink} href="/services/ac-duct-cleaning-dubai">
                  Explore the full service scope <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>

              <figure className={styles.overviewVisual}>
                <Image
                  src="/services/ac-duct-cleaning.webp"
                  alt="Technician using professional vacuum equipment to clean an accessible ceiling duct"
                  fill
                  unoptimized
                  sizes="(max-width: 899px) 100vw, 52vw"
                />
                <figcaption>A cleaner tomorrow starts in your space.</figcaption>
              </figure>
            </div>

            <dl className={styles.propertyBand} aria-label="AC duct cleaning service details">
              <div><dt>Suitable for</dt><dd>Apartments, villas, offices and shops</dd></div>
              <div><dt>Service focus</dt><dd>Ducts, vents, grilles and diffusers</dd></div>
              <div><dt>Equipment</dt><dd>High-powered vacuum and professional tools</dd></div>
            </dl>
          </div>
        </section>

        <section className={styles.scope} aria-labelledby="scope-heading">
          <div className={styles.shell}>
            <div className={styles.scopeIntro}>
              <div>
                <SectionLabel light>Our AC duct cleaning service</SectionLabel>
                <h2 id="scope-heading">What&apos;s included in our service?</h2>
              </div>
              <p>
                A complete, professional scope carried out with suitable equipment and a
                clear final inspection of the agreed accessible areas.
              </p>
            </div>

            <ol className={styles.scopeList}>
              {scopeItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.number}>
                    <span className={styles.scopeNumber}>{item.number}</span>
                    <span className={styles.scopeIcon}><Icon size={28} weight="light" aria-hidden="true" /></span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                    <ArrowUpRight className={styles.scopeArrow} size={20} aria-hidden="true" />
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section id="benefits" className={styles.benefits} aria-labelledby="benefits-heading">
          <div className={styles.shell}>
            <div className={styles.sectionHeadingRow}>
              <div>
                <SectionLabel>The difference</SectionLabel>
                <h2 id="benefits-heading">A cleaner space brings bigger benefits.</h2>
              </div>
              <p>
                Clean ducts do more than improve presentation—they support comfortable,
                fresher airflow and help your AC system work as intended.
              </p>
            </div>

            <div className={styles.benefitGrid}>
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <article key={benefit.title}>
                    <Icon size={35} weight="light" aria-hidden="true" />
                    <h3>{benefit.title}</h3>
                    <p>{benefit.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className={styles.process} aria-labelledby="process-heading">
          <div className={styles.shell}>
            <div className={styles.sectionHeadingRow}>
              <div>
                <SectionLabel>How it works</SectionLabel>
                <h2 id="process-heading">A simple process from start to finish.</h2>
              </div>
              <p>Share the property details and Evolura will confirm the appropriate next step.</p>
            </div>

            <ol className={styles.processGrid}>
              {processSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <li key={step.number}>
                    <span className={styles.processIcon}><Icon size={27} aria-hidden="true" /></span>
                    <span className={styles.processNumber}>{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </li>
                );
              })}
            </ol>

            <div className={styles.bookingBanner}>
              <Image
                src="/ac-duct-cta-living-room.webp"
                alt="Bright contemporary Dubai living room with a clean ceiling air vent"
                fill
                unoptimized
                sizes="(max-width: 899px) 100vw, 1280px"
              />
              <div className={styles.bookingOverlay} />
              <div className={styles.bookingCopy}>
                <SectionLabel light>Cleaner air for a brighter tomorrow</SectionLabel>
                <h2>Book your AC duct cleaning in Dubai.</h2>
                <p>Tell us about your property and the issue you have noticed.</p>
                <QuoteRequestLink service="ac-duct-cleaning-dubai">
                  Request AC duct cleaning <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
                </QuoteRequestLink>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className={styles.faq} aria-labelledby="faq-heading">
          <div className={styles.shell}>
            <div className={styles.faqGrid}>
              <aside className={styles.faqIntro}>
                <SectionLabel>Common questions</SectionLabel>
                <h2 id="faq-heading">Helpful answers before you book.</h2>
                <div className={styles.expectationCard}>
                  <Sparkle size={28} weight="light" aria-hidden="true" />
                  <p>Clear scope. Careful setup. Professional equipment. A final inspection.</p>
                  <span>What to expect from Evolura</span>
                </div>
              </aside>

              <div className={styles.accordion}>
                {acDuctLandingFaqs.map((faq, index) => (
                  <details key={faq.question} open={index === 0}>
                    <summary>
                      <span>{faq.question}</span>
                      <i aria-hidden="true">+</i>
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.related} aria-labelledby="related-heading">
          <div className={styles.shell}>
            <div className={styles.relatedHeading}>
              <div>
                <SectionLabel>Explore more</SectionLabel>
                <h2 id="related-heading">Other services you may need.</h2>
              </div>
              <Link href="/services">View all services <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
            <p className={styles.previewNote}>Service previews—not client project photographs.</p>

            <div className={styles.relatedGrid}>
              {relatedServices.map((service) => (
                <Link href={service.href} className={styles.relatedCard} key={service.href}>
                  <figure>
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      unoptimized
                      sizes="(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 33vw"
                    />
                  </figure>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
                    <span aria-hidden="true"><ArrowUpRight size={19} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="coverage" className={styles.coverage} aria-labelledby="coverage-heading">
          <div className={styles.shell}>
            <div className={styles.coverageGrid}>
              <div>
                <SectionLabel light>Dubai based · UAE requests reviewed</SectionLabel>
                <h2 id="coverage-heading">Cleaner air for the places where life happens.</h2>
              </div>
              <ul>
                <li><HouseLine size={25} aria-hidden="true" />Apartments & villas</li>
                <li><Buildings size={25} aria-hidden="true" />Offices & workplaces</li>
                <li><Storefront size={25} aria-hidden="true" />Shops & retail spaces</li>
                <li><Wrench size={25} aria-hidden="true" />Managed commercial properties</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="request-service" className={styles.request} aria-labelledby="request-heading" tabIndex={-1}>
          <div className={styles.shell}>
            <div className={styles.requestGrid}>
              <div className={styles.requestIntro}>
                <SectionLabel>Get a free quote</SectionLabel>
                <h2 id="request-heading">Tell us about your space.</h2>
                <p>
                  Share the location, property type and the dust, odor or airflow issue you
                  have noticed. Evolura will review the scope and confirm the next step.
                </p>
                <div className={styles.contactList}>
                  <a href={BUSINESS.phoneHref}><Phone size={22} aria-hidden="true" /><span><small>Call Evolura</small>{BUSINESS.phoneDisplay}</span></a>
                  <a href={BUSINESS.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={22} aria-hidden="true" /><span><small>Dubai office</small>Al Barsha 1, Dubai</span></a>
                  <div><Clock size={22} aria-hidden="true" /><span><small>Request options</small>One-off focused service</span></div>
                </div>
              </div>
              <QuoteRequestForm />
            </div>
          </div>
        </section>

        <ReviewSection />

        <section className={styles.finalCta} aria-labelledby="final-cta-heading">
          <div className={styles.shell}>
            <SectionLabel light>Ready for cleaner air?</SectionLabel>
            <div className={styles.finalCtaRow}>
              <div>
                <h2 id="final-cta-heading">Let&apos;s make your space fresher.</h2>
                <p>Professional AC duct cleaning for homes and businesses across Dubai.</p>
              </div>
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                Get a WhatsApp quote <ArrowUpRight size={19} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <Brand href="#top" />
              <p>Cleaner air. Brighter spaces.</p>
              <a href={BUSINESS.phoneHref}><Phone size={18} aria-hidden="true" />{BUSINESS.phoneDisplay}</a>
            </div>
            <nav aria-label="Service links">
              <h2>Services</h2>
              <Link href="/services/ac-duct-cleaning-dubai">AC duct cleaning</Link>
              <Link href="/services/mep-hvac-maintenance-dubai">MEP & HVAC maintenance</Link>
              <Link href="/services/deep-post-construction-cleaning-dubai">Deep cleaning</Link>
              <Link href="/services/commercial-kitchen-hood-cleaning-dubai">Kitchen hood cleaning</Link>
            </nav>
            <nav aria-label="Company links">
              <h2>Company</h2>
              <Link href="/about">About Evolura</Link>
              <a href="#benefits">Why Evolura</a>
              <a href="#coverage">Service areas</a>
              <Link href="/contact">Contact</Link>
            </nav>
            <nav aria-label="Resource links">
              <h2>Resources</h2>
              <a href="#faq">FAQs</a>
              <Link href="/services">All services</Link>
              <Link href="/privacy">Privacy</Link>
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </nav>
          </div>
          <div className={styles.footerBottom}>
            <p>© {new Date().getFullYear()} Evolura Technical Services. All rights reserved.</p>
            <p>Dubai, United Arab Emirates</p>
          </div>
        </div>
      </footer>

      <MobileContactBar whatsappHref={whatsappHref} />
    </div>
  );
}
