import Link from "next/link"
import { ArrowUpRight, MapPinned } from "lucide-react"
import { Logo } from "@/components/brand/Logo"

export const metadata = { title: "Page not found — MSS Digital Solutions" }

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] flex flex-col">
      <div className="bg-[#343D46] text-white">
        <div className="container-mss h-[84px] flex items-center">
          <Link href="/" className="flex items-center" aria-label="MSS Digital Solutions — home">
            <Logo tone="dark" height={38} priority className="h-[34px] sm:h-[38px] w-auto" />
          </Link>
        </div>
      </div>

      <main className="flex-1 flex items-center">
        <div className="container-mss py-16 lg:py-24">
          <div className="max-w-xl">
            <div className="eyebrow">Error 404</div>
            <h1 className="font-bold tracking-[-0.03em] leading-[0.95] text-[#252B31] mt-4" style={{ fontSize: "clamp(30px, 4vw, 48px)" }}>
              This page is not on the map.
            </h1>
            <p className="text-[#343D46]/70 leading-relaxed mt-5 text-[15px]">
              The address you followed does not correspond to a page on this site. It may have moved as part of our recent restructuring — the sections below cover everything currently published.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {[
                ["Home", "/"], ["About Us", "/about"], ["Capabilities", "/capabilities"],
                ["Our Work", "/our-work"], ["How We Work", "/how-we-work"], ["Insights", "/insights"], ["Contact", "/contact"],
              ].map(([l, h]) => (
                <Link key={h} href={h} className="inline-flex items-center gap-1.5 px-4 h-10 rounded-full bg-white border border-[#E8EAEC] text-[13px] font-medium text-[#252B31] hover:border-[#701F3D]/25 hover:text-[#701F3D] transition-colors">
                  {l}
                </Link>
              ))}
            </div>
            <div className="mt-8 bg-[#F9E9EE] border border-[#701F3D]/12 rounded-2xl p-5 flex gap-3">
              <MapPinned className="w-5 h-5 text-[#701F3D] shrink-0 mt-0.5" />
              <p className="text-[13px] text-[#343D46] leading-relaxed">
                Looking for the Geo-ST4R programme? It now lives at{" "}
                <Link href="/our-work/geo-st4r-kano" className="font-semibold text-[#701F3D] underline underline-offset-2">/our-work/geo-st4r-kano</Link>.
              </p>
            </div>
            <Link href="/" className="mt-7 inline-flex items-center gap-2 bg-[#701F3D] hover:bg-[#50152D] text-white px-6 h-11 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-colors">
              Return Home <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <div className="border-t border-[#E8EAEC] bg-white">
        <div className="container-mss py-5 text-xs text-[#89929B] flex flex-wrap items-center justify-between gap-3">
          <span>© 2026 MSS Digital Solutions Ltd • RC 7341058</span>
          <span className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-[#252B31]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#252B31]">Terms</Link>
          </span>
        </div>
      </div>
    </div>
  )
}
