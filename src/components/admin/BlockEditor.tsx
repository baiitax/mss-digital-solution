"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Copy, Plus, Trash2 } from "lucide-react"
import { newBlockId } from "@/lib/time"

export type Block = Record<string, unknown> & { id: string; type: string }

const BLOCK_LIBRARY: { type: string; label: string; description: string; fields: FieldSpec[] }[] = [
  { type: "heading", label: "Heading", description: "Section heading", fields: [{ key: "text", label: "Heading text", kind: "text" }] },
  { type: "rich_text", label: "Rich text", description: "Paragraph copy", fields: [{ key: "text", label: "Text", kind: "textarea", rows: 5 }] },
  { type: "image", label: "Image", description: "Single figure with caption", fields: [
    { key: "src", label: "Image URL", kind: "text" },
    { key: "alt", label: "Alt text", kind: "text" },
    { key: "caption", label: "Caption", kind: "text" },
  ] },
  { type: "gallery", label: "Image gallery", description: "Two to four figures", fields: [
    { key: "images", label: "Image URLs (one per line)", kind: "lines" },
    { key: "caption", label: "Caption", kind: "text" },
  ] },
  { type: "two_column", label: "Two column", description: "Side-by-side copy", fields: [
    { key: "left", label: "Left column", kind: "textarea", rows: 4 },
    { key: "right", label: "Right column", kind: "textarea", rows: 4 },
  ] },
  { type: "feature_grid", label: "Feature grid", description: "Cards of title + text", fields: [
    { key: "items", label: "Items — title | body (one per line)", kind: "lines" },
  ] },
  { type: "timeline", label: "Timeline", description: "Ordered stages", fields: [
    { key: "items", label: "Items — label | title | body (one per line)", kind: "lines" },
  ] },
  { type: "stats", label: "Statistics", description: "Only verified figures", fields: [
    { key: "items", label: "Items — value | label (one per line)", kind: "lines" },
    { key: "note", label: "Verification note", kind: "text" },
  ] },
  { type: "quote", label: "Quote", description: "Pull quote", fields: [
    { key: "text", label: "Quote", kind: "textarea", rows: 3 },
    { key: "attribution", label: "Attribution", kind: "text" },
  ] },
  { type: "cta", label: "Call to action", description: "Conversion panel", fields: [
    { key: "heading", label: "Heading", kind: "text" },
    { key: "body", label: "Body", kind: "textarea", rows: 2 },
    { key: "label", label: "Button label", kind: "text" },
    { key: "href", label: "Button destination", kind: "text" },
  ] },
  { type: "video", label: "Video embed", description: "Self-hosted or embed URL", fields: [
    { key: "url", label: "Video URL", kind: "text" },
    { key: "caption", label: "Caption", kind: "text" },
  ] },
]

type FieldSpec = { key: string; label: string; kind: "text" | "textarea" | "lines"; rows?: number }

export function BlockEditor({ name, initial }: { name: string; initial: Block[] }) {
  const [blocks, setBlocks] = useState<Block[]>(initial)
  const [adding, setAdding] = useState(false)

  const update = (index: number, key: string, value: unknown) =>
    setBlocks((current) => current.map((block, i) => (i === index ? { ...block, [key]: value } : block)))

  const move = (index: number, direction: -1 | 1) =>
    setBlocks((current) => {
      const next = [...current]
      const target = index + direction
      if (target < 0 || target >= next.length) return current
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })

  const add = (type: string) => {
    const spec = BLOCK_LIBRARY.find((b) => b.type === type)
    const blank: Block = { id: newBlockId(), type }
    spec?.fields.forEach((f) => {
      blank[f.key] = f.kind === "lines" ? [] : ""
    })
    setBlocks((current) => [...current, blank])
    setAdding(false)
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(blocks)} />

      <div className="space-y-3">
        {blocks.map((block, index) => {
          const spec = BLOCK_LIBRARY.find((b) => b.type === block.type)
          return (
            <div key={block.id} className="rounded-lg border border-[#E3E6E8] bg-white">
              <div className="flex items-center gap-2 border-b border-[#EDEFF1] bg-[#FAF9F7] px-3 py-2">
                <span className="rounded bg-[#252B31] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">{block.type.replace(/_/g, " ")}</span>
                <span className="text-[11.5px] text-[#89929B]">{spec?.description ?? "Custom block"}</span>
                <div className="ml-auto flex items-center gap-1">
                  <button type="button" onClick={() => move(index, -1)} aria-label="Move up" className="rounded p-1 text-[#59636D] hover:bg-[#E3E6E8] disabled:opacity-30" disabled={index === 0}>
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" onClick={() => move(index, 1)} aria-label="Move down" className="rounded p-1 text-[#59636D] hover:bg-[#E3E6E8] disabled:opacity-30" disabled={index === blocks.length - 1}>
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" onClick={() => setBlocks((c) => [...c.slice(0, index + 1), { ...block, id: `blk-${Date.now().toString(36)}` }, ...c.slice(index + 1)])} aria-label="Duplicate block" className="rounded p-1 text-[#59636D] hover:bg-[#E3E6E8]">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" onClick={() => setBlocks((c) => c.filter((_, i) => i !== index))} aria-label="Remove block" className="rounded p-1 text-[#8F2D2D] hover:bg-[#FBEAEA]">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="grid gap-3 p-3 sm:grid-cols-2">
                {spec?.fields.map((field) => {
                  const value = block[field.key]
                  const inputClass = "mt-1 w-full rounded-lg border border-[#DDE1E4] bg-white px-2.5 py-1.5 text-[12.5px] outline-none focus:border-[#701F3D]"
                  return (
                    <label key={field.key} className={field.kind === "lines" || field.kind === "textarea" ? "sm:col-span-2" : ""}>
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#59636D]">{field.label}</span>
                      {field.kind === "textarea" ? (
                        <textarea rows={field.rows ?? 3} value={String(value ?? "")} onChange={(e) => update(index, field.key, e.target.value)} className={inputClass} />
                      ) : field.kind === "lines" ? (
                        <textarea
                          rows={Math.max(3, (Array.isArray(value) ? value.length : 0) + 1)}
                          value={Array.isArray(value) ? value.join("\n") : String(value ?? "")}
                          onChange={(e) => update(index, field.key, e.target.value.split("\n").filter((l) => l.trim() !== ""))}
                          onBlur={(e) => update(index, field.key, e.target.value.split("\n").map((l) => l.trim()).filter(Boolean))}
                          className={inputClass}
                        />
                      ) : (
                        <input value={String(value ?? "")} onChange={(e) => update(index, field.key, e.target.value)} className={inputClass} />
                      )}
                    </label>
                  )
                })}
                {!spec && <p className="text-[12px] text-[#89929B] sm:col-span-2">This block type has no editable fields.</p>}
              </div>
            </div>
          )
        })}
      </div>

      {blocks.length === 0 && (
        <p className="rounded-lg border border-dashed border-[#CBD2D7] bg-[#FAF9F7] px-4 py-8 text-center text-[12.5px] text-[#89929B]">
          No content blocks yet. Add a block to start building this page.
        </p>
      )}

      <div className="mt-3">
        {adding ? (
          <div className="grid gap-2 rounded-lg border border-[#E3E6E8] bg-white p-3 sm:grid-cols-2 lg:grid-cols-3">
            {BLOCK_LIBRARY.map((b) => (
              <button key={b.type} type="button" onClick={() => add(b.type)} className="rounded-lg border border-[#E3E6E8] px-3 py-2 text-left hover:border-[#701F3D]/40 hover:bg-[#FAF9F7]">
                <p className="text-[12.5px] font-semibold text-[#252B31]">{b.label}</p>
                <p className="text-[11px] text-[#89929B]">{b.description}</p>
              </button>
            ))}
            <button type="button" onClick={() => setAdding(false)} className="rounded-lg px-3 py-2 text-[12px] text-[#89929B] hover:text-[#701F3D]">Cancel</button>
          </div>
        ) : (
          <button type="button" onClick={() => setAdding(true)} className="inline-flex items-center gap-1.5 rounded-lg border border-[#DDE1E4] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">
            <Plus className="h-3.5 w-3.5" /> Add block
          </button>
        )}
      </div>
    </div>
  )
}
