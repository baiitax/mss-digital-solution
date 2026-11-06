import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import Link from "next/link"
import { ArrowUpRight, MapPinned, Lightbulb, Target, Heart, Users, Building2, Quote, Compass, Layers, ShieldCheck } from "lucide-react"

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
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />
      <main>
        {/* Hero — editorial dark */}
        <section className="bg-[#343D46] text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#701F3D]/14 via-transparent to-[#252B31]/55" />
            <div className="absolute -top-28 -right-28 w-[58%] h-[78%] bg-[#701F3D]/[0.07] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          </div>
          <div className="relative container-mss py-12 sm:py-16 lg:py-20">
            <div className="mb-5"><Breadcrumbs items={[{ label: "About Us" }]} /></div>
            <div className="max-w-[920px]">
              <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.10] rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8A0B8] animate-pulse" /> About MSS Digital Solutions Ltd • RC 7341058
              </div>
              <h1 className="font-bold tracking-[-0.03em] leading-[0.92] mt-5 text-white" style={{ fontSize: "clamp(32px, 4.4vw, 58px)" }}>
                A Kano-based <span className="text-[#E8A0B8]">implementation partner</span><br />for health systems that must<br />reach everyone.
              </h1>
              <p className="text-white/65 leading-relaxed mt-5 max-w-[720px] text-[15px] sm:text-[16px] lg:text-[18px]">
                MSS operates at the intersection of clinical service delivery, geospatial intelligence and actionable health data. We don&apos;t just build tools — we deploy them alongside governments, development partners and frontline workers.
              </p>
              <div className="mt-8 grid sm:grid-cols-3 gap-3 max-w-[820px]">
                <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-5 backdrop-blur-sm">
                  <div className="text-white/45 text-[10px] tracking-[0.14em] uppercase font-bold">Incorporation</div>
                  <div className="font-semibold text-[13px] mt-1.5 leading-snug">9 February 2024<br /><span className="text-white/60">Kano, Nigeria</span></div>
                </div>
                <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-5 backdrop-blur-sm">
                  <div className="text-white/45 text-[10px] tracking-[0.14em] uppercase font-bold">Office</div>
                  <div className="font-semibold text-[13px] mt-1.5 leading-snug">No. 7 Alexandria Street<br /><span className="text-white/60">Gwale LGA, Kano State</span></div>
                </div>
                <div className="bg-[#701F3D] rounded-2xl p-5">
                  <div className="text-white/70 text-[10px] tracking-[0.14em] uppercase font-bold">Positioning</div>
                  <div className="font-semibold text-[13px] mt-1.5 leading-snug">Implementation partner,<br />not software vendor</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who we are — editorial 2-col with sticky + doc image */}
        <section className="section-y bg-white">
          <div className="container-mss">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-[88px] self-start">
                <div className="eyebrow">Who We Are</div>
                <h2 className="font-bold tracking-[-0.02em] leading-[0.98] text-[#252B31] mt-4" style={{ fontSize: "clamp(26px, 2.6vw, 38px)" }}>
                  Digital health,<br />geospatial and<br /><span className="text-[#701F3D]">implementation</span> —<br />in one team.
                </h2>
                <p className="text-[#343D46]/75 leading-relaxed mt-5 text-[15px]">
                  Founded in Kano, MSS brings together software engineering, public health informatics, geospatial science and programme management — so technology actually lands in facilities and changes coverage.
                </p>
                <div className="mt-6 bg-[#FAF9F7] border border-[#E8EAEC] rounded-2xl p-5">
                  <Quote className="w-5 h-5 text-[#701F3D]/30 mb-2" />
                  <p className="font-medium italic leading-snug text-[#252B31] text-[15px]">&ldquo;Digital health systems, geospatial intelligence and data analytics — built to reach the communities that services have not yet reached.&rdquo;</p>
                  <p className="text-[11px] tracking-[0.08em] uppercase text-[#89929B] mt-3">Brand positioning statement</p>
                </div>
                {/* Documentary image */}
                <div className="mt-6 rounded-2xl overflow-hidden border border-[#E8EAEC] shadow-card hidden lg:block">
                  <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop" alt="Kano field coordination" className="w-full h-[260px] object-cover" loading="lazy" />
                  <div className="px-4 py-3 flex items-center justify-between bg-white">
                    <span className="text-[11px] tracking-[0.08em] uppercase font-semibold text-[#89929B]">Kano • Field coordination</span>
                    <span className="w-2 h-2 rounded-full bg-[#701F3D]" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-2xl p-6 hover:shadow-card transition-shadow">
                    <div className="w-9 h-9 rounded-xl bg-[#252B31] flex items-center justify-center"><MapPinned className="w-4 h-4 text-white" /></div>
                    <h3 className="font-bold text-[#252B31] mt-4 text-[15px]">Our Origin & Kano Advantage</h3>
                    <p className="text-[13px] text-[#343D46]/75 mt-2 leading-relaxed">Headquartered in Kano — close to PHC facilities, settlements and teams we serve. Proximity builds trust, shortens feedback loops and keeps solutions grounded in field reality.</p>
                  </div>
                  <div className="bg-[#252B31] text-white rounded-2xl p-6 shadow-[0_16px_40px_rgba(16,40,63,0.18)]">
                    <div className="w-9 h-9 rounded-xl bg-[#701F3D] flex items-center justify-center"><Building2 className="w-4 h-4 text-white" /></div>
                    <h3 className="font-bold mt-4 text-[15px]">Our Institutional Position</h3>
                    <p className="text-[13px] text-white/60 mt-2 leading-relaxed">Implementation partner for governments, development partners, INGOs, donor programmes, academia and investors — assessment, co-design and managed delivery.</p>
                  </div>
                </div>

                <div className="bg-white border border-[#E8EAEC] rounded-[20px] p-6 sm:p-8 shadow-card">
                  <div className="flex items-center gap-2 text-[#701F3D] text-[11px] tracking-[0.12em] uppercase font-bold"><Compass className="w-4 h-4" /> Mission</div>
                  <p className="text-[#252B31] leading-relaxed mt-3 font-medium text-[15px]">To develop and implement digital solutions that help healthcare systems <span className="bg-[#F9E9EE] px-1 rounded">identify underserved communities, improve planning, strengthen service delivery and make evidence-based decisions.</span></p>
                  <div className="h-px bg-[#E8EAEC] my-6" />
                  <div className="flex items-center gap-2 text-[#701F3D] text-[11px] tracking-[0.12em] uppercase font-bold"><Target className="w-4 h-4" /> Vision <span className="ml-1 px-2 py-0.5 rounded-full bg-[#F0F1F2] text-[#59636D] text-[9.5px] font-bold tracking-[0.08em] normal-case">proposed — awaiting approval</span></div>
                  <p className="text-[#343D46]/80 leading-relaxed mt-3 text-[14px]">A Nigerian health system where every settlement is mapped, every facility is equipped with usable tools, and every decision is informed by timely, trustworthy data — so no community is invisible to care.</p>
                </div>

                <div className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-[20px] p-6 sm:p-7">
                  <h3 className="font-bold text-[#252B31] flex items-center gap-2 text-[14px]"><Lightbulb className="w-4 h-4 text-[#701F3D]" /> Operating Philosophy</h3>
                  <div className="mt-4 bg-white border border-[#E8EAEC] rounded-2xl p-6 text-center shadow-sm">
                    <p className="font-bold italic tracking-[-0.01em] text-[#252B31]" style={{ fontSize: "clamp(16px, 1.8vw, 20px)" }}>&ldquo;A tool that a facility cannot use is not a solution. It is a procurement.&rdquo;</p>
                  </div>
                  <p className="text-[13px] text-[#343D46]/70 leading-relaxed mt-4">This principle shapes every engagement: we assess actual workflows, co-design with frontline teams, test in low-connectivity conditions, and support adoption until systems are routine — not report artefacts.</p>
                </div>

                <div className="bg-white border border-[#E8EAEC] rounded-[20px] p-6 sm:p-7">
                  <h3 className="font-bold text-[#252B31] text-[15px]">Our Approach to Digital Health</h3>
                  <div className="mt-4 grid gap-3">
                    {[
                      { t: "Human-centred", d: "We start with the health worker's day — registers, outreach, reconciliation — and design to reduce friction, not add forms." },
                      { t: "Geospatially aware", d: "Every system is location-aware: where settlements are, how far facilities are, where gaps persist." },
                      { t: "Data-quality obsessed", d: "From entry validation to reconciliation dashboards — better data in, better decisions out." },
                      { t: "Sustainable by ownership", d: "Government and facility teams own the system — we transfer skills, not dependency." },
                    ].map(i => (
                      <div key={i.t} className="flex gap-3 bg-[#FAF9F7] border border-[#E8EAEC] rounded-xl px-4 py-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#701F3D] mt-2 shrink-0" />
                        <div><span className="font-bold text-[#252B31] text-[13px]">{i.t}:</span> <span className="text-[13px] text-[#343D46]/75 leading-relaxed">{i.d}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Purpose */}
        <section className="section-y bg-white border-t border-[#E8EAEC]">
          <div className="container-mss">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <div className="eyebrow">Our Purpose</div>
                <h2 className="font-bold tracking-[-0.02em] leading-[0.98] text-[#252B31] mt-4" style={{ fontSize: "clamp(24px, 2.6vw, 36px)" }}>
                  To shorten the distance between<br /><span className="text-[#701F3D]">where services are planned</span><br />and where people live.
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-4 text-[#343D46] leading-relaxed text-[15px]">
                <p>
                  Three things have to hold together for a health system to reach the communities it has not yet reached. First, primary healthcare delivery must be planned at the level where services are actually given — the facility and its settlements. Second, geospatial intelligence must establish where those settlements and facilities actually are. Third, health data must arrive in a form that supports a decision before the planning window closes.
                </p>
                <p>
                  When any one of the three is missing, the system defaults to estimates. Plans are built on population figures that assume an even distribution of people across a catchment that does not exist. Sessions are scheduled by radius rather than by settlement. Data arrives after the resource decision has already been made.
                </p>
                <p>
                  MSS exists to hold the three together. Geography tells us where to look; systems capture what happens in the facility; analysis converts it into a decision. That is the sequence we work in, and it is why our capabilities are presented as one practice rather than four separate services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Background + Registration */}
        <section className="section-y bg-[#FAF9F7] border-y border-[#E8EAEC]">
          <div className="container-mss">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-7">
                <div className="eyebrow">Company Background</div>
                <h2 className="font-bold tracking-tight text-[#252B31] mt-4" style={{ fontSize: "clamp(24px, 2.6vw, 34px)" }}>A young company with a specific mandate.</h2>
                <div className="mt-5 space-y-4 text-[#343D46] leading-relaxed text-[15px]">
                  <p>
                    MSS Digital Solutions Ltd was incorporated in Nigeria in February 2024 and is headquartered in Kano State. The company was established to work on a defined problem set: the gap between health systems that are planned administratively and populations that are distributed geographically.
                  </p>
                  <p>
                    The company operates as an implementation partner. Its work spans digital health systems, geospatial intelligence, data analytics and programme management — but the organising question is consistent across all four: will this be used by the team that delivers the service?
                  </p>
                  <p>
                    That orientation shapes how MSS engages. Rather than supplying software and departing, MSS participates in assessment, co-design, deployment, training and verification. Where a programme requires field coordination, that coordination is part of the engagement rather than an assumption about the client&rsquo;s capacity.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-white border border-[#E8EAEC] rounded-[20px] p-6 shadow-card">
                  <h3 className="font-bold text-[#252B31] text-[15px] flex items-center gap-2"><Building2 className="w-4 h-4 text-[#701F3D]" /> Corporate Registration Information</h3>
                  <dl className="mt-5 space-y-3.5">
                    {[
                      ["Registered name", "MSS Digital Solutions Ltd."],
                      ["Registration number", "RC 7341058"],
                      ["Incorporation date", "9 February 2024"],
                      ["Registered jurisdiction", "Federal Republic of Nigeria"],
                      ["Head office", "No. 7 Alexandria Street, Gwale LGA, Kano State, Nigeria"],
                      ["Sector", "Digital Health Technology & Geospatial Intelligence"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex flex-col gap-0.5 pb-3 border-b border-[#F0F1F2] last:border-0 last:pb-0">
                        <dt className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-[#89929B]">{k}</dt>
                        <dd className="text-[13px] text-[#252B31] leading-snug">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="text-[11px] text-[#89929B] mt-4 leading-relaxed">
                    Registration details are published as supplied in the MSS company profile. No certifications, accreditations or memberships are claimed on this website beyond those stated.
                  </p>
                </div>

                <div className="mt-4 bg-[#252B31] text-white rounded-[20px] p-6">
                  <h3 className="font-bold text-[15px]">Institutional positioning</h3>
                  <p className="text-[13px] text-white/70 mt-2 leading-relaxed">
                    MSS positions itself as an implementation partner rather than a technology vendor: engaged for the outcome — services reaching settlements — not for the delivery of an artefact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="section-y bg-[#F0F1F2] border-y border-[#E8EAEC]">
          <div className="container-mss">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-5">
                <div className="eyebrow">Commitment to Underserved Communities</div>
                <h2 className="font-bold tracking-[-0.02em] leading-[0.98] text-[#252B31] mt-4" style={{ fontSize: "clamp(24px, 2.4vw, 34px)" }}>If a community is not on the map, it is not in the microplan.</h2>
                <p className="text-[#343D46]/70 leading-relaxed mt-4 text-[15px]">Our geospatial work exists to make invisible settlements visible — so zero-dose children, remote households and migratory clusters are counted and reached.</p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { icon: Heart, label: "Equity", sub: "Reach the unreached" },
                    { icon: Target, label: "Precision", sub: "Settlement-level" },
                    { icon: Users, label: "Partnership", sub: "Co-deliver" },
                  ].map(c => (
                    <div key={c.label} className="bg-white border border-[#E8EAEC] rounded-2xl p-4 text-center">
                      <c.icon className="w-5 h-5 text-[#701F3D] mx-auto" />
                      <div className="text-[13px] font-bold text-[#252B31] mt-2">{c.label}</div>
                      <div className="text-[11px] text-[#89929B]">{c.sub}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl overflow-hidden border border-[#E8EAEC] hidden lg:block">
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop" alt="Settlement outreach" className="w-full h-[220px] object-cover" loading="lazy" />
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="bg-white rounded-[20px] border border-[#E8EAEC] p-6 sm:p-8 shadow-card">
                  <div className="flex items-center gap-2 text-[#701F3D] text-[11px] tracking-[0.12em] uppercase font-bold"><ShieldCheck className="w-4 h-4" /> Implementation Principles</div>
                  <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    {principles.map(p => (
                      <div key={p.title} className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-2xl p-5 hover:border-[#701F3D]/20 transition-colors">
                        <h4 className="font-bold text-[13px] text-[#252B31]">{p.title}</h4>
                        <p className="text-[12.5px] text-[#343D46]/70 mt-2 leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 bg-[#252B31] rounded-2xl p-6 text-white flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0"><Layers className="w-5 h-5 text-[#E8A0B8]" /></div>
                  <p className="text-[13px] text-white/70 leading-relaxed">We co-design microplans facility-by-facility, settlement-by-settlement — so outreach is routed to where children actually live, not where catchments assume they do.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners & CTA */}
        <section className="section-y bg-white">
          <div className="container-mss">
            <div className="bg-[#252B31] rounded-[24px] p-6 sm:p-8 lg:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_20px_60px_rgba(16,40,63,0.18)]">
              <div>
                <h3 className="font-bold text-[18px] sm:text-[20px]">Our Partners & Stakeholders</h3>
                <p className="text-white/60 text-[13px] mt-2 max-w-xl leading-relaxed">We work with state & federal governments, Ministries of Health, development partners, INGOs, donor-funded programmes, academic institutions and private sector health infrastructure organisations.</p>
                <div className="mt-4 inline-flex flex-wrap gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.10] text-[11px] font-medium tracking-wide">Geo-ST4R Partners: Natview Foundation • Data Science Network • Pathfinder International</span>
                </div>
              </div>
              <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#701F3D] hover:bg-[#E8A0B8] text-white px-7 h-11 rounded-full text-[13px] font-semibold tracking-[0.06em] uppercase transition-colors">
                Partner With MSS <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-center text-[11px] text-[#89929B] mt-6 max-w-[720px] mx-auto">All information on this page is drawn from the official MSS Digital Solutions Company Profile. Fictional founding stories, milestones or statistics have not been added.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
