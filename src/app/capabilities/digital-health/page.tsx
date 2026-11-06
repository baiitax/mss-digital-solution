import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Eyebrow, Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowUpRight, Check, Database, Tablet, Boxes, Workflow } from "lucide-react"

export const metadata = { title: "Digital Health Systems — MSS" }

export default function DigitalHealthPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF7]">
      <Navbar />
      <main>
        <section className="bg-[#0B1930] text-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
            <div className="flex items-center gap-2 text-xs">
              <Link href="/capabilities" className="text-white/60 hover:text-white">Capabilities</Link><span className="text-white/30">›</span><span className="text-white">Digital Health Systems</span>
            </div>
            <div className="mt-6 grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7">
                <Badge variant="teal">Capability 01 — Digital Health Systems</Badge>
                <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight leading-[0.9] mt-6">Digital systems <span className="text-[#14B8A6]">health workers actually use.</span></h1>
                <p className="text-white/70 leading-relaxed mt-6">We develop and deploy digital solutions supporting healthcare delivery, reporting, recording, ordering and reconciliation — designed for intermittent connectivity, low digital literacy thresholds, and facility-reality workflows.</p>
              </div>
              <div className="lg:col-span-5">
                <div className="bg-white text-[#0B1930] rounded-[24px] p-6">
                  <h3 className="font-semibold text-sm">The challenge</h3>
                  <p className="text-sm text-[#475569] mt-2 leading-relaxed">Paper registers duplicate effort, delay reporting, and hide stock-outs and defaulters until it&apos;s too late. Systems procured without co-design become shelfware.</p>
                  <h3 className="font-semibold text-sm mt-6">MSS approach</h3>
                  <p className="text-sm text-[#475569] mt-2 leading-relaxed">Co-design with frontline teams, build for offline-first, and support adoption with training and supervision — so data quality improves and workflows get <em>easier</em>, not heavier.</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-[#E6F3F3] text-[#0E7C7B] text-xs font-medium">Offline-capable</span>
                    <span className="px-3 py-1.5 rounded-full bg-[#F1F5F9] text-[#334155] text-xs font-medium">Facility-tested</span>
                    <span className="px-3 py-1.5 rounded-full bg-[#0B1930] text-white text-xs font-medium">Co-designed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8">
                <h2 className="font-display text-2xl font-bold text-[#0B1930]">What we deliver</h2>
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  {[
                    { icon: Database, t: "Electronic Health Information Systems", d: "Capture, store and report clinical and programme data with validation and reconciliation." },
                    { icon: Tablet, t: "Digital Healthcare Delivery Platforms", d: "Outreach planning, session management, defaulter tracking and referral workflows." },
                    { icon: Boxes, t: "Immunisation Information Systems", d: "RI registers, microplan integration, coverage tracking — building on EMID optimisation experience." },
                    { icon: Workflow, t: "Logistics & Commodity Visibility", d: "Stock monitoring, cold-chain oversight and last-mile distribution — inspired by LoMIS Suite." },
                  ].map(item => (
                    <div key={item.t} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6">
                      <item.icon className="w-6 h-6 text-[#0E7C7B]" />
                      <h3 className="font-semibold text-[#0B1930] mt-3">{item.t}</h3>
                      <p className="text-sm text-[#475569] mt-2 leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>

                <h3 className="font-display font-bold text-lg text-[#0B1930] mt-10">Additional service areas</h3>
                <ul className="mt-4 grid md:grid-cols-2 gap-3">
                  {["Data collection & reconciliation", "Digital workflow optimisation", "Facility-level technology deployment", "Healthcare recording & reporting systems", "Data quality assurance", "Training, SOPs & supportive supervision"].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#334155] bg-[#FDFCF7] border border-[#E2E8F0] rounded-full px-4 py-2.5"><Check className="w-4 h-4 text-[#0E7C7B]" /> {f}</li>
                  ))}
                </ul>

                <div className="mt-8 bg-[#FFF7ED] border border-[#F59E0B]/20 rounded-2xl p-6">
                  <h4 className="font-semibold text-sm text-[#9A3412]">Demonstrated experience — distinguished from capability</h4>
                  <p className="text-sm text-[#7C2D12] mt-2 leading-relaxed"><strong>Demonstrated:</strong> LoMIS Suite (WFP Innovation Accelerator Award 2022/2023), GAVI-funded optimisation of National EMID, BISKIT in South Africa, SPRING trials. <strong>Capability:</strong> We can extend similar architectures to new programmes — but we do not claim every listed service has been deployed at scale unless explicitly documented as a case study.</p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="bg-[#0B1930] text-white rounded-[24px] p-6 sticky top-24">
                  <h3 className="font-display font-bold">Practical applications</h3>
                  <ul className="mt-4 space-y-3 text-sm text-white/80">
                    <li>• Digitise paper RI registers with offline capture</li>
                    <li>• Integrate microplans with session scheduling</li>
                    <li>• Reconcile facility reports vs. commodity consumption</li>
                    <li>• Dashboards for LGA & state programme managers</li>
                  </ul>
                  <Link href="/contact" className="mt-6 flex items-center justify-center gap-2 bg-[#0E7C7B] hover:bg-[#14B8A6] text-white h-11 rounded-full text-sm font-semibold tracking-wide uppercase">
                    Enquire — Digital Health <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <p className="text-xs text-white/50 mt-3 text-center">Replies via admin-tracked enquiries (Supabase)</p>
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
