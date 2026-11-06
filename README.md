# MSS Digital Solutions Ltd — Enterprise Corporate Website

**Digital health systems, geospatial intelligence and data analytics — built to reach the communities that services have not yet reached.**

Production-ready Next.js 16 App Router + Supabase + Tailwind CSS 4 + Framer Motion site for MSS Digital Solutions Ltd (RC 7341058, incorporated 9 Feb 2024, Kano, Nigeria).

### Tech
- Next.js 16 App Router, React 19, TypeScript strict
- Tailwind CSS 4, Framer Motion, lucide-react
- Supabase Postgres + Storage + Auth + RLS
- Vercel-ready, image optimisation, SEO (Metadata API, sitemap, robots, OG/Twitter, JSON-LD ready)
- WCAG 2.2 AA, Lighthouse targets 90+

### Quick start
```bash
npm install
cp .env.example .env.local  # add Supabase keys
npm run dev  # http://localhost:3000
npm run build
```

### Supabase setup
1. Create project at supabase.com
2. Run `supabase/migrations/001_initial.sql` in SQL editor
3. Create Storage bucket `media` (public read, authenticated write via RLS)
4. Enable Auth (email/password) and create first super_admin user
5. Set env vars in Vercel dashboard

### Routes
- `/` homepage (hero, credibility, purpose, 4 capabilities, impact grid, Geo-ST4R flagship, how-we-work, geospatial demo, engagement models, leadership preview)
- `/about` comprehensive editorial story
- `/capabilities` + 4 detail pages
- `/projects/geo-st4r` flagship case study with interactive illustrative map
- `/leadership` executive profile (Jamil Aliyu Galadanci)
- `/insights` + `/insights/[slug]` extensible knowledge centre
- `/contact` validated enquiry forms (Supabase or demo localStorage)
- `/admin` secure dashboard (RBAC, enquiries, content, media, SEO, audit)
- `/api/contact` server-validated, rate-limited submission endpoint

### Design system
Deep midnight navy #0B1930, teal #0E7C7B, cyan accent #06B6D4, warm white #FDFCF7. Inter + Manrope + Plus Jakarta Sans. Editorial headings, asymmetric grids, generous whitespace.

### Content integrity
Company profile is source of truth. No invented clients, contracts, stats or credentials. All maps/datasets are explicitly labelled **illustrative synthetic** and never presented as operational Geo-ST4R data.

### Admin
Access `/admin`. Demo: any email containing `@`. Production: Supabase Auth + RLS + server-enforced roles (super_admin, content_admin, editor, enquiry_manager).

### Deployment
Vercel: import repo, set env vars, deploy. Domain: `mss-digitalsolutions.com` (update metadataBase, sitemap, robots).
