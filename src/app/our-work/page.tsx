import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import Link from "next/link"
import { ArrowUpRight, MapPinned, Clock, Users, ShieldCheck } from "lucide-react"

export const metadata = { title: "Our Work — Documented Projects | MSS Digital Solutions" }

export default function OurWorkPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />
      <main>
        <section className="bg-[#343D46] text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#701F3D]/15 via-transparent to-[#252B31]/60" />
            <div className="absolute -top-28 -right-28 w-[55%] h-[78%] bg-[#701F3D]/[0.07] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          </div>
          <div className="relative container-mss py-14 sm:py-16 lg:py-20">
            <div className="mb-5"><Breadcrumbs items={[{ label: "Our Work" }]} /></div>
            <div className="max-w-[900px]">
              <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.10] rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8A0B8] animate-pulse" /> Documented Implementation Experience
              </div>
              <h1 className="font-bold tracking-[-0.03em] leading-[0.93] mt-5 text-white" style={{ fontSize: "clamp(32px, 4.4vw, 56px)" }}>
                What we have <span className="text-[#E8A0B8]">actually built</span> and<br />deployed — not pitched.
              </h1>
              <p className="text-white/65 leading-relaxed mt-5 max-w-[700px] text-[16px]">
                MSS presents only verified implementation experience. This portfolio will grow as additional programmes are documented and approved for publication. We do not fill this page with fictional case studies to appear larger.
              </p>
              <div className="mt-8 flex flex-wrap gap-2 text-[11px]">
                <span className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70">Verified only</span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70">Kano State • 2024–</span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#701F3D] text-white font-medium">Illustrative maps labelled synthetic</span>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio grid — single featured project, scalable */}
        <section className="section-y bg-white">
          <div className="container-mss">
            <div className="flex items-center justify-between">
              <h2 className="eyebrow">Featured Project • 01</h2>
              <span className="text-xs text-[#89929B]">Scalable portfolio — add projects via page template, no rewrite needed</span>
            </div>

            <div className="mt-6 bg-white border border-[#E8EAEC] rounded-[24px] overflow-hidden shadow-[0_16px_48px_rgba(52,61,70,0.08)] hover:shadow-[0_20px_60px_rgba(112,31,61,0.10)] transition-shadow">
              <div className="grid lg:grid-cols-12 gap-0">
                <div className="lg:col-span-5 relative h-[320px] lg:h-auto lg:min-h-[420px] overflow-hidden bg-[#343D46]">
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop" alt="Geo-ST4R Kano — field microplanning, illustrative" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F24]/80 via-[#1A1F24]/20 to-transparent" />
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                    <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-xs font-bold tracking-wide uppercase text-[#701F3D]">Flagship • Kano State</span>
                    <span className="px-3 py-1.5 rounded-full bg-[#701F3D] text-white text-xs font-semibold">Geospatial Microplanning</span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-white/95 backdrop-blur rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#701F3D]"><MapPinned className="w-3.5 h-3.5" /> GMT — Facility-level deployment</div>
                      <div className="text-xs text-[#343D46] mt-1">Settlement-level maps + trained teams + microplans grounded in geography</div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col">
                  <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase text-[#701F3D]">
                    <span className="w-6 h-px bg-[#701F3D]" /> Routine Immunisation • Zero-Dose
                  </div>
                  <h3 className="font-bold tracking-tight text-[#252B31] mt-4" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", lineHeight: 1.1 }}>
                    Geo-ST4R — Geospatial Microplanning for Better Immunisation Reach in Kano State.
                  </h3>
                  <p className="text-[#343D46]/70 leading-relaxed mt-4 text-[15px]">
                    Facility-level deployment of the Geospatial Microplanning Toolkit (GMT) — enabling health workers to plan outreach using mapped settlement locations instead of estimated catchments, so previously overlooked communities become visible in the microplan.
                  </p>

                  <div className="mt-6 grid sm:grid-cols-3 gap-3">
                    <div className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-2xl p-4">
                      <div className="text-xs font-mono font-bold text-[#701F3D]">Problem</div>
                      <div className="text-xs text-[#343D46] mt-1.5 leading-relaxed">Estimated populations mask real settlement distribution</div>
                    </div>
                    <div className="bg-[#F9E9EE] border border-[#701F3D]/10 rounded-2xl p-4">
                      <div className="text-xs font-mono font-bold text-[#701F3D]">Approach</div>
                      <div className="text-xs text-[#343D46] mt-1.5 leading-relaxed">Mapped settlements → GMT → supervised microplanning</div>
                    </div>
                    <div className="bg-[#343D46] text-white rounded-2xl p-4">
                      <div className="text-xs font-mono font-bold text-white/60">Partners</div>
                      <div className="text-xs mt-1.5 leading-relaxed">Natview Foundation • Data Science Network • Pathfinder International</div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-[#89929B]">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Duration not published</span>
                    <span className="w-px h-3 bg-[#E8EAEC]" />
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Facility-level • Teams trained</span>
                    <span className="w-px h-3 bg-[#E8EAEC]" />
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Synthetic demo data labelled</span>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/our-work/geo-st4r-kano" className="inline-flex items-center gap-2 bg-[#701F3D] hover:bg-[#50152D] text-white px-6 h-11 rounded-full text-sm font-semibold tracking-wide uppercase transition-colors">
                      Read Full Case Study <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-white border border-[#E8EAEC] hover:border-[#701F3D]/20 text-[#343D46] px-6 h-11 rounded-full text-sm font-semibold tracking-wide uppercase transition-colors">
                      Replicate in Your State
                    </Link>
                  </div>
                  <p className="text-xs text-[#89929B] mt-4 leading-relaxed">All maps and metrics on this site are illustrative and labelled synthetic unless explicitly marked as project-verified. No beneficiary totals, facility counts, dates or impact percentages are published without partner approval.</p>
                </div>
              </div>
            </div>

            {/* Empty-state for future — not fictional projects */}
            <div className="mt-8 bg-[#FAF9F7] border border-dashed border-[#E8EAEC] rounded-[20px] p-8 text-center">
              <h3 className="font-semibold text-[#252B31]">More projects are documented as they are verified.</h3>
              <p className="text-sm text-[#59636D] mt-2 max-w-2xl mx-auto leading-relaxed">
                This portfolio is intentionally limited to one verified flagship rather than fictional case studies. When MSS completes additional documented engagements, they will appear here using the same template — no architecture rewrite required.
              </p>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#701F3D] hover:gap-3 transition-all">
                Discuss a future project <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
