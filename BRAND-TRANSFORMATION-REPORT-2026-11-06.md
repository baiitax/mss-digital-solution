# MSS DIGITAL SOLUTIONS — BRAND TRANSFORMATION & WEBSITE RESTRUCTURE

**Final Delivery Report**
Date: 6 November 2026
Live site: https://mss-digital.vercel.app
Repository: `baiitax/mss-digital-solution` (branch `main`, head `b92aeb5`)
Stack: Next.js 16.4.5 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Supabase · Vercel

---

## A. EXECUTIVE SUMMARY

The existing Next.js application was evolved — not rebuilt — into a Burgundy and Storm Grey corporate platform with a complete 15-page information architecture, a deliberately concise homepage, four dedicated capability pages, a 12-section flagship case study, a separate implementation-methodology page, and full legal pages.

| Measure | Before | After |
|---|---|---|
| Routes (public) | 12 (several mis-scoped) | 15 canonical + 5 legacy 308 redirects |
| Brand palette | Navy `#10283F` / Deep Navy `#0A1D30` / Teal `#087F83` / Cyan `#48BFC2` | Burgundy `#701F3D` / `#50152D` / `#A34B68` + Storm Grey `#59636D` / `#343D46` / `#89929B` |
| Legacy navy/teal computed-style hits on homepage | — | **0** (verified in-browser) |
| Homepage sections | 9 (duplicated capability + programme content) | 7 distinct sections with unique objectives |
| Stylesheet | 81,407 bytes (navy build) | 82,866 bytes (Burgundy build, verified live) |
| Broken images across all routes | — | **0** at 320 → 1440 px |
| Horizontal overflow | 12 px at 1024 px viewport | **0** at 320/375/390/430/768/1024/1440 |
| Contact persistence | 500 error — table missing in Supabase | Verified: form → API → `public.contact_enquiries` row |
| Lint | 1 error | **0 errors**, 18 warnings (all `no-img-element` advisories) |
| Production build | pass | pass — 23 routes, TypeScript clean |

---

## B. BRAND IDENTITY SYSTEM

### B1. Colour tokens (centralised, single source of truth)

Defined once in `src/app/globals.css` as CSS custom properties and consumed as Tailwind arbitrary values; no component invents its own colour.

| Token | Hex | Role |
|---|---|---|
| `--burgundy` | `#701F3D` | Primary brand, primary CTAs, active nav, section identifiers |
| `--burgundy-deep` | `#50152D` | CTA hover, emphasis |
| `--burgundy-light` | `#A34B68` | Focus rings, subtle accents |
| `--burgundy-soft` | `#F9E9EE` | Tinted panels, badges, highlight surfaces |
| `--storm` | `#59636D` | Body copy, supporting typography |
| `--storm-deep` | `#343D46` | Section backgrounds, nav top bar, footer |
| `--storm-light` | `#89929B` | Meta text, labels |
| `--warm-white` | `#FAF9F7` | Page background |
| `--soft-grey` | `#F0F1F2` | Alternate section bands, cards |
| `--charcoal` | `#252B31` | Headings, body foreground |
| `--graphite` | `#1A1F24` | Deep overlays, image scrims |

Balance follows the brief: neutrals carry most of the page, Storm Grey establishes technical character, Burgundy appears as a deliberate accent (CTAs, eyebrows, active states, one full-bleed CTA panel). The site is **not** dark, and there are no purple gradients, teal branding, neon accents or glassmorphism beyond functional backdrop-blur on the mobile drawer and image overlays.

### B2. Typography
Manrope (display/headings) + Inter (body) + JetBrains Mono (numeric labels). `DM_Sans` was removed from the font payload; the tailwind font stack resolves to `Manrope, Inter, system-ui`.

### B3. Component-level application
Buttons, badges, eyebrow rules, nav, footer, cards, table rows, form fields, focus rings, scrollbar and text selection all re-pointed at the new tokens. `Badge` and `Button` variants were renamed to `burgundy` / `storm` (legacy `teal` / `navy` kept as aliases so no caller breaks).

---

## C. INFORMATION ARCHITECTURE

### C1. Route inventory and classification

| Route | Classification | Purpose (unique question answered) |
|---|---|---|
| `/` | Existing — **rebuilt** | Who are you and what do you do? |
| `/about` | Existing — **improved + expanded** | Who is MSS as an organisation? |
| `/capabilities` | Existing — **improved** | What can MSS deliver? |
| `/capabilities/digital-health-systems` | Existing — **restructured** (was `/capabilities/digital-health`) | How does digital health work? |
| `/capabilities/geospatial-intelligence` | Existing — **restructured** (was `/capabilities/geospatial`) | How does geospatial intelligence work? |
| `/capabilities/data-analytics` | Existing — **restructured** (was `/capabilities/analytics`) | How does analysis become decisions? |
| `/capabilities/programme-management` | Existing — **improved** | How does MSS deliver and verify? |
| `/our-work` | **Missing — created** | What documented work exists? |
| `/our-work/geo-st4r-kano` | Existing — **restructured** (was `/projects/geo-st4r`) | What happened in the flagship programme? |
| `/how-we-work` | **Missing — created** | How does MSS approach implementation? |
| `/leadership` | Existing — **retained + rebranded** | Who leads the organisation? |
| `/insights` | Existing — **rebuilt as empty state** | What does MSS publish? |
| `/contact` | Existing — **rebuilt** | How do institutions engage MSS? |
| `/privacy-policy` | Existing — **moved** (was `/privacy`) | How is enquiry data handled? |
| `/terms` | Existing — **retained + rebranded** | What terms govern use? |
| `/admin` | Existing — retained | Internal dashboard (not in public nav) |

**Redundant / removed:** five legacy routes retired with permanent 308 redirects so no inbound link breaks — `/capabilities/digital-health`, `/capabilities/geospatial`, `/capabilities/analytics`, `/projects/geo-st4r`, `/privacy` (plus `/projects` → `/our-work`). Verified live: all return `308` with correct `location`.

### C2. Content ownership (non-duplication)

| Page | Owns |
|---|---|
| Home | 3-sentence Geo-ST4R summary, 1-paragraph leadership intro, capability names only |
| About | Company background, purpose, mission, philosophy, Kano advantage, registration table |
| Capabilities | One-paragraph definition per practice + link (no service detail) |
| Capability pages | The nine named content areas per practice, documented-vs-capability disclosure |
| Our Work | Portfolio framing, one verified project card, scalability note |
| Geo-ST4R | The complete 12-section case study (unique to this page) |
| How We Work | Four-stage method, three engagement models, "best when" guidance |
| Leadership | The full verified biography, experience, contributions, education, certifications |
| Insights | Category taxonomy + empty state (no fabricated articles) |
| Contact | Organisational details, dual enquiry forms, data-protection notice |

No paragraph is copied between pages; the homepage carries no biographical list, no methodology detail and no full case study.

---

## D. HOMEPAGE (7 SECTIONS)

| # | Section | Headline (as specified) |
|---|---|---|
| 1 | Hero | *Building Health Systems That Reach Every Community.* — eyebrow "MSS DIGITAL SOLUTIONS", primary CTA "Explore Our Capabilities", secondary "Partner With Us" |
| 2 | Short introduction | *Technology. Geography. Better Health Outcomes.* → "Discover MSS" |
| 3 | Core capabilities | *What We Do.* — four concise cards, each linking to its page |
| 4 | Featured work | *Making Every Community Visible.* — Geo-ST4R, "Explore the Geo-ST4R Case Study" |
| 5 | Approach | *Designed With the People Who Deliver.* — Assess → Co-design → Deploy → Verify |
| 6 | Leadership | *Leadership Grounded in Technology and Public Health.* — one paragraph + "Meet Our Executive Director" |
| 7 | Final CTA | *Let's Build Health Systems That Reach Everyone.* — "Start a Partnership Conversation" |

Removed from the homepage during simplification: the 8-tile "Where we create impact" grid, the embedded interactive map, the credibility statistics strip, the engagement-models block, the duplicated four-card competency grid with long service descriptions, and the duplicate final-CTA band in the footer.

---

## E. CONTENT INTEGRITY

The site publishes only what the company profile supports:

- **Geo-ST4R** — procedural contribution language ("helped make previously overlooked settlements visible within the planning process"). No beneficiary totals, facility counts, dates, financial values or impact percentages.
- **Synthetic data labelling** — every map, point and dashboard on the site is explicitly labelled illustrative/synthetic (hero card, case study banner, geospatial demo panel, analytics visual). Retained from the previous build.
- **Demonstrated vs capability** — each capability page separates documented delivery (LoMIS Suite / WFP award 2022–2023, GAVI-funded EMID optimisation, BISKIT South Africa, SPRING I & II) from current service capability.
- **Insights** — six placeholder articles were **deleted**; the page is now a designed empty state with an eight-category taxonomy stating that publications appear once reviewed and approved. `/insights/[slug]` returns the branded not-found state with `noindex` until the first real article exists.
- **Contact details** — email and telephone are marked "to be confirmed… published once verified by MSS" rather than invented.
- **Vision** — displayed with an explicit "proposed — awaiting approval" tag.
- **Legal pages** — privacy and terms are drafted for company/legal review; no certifications or compliance claims are made.
- **Partners** — Natview Foundation, Data Science Network and Pathfinder International are named; no funding or contract values are disclosed.

---

## F. QUALITY ASSURANCE

### F1. Build & static analysis
- `next build` — **pass**, 23 routes, Turbopack compile ~0.7 s, TypeScript pass.
- `next lint` / ESLint — **0 errors**, 18 warnings, all `@next/next/no-img-element` advisories on intentional `<img>` usage with fixed aspect ratios.
- Fixed during QA: one `setState`-in-effect error in the mobile nav (now deferred), one unused `eslint-disable`, two optional-chain TypeScript errors in the dropdown map.

### F2. Route & link integrity (production)
- All 15 canonical routes → **200**.
- 30 unique internal links crawled → **0 broken**.
- 1 external link (Google Maps) → reachable, `rel="noopener noreferrer"`.
- Legacy routes → **308** to canonical destinations.

### F3. Responsive & layout (production, 7 widths × 15 routes = 105 checks)
320 / 375 / 390 / 430 / 768 / 1024 / 1440 px:
- Horizontal overflow: **0 px everywhere** (a 12 px overflow at 1024 px was found on all routes and fixed by making nav sizing responsive between `lg` and `xl`).
- Exactly one `<h1>` per route.
- Zero broken images at every width.
- Desktop nav verified on a single line at 1280 px and 1440 px (wrapping was found and fixed with `whitespace-nowrap` + responsive padding).

### F4. Interaction tests (Playwright, headless Chromium)
| Test | Result |
|---|---|
| Capabilities dropdown on hover (desktop) | Pass — sublinks visible |
| Mobile drawer toggle | Pass — `aria-expanded` false → true, `body overflow: hidden` |
| Mobile capabilities accordion | Pass — four sublinks visible inside the drawer |
| Drawer backdrop dismiss | Pass — overflow cleared |
| Contact — empty submit | Pass — inline validation "Please complete your name, email address and message" |
| Contact — valid partnership submission | Pass — success state rendered |
| Contact — general enquiry switch | Pass — 6 general options, button label swaps |
| End-to-end persistence | Pass — row written to `public.contact_enquiries` (verified by SQL, then test rows deleted) |

### F5. Accessibility measures applied
Skip-free semantic landmarks (`header`/`nav`/`main`/`footer`), labelled form fields with `htmlFor`, `aria-pressed` on the enquiry-type switches, `aria-current="page"` on breadcrumbs, `role="status"`/`role="alert"` on submission feedback, `aria-label` on icon-only buttons, visible focus rings in burgundy, and ≥44 px touch targets in the mobile drawer.

---

## G. DEPLOYMENT, ARTEFACTS & OPEN ITEMS

### G1. Deployment
- 8 commits pushed to `main`; Vercel auto-deployed each; final head `b92aeb5`.
- Production verified after each deploy — final sweep confirms CSS 82,866 bytes, Manrope rendering, zero legacy colour hits.

### G2. Database (Supabase project `poegugwteonpxnvdwzwx`)
Migration `mss_core_content_models` applied:
- `contact_enquiries` — 15 columns, status workflow (`new`/`in_review`/`responded`/`closed`), RLS **insert-only** for `anon`, indexes on `created_at` and `status`.
- `insights` — publishing model (slug, category, body, status draft/review/published, featured, SEO fields), RLS select where `status = 'published'`.
- `projects` — scalable portfolio model (slug, summary, focus areas, partners, status, featured).
- `touch_updated_at()` trigger on all three.
These are content models, not a table per static section.

### G3. Screenshots (in workspace)
- `screenshots/final/` — 25 after-images: 1440 px, 768 px, 390 px and 375 px across home, about, capabilities, geospatial, our-work, geo-st4r, how-we-work, leadership, insights, contact, plus dropdown and drawer states and the contact success state.
- `screenshots/*.png` — 21 before-images from the navy/teal build, retained for before-and-after comparison.

### G4. Open items requiring MSS input
1. **Verified contact channels** — email address and telephone number to replace the two administrative placeholders (footer, contact page).
2. **Vision statement** — confirm as adopted, or revise; currently labelled *proposed*.
3. **Insights content** — first approved article(s) to exit the empty state. The `insights` table and article template are ready; publishing requires adding a record and re-enabling `generateStaticParams`.
4. **Legal review** — privacy policy and terms are drafts and should be reviewed by counsel before being presented as final.
5. **Credentials** — the GitHub token used for this session is embedded in earlier shell history; **revoke and rotate it**, then re-add Vercel's Git integration.
6. **Optional** — migrate `<img>` to `next/image` for the remaining illustrative photography (18 lint advisories); deliberately deferred to avoid destabilising image rendering in this change set.

---

### Acceptance criteria — status

| # | Criterion | Status |
|---|---|---|
| 1 | Burgundy & Storm Grey consistently applied | ✅ 0 legacy colour hits in computed styles |
| 2 | Navy/teal styling removed | ✅ tokens, components, globals rewritten |
| 3 | Homepage concise and composed | ✅ 7 sections, each with distinct objective |
| 4 | All necessary internal pages exist | ✅ 15 canonical routes |
| 5 | Every page unique content & purpose | ✅ ownership matrix in §C2 |
| 6 | Four capabilities have dedicated pages | ✅ with all nine specified content areas each |
| 7 | Geo-ST4R detailed case study | ✅ 12 sections + sticky index |
| 8 | How We Work dedicated page | ✅ 4 stages + 3 engagement models |
| 9 | Leadership complete profile | ✅ full verified biography |
| 10 | Contact functionality works | ✅ validated + persisted to Supabase |
| 11 | Insights functional publishing structure | ✅ taxonomy + model + template (empty state) |
| 12 | Legal pages exist | ✅ `/privacy-policy`, `/terms` |
| 13 | All images load | ✅ 0 broken across 105 checks |
| 14 | Mobile & desktop layouts work | ✅ 320–1440 px |
| 15 | Navigation & internal links work | ✅ 0 broken of 30 |
| 16 | Existing features remain operational | ✅ dropdown, drawer, forms, admin route, geospatial demo |
| 17 | Production build succeeds | ✅ TypeScript clean, 0 lint errors |
| 18 | Live deployment verified | ✅ post-deploy sweeps on every commit |
