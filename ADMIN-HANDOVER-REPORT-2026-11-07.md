# Enterprise administration, CMS & website operations portal — handover report

**Client:** MSS Digital Solutions Ltd
**Deliverable:** a working administration portal at `/admin` on the existing Next.js + Supabase stack
**Date:** 7 November 2026
**Build:** `next build` green · `eslint` clean (0 errors, 0 warnings) · TypeScript strict, no errors
**Database:** Supabase `poegugwteonpxnvdwzwx` — 25 tables, RLS on all, 50 policies, migrations 001–006 applied and recorded

---

## 1. Status summary

| Measure | Result |
| --- | --- |
| Administration modules delivered | 24 (of 27 specified; 3 deliberately deferred, see §5) |
| Modules returning HTTP 200 for an authorised user | 24 / 24 |
| Automated checks passing | **35 / 35** — 16 E2E, 11 permission/RLS, 8 configuration |
| Dead buttons or dummy tables | none — every action writes to the database and is audited |
| Static dashboard figures | none — every tile is a live count, or explicitly shown as unavailable |
| Permissions enforced server-side **and** in RLS | yes — proven by calling PostgREST directly with a low-privilege JWT |
| Public site reading CMS content | yes — homepage, pages, insights, projects, enquiry form, maintenance notice |
| Drafts visible publicly | no — tested in both directions (404 before publish, 200 after) |

Every status label below is one of: **END-TO-END**, **VERIFIED IN DATABASE**, **IN UI**, **VERIFIED IN CODE**, **ARCHITECTURALLY DEFINED**, **PLANNED**, **BLOCKED**.

---

## 2. The six phases, in order

### Phase 1 — Access control and portal foundation
Auth, session handling, middleware protection, the five-group shell, the permission model and RLS hardening.

* `src/middleware.ts` protects `/admin/:path*`; `requireAdmin()` on the portal layout; `requirePermission()`/`assertPermission()` on every page and action.
* 6 roles, 34 permissions, 124 grants, compiled from the live tables (not documented by hand).
* Migration 002 applied: RLS gaps closed, storage buckets and policies created, `record_audit`, `notify_permission`, `block_audit_mutation`, `handle_new_admin_user` installed.
* Evidence: `ADMIN-PERMISSION-MATRIX-2026-11-07.md`, `scripts/admin-permissions.mjs` (11/11).

### Phase 2 — Content model and CMS
Homepage sections, pages + structured blocks, capabilities, projects, Geo-ST4R, leadership, insights, media library.

* Blog-style editors use a block library (heading, rich text, image, gallery, two column, feature grid, timeline, stats, quote, CTA, video) with move/duplicate/delete; blocks are JSON, never raw HTML.
* Editorial workflow for capabilities, projects, insights and leadership: **Draft → In review → Approved → Published → Archived**, with publish separated from edit by permission.
* Migration 004 unified the status vocabulary across tables after the QA run exposed three different constraint sets.
* Evidence: `screenshots/admin/*`, E2E steps 9–11.

### Phase 3 — Business operations
Enquiry inbox with status/assignment/internal notes, CSV export, partnership pipeline.

* Enquiries: filter by status, set status, assign, internal notes (staff-only), soft delete, CSV export (audited).
* Partnerships: pipeline stages, per-row status changes, delete.
* Evidence: E2E steps 6–7 (status change persisted to `in_review`, note written and rendered).

### Phase 4 — Public integration
The published CMS state is what visitors see, and proving it was the point of the phase.

* `/` renders hero eyebrow, multi-line H1, subtitle, both CTAs and the closing CTA from `homepage_sections` (60-second revalidation, literal fallbacks if the CMS is unreachable).
* `/insights` and `/insights/[slug]` render published articles; `/our-work` renders published programmes.
* A catch-all renderer (`src/app/[...slug]/page.tsx`) renders any page published from the CMS that has no hand-built route — existing routes keep their bespoke design because static segments win.
* `/api/contact` reads form settings and platform switches from the database on every request.
* Maintenance notice is fetched by the client so a change made in the portal is visible on the next page load, despite static rendering.
* Evidence: E2E steps 8–10 (publishing visibly updates the public site; a draft is 404 until published).

### Phase 5 — Verification
Three suites, 35 checks, all failing loudly.

| Suite | Checks | Result |
| --- | --- | --- |
| `scripts/admin-e2e.mjs` | 16 | 16 / 16 |
| `scripts/admin-permissions.mjs` | 11 | 11 / 11 |
| `scripts/admin-config-e2e.mjs` | 8 | 8 / 8 |

The runs found and fixed six real defects, listed in §8 — that is the phase doing its job, not a footnote.

### Phase 6 — Database migration, hardening and handover
Direct Postgres connection verified, migration ledger installed, idempotency proven, documents written.

* Migrations 005 (ledger) and 006 (runtime settings) authored and applied; 002–004 re-run against the live database with identical row counts before and after.
* `scripts/db-migrate.sh` applies pending files in one transaction each, refuses to re-run the baseline, and reports checksum drift.
* Ledger surfaced in the portal: **System Health → Applied migrations**.
* Evidence: `MIGRATION-VERIFICATION-2026-11-07.md`.

---

## 3. Module-by-module status

### Overview

| Module | Route | Status | Evidence / note |
| --- | --- | --- | --- |
| Dashboard | `/admin` | **END-TO-END** | 8 live counts verified against the database; analytics panel labelled "not connected" rather than faked |
| Activity Centre | `/admin/activity` | **END-TO-END** | Reads the same append-only audit stream the audit module exposes; 210 entries present |
| Notifications | `/admin/notifications` | **IN UI** | In-app notifications created by `notify_permission` on each new enquiry; read/mark-read persists |

### Website Management

| Module | Route | Status | Evidence / note |
| --- | --- | --- | --- |
| Homepage Manager | `/admin/homepage` | **END-TO-END** | Saved values render on the public homepage; verified in the E2E run |
| Pages Manager | `/admin/pages` | **END-TO-END** | Draft → 404 publicly; publish → live at its URL + version snapshot written |
| Navigation Manager | `/admin/navigation` | **VERIFIED IN DATABASE** | 15 items stored, editable, audited. The public header/footer are still rendered from code — see §7 item 2 |
| Capabilities Manager | `/admin/capabilities` | **VERIFIED IN DATABASE** | Full editor + workflow; the four capability pages remain code-defined |
| Projects & Case Studies | `/admin/projects` | **END-TO-END** | `geo-st4r-kano` published; `/our-work` renders the published list and `/our-work/[slug]` is reachable |
| Geo-ST4R Manager | `/admin/geo-st4r` | **VERIFIED IN DATABASE** | Programme record bound to `geo-st4r-kano`, partners, related projects, data-protection card; map layer config is stored, the map itself stays the existing labelled demo |
| Leadership Manager | `/admin/leadership` | **VERIFIED IN DATABASE** | One real profile (Jamil Aliyu Galadanci, Executive Director); no fictional profiles were created. Public About page remains code-defined |
| Insights & Publications | `/admin/insights` | **END-TO-END** | Draft → review → approve → publish; article then renders at `/insights/[slug]` and appears on the index |
| Media Library | `/admin/media` | **END-TO-END** | Real upload to `website-media`, alt text required, preview renders, usage records kept. Site imagery is still served from `/public/images` |

### Business Operations

| Module | Route | Status | Evidence / note |
| --- | --- | --- | --- |
| Contact Enquiries | `/admin/enquiries` | **END-TO-END** | Status change persisted, internal note written and displayed, CSV export audited |
| Partnership Requests | `/admin/partnerships` | **IN UI** | Pipeline stages, status changes and delete are wired to the table; no submissions have been received yet |

### Website Configuration

| Module | Route | Status | Evidence / note |
| --- | --- | --- | --- |
| SEO Manager | `/admin/seo` | **VERIFIED IN DATABASE** | Per-path metadata stored and auditable; page metadata is still emitted from code — see §7 item 2 |
| Website Settings | `/admin/settings` | **VERIFIED IN DATABASE** | Brand, contact, general and footer settings stored; public rendering is code-defined |
| Forms | `/admin/forms` | **END-TO-END** | Disabling an enquiry type makes `/api/contact` reject it (400); re-enabling restores intake — no redeploy |
| Footer Manager | `/admin/footer` | **VERIFIED IN DATABASE** | Editable footer configuration; public footer is code-defined |
| Redirect Manager | `/admin/redirects` | **ARCHITECTURALLY DEFINED** | Table, editor and validation exist; redirects are not yet served by middleware — see §7 item 2 |

### System Administration

| Module | Route | Status | Evidence / note |
| --- | --- | --- | --- |
| User Management | `/admin/users` | **VERIFIED IN DATABASE** | Invite flow issues a one-time link (no password), role assignment and suspension persist, profiles provisioned by trigger |
| Roles & Permissions | `/admin/roles` | **END-TO-END** | Matrix editing persists to `role_permissions`; `super_admin` is immutable; every change audited |
| Audit Logs | `/admin/audit-logs` | **END-TO-END** | Append-only, protected by trigger; hidden from roles without `audit.view` (verified via direct API call) |
| System Settings | `/admin/system/settings` | **END-TO-END** | Maintenance notice appears on the public site and disappears when switched off; destructive purge requires typing `PURGE` |
| System Health | `/admin/system/health` | **END-TO-END** | Real checks against database, auth and storage recorded (21 rows); applied-migration ledger surfaced alongside |

---

## 4. Fixes made during verification

| # | Defect found by the QA suites | Fix |
| --- | --- | --- |
| 1 | Internal enquiry notes failed on a check constraint (`entity` written as `contact_enquiries`) | action + read use `enquiry` |
| 2 | "Submit for review" failed on insights and projects — three different status constraint sets | migration 004 unified the vocabulary |
| 3 | Health checks could never record a result (`operational` vs allowed `ok/degraded/down`) | action writes `ok`; UI maps it to "operational" |
| 4 | 15 live pages had `published_at = NULL` | migration 003 backfilled it |
| 5 | Marketing preloader curtain appeared on every admin page | preloader disabled under `/admin` |
| 6 | A rejected settings save silently reset the form | actions echo submitted values back on validation failure |

---

## 5. The three deferred modules (and why)

The brief allowed these only under a condition. The condition was not met, so nothing was invented to fill the slot.

| Module | Condition in the brief | Decision |
| --- | --- | --- |
| Testimonials / Partners | "only if approved content exists" | **Not built.** No approved testimonials or partner logos exist for this company. Building an empty manager would be a decorative module. |
| Newsletter | "only if implemented" | **Not built.** No newsletter system, list or provider exists, and building one would add a subscription surface with no delivery mechanism. |
| Contact Directory | "only if a genuine need exists" | **Not built.** Enquiries already carry the requester's details, and staff contacts are not a record the business maintains here. |

If the owner decides any of these is needed, each is a small increment on the existing pattern (table + RLS policy + editor + workflow), not a redesign.

---

## 6. How the verification was run

```
next build                     → Compiled successfully · TypeScript clean
eslint .                       → 0 errors, 0 warnings
node scripts/admin-e2e.mjs     → 16/16 checks passed
node scripts/admin-permissions.mjs → 11/11 permission checks passed
node scripts/admin-config-e2e.mjs  → 8/8 configuration checks passed
./scripts/db-migrate.sh --check    → ledger matches repository files
```

The E2E suite covers: unauthenticated redirect, invalid credentials, valid login, database-derived dashboard metrics, all 23 module routes (plus the dashboard), enquiry status persistence, internal note creation, homepage CMS read on the public site, draft privacy (404), publish → live + version snapshot, insight workflow → public article + index, media upload, health checks, audit log contents, mobile drawer without overflow, and sign-out protection.

Screenshots of every module are in `screenshots/admin/` (31 images, desktop 1440 px plus mobile 390 px).

---

## 7. What is genuinely not finished

Stated plainly rather than labelled "complete".

1. **A public renderer for navigation, footer and SEO metadata.** Those four modules (`Navigation`, `Footer`, `SEO`, `Redirects`) manage real data, are permission-guarded and are audited — but the public header, footer, `<meta>` tags and redirects are still produced from code. Wiring them means converting the header/footer into server components and adding a `generateMetadata` layer; that is a contained next increment, not a rework.
2. **Capabilities and leadership on the public site.** Both are editable and stored; `/capabilities/*` and `/about` still render from code, so an edit does not yet change the public page. Projects and insights, by contrast, are fully live.
3. **Media library vs. the existing imagery.** The library works (upload, alt text, replacement, usage), but the 27 self-hosted site images live in `/public/images` and were not bulk-registered, because their descriptive alt text must be written by a human who has seen them, not generated.
4. **No email delivery.** Enquiry replies use `mailto:`; invites return a copyable link. Everything else (in-app notifications, audit) works.
5. **No analytics provider.** The dashboard says so instead of showing invented traffic.
6. **Rate limiting is per-instance.** Fine at current volumes; move to Redis before real traffic.
7. **Six owner decisions still outstanding** (below).

---

## 8. Owner actions before (or shortly after) go-live

| # | Action | Why it matters |
| --- | --- | --- |
| 1 | **Rotate the database password** shared during migration verification | A credential was transmitted in chat |
| 2 | **Rotate the GitHub PAT** used to push this delivery | A credential was transmitted in chat |
| 3 | **Delete the QA account** `qa.verifier@mss-digital.test` once acceptance is done | It is a super administrator created for verification |
| 4 | Create your own Super Administrator account and invite real staff | No shared accounts should exist in production |
| 5 | Supply the verified public email/phone and office address | The contact page and settings still show placeholders |
| 6 | Approve (or reject) the Vision statement, the first insight article, and legal-page review | None of these may be published without your sign-off |
| 7 | Decide on SMTP and an analytics provider | Both unblock visible value immediately |

---

## 9. Where everything lives

| Document | Purpose |
| --- | --- |
| `ADMIN-HANDOVER-REPORT-2026-11-07.md` | this report |
| `ADMIN-PERMISSION-MATRIX-2026-11-07.md` | roles × permissions, RLS inventory, enforcement layers |
| `ADMIN-SECURITY-REPORT-2026-11-07.md` | authentication, authorisation, secrets, findings and residual risks |
| `ADMIN-ONBOARDING-PROCEDURE.md` | how a person starts using the portal, day one to month one |
| `MIGRATION-VERIFICATION-2026-11-07.md` | what was run against the database and what it proved |
| `supabase/migrations/` | 001–006, with the ledger recording what has been applied |
| `scripts/` | `db-migrate.sh`, three verification suites, screenshot capture, QA cleanup |
| `screenshots/admin/` | 31 captured screens |

---

## 10. Acceptance checklist

- [x] Admin portal at `/admin` with login at `/admin/login`, in the Burgundy/Storm system
- [x] 24 modules across the five specified sidebar groups; the 3 conditional modules documented as not built
- [x] No dead buttons, no dummy tables, no static dashboard statistics
- [x] Permissions enforced server-side and in RLS, verified by direct API calls
- [x] Invite-only accounts, no public registration route
- [x] Drafts never public, verified in both directions
- [x] Version history preserved at publication
- [x] Audit trail append-only and free of secrets
- [x] Public site consumes published CMS content; publishing visibly updates the live page
- [x] TypeScript, ESLint, production build all clean
- [x] 35 automated checks passing, screenshots captured
- [x] Migration ledger installed and idempotency proven against the live database
