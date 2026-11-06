"use client"

import { useState, useEffect, useRef } from "react"
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
  const [drawerOffset, setDrawerOffset] = useState(64)
  const pathname = usePathname()

  const headerRef = useRef<HTMLElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const capabilitiesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Measure the real header height so the drawer starts exactly beneath it
  // (the header shrinks on scroll, so a hard-coded offset would leave a gap).
  useEffect(() => {
    if (!open) return
    const measure = () => setDrawerOffset(headerRef.current?.offsetHeight ?? 64)
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [open, scrolled])

  // Escape closes whichever surface is open; focus returns to the toggle.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      if (capOpen) setCapOpen(false)
      if (open) {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, capOpen])

  // Move focus into the drawer when it opens.
  useEffect(() => {
    if (!open) return
    const first = dialogRef.current?.querySelector<HTMLElement>("a, button")
    first?.focus()
  }, [open])

  // Close the dropdown when focus leaves it.
  useEffect(() => {
    if (!capOpen) return
    const onFocusIn = (e: FocusEvent) => {
      if (!capabilitiesRef.current?.contains(e.target as Node)) setCapOpen(false)
    }
    document.addEventListener("focusin", onFocusIn)
    return () => document.removeEventListener("focusin", onFocusIn)
  }, [capOpen])

  // Close the drawer on route change (deferred so it is not a sync setState in
  // the effect body).
  useEffect(() => {
    const id = setTimeout(() => {
      setOpen(false)
      setMobileCapOpen(false)
      setCapOpen(false)
    }, 0)
    return () => clearTimeout(id)
  }, [pathname])

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href))

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 inset-x-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-[#E8EAEC] shadow-[0_4px_24px_rgba(52,61,70,0.07)]"
            : "bg-white border-b border-transparent"
        )}
      >
        {/* Institutional top bar — desktop only */}
        <div className="hidden lg:block bg-[#343D46] text-white/65 text-[11px] tracking-[0.07em]">
          <div className="container-mss h-7 flex items-center justify-between">
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A34B68] animate-pulse" />
              RC 7341058 • Incorporated 9 February 2024 • Kano, Nigeria
              <span className="opacity-25">|</span> Digital Health &amp; Geospatial Intelligence
            </span>
            <span className="text-white/45 hidden xl:inline">Partners: Natview Foundation • Data Science Network • Pathfinder International</span>
          </div>
        </div>

        <div className="container-mss">
          <div
            className={cn(
              "flex items-center justify-between gap-3 xl:gap-6 transition-[height] duration-300",
              scrolled ? "h-[60px] lg:h-[68px]" : "h-16 lg:h-[84px]"
            )}
          >
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group" aria-label="MSS Digital Solutions — home">
              <span className="w-9 h-9 lg:w-10 lg:h-10 rounded-[10px] bg-[#701F3D] flex items-center justify-center text-white font-extrabold text-[12px] lg:text-[13px] tracking-tight group-hover:bg-[#50152D] transition-colors">
                MSS
              </span>
              <span className="block leading-none">
                <span className="block font-bold text-[12px] sm:text-[13px] lg:text-[14px] tracking-tight text-[#252B31] whitespace-nowrap">MSS DIGITAL</span>
                <span className="block font-medium text-[9px] sm:text-[10px] lg:text-[11px] tracking-[0.14em] sm:tracking-[0.16em] lg:tracking-[0.18em] uppercase text-[#701F3D] whitespace-nowrap">Solutions Ltd</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
              {links.map((l) => {
                if ("children" in l) {
                  const active = isActive(l.href)
                  return (
                    <div
                      key={l.label}
                      ref={capabilitiesRef}
                      className="relative"
                      onMouseEnter={() => setCapOpen(true)}
                      onMouseLeave={() => setCapOpen(false)}
                    >
                      <Link
                        href={l.href}
                        aria-expanded={capOpen}
                        aria-haspopup="true"
                        onFocus={() => setCapOpen(true)}
                        onClick={() => setCapOpen(false)}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 xl:px-3.5 py-2 text-[12.5px] xl:text-[13.5px] font-medium tracking-wide rounded-full whitespace-nowrap transition-colors",
                          active ? "text-[#701F3D] bg-[#F9E9EE]" : "text-[#343D46] hover:text-[#252B31] hover:bg-[#FAF9F7]"
                        )}
                      >
                        {l.label} <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", capOpen && "rotate-180")} />
                      </Link>
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
                      "px-2.5 xl:px-3.5 py-2 text-[12.5px] xl:text-[13.5px] font-medium tracking-wide rounded-full whitespace-nowrap transition-colors",
                      active ? "text-[#701F3D] bg-[#F9E9EE]" : "text-[#343D46] hover:text-[#252B31] hover:bg-[#FAF9F7]"
                    )}
                  >
                    {l.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-1.5 bg-[#701F3D] hover:bg-[#50152D] text-white text-[11.5px] xl:text-[12.5px] font-semibold tracking-[0.05em] xl:tracking-[0.06em] uppercase px-4 xl:px-6 h-10 rounded-full whitespace-nowrap transition-colors"
              >
                Partner With Us <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <button
                ref={toggleRef}
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="lg:hidden w-11 h-11 -mr-1 rounded-full bg-[#701F3D] text-white flex items-center justify-center hover:bg-[#50152D] active:bg-[#50152D] transition-colors touch-manipulation"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Reserves the space the fixed header would otherwise overlap. */}
      <div aria-hidden="true" className="h-16 lg:h-[112px]" />

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            id="mobile-menu"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            style={{ paddingTop: drawerOffset }}
            className="absolute inset-x-0 top-0 bottom-0 bg-[#FAF9F7] overflow-y-auto overscroll-contain"
          >
            <nav className="px-4 sm:px-5 py-5 space-y-1.5" aria-label="Mobile">
              <p className="text-[11px] tracking-[0.14em] uppercase font-bold text-[#89929B] mb-2 px-1">Navigation</p>
              {links.map((l) => {
                if ("children" in l) {
                  const active = pathname.startsWith(l.href)
                  return (
                    <div key={l.label}>
                      <div className="flex gap-2">
                        <Link
                          href={l.href}
                          className={cn("flex-1 flex items-center justify-between px-4 min-h-[52px] rounded-xl text-[15px] font-medium transition-colors", active ? "bg-[#701F3D] text-white" : "bg-white border border-[#E8EAEC] text-[#252B31] active:border-[#701F3D]/30")}
                        >
                          {l.label}
                        </Link>
                        <button
                          onClick={() => setMobileCapOpen(!mobileCapOpen)}
                          aria-label={mobileCapOpen ? "Collapse capabilities" : "Expand capabilities"}
                          aria-expanded={mobileCapOpen}
                          className={cn("w-[52px] min-h-[52px] rounded-xl flex items-center justify-center border transition-colors", active ? "bg-[#701F3D] text-white border-[#701F3D]" : "bg-white border-[#E8EAEC] text-[#252B31]")}
                        >
                          <ChevronDown className={cn("w-5 h-5 transition-transform", mobileCapOpen && "rotate-180")} />
                        </button>
                      </div>
                      {mobileCapOpen && (
                        <div className="mt-2 ml-2 space-y-1.5 border-l-2 border-[#701F3D]/15 pl-3">
                          {(l.children ?? []).map((c) => (
                            <Link key={c.href} href={c.href} className={cn("flex items-center justify-between px-4 min-h-[48px] rounded-xl text-[14px] font-medium transition-colors", pathname === c.href ? "bg-[#701F3D] text-white" : "bg-white border border-[#E8EAEC] text-[#252B31]")}>
                              {c.label} <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }
                return (
                  <Link key={l.label} href={l.href} className={cn("flex items-center justify-between px-4 min-h-[52px] rounded-xl text-[15px] font-medium transition-colors", pathname === l.href ? "bg-[#701F3D] text-white" : "bg-white border border-[#E8EAEC] text-[#252B31] active:border-[#701F3D]/30")}>
                    {l.label} <ArrowUpRight className="w-4 h-4 opacity-40" />
                  </Link>
                )
              })}

              <Link href="/our-work/geo-st4r-kano" className="flex items-center justify-between px-4 min-h-[52px] rounded-xl bg-[#701F3D] text-white font-medium">
                Geo-ST4R — Flagship Programme <ArrowUpRight className="w-4 h-4" />
              </Link>

              <div className="mt-4 bg-white border border-[#E8EAEC] rounded-2xl p-4">
                <p className="text-sm font-semibold text-[#252B31]">Ready to partner?</p>
                <p className="text-[13px] text-[#59636D] mt-1.5 leading-relaxed">Let’s discuss how MSS can support your health programme.</p>
                <Link href="/contact" className="mt-3 flex w-full items-center justify-center gap-2 bg-[#701F3D] text-white h-11 rounded-full text-[13px] font-semibold uppercase tracking-wide">
                  Start a Conversation
                </Link>
              </div>
              <p className="text-center text-[11px] tracking-[0.14em] uppercase text-[#89929B]/80 pt-4 pb-6">
                RC 7341058 • Kano, Nigeria
              </p>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
