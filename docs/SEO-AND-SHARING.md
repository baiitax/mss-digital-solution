# Titles, descriptions and link previews

Everything search engines and social platforms read lives in `src/lib/seo.ts`.
Pages call one helper so the rules cannot drift apart again.

## The rules

1. **"Ltd" never appears in a title.** The registered suffix is a legal detail:
   it stays in body copy (footer copyright, About → registered details), in the
   Terms and Privacy pages, and in structured data as `legalName`. It is not in
   `<title>`, `og:title` or `twitter:title`.
2. **A page title carries no site name.** The root layout's template appends
   ` | MSS Digital Solutions`. Baking it in at the call site produced titles such
   as `Capabilities — MSS Digital Solutions | MSS Digital Solutions`.
3. **A shared link explains the company.** `og:description` is longer than the
   search description and is used as the share-card copy, so a reader who has
   never heard of MSS learns where it is, what it builds and who it serves
   without opening the page.
4. **Every route has its own share card data.** A page that defines only `title`
   inherits the homepage's `og:title`/`og:description`; `pageMetadata()` sets the
   page's own values plus a canonical URL.

## Using the helper

```tsx
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Geospatial Intelligence",        // no site name, no "Ltd"
  path: "/capabilities/geospatial-intelligence",
  description: "Under ~160 characters for search results.",
  shareDescription: "Longer copy — up to ~300 characters — for link previews.",
})
```

Client components (`"use client"`) cannot export metadata. `/contact` is one, so
`src/app/contact/layout.tsx` carries its metadata instead.

The CMS routes build their metadata in `generateMetadata()` but still go through
`pageMetadata()`, so admin-authored pages get the same canonical + share card.
`seo_title` / `seo_description` set in the admin portal override the derived
values, so editors should still avoid typing "Ltd" into `seo_title`.

## The share card

`public/brand/og-image.png` — 1200 × 630, the size every platform crops from.
It is generated, not hand-drawn:

```bash
curl -sL -o Manrope.ttf \
  "https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/Manrope%5Bwght%5D.ttf"
python3 scripts/make-og-image.py Manrope.ttf
```

It uses the owner's logo lockup and emblem, the brand palette, and only facts
already published on the site (services, Kano, RC 7341058). No stock imagery, no
metrics, no claims. Regenerate it if the logo or the headline copy changes.

## Canonical origin

`SITE_URL` resolves in this order:

1. `NEXT_PUBLIC_SITE_URL` — set this in Vercel when the real domain is attached,
   or in `.env.local` (`http://localhost:3100`) for local work.
2. `VERCEL_PROJECT_PRODUCTION_URL` — injected by Vercel; follows the project's
   production domain automatically.
3. `https://mss-digital.vercel.app` — fallback for a plain local build.

This matters: `mss-digitalsolutions.com` has no DNS record yet, so a hard-coded
canonical pointed every `og:image` at a host that does not resolve, and WhatsApp
and LinkedIn fell back to a text-only preview. Once the domain is live, attach it
to the Vercel project — no code change is needed, only the env var if you want it
pinned.

## Structured data

`src/app/layout.tsx` emits an `Organization` + `WebSite` graph: name, `legalName`,
logo, description, Kano address, RC 7341058, `areaServed`, `knowsAbout`. Google
and Bing use it to build the knowledge panel and to caption shared links.

## Verifying a change

```bash
npx next build && npx next start -p 3100
curl -s localhost:3100/about | grep -E '<title>|og:(title|description|image|url)|name="description"|canonical'
```

Check, for every route: the title has no `Ltd`, the site name appears once, the
description differs from the homepage's, `og:image` is absolute and on a host
that resolves, and the canonical matches the route.
