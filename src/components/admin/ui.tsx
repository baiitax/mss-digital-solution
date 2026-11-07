import Link from "next/link"
import type { ReactNode } from "react"
import { relativeLabel } from "@/lib/time"

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-[21px] font-bold tracking-tight text-[#252B31]">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-[#59636D]">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export function Card({ title, description, actions, children, className = "", bodyClassName = "" }: {
  title?: string; description?: string; actions?: ReactNode; children: ReactNode; className?: string; bodyClassName?: string
}) {
  return (
    <section className={`rounded-xl border border-[#E3E6E8] bg-white ${className}`}>
      {(title || actions) && (
        <header className="flex items-center justify-between gap-3 border-b border-[#EDEFF1] px-4 py-3">
          <div>
            {title && <h2 className="text-[13.5px] font-semibold text-[#252B31]">{title}</h2>}
            {description && <p className="mt-0.5 text-[12px] text-[#89929B]">{description}</p>}
          </div>
          {actions}
        </header>
      )}
      <div className={bodyClassName || "p-4"}>{children}</div>
    </section>
  )
}

export function Stat({ label, value, hint, href, tone = "default" }: {
  label: string; value: number | string | null; hint?: string; href?: string; tone?: "default" | "attention" | "positive" | "muted"
}) {
  const toneClass =
    tone === "attention" ? "text-[#701F3D]" : tone === "positive" ? "text-[#2F6B4F]" : tone === "muted" ? "text-[#89929B]" : "text-[#252B31]"
  const body = (
    <>
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-[#89929B]">{label}</p>
      <p className={`mt-2 text-[26px] font-bold leading-none tracking-tight ${toneClass}`}>
        {value === null ? <span className="text-[15px] font-medium text-[#89929B]">Unavailable</span> : value}
      </p>
      {hint && <p className="mt-1.5 text-[11.5px] text-[#89929B]">{hint}</p>}
    </>
  )
  return href ? (
    <Link href={href} className="block rounded-xl border border-[#E3E6E8] bg-white p-4 transition-colors hover:border-[#701F3D]/35">
      {body}
    </Link>
  ) : (
    <div className="rounded-xl border border-[#E3E6E8] bg-white p-4">{body}</div>
  )
}

const STATUS_TONES: Record<string, string> = {
  published: "bg-[#EAF3EE] text-[#2F6B4F] border-[#2F6B4F]/20",
  active: "bg-[#EAF3EE] text-[#2F6B4F] border-[#2F6B4F]/20",
  approved: "bg-[#EAF3EE] text-[#2F6B4F] border-[#2F6B4F]/20",
  draft: "bg-[#F0F1F2] text-[#59636D] border-[#59636D]/20",
  new: "bg-[#F9E9EE] text-[#701F3D] border-[#701F3D]/20",
  review: "bg-[#FDF4E7] text-[#8A5A15] border-[#8A5A15]/20",
  suspended: "bg-[#FBEAEA] text-[#8F2D2D] border-[#8F2D2D]/20",
  archived: "bg-[#F0F1F2] text-[#89929B] border-[#89929B]/20",
  closed: "bg-[#F0F1F2] text-[#89929B] border-[#89929B]/20",
  invited: "bg-[#FDF4E7] text-[#8A5A15] border-[#8A5A15]/20",
  ok: "bg-[#EAF3EE] text-[#2F6B4F] border-[#2F6B4F]/20",
  operational: "bg-[#EAF3EE] text-[#2F6B4F] border-[#2F6B4F]/20",
  degraded: "bg-[#FDF4E7] text-[#8A5A15] border-[#8A5A15]/20",
  down: "bg-[#FBEAEA] text-[#8F2D2D] border-[#8F2D2D]/20",
}

const STATUS_LABELS: Record<string, string> = { ok: "operational" }

export function StatusPill({ status }: { status: string }) {
  const tone = STATUS_TONES[status?.toLowerCase()] ?? "bg-[#F0F1F2] text-[#59636D] border-[#59636D]/20"
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize ${tone}`}>
      {STATUS_LABELS[status?.toLowerCase()] ?? status?.replace(/_/g, " ")}
    </span>
  )
}

export function Empty({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F1F2] text-[#89929B]">—</div>
      <p className="text-[13.5px] font-semibold text-[#252B31]">{title}</p>
      {description && <p className="mt-1 max-w-sm text-[12.5px] leading-relaxed text-[#89929B]">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export function NotConfigured({ what, detail }: { what: string; detail: string }) {
  return (
    <div className="rounded-lg border border-dashed border-[#CBD2D7] bg-[#FAF9F7] px-4 py-6 text-center">
      <p className="text-[12.5px] font-semibold text-[#59636D]">{what} not connected</p>
      <p className="mx-auto mt-1 max-w-md text-[11.5px] leading-relaxed text-[#89929B]">{detail}</p>
    </div>
  )
}

export function RelativeTime({ iso }: { iso: string | null }) {
  if (!iso) return <span className="text-[#89929B]">—</span>
  return (
    <time dateTime={iso} title={new Date(iso).toLocaleString()}>
      {relativeLabel(iso)}
    </time>
  )
}

export function formatDate(iso: string | null) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}
