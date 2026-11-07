-- 006 — Runtime settings consumed by the live application
--
-- The forms and system-settings modules in the portal write these rows, and the
-- public application reads them at runtime. Seeding them here means the modules
-- start from a real, known state instead of guessing defaults.
--
-- `is_public = false` rows are never exposed to anon; they are read server-side
-- with the service role or by staff holding settings.view.

insert into public.site_settings (key, value, is_public) values
  ('forms.contact', jsonb_build_object(
      'enquiries_enabled', true,
      'accepted_types', jsonb_build_array('partnership', 'general'),
      'rate_limit_per_minute', 5,
      'acknowledgement', ''
   ), false),
  ('site_status', jsonb_build_object(
      'maintenance_mode', false,
      'message', ''
   ), true)
on conflict (key) do nothing;
