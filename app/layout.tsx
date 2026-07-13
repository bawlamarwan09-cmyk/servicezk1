import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Evolura Technical Services",
    template: "%s | Evolura Technical Services",
  },
  description:
    "Professional cleaning and facility maintenance services for cleaner environments, stronger buildings and better living in Dubai.",
  keywords: [
    "cleaning services Dubai",
    "facility maintenance Dubai",
    "MEP services",
    "HVAC maintenance",
    "Evolura Technical Services",
  ],
  authors: [{ name: "Evolura Technical Services" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
