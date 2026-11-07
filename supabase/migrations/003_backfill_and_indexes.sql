-- 003 — Data hygiene + public render support
-- (a) The 15 pre-existing public routes were registered as `published` with a
--     NULL published_at, which breaks "published implies a publication date".
-- (b) Index for public single-page lookups by slug.

update public.pages
   set published_at = coalesce(published_at, updated_at, created_at, now())
 where status = 'published'
   and published_at is null
   and deleted_at is null;

create index if not exists pages_slug_public_idx
  on public.pages (slug)
  where deleted_at is null and status = 'published';
