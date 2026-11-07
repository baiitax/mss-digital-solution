import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import Link from "next/link"
import { Figure } from "@/components/ui/Figure"
import { ArrowUpRight, Search, Pencil, Rocket, Eye, Check, Users, ShieldCheck, Clock } from "lucide-react"

export const metadata = { title: "How We Work — Implementation Methodology | MSS Digital Solutions" }

export default function HowWeWorkPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#343D46] text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#701F3D]/16 via-transparent to-[#252B31]/60" />
            <div className="absolute -top-28 -right-28 w-[55%] h-[78%] bg-[#701F3D]/[0.07] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          </div>
          <div className="relative container-mss py-14 sm:py-16 lg:py-20">
            <div className="mb-5"><Breadcrumbs items={[{ label: "How We Work" }]} /></div>
            <div className="max-w-[900px]">
              <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.10] rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8A0B8] animate-pulse" /> How We Work • Implementation partner, not vendor
              </div>
              <h1 className="font-bold tracking-[-0.03em] leading-[0.92] mt-5 text-white" style={{ fontSize: "clamp(32px, 4.4vw, 56px)" }}>
                Designed with the people<br />
                who <span className="text-[#E8A0B8]">deliver the service</span><br />— every time.
              </h1>
              <p className="text-white/65 leading-relaxed mt-5 max-w-[720px] text-[16px]">
                Technology only matters when it is used. Our methodology answers a different question from our capabilities: <em className="text-white">how</em> MSS moves from understanding a health system to verifying that systems are actually adopted.
              </p>
              <div className="mt-8 flex flex-wrap gap-2 text-[11px]">
                <span className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70">Kano-based • Field-present</span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#701F3D] text-white font-medium">Co-design → Deploy → Verify</span>
              </div>
            </div>
          </div>
        </section>

        {/* Four stages */}
        <section className="section-y bg-white">
          <div className="container-mss">
            <div className="max-w-3xl">
              <div className="eyebrow">Methodology</div>
              <h2 className="font-bold tracking-tight text-[#252B31] mt-4" style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}>Four stages. One adoption outcome.</h2>
              <p className="text-[#59636D] mt-4 leading-relaxed">Each stage has distinct activities, artefacts and exit criteria. We do not skip to build before we understand geography.</p>
            </div>

            <div className="mt-10 grid lg:grid-cols-4 gap-5">
              {[
                {
                  n: "01",
                  icon: Search,
                  image: "stage-assess-community" as const,
                  title: "Assess & Measure",
                  q: "What is actually happening on the ground?",
                  items: ["Catchment & settlement geography mapping", "Facility readiness & workforce audit", "Coverage gap & data quality diagnostics", "PHC register / paper flow review"],
                  deliverable: "Baseline & readiness report",
                },
                {
                  n: "02",
                  icon: Pencil,
                  image: "stage-co-design-workshop" as const,
                  title: "Co-design & Build",
                  q: "What will teams actually use — and how?",
                  items: ["Human-centred sprints with nurses, recorders, LGA teams", "Offline-first prototyping & workflow alignment", "Geospatial Toolkit (GMT) configuration", "Pilot in real facilities with feedback loops"],
                  deliverable: "Tested prototype + SOPs",
                },
                {
                  n: "03",
                  icon: Rocket,
                  image: "stage-deploy-service-delivery" as const,
                  title: "Deploy & Strengthen",
                  q: "How do we make adoption stick?",
                  items: ["Facility-level rollout & supportive supervision", "Role-based training & mentorship", "Partner & LGA coordination cadence", "Issue logs → rapid iteration"],
                  deliverable: "Adopted system in routine use",
                },
                {
                  n: "04",
                  icon: Eye,
                  image: "stage-verify-analysis" as const,
                  title: "Monitor & Verify",
                  q: "Is it working — for real, in the field?",
                  items: ["Implementation & coverage monitoring", "Independent verification of fidelity", "Evidence syntheses for decision forums", "Recommendations → next cycle improvements"],
                  deliverable: "Verified outcomes & learning",
                },
              ].map((s) => (
                <div key={s.n} className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-[20px] overflow-hidden flex flex-col">
                  <div className="relative">
                    <Figure
                      name={s.image}
                      rounded="rounded-none"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw"
                    />
                    <div className="absolute top-2.5 right-2.5 rounded-full bg-white/90 backdrop-blur px-2 py-0.5 text-[8.5px] font-semibold tracking-[0.08em] uppercase text-[#59636D]">Representative</div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                  <div className="w-10 h-10 rounded-xl bg-[#701F3D] flex items-center justify-center text-white">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-mono font-bold text-[#701F3D] mt-4">{s.n}</div>
                  <h3 className="font-bold text-[#252B31] mt-1">{s.title}</h3>
                  <p className="text-xs italic text-[#59636D] mt-2 leading-relaxed">&ldquo;{s.q}&rdquo;</p>
                  <ul className="mt-4 space-y-2 flex-1">
                    {s.items.map((i) => (
                      <li key={i} className="flex gap-2 text-xs text-[#343D46] leading-relaxed"><Check className="w-3.5 h-3.5 text-[#701F3D] shrink-0 mt-0.5" /> {i}</li>
                    ))}
                  </ul>
                  <div className="mt-5 bg-white border border-[#E8EAEC] rounded-xl px-4 py-3">
                    <div className="text-[10px] tracking-[0.12em] uppercase font-bold text-[#89929B]">Deliverable</div>
                    <div className="text-xs font-semibold text-[#252B31] mt-1">{s.deliverable}</div>
                  </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-[#252B31] text-white rounded-[20px] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#701F3D] flex items-center justify-center shrink-0"><ShieldCheck className="w-5 h-5" /></div>
              <p className="text-sm text-white/70 leading-relaxed">We assess, co-design, deploy and verify — <span className="text-white font-medium">so evidence replaces assumptions</span> at the decision table. No step is optional.</p>
            </div>
          </div>
        </section>

        {/* Engagement models */}
        <section className="section-y bg-[#F0F1F2]">
          <div className="container-mss">
            <div className="text-center max-w-3xl mx-auto">
              <div className="eyebrow justify-center">Engagement Models</div>
              <h2 className="font-bold tracking-tight text-[#252B31] mt-4" style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}>Three ways to work with MSS.</h2>
              <p className="text-[#59636D] mt-4 leading-relaxed">Pick the model that matches your programme maturity — from rapid assessment to managed delivery.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mt-10">
              {[
                {
                  kicker: "Discovery → Roadmap",
                  title: "Assessment & Advisory",
                  desc: "Rapid diagnostics of coverage, data quality and geospatial readiness — ending in a prioritised, costed roadmap.",
                  bullets: ["Settlement & facility gap assessment", "DHIS2 / EMID / register data quality review", "Geospatial readiness audit", "Investment case & sequencing"],
                  when: "You need clarity before committing to build.",
                  cta: "Request Assessment",
                  featured: false,
                },
                {
                  kicker: "Design → Pilot → Iterate",
                  title: "Co-design & Build",
                  q: "Featured — for programmes ready to pilot",
                  desc: "We co-create fit-for-purpose digital and geospatial solutions with your teams — built for the facility, not the demo.",
                  bullets: ["Human-centred design sprints", "Digital system + GMT development", "Facility pilot with feedback loops", "SOPs, training assets & handover"],
                  when: "You have a validated problem and want to co-own the solution.",
                  cta: "Discuss Co-Design",
                  featured: true,
                },
                {
                  kicker: "Deploy → Train → Verify",
                  title: "Managed Delivery",
                  desc: "End-to-end delivery: deployment, training, coordination, monitoring and independent verification at scale.",
                  bullets: ["State / LGA / facility rollout", "Workforce training & supportive supervision", "Implementation monitoring & learning", "Independent verification & reporting"],
                  when: "You need a field partner who stays until adoption is verified.",
                  cta: "Enquire About Delivery",
                  featured: false,
                },
              ].map((m) => (
                <div key={m.title} className={`rounded-[20px] border p-7 sm:p-8 flex flex-col ${m.featured ? "bg-[#252B31] text-white border-[#252B31] shadow-[0_16px_48px_rgba(37,43,49,0.18)] lg:scale-[1.02]" : "bg-white border-[#E8EAEC]"}`}>
                  <div className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase w-fit ${m.featured ? "bg-white text-[#252B31]" : "bg-[#F0F1F2] text-[#343D46] border border-[#E8EAEC]"}`}>{m.kicker}</div>
                  <h3 className="font-bold text-xl mt-4">{m.title}</h3>
                  {m.featured && <div className="text-xs font-semibold text-[#E8A0B8] mt-1">{m.q}</div>}
                  <p className={`text-sm leading-relaxed mt-3 ${m.featured ? "text-white/60" : "text-[#59636D]"}`}>{m.desc}</p>
                  <ul className="mt-6 space-y-2.5 flex-1">
                    {m.bullets.map((b) => (
                      <li key={b} className={`flex gap-2.5 text-[13px] leading-relaxed ${m.featured ? "text-white/85" : "text-[#343D46]"}`}><Check className={`w-4 h-4 mt-0.5 shrink-0 ${m.featured ? "text-[#E8A0B8]" : "text-[#701F3D]"}`} />{b}</li>
                    ))}
                  </ul>
                  <div className={`mt-6 rounded-xl px-4 py-3 flex gap-2 ${m.featured ? "bg-white/10 border border-white/10" : "bg-[#FAF9F7] border border-[#E8EAEC]"}`}>
                    <Clock className={`w-4 h-4 shrink-0 mt-0.5 ${m.featured ? "text-[#E8A0B8]" : "text-[#701F3D]"}`} />
                    <div>
                      <div className={`text-[11px] font-bold tracking-wide uppercase ${m.featured ? "text-white/60" : "text-[#89929B]"}`}>Best when</div>
                      <div className={`text-xs leading-relaxed ${m.featured ? "text-white/80" : "text-[#343D46]"}`}>{m.when}</div>
                    </div>
                  </div>
                  <Link href="/contact" className={`mt-6 inline-flex items-center justify-center gap-2 h-11 rounded-full text-sm font-semibold tracking-wide uppercase ${m.featured ? "bg-white text-[#252B31] hover:bg-[#FAF9F7]" : "bg-[#701F3D] text-white hover:bg-[#50152D]"}`}>
                    {m.cta} <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-white border border-[#E8EAEC] rounded-[20px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-[#252B31] flex items-center gap-2"><Users className="w-5 h-5 text-[#701F3D]" /> Not sure which model fits?</h3>
                <p className="text-sm text-[#59636D] mt-2 leading-relaxed">Start with a scoping conversation — share geography, programme and timeline, and we&apos;ll recommend the right entry point and what to expect.</p>
              </div>
              <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#701F3D] hover:bg-[#50152D] text-white px-7 h-11 rounded-full text-sm font-semibold tracking-wide uppercase transition-colors">
                Start a Conversation <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
