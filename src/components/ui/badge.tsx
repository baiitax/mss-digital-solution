import { cn } from "@/lib/utils"

export function Badge({ className, children, variant = "default" }: { className?: string; children: React.ReactNode; variant?: "default" | "burgundy" | "storm" | "muted" | "teal" | "navy" }) {
  const variants = {
    default: "bg-[#F0F1F2] text-[#252B31] border-[#E8EAEC]",
    burgundy: "bg-[#F9E9EE] text-[#701F3D] border-[#701F3D]/15",
    storm: "bg-[#343D46] text-white border-transparent",
    muted: "bg-white text-[#59636D] border-[#E8EAEC]",
    // legacy aliases
    teal: "bg-[#F9E9EE] text-[#701F3D] border-[#701F3D]/15",
    navy: "bg-[#343D46] text-white border-transparent",
  }
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase border", variants[variant], className)}>
      {children}
    </span>
  )
}

export function Eyebrow({ children, className, light }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <div className={cn(light ? "eyebrow eyebrow-light" : "eyebrow", className)}>
      {children}
    </div>
  )
}
