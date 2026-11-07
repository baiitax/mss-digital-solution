import Link from "next/link"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, Empty, PageHeader, RelativeTime } from "@/components/admin/ui"
import { SubmitButton } from "@/components/admin/form"
import { markAllNotificationsRead, markNotificationRead } from "@/app/admin/actions/site"

export default async function NotificationsPage() {
  await requirePermission("notifications.view")
  const supabase = await createSupabaseServerClient()
  const { data: rows } = await supabase
    .from("notifications")
    .select("id, type, title, body, link, severity, read_at, created_at")
    .order("created_at", { ascending: false })
    .limit(100)

  const unread = (rows ?? []).filter((r) => !r.read_at).length

  return (
    <>
      <PageHeader
        title="Notifications"
        description="In-app operational alerts. Duplicate events are suppressed by a dedupe key."
        actions={
          unread > 0 ? (
            <form action={markAllNotificationsRead}><SubmitButton variant="secondary">Mark all read ({unread})</SubmitButton></form>
          ) : undefined
        }
      />
      <Card bodyClassName="">
        {rows && rows.length > 0 ? (
          <ul className="divide-y divide-[#F0F1F2]">
            {rows.map((row) => (
              <li key={row.id} className={`flex flex-wrap items-start gap-3 px-4 py-3 ${row.read_at ? "" : "bg-[#FDFBFC]"}`}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {!row.read_at && <span className="h-1.5 w-1.5 rounded-full bg-[#701F3D]" />}
                    <p className="text-[12.5px] font-semibold text-[#252B31]">{row.title}</p>
                    <span className="rounded bg-[#F0F1F2] px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-[#59636D]">{row.type}</span>
                  </div>
                  {row.body && <p className="mt-0.5 text-[12px] text-[#59636D]">{row.body}</p>}
                  <p className="mt-1 text-[11px] text-[#89929B]"><RelativeTime iso={row.created_at} /></p>
                </div>
                <div className="flex items-center gap-2">
                  {row.link && <Link href={row.link} className="text-[12px] font-semibold text-[#701F3D] hover:underline">Open</Link>}
                  {!row.read_at && (
                    <form action={markNotificationRead}>
                      <input type="hidden" name="id" value={row.id} />
                      <SubmitButton variant="secondary">Mark read</SubmitButton>
                    </form>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Empty title="No notifications" description="New enquiries, submissions for review and system events appear here." />
        )}
      </Card>
    </>
  )
}
