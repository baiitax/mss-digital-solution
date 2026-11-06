import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { GeospatialDemo } from "@/components/maps/GeospatialDemo"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"

export const metadata = { title: "Geospatial Intelligence — MSS" }

export default function GeospatialPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF7]">
      <Navbar />
      <main>
        <section className="bg-[#0B1930] text-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
            <div className="flex items-center gap-2 text-xs"><Link href="/capabilities" className="text-white/60 hover:text-white">Capabilities</Link><span className="text-white/30">›</span><span className="text-white">Geospatial Intelligence</span></div>
            <Badge variant="teal" className="mt-6">Capability 02 — Geospatial Intelligence</Badge>
            <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight leading-[0.9] mt-4">If it&apos;s not on the map, <span className="text-[#14B8A6]">it&apos;s not in the plan.</span></h1>
            <p className="text-white/70 leading-relaxed mt-6 max-w-3xl">Settlement mapping, facility mapping, accessibility & microplanning — so teams identify underserved populations with precision, not approximation. Our flagship Geo-ST4R programme demonstrates this at facility level in Kano State.</p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <h2 className="font-display text-2xl font-bold text-[#0B1930]">What we deliver</h2>
                <div className="mt-6 grid md:grid-cols-2 gap-5">
                  {[
                    { t: "Settlement mapping", d: "Identify and ge locate settlements — including dispersed rural clusters missing from administrative lists." },
                    { t: "Health facility mapping", d: "Verify facility coordinates, infrastructure and service readiness — foundation for catchment analysis." },
                    { t: "Geospatial microplanning", d: "Plan outreach sessions against real settlement locations using the Geospatial Microplanning Toolkit (GMT)." },
                    { t: "Catchment-area analysis", d: "Model travel, proximity and overlapping catchments to reveal coverage gaps and inequities." },
                  ].map(i => (
                    <div key={i.t} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6">
                      <h3 className="font-semibold text-[#0B1930]">{i.t}</h3>
                      <p className="text-sm text-[#475569] mt-2 leading-relaxed">{i.d}</p>
                    </div>
                  ))}
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B1930] mt-8">Additional service areas</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {["Accessibility & proximity assessment", "Community identification", "Geographic coverage analysis", "Spatial data visualisation"].map(f => (
                    <li key={f} className="text-sm bg-[#FDFCF7] border border-[#E2E8F0] rounded-full px-4 py-2.5 text-[#334155]">{f}</li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-5">
                <div className="bg-[#0B1930] text-white rounded-[24px] p-6">
                  <h3 className="font-display font-bold">Before → After</h3>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="font-semibold text-white/90">Traditional planning</div>
                      <ul className="mt-2 space-y-1 text-white/60">
                        <li>• Estimated catchment pops</li>
                        <li>• Paper maps, outdated lists</li>
                        <li>• Overlapping / gapped coverage</li>
                        <li>• Missed zero-dose children</li>
                      </ul>
                    </div>
                    <div className="bg-[#0E7C7B] rounded-2xl p-4">
                      <div className="font-semibold">GMT-enabled microplanning</div>
                      <ul className="mt-2 space-y-1 text-white/90">
                        <li>• Mapped settlement locations</li>
                        <li>• Verified facility catchments</li>
                        <li>• Settlement-level session plans</li>
                        <li>• Tracked & reached communities</li>
                      </ul>
                    </div>
                  </div>
                  <Link href="/projects/geo-st4r" className="mt-6 flex items-center justify-center gap-2 bg-white text-[#0B1930] h-11 rounded-full text-sm font-semibold tracking-wide uppercase">
                    See Geo-ST4R Case Study <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#F8FAFC] border-y border-[#E2E8F0]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-[#0B1930]">Interactive demonstration — illustrative data</h2>
            <p className="text-sm text-[#475569] mt-2">All layers below are synthetic and labelled as illustrative. No confidential government, patient or programme dataset is displayed.</p>
            <div className="mt-6">
              <GeospatialDemo />
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="bg-[#FDFCF7] border border-[#E2E8F0] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display font-bold text-[#0B1930]">Ready to map your programme&apos;s gaps?</h3>
                <p className="text-sm text-[#475569] mt-1">We can assess your geospatial readiness and design a microplanning pilot.</p>
              </div>
              <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#0B1930] text-white px-6 h-11 rounded-full text-sm font-semibold tracking-wide uppercase">
                Enquire — Geospatial <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
