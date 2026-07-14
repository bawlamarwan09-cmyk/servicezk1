export const BUSINESS = {
  name: "Evolura Technical Services",
  phoneDisplay: "+971 50 311 2307",
  phoneHref: "tel:+971503112307",
  whatsappNumber: "971503112307",
  email: "info@evolurats.com",
  address:
    "Ground Floor, Levana Residence, Al Barsha 1, Dubai, United Arab Emirates",
  shortAddress:
    "Ground Floor, Levana Residence, Al Barsha 1, Dubai, UAE",
  mapsUrl:
    "https://maps.google.com/?q=Levana+Residence+Al+Barsha+1+Dubai",
} as const;

export const SERVICE_OPTIONS = [
  {
    value: "commercial-office-cleaning-dubai",
    label: "Commercial & office cleaning",
  },
  {
    value: "deep-post-construction-cleaning-dubai",
    label: "Deep & post-construction cleaning",
  },
  {
    value: "building-maintenance-dubai",
    label: "Building maintenance",
  },
  {
    value: "mep-hvac-maintenance-dubai",
    label: "MEP & HVAC maintenance",
  },
  {
    value: "facility-management-services-uae",
    label: "Facility management",
  },
  {
    value: "emergency-repair",
    label: "Emergency repair",
  },
  {
    value: "not-sure",
    label: "Not sure — advise me",
  },
] as const;

export type ServiceOptionValue =
  (typeof SERVICE_OPTIONS)[number]["value"];

export function getServiceLabel(value: string): string {
  return (
    SERVICE_OPTIONS.find((service) => service.value === value)?.label ??
    value
  );
}

export function isServiceOption(
  value: string,
): value is ServiceOptionValue {
  return SERVICE_OPTIONS.some(
    (service) => service.value === value,
  );
}