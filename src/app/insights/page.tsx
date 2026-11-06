import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Eyebrow, Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowUpRight, Clock, Search } from "lucide-react"

export const metadata = { title: "Insights — MSS Digital Solutions" }

const categories = ["All", "Digital Health", "Geospatial Intelligence", "Primary Healthcare", "Immunisation", "Public Health Data", "Healthcare Innovation", "Research and Policy", "Programme Implementation"]

const posts = [
  {
    slug: "geospatial-microplanning-101",
    title: "Geospatial Microplanning 101: Why Settlements — Not Catchments — Should Drive RI Plans",
    excerpt: "Estimated catchments hide dispersed settlements. Here&apos;s how facility teams use settlement-level maps to build microplans that actually reach zero-dose communities.",
    category: "Geospatial Intelligence",
    date: "2024-11-10",
    read: "7 min",
    featured: true,
  },
  {
    slug: "emid-optimisation-lessons",
    title: "Lessons from Optimising Nigeria&apos;s EMID: What GAVI-Funded System Improvement Taught Us",
    excerpt: "Improving the National Electronic Management of Immunization Data — workflows, data quality and facility adoption come first.",
    category: "Digital Health",
    date: "2024-09-15",
    read: "6 min",
    featured: true,
  },
  {
    slug: "lomis-cold-chain-visibility",
    title: "LoMIS and Last-Mile Visibility: Designing for Offline-First Logistics",
    excerpt: "Award-winning LoMIS thinking: how to make commodity visibility survive intermittent connectivity and low-power facilities.",
    category: "Healthcare Innovation",
    date: "2024-08-02",
    read: "5 min",
    featured: false,
  },
  {
    slug: "zero-dose-mapping-kano",
    title: "Mapping Zero-Dose Persistence in Kano: Settlement Density vs. Session Density",
    excerpt: "A conceptual exploration — how spatial mismatch between where children live and where sessions are planned perpetuates zero-dose clusters.",
    category: "Immunisation",
    date: "2024-10-20",
    read: "8 min",
    featured: false,
  },
  {
    slug: "data-quality-scorecard",
    title: "A Facility-Facing Data Quality Scorecard: Completeness, Timeliness, Consistency",
    excerpt: "Programme dashboards only work when facility teams see their own data quality — and can act on it.",
    category: "Public Health Data",
    date: "2024-07-12",
    read: "5 min",
    featured: false,
  },
  {
    slug: "co-design-principles",
    title: "Co-Design, Not Procurement: Why the Best Tool Is the One the Nurse Opens Tomorrow",
    excerpt: "Our operating philosophy in practice — designing alongside the people who will live with the system.",
    category: "Programme Implementation",
    date: "2024-11-01",
    read: "4 min",
    featured: false,
  },
]

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF7]">
      <Navbar />
      <main>
        <section className="bg-white border-b border-[#E2E8F0]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-12">
            <Eyebrow>Insights & Knowledge Centre</Eyebrow>
            <h1 className="font-display text-4xl font-bold tracking-tight text-[#0B1930] mt-4">Evidence, implementation notes and research — <span className="text-[#0E7C7B]">curated for decision-makers.</span></h1>
            <p className="text-[#475569] leading-relaxed mt-4 max-w-3xl">Articles are published by authorised administrators via the MSS Admin dashboard. All sample content below is clearly identified as editorial placeholders until verified by MSS.</p>
            
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {categories.map(cat => (
                <Link key={cat} href={`/insights${cat === "All" ? "" : `?cat=${encodeURIComponent(cat)}`}`} className={`px-4 py-2 rounded-full text-sm font-medium border ${cat === "All" ? "bg-[#0B1930] text-white border-[#0B1930]" : "bg-white text-[#334155] border-[#E2E8F0] hover:border-[#0E7C7B]/30"}`}>
                  {cat}
                </Link>
              ))}
            </div>

            <div className="mt-6 relative max-w-md">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input placeholder="Search insights… (client filter, extensible to Supabase full-text)" className="w-full h-11 pl-10 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7C7B]/20 focus:border-[#0E7C7B]" />
            </div>
          </div>
        </section>

        <section className="py-10 bg-[#F8FAFC]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            {/* Featured */}
            <div className="grid lg:grid-cols-2 gap-6">
              {posts.filter(p => p.featured).map(p => (
                <Link key={p.slug} href={`/insights/${p.slug}`} className="group bg-white border border-[#E2E8F0] rounded-[24px] overflow-hidden hover:shadow-xl hover:border-[#0E7C7B]/20 transition-all">
                  <div className="h-48 bg-gradient-to-br from-[#0B1930] via-[#132A4C] to-[#0E7C7B] relative p-6 flex flex-col justify-end">
                    <Badge variant="teal" className="absolute top-4 left-4">{p.category}</Badge>
                    <div className="text-white font-display font-bold text-xl leading-tight group-hover:text-[#14B8A6] transition-colors">{p.title}</div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-[#475569] leading-relaxed line-clamp-2">{p.excerpt}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-[#94A3B8]">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {p.read}</span>
                      <span>{p.date}</span>
                      <span className="px-2 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-xs font-medium">Editorial placeholder</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.filter(p => !p.featured).map(p => (
                <Link key={p.slug} href={`/insights/${p.slug}`} className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:shadow-lg hover:border-[#0E7C7B]/20 transition-all">
                  <Badge variant="muted">{p.category}</Badge>
                  <h3 className="font-display font-semibold text-[#0B1930] mt-3 leading-tight group-hover:text-[#0E7C7B] transition-colors line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-[#475569] mt-2 leading-relaxed line-clamp-2">{p.excerpt}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-[#94A3B8]">
                    <span>{p.date}</span><span>•</span><span>{p.read}</span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0E7C7B]">
                    Read article <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[#0B1930]">Publish with MSS Admin</h3>
                <p className="text-sm text-[#475569] mt-1">All articles support categories, featured flags, SEO metadata, draft/published states, author, reading time, search and related articles — no code changes needed.</p>
              </div>
              <Link href="/admin" className="shrink-0 bg-[#0B1930] text-white px-6 h-11 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                Open Admin <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
