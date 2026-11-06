import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "navy"
  size?: "sm" | "md" | "lg"
}

const base = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

const variants = {
  primary: "bg-[#0E7C7B] text-white hover:bg-[#0A5F5E] shadow-sm hover:shadow-md",
  navy: "bg-[#0B1930] text-white hover:bg-[#132A4C] shadow-sm hover:shadow-md",
  secondary: "bg-white text-[#0B1930] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#0E7C7B]/30",
  outline: "border border-[#0B1930] text-[#0B1930] hover:bg-[#0B1930] hover:text-white",
  ghost: "text-[#0B1930] hover:bg-[#0E7C7B]/10",
}

const sizes = {
  sm: "h-9 px-4 text-sm rounded-full",
  md: "h-11 px-6 text-[13px] tracking-wide uppercase font-semibold rounded-full",
  lg: "h-12 px-8 text-[13px] tracking-widest uppercase font-semibold rounded-full",
}

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
  )
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
