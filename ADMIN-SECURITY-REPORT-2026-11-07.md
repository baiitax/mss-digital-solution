# Administration portal — security report

**Project:** MSS Digital Solutions Ltd — Next.js 16 + Supabase (`poegugwteonpxnvdwzwx`)
**Scope:** the `/admin` portal, the public CMS integration, and the storage/audit foundation
**Date:** 7 November 2026
**No credential, key, password or token appears in this document.**

---

## 1. Summary

| Area | State |
| --- | --- |
| Authentication | Supabase Auth, invite-only, no public registration route |
| Authorisation | Four layers: middleware → layout → page/action guards → RLS |
| Database | RLS enabled and, for the migration ledger, forced on all 25 tables |
| Secrets | Service-role key server-only; no secret in the client bundle, logs or reports |
| Audit trail | Append-only, enforced by trigger, no update/delete policy for any role |
| Draft leakage | Drafts and future-scheduled pages are excluded at the query and policy level |
| Automated verification | 35 checks (16 E2E + 11 permission/RLS + 8 configuration), 0 failures |
| Known gaps | 6, listed in §8 — all deliberate and documented rather than hidden |

## 2. Authentication

* **No public registration.** There is no `/register`, no sign-up server action and no self-service account creation path anywhere in the application. The only way an account exists is an administrator inviting it (`/admin/users`).
* **Invite flow.** Invites return a copyable one-time link to the administrator. No temporary password is generated, emailed or displayed, so an invited person sets their own credential.
* **Password handling.** Passwords are never logged, never written to the audit trail and never stored by the application. They are handled entirely by Supabase Auth.
* **Session handling.** Cookie-based sessions via `@supabase/ssr`, refreshed in middleware. `/admin/:path*` is matched by `src/middleware.ts`; an unauthenticated request is redirected to `/admin/login?redirectTo=…`. After login the user lands on the originally requested URL, not simply `/admin`.
* **Failed-login behaviour.** Invalid credentials are rejected by Supabase with a generic message; no user enumeration (the response does not distinguish "unknown email" from "wrong password"). Verified by the E2E suite.
* **Sign-out** clears the session; the E2E suite confirms a protected URL redirects to login afterwards.

## 3. Authorisation

Four independent layers, documented in detail in `ADMIN-PERMISSION-MATRIX-2026-11-07.md`:

1. **Middleware** — session presence for `/admin/:path*`.
2. **Portal layout** — `requireAdmin()`; without a session nothing renders.
3. **Page and server action** — `requirePermission()` per route, `assertPermission()` as the first statement of every mutating action.
4. **RLS** — 50 policies across 25 tables and 2 storage buckets.

Two properties matter most and were tested by calling the database directly with a real low-privilege user's JWT (bypassing the UI completely):

* audit logs invisible to that role (0 rows vs 5 for a super administrator),
* a `PATCH` on `pages` refused with `403 / …violates row-level security policy`, and the live row unchanged.

Navigation is filtered server-side, so an unauthorised module is never shipped to the browser. Direct URL access to `/admin/users`, `/admin/audit-logs` and `/admin/roles` lands on `/admin/forbidden` for that role — verified.

## 4. Secrets and configuration

| Control | State |
| --- | --- |
| Service-role key | Server-only (`SUPABASE_SERVICE_ROLE_KEY`, no `NEXT_PUBLIC_` prefix). Used by exactly one public-facing route (`/api/contact`) and by the health check. |
| Anon key | Public by design; RLS restricts it to published/visible rows only. |
| `.env.local` | Mode 600, listed in `.gitignore`, never committed. |
| `.qa-credentials` | Mode 600, gitignored; holds only the QA account's email/password. |
| Reports and logs | Contain no keys, passwords or tokens. The health page prints configuration *presence*, never values. |
| Client bundle | No server-only module is imported from a client component; `src/lib/cms/content.ts` and `src/lib/site-config.ts` are marked `server-only`, which makes an accidental client import a build error. |

## 5. Data protection in transit through the app

* **Drafts never public.** `getPublishedPageBySlug`, `getPublishedInsights`, `getPublicProjects` all filter `status = 'published'`, `deleted_at is null` and `published_at <= now()`. RLS enforces the same from the database side. The E2E suite publishes a draft page from the portal and confirms the public URL was **404 before publishing and 200 after** — the negative case is tested, not assumed.
* **Scheduled publication** is stored in `scheduled_for` and does not become visible early.
* **Preview** is not exposed as a public URL; the editor is the preview surface, and it requires `pages.view`.
* **Version history** is preserved in `page_versions`, written at publication time, and readable only to staff with page permissions.
* **Sanitisation.** CMS blocks are structured JSON, rendered without `dangerouslySetInnerHTML`; unknown block types render nothing rather than guess. Enquiry input has HTML characters stripped and lengths validated before storage.

## 6. Public form surface (`/api/contact`)

| Control | Implementation |
| --- | --- |
| Rate limiting | Server-side, per address, configurable 1–20/min in `/admin/forms` (default 5) |
| Validation | Required fields, email format, message length 10–5000, allowlisted area of interest, allowlisted enquiry type |
| Kill switch | An administrator can close intake in `/admin/forms`; the API then returns `503` — verified by toggling the setting and re-posting |
| Enquiry type enforcement | Disabling "general" in the portal makes the API reject `enquiry_type: general` with `400` — verified |
| Notification fan-out | `notify_permission('enquiries.manage', …)` — in-app only, deduplicated |
| Persistence | Service-role insert after validation; the browser never holds a write-capable key |

## 7. Audit trail

* `audit_logs` has **select and insert policies only**. No role — including `super_admin` and the service role — has an update or delete policy.
* `block_audit_mutation()` raises an exception on UPDATE and DELETE, so history cannot be rewritten even via SQL executed as the API role.
* Server actions record acting account, module, entity, summary, outcome and non-sensitive metadata.
* Destructive operations are recorded explicitly: `enquiries.purged` writes the number of records removed, the cutoff timestamp and the retention window.
* 210 entries exist at handover, including the QA session that produced this report. They are intentionally retained.

## 8. Findings, fixes and residual risks

### Fixed during this phase

| # | Finding | Impact | Fix |
| --- | --- | --- | --- |
| 1 | Internal notes on enquiries failed with a check-constraint violation (`entity` was written as `contact_enquiries`, allowed values are singular) | Internal notes could not be saved — silent 500 | Action and read query both use `enquiry` |
| 2 | `insights` and `projects` accepted a different status vocabulary from `pages` (`review` vs `in_review`, no `approved`/`archived`) | "Submit for review" failed on two modules but worked on others | Migration 004 unifies all content tables on draft → in_review → approved → published → archived |
| 3 | Health checks wrote `operational` into a column constrained to `ok/degraded/down` | The health module could never record a result | Action writes `ok`; the UI maps it to "operational" |
| 4 | The 15 live pages were `published` with a NULL `published_at` | Publication date showed as "—", and a strict public read (`published_at <= now`) would have hidden live pages | Migration 003 backfills `published_at` |
| 5 | The marketing preloader curtain rendered over every admin page load | Operators waited for a marketing animation on each visit | `Preloader` returns null under `/admin` |
| 6 | A rejected settings save reset the form to the stored values, silently discarding the edit | Operators could believe a change was applied | Actions echo submitted values back into the form on validation failure |

### Residual risks (accepted, documented)

| # | Risk | Why it is accepted | Mitigation available |
| --- | --- | --- | --- |
| 1 | Rate limiting is in-process memory, so it is per-instance on serverless | Traffic volumes do not justify a Redis dependency today | Add Upstash/Redis when traffic warrants it |
| 2 | No CAPTCHA on the public form | Adding a provider requires an owner decision and a third-party dependency | The Forms module states plainly that CAPTCHA is not connected |
| 3 | No email provider — enquiry replies are `mailto:` only, invites return a copyable link | SMTP credentials were not supplied | Connect a provider; the invite flow already works without one |
| 4 | Analytics dashboard panel is empty by design | No analytics provider is connected; showing invented traffic would break the no-fake-metrics rule | Panel is labelled "not connected" |
| 5 | The QA super-administrator account (`qa.verifier@…`) still exists | It is the account used to produce this verification evidence | Delete it in `/admin/users` once acceptance is complete |
| 6 | The database password was shared in chat during migration verification | Required to apply migrations | Rotate it in Supabase → Project Settings → Database after handover |

## 9. What an auditor can re-run

```bash
node scripts/admin-e2e.mjs          # 16 checks — auth, content, media, public integration, mobile, sign-out
node scripts/admin-permissions.mjs  # 11 checks — RLS + server-side guards with a least-privilege account
node scripts/admin-config-e2e.mjs   #  8 checks — form + maintenance settings enforced live
./scripts/db-migrate.sh --check     # migration ledger vs repository files
```

All three suites exit non-zero on any failure, so they can be wired into CI unchanged.
