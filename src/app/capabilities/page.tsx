import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Eyebrow, Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowUpRight, Database, MapPinned, LineChart, UsersRound } from "lucide-react"

export const metadata = { title: "Capabilities — MSS Digital Solutions" }

const caps = [
  {
    icon: Database,
    title: "Digital Health Systems",
    desc: "Electronic health information systems, immunisation platforms, logistics visibility and facility-level deployment — built for low-bandwidth, offline-capable frontline use.",
    href: "/capabilities/digital-health",
    features: ["EHR & health information systems", "Immunisation information systems", "Logistics & commodity visibility", "Facility-level tech deployment"],
    color: "bg-[#0B1930]",
  },
  {
    icon: MapPinned,
    title: "Geospatial Intelligence",
    desc: "Settlement & facility mapping, microplanning, catchment analysis and spatial visualisation — turning geography into coverage.",
    href: "/capabilities/geospatial",
    features: ["Settlement & facility mapping", "Geospatial microplanning", "Catchment & proximity analysis", "Interactive map demonstration"],
    color: "bg-[#0E7C7B]",
  },
  {
    icon: LineChart,
    title: "Data Analytics & Intelligence",
    desc: "Transform routine & survey data into dashboards, coverage gap detection and decision-support evidence.",
    href: "/capabilities/analytics",
    features: ["Routine & survey analysis", "Data quality assessment", "Programme dashboards", "Evidence-based decision support"],
    color: "bg-[#0EA5E9]",
  },
  {
    icon: UsersRound,
    title: "Programme & Project Management",
    desc: "Design, coordination, field deployment, training, M&E and independent verification — from assessment to verified adoption.",
    href: "/capabilities/programme-management",
    features: ["Programme design & delivery", "Stakeholder coordination", "Training & capacity building", "M&E & verification"],
    color: "bg-[#334155]",
  },
]

export default function CapabilitiesLanding() {
  return (
    <div className="min-h-screen bg-[#FDFCF7]">
      <Navbar />
      <main>
        <section className="bg-white border-b border-[#E2E8F0]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
            <Eyebrow>Capabilities</Eyebrow>
            <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1930] mt-4">Four capabilities. One outcome: <span className="text-[#0E7C7B]">coverage that reaches the unreached.</span></h1>
            <p className="text-[#475569] leading-relaxed mt-4 max-w-3xl">MSS distinguishes between <strong className="text-[#0B1930]">demonstrated experience</strong>, <strong className="text-[#0B1930]">current service capabilities</strong> and <strong className="text-[#0B1930]">illustrative demonstrations</strong>. Proposed capabilities are never presented as completed deployments.</p>
          </div>
        </section>

        <section className="py-12 bg-[#F8FAFC]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              {caps.map(c => (
                <Link key={c.title} href={c.href} className="group bg-white rounded-[24px] border border-[#E2E8F0] p-8 hover:shadow-xl hover:border-[#0E7C7B]/20 transition-all">
                  <div className={`w-12 h-12 rounded-2xl ${c.color} flex items-center justify-center text-white`}>
                    <c.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#0B1930] mt-6 group-hover:text-[#0E7C7B] transition-colors">{c.title}</h3>
                  <p className="text-sm text-[#475569] mt-3 leading-relaxed">{c.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {c.features.map(f => (
                      <li key={f} className="text-sm text-[#334155] flex gap-2"><span className="text-[#0E7C7B]">•</span> {f}</li>
                    ))}
                  </ul>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-[#0E7C7B]">
                    Explore capability <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 bg-[#0B1930] rounded-[24px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display font-bold text-lg">Not sure where to start?</h3>
                <p className="text-white/60 text-sm mt-2 max-w-xl">We recommend starting with an Assessment & Advisory — a rapid diagnostic of your coverage gaps, data quality and geospatial readiness.</p>
              </div>
              <Link href="/contact" className="shrink-0 bg-[#0E7C7B] hover:bg-[#14B8A6] text-white px-6 h-11 rounded-full text-sm font-semibold tracking-wide uppercase inline-flex items-center gap-2">
                Request Assessment <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
