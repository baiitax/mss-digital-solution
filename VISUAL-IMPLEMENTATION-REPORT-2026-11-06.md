# Visual Implementation Report — 2026-11-06

**MSS Digital Solutions Ltd — corporate website (Next.js 16 / App Router)**
Status: implementation complete, verified locally, pending commit + push.
Scope: the full Master Visual Implementation Prompt — 13 public routes, 27 registered photographic assets, 3 original data visualisations, a central image manifest, and a QA sweep across 3 viewports.

---

## 1. What was delivered

| Deliverable | Detail |
|---|---|
| Central image manifest | `src/content/images.ts` — 28 registered entries (27 photographs + 1 company portrait), each with `src`, intrinsic `width`/`height`, `alt`, `kind`, `purpose`, optional `caption`, `credit`, `licence`, `sourceUrl` |
| Asset architecture | `public/images/{homepage,about,capabilities,capabilities/digital-health,capabilities/geospatial,capabilities/analytics,capabilities/programme-management,methodology,leadership,insights,contact,projects/geo-st4r}` — descriptive kebab-case filenames, no `IMG_0001` |
| Frame component | `src/components/ui/Figure.tsx` — one frame contract: aspect ratio, `object-position`, provenance chip ("Representative image" / "Illustrative image" / "Synthetic demonstration"), caption, branded fallback |
| Original visualisations | `src/components/visuals/SyntheticVisuals.tsx` — `SettlementCatchmentMap`, `MicroplanningWorkflow`, `CoverageDashboard`. Hand-authored SVG, brand palette, provenance badge and footnote on every one |
| Image consumers | 11 page/section surfaces wired (see §5 asset→section map) |
| QA sweep | `scripts/visual-sweep.mjs` → 13 routes × 3 viewports = **39 pages, 0 problems**; screenshots in `screenshots/visual/`, curated set in `docs/visual-review/` |
| Automated tests | `tests/image-system.spec.ts` — 17 tests: every image loads and decodes, alt text present, hero eager + `fetchpriority="high"`, no remote stock hotlinks, mobile receives a narrower variant than desktop, synthetic labels visible |

---

## 2. Governing rule applied to every frame

> An image earns its place only if it does a job no other element on that page does.

Applied as a hard filter, which is why no image is decorative and no image is reused across routes without a distinct purpose (the two deliberate cross-route repeats are noted in §5). Every frame answers three questions in the manifest: *what is it for*, *how may it honestly be described*, and *who licensed it*.

---

## 3. Truthfulness labelling (non-negotiable)

Three provenance labels are rendered in the UI, not just in metadata:

- **"Representative image"** — licensed photography used to illustrate a subject. It is not documentation of an MSS project, a project site, or a named beneficiary.
- **"Illustrative image"** — a licensed photograph used as context for a capability, not as proof of delivery.
- **"Synthetic demonstration" / "Illustrative · synthetic data"** — original diagrams. Hard-coded into the SVG components themselves, so the label cannot be lost if a page is edited.

No frame implies: an MSS deployment, a partner presence, a facility we serve, a funded programme, a beneficiary count, or an official endorsement. No fictional portrait was generated. No stock watermark remains. No watermarked thumbnail, no Unsplash *premium*/*plus* asset, no Getty/Vecteezy preview was used at any point.

---

## 4. Assets: added, replaced, generated

### 4.1 Added — 26 licensed photographs (all self-hosted)

Sourced from **Pexels** (Pexels License: free for commercial use, modification permitted, attribution not required). Each file was downloaded at full resolution (`w=2560`), re-compressed, and is served from `public/images/`. **Nothing is hotlinked.** Photographer is recorded in the manifest for every asset even though the licence does not demand it.

| # | File | Photographer | Pexels source |
|---|---|---|---|
| 1 | `homepage/home-hero-community-health.jpg` | MK Photoz | pexels.com/photo/33127835 |
| 2 | `homepage/home-intro-collaboration.jpg` | Mikhail Nilov | — |
| 3 | `capabilities/cap-digital-health-systems.jpg` | Tessy Agbonome | — |
| 4 | `capabilities/cap-geospatial-intelligence.jpg` | GeoJango Maps | pexels.com/photo/7663519 |
| 5 | `capabilities/cap-data-analytics.jpg` | Mikhail Nilov | — |
| 6 | `capabilities/cap-programme-management.jpg` | Mikhail Nilov | — |
| 7 | `projects/geo-st4r/geo-st4r-kano-landscape.jpg` | Abduljalil Attahir | — |
| 8 | `projects/geo-st4r/kano-urban-sprawl.jpg` | Al'ameen NG | — |
| 9 | `projects/geo-st4r/kano-street-mobility.jpg` | Nasiru Othman | — |
| 10 | `projects/geo-st4r/immunisation-service-point.jpg` | Gustavo Fring | — |
| 11 | `methodology/stage-assess-community.jpg` | Adamu Galadima | pexels.com/photo/37285163 |
| 12 | `methodology/stage-co-design-workshop.jpg` | Picha Stock | — |
| 13 | `methodology/stage-deploy-service-delivery.jpg` | Denis Ngai | — |
| 14 | `methodology/stage-verify-analysis.jpg` | Kampus Production | — |
| 15 | `about/about-team-institutional.jpg` | Edmond Dantes | — |
| 16 | `about/about-community-care.jpg` | Khanh Hoang Minh | pexels.com/photo/34717769 |
| 17 | `about/about-digital-record.jpg` | Tessy Agbonome | — |
| 18 | `capabilities/digital-health/dhs-facility-environment.jpg` | SpeakMedia Uganda | — |
| 19 | `capabilities/digital-health/dhs-tablet-workflow.jpg` | Tima Miroshnichenko | — |
| 20 | `capabilities/digital-health/dhs-workforce-portrait.jpg` | Wundef | — |
| 21 | `capabilities/geospatial/geo-cartography-desk.jpg` | Sonny | — |
| 22 | `capabilities/geospatial/geo-aerial-settlement-pattern.jpg` | Zakaria Joy | — |
| 23 | `capabilities/analytics/analytics-review-session.jpg` | Divine Techy Girl | — |
| 24 | `capabilities/analytics/analytics-team-working.jpg` | Edmond Dantes | — |
| 25 | `capabilities/programme-management/programme-stakeholder-table.jpg` | Mahyub Hamida | — |
| 26 | `contact/contact-institutional-dialogue.jpg` | Edmond Dantes | — |

Total self-hosted image payload: **3.4 MB across 27 files** (largest single file 364 KB, all served through `next/image` at request-time sizes).

### 4.2 Replaced — retired assets

Six previously reused Unsplash images were retired because they were (a) duplicated three-deep across pages, (b) generic "global health lab" stock that no longer matched the argument, and (c) served from a remote CDN. The `unsplash.com` entry was removed from `next.config.ts` `remotePatterns`, so no remote stock origin is permitted by the image optimiser at all.

Retired: `photo-1576091160550` (×3), `photo-1576091160399` (×3), `photo-1552664730`, `photo-1551288049`, `photo-1451187580459`.

### 4.3 Generated — 3 original visualisations

No third-party diagram, no screenshot of deployed software, no real coordinates, no real facility names.

| Component | Where | What it communicates | Label |
|---|---|---|---|
| `SettlementCatchmentMap` | `/our-work/geo-st4r-kano` §05 | Administrative catchment (assumed even coverage) vs. mapped settlement points, and which settlements fall outside the assumed pattern — the core argument for settlement-level planning | "Synthetic demonstration" + footnote: schematic only, positions synthetic, does not represent Kano State |
| `MicroplanningWorkflow` | `/our-work/geo-st4r-kano` §09 | Five stages, each producing the artefact the next stage consumes; verification closes the loop | "Synthetic demonstration" |
| `CoverageDashboard` | `/capabilities/data-analytics` ("Dashboard Anatomy") | What a coverage-review screen must answer — deliberately **blank** KPI tiles plus a decision prompt, so it cannot be read as programme results | "Illustrative · synthetic data" + footnote: not a screenshot of MSS software |

### 4.4 Authentic company assets

| Asset | Status |
|---|---|
| `leadership/jamil-aliu-galadanci.jpg` | Executive Director portrait, supplied as a company asset and registered `kind: "authentic"`. Rendered through `next/image` at 640×800, `object-top`, on both `/leadership` and `/about`. **Confirm release/approval before publication**; if the approved photograph has not yet been provided, this frame is the one to replace. |

**Still awaiting MSS-supplied material (no image invented in the meantime):** authentic Geo-ST4R field photography, any approved Vision visual, partner logos, any facility/team photography of actual MSS work. Placeholders are neutral and labelled rather than faked.

---

## 5. Asset → section map

### Homepage (`/`)
| Section | Image | Job it does |
|---|---|---|
| Hero card | `home-hero-community-health` | Puts a real community-health encounter at the top of the page — the site's whole argument in one frame. `priority`, `fetchpriority="high"`, not lazy, `object-[62%_45%]` to keep both faces in frame at every breakpoint |
| Intro (2-col) | `home-intro-collaboration` | Shows partnership as work, not as a handshake cliché |
| Capabilities — 4 cards | `cap-digital-health-systems`, `cap-geospatial-intelligence`, `cap-data-analytics`, `cap-programme-management` | Four visually distinct domains, **no reuse**, so the four cards read as four practices rather than one stock set |
| Geo-ST4R band | `geo-st4r-kano-landscape` | Anchors the flagship case study in the Kano landscape it describes; carries a "Synthetic demonstration data" note where figures appear |
| Methodology — 4 stages | `stage-assess-community`, `stage-co-design-workshop`, `stage-deploy-service-delivery`, `stage-verify-analysis` | One photograph per stage, sequenced left-to-right in the same order as the method |
| Partnership CTA | `about-team-institutional` at 16 % opacity inside a burgundy panel | Texture for the closing panel without competing with the call to action |

### `/capabilities` (index)
Four `as const` keys, each with a "Representative" chip — the index is deliberately a *visual* comparison of four practices.

### Capability pages (via `CapabilityTemplate`)
| Route | Hero | Gallery |
|---|---|---|
| `/capabilities/digital-health-systems` | `cap-digital-health-systems` | `dhs-facility-environment`, `dhs-tablet-workflow`, `dhs-workforce-portrait` |
| `/capabilities/geospatial-intelligence` | `cap-geospatial-intelligence` | `geo-cartography-desk`, `geo-aerial-settlement-pattern` + interactive `GeospatialDemo` |
| `/capabilities/data-analytics` | `cap-data-analytics` | `analytics-review-session`, `analytics-team-working` + `CoverageDashboard` |
| `/capabilities/programme-management` | `cap-programme-management` | `programme-stakeholder-table`, `stage-assess-community`, `stage-co-design-workshop` |

### `/our-work` and the case study
`our-work` card hero → `geo-st4r-kano-landscape`. Case study `/our-work/geo-st4r-kano`: §02 `kano-urban-sprawl` + `kano-street-mobility` (Kano context), §04 `immunisation-service-point` (the service point the microplan has to reach), §05 `SettlementCatchmentMap` + `cap-geospatial-intelligence`, §09 `MicroplanningWorkflow`.

### `/about`, `/leadership`
`/about`: hero-adjacent `about-community-care`, full-width editorial band `about-team-institutional`, `about-digital-record` beside the commitment argument, Executive Director portrait in the Our Team section. `/leadership`: portrait only — leadership content lives in one place, and `/leadership` is linked from `/about`.

### `/how-we-work`
Four stage cards refactored to `overflow-hidden` + image header + `p-6` body; each header carries a "Representative" pill. Same four stage photographs as the homepage, used here as *chapter headings* for the method rather than as a teaser.

### `/insights`
Full-width editorial band `analytics-team-working` before Topic Areas — gives a text-heavy page one visual anchor at the top third.

### `/contact`
`contact-institutional-dialogue` under the organisation card, `hidden lg:block` — desktop earns the human frame, mobile is spared the scroll.

---

## 6. Performance

All photography runs through `next/image` with intrinsic dimensions (no layout shift), explicit `sizes` per breakpoint, `priority` on the hero only, and lazy loading everywhere below the fold.

**Format negotiation verified against the running build** (`Accept` header, homepage hero at `w=1920`):

| Format served | Bytes | Saving vs. source JPEG |
|---|---|---|
| AVIF | 90 KB | ~68 % |
| WebP | 146 KB | ~48 % |
| Source JPEG (280 KB) | 280 KB | — |

**Measured transfer per page** (Chromium, network-idle, full scroll):

| Route | Mobile (390) | Desktop (1440) |
|---|---|---|
| `/` | 7 images, **84 KB** | 12 images, **139 KB** |
| `/about` | 4 images, 33 KB | 4 images, 23 KB |
| `/capabilities` | 4 images, 49 KB | 4 images, 49 KB |
| `/our-work/geo-st4r-kano` | 4 images, 49 KB | 4 images, 76 KB |
| `/capabilities/geospatial-intelligence` | 3 images, 27 KB | 3 images, 27 KB |

Mobile downloads a narrower `w=` variant than desktop on every route (asserted in `tests/image-system.spec.ts`). Lazy/eager split on the homepage: **1 eager, 11 lazy**.

---

## 7. QA results

**Automated sweep** — `node scripts/visual-sweep.mjs` against a production build (`next start`):
`pages checked: 39 · problems: 0`

Per page, per viewport, the sweep asserts: no image with `naturalWidth === 0` (broken/empty frame), no image missing an `alt` attribute, no `4xx`/`5xx` response for any image request, no horizontal overflow (`scrollWidth ≤ clientWidth`), exactly one `<h1>`.

**Playwright suite** — `tests/image-system.spec.ts`: **17/17 passing**.
Plus the existing site suite (navigation, forms, accessibility, responsive header) re-run against the same build.

**Visual review** — every route reviewed at 1440, 768 and 390. Curated screenshots committed in `docs/visual-review/`; the full 39-page set is in `screenshots/visual/`.

**Fixes made during review** (all found by looking at the rendered output, not by the tests):

1. `SettlementCatchmentMap` — legend ran past the viewBox and collided with the catchment circles. Legend moved into a bordered panel, field density raised to a realistic distribution, header left-aligned.
2. `CoverageDashboard` — KPI placeholders rendered as broken maroon dashes; trend sparkline overflowed its panel and the "TREND" label sat on the border. Placeholders now neutral, polyline rescaled inside the panel, baseline added.
3. `MicroplanningWorkflow` — two stage titles truncated to "Settlement reg…" / "Facility catch…". Titles shortened to single words and the truncation removed.
4. `GeospatialDemo` (pre-existing interactive component) — still carried a green/red palette and a `#E8EEF5` map plate that fought the Burgundy/Storm identity, plus a hard red `#DC2626` "unreached" state. Recoloured to brand tokens (`#F0F1F2` plate, `#701F3D` / `#50152D` states).
5. Duplicate map — the static catchment diagram and the interactive demo sat one above the other on `/capabilities/geospatial-intelligence`. The static diagram is now case-study-only; the capability page keeps the interactive demo and its two photographs.
6. `Figure` type widening — the `as SiteImage` cast in `Figure.tsx` fixed a union-member mismatch on `caption`.

---

## 8. Accessibility

- Real `alt` text on every frame, written to describe the *contribution* of the image, not its pixels. Decorative-only frames are impossible by construction — the manifest requires `alt`.
- Provenance chips are text, not colour, so no meaning depends on hue.
- Diagrams carry an accessible title/description and a visible footnote; they are labelled synthetic in the rendered markup, not just in the report.
- Contrast preserved: no burgundy photo filter was applied to any photograph; natural skin tones retained throughout.

---

## 9. Representation decisions

Deliberate, and defensible: Nigerian and African subjects in active, competent framing — health workers holding the device, teams at the table, officials in discussion. No "helpless recipient" framing, no anonymous crowds of suffering, no Western clinicians substituted for African ones where the subject is the Nigerian health workforce. Where a photograph could not honestly represent MSS's own work, it is labelled representative rather than dressed up as documentary.

---

## 10. Open items for MSS

| # | Item | Owner |
|---|---|---|
| 1 | Confirm release/approval of the Executive Director portrait, or supply the approved photograph | MSS |
| 2 | Authentic Geo-ST4R field photography — replaces representative Kano imagery in the case study | MSS |
| 3 | Approved Vision visual (Vision may only appear if formally approved) | MSS |
| 4 | Verified email address and phone number for the contact section | MSS |
| 5 | First approved insight article | MSS |
| 6 | Legal review of privacy / terms / accessibility pages | MSS + legal |
| 7 | Rotate the GitHub personal access token used for the last push | Owner |

---

## 11. Files added/changed

```
src/content/images.ts                      NEW — central manifest (28 entries)
src/components/ui/Figure.tsx               NEW — frame + provenance chip + fallback
src/components/visuals/SyntheticVisuals.tsx NEW — 3 labelled SVG visualisations
public/images/**                           NEW — 27 self-hosted assets, 3.4 MB
scripts/visual-sweep.mjs                   NEW — 39-page sweep
tests/image-system.spec.ts                 NEW — 17 image-system tests
docs/visual-review/*.jpg                   NEW — curated review screenshots
src/app/**/page.tsx                        MODIFIED — 13 routes wired
src/components/sections/CapabilityTemplate.tsx MODIFIED — heroImage + gallery
src/components/maps/GeospatialDemo.tsx     MODIFIED — brand recolour
src/components/ui/SafeImage.tsx            DELETED — superseded by Figure
next.config.ts                             MODIFIED — remotePatterns no longer permits remote stock
```

### Deployment

Pushed to `main` as **`ed06494`** and deployed to production by Vercel (`dpl_8u1VjbNgoeopBJ51n4xV1ALYWX7P`, state READY, promoted to `mss-digital.vercel.app`).

Post-deploy verification against https://mss-digital.vercel.app:

| Check | Result |
|---|---|
| 8 sampled routes | all `200` |
| Self-hosted image files | `200` (hero 282 KB source JPEG, served as AVIF 90 KB) |
| AVIF negotiation on production | `content-type: image/avif`, 90,903 bytes at `w=1920` |
| Remote stock references (unsplash) | `0` on `/`, `/about`, `/capabilities`, `/our-work/geo-st4r-kano` |
| Provenance labels live | "Representative image" ×6 on `/` · "Illustrative · synthetic data" · "Synthetic demonstration" · "Schematic only … synthetic" footnote |
| Exactly one `<h1>` | confirmed on 8 routes |
| Hero priority | `fetchPriority="high"` present on the hero `img`, no `loading="lazy"` |
| Legacy red `#DC2626` (interactive demo) | `0` occurrences — brand recolour live |

The complete 35-test Playwright suite was run against the identical local production build before push: **35/35 passing** (18 site/nav/a11y + 17 image-system).
