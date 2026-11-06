import Link from "next/link"
import { MapPin, Mail, Building2 } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#343D46] text-white">
      <div className="border-b border-white/[0.07] bg-white/[0.02]">
        <div className="container-mss py-8 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-semibold text-lg sm:text-xl tracking-tight">Let’s Build Health Systems That Reach Everyone.</h3>
            <p className="text-white/55 text-sm mt-2 max-w-2xl leading-relaxed">We collaborate with governments, development partners, academia, facilities and investors to deploy solutions that work in the field — not just the proposal.</p>
          </div>
          <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#701F3D] hover:bg-[#50152D] text-white px-8 h-12 rounded-full text-sm font-semibold tracking-wide uppercase transition-colors">
            Start a Partnership Conversation
          </Link>
        </div>
      </div>

      <div className="container-mss py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#701F3D] font-extrabold text-sm">MSS</div>
              <div>
                <div className="font-bold text-[14px] tracking-tight">MSS DIGITAL SOLUTIONS LTD</div>
                <div className="text-[11px] tracking-[0.16em] uppercase text-[#E8A0B8] font-semibold">RC 7341058 • Kano, Nigeria</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/55 max-w-md">
              A Kano-based health technology company at the intersection of clinical service delivery, geospatial intelligence and actionable health data.
              <span className="text-white/85 font-medium"> Digital health systems, geospatial intelligence and data analytics — built to reach the communities that services have not yet reached.</span>
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/65">
              <div className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 text-[#E8A0B8] shrink-0" /><span>No. 7 Alexandria Street, Gwale LGA, Kano State, Nigeria.</span></div>
              <div className="flex gap-3"><Mail className="w-4 h-4 mt-0.5 text-[#E8A0B8] shrink-0" /><span className="text-white/40">[verified email — admin-configurable]</span></div>
              <div className="flex gap-3"><Building2 className="w-4 h-4 mt-0.5 text-[#E8A0B8] shrink-0" /><span>Incorporated 9 February 2024 • RC 7341058</span></div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] tracking-[0.14em] uppercase font-bold text-white/30 mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ["Home","/"], ["About Us","/about"], ["Our Work","/our-work"], ["How We Work","/how-we-work"], ["Insights","/insights"], ["Leadership","/leadership"], ["Contact","/contact"]
              ].map(([l,h]) => <li key={l}><Link href={h} className="text-white/55 hover:text-white transition-colors">{l}</Link></li>)}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] tracking-[0.14em] uppercase font-bold text-white/30 mb-4">Capabilities</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ["Digital Health Systems","/capabilities/digital-health-systems"],
                ["Geospatial Intelligence","/capabilities/geospatial-intelligence"],
                ["Data Analytics","/capabilities/data-analytics"],
                ["Programme Management","/capabilities/programme-management"],
              ].map(([l,h]) => <li key={l}><Link href={h} className="text-white/55 hover:text-white transition-colors">{l}</Link></li>)}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] tracking-[0.14em] uppercase font-bold text-white/30 mb-4">Operating Philosophy</h4>
            <div className="bg-white/[0.05] border border-white/[0.07] rounded-2xl p-5">
              <p className="font-medium italic text-white leading-snug">“A tool that a facility cannot use is not a solution. It is a procurement.”</p>
              <p className="text-xs text-white/45 mt-3">We co-design with the teams that will use our systems — every time.</p>
            </div>
            <div className="mt-4 bg-[#701F3D]/20 border border-[#A34B68]/20 rounded-2xl p-4">
              <h5 className="text-sm font-semibold text-white">Work with MSS</h5>
              <ul className="mt-2 space-y-1 text-xs text-white/55">
                <li>• State & Federal Government</li>
                <li>• Development Partners & INGOs</li>
                <li>• Donor-funded Programmes</li>
                <li>• Academic & Research</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.07]">
        <div className="container-mss py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 MSS Digital Solutions Ltd. All rights reserved.</span>
            <span className="hidden sm:inline w-px h-3 bg-white/15" />
            <span>RC 7341058 • Kano, Nigeria</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/admin" className="hover:text-white">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
