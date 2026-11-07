import type { Metadata } from "next"

/**
 * One place for the identity that search engines and social platforms read.
 *
 * Two rules follow from the owner's brief:
 *   1. The registered suffix "Ltd" is a legal detail, not part of the brand.
 *      It stays in body copy (footer copyright, About → company details) and in
 *      the structured-data legal name, but never in a <title>, og:title or
 *      twitter:title.
 *   2. Sharing a link must carry enough description for a reader to understand
 *      who MSS is without opening the page — company, location, what it builds
 *      and who it serves.
 */

/**
 * Canonical / open-graph origin.
 *
 * The site is served from the Vercel production domain today; mss-digitalsolutions.com
 * has no DNS record yet, so hard-coding it would point every canonical and every
 * share-card image at a host that does not resolve — WhatsApp and LinkedIn then
 * fall back to a text-only preview.
 *
 * VERCEL_PROJECT_PRODUCTION_URL is injected by Vercel at build time and follows
 * the project's production domain automatically, so attaching the real domain
 * needs no code change. NEXT_PUBLIC_SITE_URL overrides everything (e.g. for a
 * staging build that must not claim the production canonical).
 */
const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelProductionHost ? `https://${vercelProductionHost}` : "https://mss-digital.vercel.app")
).replace(/\/$/, "")
export const SITE_NAME = "MSS Digital Solutions"

/** Root <title> — the tab title and the homepage share title. */
export const SITE_TITLE =
  "MSS Digital Solutions — Digital Health Systems & Geospatial Intelligence"

/** Meta description for search results (kept under ~160 characters). */
export const SITE_DESCRIPTION =
  "A Kano-based health technology company: digital health systems, geospatial intelligence and data analytics for government, development and health partners."

/** Longer copy for link previews, where platforms show more than 160 characters. */
export const SHARE_DESCRIPTION =
  "MSS Digital Solutions is a Kano-based health technology company. We build digital health systems, map settlements and health facilities, and turn routine data into analytics that help governments, development partners and healthcare institutions reach the communities services have not yet reached."

export const OG_IMAGE = {
  url: "/brand/og-image.png",
  width: 1200,
  height: 630,
  alt: "MSS Digital Solutions — digital health systems, geospatial intelligence and data analytics",
} as const

/**
 * Per-route metadata: page title, search description, canonical URL, and a
 * share card that carries the page's own title/description instead of falling
 * back to the homepage's.
 *
 * `title` must NOT include the site name — the root layout's title template
 * appends " | MSS Digital Solutions" to <title>, and this helper appends it to
 * og:title/twitter:title. Baking it in at the call site produces
 * "Capabilities — MSS Digital Solutions | MSS Digital Solutions".
 */
export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  shareDescription,
}: {
  title: string
  description?: string
  /** Route path, e.g. "/capabilities". Also used as the canonical URL. */
  path: string
  /** Optional longer copy for the share card. */
  shareDescription?: string
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`
  const share = shareDescription ?? description

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_NG",
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description: share,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: share,
      images: [OG_IMAGE.url],
    },
  }
}
