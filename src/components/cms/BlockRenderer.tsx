import type { ReactNode } from "react"

/**
 * Server renderer for CMS content blocks.
 *
 * Blocks are structured JSON — never raw HTML — so nothing in here uses
 * dangerouslySetInnerHTML. Unknown block types are skipped rather than
 * guessed at, and every figure carries its admin-authored alt text.
 */
export type RenderBlock = { id?: string; type: string; [key: string]: unknown }

const str = (value: unknown): string => (typeof value === "string" ? value.trim() : "")
const lines = (value: unknown): string[] =>
  Array.isArray(value) ? value.map((v) => String(v)).filter((v) => v.trim().length > 0) : []

function splitLines(value: unknown, fields: number): string[][] {
  return lines(value)
    .map((line) => line.split("|").map((part) => part.trim()))
    .filter((parts) => parts.length >= fields && parts.some((p) => p.length > 0))
}

function renderBlock(block: RenderBlock, index: number): ReactNode {
  const key = block.id ?? `block-${index}`

  switch (block.type) {
    case "heading": {
      const text = str(block.text)
      if (!text) return null
      return (
        <h2 key={key} className="font-bold tracking-tight text-[#252B31] mt-10 mb-4" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>
          {text}
        </h2>
      )
    }

    case "rich_text": {
      const text = str(block.text)
      if (!text) return null
      return (
        <div key={key} className="space-y-4">
          {text.split(/\n{2,}/).map((paragraph, i) => (
            <p key={i} className="text-[15.5px] leading-[1.75] text-[#59636D]">
              {paragraph}
            </p>
          ))}
        </div>
      )
    }

    case "image": {
      const src = str(block.src)
      if (!src) return null
      return (
        <figure key={key} className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={str(block.alt)} className="w-full rounded-2xl border border-[#E8EAEC] object-cover" />
          {str(block.caption) && (
            <figcaption className="mt-2 text-[12.5px] text-[#89929B]">{str(block.caption)}</figcaption>
          )}
        </figure>
      )
    }

    case "gallery": {
      const images = lines(block.images)
      if (images.length === 0) return null
      return (
        <figure key={key} className="my-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt={str(block.caption) || `Gallery image ${i + 1}`} className="w-full rounded-xl border border-[#E8EAEC] object-cover" />
            ))}
          </div>
          {str(block.caption) && (
            <figcaption className="mt-2 text-[12.5px] text-[#89929B]">{str(block.caption)}</figcaption>
          )}
        </figure>
      )
    }

    case "two_column": {
      const left = str(block.left)
      const right = str(block.right)
      if (!left && !right) return null
      return (
        <div key={key} className="grid gap-6 sm:grid-cols-2 my-8">
          {[left, right].map((column, i) =>
            column ? (
              <div key={i} className="rounded-2xl border border-[#E8EAEC] bg-white p-5">
                <p className="text-[14.5px] leading-relaxed text-[#59636D] whitespace-pre-line">{column}</p>
              </div>
            ) : null
          )}
        </div>
      )
    }

    case "feature_grid": {
      const items = splitLines(block.items, 2)
      if (items.length === 0) return null
      return (
        <div key={key} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-8">
          {items.map(([title, body], i) => (
            <div key={i} className="rounded-2xl border border-[#E8EAEC] bg-white p-5">
              <h3 className="text-[14px] font-semibold text-[#252B31]">{title}</h3>
              {body && <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#59636D]">{body}</p>}
            </div>
          ))}
        </div>
      )
    }

    case "timeline": {
      const items = splitLines(block.items, 2)
      if (items.length === 0) return null
      return (
        <ol key={key} className="my-8 space-y-4 border-l border-[#E8EAEC] pl-5">
          {items.map(([label, title, body], i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#701F3D]" />
              {label && <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#701F3D]">{label}</div>}
              <div className="mt-1 text-[14.5px] font-semibold text-[#252B31]">{title}</div>
              {body && <p className="mt-1 text-[13.5px] leading-relaxed text-[#59636D]">{body}</p>}
            </li>
          ))}
        </ol>
      )
    }

    case "stats": {
      const items = splitLines(block.items, 2)
      if (items.length === 0) return null
      return (
        <div key={key} className="my-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {items.map(([value, label], i) => (
              <div key={i} className="rounded-2xl border border-[#E8EAEC] bg-white p-4">
                <div className="text-[24px] font-bold tracking-tight text-[#701F3D]">{value}</div>
                <div className="mt-1 text-[12.5px] text-[#59636D]">{label}</div>
              </div>
            ))}
          </div>
          {str(block.note) && <p className="mt-2 text-[11.5px] text-[#89929B]">{str(block.note)}</p>}
        </div>
      )
    }

    case "quote": {
      const text = str(block.text)
      if (!text) return null
      return (
        <blockquote key={key} className="my-8 border-l-2 border-[#701F3D] pl-5">
          <p className="text-[17px] leading-relaxed text-[#252B31]">{text}</p>
          {str(block.attribution) && (
            <footer className="mt-2 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[#89929B]">
              {str(block.attribution)}
            </footer>
          )}
        </blockquote>
      )
    }

    case "cta": {
      const heading = str(block.heading)
      if (!heading) return null
      return (
        <div key={key} className="my-10 rounded-2xl bg-[#343D46] p-6 sm:p-8 text-white">
          <h3 className="text-[20px] font-bold tracking-tight">{heading}</h3>
          {str(block.body) && <p className="mt-2 max-w-[620px] text-[14px] leading-relaxed text-white/70">{str(block.body)}</p>}
          {str(block.label) && str(block.href) && (
            <a
              href={str(block.href)}
              className="mt-4 inline-flex rounded-lg bg-[#701F3D] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#5c1932]"
            >
              {str(block.label)}
            </a>
          )}
        </div>
      )
    }

    case "video": {
      const url = str(block.url)
      if (!url) return null
      return (
        <figure key={key} className="my-8">
          <video src={url} controls className="w-full rounded-2xl border border-[#E8EAEC]" />
          {str(block.caption) && (
            <figcaption className="mt-2 text-[12.5px] text-[#89929B]">{str(block.caption)}</figcaption>
          )}
        </figure>
      )
    }

    default:
      return null
  }
}

export function BlockRenderer({ blocks }: { blocks: RenderBlock[] | null }) {
  if (!blocks || blocks.length === 0) return null
  return (
    <div className="max-w-[820px]">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  )
}
