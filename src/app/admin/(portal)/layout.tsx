import type { Metadata } from "next"
import { requireAdmin } from "@/lib/auth/guards"
import { filterNav, ADMIN_NAV } from "@/lib/admin/nav"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { AdminShell } from "@/components/admin/AdminShell"

export const metadata: Metadata = {
  title: "Administration — MSS Digital Solutions",
  robots: { index: false, follow: false },
}

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin()
  const supabase = await createSupabaseServerClient()

  const [enquiries, partnerships, notifications] = await Promise.all([
    session.permissions.includes("enquiries.view")
      ? supabase.from("contact_enquiries").select("id", { count: "exact", head: true }).is("read_at", null).is("deleted_at", null)
      : Promise.resolve({ count: 0 }),
    session.permissions.includes("partnerships.view")
      ? supabase.from("partnership_requests").select("id", { count: "exact", head: true }).in("status", ["new", "assessment"])
      : Promise.resolve({ count: 0 }),
    session.permissions.includes("notifications.view")
      ? supabase.from("notifications").select("id", { count: "exact", head: true }).is("read_at", null)
      : Promise.resolve({ count: 0 }),
  ])

  return (
    <AdminShell
      sections={filterNav(ADMIN_NAV, session.permissions)}
      badges={{
        enquiries: enquiries.count ?? 0,
        partnerships: partnerships.count ?? 0,
        notifications: notifications.count ?? 0,
      }}
      user={{ name: session.fullName, email: session.email, roles: session.roles.map((r) => r.name) }}
    >
      {children}
    </AdminShell>
  )
}
