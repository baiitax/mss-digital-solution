import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { CredibilityStrip, PurposeSection, CoreCompetencies, ImpactGrid, HowWeWork, EngagementModels } from "@/components/sections/HomepageSections"
import { GeospatialDemo } from "@/components/maps/GeospatialDemo"
import Link from "next/link"
import { ArrowUpRight, Quote } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFCF7]">
      <Navbar />
      <main>
        <Hero />
        <CredibilityStrip />
        <PurposeSection />
        <CoreCompetencies />
        <ImpactGrid />

        {/* Flagship */}
        <section className="py-16 lg:py-24 bg-[#0B1930] text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0E7C7B]/20 via-transparent to-[#0EA5E9]/10" />
          </div>
          <div className="relative max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
                  <span className="text-xs font-semibold tracking-widest uppercase">Featured Flagship Programme • Kano State</span>
                </div>
                <h2 className="font-display text-3xl lg:text-[44px] font-bold tracking-tight leading-[0.9] mt-6">
                  Geo-ST4R — Geospatial<br />Microplanning for<br /><span className="text-[#14B8A6]">Better Immunisation Reach.</span>
                </h2>
                <p className="text-white/70 leading-relaxed mt-6">
                  Incomplete settlement coverage means children are missed. Geo-ST4R deploys the Geospatial Microplanning Toolkit (GMT) at facility level — training healthcare teams to plan immunisation sessions against <em className="text-white">real settlement geography</em>, not estimated catchments.
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <h4 className="font-semibold text-white text-sm">The challenge</h4>
                    <p className="text-sm text-white/60 mt-2 leading-relaxed">Facility catchments based on estimates hide dispersed settlements — and the zero-dose children living in them.</p>
                  </div>
                  <div className="bg-[#0E7C7B] rounded-2xl p-5">
                    <h4 className="font-semibold text-white text-sm">The solution</h4>
                    <p className="text-sm text-white/90 mt-2 leading-relaxed">GMT at facility level: mapped settlements, trained teams, and microplans grounded in actual geography.</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/projects/geo-st4r" className="inline-flex items-center gap-2 bg-white text-[#0B1930] px-6 h-11 rounded-full text-sm font-semibold tracking-wide uppercase hover:bg-[#F1F5F9] transition-colors">
                    Explore the Case Study <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <span className="inline-flex items-center text-xs text-white/50 border border-white/15 rounded-full px-4 h-11">
                    Partners: Natview Foundation • Data Science Network • Pathfinder Intl.
                  </span>
                </div>
              </div>

              <div className="lg:w-[480px] shrink-0">
                <div className="bg-white rounded-[24px] p-3 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"
                    alt="Health workers conducting outreach with digital tools"
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                  <div className="p-4">
                    <div className="text-xs font-semibold tracking-widest uppercase text-[#0E7C7B]">What frontline teams get</div>
                    <ul className="mt-3 space-y-2 text-sm text-[#334155]">
                      <li className="flex gap-2"><span className="text-[#0E7C7B]">•</span> Settlement-level maps for every facility catchment</li>
                      <li className="flex gap-2"><span className="text-[#0E7C7B]">•</span> Microplanning grounded in real community locations</li>
                      <li className="flex gap-2"><span className="text-[#0E7C7B]">•</span> Training + supportive supervision for adoption</li>
                    </ul>
                    <div className="mt-4 text-xs text-[#94A3B8]">All programme imagery and maps are illustrative unless explicitly marked as project-verified.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HowWeWork />

        {/* Geospatial demo */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-[#0E7C7B]">
                <span className="w-8 h-px bg-[#0E7C7B]" /> Interactive Demonstration
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-[#0B1930] mt-4">See geospatial intelligence in action.</h2>
              <p className="text-[#475569] mt-4 leading-relaxed">Explore how facility catchments and settlement layers reveal gaps that estimated populations hide. Toggle layers, hover points, and see how microplanning becomes precise.</p>
            </div>
            <div className="mt-8">
              <GeospatialDemo />
            </div>
          </div>
        </section>

        <EngagementModels />

        {/* Leadership preview */}
        <section className="py-16 lg:py-24 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                <div className="relative bg-[#F1F5F9] rounded-[32px] overflow-hidden p-8">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#0E7C7B]/10 rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="w-28 h-28 rounded-[24px] bg-[#0B1930] overflow-hidden border-4 border-white shadow-xl">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" alt="Jamil Aliyu Galadanci portrait placeholder" className="w-full h-full object-cover opacity-90" />
                    </div>
                    <div className="mt-6">
                      <h3 className="font-display font-bold text-xl text-[#0B1930]">Jamil Aliyu Galadanci</h3>
                      <p className="text-sm font-medium text-[#0E7C7B] mt-1">Executive Director</p>
                      <p className="text-xs tracking-wide uppercase font-semibold text-[#64748B] mt-1">COREN-registered Software Engineer • Public Health Informatics</p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-xs font-medium">LoMIS Suite</span>
                      <span className="px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-xs font-medium">EMID Optimisation</span>
                      <span className="px-3 py-1.5 rounded-full bg-[#0B1930] text-white text-xs font-medium">PRINCE2 • ISTQB</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-[#0E7C7B]">
                  <span className="w-8 h-px bg-[#0E7C7B]" /> Leadership
                </div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-[#0B1930] mt-4">Led by implementation experience — not just technology.</h2>
                <p className="text-[#475569] leading-relaxed mt-4">
                  Jamil brings a rare blend of software engineering, public health informatics and global health programme management — from CTO roles to Senior Manager of Global Health Informatics at eHealth Africa, and research leadership at Vanderbilt.
                </p>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div className="bg-[#FDFCF7] border border-[#E2E8F0] rounded-2xl p-5">
                    <div className="text-sm font-semibold text-[#0B1930]">Major contributions</div>
                    <ul className="mt-2 space-y-1.5 text-xs text-[#475569] leading-relaxed">
                      <li>• LoMIS — WFP Digital Health Innovation Accelerator Award 2022/2023</li>
                      <li>• GAVI-funded optimisation of National EMID</li>
                      <li>• BISKIT — South Africa crisis blood system</li>
                    </ul>
                  </div>
                  <div className="bg-[#0B1930] text-white rounded-2xl p-5">
                    <div className="text-sm font-semibold">Education</div>
                    <ul className="mt-2 space-y-1.5 text-xs text-white/70 leading-relaxed">
                      <li>• MSc Computer Science (Merit) — Univ. of Bristol, UK</li>
                      <li>• B.Eng Computer Eng. (First Class) — Bayero Univ. Kano</li>
                      <li>• Johns Hopkins • Univ. of Washington</li>
                    </ul>
                  </div>
                </div>
                <Link href="/leadership" className="mt-8 inline-flex items-center gap-2 bg-[#0B1930] text-white px-6 h-11 rounded-full text-sm font-semibold tracking-wide uppercase hover:bg-[#132A4C] transition-colors">
                  View Complete Profile <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-[#FDFCF7] border-t border-[#E2E8F0]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="bg-[#0B1930] rounded-[32px] p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0E7C7B]/20 to-transparent" />
              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <Quote className="w-8 h-8 text-[#14B8A6] mb-4" />
                  <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-white">Let&apos;s Build Health Systems That Reach Everyone.</h2>
                  <p className="text-white/70 mt-4 leading-relaxed">MSS collaborates with state governments, development partners, academic institutions, healthcare facilities and private investors. Whether you need an assessment, a co-designed solution or managed delivery — let&apos;s start with your communities.</p>
                </div>
                <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#0E7C7B] hover:bg-[#14B8A6] text-white px-8 h-12 rounded-full font-semibold tracking-wide uppercase text-sm transition-colors">
                  Start a Partnership Conversation <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="relative mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-3 text-xs text-white/60">
                <span>State & Federal Government</span><span>•</span><span>Ministries of Health</span><span>•</span><span>INGOs & Donors</span><span>•</span><span>Academic & Research</span><span>•</span><span>Investors & Private Sector</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
