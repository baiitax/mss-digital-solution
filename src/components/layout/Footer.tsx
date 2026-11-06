import Link from "next/link"
import { MapPin, Mail, Shield, Building2 } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0B1930] text-white relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* CTA Banner */}
      <div className="relative border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight">Let&apos;s Build Health Systems That Reach Everyone.</h3>
            <p className="text-white/70 mt-2 text-sm max-w-2xl leading-relaxed">
              We collaborate with state governments, development partners, academic institutions, healthcare facilities and private investors to deploy solutions that work in the field — not just in the proposal.
            </p>
          </div>
          <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#0E7C7B] hover:bg-[#14B8A6] text-white px-8 h-12 rounded-full text-sm font-semibold tracking-widest uppercase transition-colors">
            Start a Partnership Conversation
          </Link>
        </div>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#0B1930] font-bold text-sm">MSS</div>
              <div>
                <div className="font-display font-bold text-[15px] tracking-tight leading-none">MSS DIGITAL SOLUTIONS LTD</div>
                <div className="text-[11px] tracking-[0.18em] uppercase text-[#14B8A6] font-medium">RC 7341058 • Kano, Nigeria</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/70 max-w-md">
              A Kano-based health technology company operating at the intersection of clinical service delivery, geospatial intelligence and actionable health data. 
              <span className="text-white/90 font-medium"> Digital health systems, geospatial intelligence and data analytics — built to reach the communities that services have not yet reached.</span>
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-start gap-3 text-white/80">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#14B8A6]" />
                <span>No. 7 Alexandria Street, Gwale LGA, Kano State, Nigeria.</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="w-4 h-4 shrink-0 text-[#14B8A6]" />
                <span className="text-white/60">[verified email placeholder — admin-configurable]</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Building2 className="w-4 h-4 shrink-0 text-[#14B8A6]" />
                <span>Incorporated 9 February 2024 • RC 7341058</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Link href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0E7C7B] flex items-center justify-center transition-colors">
                <span className="text-xs font-bold">in</span>
              </Link>
              <span className="text-xs text-white/50">[Social links verified on admin]</span>
            </div>
          </div>

          {/* Nav */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] tracking-widest uppercase font-semibold text-white/40 mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ["Home", "/"],
                ["About Us", "/about"],
                ["Capabilities", "/capabilities"],
                ["Flagship: Geo-ST4R", "/projects/geo-st4r"],
                ["Leadership", "/leadership"],
                ["Insights", "/insights"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={label}><Link href={href} className="text-white/70 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] tracking-widest uppercase font-semibold text-white/40 mb-4">Capabilities</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ["Digital Health Systems", "/capabilities/digital-health"],
                ["Geospatial Intelligence", "/capabilities/geospatial"],
                ["Data Analytics", "/capabilities/analytics"],
                ["Programme Management", "/capabilities/programme-management"],
              ].map(([label, href]) => (
                <li key={label}><Link href={href} className="text-white/70 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] tracking-widest uppercase font-semibold text-white/40 mb-4">Operating Philosophy</h4>
            <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-5">
              <p className="font-display text-lg leading-snug font-medium italic text-white">
                &ldquo;A tool that a facility cannot use is not a solution. It is a procurement.&rdquo;
              </p>
              <p className="text-xs text-white/60 mt-3 leading-relaxed">We co-design with the organisations and frontline teams that will use our systems — every time.</p>
            </div>

            <div className="mt-6 bg-[#0E7C7B]/20 border border-[#14B8A6]/20 rounded-2xl p-5">
              <h5 className="text-sm font-semibold">Work with MSS</h5>
              <ul className="mt-2 space-y-1.5 text-xs text-white/70">
                <li>• State & Federal Government</li>
                <li>• Development Partners & INGOs</li>
                <li>• Donor-funded Health Programmes</li>
                <li>• Academic & Research Institutions</li>
              </ul>
              <Link href="/contact" className="mt-4 inline-flex text-xs font-semibold tracking-widest uppercase text-[#14B8A6] hover:text-white transition-colors">
                Enquire → 
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 MSS Digital Solutions Ltd. All rights reserved.</span>
            <span className="hidden sm:inline w-px h-3 bg-white/20" />
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> NDPA-aware • No patient data collected on public site</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
