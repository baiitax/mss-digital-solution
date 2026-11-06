import { cn } from "@/lib/utils"

export function Badge({ className, children, variant = "default" }: { className?: string; children: React.ReactNode; variant?: "default" | "teal" | "navy" | "muted" }) {
  const variants = {
    default: "bg-[#F0F3F4] text-[#273744] border-[#E6EBED]",
    teal: "bg-[#E6F5F6] text-[#087F83] border-[#087F83]/15",
    navy: "bg-[#10283F] text-white border-transparent",
    muted: "bg-white text-[#71808B] border-[#E6EBED]",
  }
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase border", variants[variant], className)}>
      {children}
    </span>
  )
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("eyebrow", className)}>
      {children}
    </div>
  )
}
