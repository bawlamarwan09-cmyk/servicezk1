export function Brand({
  inverse = false,
  href = "/",
}: {
  inverse?: boolean;
  href?: string;
}) {
  return (
    <a
      className={`brand ${inverse ? "brand--inverse" : ""}`}
      href={href}
      aria-label="Evolura Technical Services home"
    >
      <span className="brand__mark" aria-hidden="true">
        {/* The mark is cropped from Evolura's supplied company brochure. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/evolura-mark-192.png" alt="" width="192" height="192" />
      </span>
      <span className="brand__copy">
        <strong>EVOLURA</strong>
        <small>TECHNICAL SERVICES</small>
      </span>
    </a>
  );
}
