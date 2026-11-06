import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { GeospatialDemo } from "@/components/maps/GeospatialDemo"
import { Badge, Eyebrow } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowUpRight, MapPinned, Users, Layers, GraduationCap, Check, AlertTriangle } from "lucide-react"

export const metadata = { title: "Geo-ST4R: Geospatial Microplanning for Better Immunisation Reach in Kano State — MSS" }

export default function GeoST4RPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF7]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#0B1930] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0E7C7B]/25 via-transparent to-[#0EA5E9]/10" />
          <div className="relative max-w-[1440px] mx-auto px-6 lg:px-8 py-12 lg:py-20">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-xs font-semibold tracking-widest uppercase">
                <MapPinned className="w-4 h-4 text-[#14B8A6]" /> Flagship Programme • Kano State
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight leading-[0.9] mt-6">
                Geo-ST4R: Geospatial<br />
                Microplanning for Better<br />
                <span className="text-[#14B8A6]">Immunisation Reach</span> in Kano State.
              </h1>
              <p className="text-white/70 leading-relaxed mt-6 text-lg max-w-3xl">
                Facility-level deployment of the <strong className="text-white">Geospatial Microplanning Toolkit (GMT)</strong> — training healthcare teams to plan immunisation sessions against <em className="text-white">mapped settlement geography</em>, so previously missed zero-dose children are identified and reached.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-[#0E7C7B] text-white text-xs font-semibold tracking-wide uppercase">Geospatial Microplanning Toolkit (GMT)</span>
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white text-xs font-semibold">Facility-Level Implementation</span>
                <span className="px-4 py-2 rounded-full bg-white text-[#0B1930] text-xs font-semibold">Illustrative maps — synthetic data</span>
              </div>
            </div>

            <div className="mt-10 grid lg:grid-cols-3 gap-6">
              <div className="bg-white text-[#0B1930] rounded-[24px] p-6">
                <h3 className="font-semibold text-sm">Context & Background</h3>
                <p className="text-sm text-[#475569] mt-2 leading-relaxed">Kano&apos;s population is large, young and geographically dispersed. Traditional microplanning using estimated catchment populations leaves settlements invisible — and children unreached.</p>
              </div>
              <div className="bg-[#0E7C7B] rounded-[24px] p-6 text-white">
                <h3 className="font-semibold text-sm">Healthcare Planning Challenge</h3>
                <p className="text-sm text-white/90 mt-2 leading-relaxed">When plans are based on estimates, outreach sessions are scheduled for the wrong places — or not scheduled at all for settlements beyond perceived radii.</p>
              </div>
              <div className="bg-white/5 backdrop-blur border border-white/15 rounded-[24px] p-6">
                <h3 className="font-semibold text-sm">Zero-Dose Challenge</h3>
                <p className="text-sm text-white/70 mt-2 leading-relaxed">Zero-dose children cluster in unmapped, underserved settlements. Without settlement-level visibility, they remain missed by routine immunisation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-10">
                <div>
                  <Eyebrow>The Geospatial Microplanning Toolkit (GMT)</Eyebrow>
                  <h2 className="font-display text-2xl font-bold text-[#0B1930] mt-4">From estimated catchments to mapped settlements.</h2>
                  <p className="text-[#475569] leading-relaxed mt-4">The GMT helps frontline teams understand <strong className="text-[#0B1930]">where communities are actually located</strong> and plan immunisation sessions against real geography. Facility teams work with settlement-level maps, not assumptions.</p>
                  
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5">
                      <h4 className="font-semibold text-sm text-[#0B1930]">Before — Estimated catchments</h4>
                      <ul className="mt-3 space-y-1.5 text-sm text-[#475569]">
                        <li>• Population divided by facility count</li>
                        <li>• Paper lists, outdated settlements</li>
                        <li>• Overlapping / gapped coverage</li>
                      </ul>
                    </div>
                    <div className="bg-[#F0FDFA] border border-[#0E7C7B]/20 rounded-2xl p-5">
                      <h4 className="font-semibold text-sm text-[#0B1930]">After — Mapped settlements</h4>
                      <ul className="mt-3 space-y-1.5 text-sm text-[#334155]">
                        <li>• Every settlement geolocated</li>
                        <li>• Facility catchments verified</li>
                        <li>• Settlement-level microplans</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-[#0B1930]">Implementation Methodology</h2>
                  <div className="mt-6 space-y-4">
                    {[
                      { n: "01", t: "Facility-level deployment", d: "GMT introduced at health facility level — where microplans are actually made and outreach scheduled." },
                      { n: "02", t: "Healthcare worker training", d: "Hands-on training of healthcare teams in map reading, settlement identification and GMT-based session planning." },
                      { n: "03", t: "Settlement-level mapping", d: "Verification and enrichment of settlement data — so every community appears in the microplan." },
                      { n: "04", t: "Microplanning & implementation", d: "Teams produce settlement-grounded microplans and execute outreach accordingly — with supervision." },
                    ].map(s => (
                      <div key={s.n} className="flex gap-4 bg-white border border-[#E2E8F0] rounded-2xl p-5">
                        <div className="w-10 h-10 rounded-xl bg-[#0B1930] text-white flex items-center justify-center font-mono text-sm font-bold shrink-0">{s.n}</div>
                        <div>
                          <div className="font-semibold text-[#0B1930]">{s.t}</div>
                          <div className="text-sm text-[#475569] mt-1 leading-relaxed">{s.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FFF7ED] border border-[#F59E0B]/20 rounded-2xl p-6">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#9A3412] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-[#9A3412]">Content Integrity Notice</h4>
                      <p className="text-sm text-[#7C2D12] mt-2 leading-relaxed">
                        All maps and settlement/facility points shown on this site are <strong>illustrative synthetic demonstrations</strong> explicitly labelled as such. No project dates, financial values, exact facility counts, beneficiary counts or quantified impact statistics are published unless verified and approved by MSS and its partners. Do not interpret illustrative visualisations as actual Geo-ST4R operational data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[24px] p-6 sticky top-24">
                  <h3 className="font-display font-bold text-[#0B1930]">Visual Storytelling — Illustrative</h3>
                  <div className="mt-4 space-y-4">
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=600&auto=format&fit=crop" alt="Kano State map visualisation — illustrative, not operational" className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <div className="text-xs font-semibold tracking-widest uppercase text-[#0E7C7B]">Kano State — Illustrative Extent</div>
                        <p className="text-xs text-[#64748B] mt-1">Synthetic boundaries for demonstration. Not operational shapefile.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4">
                        <div className="text-sm font-semibold text-[#0B1930]">Field implementation</div>
                        <img src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=300&auto=format&fit=crop" alt="Healthcare workers training on microplanning" className="w-full h-24 object-cover rounded-xl mt-3" />
                        <p className="text-xs text-[#64748B] mt-2">Training & supportive supervision</p>
                      </div>
                      <div className="bg-[#0B1930] text-white rounded-2xl p-4">
                        <div className="text-sm font-semibold">Conceptual GMT interface</div>
                        <div className="mt-3 bg-white/10 border border-white/15 rounded-xl p-3">
                          <div className="h-2 bg-white/20 rounded-full w-3/4" />
                          <div className="h-2 bg-[#14B8A6] rounded-full w-1/2 mt-2" />
                          <div className="flex gap-1 mt-3">
                            <span className="w-2 h-2 rounded-full bg-[#0E7C7B]" /><span className="w-2 h-2 rounded-full bg-[#059669]" /><span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                          </div>
                        </div>
                        <p className="text-xs text-white/60 mt-2">Settlement selection & session assignment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive map */}
        <section className="py-12 bg-[#F1F5F9] border-y border-[#E2E8F0]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <Eyebrow>Interactive — Illustrative Kano Settlement & Facility Layers</Eyebrow>
            <h2 className="font-display text-2xl font-bold text-[#0B1930] mt-4">Explore how GMT thinking reveals gaps.</h2>
            <p className="text-sm text-[#475569] mt-2">Toggle layers, hover points — experience settlement-level microplanning. All data synthetic and labelled.</p>
            <div className="mt-6">
              <GeospatialDemo />
            </div>
          </div>
        </section>

        {/* Outcomes & partners */}
        <section className="py-12 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7">
                <h2 className="font-display text-2xl font-bold text-[#0B1930]">Outcomes & Programme Contribution</h2>
                <p className="text-[#475569] leading-relaxed mt-4">Geo-ST4R strengthens facility teams&apos; ability to plan against real settlement geography — contributing to identification and reaching of previously missed zero-dose children. No beneficiary counts, financial values or quantified impact percentages are published on this site; verified programme results will be released only with partner approval and appropriate attribution.</p>
                
                <h3 className="font-display font-bold text-lg text-[#0B1930] mt-8">Replicability Across Other States</h3>
                <p className="text-[#475569] leading-relaxed mt-3">The facility-level, settlement-grounded approach is designed to scale: settlement mapping → GMT deployment → team training → supervised microplanning → verification. Each state adapts to its own settlement geography, facility network and programme cadence.</p>

                <div className="mt-8 bg-[#FDFCF7] border border-[#E2E8F0] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-[#0B1930]">Replicate Geo-ST4R in your state?</h4>
                    <p className="text-sm text-[#475569] mt-1">Let&apos;s assess your geospatial readiness and co-design a pilot.</p>
                  </div>
                  <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#0E7C7B] hover:bg-[#14B8A6] text-white px-6 h-11 rounded-full text-sm font-semibold tracking-wide uppercase">
                    Start Replication Conversation <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-[#0B1930] text-white rounded-[24px] p-8">
                  <h3 className="font-display font-bold">Implementation Partners</h3>
                  <p className="text-white/60 text-sm mt-2 leading-relaxed">Geo-ST4R is delivered with trusted partners — each bringing complementary expertise.</p>
                  <div className="mt-6 space-y-4">
                    {[
                      { name: "Natview Foundation", role: " geospatial & community intelligence" },
                      { name: "Data Science Network", role: "data science & analytics" },
                      { name: "Pathfinder International", role: "public health & programme expertise" },
                    ].map(p => (
                      <div key={p.name} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#0B1930] font-bold text-sm shrink-0">◉</div>
                        <div>
                          <div className="font-semibold text-sm">{p.name}</div>
                          <div className="text-xs text-white/60">{p.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-white/40 mt-6">No partnership, funding or contract values are disclosed on this website. Verified partnership scope and achievements will be published with explicit partner approval.</p>
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
