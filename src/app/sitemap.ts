import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mss-digitalsolutions.com";
  const now = new Date();
  const routes = [
    "", "/about", "/capabilities",
    "/capabilities/digital-health", "/capabilities/geospatial", "/capabilities/analytics", "/capabilities/programme-management",
    "/projects/geo-st4r", "/leadership", "/insights", "/contact", "/privacy", "/terms",
  ];
  return routes.map((r) => ({ url: `${base}${r}`, lastModified: now, changeFrequency: "weekly" as const, priority: r === "" ? 1 : 0.7 }));
}
