export const SITE_URL =
  "https://evolura-technical-services.bawlamarwan09.chatgpt.site";

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServicePageContent = {
  slug: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  introduction: string;
  summary: string;
  inclusions: Array<{ title: string; copy: string }>;
  propertyTypes: string[];
  standards: string[];
  faqs: FaqItem[];
  related: string[];
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
      "Yes. Evolura offers 24/7 support and quick response for urgent breakdown and emergency repair requests, subject to location, team availability and the nature of the issue.",
  },
  {
    question: "How do I request a cleaning or maintenance quotation?",
    answer:
      "Complete the service request form with your location, service type and a short description. The form prepares a WhatsApp message so our team can review the scope and arrange the next step.",
  },
];

export const servicePages: Record<string, ServicePageContent> = {
  "commercial-office-cleaning-dubai": {
    slug: "commercial-office-cleaning-dubai",
    shortTitle: "Commercial cleaning",
    metaTitle: "Commercial Cleaning Services Dubai | Evolura",
    metaDescription:
      "Professional office and commercial cleaning in Dubai and across the UAE, including scheduled cleaning, floors, carpets, windows and washroom hygiene.",
    eyebrow: "Commercial cleaning services · Dubai & UAE",
    title: "Commercial and office cleaning services in Dubai",
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
      "Trained and verified service staff",
      "Quality checks and clear communication",
      "Safe, eco-conscious working practices",
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
      "facility-management-services-uae",
      "building-maintenance-dubai",
    ],
  },

  "deep-post-construction-cleaning-dubai": {
    slug: "deep-post-construction-cleaning-dubai",
    shortTitle: "Deep cleaning",
    metaTitle: "Deep & Post-Construction Cleaning Dubai | Evolura",
    metaDescription:
      "Deep cleaning and post-construction cleaning in Dubai and the UAE for offices, commercial properties and managed buildings. Request a tailored service.",
    eyebrow: "Deep cleaning services · Dubai & UAE",
    title: "Deep and post-construction cleaning in Dubai",
    introduction:
      "Renovation dust, built-up residue and hard-to-reach areas require a more detailed approach than routine cleaning. Evolura provides deep and post-construction cleaning for properties that need a thorough reset before use, handover or reopening.",
    summary:
      "We review the space, surfaces and priority areas before confirming the scope. The service can combine detailed surface cleaning, floor care, carpet and upholstery attention, window cleaning and washroom sanitization for a cleaner, safer handover.",
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
      "commercial-office-cleaning-dubai",
      "facility-management-services-uae",
      "building-maintenance-dubai",
    ],
  },

  "building-maintenance-dubai": {
    slug: "building-maintenance-dubai",
    shortTitle: "Building maintenance",
    metaTitle: "Building Maintenance Services Dubai | Evolura",
    metaDescription:
      "Building maintenance services in Dubai and the UAE, including civil works, MEP, HVAC, painting, carpentry, flooring and emergency repairs.",
    eyebrow: "Building maintenance services · Dubai & UAE",
    title: "Reliable building maintenance services in Dubai",
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
      "24/7 support for urgent requests",
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
    metaTitle: "MEP & HVAC Maintenance Dubai | Evolura",
    metaDescription:
      "MEP and HVAC maintenance in Dubai and the UAE, covering mechanical, electrical, plumbing and air-conditioning support for managed properties.",
    eyebrow: "MEP & HVAC maintenance · Dubai & UAE",
    title: "MEP and HVAC maintenance services in Dubai",
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
      "building-maintenance-dubai",
      "facility-management-services-uae",
      "commercial-office-cleaning-dubai",
    ],
  },

  "facility-management-services-uae": {
    slug: "facility-management-services-uae",
    shortTitle: "Facility management",
    metaTitle: "Facility Management Services UAE | Evolura",
    metaDescription:
      "Coordinated facility management services across the UAE, combining commercial cleaning, building maintenance, MEP, HVAC and responsive support.",
    eyebrow: "Facility management services · UAE",
    title: "Cleaning and facility management services across the UAE",
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
        copy: "Breakdown and emergency repair requests reviewed through our 24/7 support channel.",
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
