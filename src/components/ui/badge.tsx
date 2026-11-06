import { cn } from "@/lib/utils"

export function Badge({ className, children, variant = "default" }: { className?: string; children: React.ReactNode; variant?: "default" | "teal" | "navy" | "muted" }) {
  const variants = {
    default: "bg-[#F1F5F9] text-[#334155] border-[#E2E8F0]",
    teal: "bg-[#E6F3F3] text-[#0E7C7B] border-[#0E7C7B]/20",
    navy: "bg-[#0B1930] text-white border-transparent",
    muted: "bg-white text-[#64748B] border-[#E2E8F0]",
  }
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border", variants[variant], className)}>
      {children}
    </span>
  )
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-[#0E7C7B]", className)}>
      <span className="w-8 h-px bg-[#0E7C7B]" />
      {children}
    </div>
  )
}
