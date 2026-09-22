const FALLBACK_SITE_URL =
  "https://evolura-technical-services.bawlamarwan09.chatgpt.site";

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) return FALLBACK_SITE_URL;

  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    return new URL(withProtocol).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL,
);

// Update this only when indexable content changes; sitemap dates should describe real edits.
export const CONTENT_LAST_MODIFIED = new Date("2026-09-22T00:00:00.000Z");

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServiceSlug =
  | "commercial-office-cleaning-dubai"
  | "deep-post-construction-cleaning-dubai"
  | "ac-duct-cleaning-dubai"
  | "commercial-kitchen-hood-cleaning-dubai"
  | "building-maintenance-dubai"
  | "mep-hvac-maintenance-dubai"
  | "facility-management-services-uae";

export type ServicePageContent = {
  slug: ServiceSlug;
  shortTitle: string;
  directoryTitle: string;
  directoryDescription: string;
  code: string;
  image: {
    src: string;
    srcSmall: string;
    alt: string;
  };
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  overviewHeading: string;
  inclusionsHeading: string;
  serviceFormat: string;
  introduction: string;
  summary: string;
  inclusions: Array<{ title: string; copy: string }>;
  propertyTypes: string[];
  standards: string[];
  faqs: FaqItem[];
  related: ServiceSlug[];
};

export const homeFaqs: FaqItem[] = [
  {
    question: "Does Evolura provide commercial cleaning services in Dubai?",
    answer:
      "Yes. Evolura provides scheduled and one-off cleaning for offices, commercial spaces and managed facilities in Dubai, including floor care, carpet and upholstery cleaning, window cleaning, washroom sanitization and deep cleaning.",
  },
  {
    question: "Which building maintenance services are available?",
    answer:
      "Our building maintenance scope includes civil works, mechanical, electrical and plumbing maintenance, HVAC care, painting, carpentry, flooring, preventive maintenance, breakdown support and emergency repairs.",
  },
  {
    question: "Do you provide cleaning and maintenance outside Dubai?",
    answer:
      "Evolura is based in Al Barsha 1, Dubai and supports service requests across the United Arab Emirates. Share your property location in the request form so our team can confirm availability and timing.",
  },
  {
    question: "Can I request urgent maintenance support?",
    answer:
      "Yes. Evolura accepts urgent breakdown and emergency repair requests. Availability and timing are confirmed after reviewing the issue, property location, access and the team required.",
  },
  {
    question: "How do I request a cleaning or maintenance quotation?",
    answer:
      "Complete the service request form with your location, service type and a short description. The form prepares a WhatsApp message for you to review and send. After you send it, Evolura can review the scope and arrange the next step.",
  },
  {
    question: "What information should I include in a quote request?",
    answer:
      "Include the property location, service needed, a short description of the space or issue, preferred timing and any access details. These details help Evolura review the scope and confirm the next step.",
  },
  {
    question: "What helps determine the recommended service scope?",
    answer:
      "The property type, condition, areas included, requested frequency, timing and access requirements help determine the appropriate cleaning or maintenance scope.",
  },
];

export const servicePages: Record<ServiceSlug, ServicePageContent> = {
  "commercial-office-cleaning-dubai": {
    slug: "commercial-office-cleaning-dubai",
    shortTitle: "Commercial cleaning",
    directoryTitle: "Commercial & office cleaning",
    directoryDescription:
      "Scheduled workplace cleaning, floors, carpets, windows and washroom hygiene in Dubai.",
    code: "CL",
    image: {
      src: "/services/commercial-office-cleaning.webp",
      srcSmall: "/services/commercial-office-cleaning-720.webp",
      alt: "Professional cleaner wiping a glass partition in a modern office",
    },
    metaTitle: "Commercial Cleaning Services Dubai | Evolura",
    metaDescription:
      "Professional office and commercial cleaning in Dubai and across the UAE, including scheduled cleaning, floors, carpets, windows and washroom hygiene.",
    eyebrow: "Commercial cleaning services · Dubai & UAE",
    title: "Commercial and office cleaning services in Dubai",
    overviewHeading: "Commercial cleaning plans for workplaces and managed properties",
    inclusionsHeading: "What commercial and office cleaning can include",
    serviceFormat: "Daily, weekly, periodic or focused one-off support",
    introduction:
      "A clean workplace protects the experience of employees, visitors and customers. Evolura provides professional commercial cleaning services for offices and managed properties, with plans shaped around the space, operating hours and required frequency.",
    summary:
      "Choose daily, weekly or periodic support for consistent workplace hygiene, or request a focused service for floors, carpets, windows and shared areas. Our team coordinates the scope before arrival so the service fits the property instead of interrupting it.",
    inclusions: [
      {
        title: "Scheduled office cleaning",
        copy: "Daily, weekly and periodic cleaning for workstations, shared areas and commercial facilities.",
      },
      {
        title: "Floor care",
        copy: "Scrubbing, polishing and shampooing selected to suit the condition and finish of the floor.",
      },
      {
        title: "Carpet and upholstery care",
        copy: "Detailed cleaning for carpets, seating and fabric surfaces in frequently used business spaces.",
      },
      {
        title: "Windows and glass",
        copy: "Professional window and internal glass cleaning for a brighter, well-presented property.",
      },
      {
        title: "Washroom hygiene",
        copy: "Cleaning and sanitization of washrooms and other high-touch shared areas.",
      },
      {
        title: "Periodic deep cleaning",
        copy: "A more intensive reset for areas that need attention beyond the regular cleaning routine.",
      },
    ],
    propertyTypes: [
      "Corporate offices and workplaces",
      "Retail and customer-facing spaces",
      "Commercial buildings and common areas",
      "Managed residential facilities",
    ],
    standards: [
      "A cleaning plan matched to the space and schedule",
      "Trained service staff",
      "Quality checks and clear communication",
      "A cleaning approach agreed for the surfaces and scope",
    ],
    faqs: [
      {
        question: "Can office cleaning be scheduled daily or weekly?",
        answer:
          "Yes. Evolura offers daily, weekly and periodic commercial cleaning. The suitable frequency depends on footfall, operating hours, property size and the areas included in the scope.",
      },
      {
        question: "Do you clean carpets, upholstery and office floors?",
        answer:
          "Yes. Carpet and upholstery cleaning, floor scrubbing, polishing and shampooing can be included as individual services or as part of a wider commercial cleaning request.",
      },
      {
        question: "Which areas of the UAE do you cover?",
        answer:
          "Evolura is based in Dubai and accepts commercial cleaning requests across the UAE. Availability is confirmed after reviewing the property location, timing and scope.",
      },
    ],
    related: [
      "deep-post-construction-cleaning-dubai",
      "commercial-kitchen-hood-cleaning-dubai",
      "facility-management-services-uae",
    ],
  },

  "deep-post-construction-cleaning-dubai": {
    slug: "deep-post-construction-cleaning-dubai",
    shortTitle: "Deep cleaning",
    directoryTitle: "Deep & post-construction cleaning",
    directoryDescription:
      "Detailed cleaning for properties preparing for use, reopening or handover.",
    code: "DC",
    image: {
      src: "/services/post-construction-cleaning.webp",
      srcSmall: "/services/post-construction-cleaning-720.webp",
      alt: "Cleaning team removing fine dust from a newly finished commercial interior",
    },
    metaTitle: "Deep & Post-Construction Cleaning Dubai | Evolura",
    metaDescription:
      "Deep cleaning and post-construction cleaning in Dubai and the UAE for offices, commercial properties and managed buildings. Request a tailored service.",
    eyebrow: "Deep cleaning services · Dubai & UAE",
    title: "Deep and post-construction cleaning in Dubai",
    overviewHeading: "Deep cleaning for handover, reopening and periodic resets",
    inclusionsHeading: "What deep and post-construction cleaning can include",
    serviceFormat: "One-off deep cleaning or post-construction reset",
    introduction:
      "Renovation dust, built-up residue and hard-to-reach areas require a more detailed approach than routine cleaning. Evolura provides deep and post-construction cleaning for properties that need a thorough reset before use, handover or reopening.",
    summary:
      "We review the space, surfaces and priority areas before confirming the scope. The service can combine detailed surface cleaning, floor care, carpet and upholstery attention, window cleaning and washroom sanitization for a cleaner, more presentable handover.",
    inclusions: [
      {
        title: "Post-construction cleaning",
        copy: "Detailed removal of fine dust and general residue after building, fit-out or renovation work.",
      },
      {
        title: "High-touch sanitization",
        copy: "Focused hygiene for washrooms, shared touchpoints and frequently used facility areas.",
      },
      {
        title: "Floor restoration care",
        copy: "Scrubbing, polishing or shampooing based on the floor type and its post-work condition.",
      },
      {
        title: "Carpet and upholstery cleaning",
        copy: "Care for fabric surfaces affected by dust, use or the surrounding construction activity.",
      },
      {
        title: "Windows and internal glass",
        copy: "Cleaning of accessible windows and glass surfaces to complete the property presentation.",
      },
      {
        title: "Final detail check",
        copy: "A structured review of the agreed cleaning scope before the team completes the visit.",
      },
    ],
    propertyTypes: [
      "Newly completed offices",
      "Renovated commercial spaces",
      "Managed buildings before handover",
      "Properties preparing to reopen",
    ],
    standards: [
      "Scope agreed around the property condition",
      "Attention to fine dust and overlooked areas",
      "Surface-appropriate cleaning methods",
      "Clear handover against the requested checklist",
    ],
    faqs: [
      {
        question: "What is included in post-construction cleaning?",
        answer:
          "The scope is tailored to the property and may include dust removal, surface cleaning, floors, carpets, upholstery, washrooms, windows and internal glass. Heavy waste removal or specialist access is confirmed separately.",
      },
      {
        question: "When should I book the cleaning?",
        answer:
          "It is best arranged after construction and snagging activity is substantially complete, with utilities and safe access available. This reduces the chance of fresh dust or work affecting completed areas.",
      },
      {
        question: "Can deep cleaning be requested without construction work?",
        answer:
          "Yes. Deep cleaning is also available as a periodic reset for offices, commercial properties and managed facilities that need more attention than routine cleaning provides.",
      },
    ],
    related: [
      "ac-duct-cleaning-dubai",
      "commercial-office-cleaning-dubai",
      "building-maintenance-dubai",
    ],
  },

  "ac-duct-cleaning-dubai": {
    slug: "ac-duct-cleaning-dubai",
    shortTitle: "AC duct cleaning",
    directoryTitle: "AC duct cleaning",
    directoryDescription:
      "Professional duct and vent cleaning for cleaner airflow in homes and commercial properties.",
    code: "AC",
    image: {
      src: "/services/ac-duct-cleaning.webp",
      srcSmall: "/services/ac-duct-cleaning-720.webp",
      alt: "Professional technician cleaning an air-conditioning duct with high-powered vacuum equipment",
    },
    metaTitle: "AC Duct Cleaning Services Dubai | Evolura",
    metaDescription:
      "Professional AC duct cleaning in Dubai for apartments, villas, offices and shops. Remove accumulated dust and debris from ducts, vents and grilles.",
    eyebrow: "AC duct cleaning services · Dubai & UAE",
    title: "Professional AC duct cleaning services in Dubai",
    overviewHeading: "Cleaner ducts for fresher air and more efficient airflow",
    inclusionsHeading: "What our AC duct cleaning service includes",
    serviceFormat: "Focused one-off cleaning after inspection",
    introduction:
      "Improve your indoor air quality and AC performance with professional duct cleaning. Evolura removes accumulated dust, dirt, debris and contaminants from air-conditioning duct systems to help maintain a cleaner, fresher indoor environment.",
    summary:
      "AC duct cleaning is recommended when a property has excessive dust, unpleasant odors from the AC, reduced airflow, or has recently undergone renovation or maintenance work. We inspect the system, clean the accessible ducts, vents and grilles, then complete a final system check.",
    inclusions: [
      {
        title: "Duct and vent inspection",
        copy: "Inspection of accessible AC ducts, air vents and system access points before cleaning begins.",
      },
      {
        title: "Supply and return duct cleaning",
        copy: "Cleaning of accessible supply and return air ducts to remove accumulated dust, dirt and debris.",
      },
      {
        title: "Dust and debris removal",
        copy: "Focused removal of built-up particles and contaminants from within the agreed duct-cleaning scope.",
      },
      {
        title: "Vents, grilles and diffusers",
        copy: "Detailed cleaning of accessible air vents, grilles and diffusers for a cleaner system finish.",
      },
      {
        title: "AC access-point cleaning",
        copy: "Cleaning around accessible service openings and AC access points included in the agreed scope.",
      },
      {
        title: "Professional vacuum equipment",
        copy: "High-powered vacuum and professional cleaning equipment used to capture and remove loosened debris.",
      },
      {
        title: "Dusty odor reduction",
        copy: "Removal of accumulated dust and debris that can contribute to unpleasant odors when the AC operates.",
      },
      {
        title: "Final system inspection",
        copy: "A final visual review of the cleaned access points, vents and agreed duct areas after the service.",
      },
    ],
    propertyTypes: [
      "Apartments and villas",
      "Offices and workplaces",
      "Shops and retail spaces",
      "Commercial and managed properties",
    ],
    standards: [
      "Cleaner and fresher indoor air",
      "Reduced circulation of accumulated dust",
      "Improved airflow and AC efficiency",
      "Help reducing unpleasant dusty odors",
      "Cleaner AC vents and duct system",
    ],
    faqs: [
      {
        question: "When is AC duct cleaning recommended?",
        answer:
          "It is recommended when you notice excessive indoor dust, unpleasant dusty odors from the AC, reduced airflow, visibly dirty vents, or after renovation and maintenance work.",
      },
      {
        question: "What does AC duct cleaning include?",
        answer:
          "The service includes inspection of accessible ducts and vents, cleaning of supply and return ducts, removal of accumulated dust and debris, cleaning of vents, grilles, diffusers and access points, and a final inspection.",
      },
      {
        question: "Can you clean AC ducts in apartments, villas and offices?",
        answer:
          "Yes. Evolura accepts AC duct cleaning requests for apartments, villas, offices, shops and commercial properties. The scope is confirmed after reviewing the system, access and property details.",
      },
      {
        question: "Can duct cleaning help with AC odors and airflow?",
        answer:
          "Removing accumulated dust and debris can help reduce dusty odors and support cleaner airflow. Other odors or performance issues may require separate HVAC inspection or maintenance.",
      },
    ],
    related: [
      "mep-hvac-maintenance-dubai",
      "deep-post-construction-cleaning-dubai",
      "building-maintenance-dubai",
    ],
  },

  "commercial-kitchen-hood-cleaning-dubai": {
    slug: "commercial-kitchen-hood-cleaning-dubai",
    shortTitle: "Kitchen hood cleaning",
    directoryTitle: "Commercial kitchen hood cleaning",
    directoryDescription:
      "Deep cleaning and degreasing for commercial kitchen hoods and accessible extraction components.",
    code: "KH",
    image: {
      src: "/services/commercial-kitchen-hood-cleaning.webp",
      srcSmall: "/services/commercial-kitchen-hood-cleaning-720.webp",
      alt: "Professional technician degreasing a stainless-steel commercial kitchen extraction hood",
    },
    metaTitle: "Commercial Kitchen Hood Cleaning Dubai | Evolura",
    metaDescription:
      "Professional commercial kitchen hood cleaning in Dubai for restaurants, cafés, hotels and cloud kitchens, including filters and accessible extraction parts.",
    eyebrow: "Commercial kitchen hood cleaning · Dubai & UAE",
    title: "Commercial kitchen hood cleaning services in Dubai",
    overviewHeading: "Deep degreasing for commercial kitchen extraction systems",
    inclusionsHeading: "What our commercial kitchen hood cleaning service includes",
    serviceFormat: "Scheduled deep cleaning based on kitchen use and extraction condition",
    introduction:
      "Professional deep cleaning helps keep restaurant and commercial kitchen extraction systems cleaner and working effectively. Evolura removes accumulated grease, oil, carbon deposits and dirt from kitchen hoods and accessible extraction components.",
    summary:
      "This service is recommended for commercial kitchens operating regularly, especially restaurants with high-volume cooking, frying, grilling or charcoal equipment. We inspect the accessible extraction system, complete the agreed degreasing scope and review the cleaned areas after service.",
    inclusions: [
      {
        title: "Kitchen hood inspection",
        copy: "An initial inspection of the hood and accessible extraction components to confirm condition, access and cleaning scope.",
      },
      {
        title: "Hood surface degreasing",
        copy: "Deep cleaning and degreasing of accessible internal and external kitchen hood surfaces.",
      },
      {
        title: "Hood filter cleaning",
        copy: "Removal and detailed cleaning of accessible hood filters included in the agreed service scope.",
      },
      {
        title: "Accessible exhaust ducts",
        copy: "Cleaning of accessible exhaust duct sections connected to the commercial kitchen extraction system.",
      },
      {
        title: "Accessible exhaust fan parts",
        copy: "Cleaning of exhaust fan components where safe access and the system configuration allow.",
      },
      {
        title: "Heavy deposit removal",
        copy: "Focused removal of accumulated grease, oil and carbon deposits from the agreed extraction areas.",
      },
      {
        title: "Professional degreasing equipment",
        copy: "Commercial degreasing chemicals and professional equipment selected for the surfaces and level of buildup.",
      },
      {
        title: "Work-area cleanup",
        copy: "Cleaning of the surrounding protected work area after the hood-cleaning service is complete.",
      },
      {
        title: "Before-and-after inspection",
        copy: "Inspection of the agreed accessible components before work begins and after cleaning is completed.",
      },
    ],
    propertyTypes: [
      "Restaurants and cafés",
      "Hotels and hospitality kitchens",
      "Cloud and delivery kitchens",
      "Commercial and institutional kitchens",
    ],
    standards: [
      "Reduced grease accumulation",
      "Improved kitchen ventilation and extraction",
      "Help reducing unpleasant odors and smoke buildup",
      "A cleaner and safer kitchen environment",
      "Support for extraction equipment service life",
    ],
    faqs: [
      {
        question: "What is included in commercial kitchen hood cleaning?",
        answer:
          "The service includes inspection, degreasing of accessible hood surfaces, filter cleaning, cleaning of accessible exhaust duct sections and fan components, heavy deposit removal, work-area cleanup and a final inspection.",
      },
      {
        question: "How often should a commercial kitchen hood be cleaned?",
        answer:
          "The appropriate schedule depends on cooking volume, operating hours, menu and equipment. Kitchens with frequent frying, grilling or charcoal cooking generally require more frequent inspection and cleaning.",
      },
      {
        question: "Which commercial kitchens can request this service?",
        answer:
          "Evolura accepts requests from restaurants, cafés, hotels, cloud kitchens and other commercial kitchens. Access, equipment type, operating schedule and the required scope are confirmed before service.",
      },
      {
        question: "Does hood cleaning include every part of the extraction system?",
        answer:
          "The service covers the hood, filters and extraction components that are safely accessible within the agreed scope. Specialist access, enclosed duct sections or additional system work is assessed and confirmed separately.",
      },
    ],
    related: [
      "commercial-office-cleaning-dubai",
      "deep-post-construction-cleaning-dubai",
      "facility-management-services-uae",
    ],
  },

  "building-maintenance-dubai": {
    slug: "building-maintenance-dubai",
    shortTitle: "Building maintenance",
    directoryTitle: "Building maintenance",
    directoryDescription:
      "Civil works, painting, carpentry, flooring, preventive care and urgent repair support.",
    code: "BM",
    image: {
      src: "/services/building-maintenance.webp",
      srcSmall: "/services/building-maintenance-720.webp",
      alt: "Building maintenance technician repairing a door fitting",
    },
    metaTitle: "Building Maintenance Services Dubai | Evolura",
    metaDescription:
      "Building maintenance services in Dubai and the UAE, including civil works, MEP, HVAC, painting, carpentry, flooring and emergency repairs.",
    eyebrow: "Building maintenance services · Dubai & UAE",
    title: "Reliable building maintenance services in Dubai",
    overviewHeading: "Planned and responsive building maintenance",
    inclusionsHeading: "Building maintenance services available",
    serviceFormat: "Preventive, corrective and urgent repair support",
    introduction:
      "Small defects can quickly affect safety, comfort and the day-to-day use of a property. Evolura coordinates building maintenance services for commercial and managed facilities, from planned preventive care to breakdown and emergency repair requests.",
    summary:
      "Our scope brings civil works, MEP maintenance, HVAC care, painting, carpentry and flooring support into one service conversation. That makes it easier to describe the issue, arrange the right trade and keep the property well maintained.",
    inclusions: [
      {
        title: "Civil and building maintenance",
        copy: "General corrective works that protect the function, finish and condition of the property.",
      },
      {
        title: "MEP maintenance",
        copy: "Mechanical, electrical and plumbing support for essential building systems and common issues.",
      },
      {
        title: "HVAC maintenance",
        copy: "Planned and responsive care for air-conditioning and ventilation performance.",
      },
      {
        title: "Painting and wall maintenance",
        copy: "Repairs and finishing work for worn, damaged or refreshed internal wall surfaces.",
      },
      {
        title: "Carpentry and flooring",
        copy: "Practical repair and maintenance support for timber elements and selected floor finishes.",
      },
      {
        title: "Breakdown and emergency repairs",
        copy: "Quick-response support for urgent defects, subject to access, location and team availability.",
      },
    ],
    propertyTypes: [
      "Commercial buildings and offices",
      "Managed residential properties",
      "Retail and customer-facing facilities",
      "Building common areas",
    ],
    standards: [
      "The right maintenance trade for the reported issue",
      "Preventive and corrective service options",
      "Clear scope communication before work begins",
      "Urgent requests reviewed for location, access and availability",
    ],
    faqs: [
      {
        question: "What building maintenance work does Evolura handle?",
        answer:
          "Evolura handles civil and building maintenance, MEP, HVAC, painting, wall maintenance, carpentry, flooring, preventive maintenance, breakdown support and emergency repairs.",
      },
      {
        question: "Do you offer preventive maintenance?",
        answer:
          "Yes. Preventive maintenance can be planned around the building systems and recurring requirements identified for the property. The exact frequency and checklist are confirmed after reviewing the facility.",
      },
      {
        question: "How do I report an emergency repair?",
        answer:
          "Call Evolura or submit the service request with the issue and location. Our team will review the urgency, confirm availability and advise the next practical step.",
      },
    ],
    related: [
      "mep-hvac-maintenance-dubai",
      "facility-management-services-uae",
      "commercial-office-cleaning-dubai",
    ],
  },

  "mep-hvac-maintenance-dubai": {
    slug: "mep-hvac-maintenance-dubai",
    shortTitle: "MEP & HVAC",
    directoryTitle: "MEP & HVAC maintenance",
    directoryDescription:
      "Mechanical, electrical, plumbing and air-conditioning support for managed properties.",
    code: "HV",
    image: {
      src: "/services/mep-hvac-maintenance.webp",
      srcSmall: "/services/mep-hvac-maintenance-720.webp",
      alt: "HVAC technician checking an air-handling control panel",
    },
    metaTitle: "MEP & HVAC Maintenance Dubai | Evolura",
    metaDescription:
      "MEP and HVAC maintenance in Dubai and the UAE, covering mechanical, electrical, plumbing and air-conditioning support for managed properties.",
    eyebrow: "MEP & HVAC maintenance · Dubai & UAE",
    title: "MEP and HVAC maintenance services in Dubai",
    overviewHeading: "Mechanical, electrical, plumbing and HVAC support",
    inclusionsHeading: "What MEP and HVAC maintenance can include",
    serviceFormat: "Preventive maintenance, troubleshooting and responsive repair support",
    introduction:
      "Mechanical, electrical, plumbing and HVAC systems are central to a safe, comfortable building. Evolura provides coordinated MEP and HVAC maintenance for properties that need preventive attention, troubleshooting or responsive repair support.",
    summary:
      "Start with one clear service request describing the system, symptoms and property location. We use those details to direct the request to the appropriate technical support and confirm the access, timing and scope required.",
    inclusions: [
      {
        title: "Mechanical maintenance",
        copy: "Support for mechanical building components within the agreed maintenance scope.",
      },
      {
        title: "Electrical maintenance",
        copy: "Responsive attention for reported electrical defects and planned building maintenance needs.",
      },
      {
        title: "Plumbing maintenance",
        copy: "Assessment and repair support for common plumbing issues affecting property operation.",
      },
      {
        title: "HVAC maintenance",
        copy: "Care for air-conditioning and ventilation systems to support comfort and reliable performance.",
      },
      {
        title: "Preventive maintenance",
        copy: "Planned attention intended to identify wear and reduce avoidable breakdowns.",
      },
      {
        title: "Breakdown response",
        copy: "Technical support for unexpected faults and urgent service requests across the UAE.",
      },
    ],
    propertyTypes: [
      "Office and commercial properties",
      "Managed residential buildings",
      "Retail and public-facing facilities",
      "Shared building systems and common areas",
    ],
    standards: [
      "A coordinated MEP service request",
      "Preventive and breakdown support",
      "Attention to safety and facility continuity",
      "Clear reporting of the issue and requested work",
    ],
    faqs: [
      {
        question: "What does MEP maintenance include?",
        answer:
          "MEP stands for mechanical, electrical and plumbing services. Evolura coordinates maintenance and repair support across these systems, with the exact task confirmed from the reported issue and property requirements.",
      },
      {
        question: "Is HVAC maintenance available for commercial properties?",
        answer:
          "Yes. HVAC maintenance is available for commercial and managed properties in Dubai and across the UAE, subject to system type, access, location and the requested scope.",
      },
      {
        question: "Can I request both preventive and breakdown maintenance?",
        answer:
          "Yes. Evolura supports planned preventive attention as well as responsive maintenance when an unexpected system problem occurs.",
      },
    ],
    related: [
      "ac-duct-cleaning-dubai",
      "building-maintenance-dubai",
      "facility-management-services-uae",
    ],
  },

  "facility-management-services-uae": {
    slug: "facility-management-services-uae",
    shortTitle: "Facility management",
    directoryTitle: "Facility management across the UAE",
    directoryDescription:
      "Coordinated cleaning and technical maintenance under one service relationship.",
    code: "FM",
    image: {
      src: "/services/facility-management.webp",
      srcSmall: "/services/facility-management-720.webp",
      alt: "Facility manager reviewing a tablet in a modern building lobby",
    },
    metaTitle: "Integrated Facility Management Services UAE | Evolura",
    metaDescription:
      "Integrated facility cleaning and maintenance across the UAE, combining commercial cleaning, building maintenance, MEP, HVAC and responsive support.",
    eyebrow: "Facility management services · UAE",
    title: "Integrated facility cleaning and maintenance across the UAE",
    overviewHeading: "One service relationship for cleaning and technical maintenance",
    inclusionsHeading: "Integrated facility services available",
    serviceFormat: "Recurring cleaning with planned or responsive maintenance support",
    introduction:
      "Well-managed facilities depend on consistent cleaning, responsive maintenance and clear communication. Evolura brings these services together for offices, commercial spaces and managed properties in Dubai and across the United Arab Emirates.",
    summary:
      "Our service scope can combine routine cleaning with preventive and responsive building care. Property teams gain one contact point for the request while Evolura coordinates the cleaning or technical support needed for the facility.",
    inclusions: [
      {
        title: "Routine facility cleaning",
        copy: "Daily, weekly or periodic cleaning arranged around property use and hygiene priorities.",
      },
      {
        title: "Specialist cleaning support",
        copy: "Deep cleaning, floor care, carpets, upholstery, windows and washroom sanitization.",
      },
      {
        title: "Building maintenance",
        copy: "Civil, painting, wall, carpentry and flooring maintenance for managed spaces.",
      },
      {
        title: "MEP and HVAC care",
        copy: "Mechanical, electrical, plumbing and air-conditioning maintenance within one coordinated scope.",
      },
      {
        title: "Preventive attention",
        copy: "Planned maintenance activity intended to support dependable property operation.",
      },
      {
        title: "Responsive support",
        copy: "Breakdown and emergency repair requests reviewed based on the issue, location, access and team availability.",
      },
    ],
    propertyTypes: [
      "Offices and corporate workplaces",
      "Commercial and mixed-use buildings",
      "Managed residential facilities",
      "Retail and shared public areas",
    ],
    standards: [
      "Cleaning and maintenance under one service relationship",
      "Flexible plans shaped around the facility",
      "Quality assurance and attentive follow-through",
      "Dubai-based coordination with UAE coverage",
    ],
    faqs: [
      {
        question: "What facility management services does Evolura provide?",
        answer:
          "Evolura combines commercial cleaning, specialist cleaning, civil and building maintenance, MEP, HVAC, painting, carpentry, flooring, preventive maintenance and responsive repair support.",
      },
      {
        question: "Can cleaning and maintenance be requested together?",
        answer:
          "Yes. Share the required cleaning and technical tasks in one request. Our team will review the scope and coordinate the appropriate service plan for the property.",
      },
      {
        question: "Is service available across all Emirates?",
        answer:
          "Evolura accepts requests across the UAE. Coverage, timing and team availability are confirmed for each property after reviewing its location and scope.",
      },
    ],
    related: [
      "commercial-office-cleaning-dubai",
      "building-maintenance-dubai",
      "mep-hvac-maintenance-dubai",
    ],
  },
};

export const servicePageList = Object.values(servicePages);
