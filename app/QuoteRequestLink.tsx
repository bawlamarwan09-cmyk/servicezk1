import type { ReactNode } from "react";

export function QuoteRequestLink({
  service,
  children,
}: {
  service: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`/?service=${encodeURIComponent(service)}#request-service`}
      data-quote-service={service}
    >
      {children}
    </a>
  );
}
