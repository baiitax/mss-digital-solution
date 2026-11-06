"use client"

import Link from "next/link"
import { ArrowUpRight, Database, MapPinned, LineChart, UsersRound, ShieldCheck, Building2, GraduationCap, Handshake, Syringe, Building, Truck, Activity, Wallet, Map as MapIcon, Check } from "lucide-react"
import { Eyebrow, Badge } from "@/components/ui/badge"
import { GeospatialDemo } from "@/components/maps/GeospatialDemo"

export function CredibilityStrip() {
  return (
    <section className="bg-[#0B1930]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center justify-between gap-6 text-white/90 text-sm">
          <div className="flex flex-wrap gap-6 lg:gap-10">
            <div>
              <div className="text-[11px] tracking-widest uppercase text-white/50 font-semibold">Registered</div>
              <div className="font-semibold mt-1">RC 7341058 • CAC Nigeria</div>
            </div>
            <div>
              <div className="text-[11px] tracking-widest uppercase text-white/50 font-semibold">Incorporated</div>
              <div className="font-semibold mt-1">9 February 2024</div>
            </div>
            <div>
              <div className="text-[11px] tracking-widest uppercase text-white/50 font-semibold">Headquarters</div>
              <div className="font-semibold mt-1">Kano, Nigeria • Gwale LGA</div>
            </div>
            <div>
              <div className="text-[11px] tracking-widest uppercase text-white/50 font-semibold">Focus</div>
              <div className="font-semibold mt-1">Primary Healthcare • Immunisation • Zero-Dose</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">Digital Health Systems</span>
            <span className="px-3 py-1.5 rounded-full bg-[#0E7C7B]">Geospatial Intelligence</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PurposeSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Eyebrow>Our Purpose</Eyebrow>
            <h2 className="font-display text-3xl lg:text-[42px] font-bold tracking-tight leading-[0.95] text-[#0B1930] mt-4">
              Technology That<br />
              <span className="text-[#0E7C7B]">Reaches Beyond</span><br />
              the Facility Walls.
            </h2>
            <div className="mt-6 p-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
              <p className="font-display italic text-[#0B1930] leading-relaxed">
                &ldquo;A tool that a facility cannot use is not a solution. It is a procurement.&rdquo;
              </p>
              <p className="text-xs text-[#64748B] mt-2">— MSS Operating Philosophy</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <p className="text-[#334155] leading-relaxed">
              In many Nigerian communities, health planning still relies on estimated catchment populations — not actual human geography. Settlements are dispersed, roads are seasonal, facility catchments overlap or leave vast gaps, and data arrives late, incomplete or duplicated across paper registers.
            </p>
            <p className="text-[#334155] leading-relaxed">
              The result: children missed for routine immunisation, outreach sessions planned for places that don&apos;t exist on paper — and missed for places that do — and decision-makers planning without a true picture of where people live.
            </p>
            <div className="grid md:grid-cols-3 gap-4 pt-2">
              {[
                { title: "Incomplete coverage", desc: "Estimated populations mask real settlement distribution." },
                { title: "Dispersed settlements", desc: "Rural clusters beyond perceived 5km radii remain invisible." },
                { title: "Insufficient data", desc: "Paper systems delay insight until after the decision window." },
              ].map(item => (
                <div key={item.title} className="bg-[#FDFCF7] border border-[#E2E8F0] rounded-2xl p-4">
                  <h4 className="font-semibold text-sm text-[#0B1930]">{item.title}</h4>
                  <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-[#0B1930] font-medium leading-relaxed">
              MSS connects <span className="text-[#0E7C7B]">geospatial intelligence</span>, <span className="text-[#0E7C7B]">healthcare technology</span> and <span className="text-[#0E7C7B]">implementation expertise</span> — so plans reflect real geography, tools fit frontline workflows, and evidence reaches decision tables before budgets are fixed.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CoreCompetencies() {
  const items = [
    {
      k: "01",
      icon: Database,
      title: "Digital Health Systems",
      desc: "We develop and deploy digital solutions that support healthcare delivery, reporting, recording, ordering and reconciliation — from facility registers to logistics visibility.",
      points: ["Electronic health information systems", "Immunisation information systems", "Logistics & commodity visibility", "Facility-level deployment"],
      color: "bg-[#0B1930]",
      href: "/capabilities/digital-health"
    },
    {
      k: "02",
      icon: MapPinned,
      title: "Geospatial Intelligence",
      desc: "Settlement mapping, health facility mapping, accessibility analysis and microplanning — so teams identify underserved populations with precision, not approximation.",
      points: ["Settlement & facility mapping", "Catchment-area & proximity analysis", "Geospatial microplanning", "Geographic coverage analysis"],
      color: "bg-[#0E7C7B]",
      href: "/capabilities/geospatial"
    },
    {
      k: "03",
      icon: LineChart,
      title: "Data Analytics & Intelligence",
      desc: "We transform routine and survey data into actionable insights for programme monitoring, resource allocation and evidence-based decisions.",
      points: ["Routine & survey data analysis", "Data quality assessment", "Programme performance dashboards", "Coverage gap identification"],
      color: "bg-[#0EA5E9]",
      href: "/capabilities/analytics"
    },
    {
      k: "04",
      icon: UsersRound,
      title: "Programme & Project Management",
      desc: "End-to-end coordination: design, partner management, field deployment, training, implementation oversight, monitoring and independent verification.",
      points: ["Programme design & implementation", "Stakeholder & partner coordination", "Training & capacity building", "Monitoring, evaluation & verification"],
      color: "bg-[#334155]",
      href: "/capabilities/programme-management"
    },
  ]
  return (
    <section className="py-16 lg:py-24 bg-[#F1F5F9]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <Eyebrow>Core Competencies</Eyebrow>
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-[#0B1930] mt-4">Four capabilities. One implementation mindset.</h2>
          <p className="text-[#475569] mt-4 leading-relaxed">We don&apos;t sell software in isolation. We partner to assess, co-design, deploy and verify — so systems are actually used, and gaps actually close.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-10">
          {items.map(item => (
            <div key={item.title} className="group bg-white rounded-[24px] border border-[#E2E8F0] p-7 lg:p-8 hover:shadow-[0_12px_40px_rgba(11,25,48,0.08)] hover:border-[#0E7C7B]/20 transition-all">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-white`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono tracking-widest text-[#94A3B8]">{item.k} — CAPABILITY</span>
              </div>
              <h3 className="font-display font-bold text-xl text-[#0B1930] mt-6">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[#475569] mt-3">{item.desc}</p>
              <ul className="mt-5 space-y-2">
                {item.points.map(p => (
                  <li key={p} className="flex items-start gap-2 text-sm text-[#334155]">
                    <Check className="w-4 h-4 mt-0.5 text-[#0E7C7B] shrink-0" /> {p}
                  </li>
                ))}
              </ul>
              <Link href={item.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-[#0E7C7B] group-hover:gap-3 transition-all">
                Explore capability <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ImpactGrid() {
  const areas = [
    { icon: Syringe, title: "Routine Immunisation", desc: "Microplanning, session allocation and defaulter tracking for equitable RI." },
    { icon: ShieldCheck, title: "Zero-Dose Reduction", desc: "Identify and reach children missed by routine services using settlement-level insight." },
    { icon: Building, title: "Primary Healthcare Strengthening", desc: "Facility readiness, workforce mapping and service integration." },
    { icon: MapIcon, title: "Facility & Workforce Mapping", desc: "Geospatial registries and human resource distribution analysis." },
    { icon: Truck, title: "Logistics & Commodity Visibility", desc: "Cold chain, stock visibility and last-mile distribution intelligence." },
    { icon: Activity, title: "Disease Surveillance & Outbreak Response", desc: "Timely data for detection, response and geographic targeting." },
    { icon: Wallet, title: "Health Financing & Investment Cases", desc: "Evidence for resource allocation and investment planning." },
    { icon: Building2, title: "State-Level Health Sector Planning", desc: "Planning that reflects actual population geography, not estimates." },
  ]
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <Eyebrow>Where We Create Impact</Eyebrow>
            <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-[#0B1930] mt-4">Applied where it changes coverage.</h2>
          </div>
          <p className="text-[#475569] max-w-xl leading-relaxed">MSS capabilities are deployed across the health system — from settlement-level microplans to state-level investment decisions.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {areas.map(a => (
            <div key={a.title} className="group bg-[#FDFCF7] border border-[#E2E8F0] rounded-2xl p-6 hover:bg-[#0B1930] hover:text-white hover:border-[#0B1930] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#E6F3F3] group-hover:bg-white/10 flex items-center justify-center text-[#0E7C7B] group-hover:text-white transition-colors">
                <a.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm mt-4">{a.title}</h3>
              <p className="text-xs leading-relaxed mt-2 opacity-70 group-hover:opacity-80">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowWeWork() {
  const steps = [
    { n: "01", title: "Assess & Measure", desc: "Understand actual community geography, healthcare facilities, coverage gaps and data quality. No assumptions.", color: "bg-[#0B1930]" },
    { n: "02", title: "Co-design & Build", desc: "Develop practical solutions alongside the organisations and frontline teams that will use them.", color: "bg-[#0E7C7B]" },
    { n: "03", title: "Deploy & Strengthen", desc: "Implement systems, train teams, coordinate stakeholders and support adoption until it sticks.", color: "bg-[#0EA5E9]" },
    { n: "04", title: "Monitor & Verify", desc: "Evaluate implementation, identify gaps and translate evidence into actionable findings.", color: "bg-[#475569]" },
  ]
  return (
    <section className="py-16 lg:py-24 bg-[#0B1930] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
      </div>
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-[#14B8A6]">
            <span className="w-8 h-px bg-[#14B8A6]" /> How We Work
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mt-4">An implementation methodology built for field reality.</h2>
          <p className="text-white/70 mt-4 leading-relaxed">We work in four stages — from understanding real geography to verifying that systems are used and gaps close.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(s => (
            <div key={s.n} className="relative bg-white/[0.06] backdrop-blur border border-white/10 rounded-[24px] p-7 hover:bg-white/10 transition-colors">
              <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center text-white font-mono text-sm font-bold`}>{s.n}</div>
              <h3 className="font-display font-semibold text-lg mt-5">{s.title}</h3>
              <p className="text-sm leading-relaxed text-white/70 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* horizontal connector */}
        <div className="hidden lg:block mt-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  )
}

export function EngagementModels() {
  const models = [
    { title: "Assessment & Advisory", price: "Discovery → Recommendation", desc: "Rapid diagnostics of coverage, data quality and geospatial readiness — ending in a prioritised roadmap, not a shelf report.", features: ["Geospatial & coverage gap assessment", "Data quality & systems review", "Microplanning readiness audit", "Actionable roadmap & investment case"], cta: "Request Assessment" },
    { title: "Co-design & Build", price: "Design → Prototype → Pilot", desc: "We co-create fit-for-purpose digital and geospatial solutions with your teams — built for the facility, not the procurement file.", features: ["Human-centred design sprints", "Digital system & tool development", "Geospatial microplanning toolkit", "Pilot with frontline feedback loops"], cta: "Discuss Co-Design", featured: true },
    { title: "Managed Delivery", price: "Deploy → Train → Verify", desc: "End-to-end programme delivery: deployment, training, stakeholder coordination, monitoring and independent verification.", features: ["Field deployment & training", "Partner & stakeholder management", "Implementation monitoring", "Independent verification & reporting"], cta: "Enquire About Delivery" },
  ]
  return (
    <section className="py-16 lg:py-24 bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>Engagement Models</Eyebrow>
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-[#0B1930] mt-4">How partners engage MSS.</h2>
          <p className="text-[#475569] mt-4 leading-relaxed">From rapid assessment to managed delivery — flexible models that match your programme maturity and ambition.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {models.map(m => (
            <div key={m.title} className={`rounded-[24px] border p-8 flex flex-col ${m.featured ? "bg-[#0B1930] text-white border-[#0B1930] shadow-[0_16px_48px_rgba(11,25,48,0.2)] scale-[1.02]" : "bg-white border-[#E2E8F0]"}`}>
              <Badge variant={m.featured ? "teal" : "muted"}>{m.price}</Badge>
              <h3 className="font-display font-bold text-xl mt-4">{m.title}</h3>
              <p className={`text-sm leading-relaxed mt-3 ${m.featured ? "text-white/70" : "text-[#475569]"}`}>{m.desc}</p>
              <ul className="mt-6 space-y-3 flex-1">
                {m.features.map(f => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${m.featured ? "text-white/90" : "text-[#334155]"}`}>
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${m.featured ? "text-[#14B8A6]" : "text-[#0E7C7B]"}`} /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={`mt-8 inline-flex items-center justify-center gap-2 h-11 rounded-full text-sm font-semibold tracking-wide uppercase ${m.featured ? "bg-white text-[#0B1930] hover:bg-[#F1F5F9]" : "bg-[#0B1930] text-white hover:bg-[#132A4C]"}`}>
                {m.cta} <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
