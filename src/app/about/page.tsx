import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Eyebrow } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowUpRight, MapPinned, Lightbulb, Target, Heart, Users, Shield, Building2 } from "lucide-react"

export const metadata = {
  title: "About MSS Digital Solutions — Who We Are",
  description: "Learn about MSS Digital Solutions Ltd, a Kano-based digital health and geospatial intelligence company.",
}

const principles = [
  { title: "Co-design, not handover", desc: "We build alongside the teams that will use our systems — from facility nurses to state programme managers." },
  { title: "Geography first", desc: "Real settlement locations drive planning — not estimated catchments that hide dispersed communities." },
  { title: "Usable by design", desc: "Offline-capable, low-bandwidth, and workflow-aligned. If a facility cannot use it, it is not a solution." },
  { title: "Evidence to action", desc: "Data is only valuable when it changes decisions — dashboards, microplans and investment cases that close gaps." },
  { title: "Verify implementation", desc: "We monitor adoption and independently verify — so reports reflect field reality." },
  { title: "Partnership over procurement", desc: "Long-term implementation partner, not a one-off vendor." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF7]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#0B1930] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0E7C7B]/20 via-transparent to-transparent" />
          <div className="relative max-w-[1440px] mx-auto px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-xs font-semibold tracking-widest uppercase">
                About MSS Digital Solutions Ltd • RC 7341058
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.9] mt-6">
                A Kano-based <span className="text-[#14B8A6]">implementation partner</span> for health systems that must reach everyone.
              </h1>
              <p className="text-white/70 leading-relaxed mt-6 text-lg max-w-3xl">
                MSS Digital Solutions operates at the intersection of clinical service delivery, geospatial intelligence and actionable health data. We don&apos;t just build tools — we deploy them alongside governments, development partners and frontline workers.
              </p>
              <div className="mt-8 grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="text-white/50 text-xs tracking-widest uppercase font-bold">Incorporation</div>
                  <div className="font-semibold mt-1">9 February 2024 • Kano, Nigeria</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="text-white/50 text-xs tracking-widest uppercase font-bold">Office</div>
                  <div className="font-semibold mt-1">No. 7 Alexandria Street, Gwale LGA, Kano State</div>
                </div>
                <div className="bg-[#0E7C7B] rounded-2xl p-5">
                  <div className="text-white/80 text-xs tracking-widest uppercase font-bold">Positioning</div>
                  <div className="font-semibold mt-1">Implementation partner, not software vendor</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who we are */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 sticky top-24 self-start">
                <Eyebrow>Who We Are</Eyebrow>
                <h2 className="font-display text-3xl font-bold tracking-tight text-[#0B1930] mt-4">Digital health, geospatial and implementation — in one team.</h2>
                <p className="text-[#475569] leading-relaxed mt-4">
                  Founded in Kano, MSS brings together software engineering, public health informatics, geospatial science and programme management — so technology actually lands in facilities and changes coverage.
                </p>
                <div className="mt-6 p-5 bg-[#FDFCF7] border border-[#E2E8F0] rounded-2xl">
                  <p className="font-display italic text-[#0B1930]">&ldquo;Digital health systems, geospatial intelligence and data analytics — built to reach the communities that services have not yet reached.&rdquo;</p>
                  <p className="text-xs text-[#64748B] mt-2">Brand positioning statement</p>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6">
                    <MapPinned className="w-6 h-6 text-[#0E7C7B]" />
                    <h3 className="font-semibold text-[#0B1930] mt-3">Our Origin & Kano Advantage</h3>
                    <p className="text-sm text-[#475569] mt-2 leading-relaxed">Headquartered in Kano — close to the primary healthcare facilities, settlements and teams we serve. Proximity builds trust, shortens feedback loops and keeps solutions grounded in northern Nigeria&apos;s field reality.</p>
                  </div>
                  <div className="bg-[#0B1930] text-white rounded-2xl p-6">
                    <Building2 className="w-6 h-6 text-[#14B8A6]" />
                    <h3 className="font-semibold mt-3">Our Institutional Position</h3>
                    <p className="text-sm text-white/70 mt-2 leading-relaxed">We position as an implementation partner for governments, development partners, INGOs, donor programmes, academia and investors — capable of assessment, co-design and managed delivery.</p>
                  </div>
                </div>

                <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-8">
                  <h3 className="font-display font-bold text-xl text-[#0B1930]">Our Mission</h3>
                  <p className="text-[#334155] leading-relaxed mt-3">To develop and implement digital solutions that help healthcare systems <strong>identify underserved communities, improve planning, strengthen service delivery and make evidence-based decisions.</strong></p>
                  <h3 className="font-display font-bold text-xl text-[#0B1930] mt-8">Our Vision</h3>
                  <p className="text-[#334155] leading-relaxed mt-3">A Nigerian health system where every settlement is mapped, every facility is equipped with usable tools, and every decision is informed by timely, trustworthy data — so no community is invisible to care.</p>
                </div>

                <div className="bg-[#FDFCF7] border border-[#E2E8F0] rounded-[24px] p-8">
                  <h3 className="font-display font-bold text-xl text-[#0B1930] flex items-center gap-2"><Lightbulb className="w-5 h-5 text-[#0E7C7B]" /> Operating Philosophy</h3>
                  <div className="mt-4 bg-white border border-[#E2E8F0] rounded-2xl p-6 text-center">
                    <p className="font-display text-xl italic font-medium text-[#0B1930]">&ldquo;A tool that a facility cannot use is not a solution. It is a procurement.&rdquo;</p>
                  </div>
                  <p className="text-sm text-[#475569] leading-relaxed mt-4">This principle shapes every engagement: we assess actual workflows, co-design with frontline teams, test in low-connectivity conditions, and support adoption until systems are routine — not report artefacts.</p>
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-[#0B1930]">Our Approach to Digital Health</h3>
                  <div className="mt-4 grid gap-4">
                    {[
                      { t: "Human-centred", d: "We start with the health worker&apos;s day — registers, outreach, reconciliation — and design to reduce friction, not add forms." },
                      { t: "Geospatially aware", d: "Every system is location-aware: where settlements are, how far facilities are, where gaps persist." },
                      { t: "Data-quality obsessed", d: "From entry validation to reconciliation dashboards — better data in, better decisions out." },
                      { t: "Sustainable by ownership", d: "Government and facility teams own the system — we transfer skills, not dependency." },
                    ].map(i => (
                      <div key={i.t} className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#0E7C7B] mt-2 shrink-0" />
                        <div><span className="font-semibold text-[#0B1930] text-sm">{i.t}:</span> <span className="text-sm text-[#475569] leading-relaxed">{i.d}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="py-16 bg-[#F1F5F9] border-y border-[#E2E8F0]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-6">
                <Eyebrow>Commitment to Underserved Communities</Eyebrow>
                <h2 className="font-display text-3xl font-bold tracking-tight text-[#0B1930] mt-4">If a community is not on the map, it is not in the microplan.</h2>
                <p className="text-[#475569] leading-relaxed mt-4">Our geospatial work exists to make invisible settlements visible — so zero-dose children, remote households and migratory clusters are counted and reached.</p>
                <div className="mt-6 grid sm:grid-cols-3 gap-3">
                  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 text-center">
                    <Heart className="w-5 h-5 text-[#0E7C7B] mx-auto" />
                    <div className="text-sm font-semibold text-[#0B1930] mt-2">Equity</div>
                    <div className="text-xs text-[#64748B]">Reach the unreached</div>
                  </div>
                  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 text-center">
                    <Target className="w-5 h-5 text-[#0E7C7B] mx-auto" />
                    <div className="text-sm font-semibold text-[#0B1930] mt-2">Precision</div>
                    <div className="text-xs text-[#64748B]">Settlement-level</div>
                  </div>
                  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 text-center">
                    <Users className="w-5 h-5 text-[#0E7C7B] mx-auto" />
                    <div className="text-sm font-semibold text-[#0B1930] mt-2">Partnership</div>
                    <div className="text-xs text-[#64748B]">Co-deliver</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-8">
                  <h3 className="font-display font-bold text-lg text-[#0B1930]">Implementation Principles</h3>
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    {principles.map(p => (
                      <div key={p.title} className="bg-[#FDFCF7] border border-[#E2E8F0] rounded-2xl p-5">
                        <h4 className="font-semibold text-sm text-[#0B1930]">{p.title}</h4>
                        <p className="text-xs text-[#475569] mt-2 leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners & CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="bg-[#0B1930] rounded-[24px] p-8 lg:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-xl font-bold">Our Partners & Stakeholders</h3>
                <p className="text-white/60 text-sm mt-2 max-w-xl leading-relaxed">We work with state & federal governments, Ministries of Health, development partners, INGOs, donor-funded programmes, academic institutions and private sector health infrastructure organisations.</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">Geo-ST4R Partners: Natview Foundation • Data Science Network • Pathfinder International</span>
                </div>
              </div>
              <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#0E7C7B] hover:bg-[#14B8A6] text-white px-7 h-11 rounded-full text-sm font-semibold tracking-wide uppercase">
                Partner With MSS <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="mt-8 text-center">
              <p className="text-xs text-[#94A3B8]">All information on this page is drawn from the official MSS Digital Solutions Company Profile. Fictional founding stories, milestones or statistics have not been added.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
