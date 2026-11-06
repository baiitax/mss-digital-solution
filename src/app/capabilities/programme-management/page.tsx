import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export const metadata = { title: "Programme & Project Management — MSS" }

export default function PMPage() {
  return (
    <div className="min-h-screen bg-[#FAFBF9]">
      <Navbar />
      <main>
        <section className="bg-[#10283F] text-white">
          <div className="container-mss py-12 lg:py-16">
            <div className="text-xs flex items-center gap-2"><Link href="/capabilities" className="text-white/60">Capabilities</Link><span className="text-white/30">›</span><span>Programme & Project Management</span></div>
            <Badge variant="teal" className="mt-6">Capability 04 — Programme & Project Management</Badge>
            <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight leading-[0.9] mt-4">From plan <span className="text-[#48BFC2]">to verified adoption.</span></h1>
            <p className="text-white/70 leading-relaxed mt-6 max-w-3xl">Programme design, implementation management, stakeholder coordination, field deployment, training, monitoring and independent verification — the connective tissue between technology and coverage.</p>
          </div>
        </section>

        <section className="section-y bg-white">
          <div className="container-mss">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8">
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { t: "Programme design", d: "Theory of change, workplans, KPIs and risk registers — built with government and partner stakeholders." },
                    { t: "Implementation management", d: "Day-to-day coordination, field deployment, issue resolution and partner alignment." },
                    { t: "Stakeholder coordination", d: "Federal, state, LGA and facility layers — plus development partners — moved in rhythm." },
                    { t: "Partner engagement", d: "Joint planning, shared metrics and transparent reporting across consortia." },
                  ].map(i => (
                    <div key={i.t} className="bg-[#FAFBF9] border border-[#E6EBED] rounded-2xl p-6">
                      <h3 className="font-semibold text-[#10283F]">{i.t}</h3>
                      <p className="text-sm text-[#273744] mt-2 leading-relaxed">{i.d}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-5">
                  {[
                    { t: "Field deployment", d: "Logistics, personnel, facility onboarding and supportive supervision at scale." },
                    { t: "Training & capacity building", d: "Role-specific, competency-based training with post-training mentorship." },
                    { t: "Monitoring & evaluation", d: "Routine monitoring, learning loops and adaptive management." },
                    { t: "Independent verification", d: "Unbiased assessment of implementation fidelity and data quality." },
                  ].map(i => (
                    <div key={i.t} className="bg-[#FAFBF9] border border-[#E6EBED] rounded-2xl p-6">
                      <h3 className="font-semibold text-[#10283F]">{i.t}</h3>
                      <p className="text-sm text-[#273744] mt-2 leading-relaxed">{i.d}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-[#10283F] text-white rounded-[24px] p-8">
                  <h3 className="font-display font-bold text-lg">How we work — in practice</h3>
                  <div className="mt-6 grid sm:grid-cols-4 gap-4 text-center">
                    {[
                      { n: "01", t: "Assess & Measure" },
                      { n: "02", t: "Co-design & Build" },
                      { n: "03", t: "Deploy & Strengthen" },
                      { n: "04", t: "Monitor & Verify" },
                    ].map(s => (
                      <div key={s.n} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                        <div className="font-mono text-sm font-bold text-[#48BFC2]">{s.n}</div>
                        <div className="text-sm font-semibold mt-1">{s.t}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-white/60 mt-6 leading-relaxed">This four-stage methodology is applied consistently — from geospatial microplanning pilots to statewide digital system rollouts.</p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="bg-white border border-[#E6EBED] rounded-[24px] p-6 sticky top-24">
                  <h3 className="font-display font-bold text-[#10283F]">Why MSS for delivery?</h3>
                  <ul className="mt-4 space-y-3 text-sm text-[#273744]">
                    <li>• Kano-based — proximity to field teams</li>
                    <li>• Tech + PH informatics + programme delivery in one house</li>
                    <li>• Proven partner network (Geo-ST4R)</li>
                    <li>• Verification mindset — we check our own work</li>
                  </ul>
                  <Link href="/contact" className="mt-6 flex items-center justify-center gap-2 bg-[#10283F] text-white h-11 rounded-full text-sm font-semibold tracking-wide uppercase">
                    Enquire — Delivery <ArrowUpRight className="w-4 h-4" />
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
