"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Capabilities",
    href: "/capabilities",
    children: [
      { href: "/capabilities/digital-health-systems", label: "Digital Health Systems" },
      { href: "/capabilities/geospatial-intelligence", label: "Geospatial Intelligence" },
      { href: "/capabilities/data-analytics", label: "Data Analytics" },
      { href: "/capabilities/programme-management", label: "Programme Management" },
    ],
  },
  { href: "/our-work", label: "Our Work" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [capOpen, setCapOpen] = useState(false)
  const [mobileCapOpen, setMobileCapOpen] = useState(false)
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setOpen(false); setMobileCapOpen(false) }, [pathname])

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href))

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/94 backdrop-blur-xl border-b border-[#E8EAEC] shadow-[0_4px_24px_rgba(52,61,70,0.06)]"
            : "bg-white border-b border-transparent"
        )}
      >
        {/* Institutional top bar — desktop only */}
        <div className="hidden lg:block bg-[#343D46] text-white/65 text-[11px] tracking-[0.07em]">
          <div className="container-mss h-7 flex items-center justify-between">
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A34B68] animate-pulse" />
              RC 7341058 • Incorporated 9 February 2024 • Kano, Nigeria
              <span className="opacity-25">|</span> Digital Health & Geospatial Intelligence
            </span>
            <span className="text-white/45 hidden xl:inline">Partners: Natview Foundation • Data Science Network • Pathfinder International</span>
          </div>
        </div>

        <div className="container-mss">
          <div className={cn("flex items-center justify-between gap-6 transition-all", scrolled ? "h-[68px]" : "h-[84px]")}>
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 rounded-[10px] bg-[#701F3D] flex items-center justify-center text-white font-extrabold text-[13px] tracking-tight group-hover:bg-[#50152D] transition-colors">MSS</div>
              <div className="hidden sm:block leading-none">
                <div className="font-bold text-[14px] tracking-tight text-[#252B31]">MSS DIGITAL</div>
                <div className="font-medium text-[11px] tracking-[0.18em] uppercase text-[#701F3D]">Solutions Ltd</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {links.map((l) => {
                if ("children" in l) {
                  const active = isActive(l.href)
                  return (
                    <div key={l.label} className="relative" onMouseEnter={() => setCapOpen(true)} onMouseLeave={() => setCapOpen(false)}>
                      <Link
                        href={l.href}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-4 py-2 text-[13.5px] font-medium tracking-wide rounded-full transition-colors",
                          active ? "text-[#701F3D] bg-[#F9E9EE]" : "text-[#343D46] hover:text-[#252B31] hover:bg-[#FAF9F7]"
                        )}
                      >
                        {l.label} <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", capOpen && "rotate-180")} />
                      </Link>
                      {/* Dropdown */}
                      <div className={cn("absolute top-full left-0 pt-2 transition-all duration-200", capOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-1 invisible")}>
                        <div className="bg-white border border-[#E8EAEC] rounded-2xl shadow-[0_16px_48px_rgba(52,61,70,0.12)] p-2 w-[300px]">
                          <Link href={l.href} className={cn("flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors", pathname === l.href ? "bg-[#701F3D] text-white" : "text-[#343D46] hover:bg-[#FAF9F7]")}>
                            Overview <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                          </Link>
                          <div className="h-px bg-[#E8EAEC] my-1.5" />
                          {(l.children ?? []).map((c) => (
                            <Link key={c.href} href={c.href} className={cn("flex items-center justify-between px-4 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors", pathname === c.href ? "bg-[#FAF9F7] text-[#701F3D]" : "text-[#252B31] hover:bg-[#FAF9F7] hover:text-[#701F3D]")}>
                              {c.label} <ArrowUpRight className="w-3.5 h-3.5 opacity-30" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                }
                const active = isActive(l.href)
                return (
                  <Link
                    key={l.label}
                    href={l.href}
                    className={cn(
                      "px-4 py-2 text-[13.5px] font-medium tracking-wide rounded-full transition-colors",
                      active ? "text-[#701F3D] bg-[#F9E9EE]" : "text-[#343D46] hover:text-[#252B31] hover:bg-[#FAF9F7]"
                    )}
                  >
                    {l.label}
                  </Link>
                )
              })}
              <Link href="/our-work/geo-st4r-kano" className={cn("ml-1 px-4 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-colors", pathname === "/our-work/geo-st4r-kano" ? "bg-[#701F3D] text-white" : "bg-[#701F3D]/10 text-[#701F3D] hover:bg-[#701F3D] hover:text-white")}>
                Geo-ST4R
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/contact" className="hidden md:inline-flex items-center gap-2 bg-[#701F3D] hover:bg-[#50152D] text-white text-[12.5px] font-semibold tracking-[0.06em] uppercase px-6 h-10 rounded-full transition-colors">
                Partner With Us <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="lg:hidden w-10 h-10 rounded-full bg-[#701F3D] text-white flex items-center justify-center hover:bg-[#50152D] transition-colors"
              >
                {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-[#1A1F24]/50 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute inset-x-0 top-0 bottom-0 bg-[#FAF9F7] overflow-y-auto pt-[84px]">
            <nav className="px-5 py-6 space-y-1">
              <p className="text-[11px] tracking-[0.14em] uppercase font-bold text-[#89929B] mb-3">Navigation</p>
              {links.map((l) => {
                if ("children" in l) {
                  const active = pathname.startsWith(l.href)
                  return (
                    <div key={l.label}>
                      <div className="flex gap-2">
                        <Link href={l.href} className={cn("flex-1 flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-colors", active ? "bg-[#701F3D] text-white" : "bg-white border border-[#E8EAEC] text-[#252B31] hover:border-[#701F3D]/15")}>
                          {l.label}
                        </Link>
                        <button onClick={() => setMobileCapOpen(!mobileCapOpen)} aria-label="Toggle capabilities" className={cn("w-[52px] rounded-xl flex items-center justify-center border transition-colors", active ? "bg-[#701F3D] text-white border-[#701F3D]" : "bg-white border-[#E8EAEC] text-[#252B31]")}>
                          <ChevronDown className={cn("w-5 h-5 transition-transform", mobileCapOpen && "rotate-180")} />
                        </button>
                      </div>
                      {mobileCapOpen && (
                        <div className="mt-2 ml-2 space-y-1 border-l-2 border-[#701F3D]/15 pl-3">
                          {(l.children ?? []).map((c) => (
                            <Link key={c.href} href={c.href} className={cn("flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-medium transition-colors", pathname === c.href ? "bg-[#701F3D] text-white" : "bg-white border border-[#E8EAEC] text-[#252B31]")}>
                              {c.label} <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }
                return (
                  <Link key={l.label} href={l.href} className={cn("flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-colors", pathname === l.href ? "bg-[#701F3D] text-white" : "bg-white border border-[#E8EAEC] text-[#252B31] hover:border-[#701F3D]/15")}>
                    {l.label} <ArrowUpRight className="w-4 h-4 opacity-40" />
                  </Link>
                )
              })}
              <Link href="/our-work/geo-st4r-kano" className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-[#701F3D] text-white font-medium">
                Geo-ST4R — Flagship Programme <ArrowUpRight className="w-4 h-4" />
              </Link>

              <div className="mt-6 bg-white border border-[#E8EAEC] rounded-2xl p-5">
                <p className="text-sm font-semibold text-[#252B31]">Ready to partner?</p>
                <p className="text-sm text-[#59636D] mt-1.5 leading-relaxed">Let’s discuss how MSS can support your health programme.</p>
                <Link href="/contact" className="mt-4 flex w-full items-center justify-center gap-2 bg-[#701F3D] text-white h-11 rounded-full text-sm font-semibold uppercase tracking-wide">
                  Start a Conversation
                </Link>
              </div>
              <p className="text-center text-[11px] tracking-widest uppercase text-[#89929B]/70 pt-6">RC 7341058 • Kano, Nigeria</p>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
