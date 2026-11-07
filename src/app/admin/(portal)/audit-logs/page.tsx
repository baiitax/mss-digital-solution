import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, Empty, PageHeader } from "@/components/admin/ui"

export default async function AuditLogsPage({ searchParams }: { searchParams: Promise<{ module?: string; actor?: string; outcome?: string }> }) {
  await requirePermission("audit.view")
  const { module, actor, outcome } = await searchParams
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from("audit_logs")
    .select("id, actor_email, action, module, entity, entity_id, summary, outcome, created_at, metadata", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(200)
  if (module) query = query.eq("module", module)
  if (outcome) query = query.eq("outcome", outcome)
  if (actor) query = query.ilike("actor_email", `%${actor}%`)

  const { data: rows, count } = await query
  const { data: modules } = await supabase.from("audit_logs").select("module").limit(1000)
  const uniqueModules = Array.from(new Set((modules ?? []).map((m) => m.module))).sort()

  return (
    <>
      <PageHeader
        title="Audit logs"
        description="Append-only record of administrative actions. Rows cannot be updated or deleted by any client role — a database trigger enforces immutability."
        actions={<span className="text-[11.5px] text-[#89929B]">{count ?? 0} entries</span>}
      />
      <form action="/admin/audit-logs" className="mb-4 flex flex-wrap items-center gap-2">
        <select name="module" defaultValue={module ?? ""} className="h-9 rounded-lg border border-[#DDE1E4] bg-white px-2 text-[12.5px]">
          <option value="">All modules</option>
          {uniqueModules.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <input name="actor" defaultValue={actor ?? ""} placeholder="Actor email" className="h-9 w-52 rounded-lg border border-[#DDE1E4] bg-white px-2 text-[12.5px]" />
        <select name="outcome" defaultValue={outcome ?? ""} className="h-9 rounded-lg border border-[#DDE1E4] bg-white px-2 text-[12.5px]">
          <option value="">Any outcome</option>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
        </select>
        <button className="h-9 rounded-lg bg-[#252B31] px-3 text-[12.5px] font-semibold text-white">Filter</button>
      </form>

      <Card bodyClassName="">
        {rows && rows.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12px]">
              <thead className="border-b border-[#EDEFF1] bg-[#FAF9F7] text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">When</th>
                  <th className="px-4 py-2.5 font-semibold">Actor</th>
                  <th className="px-4 py-2.5 font-semibold">Action</th>
                  <th className="px-4 py-2.5 font-semibold">Module</th>
                  <th className="px-4 py-2.5 font-semibold">Summary</th>
                  <th className="px-4 py-2.5 font-semibold">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F1F2]">
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-[#FAF9F7]">
                    <td className="whitespace-nowrap px-4 py-2.5 text-[#59636D]">{new Date(row.created_at).toLocaleString("en-GB")}</td>
                    <td className="px-4 py-2.5 text-[#252B31]">{row.actor_email || "system"}</td>
                    <td className="px-4 py-2.5 font-mono text-[11px] text-[#701F3D]">{row.action}</td>
                    <td className="px-4 py-2.5 text-[#59636D]">{row.module}</td>
                    <td className="px-4 py-2.5 text-[#59636D]">{row.summary}</td>
                    <td className="px-4 py-2.5">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty title="No audit entries match" description="Administrative actions are recorded here automatically." />
        )}
      </Card>
    </>
  )
}
