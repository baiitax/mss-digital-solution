#!/usr/bin/env bash
#
# Apply the repository migrations to the live Supabase database.
#
# The connection string is read from the DATABASE_URL environment variable and is
# never stored in this repository. Use the direct/pooled Postgres connection from
# the Supabase dashboard (Project Settings → Database) as the `postgres` user.
#
#   export DATABASE_URL='postgresql://postgres.<ref>:<password>@<host>:5432/postgres'
#   ./scripts/db-migrate.sh            # apply all pending migrations, in order
#   ./scripts/db-migrate.sh --check    # verify the ledger against the files only
#
# Rules enforced here:
#   * 001_initial.sql is NEVER run against an existing project (baseline only).
#   * Every file is applied inside a single transaction; a failure rolls back.
#   * Each applied file's SHA-256 is recorded in public.schema_migrations.
set -euo pipefail

MIGRATIONS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/supabase/migrations"
CHECK_ONLY=false
[[ "${1:-}" == "--check" ]] && CHECK_ONLY=true

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL is not set. Export the Postgres connection string first." >&2
  exit 1
fi

if ! command -v psql >/dev/null 2>&1; then
  echo "psql not found. Install the Postgres client (postgresql-client)." >&2
  exit 1
fi

psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atc \
  "create table if not exists public.schema_migrations (
     version text primary key, file_name text not null, checksum text not null,
     applied_at timestamptz not null default now(),
     applied_by text not null default current_user, note text);" >/dev/null

mismatch=0
for file in "$MIGRATIONS_DIR"/*.sql; do
  name="$(basename "$file")"
  version="${name%%_*}"
  checksum="$(sha256sum "$file" | awk '{print $1}')"
  recorded="$(psql "$DATABASE_URL" -Atc \
    "select checksum from public.schema_migrations where version = '$version';")"

  if [[ -n "$recorded" && "$recorded" != "$checksum" ]]; then
    echo "DRIFT: $name is recorded as $recorded but the file hashes to $checksum" >&2
    mismatch=1
    continue
  fi

  if [[ -n "$recorded" ]]; then
    echo "already applied: $name"
    continue
  fi

  if [[ "$version" == "001" ]]; then
    echo "refusing to run $name — baseline migration, never re-applied" >&2
    continue
  fi

  if $CHECK_ONLY; then
    echo "pending: $name"
    continue
  fi

  echo "applying: $name"
  # File + ledger row are applied in one transaction so a half-applied migration
  # can never be recorded as done.
  combined="$(mktemp)"
  {
    cat "$file"
    printf '\ninsert into public.schema_migrations (version, file_name, checksum)\n'
    printf "values ('%s', '%s', '%s')\n" "$version" "$name" "$checksum"
    printf 'on conflict (version) do update set checksum = excluded.checksum;\n'
  } > "$combined"
  psql "$DATABASE_URL" -v ON_ERROR_STOP=1 --single-transaction -f "$combined"
  rm -f "$combined"
done

exit "$mismatch"
