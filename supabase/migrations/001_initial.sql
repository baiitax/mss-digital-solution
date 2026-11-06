-- MSS Digital Solutions — Supabase initial schema
-- Run with: supabase db push or via Dashboard SQL editor

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- Profiles (linked to auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  organisation text,
  avatar_url text,
  role text check (role in ('super_admin','content_admin','editor','enquiry_manager')) default 'editor',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Admin roles audit
create table if not exists public.admin_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  role text not null,
  granted_by uuid references public.profiles(id),
  granted_at timestamptz default now()
);

-- Site settings (singleton or namespaced)
create table if not exists public.site_settings (
  key text primary key,
  value jsonb,
  updated_at timestamptz default now(),
  updated_by uuid references public.profiles(id)
);

-- SEO metadata
create table if not exists public.seo_metadata (
  id uuid primary key default gen_random_uuid(),
  path text unique not null,
  title text,
  description text,
  og_image text,
  canonical text,
  no_index boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Services
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  body text,
  icon text,
  category text,
  featured boolean default false,
  published boolean default true,
  display_order int default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Projects / case studies
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  body text,
  challenge text,
  approach text,
  outcomes text,
  location text,
  status text default 'active',
  featured boolean default false,
  published boolean default true,
  cover_image text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.project_partners (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  name text not null,
  role text,
  logo_url text,
  website text
);

-- Team members
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  full_name text not null,
  role_title text,
  designation text,
  biography text,
  education jsonb,
  certifications jsonb,
  contributions jsonb,
  photo_url text,
  display_order int default 0,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Articles
create table if not exists public.article_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null
);

insert into public.article_categories (slug, name) values
('digital-health','Digital Health'),
('geospatial-intelligence','Geospatial Intelligence'),
('primary-healthcare','Primary Healthcare'),
('immunisation','Immunisation'),
('public-health-data','Public Health Data'),
('healthcare-innovation','Healthcare Innovation'),
('research-policy','Research and Policy'),
('programme-implementation','Programme Implementation')
on conflict do nothing;

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text,
  category_id uuid references public.article_categories(id),
  author_id uuid references public.profiles(id),
  featured boolean default false,
  published boolean default false,
  published_at timestamptz,
  reading_time text,
  cover_image text,
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Media assets
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_path text not null,
  file_size int,
  mime_type text,
  alt_text text,
  caption text,
  category text,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- Contact enquiries
create table if not exists public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  organisation text,
  email text not null,
  telephone text,
  country text not null default 'Nigeria',
  area_of_interest text not null,
  subject text,
  message text not null,
  status text check (status in ('new','in_review','responded','archived')) default 'new',
  assigned_to uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists contact_enquiries_status_idx on public.contact_enquiries(status);
create index if not exists contact_enquiries_created_idx on public.contact_enquiries(created_at desc);
create index if not exists articles_published_idx on public.articles(published, published_at desc);
create index if not exists articles_category_idx on public.articles(category_id);

-- Activity logs
create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,
  entity text,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.contact_enquiries enable row level security;
alter table public.articles enable row level security;
alter table public.projects enable row level security;
alter table public.media_assets enable row level security;
alter table public.site_settings enable row level security;
alter table public.activity_logs enable row level security;

-- Public can insert contact enquiries and read published content
create policy "Public can insert enquiries" on public.contact_enquiries for insert to anon, authenticated with check (true);
create policy "Public can read published articles" on public.articles for select to anon, authenticated using (published = true);
create policy "Public can read published projects" on public.projects for select to anon, authenticated using (published = true);
create policy "Public can read site settings" on public.site_settings for select to anon, authenticated using (true);
create policy "Public can read seo" on public.seo_metadata for select to anon, authenticated using (true);

-- Authenticated admins can manage (simplified; production should check role via JWT claim)
create policy "Authenticated can manage enquiries" on public.contact_enquiries for all to authenticated using (true) with check (true);
create policy "Authenticated can manage articles" on public.articles for all to authenticated using (true) with check (true);
create policy "Authenticated can manage projects" on public.projects for all to authenticated using (true) with check (true);
create policy "Authenticated can manage media" on public.media_assets for all to authenticated using (true) with check (true);
create policy "Authenticated can manage settings" on public.site_settings for all to authenticated using (true) with check (true);
create policy "Authenticated can read activity" on public.activity_logs for select to authenticated using (true);
create policy "Authenticated can insert activity" on public.activity_logs for insert to authenticated with check (true);
