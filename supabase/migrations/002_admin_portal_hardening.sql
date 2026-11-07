-- MSS Digital Solutions — Administration Portal hardening
-- Migration 002 — closes RLS gaps, adds storage, audit + notification RPCs.
-- Applied against project poegugwteonpxnvdwzwx.

-- ─────────────────────────────────────────────────────────────
-- 1. PROFILES — self update + administrative management
-- ─────────────────────────────────────────────────────────────
drop policy if exists "profiles_self_update" on public.profiles;
create policy "profiles_self_update" on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid() and status = (select p.status from public.profiles p where p.id = auth.uid()));

drop policy if exists "profiles_admin_all" on public.profiles;
create policy "profiles_admin_all" on public.profiles
  for all to authenticated
  using (public.has_permission('users.manage'))
  with check (public.has_permission('users.manage'));

-- Profile is provisioned automatically when an auth user is created.
create or replace function public.handle_new_admin_user()
returns trigger
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $fn$
begin
  insert into public.profiles (id, email, full_name, status)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(coalesce(new.email,''), '@', 1)),
    'invited'
  )
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$fn$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_admin_user();

-- ─────────────────────────────────────────────────────────────
-- 2. ROLES / PERMISSIONS — write access for roles.manage
-- ─────────────────────────────────────────────────────────────
drop policy if exists "roles_write" on public.roles;
create policy "roles_write" on public.roles
  for all to authenticated
  using (public.has_permission('roles.manage'))
  with check (public.has_permission('roles.manage'));

drop policy if exists "role_permissions_write" on public.role_permissions;
create policy "role_permissions_write" on public.role_permissions
  for all to authenticated
  using (public.has_permission('roles.manage'))
  with check (public.has_permission('roles.manage'));

drop policy if exists "permissions_write" on public.permissions;
create policy "permissions_write" on public.permissions
  for all to authenticated
  using (public.has_permission('roles.manage'))
  with check (public.has_permission('roles.manage'));

drop policy if exists "user_roles_write" on public.user_roles;
create policy "user_roles_write" on public.user_roles
  for all to authenticated
  using (public.has_permission('users.manage'))
  with check (public.has_permission('users.manage'));

-- ─────────────────────────────────────────────────────────────
-- 3. WEBSITE CONTENT — staff write policies for tables that only had public reads
-- ─────────────────────────────────────────────────────────────
drop policy if exists "homepage_staff_all" on public.homepage_sections;
create policy "homepage_staff_all" on public.homepage_sections
  for all to authenticated
  using (public.has_permission('homepage.manage'))
  with check (public.has_permission('homepage.manage'));

drop policy if exists "navigation_staff_all" on public.navigation_items;
create policy "navigation_staff_all" on public.navigation_items
  for all to authenticated
  using (public.has_permission('navigation.manage'))
  with check (public.has_permission('navigation.manage'));

drop policy if exists "seo_staff_all" on public.seo_metadata;
create policy "seo_staff_all" on public.seo_metadata
  for all to authenticated
  using (public.has_permission('seo.manage'))
  with check (public.has_permission('seo.manage'));

-- Page version history: readable by anyone who can view pages, writable on edit/publish.
drop policy if exists "page_versions_read" on public.page_versions;
create policy "page_versions_read" on public.page_versions
  for select to authenticated
  using (public.has_permission('pages.view'));

drop policy if exists "page_versions_write" on public.page_versions;
create policy "page_versions_write" on public.page_versions
  for insert to authenticated
  with check (public.has_permission('pages.edit') or public.has_permission('pages.publish'));

-- Internal notes attached to enquiries, partnerships, projects.
drop policy if exists "record_notes_read" on public.record_notes;
create policy "record_notes_read" on public.record_notes
  for select to authenticated
  using (public.is_staff());

drop policy if exists "record_notes_write" on public.record_notes;
create policy "record_notes_write" on public.record_notes
  for insert to authenticated
  with check (public.is_staff() and author_id = auth.uid());

-- Redirect manager.
drop policy if exists "redirects_staff_all" on public.redirects;
create policy "redirects_staff_all" on public.redirects
  for all to authenticated
  using (public.has_permission('navigation.manage'))
  with check (public.has_permission('navigation.manage'));

-- System health records.
drop policy if exists "health_staff_read" on public.system_health_checks;
create policy "health_staff_read" on public.system_health_checks
  for select to authenticated
  using (public.has_permission('system.view'));

drop policy if exists "health_staff_write" on public.system_health_checks;
create policy "health_staff_write" on public.system_health_checks
  for insert to authenticated
  with check (public.has_permission('system.view'));

-- ─────────────────────────────────────────────────────────────
-- 4. PROJECT PARTNERS — RLS was disabled entirely
-- ─────────────────────────────────────────────────────────────
alter table public.project_partners enable row level security;

drop policy if exists "project_partners_public_read" on public.project_partners;
create policy "project_partners_public_read" on public.project_partners
  for select to anon, authenticated
  using (exists (
    select 1 from public.projects p
    where p.id = project_partners.project_id and p.status = 'published'
  ));

drop policy if exists "project_partners_staff_all" on public.project_partners;
create policy "project_partners_staff_all" on public.project_partners
  for all to authenticated
  using (public.has_permission('projects.view'))
  with check (public.has_permission('projects.manage'));

-- ─────────────────────────────────────────────────────────────
-- 5. MEDIA — public reads limited to the public bucket; usage register
-- ─────────────────────────────────────────────────────────────
drop policy if exists "media_public_read" on public.media_assets;
create policy "media_public_read" on public.media_assets
  for select to anon, authenticated
  using (bucket = 'website-media');

create table if not exists public.media_usage (
  id uuid primary key default gen_random_uuid(),
  media_id uuid not null references public.media_assets(id) on delete cascade,
  entity text not null,
  entity_id uuid,
  field text,
  created_at timestamptz not null default now(),
  unique (media_id, entity, entity_id, field)
);

alter table public.media_usage enable row level security;

drop policy if exists "media_usage_read" on public.media_usage;
create policy "media_usage_read" on public.media_usage
  for select to authenticated using (public.has_permission('media.view'));

drop policy if exists "media_usage_write" on public.media_usage;
create policy "media_usage_write" on public.media_usage
  for all to authenticated
  using (public.has_permission('media.manage'))
  with check (public.has_permission('media.manage'));

-- ─────────────────────────────────────────────────────────────
-- 6. PARTNERSHIPS — public submission path (validated server-side)
-- ─────────────────────────────────────────────────────────────
drop policy if exists "partnerships_public_insert" on public.partnership_requests;
create policy "partnerships_public_insert" on public.partnership_requests
  for insert to anon, authenticated
  with check (status = 'new');

-- ─────────────────────────────────────────────────────────────
-- 7. AUDIT + NOTIFICATION RPCs (clients cannot write audit_logs directly)
-- ─────────────────────────────────────────────────────────────
create or replace function public.record_audit(
  p_action text,
  p_module text,
  p_entity text default null,
  p_entity_id uuid default null,
  p_summary text default null,
  p_outcome text default 'success',
  p_metadata jsonb default '{}'::jsonb
) returns uuid
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $fn$
declare v_id uuid;
begin
  if auth.uid() is null then
    raise exception 'audit requires an authenticated actor';
  end if;
  insert into public.audit_logs (actor_id, actor_email, action, module, entity, entity_id, summary, outcome, metadata)
  values (
    auth.uid(),
    coalesce((select email from public.profiles where id = auth.uid()), ''),
    p_action, p_module, p_entity, p_entity_id, p_summary, p_outcome, coalesce(p_metadata, '{}'::jsonb)
  )
  returning id into v_id;
  return v_id;
end;
$fn$;

revoke all on function public.record_audit(text,text,text,uuid,text,text,jsonb) from anon, public;
grant execute on function public.record_audit(text,text,text,uuid,text,text,jsonb) to authenticated;

create or replace function public.notify_permission(
  p_permission text,
  p_type text,
  p_title text,
  p_body text default null,
  p_link text default null,
  p_severity text default 'info',
  p_dedupe_key text default null
) returns integer
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $fn$
declare v_count integer;
begin
  with recipients as (
    select distinct ur.user_id
    from public.user_roles ur
    join public.role_permissions rp on rp.role_id = ur.role_id
    join public.profiles p on p.id = ur.user_id
    where rp.permission_key = p_permission and p.status = 'active'
  ), inserted as (
    insert into public.notifications (user_id, type, title, body, link, severity, dedupe_key)
    select r.user_id, p_type, p_title, p_body, p_link, p_severity, p_dedupe_key from recipients r
    on conflict do nothing
    returning 1
  )
  select count(*) into v_count from inserted;
  return v_count;
end;
$fn$;

revoke all on function public.notify_permission(text,text,text,text,text,text,text) from anon, public;
grant execute on function public.notify_permission(text,text,text,text,text,text,text) to authenticated, service_role;

-- Prevent duplicate notifications for the same event.
create unique index if not exists notifications_dedupe_idx
  on public.notifications (user_id, dedupe_key)
  where dedupe_key is not null;

-- ─────────────────────────────────────────────────────────────
-- 8. STORAGE BUCKETS
-- ─────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('website-media', 'website-media', true, 10485760,
    array['image/jpeg','image/png','image/webp','image/avif','image/svg+xml','application/pdf']),
  ('admin-documents', 'admin-documents', false, 26214400,
    array['application/pdf','image/jpeg','image/png','application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "website_media_public_read" on storage.objects;
create policy "website_media_public_read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'website-media');

drop policy if exists "website_media_staff_write" on storage.objects;
create policy "website_media_staff_write" on storage.objects
  for insert to authenticated with check (bucket_id = 'website-media' and public.has_permission('media.upload'));

drop policy if exists "website_media_staff_update" on storage.objects;
create policy "website_media_staff_update" on storage.objects
  for update to authenticated using (bucket_id = 'website-media' and public.has_permission('media.manage'));

drop policy if exists "website_media_staff_delete" on storage.objects;
create policy "website_media_staff_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'website-media' and public.has_permission('media.delete'));

drop policy if exists "admin_docs_staff_all" on storage.objects;
create policy "admin_docs_staff_all" on storage.objects
  for all to authenticated
  using (bucket_id = 'admin-documents' and public.has_permission('media.view'))
  with check (bucket_id = 'admin-documents' and public.has_permission('media.upload'));

-- ─────────────────────────────────────────────────────────────
-- 9. INDEXES for administrative queries
-- ─────────────────────────────────────────────────────────────
create index if not exists pages_status_idx on public.pages (status) where deleted_at is null;
create index if not exists pages_updated_idx on public.pages (updated_at desc);
create index if not exists media_assets_category_idx on public.media_assets (category);
create index if not exists media_assets_created_idx on public.media_assets (created_at desc);
create index if not exists notifications_user_idx on public.notifications (user_id, read_at);
create index if not exists audit_logs_created_idx on public.audit_logs (created_at desc);
create index if not exists enquiries_status_created_idx on public.contact_enquiries (status, created_at desc);
create index if not exists partnerships_status_idx on public.partnership_requests (status, created_at desc);
