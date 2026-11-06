import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, Share2, User } from "lucide-react"

const posts: Record<string, { title: string; category: string; date: string; read: string; body: string[] }> = {
  "geospatial-microplanning-101": {
    title: "Geospatial Microplanning 101: Why Settlements — Not Catchments — Should Drive RI Plans",
    category: "Geospatial Intelligence",
    date: "2024-11-10",
    read: "7 min",
    body: [
      "In many states, routine immunisation (RI) microplans are built from estimated catchment populations: total population divided by number of facilities, or historical attendance extrapolated forward.",
      "The problem: settlements are not uniformly distributed. A facility with a ‘5 km radius’ on paper may have 12 settlements at 2 km in one direction and none in another — and another facility’s paper radius may overlap it, double-counting some communities while leaving others invisible.",
      "Geospatial microplanning inverts the approach: start with mapped settlement locations, verify facility coordinates, and then allocate outreach sessions so every mapped settlement has a responsible facility and a scheduled date. The MSS Geospatial Microplanning Toolkit (GMT) — deployed under Geo-ST4R — operationalises this at facility level, with training and supportive supervision.",
      "Placeholder content: this article will be enriched with field photographs, settlement maps (labelled illustrative) and a before/after microplan comparison upon MSS editorial approval. No project statistics are presented as verified outcomes.",
    ]
  },
  "emid-optimisation-lessons": {
    title: "Lessons from Optimising Nigeria's EMID: What GAVI-Funded System Improvement Taught Us",
    category: "Digital Health",
    date: "2024-09-15",
    read: "6 min",
    body: ["Optimising the National Electronic Management of Immunization Data (EMID) was not a code-only exercise. It required workflow mapping with facility staff, reconciliation of paper and digital records, and facility-level adoption support.", "Key lesson: data quality improves when the health worker’s daily register becomes easier — not harder — to complete. Offline capture, validation at entry, and clear reconciliation dashboards matter more than new features.", "Placeholder content — awaiting MSS editorial review and detailed case notes. No operational EMID data is displayed."]
  },
  "lomis-cold-chain-visibility": { title: "LoMIS and Last-Mile Visibility", category: "Healthcare Innovation", date: "2024-08-02", read: "5 min", body: ["LoMIS Suite — recipient of the 2022/2023 WFP Digital Health Innovation Accelerator Award — demonstrated that logistics visibility can survive intermittent connectivity when built offline-first."] },
  "zero-dose-mapping-kano": { title: "Mapping Zero-Dose Persistence in Kano: Settlement Density vs. Session Density", category: "Immunisation", date: "2024-10-20", read: "8 min", body: ["Conceptual exploration only — illustrative synthetic data. Spatial mismatch between where zero-dose children live and where RI sessions are planned explains persistence.", "GMT helps close this mismatch by grounding session density in settlement density."] },
  "data-quality-scorecard": { title: "A Facility-Facing Data Quality Scorecard", category: "Public Health Data", date: "2024-07-12", read: "5 min", body: ["Dashboards fail when only managers see them. Facility teams need to see completeness, timeliness and consistency for their own reports — with clear actions."] },
  "co-design-principles": { title: "Co-Design, Not Procurement", category: "Programme Implementation", date: "2024-11-01", read: "4 min", body: ["‘A tool that a facility cannot use is not a solution. It is a procurement.’ — MSS operating philosophy. Co-design means nurses, record officers and programme managers shape the tool before it ships."] },
}

export async function generateStaticParams() {
  return Object.keys(posts).map(slug => ({ slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug] || { title: "Article", category: "Insights", date: "2024-01-01", read: "4 min", body: ["This is an editorial placeholder. Authorised MSS administrators can publish verified content via Admin → Insights. No fabricated research or attributed opinions are presented as MSS positions.", "Related articles, author, reading time, SEO metadata and social sharing are supported out of the box."] }

  return (
    <div className="min-h-screen bg-[#FAFBF9]">
      <Navbar />
      <main>
        <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-[#087F83] hover:text-[#10283F] font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge variant="teal">{post.category}</Badge>
            <span className="text-xs text-[#71808B] flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
            <span className="text-xs text-[#71808B] flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.read}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] font-medium">Editorial placeholder — awaiting MSS approval</span>
          </div>

          <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-[#10283F] mt-6 leading-tight">{post.title}</h1>

          <div className="mt-6 flex items-center justify-between border-y border-[#E6EBED] py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#10283F] text-white flex items-center justify-center text-sm font-semibold">MSS</div>
              <div>
                <div className="text-sm font-semibold text-[#10283F] flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> MSS Editorial Team</div>
                <div className="text-xs text-[#71808B]">MSS Digital Solutions Ltd • Kano</div>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#087F83] border border-[#E6EBED] rounded-full px-4 h-9 hover:bg-[#FAFBF9]">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>

          <div className="mt-8 prose prose-neutral max-w-none prose-p:leading-relaxed prose-p:text-[#273744] prose-headings:text-[#10283F] prose-headings:font-display prose-strong:text-[#10283F]">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-10 bg-[#FAFBF9] border border-[#E6EBED] rounded-2xl p-6">
            <h3 className="font-display font-bold text-[#10283F]">About this Knowledge Centre</h3>
            <p className="text-sm text-[#273744] mt-2 leading-relaxed">This extensible insights infrastructure supports article listing, detail pages, category filtering, search, featured flags, related articles, author, reading time, social sharing and SEO metadata — all editable via Admin without code changes.</p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Link href="/insights" className="text-sm font-semibold text-[#087F83] hover:text-[#10283F]">← More insights</Link>
            <Link href="/contact" className="bg-[#10283F] text-white px-5 h-10 rounded-full text-sm font-semibold inline-flex items-center">Discuss this topic with MSS</Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
