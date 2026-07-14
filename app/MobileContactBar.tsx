import { BUSINESS, DEFAULT_WHATSAPP_QUOTE_URL } from "./site-config";

export function MobileContactBar({
  whatsappHref = DEFAULT_WHATSAPP_QUOTE_URL,
}: {
  whatsappHref?: string;
}) {
  return (
    <nav className="mobile-action-bar" aria-label="Quick contact actions">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Contact Evolura on WhatsApp (opens in a new tab)"
      >
        WhatsApp <span aria-hidden="true">↗</span>
      </a>
      <a href={BUSINESS.phoneHref}>Call <span aria-hidden="true">↗</span></a>
    </nav>
  );
}
