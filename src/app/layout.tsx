import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
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
  metadataBase: new URL("https://mss-digitalsolutions.com"),
  title: {
    default: "MSS Digital Solutions Ltd — Digital Health Systems & Geospatial Intelligence",
    template: "%s | MSS Digital Solutions",
  },
  description:
    "Digital health systems, geospatial intelligence and data analytics — built to reach the communities that services have not yet reached. A Kano-based implementation partner for governments, development partners and healthcare institutions.",
  keywords: [
    "digital health Nigeria",
    "geospatial intelligence",
    "health data analytics",
    "primary healthcare",
    "immunisation microplanning",
    "zero-dose reduction",
    "health facility mapping",
    "MSS Digital Solutions",
  ],
  authors: [{ name: "MSS Digital Solutions Ltd" }],
  creator: "MSS Digital Solutions Ltd",
  publisher: "MSS Digital Solutions Ltd",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "MSS Digital Solutions",
    title: "MSS Digital Solutions Ltd — Digital Health Systems & Geospatial Intelligence",
    description: "Bridging healthcare delivery, geospatial intelligence and data. We help governments and partners reach underserved communities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MSS Digital Solutions Ltd",
    description: "Digital health systems, geospatial intelligence and data analytics.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-[#FAF9F7] text-[#252B31] flex flex-col antialiased">
        <Preloader />
        <MaintenanceBar />
        {children}
      </body>
    </html>
  );
}
