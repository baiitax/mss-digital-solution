import Link from "next/link"
import { ChevronRight } from "lucide-react"

export type Crumb = { label: string; href?: string }

/**
 * Breadcrumb trail. Rendered on light or dark hero backgrounds.
 * Last item is the current page and is not a link.
 */
export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const base = tone === "dark" ? "text-white/45" : "text-[#89929B]"
  const hover = tone === "dark" ? "hover:text-white" : "hover:text-[#252B31]"
  const current = tone === "dark" ? "text-white/70" : "text-[#59636D]"

  return (
    <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-1.5 text-xs ${base}`}>
      <Link href="/" className={`transition-colors ${hover}`}>Home</Link>
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3 opacity-50" aria-hidden="true" />
          {item.href ? (
            <Link href={item.href} className={`transition-colors ${hover}`}>{item.label}</Link>
          ) : (
            <span className={current} aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
