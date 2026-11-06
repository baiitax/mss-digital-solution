import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import Link from "next/link"
import { ArrowUpRight, Database, MapPinned, LineChart, UsersRound } from "lucide-react"

export const metadata = { title: "Capabilities — MSS Digital Solutions" }

const caps = [
  {
    num: "01",
    icon: Database,
    title: "Digital Health Systems",
    desc: "Electronic health information systems, immunisation platforms, logistics visibility and facility-level deployment — built for low-bandwidth, offline-capable frontline use.",
    href: "/capabilities/digital-health",
    features: ["EHR & health information systems", "Immunisation information systems", "Logistics & commodity visibility", "Facility-level tech deployment"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    accent: "bg-[#10283F]",
  },
  {
    num: "02",
    icon: MapPinned,
    title: "Geospatial Intelligence",
    desc: "Settlement & facility mapping, microplanning, catchment analysis and spatial visualisation — turning geography into coverage.",
    href: "/capabilities/geospatial",
    features: ["Settlement & facility mapping", "Geospatial microplanning", "Catchment & proximity analysis", "Interactive map demonstration"],
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop",
    accent: "bg-[#087F83]",
  },
  {
    num: "03",
    icon: LineChart,
    title: "Data Analytics & Intelligence",
    desc: "Transform routine & survey data into dashboards, coverage gap detection and decision-support evidence.",
    href: "/capabilities/analytics",
    features: ["Routine & survey analysis", "Data quality assessment", "Programme dashboards", "Evidence-based decision support"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    accent: "bg-[#48BFC2]",
  },
  {
    num: "04",
    icon: UsersRound,
    title: "Programme & Project Management",
    desc: "Design, coordination, field deployment, training, M&E and independent verification — from assessment to verified adoption.",
    href: "/capabilities/programme-management",
    features: ["Programme design & delivery", "Stakeholder coordination", "Training & capacity building", "M&E & verification"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    accent: "bg-[#273744]",
  },
]

export default function CapabilitiesLanding() {
  return (
    <div className="min-h-screen bg-[#FAFBF9]">
      <Navbar />
      <main>
        {/* Editorial hero */}
        <section className="bg-[#0A1D30] text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#087F83]/14 via-transparent to-[#10283F]/55" />
            <div className="absolute -top-24 -right-24 w-[50%] h-[75%] bg-[#48BFC2]/[0.05] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          </div>
          <div className="relative container-mss py-12 sm:py-16 lg:py-20">
            <div className="max-w-[900px]">
              <div className="eyebrow !text-[#48BFC2] before:!bg-[#48BFC2] !opacity-100">Capabilities • Four practices, one outcome</div>
              <h1 className="font-bold tracking-[-0.03em] leading-[0.95] mt-4 text-white" style={{ fontSize: "clamp(30px, 4vw, 52px)" }}>
                Four capabilities.<br />One outcome: <span className="text-[#48BFC2]">coverage that reaches the unreached.</span>
              </h1>
              <p className="text-white/60 leading-relaxed mt-5 max-w-3xl text-[15px] sm:text-[16px]">
                MSS distinguishes between <strong className="text-white">demonstrated experience</strong>, <strong className="text-white">current service capabilities</strong> and <strong className="text-white">illustrative demonstrations</strong>. Proposed capabilities are never presented as completed deployments.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-[11px]">
                <span className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70">Implementation partner</span>
                <span className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70">Settlement-level precision</span>
                <span className="px-3 py-1.5 rounded-full bg-[#087F83] text-white font-medium">Facility-level deployment</span>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities grid — image-led editorial */}
        <section className="section-y bg-[#FAFBF9]">
          <div className="container-mss">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-6">
              {caps.map(c => (
                <Link key={c.title} href={c.href} className="group bg-white rounded-[20px] border border-[#E6EBED] overflow-hidden hover:shadow-[0_16px_40px_rgba(16,40,63,0.10)] hover:-translate-y-1 transition-all flex flex-col">
                  <div className="relative h-[200px] sm:h-[220px] overflow-hidden">
                    <img src={c.image} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D30]/65 via-[#0A1D30]/10 to-transparent" />
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/90 bg-black/20 backdrop-blur-md border border-white/15 rounded-full px-3 py-1">{c.num}</span>
                      <span className={`w-9 h-9 rounded-xl ${c.accent} flex items-center justify-center text-white shadow-md`}><c.icon className="w-4 h-4" /></span>
                    </div>
                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="font-bold tracking-tight text-white text-[19px] leading-tight">{c.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <p className="text-[13.5px] text-[#273744]/70 leading-relaxed">{c.desc}</p>
                    <ul className="mt-4 space-y-1.5">
                      {c.features.map(f => (
                        <li key={f} className="text-[13px] text-[#273744]/80 flex gap-2 leading-relaxed"><span className="text-[#087F83] mt-1 w-1 h-1 rounded-full bg-[#087F83] shrink-0" /> {f}</li>
                      ))}
                    </ul>
                    <div className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em] uppercase text-[#087F83] group-hover:gap-3 transition-all">
                      Explore capability <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 bg-[#10283F] rounded-[20px] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_16px_40px_rgba(16,40,63,0.14)]">
              <div>
                <h3 className="font-bold text-[16px] sm:text-[18px]">Not sure where to start?</h3>
                <p className="text-white/60 text-[13px] sm:text-[14px] mt-2 max-w-xl leading-relaxed">We recommend starting with an Assessment & Advisory — a rapid diagnostic of your coverage gaps, data quality and geospatial readiness.</p>
              </div>
              <Link href="/contact" className="shrink-0 bg-[#087F83] hover:bg-[#48BFC2] text-white px-6 h-11 rounded-full text-[12px] font-semibold tracking-[0.06em] uppercase inline-flex items-center gap-2 transition-colors">
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
