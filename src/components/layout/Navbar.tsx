"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/projects/geo-st4r", label: "Our Work" },
  { href: "/projects/geo-st4r", label: "Flagship Programme" },
  { href: "/leadership", label: "Leadership" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled 
          ? "bg-white/95 backdrop-blur-xl border-[#E2E8F0] shadow-[0_4px_30px_rgba(11,25,48,0.06)]" 
          : "bg-white border-transparent"
      )}>
        {/* Top bar - credibility strip */}
        <div className="hidden lg:block bg-[#0B1930] text-white/80 text-[11px] tracking-widest uppercase">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8 h-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse" />
                RC 7341058 • Incorporated 9 February 2024 • Kano, Nigeria
              </span>
              <span className="hidden xl:inline-flex items-center gap-2">
                <span className="w-px h-3 bg-white/20" />
                Digital Health Technology & Geospatial Intelligence
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>Partners: Natview Foundation • Data Science Network • Pathfinder Int.</span>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-[#0B1930] flex items-center justify-center text-white font-bold text-sm tracking-tight group-hover:bg-[#0E7C7B] transition-colors">
                MSS
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-[15px] tracking-tight leading-none text-[#0B1930]">MSS DIGITAL</div>
                <div className="font-display font-light text-[11px] tracking-[0.2em] uppercase text-[#0E7C7B] -mt-0.5">Solutions Ltd</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, 4).map((link) => (
                <Link
                  key={link.label + link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 text-[13px] font-medium tracking-wide rounded-full transition-colors",
                    pathname === link.href
                      ? "bg-[#0B1930] text-white"
                      : "text-[#334155] hover:text-[#0B1930] hover:bg-[#F1F5F9]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/projects/geo-st4r"
                className={cn(
                  "px-3.5 py-2 text-[13px] font-medium tracking-wide rounded-full transition-colors ml-1",
                  pathname === "/projects/geo-st4r" ? "bg-[#0E7C7B] text-white" : "bg-[#0E7C7B]/10 text-[#0E7C7B] hover:bg-[#0E7C7B] hover:text-white"
                )}
              >
                Geo-ST4R
              </Link>
              {navLinks.slice(5).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 text-[13px] font-medium tracking-wide rounded-full transition-colors",
                    pathname === link.href
                      ? "bg-[#0B1930] text-white"
                      : "text-[#334155] hover:text-[#0B1930] hover:bg-[#F1F5F9]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-2 bg-[#0E7C7B] hover:bg-[#0A5F5E] text-white text-[13px] font-semibold tracking-wide uppercase px-6 h-11 rounded-full transition-colors shadow-sm"
              >
                Partner With Us
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation"
                className="lg:hidden w-11 h-11 rounded-full bg-[#0B1930] text-white flex items-center justify-center hover:bg-[#132A4C] transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-[#0B1930]/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-[104px] left-0 right-0 bottom-0 bg-white overflow-y-auto">
            <nav className="p-6 space-y-1">
              <div className="mb-6 pb-6 border-b border-[#E2E8F0]">
                <p className="text-[11px] tracking-widest uppercase text-[#64748B] font-semibold mb-3">Navigation</p>
                {navLinks.map((link) => (
                  <Link
                    key={link.label + link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between py-3.5 px-4 rounded-xl text-[15px] font-medium transition-colors",
                      pathname === link.href ? "bg-[#0B1930] text-white" : "text-[#0B1930] hover:bg-[#F1F5F9]"
                    )}
                  >
                    {link.label}
                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                  </Link>
                ))}
              </div>
              
              <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0]">
                <p className="text-sm font-semibold text-[#0B1930]">Ready to partner?</p>
                <p className="text-sm text-[#64748B] mt-1 leading-relaxed">Let&apos;s discuss how MSS can support your health programme.</p>
                <Link
                  href="/contact"
                  className="mt-4 flex w-full items-center justify-center gap-2 bg-[#0E7C7B] text-white h-11 rounded-full text-sm font-semibold uppercase tracking-wide"
                >
                  Start a Conversation
                </Link>
              </div>

              <div className="pt-6 text-[11px] tracking-widest uppercase text-[#94A3B8] text-center">
                RC 7341058 • Kano, Nigeria • Incorporated 9 Feb 2024
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
