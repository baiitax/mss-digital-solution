# Database connection and migration verification

**Project:** MSS Digital Solutions — `poegugwteonpxnvdwzwx`
**Date:** 7 November 2026
**Connection used:** direct Postgres (session pooler, `aws-0-us-east-1.pooler.supabase.com:5432`), role `postgres`, SSL required
**Host:** PostgreSQL 17.11

> The connection password supplied by the owner is **not** recorded in this repository, in any script, or in this document. It was used in-process only (`PGPASSWORD` for the session). Connection strings for future runs are expected through the `DATABASE_URL` environment variable.

---

## 1. What was done

| Step | Result |
| --- | --- |
| Connected to the live database as `postgres` | ✅ `postgres | postgres | PostgreSQL 17.11` |
| Inventoried every table, RLS flag and policy count | ✅ 25 tables, RLS on all 25, 50 policies |
| Verified the constraints and indexes written by migrations 003 and 004 | ✅ all present and correct |
| Applied migration **005 — migration ledger** | ✅ `public.schema_migrations` created, 4 rows recorded |
| Re-ran migrations 002, 003 and 004 against the live database to prove they are idempotent | ✅ exit 0, row counts identical before/after |
| Applied migration **006 — runtime settings** | ✅ `forms.contact` (private) and `site_status` (public) seeded |
| Added `scripts/db-migrate.sh` (applies, records checksums, detects drift) | ✅ `--check` and apply both verified |
| Verified the ledger is not readable by `anon` or by staff without `system.view` | ✅ 0 rows in both cases |
| Verified the application still serves after migration | ✅ login, dashboard, enquiries, pages, health, roles, audit, public home — all 200 |
| Surfaced the ledger inside the portal | ✅ System Health → “Applied migrations” |

## 2. Live schema state

| Object | Value |
| --- | --- |
| Tables with RLS enabled | 25 / 25 |
| Policies | 50 |
| Roles / permissions / role-permission grants | 6 / 34 / 124 |
| Functions | 9 (`is_staff`, `has_permission`, `current_permissions`, `record_audit`, `notify_permission`, `block_audit_mutation`, `set_updated_at`, `touch_updated_at`, `handle_new_admin_user`) |
| Storage buckets | `website-media` (public, 10 MB), `admin-documents` (private, 25 MB) |
| Auth trigger | `on_auth_user_created` present |

### Applied migrations (as recorded in the database)

| Version | File | Applied by |
| --- | --- | --- |
| 001 | `001_initial.sql` | baseline — recorded, never re-applied |
| 002 | `002_admin_portal_hardening.sql` | postgres |
| 003 | `003_backfill_and_indexes.sql` | postgres |
| 004 | `004_status_vocabulary.sql` | postgres |
| 005 | `005_migration_ledger.sql` | postgres |
| 006 | `006_runtime_settings.sql` | postgres |

Each row stores the SHA-256 of the file that was applied, so `scripts/db-migrate.sh --check` reports drift if a file is edited after the fact.

## 3. Content state after migration

| Table | Rows | Note |
| --- | --- | --- |
| `pages` | 15 | the 15 live routes, all `published` with `published_at` backfilled |
| `navigation_items` | 15 | header/footer navigation |
| `homepage_sections` | 7 | hero and closing CTA are populated and rendered by `/` |
| `site_settings` | 7 | includes `forms.contact` (private) and `site_status` (public) |
| `projects` | 1 | `geo-st4r-kano` |
| `leadership_profiles` | 1 | Jamil Aliyu Galadanci, Executive Director |
| `insights` | 0 | no article has been approved for publication |
| `media_assets` | 0 | the site's own imagery is served from `/public/images`, not the library |
| `contact_enquiries` | 0 | QA submissions removed before handover |
| `partnership_requests` | 0 | nothing received yet |
| `audit_logs` | 210 | append-only; QA actions retained by design |
| `system_health_checks` | 21 | real recorded checks |
| `schema_migrations` | 6 | the ledger |

## 4. Idempotency proof

```
--- BEFORE ---
15|15|7|5|6|34|124|170|2|50|2      (pages|nav|home|settings|roles|perms|role_perms|audits|profiles|policies|buckets)

--- RE-APPLY 002 / 003 / 004 ---   exit 0, no errors

--- AFTER ---
15|15|7|5|6|34|124|170|2|50|2      identical
```

## 5. RLS spot-check on the new ledger table

```
begin; set local role anon;          select count(*) from schema_migrations;  -->  0
begin; set local role authenticated; select count(*) from schema_migrations;  -->  0
```

The table also has `force row level security`, so the table owner policy applies to non-owner roles and there is no write path for `anon` or `authenticated`.

## 6. How an operator applies migrations from now on

```bash
export DATABASE_URL='postgresql://postgres.<ref>:<password>@<host>:5432/postgres'
./scripts/db-migrate.sh --check   # report pending files and checksum drift
./scripts/db-migrate.sh           # apply pending files, one transaction each
```

Rules enforced by the script:

* `001_initial.sql` is refused — it is the baseline and is destructive on a live project.
* Each file is applied with its ledger row in a single transaction, so a half-applied migration is never recorded as done.
* A checksum mismatch is reported as drift and the script exits non-zero.

## 7. Notes for the owner

1. The database password was shared in this conversation. Rotate it in Supabase → Project Settings → Database once handover is complete, because a rotated credential invalidates the copy that exists in this chat.
2. `001_initial.sql` must never be run against this project. The script blocks it, but it is worth knowing if anyone runs SQL by hand.
3. The ledger is visible in the portal at **System Administration → System Health → Applied migrations** to staff holding `system.view`.
