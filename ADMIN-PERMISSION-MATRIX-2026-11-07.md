# Administrative permission matrix & database access map

**Project:** MSS Digital Solutions — administration portal
**Database:** Supabase `poegugwteonpxnvdwzwx` (PostgreSQL 17.11)
**Date:** 7 November 2026
**Generated from:** the live `roles`, `permissions` and `role_permissions` tables (not from documentation)

---

## 1. Roles

| Role key | Display name | Rank | Permissions held |
| --- | --- | --- | :--- |
| `super_admin` | Super Administrator | 10 | 34 / 34 |
| `administrator` | Administrator | 20 | 33 / 34 |
| `content_manager` | Content Manager | 30 | 25 / 34 |
| `editor` | Editor | 40 | 12 / 34 |
| `communications_manager` | Communications Manager | 50 | 9 / 34 |
| `analyst` | Analyst / Viewer | 90 | 11 / 34 |

`super_admin` is the only role holding `roles.manage`. `administrator` holds everything else. Lower rank number = more authority; the ranking orders the users list and prevents an administrator from editing a super administrator.

## 2. Permission matrix

| Permission | Module | super_admin | administrator | content_manager | editor | communications_manager | analyst |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `dashboard.view` | Overview | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `notifications.view` | Overview | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `pages.view` | Website | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| `pages.edit` | Website | ✓ | ✓ | ✓ | ✓ | — | — |
| `pages.create` | Website | ✓ | ✓ | ✓ | ✓ | — | — |
| `pages.publish` | Website | ✓ | ✓ | ✓ | — | — | — |
| `pages.delete` | Website | ✓ | ✓ | ✓ | — | — | — |
| `homepage.manage` | Website | ✓ | ✓ | ✓ | — | — | — |
| `navigation.manage` | Configuration | ✓ | ✓ | ✓ | — | — | — |
| `capabilities.view` | Website | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| `capabilities.manage` | Website | ✓ | ✓ | ✓ | — | — | — |
| `projects.view` | Website | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| `projects.manage` | Website | ✓ | ✓ | ✓ | — | — | — |
| `geost4r.manage` | Website | ✓ | ✓ | ✓ | — | — | — |
| `leadership.view` | Website | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| `leadership.manage` | Website | ✓ | ✓ | ✓ | — | — | — |
| `insights.view` | Website | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `insights.manage` | Website | ✓ | ✓ | ✓ | ✓ | — | — |
| `insights.publish` | Website | ✓ | ✓ | ✓ | — | — | — |
| `media.view` | Media | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `media.upload` | Media | ✓ | ✓ | ✓ | ✓ | — | — |
| `media.manage` | Media | ✓ | ✓ | ✓ | — | — | — |
| `media.delete` | Media | ✓ | ✓ | ✓ | — | — | — |
| `enquiries.view` | Operations | ✓ | ✓ | — | — | ✓ | ✓ |
| `enquiries.manage` | Operations | ✓ | ✓ | — | — | ✓ | — |
| `partnerships.view` | Operations | ✓ | ✓ | — | — | ✓ | ✓ |
| `partnerships.manage` | Operations | ✓ | ✓ | — | — | ✓ | — |
| `seo.manage` | Configuration | ✓ | ✓ | ✓ | — | — | — |
| `settings.view` | Configuration | ✓ | ✓ | ✓ | — | ✓ | ✓ |
| `settings.manage` | Configuration | ✓ | ✓ | — | — | — | — |
| `users.manage` | System | ✓ | ✓ | — | — | — | — |
| `roles.manage` | System | ✓ | — | — | — | — | — |
| `audit.view` | System | ✓ | ✓ | — | — | — | — |
| `system.view` | System | ✓ | ✓ | — | — | — | — |

Two separations are deliberate and tested:

* **An editor can write but cannot publish.** `editor` holds `pages.edit`/`pages.create` and `insights.manage`, but not `pages.publish`, `insights.publish` or `pages.delete`. Publish buttons are not rendered for that role, and the server action refuses the call regardless of the UI.
* **A communications manager works the inbox but cannot touch the website.** No page, media or settings permission at all.

## 3. Where access is enforced

Access is enforced in four independent layers. Passing the UI is not sufficient to reach data.

| Layer | Mechanism | File |
| --- | --- | --- |
| 1. Edge | Session cookie refreshed; `/admin/:path*` without a session redirects to `/admin/login` | `src/middleware.ts`, `src/lib/supabase/middleware.ts` |
| 2. Layout | `requireAdmin()` on the portal layout — no session, no render | `src/app/admin/(portal)/layout.tsx` |
| 3. Module + action | `requirePermission()` per page, `assertPermission()` at the top of every server action | `src/lib/auth/guards.ts`, `src/app/admin/actions/*` |
| 4. Database | RLS on all 25 tables and both storage buckets, keyed on `has_permission()` / `is_staff()` | `supabase/migrations/002_admin_portal_hardening.sql` |

Sidebar items are filtered **on the server** by permission (`filterNav(ADMIN_NAV, session.permissions)`), so an inaccessible module is never sent to the browser — hidden UI is a consequence of access, never the control.

## 4. Row-level security inventory

25 tables, RLS enabled on all, 50 policies. Every content table follows the same two-policy shape: a public `select` for rows a visitor may see (published, visible, not deleted) and a staff `all` policy keyed on the relevant permission.

| Table | RLS | Policies | Commands |
| --- | :---: | :---: | --- |
| `audit_logs` | ✓ | 2 | select / insert (no update, no delete — see §6) |
| `capabilities` | ✓ | 2 | all / select |
| `contact_enquiries` | ✓ | 2 | all / insert |
| `homepage_sections` | ✓ | 2 | all / select |
| `insights` | ✓ | 2 | all / select |
| `leadership_profiles` | ✓ | 2 | all / select |
| `media_assets` | ✓ | 2 | all / select |
| `media_usage` | ✓ | 2 | all / select |
| `navigation_items` | ✓ | 2 | all / select |
| `notifications` | ✓ | 1 | all (own rows only) |
| `page_versions` | ✓ | 2 | select / insert |
| `pages` | ✓ | 2 | all / select |
| `partnership_requests` | ✓ | 2 | all / insert |
| `permissions` | ✓ | 2 | all / select |
| `profiles` | ✓ | 3 | all / select / self-update |
| `project_partners` | ✓ | 2 | all / select |
| `projects` | ✓ | 2 | all / select |
| `record_notes` | ✓ | 2 | select / insert |
| `redirects` | ✓ | 1 | all |
| `role_permissions` | ✓ | 2 | all / select |
| `roles` | ✓ | 2 | all / select |
| `schema_migrations` | ✓ (forced) | 1 | select (staff with `system.view`) |
| `seo_metadata` | ✓ | 2 | all / select |
| `site_settings` | ✓ | 2 | all / select (`is_public` only) |
| `system_health_checks` | ✓ | 2 | select / insert |
| `user_roles` | ✓ | 2 | all / select |

Storage policies: `website-media` — public read, insert requires `media.upload`, update requires `media.manage`, delete requires `media.delete`; `admin-documents` — read and write require staff permission, bucket is private.

## 5. Verification evidence (automated)

`scripts/admin-permissions.mjs` — **11/11 checks pass** against a real least-privilege account (`analyst`), calling PostgREST directly with that user's JWT so the Next.js UI is bypassed entirely:

| Check | Observed |
| --- | --- |
| Audit logs hidden from a role without `audit.view` | analyst `0` rows, super admin `5` rows |
| Read allowed where the role holds the view permission | analyst sees 3 pages |
| Write refused for a role without the permission | `PATCH /pages` → `403`, message `new row violates row-level security policy`, live title unchanged |
| `role_permissions` mutation refused | `400` |
| Directory exposes only the caller's own profile | analyst 1 row (self), super admin 2 |
| Least-privilege account can log in and reach the dashboard | ✓ |
| Privileged modules absent from the sidebar (not merely disabled) | ✓ 21 entries, no Users/Roles/Audit |
| Direct URL to `/admin/users`, `/admin/audit-logs`, `/admin/roles` | all land on `/admin/forbidden` |
| A permitted module still works for the role | `/admin/media` renders normally |

The `admin-e2e.mjs` suite additionally confirms that all 23 admin modules render for a super administrator (0 failures) and that a signed-out browser is redirected to login from a protected route.

## 6. Tamper-resistance of the audit trail

* `audit_logs` has select and insert policies only — no update or delete policy exists for any role, including `super_admin`.
* A trigger, `block_audit_mutation()`, raises on UPDATE and DELETE, so even the service role cannot rewrite history through the API.
* Every server action records through `record_audit(...)` with the acting account, module, entity, summary and outcome.
* No secret, token, password or service key is written to the log; actions record *that* a change happened and its non-sensitive parameters.

## 7. Changing permissions

Only `super_admin` may edit role permissions (`/admin/roles`). `saveRolePermissions` refuses to modify `super_admin` itself ("Super Administrator permissions are fixed"), so the portal cannot be locked out of itself by accident. Every change is audited as `role.permissions_updated` with the resulting permission count.

## 8. Sign-in policy

* No public registration route exists anywhere in the application. Accounts are created only by an administrator through `/admin/users` (invite flow), which issues a one-time link — no default password is emailed or printed.
* Sessions are cookie-based via `@supabase/ssr`; the middleware refreshes them and protects `/admin/:path*`.
* Sign-out clears the session and returns to `/admin/login`; the E2E suite confirms that after sign-out a protected URL redirects to login again.
