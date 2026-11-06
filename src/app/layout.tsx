import type { Metadata } from "next";
import { Inter, Manrope, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
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
    "Digital health systems, geospatial intelligence and data analytics — built to reach the communities that services have not yet reached. Kano-based implementation partner for governments and development partners.",
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
    description:
      "Bridging healthcare delivery, geospatial intelligence and data. We help governments and partners reach underserved communities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MSS Digital Solutions Ltd",
    description: "Digital health systems, geospatial intelligence and data analytics.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${jakarta.variable} ${mono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#FDFCF7] text-[#0B1930] flex flex-col">
        {children}
      </body>
    </html>
  );
}
