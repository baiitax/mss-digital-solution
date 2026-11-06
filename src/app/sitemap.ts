import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mss-digitalsolutions.com";
  const now = new Date();
  const routes = [
    "", "/about", "/capabilities",
    "/capabilities/digital-health-systems", "/capabilities/geospatial-intelligence", "/capabilities/data-analytics", "/capabilities/programme-management",
    "/our-work", "/our-work/geo-st4r-kano", "/how-we-work",
    "/leadership", "/insights", "/contact", "/privacy-policy", "/terms",
  ];
  return routes.map((r) => ({ url: `${base}${r}`, lastModified: now, changeFrequency: "weekly" as const, priority: r === "" ? 1 : 0.7 }));
}
