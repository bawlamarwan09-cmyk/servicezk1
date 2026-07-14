import type { Metadata, Viewport } from "next";
import "./globals.css";
import { JsonLd } from "./JsonLd";
import { SITE_URL, servicePageList } from "./seo-content";
import { BUSINESS } from "./site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Commercial Cleaning & Building Maintenance Dubai | Evolura",
    template: "%s | Evolura",
  },
  description:
    "Professional commercial and office cleaning, building maintenance, HVAC and facility management services in Dubai and across the UAE.",
  applicationName: "Evolura Technical Services",
  authors: [{ name: "Evolura Technical Services" }],
  creator: "Evolura Technical Services",
  publisher: "Evolura Technical Services",
  category: "Cleaning and technical maintenance services",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/evolura-mark-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: SITE_URL,
    siteName: "Evolura Technical Services",
    title: "Commercial Cleaning & Building Maintenance Dubai | Evolura",
    description:
      "Commercial cleaning, building maintenance, MEP, HVAC and facility management services in Dubai and across the UAE.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Evolura commercial cleaning and building maintenance services in Dubai and the UAE",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Cleaning & Building Maintenance Dubai | Evolura",
    description:
      "Commercial cleaning, building maintenance, MEP, HVAC and facility management services in Dubai and across the UAE.",
    images: [
      {
        url: "/og.jpg",
        alt: "Evolura commercial cleaning and building maintenance services in Dubai and the UAE",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#031a2b",
  width: "device-width",
  initialScale: 1,
};

const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: BUSINESS.name,
      description:
        "Professional commercial cleaning, facility management and building maintenance services in Dubai and across the United Arab Emirates.",
      url: SITE_URL,
      image: `${SITE_URL}/evolura-hero.webp`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/evolura-mark.png`,
        width: 512,
        height: 512,
      },
      telephone: BUSINESS.phoneHref.replace("tel:", ""),
      email: BUSINESS.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ground Floor, Levana Residence, Al Barsha 1",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
      areaServed: {
        "@type": "Country",
        name: "United Arab Emirates",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: BUSINESS.phoneHref.replace("tel:", ""),
        contactType: "customer service",
        areaServed: "AE",
        availableLanguage: ["English"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Cleaning and technical services",
        itemListElement: servicePageList.map((service) => ({
          "@type": "Offer",
          url: `${SITE_URL}/services/${service.slug}`,
          itemOffered: {
            "@type": "Service",
            "@id": `${SITE_URL}/services/${service.slug}#service`,
            name: service.directoryTitle,
            description: service.metaDescription,
            url: `${SITE_URL}/services/${service.slug}`,
            image: `${SITE_URL}${service.image.src}`,
            areaServed: "United Arab Emirates",
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BUSINESS.name,
      inLanguage: "en-AE",
      publisher: { "@id": `${SITE_URL}/#business` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AE">
      <body className="antialiased">
        <JsonLd data={globalStructuredData} />
        {children}
      </body>
    </html>
  );
}
