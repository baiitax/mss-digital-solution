"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/projects/geo-st4r", label: "Our Work" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-[#E6EBED] shadow-[0_4px_24px_rgba(16,40,63,0.06)]"
            : "bg-white border-b border-transparent"
        )}
      >
        {/* Institutional top bar — desktop only, restrained */}
        <div className="hidden lg:block bg-[#0A1D30] text-white/70 text-[11px] tracking-[0.08em]">
          <div className="container-mss h-7 flex items-center justify-between">
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#48BFC2] animate-pulse" />
              RC 7341058 • Incorporated 9 February 2024 • Kano, Nigeria
              <span className="opacity-30">|</span> Digital Health & Geospatial Intelligence
            </span>
            <span className="text-white/50">Partners: Natview Foundation • Data Science Network • Pathfinder International</span>
          </div>
        </div>

        <div className="container-mss">
          <div className={cn("flex items-center justify-between gap-8 transition-all", scrolled ? "h-[68px]" : "h-[84px]")}>
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 rounded-[10px] bg-[#10283F] flex items-center justify-center text-white font-extrabold text-[13px] tracking-tight group-hover:bg-[#087F83] transition-colors">MSS</div>
              <div className="hidden sm:block leading-none">
                <div className="font-bold text-[14px] tracking-tight text-[#10283F]">MSS DIGITAL</div>
                <div className="font-medium text-[11px] tracking-[0.18em] uppercase text-[#087F83]">Solutions Ltd</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {links.map(l => {
                const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href))
                return (
                  <Link
                    key={l.label}
                    href={l.href}
                    className={cn(
                      "relative px-4 py-2 text-[13.5px] font-medium tracking-wide rounded-full transition-colors",
                      active ? "text-[#10283F] bg-[#F0F3F4]" : "text-[#273744] hover:text-[#10283F] hover:bg-[#FAFBF9]"
                    )}
                  >
                    {l.label}
                  </Link>
                )
              })}
              <Link href="/projects/geo-st4r" className={cn("ml-1 px-4 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-colors", pathname === "/projects/geo-st4r" ? "bg-[#087F83] text-white" : "bg-[#087F83]/10 text-[#087F83] hover:bg-[#087F83] hover:text-white")}>
                Geo-ST4R
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/contact" className="hidden md:inline-flex items-center gap-2 bg-[#10283F] hover:bg-[#0A1D30] text-white text-[12.5px] font-semibold tracking-[0.06em] uppercase px-6 h-10 rounded-full transition-colors">
                Partner With Us <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="lg:hidden w-10 h-10 rounded-full bg-[#10283F] text-white flex items-center justify-center hover:bg-[#0A1D30] transition-colors"
              >
                {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-[#0A1D30]/55 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 top-[68px] bottom-0 bg-[#FAFBF9] overflow-y-auto">
            <nav className="px-5 py-6 space-y-1">
              <p className="text-[11px] tracking-[0.14em] uppercase font-bold text-[#71808B] mb-3">Navigation</p>
              {links.map(l => (
                <Link key={l.label} href={l.href} className={cn("flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-colors", pathname === l.href ? "bg-[#10283F] text-white" : "bg-white border border-[#E6EBED] text-[#10283F] hover:border-[#10283F]/15")}>
                  {l.label} <ArrowUpRight className="w-4 h-4 opacity-40" />
                </Link>
              ))}
              <Link href="/projects/geo-st4r" className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-[#087F83] text-white font-medium">
                Geo-ST4R — Flagship Programme <ArrowUpRight className="w-4 h-4" />
              </Link>

              <div className="mt-6 bg-white border border-[#E6EBED] rounded-2xl p-5">
                <p className="text-sm font-semibold text-[#10283F]">Ready to partner?</p>
                <p className="text-sm text-[#71808B] mt-1.5 leading-relaxed">Let’s discuss how MSS can support your health programme.</p>
                <Link href="/contact" className="mt-4 flex w-full items-center justify-center gap-2 bg-[#087F83] text-white h-11 rounded-full text-sm font-semibold uppercase tracking-wide">
                  Start a Conversation
                </Link>
              </div>
              <p className="text-center text-[11px] tracking-widest uppercase text-[#71808B]/70 pt-6">RC 7341058 • Kano, Nigeria</p>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
