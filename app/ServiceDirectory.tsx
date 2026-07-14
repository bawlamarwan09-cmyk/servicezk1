import Link from "next/link";
import { servicePageList } from "./seo-content";

export function ServiceDirectory({
  headingId,
  headingLevel = 3,
}: {
  headingId: string;
  headingLevel?: 2 | 3 | 4;
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  return (
    <ul className="seo-services-grid" aria-labelledby={headingId}>
      {servicePageList.map((service, index) => {
        const titleId = `service-${service.slug}-title`;
        const descriptionId = `service-${service.slug}-description`;

        return (
          <li key={service.slug}>
            <Link
              className={`seo-service-card seo-service-card--${index + 1} scroll-lift-card`}
              href={`/services/${service.slug}`}
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
            >
              <figure className="seo-service-card__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image.src}
                  srcSet={`${service.image.srcSmall} 720w, ${service.image.src} 1440w`}
                  sizes="(max-width: 767px) calc(100vw - 36px), (max-width: 1279px) 50vw, 33vw"
                  alt={service.image.alt}
                  width="1440"
                  height="900"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="seo-service-card__body">
                <div className="seo-service-card__meta" aria-hidden="true">
                  <span className="seo-service-card__icon">{service.code}</span>
                  <span className="seo-service-card__eyebrow">
                    Service {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <Heading id={titleId}>{service.directoryTitle}</Heading>
                <p id={descriptionId}>{service.directoryDescription}</p>
                <span className="seo-service-card__cta" aria-hidden="true">
                  View service <i>↗</i>
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
