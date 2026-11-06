import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import Link from "next/link"
import { ArrowUpRight, BookOpen, Bell, Mail, FileText } from "lucide-react"

export const metadata = { title: "Insights — Knowledge & Publications | MSS Digital Solutions" }

const categories = [
  { name: "Digital Health", desc: "Health information systems, EHR integration and frontline digital workflows." },
  { name: "Geospatial Intelligence", desc: "Settlement mapping, catchment analysis and geospatial microplanning." },
  { name: "Primary Healthcare", desc: "PHC readiness, workforce and service delivery at facility level." },
  { name: "Immunisation", desc: "Routine immunisation planning, zero-dose identification and coverage." },
  { name: "Public Health Data", desc: "Data quality, timeliness and routine reporting systems." },
  { name: "Health Technology", desc: "Offline-first design, interoperability and adoption in low-resource settings." },
  { name: "Programme Implementation", desc: "Field deployment, training, supervision and verification." },
  { name: "Research and Policy", desc: "Evidence synthesis, investment cases and policy translation." },
]

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#343D46] text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#701F3D]/16 via-transparent to-[#252B31]/60" />
            <div className="absolute -top-28 -right-28 w-[55%] h-[78%] bg-[#701F3D]/[0.07] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          </div>
          <div className="relative container-mss py-14 sm:py-16 lg:py-20">
            <div className="mb-5"><Breadcrumbs items={[{ label: "Insights" }]} /></div>
            <div className="max-w-[880px]">
              <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.10] rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8A0B8] animate-pulse" /> Insights & Publications
              </div>
              <h1 className="font-bold tracking-[-0.03em] leading-[0.93] mt-5 text-white" style={{ fontSize: "clamp(32px, 4.2vw, 52px)" }}>
                A knowledge platform for<br />
                <span className="text-[#E8A0B8]">implementation-minded</span> decision-makers.
              </h1>
              <p className="text-white/65 leading-relaxed mt-5 max-w-[700px] text-[16px]">
                MSS publishes notes from the field, technical perspectives and research on digital health, geospatial intelligence and primary healthcare delivery. This section is built and ready — articles appear once reviewed and approved for publication.
              </p>
              <div className="mt-8 flex flex-wrap gap-2 text-[11px]">
                <span className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70">8 topic areas</span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70">Editorially reviewed</span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#701F3D] text-white font-medium">No placeholder articles published</span>
              </div>
            </div>
          </div>
        </section>

        {/* Empty state — intentional, professional */}
        <section className="section-y bg-white">
          <div className="container-mss">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F9E9EE] flex items-center justify-center mx-auto">
                <BookOpen className="w-7 h-7 text-[#701F3D]" />
              </div>
              <h2 className="font-bold tracking-tight text-[#252B31] mt-6" style={{ fontSize: "clamp(24px, 2.8vw, 34px)" }}>
                Publications are being prepared.
              </h2>
              <p className="text-[#343D46]/70 leading-relaxed mt-4">
                We are finalising our first set of technical notes and field perspectives. Rather than publish invented articles to fill this page, MSS is preparing reviewed material for release here.
              </p>
              <p className="text-sm text-[#89929B] leading-relaxed mt-3">
                The publishing architecture — categories, article templates, SEO metadata and administrative workflow — is already in place. New publications appear here as they are approved.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#701F3D] hover:bg-[#50152D] text-white px-7 h-11 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-colors">
                  Register Interest <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link href="/our-work/geo-st4r-kano" className="inline-flex items-center justify-center gap-2 bg-white border border-[#E8EAEC] hover:border-[#701F3D]/20 text-[#343D46] px-7 h-11 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-colors">
                  Read the Geo-ST4R Case Study
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Topic taxonomy */}
        <section className="section-y bg-[#F0F1F2]">
          <div className="container-mss">
            <div className="max-w-2xl">
              <div className="eyebrow">Topic Areas</div>
              <h2 className="font-bold tracking-tight text-[#252B31] mt-4" style={{ fontSize: "clamp(24px, 2.8vw, 34px)" }}>What we write about.</h2>
              <p className="text-[#59636D] mt-3 leading-relaxed">Eight editorial categories covering the technical and programmatic questions our partners bring to us.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {categories.map((c) => (
                <div key={c.name} className="bg-white border border-[#E8EAEC] rounded-2xl p-5 hover:border-[#701F3D]/15 hover:shadow-[0_8px_24px_rgba(52,61,70,0.06)] transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F9E9EE] flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#701F3D]" />
                  </div>
                  <h3 className="font-bold text-[13.5px] text-[#252B31] mt-3.5 leading-tight">{c.name}</h3>
                  <p className="text-[12px] text-[#59636D] mt-1.5 leading-relaxed">{c.desc}</p>
                  <div className="mt-3 text-[11px] font-semibold tracking-wide uppercase text-[#89929B]">Coming soon</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe / submission note */}
        <section className="section-y bg-white border-t border-[#E8EAEC]">
          <div className="container-mss">
            <div className="bg-[#252B31] text-white rounded-[24px] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-[#E8A0B8]">
                  <Bell className="w-3.5 h-3.5" /> Stay informed
                </div>
                <h3 className="font-bold text-xl mt-3">Be notified when the first publications go live.</h3>
                <p className="text-white/60 text-sm mt-2 leading-relaxed">Send us a note with your areas of interest — we will share relevant material directly as it is published.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#701F3D] hover:bg-[#50152D] text-white px-7 h-11 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-colors">
                  <Mail className="w-4 h-4" /> Contact the Team
                </Link>
              </div>
            </div>
            <p className="text-xs text-[#89929B] text-center mt-6 max-w-2xl mx-auto leading-relaxed">
              MSS does not publish unverified research findings or statistics on this website. Publication is subject to internal editorial review and, where applicable, partner approval.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
