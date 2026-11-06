"use client"

import Link from "next/link"
import { useEffect } from "react"
import { AlertTriangle, RotateCcw } from "lucide-react"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log to the browser console; production logging can be wired to a provider here.
    console.error("MSS site error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#FAF9F7] flex items-center">
      <div className="container-mss py-16 lg:py-24">
        <div className="max-w-xl">
          <div className="eyebrow">Something went wrong</div>
          <h1 className="font-bold tracking-[-0.03em] leading-[0.95] text-[#252B31] mt-4" style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}>
            This section failed to load.
          </h1>
          <p className="text-[#343D46]/70 leading-relaxed mt-5 text-[15px]">
            An unexpected error occurred while rendering this page. You can retry, or return to the homepage and navigate from there.
          </p>
          <div className="mt-6 bg-white border border-[#E8EAEC] rounded-2xl p-4 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-[#701F3D] shrink-0 mt-0.5" />
            <div className="text-xs text-[#59636D] leading-relaxed">
              Reference: <span className="font-mono text-[#252B31]">{error.digest ?? "unavailable"}</span>
              <br />No enquiry data or personal information is affected by a page rendering error.
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={reset} className="inline-flex items-center gap-2 bg-[#701F3D] hover:bg-[#50152D] text-white px-6 h-11 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-colors">
              <RotateCcw className="w-4 h-4" /> Try again
            </button>
            <Link href="/" className="inline-flex items-center gap-2 bg-white border border-[#E8EAEC] hover:border-[#701F3D]/20 text-[#343D46] px-6 h-11 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-colors">
              Return Home
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#701F3D] px-2 h-11">
              Report this issue
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
