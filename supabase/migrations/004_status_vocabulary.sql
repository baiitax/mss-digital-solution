-- 004 — One editorial status vocabulary across all content tables.
--
-- The admin workflow is: Draft → In review → Approved → Published → Archived.
-- Before this migration `insights` accepted 'review' (and nothing for approved
-- or archived) and `projects` accepted only draft/published. The identical
-- "Submit for review" button therefore worked on pages and failed with a check
-- constraint violation on insights and projects.
--
-- Order matters: drop the old constraint first, normalise existing rows, then
-- add the canonical constraint.

alter table public.insights drop constraint if exists insights_status_check;

update public.insights set status = 'in_review' where status = 'review';

alter table public.insights add constraint insights_status_check
  check (status in ('draft','in_review','approved','published','archived'));

alter table public.projects drop constraint if exists projects_status_check;

alter table public.projects add constraint projects_status_check
  check (status in ('draft','in_review','approved','published','archived'));
