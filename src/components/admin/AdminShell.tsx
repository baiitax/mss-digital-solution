"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard, Activity, Bell, Home, FileText, Menu as MenuIcon, Layers, FolderKanban,
  MapPinned, Users, Newspaper, Image as ImageIcon, Mail, Handshake, Search, Settings,
  PanelBottom, ListTree, ArrowLeftRight, UserCog, ShieldCheck, ScrollText, HeartPulse,
  ChevronDown, LogOut, X, ExternalLink,
} from "lucide-react"
import type { IconKey } from "@/lib/admin/nav"
import type { NavSection } from "@/lib/admin/nav"
import { signOutAction } from "@/app/admin/actions/auth"
import { LogoMark } from "@/components/brand/Logo"

const ICONS: Record<IconKey, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard, activity: Activity, bell: Bell, home: Home, pages: FileText,
  navigation: ListTree, capabilities: Layers, projects: FolderKanban, geost4r: MapPinned,
  leadership: Users, insights: Newspaper, media: ImageIcon, enquiries: Mail, partnerships: Handshake,
  seo: Search, settings: Settings, footer: PanelBottom, forms: FileText, redirects: ArrowLeftRight,
  users: UserCog, roles: ShieldCheck, audit: ScrollText, health: HeartPulse, system: Settings,
}

type Badges = { enquiries: number; notifications: number; partnerships: number }

export function AdminShell({
  sections,
  badges,
  user,
  children,
}: {
  sections: NavSection[]
  badges: Badges
  user: { name: string; email: string; roles: string[] }
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/")

  const nav = (
    <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Administration modules">
      {sections.map((section) => (
        <div key={section.title} className="mb-4">
          {!collapsed && (
            <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">{section.title}</p>
          )}
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const Icon = ICONS[item.icon] ?? FileText
              const active = isActive(item.href, item.exact)
              const count = item.badge ? badges[item.badge] : 0
              return (
                <li key={item.href}>
                  <Link
                    onClick={() => setMobileOpen(false)}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={`group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors ${
                      active ? "bg-white text-[#252B31] font-semibold" : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {count > 0 && (
                      <span
                        className={`ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                          active ? "bg-[#701F3D] text-white" : "bg-[#701F3D] text-white"
                        }`}
                      >
                        {count > 99 ? "99+" : count}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-[#F0F1F2]">
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex fixed inset-y-0 left-0 z-40 flex-col bg-[#343D46] transition-[width] duration-200 ${
          collapsed ? "w-[68px]" : "w-[254px]"
        }`}
      >
        <div className="flex h-14 items-center gap-2.5 border-b border-white/10 px-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white p-[3px]">
            <LogoMark size={26} className="h-full w-auto" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold leading-none text-white">Administration</p>
              <p className="mt-1 truncate text-[10px] uppercase tracking-[0.14em] text-white/40">Digital Solutions</p>
            </div>
          )}
        </div>
        {nav}
        <div className="border-t border-white/10 p-2">
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[12px] text-white/55 hover:bg-white/10 hover:text-white"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${collapsed ? "-rotate-90" : ""}`} />
            {!collapsed && "Collapse"}
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} aria-hidden />
          <aside className="absolute inset-y-0 left-0 flex w-[264px] flex-col bg-[#343D46]">
            <div className="flex h-14 items-center justify-between border-b border-white/10 px-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white p-[3px]">
                  <LogoMark size={26} className="h-full w-auto" />
                </div>
                <span className="text-[13px] font-semibold text-white">Administration</span>
              </div>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="rounded-md p-1.5 text-white/70 hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>
            {nav}
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className={`${collapsed ? "lg:pl-[68px]" : "lg:pl-[254px]"} transition-[padding] duration-200`}>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-[#E3E6E8] bg-white/95 px-3 backdrop-blur sm:px-5">
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="rounded-md p-2 text-[#59636D] hover:bg-[#F0F1F2] lg:hidden">
            <MenuIcon className="h-5 w-5" />
          </button>
          <Breadcrumb pathname={pathname} sections={sections} />
          <div className="ml-auto flex items-center gap-1.5">
            <Link href="/admin/notifications" className="relative rounded-md p-2 text-[#59636D] hover:bg-[#F0F1F2]" aria-label="Notifications">
              <Bell className="h-4.5 w-4.5" />
              {badges.notifications > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#701F3D] px-1 text-[9px] font-bold text-white">
                  {badges.notifications > 9 ? "9+" : badges.notifications}
                </span>
              )}
            </Link>
            <Link href="/" target="_blank" className="hidden items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] font-medium text-[#59636D] hover:bg-[#F0F1F2] sm:inline-flex">
              <ExternalLink className="h-3.5 w-3.5" /> View site
            </Link>
            <div className="ml-1 flex items-center gap-2 border-l border-[#E3E6E8] pl-2">
              <div className="hidden text-right sm:block">
                <p className="text-[12px] font-semibold leading-none text-[#252B31]">{user.name || user.email}</p>
                <p className="mt-1 text-[10.5px] leading-none text-[#89929B]">{user.roles.join(" · ")}</p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F9E9EE] text-[11px] font-bold text-[#701F3D]">
                {(user.name || user.email).slice(0, 2).toUpperCase()}
              </div>
              <form action={signOutAction}>
                <button type="submit" aria-label="Sign out" title="Sign out" className="rounded-md p-2 text-[#59636D] hover:bg-[#F0F1F2]">
                  <LogOut className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </header>

        <main className="px-3 py-5 sm:px-5 lg:px-7 lg:py-7">{children}</main>
      </div>
    </div>
  )
}

function Breadcrumb({ pathname, sections }: { pathname: string; sections: NavSection[] }) {
  const flat = sections.flatMap((s) => s.items)
  const current = [...flat].sort((a, b) => b.href.length - a.href.length).find((i) => pathname === i.href || pathname.startsWith(i.href + "/"))
  const segments = pathname.split("/").filter(Boolean)
  const trail = current ? [current] : []
  return (
    <div className="flex min-w-0 items-center gap-1.5 text-[12px]">
      <Link href="/admin" className="text-[#89929B] hover:text-[#701F3D]">Admin</Link>
      {trail.map((item) => (
        <span key={item.href} className="flex items-center gap-1.5">
          <span className="text-[#CBD2D7]">/</span>
          <span className="truncate font-medium text-[#252B31]">{item.label}</span>
        </span>
      ))}
      {segments.length > 1 && !trail.length && (
        <span className="flex items-center gap-1.5">
          <span className="text-[#CBD2D7]">/</span>
          <span className="truncate font-medium text-[#252B31] capitalize">{segments.slice(1).join(" / ")}</span>
        </span>
      )}
    </div>
  )
}
