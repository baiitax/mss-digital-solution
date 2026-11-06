# Deployment — MSS Digital Solutions (Vercel + Supabase)

## 1. Supabase
1. Create project at https://supabase.com → `mss-digital`
2. SQL Editor → paste & run `supabase/migrations/001_initial.sql`
3. Storage → New bucket `media` → Public read ON, authenticated write via RLS
4. Auth → Configuration → Enable Email provider → Create first user `admin@mss-digitalsolutions.com`
5. Project Settings → API → copy URL + anon/service_role keys

## 2. Environment variables (Vercel dashboard → Project → Settings → Environment Variables)
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=https://mss-digitalsolutions.com
NOTIFICATION_EMAIL=admin@mss-digitalsolutions.com
```
Also add same to local `.env.local` for `npm run dev`.

## 3. Vercel
- Import Git repo or `vercel --prod` from `mss-digital/` directory
- Framework: Next.js, Build: `npm run build`, Output: `.next`
- Domain: `mss-digitalsolutions.com` → update `src/app/layout.tsx` metadataBase + sitemap/robots if domain changes
- Headers (security) already in `next.config.ts`

## 4. Admin setup
- Visit `https://yourdomain.com/admin` → sign in (Supabase Auth in production)
- Default RLS roles: `super_admin`, `content_admin`, `editor`, `enquiry_manager` in `profiles.role`
- Assign role: `update profiles set role='super_admin' where id='<uuid>'`
- Manage: Website Content, Services, Projects, Insights, Leadership, Media Library, Enquiries (status: new→in_review→responded→archived), SEO, Settings, Users & Roles, Activity Logs

## 5. Content & media
- Upload via Admin → Media Library → auto-optimised by Next.js Image
- Required alt text + category for accessibility
- Replace placeholder emails/phones in Admin → Settings (site_settings table) — do NOT hardcode verified contacts in code

## 6. Contact pipeline
- Public form: client + server validation, rate limiting (5/min/IP), sanitisation, Supabase persistence
- Demo fallback: localStorage when Supabase not configured (visible in Admin on same device)
- Notifications: configure Supabase Edge Function + Resend/SendGrid using NOTIFICATION_EMAIL

## 7. Security checklist
- [ ] Supabase RLS enabled & tested (anon cannot read enquiries, only insert)
- [ ] Service role key never exposed to client
- [ ] /admin protected by Supabase Auth + RLS (not just UI hiding)
- [ ] HTTPS, secure headers, rate limiting, spam protection
- [ ] Privacy Policy & Terms reviewed by counsel for NDPA compliance
- [ ] No patient data collected on public site

## 8. Performance & accessibility
- Targets: Lighthouse Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+
- Optimisations: Server Components, Image optimisation, lazy loading, code splitting, font display swap, minimal client JS, framer-motion reduced-motion support
- Test: `npm run build` + Lighthouse CI + axe

## 9. Geospatial demo
- Illustrative synthetic dataset only — every map/point explicitly labelled “Illustrative • Synthetic data”
- No confidential government/patient/programme data rendered
- Future: replace synthetic with GeoJSON from Supabase Storage when MSS provides verified datasets + consent

## 10. Go-live
- Run `npm run build` clean (no TS errors)
- Verify all routes, forms, admin CRUD, RLS
- Configure domain, sitemap.xml & robots.txt, OG images, JSON-LD (Organization, Article, BreadcrumbList)
- Backup: Supabase PITR enabled, daily exports
