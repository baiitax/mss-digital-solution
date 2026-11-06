import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { CredibilityStrip, PurposeSection, CoreCompetencies, ImpactGrid, HowWeWork, EngagementModels } from "@/components/sections/HomepageSections"
import { GeospatialDemo } from "@/components/maps/GeospatialDemo"
import Link from "next/link"
import { ArrowUpRight, Quote } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFBF9]">
      <Navbar />
      <main>
        <Hero />
        <CredibilityStrip />
        <PurposeSection />
        <CoreCompetencies />
        <ImpactGrid />

        {/* Flagship */}
        <section className="py-12 sm:py-16 lg:py-24 bg-[#10283F] text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#087F83]/20 via-transparent to-[#48BFC2]/10" />
          </div>
          <div className="relative max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-10">
              <div className="max-w-2xl min-w-0">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-2">
                  <span className="w-2 h-2 rounded-full bg-[#48BFC2] animate-pulse shrink-0" />
                  <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase">Featured Flagship Programme • Kano State</span>
                </div>
                <h2 className="font-display text-[28px] sm:text-3xl lg:text-[44px] font-bold tracking-tight leading-[0.92] mt-6">
                  Geo-ST4R — Geospatial<br />Microplanning for<br /><span className="text-[#48BFC2]">Better Immunisation Reach.</span>
                </h2>
                <p className="text-white/70 leading-relaxed mt-5 sm:mt-6 text-sm sm:text-base">
                  Incomplete settlement coverage means children are missed. Geo-ST4R deploys the Geospatial Microplanning Toolkit (GMT) at facility level — training healthcare teams to plan immunisation sessions against <em className="text-white">real settlement geography</em>, not estimated catchments.
                </p>

                <div className="mt-6 sm:mt-8 grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <h4 className="font-semibold text-white text-sm">The challenge</h4>
                    <p className="text-sm text-white/60 mt-2 leading-relaxed">Facility catchments based on estimates hide dispersed settlements — and the zero-dose children living in them.</p>
                  </div>
                  <div className="bg-[#087F83] rounded-2xl p-5">
                    <h4 className="font-semibold text-white text-sm">The solution</h4>
                    <p className="text-sm text-white/90 mt-2 leading-relaxed">GMT at facility level: mapped settlements, trained teams, and microplans grounded in actual geography.</p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                  <Link href="/projects/geo-st4r" className="inline-flex items-center justify-center gap-2 bg-white text-[#10283F] px-6 h-11 rounded-full text-sm font-semibold tracking-wide uppercase hover:bg-[#F0F3F4] transition-colors">
                    Explore the Case Study <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </Link>
                  <span className="inline-flex items-center justify-center text-xs text-white/50 border border-white/15 rounded-full px-4 py-2.5 text-center leading-tight">
                    Partners: Natview • Data Science Network • Pathfinder Intl.
                  </span>
                </div>
              </div>

              <div className="lg:w-[480px] shrink-0 min-w-0">
                <div className="bg-white rounded-2xl sm:rounded-[24px] p-3 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"
                    alt="Health workers conducting outreach with digital tools"
                    className="w-full h-56 sm:h-64 object-cover rounded-xl sm:rounded-2xl"
                  />
                  <div className="p-4">
                    <div className="text-[11px] font-semibold tracking-widest uppercase text-[#087F83]">What frontline teams get</div>
                    <ul className="mt-3 space-y-2.5 text-sm text-[#273744] list-none p-0 m-0">
                      <li className="flex gap-2.5 leading-snug"><span className="text-[#087F83] mt-0.5 shrink-0">•</span><span>Settlement-level maps for every facility catchment</span></li>
                      <li className="flex gap-2.5 leading-snug"><span className="text-[#087F83] mt-0.5 shrink-0">•</span><span>Microplanning grounded in real community locations</span></li>
                      <li className="flex gap-2.5 leading-snug"><span className="text-[#087F83] mt-0.5 shrink-0">•</span><span>Training + supportive supervision for adoption</span></li>
                    </ul>
                    <div className="mt-4 text-xs text-[#71808B] leading-relaxed">All programme imagery and maps are illustrative unless explicitly marked as project-verified.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HowWeWork />

        {/* Geospatial demo */}
        <section className="py-12 sm:py-16 lg:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-[#087F83]">
                <span className="w-8 h-px bg-[#087F83]" /> Interactive Demonstration
              </div>
              <h2 className="font-display text-[26px] sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#10283F] mt-4">See geospatial intelligence in action.</h2>
              <p className="text-[#273744] mt-4 leading-relaxed text-sm sm:text-base">Explore how facility catchments and settlement layers reveal gaps that estimated populations hide. Toggle layers, hover points, and see how microplanning becomes precise.</p>
            </div>
            <div className="mt-6 sm:mt-8">
              <GeospatialDemo />
            </div>
          </div>
        </section>

        <EngagementModels />

        {/* Leadership preview */}
        <section className="py-12 sm:py-16 lg:py-24 bg-white border-t border-[#E6EBED]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-5">
                <div className="relative bg-[#F0F3F4] rounded-[24px] sm:rounded-[32px] overflow-hidden p-6 sm:p-8">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#087F83]/10 rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[20px] sm:rounded-[24px] bg-[#10283F] overflow-hidden border-4 border-white shadow-xl">
                      <img src="/images/leadership/jamil-aliu-galadanci.jpg" alt="Jamil Aliyu Galadanci — Executive Director" className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="mt-6">
                      <h3 className="font-display font-bold text-lg sm:text-xl text-[#10283F]">Jamil Aliyu Galadanci</h3>
                      <p className="text-sm font-medium text-[#087F83] mt-1">Executive Director</p>
                      <p className="text-xs tracking-wide uppercase font-semibold text-[#71808B] mt-1 leading-snug">COREN-registered Software Engineer • Public Health Informatics</p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-white border border-[#E6EBED] text-xs font-medium">LoMIS Suite</span>
                      <span className="px-3 py-1.5 rounded-full bg-white border border-[#E6EBED] text-xs font-medium">EMID Optimisation</span>
                      <span className="px-3 py-1.5 rounded-full bg-[#10283F] text-white text-xs font-medium">PRINCE2 • ISTQB</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 min-w-0">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-[#087F83]">
                  <span className="w-8 h-px bg-[#087F83]" /> Leadership
                </div>
                <h2 className="font-display text-[26px] sm:text-3xl font-bold tracking-tight text-[#10283F] mt-4">Led by implementation experience — not just technology.</h2>
                <p className="text-[#273744] leading-relaxed mt-4 text-sm sm:text-base">
                  Jamil brings a rare blend of software engineering, public health informatics and global health programme management — from CTO roles to Senior Manager of Global Health Informatics at eHealth Africa, and research leadership at Vanderbilt.
                </p>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div className="bg-[#FAFBF9] border border-[#E6EBED] rounded-2xl p-5">
                    <div className="text-sm font-semibold text-[#10283F]">Major contributions</div>
                    <ul className="mt-3 space-y-2 text-xs text-[#273744] leading-relaxed list-none p-0 m-0">
                      <li className="flex gap-2"><span className="text-[#087F83] shrink-0">•</span><span>LoMIS — WFP Digital Health Innovation Accelerator Award 2022/2023</span></li>
                      <li className="flex gap-2"><span className="text-[#087F83] shrink-0">•</span><span>GAVI-funded optimisation of National EMID</span></li>
                      <li className="flex gap-2"><span className="text-[#087F83] shrink-0">•</span><span>BISKIT — South Africa crisis blood system</span></li>
                    </ul>
                  </div>
                  <div className="bg-[#10283F] text-white rounded-2xl p-5">
                    <div className="text-sm font-semibold">Education</div>
                    <ul className="mt-3 space-y-2 text-xs text-white/80 leading-relaxed list-none p-0 m-0">
                      <li className="flex gap-2"><span className="text-[#48BFC2]">•</span><span>MSc Computer Science (Merit) — Univ. of Bristol, UK</span></li>
                      <li className="flex gap-2"><span className="text-[#48BFC2]">•</span><span>B.Eng Computer Eng. (First Class) — Bayero Univ. Kano</span></li>
                      <li className="flex gap-2"><span className="text-[#48BFC2]">•</span><span>Johns Hopkins • Univ. of Washington</span></li>
                    </ul>
                  </div>
                </div>
                <Link href="/leadership" className="mt-6 sm:mt-8 inline-flex items-center gap-2 bg-[#10283F] text-white px-6 h-11 rounded-full text-sm font-semibold tracking-wide uppercase hover:bg-[#0A1D30] transition-colors">
                  View Complete Profile <ArrowUpRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-10 sm:py-16 bg-[#FAFBF9] border-t border-[#E6EBED]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
            <div className="bg-[#10283F] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#087F83]/20 to-transparent" />
              <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
                <div className="max-w-2xl min-w-0">
                  <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-[#48BFC2] mb-4" />
                  <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">Let&apos;s Build Health Systems That Reach Everyone.</h2>
                  <p className="text-white/70 mt-4 leading-relaxed text-sm sm:text-base">MSS collaborates with state governments, development partners, academic institutions, healthcare facilities and private investors. Whether you need an assessment, a co-designed solution or managed delivery — let&apos;s start with your communities.</p>
                </div>
                <Link href="/contact" className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#087F83] hover:bg-[#48BFC2] text-white px-6 sm:px-8 h-12 rounded-full font-semibold tracking-wide uppercase text-sm transition-colors w-full sm:w-auto text-center">
                  Start a Partnership Conversation <ArrowUpRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
              <div className="relative mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap gap-2 sm:gap-3 text-xs text-white/60">
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
