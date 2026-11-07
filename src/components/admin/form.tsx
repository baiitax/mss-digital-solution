"use client"

import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import type { ReactNode } from "react"

export function SubmitButton({ children = "Save", variant = "primary", className = "" }: {
  children?: ReactNode; variant?: "primary" | "secondary" | "danger"; className?: string
}) {
  const { pending } = useFormStatus()
  const base =
    variant === "danger"
      ? "bg-[#8F2D2D] hover:bg-[#722323] text-white"
      : variant === "secondary"
        ? "border border-[#DDE1E4] bg-white text-[#252B31] hover:bg-[#F0F1F2]"
        : "bg-[#701F3D] hover:bg-[#50152D] text-white"
  return (
    <button type="submit" disabled={pending} className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12.5px] font-semibold transition-colors disabled:opacity-60 ${base} ${className}`}>
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
      {pending ? "Working…" : children}
    </button>
  )
}

const inputClass =
  "mt-1 w-full rounded-lg border border-[#DDE1E4] bg-white px-3 py-2 text-[13px] text-[#252B31] outline-none focus:border-[#701F3D] focus:ring-2 focus:ring-[#701F3D]/12"

export function Field({ label, hint, children, className = "" }: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#59636D]">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] leading-snug text-[#89929B]">{hint}</span>}
    </label>
  )
}

export function TextInput({ name, defaultValue, placeholder, type = "text", required, className = "" }: {
  name: string; defaultValue?: string | number | null; placeholder?: string; type?: string; required?: boolean; className?: string
}) {
  return <input name={name} type={type} defaultValue={defaultValue ?? ""} placeholder={placeholder} required={required} className={`${inputClass} ${className}`} />
}

export function TextArea({ name, defaultValue, rows = 4, placeholder, className = "" }: {
  name: string; defaultValue?: string | null; rows?: number; placeholder?: string; className?: string
}) {
  return <textarea name={name} rows={rows} defaultValue={defaultValue ?? ""} placeholder={placeholder} className={`${inputClass} leading-relaxed ${className}`} />
}

export function Select({ name, defaultValue, options, className = "" }: {
  name: string; defaultValue?: string; options: { value: string; label: string }[]; className?: string
}) {
  return (
    <select name={name} defaultValue={defaultValue} className={`${inputClass} ${className}`}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

export function Checkbox({ name, defaultChecked, label }: { name: string; defaultChecked?: boolean; label: string }) {
  return (
    <label className="flex items-center gap-2 text-[12.5px] text-[#252B31]">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 rounded border-[#DDE1E4] text-[#701F3D] focus:ring-[#701F3D]/30" />
      {label}
    </label>
  )
}

export function Notice({ tone = "success", children }: { tone?: "success" | "error" | "info"; children: ReactNode }) {
  const tones = {
    success: "border-[#2F6B4F]/25 bg-[#EAF3EE] text-[#2F6B4F]",
    error: "border-[#8F2D2D]/25 bg-[#FBEAEA] text-[#8F2D2D]",
    info: "border-[#59636D]/25 bg-[#F0F1F2] text-[#59636D]",
  } as const
  return <div className={`mb-4 rounded-lg border px-3 py-2 text-[12.5px] ${tones[tone]}`}>{children}</div>
}
