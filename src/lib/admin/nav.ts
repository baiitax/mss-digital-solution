export type NavItem = {
  label: string
  href: string
  permission: string
  icon: IconKey
  badge?: "enquiries" | "notifications" | "partnerships"
  exact?: boolean
}

export type NavSection = { title: string; items: NavItem[] }

export type IconKey =
  | "dashboard" | "activity" | "bell" | "home" | "pages" | "navigation" | "capabilities"
  | "projects" | "geost4r" | "leadership" | "insights" | "media" | "enquiries"
  | "partnerships" | "seo" | "settings" | "footer" | "forms" | "redirects" | "users"
  | "roles" | "audit" | "health" | "system"

/**
 * Portal navigation. Items are filtered by permission on the server before render,
 * so an inaccessible module never reaches the browser — presentation follows access,
 * it does not grant it.
 */
export const ADMIN_NAV: NavSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", permission: "dashboard.view", icon: "dashboard", exact: true },
      { label: "Activity Centre", href: "/admin/activity", permission: "dashboard.view", icon: "activity" },
      { label: "Notifications", href: "/admin/notifications", permission: "notifications.view", icon: "bell", badge: "notifications" },
    ],
  },
  {
    title: "Website Management",
    items: [
      { label: "Homepage Manager", href: "/admin/homepage", permission: "homepage.manage", icon: "home" },
      { label: "Pages Manager", href: "/admin/pages", permission: "pages.view", icon: "pages" },
      { label: "Navigation Manager", href: "/admin/navigation", permission: "navigation.manage", icon: "navigation" },
      { label: "Capabilities Manager", href: "/admin/capabilities", permission: "capabilities.view", icon: "capabilities" },
      { label: "Projects & Case Studies", href: "/admin/projects", permission: "projects.view", icon: "projects" },
      { label: "Geo-ST4R Manager", href: "/admin/geo-st4r", permission: "geost4r.manage", icon: "geost4r" },
      { label: "Leadership Manager", href: "/admin/leadership", permission: "leadership.view", icon: "leadership" },
      { label: "Insights & Publications", href: "/admin/insights", permission: "insights.view", icon: "insights" },
      { label: "Media Library", href: "/admin/media", permission: "media.view", icon: "media" },
    ],
  },
  {
    title: "Business Operations",
    items: [
      { label: "Contact Enquiries", href: "/admin/enquiries", permission: "enquiries.view", icon: "enquiries", badge: "enquiries" },
      { label: "Partnership Requests", href: "/admin/partnerships", permission: "partnerships.view", icon: "partnerships", badge: "partnerships" },
    ],
  },
  {
    title: "Website Configuration",
    items: [
      { label: "SEO Manager", href: "/admin/seo", permission: "seo.manage", icon: "seo" },
      { label: "Website Settings", href: "/admin/settings", permission: "settings.view", icon: "settings" },
      { label: "Forms", href: "/admin/forms", permission: "settings.view", icon: "forms" },
      { label: "Footer Manager", href: "/admin/footer", permission: "navigation.manage", icon: "footer" },
      { label: "Redirect Manager", href: "/admin/redirects", permission: "navigation.manage", icon: "redirects" },
    ],
  },
  {
    title: "System Administration",
    items: [
      { label: "User Management", href: "/admin/users", permission: "users.manage", icon: "users" },
      { label: "Roles & Permissions", href: "/admin/roles", permission: "roles.manage", icon: "roles" },
      { label: "Audit Logs", href: "/admin/audit-logs", permission: "audit.view", icon: "audit" },
      { label: "System Settings", href: "/admin/system/settings", permission: "system.view", icon: "system" },
      { label: "System Health", href: "/admin/system/health", permission: "system.view", icon: "health" },
    ],
  },
]

export function filterNav(sections: NavSection[], permissions: string[]): NavSection[] {
  return sections
    .map((section) => ({ ...section, items: section.items.filter((item) => permissions.includes(item.permission)) }))
    .filter((section) => section.items.length > 0)
}

export function firstAllowedPath(permissions: string[]): string {
  for (const section of ADMIN_NAV) {
    for (const item of section.items) if (permissions.includes(item.permission)) return item.href
  }
  return "/admin/forbidden"
}
