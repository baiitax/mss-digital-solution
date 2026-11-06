"use client"

import Link from "next/link"
import { ArrowUpRight, Database, MapPinned, LineChart, UsersRound, ShieldCheck, Building2, Syringe, Building, Truck, Activity, Wallet, Map as MapIcon, Check } from "lucide-react"
import { Eyebrow } from "@/components/ui/badge"

// Credibility
export function CredibilityStrip() {
  return (
    <section className="bg-[#0A1D30] relative">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20h40M20 0v40' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")` }} />
      <div className="relative container-mss py-7 sm:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-white">
          <div>
            <div className="text-[11px] tracking-[0.12em] uppercase font-bold text-white/40">Registered</div>
            <div className="font-semibold text-sm mt-1">RC 7341058 • CAC Nigeria</div>
            <div className="text-xs text-white/40 mt-1">Corporate Affairs Commission</div>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.12em] uppercase font-bold text-white/40">Incorporated</div>
            <div className="font-semibold text-sm mt-1">9 February 2024</div>
            <div className="text-xs text-white/40 mt-1">Kano, Nigeria</div>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.12em] uppercase font-bold text-white/40">Headquarters</div>
            <div className="font-semibold text-sm mt-1">Gwale LGA, Kano State</div>
            <div className="text-xs text-white/40 mt-1">No. 7 Alexandria Street</div>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.12em] uppercase font-bold text-white/40">Focus</div>
            <div className="font-semibold text-sm mt-1">Digital Health & Geospatial</div>
            <div className="text-xs text-white/40 mt-1">PHC • RI • Zero-Dose</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Purpose — editorial asymmetric with documentary image
export function PurposeSection() {
  return (
    <section className="section-y bg-[#FAFBF9]">
      <div className="container-mss">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="eyebrow">Our Purpose</div>
            <h2 className="font-bold tracking-[-0.02em] leading-[0.96] text-[#10283F] mt-5" style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
              Technology That<br />
              <span className="text-[#087F83]">Reaches Beyond</span><br />
              the Facility Walls.
            </h2>
            <div className="mt-8 rounded-2xl overflow-hidden border border-[#E6EBED] bg-white">
              <img src="https://images.unsplash.com/photo-1532187863486-abf28ad4d967?q=80&w=800&auto=format&fit=crop" alt="Nigerian primary healthcare facility documentary" className="w-full h-48 object-cover" />
              <div className="p-5">
                <p className="font-medium italic text-[#10283F] text-sm leading-relaxed">&ldquo;A tool that a facility cannot use is not a solution. It is a procurement.&rdquo;</p>
                <p className="text-xs text-[#71808B] mt-2">— MSS Operating Philosophy</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-[#273744] leading-relaxed text-[17px]">
              In many Nigerian communities, health planning still relies on estimated catchment populations — not actual human geography. Settlements are dispersed, roads are seasonal, facility catchments overlap or leave vast gaps, and data arrives late or duplicated across paper registers.
            </p>
            <p className="text-[#273744]/80 leading-relaxed mt-5">
              The result: children missed for routine immunisation, outreach sessions planned for places that don&apos;t exist — and missed for places that do — and decision-makers planning without a true picture of where people live.
            </p>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { n: "01", t: "Incomplete coverage", d: "Estimated populations mask real settlement distribution." },
                { n: "02", t: "Dispersed settlements", d: "Rural clusters beyond 5km radii remain invisible." },
                { n: "03", t: "Insufficient data", d: "Paper systems delay insight past the decision window." },
              ].map(i => (
                <div key={i.t} className="bg-white border border-[#E6EBED] rounded-2xl p-5">
                  <div className="text-xs font-mono font-bold text-[#087F83]">{i.n}</div>
                  <h4 className="font-semibold text-sm text-[#10283F] mt-2 leading-tight">{i.t}</h4>
                  <p className="text-xs text-[#71808B] mt-2 leading-relaxed">{i.d}</p>
                </div>
              ))}
            </div>

            <p className="text-[#10283F] font-medium leading-relaxed mt-8 border-l-2 border-[#087F83] pl-5">
              MSS connects <span className="text-[#087F83]">geospatial intelligence</span>, <span className="text-[#087F83]">healthcare technology</span> and <span className="text-[#087F83]">implementation expertise</span> — so plans reflect real geography and evidence reaches decision tables before budgets are fixed.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Core Competencies — image-led, numbered
export function CoreCompetencies() {
  const items = [
    {
      k: "01",
      icon: Database,
      title: "Digital Health Systems",
      desc: "Electronic health records, immunisation platforms, logistics visibility and facility deployment — built for offline, low-bandwidth frontline use.",
      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop",
      points: ["EHR & health information systems", "Immunisation information systems", "Logistics & commodity visibility"],
      href: "/capabilities/digital-health"
    },
    {
      k: "02",
      icon: MapPinned,
      title: "Geospatial Intelligence",
      desc: "Settlement & facility mapping, accessibility analysis and microplanning — identifying underserved populations with precision.",
      img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop",
      points: ["Settlement & facility mapping", "Catchment & proximity analysis", "Geospatial microplanning"],
      href: "/capabilities/geospatial"
    },
    {
      k: "03",
      icon: LineChart,
      title: "Data Analytics & Intelligence",
      desc: "Transform routine and survey data into actionable insights for monitoring, resource allocation and evidence-based decisions.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
      points: ["Routine & survey analysis", "Data quality assessment", "Programme performance dashboards"],
      href: "/capabilities/analytics"
    },
    {
      k: "04",
      icon: UsersRound,
      title: "Programme & Project Management",
      desc: "End-to-end coordination: design, partner management, field deployment, training, M&E and independent verification.",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
      points: ["Programme design & delivery", "Training & capacity building", "M&E & verification"],
      href: "/capabilities/programme-management"
    },
  ]
  return (
    <section className="section-y bg-[#F0F3F4]">
      <div className="container-mss">
        <div className="max-w-3xl">
          <div className="eyebrow">Core Competencies</div>
          <h2 className="font-bold tracking-tight text-[#10283F] mt-4" style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>Four capabilities. One implementation mindset.</h2>
          <p className="text-[#273744]/70 mt-4 leading-relaxed">We don&apos;t sell software in isolation. We partner to assess, co-design, deploy and verify — so systems are actually used.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-10">
          {items.map(item => (
            <Link key={item.title} href={item.href} className="group bg-white rounded-[20px] border border-[#E6EBED] overflow-hidden hover:shadow-[0_16px_48px_rgba(16,40,63,0.08)] hover:border-[#087F83]/15 transition-all flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D30]/70 via-[#0A1D30]/10 to-transparent" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 text-xs font-mono font-bold text-[#10283F]">{item.k}</div>
                <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#10283F] shadow">
                  <item.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-[#10283F] group-hover:text-[#087F83] transition-colors">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#273744]/70 mt-2 flex-1">{item.desc}</p>
                <ul className="mt-5 space-y-2">
                  {item.points.map(p => (
                    <li key={p} className="flex gap-2 text-sm text-[#273744]"><Check className="w-4 h-4 mt-0.5 text-[#087F83] shrink-0" />{p}</li>
                  ))}
                </ul>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-[#087F83] group-hover:gap-3 transition-all">
                  Explore capability <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ImpactGrid() {
  const areas = [
    { icon: Syringe, title: "Routine Immunisation", desc: "Microplanning, session allocation and defaulter tracking for equitable RI." },
    { icon: ShieldCheck, title: "Zero-Dose Reduction", desc: "Identify and reach children missed by routine services." },
    { icon: Building, title: "Primary Healthcare Strengthening", desc: "Facility readiness, workforce mapping and integration." },
    { icon: MapIcon, title: "Facility & Workforce Mapping", desc: "Geospatial registries and HR distribution analysis." },
    { icon: Truck, title: "Logistics & Commodity Visibility", desc: "Cold chain, stock visibility and last-mile intelligence." },
    { icon: Activity, title: "Disease Surveillance & Response", desc: "Timely data for detection and geographic targeting." },
    { icon: Wallet, title: "Health Financing", desc: "Evidence for resource allocation and investment cases." },
    { icon: Building2, title: "State-Level Health Planning", desc: "Planning that reflects actual population geography." },
  ]
  return (
    <section className="section-y bg-white">
      <div className="container-mss">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="eyebrow">Where We Create Impact</div>
            <h2 className="font-bold tracking-tight text-[#10283F] mt-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>Applied where it changes coverage.</h2>
          </div>
          <p className="text-[#273744]/60 max-w-xl leading-relaxed text-sm sm:text-base">MSS capabilities are deployed across the health system — from settlement microplans to state investment decisions.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {areas.map(a => (
            <div key={a.title} className="group bg-[#FAFBF9] border border-[#E6EBED] rounded-2xl p-6 hover:bg-[#10283F] hover:text-white hover:border-[#10283F] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#E6F5F6] group-hover:bg-white/10 flex items-center justify-center text-[#087F83] group-hover:text-white transition-colors">
                <a.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm mt-4 leading-tight">{a.title}</h3>
              <p className="text-xs leading-relaxed mt-2 opacity-60 group-hover:opacity-80">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Methodology — horizontal timeline with connecting line
export function HowWeWork() {
  const steps = [
    { n: "01", title: "Assess & Measure", desc: "Understand actual community geography, facilities, coverage gaps and data quality." },
    { n: "02", title: "Co-design & Build", desc: "Develop practical solutions alongside the teams that will use them." },
    { n: "03", title: "Deploy & Strengthen", desc: "Implement systems, train teams and support adoption until it sticks." },
    { n: "04", title: "Monitor & Verify", desc: "Evaluate implementation, identify gaps and translate evidence." },
  ]
  return (
    <section className="section-y bg-[#0A1D30] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: "28px 28px" }} />
      <div className="relative container-mss">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-[#48BFC2]">
            <span className="w-7 h-px bg-[#48BFC2]" /> How We Work
          </div>
          <h2 className="font-bold tracking-tight mt-4 text-white" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>An implementation methodology built for field reality.</h2>
          <p className="text-white/60 mt-4 leading-relaxed">We work in four stages — from understanding real geography to verifying that systems are used.</p>
        </div>

        <div className="relative mt-12">
          <div className="hidden lg:block absolute top-[44px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(s => (
              <div key={s.n} className="relative bg-white/[0.06] backdrop-blur border border-white/10 rounded-[20px] p-7">
                <div className="w-10 h-10 rounded-xl bg-[#087F83] flex items-center justify-center text-white font-mono text-sm font-bold">{s.n}</div>
                <div className="w-6 h-6 rounded-full bg-[#0A1D30] border-2 border-white/20 absolute -top-3 left-8 hidden lg:flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-[#48BFC2]" /></div>
                <h3 className="font-semibold text-white mt-5">{s.title}</h3>
                <p className="text-sm leading-relaxed text-white/60 mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EngagementModels() {
  const models = [
    { title: "Assessment & Advisory", kicker: "Discovery → Recommendation", desc: "Rapid diagnostics of coverage, data quality and geospatial readiness — ending in a prioritised roadmap.", features: ["Coverage gap assessment", "Data quality review", "Readiness audit", "Investment case"], cta: "Request Assessment" },
    { title: "Co-design & Build", kicker: "Design → Prototype → Pilot", desc: "We co-create fit-for-purpose digital and geospatial solutions with your teams — built for the facility.", features: ["Human-centred sprints", "Digital system development", "Geospatial toolkit", "Pilot with feedback loops"], cta: "Discuss Co-Design", featured: true },
    { title: "Managed Delivery", kicker: "Deploy → Train → Verify", desc: "End-to-end delivery: deployment, training, coordination, monitoring and independent verification.", features: ["Field deployment & training", "Partner coordination", "Implementation monitoring", "Independent verification"], cta: "Enquire About Delivery" },
  ]
  return (
    <section className="section-y bg-[#F0F3F4]">
      <div className="container-mss">
        <div className="text-center max-w-3xl mx-auto">
          <div className="eyebrow justify-center">Engagement Models</div>
          <h2 className="font-bold tracking-tight text-[#10283F] mt-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>How partners engage MSS.</h2>
          <p className="text-[#273744]/60 mt-4 leading-relaxed">From rapid assessment to managed delivery — flexible models that match your programme maturity.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-10">
          {models.map(m => (
            <div key={m.title} className={`rounded-[20px] border p-7 sm:p-8 flex flex-col ${m.featured ? "bg-[#10283F] text-white border-[#10283F] shadow-[0_16px_48px_rgba(16,40,63,0.18)] lg:scale-[1.02]" : "bg-white border-[#E6EBED]"}`}>
              <div className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase w-fit ${m.featured ? "bg-white text-[#10283F]" : "bg-[#F0F3F4] text-[#273744] border border-[#E6EBED]"}`}>{m.kicker}</div>
              <h3 className="font-bold text-xl mt-4">{m.title}</h3>
              <p className={`text-sm leading-relaxed mt-3 ${m.featured ? "text-white/60" : "text-[#273744]/60"}`}>{m.desc}</p>
              <ul className="mt-6 space-y-3 flex-1">
                {m.features.map(f => (
                  <li key={f} className={`flex gap-2.5 text-sm ${m.featured ? "text-white/85" : "text-[#273744]"}`}><Check className={`w-4 h-4 mt-0.5 shrink-0 ${m.featured ? "text-[#48BFC2]" : "text-[#087F83]"}`} />{f}</li>
                ))}
              </ul>
              <Link href="/contact" className={`mt-8 inline-flex items-center justify-center gap-2 h-11 rounded-full text-sm font-semibold tracking-wide uppercase ${m.featured ? "bg-white text-[#10283F] hover:bg-[#F0F3F4]" : "bg-[#10283F] text-white hover:bg-[#0A1D30]"}`}>
                {m.cta} <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
