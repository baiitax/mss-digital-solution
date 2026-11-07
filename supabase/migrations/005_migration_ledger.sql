-- 005 — Migration ledger
--
-- Until now the applied state of this database was known only from the report
-- documents. This table records, in the database itself, which migration files
-- have been applied, when, and the SHA-256 of the file that was applied, so a
-- future operator can detect drift between the repository and the live schema.
--
-- Read access is limited to staff holding system.view. There is no write path
-- for `anon` or ordinary `authenticated` sessions: migrations are applied with
-- the database owner (postgres) only.

create table if not exists public.schema_migrations (
  version       text primary key,
  file_name     text not null,
  checksum      text not null,
  applied_at    timestamptz not null default now(),
  applied_by    text not null default current_user,
  note          text
);

comment on table public.schema_migrations is
  'Applied database migrations. Written by the deploying operator (postgres role) only.';

alter table public.schema_migrations enable row level security;
alter table public.schema_migrations force row level security;

drop policy if exists schema_migrations_read on public.schema_migrations;
create policy schema_migrations_read on public.schema_migrations
  for select to authenticated
  using (public.has_permission('system.view'));

-- 001 was used to create the original live schema against a fresh project and
-- must never be re-run on this database (it contains the baseline table set).
-- It is recorded here as the baseline so the ledger is complete.
insert into public.schema_migrations (version, file_name, checksum, note) values
  ('001', '001_initial.sql',
   '2131a72520c7fae45fed3acf0df9984d90d8f5dffbefb210477e72624ed9db57',
   'Baseline schema. Recorded, not re-applied — running it again is destructive.'),
  ('002', '002_admin_portal_hardening.sql',
   'dc8e2f5f3c10f9bf48e1e92c3b702005ed7f1e577ea0bcd40bce59d3db59f1a4',
   'Portal hardening: RLS gaps, storage buckets, audit + notification RPCs, triggers.'),
  ('003', '003_backfill_and_indexes.sql',
   'bb7109306ca108eebee97439c6c5b08dcf6cf0922228c7ecd9053d6d10c4f3ac',
   'Backfilled published_at on published pages; public slug index.'),
  ('004', '004_status_vocabulary.sql',
   '395e6d7df402a0fac02e64be3a5076206627978c04a89b022da2ef035b8da7d2',
   'Unified editorial status vocabulary across content tables.')
on conflict (version) do nothing;
