import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { ClipboardText } from "@phosphor-icons/react/dist/ssr/ClipboardText";
import { Fan } from "@phosphor-icons/react/dist/ssr/Fan";
import { Fire } from "@phosphor-icons/react/dist/ssr/Fire";
import { Funnel } from "@phosphor-icons/react/dist/ssr/Funnel";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { SprayBottle } from "@phosphor-icons/react/dist/ssr/SprayBottle";
import { JsonLd } from "./JsonLd";
import { KitchenHoodReveal } from "./KitchenHoodMotion";
import { MobileContactBar } from "./MobileContactBar";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import {
  SITE_URL,
  servicePages,
  type ServicePageContent,
  type ServiceSlug,
} from "./seo-content";
import { BUSINESS, createWhatsAppUrl } from "./site-config";
import styles from "./KitchenHoodLanding.module.css";

const processSteps = [
  {
    number: "01",
    title: "Review the kitchen",
    copy: "Share the kitchen type, cooking volume, operating hours and the extraction areas that need attention.",
  },
  {
    number: "02",
    title: "Confirm access and scope",
    copy: "We review the hood, filters and safely accessible duct and fan components before confirming the work.",
  },
  {
    number: "03",
    title: "Deep clean and degrease",
    copy: "The team protects the work area and removes grease, oil, carbon deposits and dirt from the agreed areas.",
  },
  {
    number: "04",
    title: "Inspect the finish",
    copy: "The cleaned components and surrounding work area are reviewed before the service is completed.",
  },
] as const;

const relatedSlugs: ServiceSlug[] = [
  "commercial-office-cleaning-dubai",
  "deep-post-construction-cleaning-dubai",
  "mep-hvac-maintenance-dubai",
  "facility-management-services-uae",
];

const scopeIcons = [
  ClipboardText,
  SprayBottle,
  Funnel,
  Fan,
  Fire,
  SprayBottle,
  ShieldCheck,
  CheckCircle,
  ClipboardText,
] as const;

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`${styles.sectionLabel} ${light ? styles.sectionLabelLight : ""}`}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

export function KitchenHoodLanding({ page }: { page: ServicePageContent }) {
  const url = `${SITE_URL}/services/${page.slug}`;
  const quoteHref = `/contact?service=${encodeURIComponent(page.slug)}#quote-form`;
  const whatsappHref = createWhatsAppUrl(
    "Hello Evolura, I would like a quote for commercial kitchen hood cleaning.",
  );
  const related = relatedSlugs.map((slug) => servicePages[slug]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.title,
        serviceType: "Commercial kitchen hood cleaning",
        description: page.metaDescription,
        url,
        image: `${SITE_URL}${page.image.src}`,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: { "@type": "Country", name: "United Arab Emirates" },
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Restaurants, cafés, hotels and commercial kitchens",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_URL}/services`,
          },
          { "@type": "ListItem", position: 3, name: page.shortTitle, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className={styles.page}>
      <JsonLd data={structuredData} />

      <a className="skip-link" href="#kitchen-hood-main">
        Skip to main content
      </a>

      <SiteHeader
        home={false}
        currentPath="/services"
        quoteHref={quoteHref}
        quoteLabel="Request a quote"
      />

      <main id="kitchen-hood-main" tabIndex={-1}>
        <section id="kitchen-hood-top" className={styles.hero} aria-labelledby="kitchen-hood-heading">
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/services">Services</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Commercial kitchen hood cleaning</span>
            </nav>

            <SectionLabel>Commercial extraction care · Dubai & UAE</SectionLabel>
            <h1 id="kitchen-hood-heading">
              Commercial kitchen hood cleaning <em>in Dubai</em>
            </h1>
            <p className={styles.heroLead}>
              Professional degreasing for cleaner hoods, filters and accessible extraction components.
            </p>
            <p className={styles.heroBody}>{page.introduction}</p>

            <div className={styles.heroActions}>
              <Link href={quoteHref}>
                Request a quote <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </Link>
              <a href={BUSINESS.phoneHref}>
                Call {BUSINESS.phoneDisplay} <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>

            <ul className={styles.heroProof} aria-label="Service highlights">
              <li><CheckCircle size={18} weight="fill" aria-hidden="true" /> Hoods & filters</li>
              <li><CheckCircle size={18} weight="fill" aria-hidden="true" /> Accessible ducts & fan parts</li>
              <li><CheckCircle size={18} weight="fill" aria-hidden="true" /> Before-and-after inspection</li>
            </ul>
          </div>

          <figure className={styles.heroVisual}>
            <Image
              src={page.image.src}
              alt={page.image.alt}
              fill
              priority
              quality={90}
              sizes="(max-width: 899px) 100vw, 53vw"
            />
            <div className={styles.heroShade} aria-hidden="true" />
            <figcaption>
              <span>Focused commercial care</span>
              Hood · filters · extraction
            </figcaption>
          </figure>
        </section>

        <nav className={styles.sectionNav} aria-label="On this page">
          <div className={styles.shell}>
            <span>Explore the service</span>
            <a href="#scope">Cleaning scope</a>
            <a href="#process">How it works</a>
            <a href="#kitchens">Kitchens supported</a>
            <a href="#faq">FAQs</a>
          </div>
        </nav>

        <section className={styles.overview} aria-labelledby="overview-heading">
          <KitchenHoodReveal className={`${styles.shell} ${styles.overviewGrid}`}>
            <div>
              <SectionLabel>Why hood cleaning matters</SectionLabel>
              <h2 id="overview-heading">{page.overviewHeading}</h2>
            </div>
            <div className={styles.overviewCopy}>
              <p>{page.summary}</p>
              <Link href="/services/mep-hvac-maintenance-dubai">
                Need wider extraction or HVAC support? Explore MEP & HVAC maintenance
                <ArrowRight size={17} weight="bold" aria-hidden="true" />
              </Link>
            </div>
          </KitchenHoodReveal>
        </section>

        <section id="scope" className={styles.scope} aria-labelledby="scope-heading">
          <div className={styles.shell}>
            <KitchenHoodReveal className={styles.headingRow}>
              <div>
                <SectionLabel>Detailed service scope</SectionLabel>
                <h2 id="scope-heading">{page.inclusionsHeading}</h2>
              </div>
              <p>
                The exact scope is confirmed around system access, equipment configuration and the level of buildup.
              </p>
            </KitchenHoodReveal>

            <KitchenHoodReveal className={styles.scopeGrid}>
              {page.inclusions.map((item, index) => {
                const Icon = scopeIcons[index];
                return (
                  <article className={styles.scopeCard} key={item.title}>
                    <div className={styles.scopeIcon}>
                      <Icon size={25} weight="duotone" aria-hidden="true" />
                    </div>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                );
              })}
            </KitchenHoodReveal>
          </div>
        </section>

        <section id="kitchens" className={styles.standards} aria-labelledby="kitchens-heading">
          <div className={`${styles.shell} ${styles.standardsGrid}`}>
            <KitchenHoodReveal className={styles.standardsIntro}>
              <SectionLabel light>Kitchens we support</SectionLabel>
              <h2 id="kitchens-heading">Built around active commercial kitchens.</h2>
              <p>{page.serviceFormat}.</p>
              <ul className={styles.propertyList}>
                {page.propertyTypes.map((property) => (
                  <li key={property}><ArrowUpRight size={17} aria-hidden="true" /> {property}</li>
                ))}
              </ul>
            </KitchenHoodReveal>

            <KitchenHoodReveal className={styles.standardPanel} delay={0.08}>
              <div className={styles.standardPanelHeading}>
                <ShieldCheck size={34} weight="duotone" aria-hidden="true" />
                <div>
                  <span>Service outcomes</span>
                  <h3>Careful work, clearly agreed.</h3>
                </div>
              </div>
              <ul>
                {page.standards.map((standard) => (
                  <li key={standard}><CheckCircle size={19} weight="fill" aria-hidden="true" /> {standard}</li>
                ))}
              </ul>
            </KitchenHoodReveal>
          </div>
        </section>

        <section id="process" className={styles.process} aria-labelledby="process-heading">
          <div className={styles.shell}>
            <KitchenHoodReveal className={styles.headingRow}>
              <div>
                <SectionLabel>How it works</SectionLabel>
                <h2 id="process-heading">From kitchen details to a clean finish.</h2>
              </div>
              <p>A straightforward process designed around access, operating schedules and the confirmed cleaning scope.</p>
            </KitchenHoodReveal>

            <ol className={styles.processGrid}>
              {processSteps.map((step, index) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <div className={styles.processLine} aria-hidden="true" />
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                  {index === processSteps.length - 1 ? <CheckCircle size={23} weight="fill" aria-hidden="true" /> : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="faq" className={styles.faq} aria-labelledby="faq-heading">
          <div className={`${styles.shell} ${styles.faqGrid}`}>
            <KitchenHoodReveal className={styles.faqIntro}>
              <SectionLabel>Commercial hood cleaning FAQs</SectionLabel>
              <h2 id="faq-heading">Useful answers before you request service.</h2>
              <p>Still deciding what your kitchen needs?</p>
              <Link href={quoteHref}>Discuss the scope with Evolura <ArrowRight size={17} aria-hidden="true" /></Link>
            </KitchenHoodReveal>

            <div className={styles.faqList}>
              {page.faqs.map((faq, index) => (
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
        </section>

        <section className={styles.related} aria-labelledby="related-heading">
          <div className={styles.shell}>
            <KitchenHoodReveal className={styles.headingRow}>
              <div>
                <SectionLabel>Related Evolura services</SectionLabel>
                <h2 id="related-heading">Keep the wider facility working well.</h2>
              </div>
              <Link className={styles.allServicesLink} href="/services">
                View all services <ArrowRight size={17} weight="bold" aria-hidden="true" />
              </Link>
            </KitchenHoodReveal>

            <div className={styles.relatedGrid}>
              {related.map((service) => (
                <Link className={styles.relatedCard} href={`/services/${service.slug}`} key={service.slug}>
                  <figure>
                    <Image
                      src={service.image.srcSmall}
                      alt={service.image.alt}
                      fill
                      sizes="(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 25vw"
                      quality={82}
                    />
                  </figure>
                  <div>
                    <span>{service.code}</span>
                    <h3>{service.directoryTitle}</h3>
                    <p>{service.directoryDescription}</p>
                    <i><ArrowUpRight size={18} weight="bold" aria-hidden="true" /></i>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="final-cta-heading">
          <div className={styles.shell}>
            <div>
              <SectionLabel light>Ready to plan the service?</SectionLabel>
              <h2 id="final-cta-heading">Request commercial kitchen hood cleaning in Dubai.</h2>
            </div>
            <Link href={quoteHref}>
              Request a quote <ArrowUpRight size={19} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter backToTopHref="#kitchen-hood-top" />
      <MobileContactBar whatsappHref={whatsappHref} />
    </div>
  );
}
