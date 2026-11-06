import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export const metadata = { title: "Data Analytics & Intelligence — MSS" }

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />
      <main>
        <section className="bg-[#252B31] text-white">
          <div className="container-mss py-12 lg:py-16">
            <div className="text-xs flex items-center gap-2"><Link href="/capabilities" className="text-white/60">Capabilities</Link><span className="text-white/30">›</span><span>Data Analytics</span></div>
            <Badge variant="teal" className="mt-6">Capability 03 — Data Analytics & Intelligence</Badge>
            <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight leading-[0.9] mt-4">Turn routine data <span className="text-[#E8A0B8]">into decisions.</span></h1>
            <p className="text-white/70 leading-relaxed mt-6 max-w-3xl">We transform routine and survey data into actionable insights for programme monitoring, resource allocation and evidence-based decisions — with a relentless focus on data quality.</p>
          </div>
        </section>

        <section className="section-y bg-white">
          <div className="container-mss">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8">
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { t: "Health data analytics", d: "End-to-end analysis of HMIS, RI and programme data — from cleaning to insight." },
                    { t: "Routine & survey data analysis", d: "DHIS2, EMID, survey datasets and bespoke registers — harmonised and interrogated." },
                    { t: "Data quality assessment", d: "Completeness, timeliness, consistency and validity checks — with facility-level feedback." },
                    { t: "Coverage gap identification", d: "Detect underperforming LGAs, facilities and settlements — and quantify what it will take to close gaps." },
                  ].map(i => (
                    <div key={i.t} className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-2xl p-6">
                      <h3 className="font-semibold text-[#252B31]">{i.t}</h3>
                      <p className="text-sm text-[#343D46] mt-2 leading-relaxed">{i.d}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-[#FAF9F7] border border-[#E8EAEC] rounded-[24px] p-8">
                  <h3 className="font-display font-bold text-xl text-[#252B31]">Programme performance dashboards</h3>
                  <p className="text-sm text-[#343D46] mt-3 leading-relaxed">We design dashboards that programme managers actually open: coverage by geography, timeliness of reporting, stock vs. consumption, and settlement-level reach. Built for decision cadence — not data theatre.</p>
                  <div className="mt-6 bg-white border border-[#E8EAEC] rounded-2xl overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-[#252B31] via-[#343D46] to-[#701F3D] relative p-6 flex flex-col justify-end">
                      <div className="absolute top-4 left-4 bg-white/10 backdrop-blur border border-white/15 rounded-full px-3 py-1.5 text-xs text-white font-medium">Illustrative Dashboard • Synthetic data</div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white rounded-xl p-3"><div className="text-[11px] tracking-widest uppercase font-bold text-[#89929B]">Reporting Timeliness</div><div className="text-xl font-bold text-[#252B31] mt-1">84%</div><div className="h-1.5 bg-[#E8EAEC] rounded-full mt-2"><div className="h-full bg-[#701F3D] w-[84%] rounded-full" /></div></div>
                        <div className="bg-white rounded-xl p-3"><div className="text-[11px] tracking-widest uppercase font-bold text-[#89929B]">Settlements Reached</div><div className="text-xl font-bold text-[#252B31] mt-1">72%</div><div className="h-1.5 bg-[#E8EAEC] rounded-full mt-2"><div className="h-full bg-[#252B31] w-[72%] rounded-full" /></div></div>
                        <div className="bg-[#701F3D] rounded-xl p-3 text-white"><div className="text-[11px] tracking-widest uppercase font-bold text-white/70">Action</div><div className="text-sm font-semibold mt-1 leading-tight">3 LGAs flagged for supportive supervision</div></div>
                      </div>
                    </div>
                    <div className="p-4 text-xs text-[#89929B]">Illustrative visualisation — not operational programme data. All MSS analytics visualisations use synthetic data unless marked as project-verified.</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="bg-[#252B31] text-white rounded-[24px] p-6 sticky top-24">
                  <h3 className="font-display font-bold">More service areas</h3>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    <li>• Evidence-based decision support</li>
                    <li>• Research & reporting</li>
                    <li>• Survey design & analysis</li>
                    <li>• Investment case analytics</li>
                  </ul>
                  <Link href="/contact" className="mt-6 flex items-center justify-center gap-2 bg-[#701F3D] text-white h-11 rounded-full text-sm font-semibold tracking-wide uppercase">
                    Enquire — Analytics <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
