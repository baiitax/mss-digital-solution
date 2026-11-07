import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SHARE_DESCRIPTION,
} from "@/lib/seo";
import { Preloader } from "@/components/layout/Preloader";
import { MaintenanceBar } from "@/components/layout/MaintenanceBar";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400","500","600","700","800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // No "Ltd": the registered suffix belongs in body copy and structured data,
    // not in a browser tab or a share card.
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "digital health Nigeria",
    "geospatial intelligence",
    "health data analytics",
    "primary healthcare",
    "immunisation microplanning",
    "zero-dose reduction",
    "health facility mapping",
    "settlement mapping",
    "health information systems",
    "MSS Digital Solutions",
    "Kano health technology company",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "./",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
}

/**
 * Organization + WebSite structured data. Google, LinkedIn and Bing read this
 * when a link is shared, so the company's own description, location and
 * registered number travel with the URL. `legalName` keeps "Ltd"; `name` does
 * not — the brand is "MSS Digital Solutions".
 */
const organisationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: "MSS Digital Solutions Ltd",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo-full.png`,
      image: `${SITE_URL}/brand/og-image.png`,
      description: SHARE_DESCRIPTION,
      foundingDate: "2024-02-09",
      identifier: { "@type": "PropertyValue", name: "RC", value: "7341058" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kano",
        addressRegion: "Kano State",
        addressCountry: "NG",
      },
      areaServed: { "@type": "Country", name: "Nigeria" },
      knowsAbout: [
        "Digital health systems",
        "Geospatial intelligence",
        "Health data analytics",
        "Immunisation microplanning",
        "Primary healthcare systems",
      ],
      slogan: "Implementation partner, not vendor",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-NG",
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-[#FAF9F7] text-[#252B31] flex flex-col antialiased">
        <Preloader />
        <MaintenanceBar />
        <script
          type="application/ld+json"
          // Structured data is a static literal — no user input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
