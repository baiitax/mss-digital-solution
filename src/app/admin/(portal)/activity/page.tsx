import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, Empty, PageHeader, RelativeTime, Stat } from "@/components/admin/ui"
import { isoDaysAgo } from "@/lib/time"

export default async function ActivityPage() {
  await requirePermission("dashboard.view")
  const supabase = await createSupabaseServerClient()

  const [{ data: recent }, { count: total }, { count: today }] = await Promise.all([
    supabase.from("audit_logs").select("id, actor_email, action, module, summary, created_at").order("created_at", { ascending: false }).limit(60),
    supabase.from("audit_logs").select("id", { count: "exact", head: true }),
    supabase.from("audit_logs").select("id", { count: "exact", head: true }).gte("created_at", isoDaysAgo(1)),
  ])

  const byModule = new Map<string, number>()
  ;(recent ?? []).forEach((r) => byModule.set(r.module, (byModule.get(r.module) ?? 0) + 1))

  return (
    <>
      <PageHeader title="Activity centre" description="What has changed across the platform, newest first. Reads the same append-only audit stream as the audit log." />
      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Recorded actions" value={total ?? 0} />
        <Stat label="Last 24 hours" value={today ?? 0} tone={today ? "attention" : "default"} />
        <Stat label="Modules active" value={byModule.size} />
        <Stat label="Data source" value="audit_logs" hint="append-only" tone="muted" />
      </div>
      <Card bodyClassName="">
        {recent && recent.length > 0 ? (
          <ul className="divide-y divide-[#F0F1F2]">
            {recent.map((row) => (
              <li key={row.id} className="flex flex-wrap items-center gap-2 px-4 py-2.5 text-[12.5px]">
                <span className="font-medium text-[#252B31]">{row.actor_email || "system"}</span>
                <span className="text-[#59636D]">{row.summary || row.action}</span>
                <span className="rounded bg-[#F0F1F2] px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-[#59636D]">{row.module}</span>
                <span className="ml-auto text-[11px] text-[#89929B]"><RelativeTime iso={row.created_at} /></span>
              </li>
            ))}
          </ul>
        ) : (
          <Empty title="No activity yet" description="Administrative actions appear here as they happen." />
        )}
      </Card>
    </>
  )
}
