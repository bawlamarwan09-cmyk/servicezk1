import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "./seo-content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Commercial Cleaning & Maintenance Services Dubai | Evolura",
    template: "%s | Evolura",
  },
  description:
    "Evolura provides commercial cleaning, deep cleaning, MEP, HVAC, plumbing, electrical and building maintenance in Dubai and across the UAE.",
  applicationName: "Evolura Technical Services",
  authors: [{ name: "Evolura Technical Services" }],
  creator: "Evolura Technical Services",
  publisher: "Evolura Technical Services",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: SITE_URL,
    siteName: "Evolura Technical Services",
    title: "Commercial Cleaning & Maintenance Services Dubai | Evolura",
    description:
      "Commercial cleaning, building maintenance, MEP, HVAC and facility management services in Dubai and across the UAE.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Evolura commercial cleaning and building maintenance services in Dubai and the UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Cleaning & Maintenance Services Dubai | Evolura",
    description:
      "Commercial cleaning, building maintenance, MEP, HVAC and facility management services in Dubai and across the UAE.",
    images: ["/og.png"],
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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Evolura Technical Services",
  description:
    "Professional commercial cleaning, facility management and building maintenance services in Dubai and across the United Arab Emirates.",
  url: SITE_URL,
  image: `${SITE_URL}/evolura-hero.webp`,
  telephone: "+971503112307",
  email: "info@evolurats.com",
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
    telephone: "+971503112307",
    contactType: "customer service",
    areaServed: "AE",
    availableLanguage: "English",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cleaning and technical services",
    itemListElement: [
      "Commercial cleaning services",
      "Deep and post-construction cleaning",
      "Building maintenance services",
      "MEP and HVAC maintenance",
      "Facility management services",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        areaServed: "United Arab Emirates",
      },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AE">
      <body className={`${geistSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
