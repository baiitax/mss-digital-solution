import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Cache Components is disabled: the portal renders per-request under RLS and the
  // public site uses route-level ISR revalidation instead.
  cacheComponents: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      // Capability aliases — old → new canonical
      { source: "/capabilities/digital-health", destination: "/capabilities/digital-health-systems", permanent: true },
      { source: "/capabilities/geospatial", destination: "/capabilities/geospatial-intelligence", permanent: true },
      { source: "/capabilities/analytics", destination: "/capabilities/data-analytics", permanent: true },
      // Our Work — legacy project route
      { source: "/projects/geo-st4r", destination: "/our-work/geo-st4r-kano", permanent: true },
      { source: "/projects", destination: "/our-work", permanent: true },
      // Privacy alias
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
    ]
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    },
  ],
}

export default nextConfig
