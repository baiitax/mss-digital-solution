"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AlertTriangle } from "lucide-react"

type SiteStatus = { maintenance_mode: boolean; message: string | null }

/**
 * Public maintenance notice, driven by `site_status` — the public setting the
 * System Settings module writes. The public routes are statically rendered, so
 * the state is fetched from /api/site-status on mount rather than baked into
 * the HTML; a change made in the portal appears on the next page load.
 *
 * Never shown inside the administration portal.
 */
export function MaintenanceBar() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin") ?? false
  const [status, setStatus] = useState<SiteStatus | null>(null)

  useEffect(() => {
    if (isAdmin) return
    let cancelled = false
    fetch("/api/site-status", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: SiteStatus | null) => {
        if (!cancelled && data) setStatus(data)
      })
      .catch(() => undefined)
    return () => {
      cancelled = true
    }
  }, [isAdmin, pathname])

  if (isAdmin || !status?.maintenance_mode || !status.message) return null

  return (
    <div role="status" className="bg-[#8A5A15] text-white">
      <div className="container-mss flex items-center gap-2 py-2 text-[12.5px]">
        <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="leading-snug">{status.message}</p>
      </div>
    </div>
  )
}
