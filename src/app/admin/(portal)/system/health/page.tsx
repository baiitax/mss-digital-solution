import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, Empty, PageHeader, StatusPill } from "@/components/admin/ui"
import { SubmitButton } from "@/components/admin/form"
import { runHealthCheck } from "@/app/admin/actions/system"

export default async function HealthPage() {
  await requirePermission("system.view")
  const supabase = await createSupabaseServerClient()

  const [{ data: checks }, { data: history }, { data: migrations }] = await Promise.all([
    // latest row per service
    supabase
      .from("system_health_checks")
      .select("service, status, latency_ms, detail, checked_at")
      .order("checked_at", { ascending: false })
      .limit(30),
    supabase.from("system_health_checks").select("id, service, status, latency_ms, checked_at").order("checked_at", { ascending: false }).limit(12),
    // Ledger written by scripts/db-migrate.sh — shows exactly which migration
    // files have been applied to this database, and their checksums.
    supabase.from("schema_migrations").select("version, file_name, checksum, applied_at, applied_by").order("version", { ascending: false }).limit(12),
  ])

  const latest = new Map<string, NonNullable<typeof checks>[number]>()
  ;(checks ?? []).forEach((check) => {
    if (!latest.has(check.service)) latest.set(check.service, check)
  })

  const services = ["database", "auth", "storage"]

  return (
    <>
      <PageHeader
        title="System health"
        description="Live checks against the services this portal depends on. Results are recorded so drift is visible over time."
        actions={
          <form action={runHealthCheck}>
            <SubmitButton>Run checks</SubmitButton>
          </form>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {services.map((service) => {
          const check = latest.get(service)
          return (
            <div key={service} className="rounded-xl border border-[#E3E6E8] bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#89929B]">{service}</p>
                {check ? <StatusPill status={check.status} /> : <span className="text-[11px] text-[#89929B]">not checked</span>}
              </div>
              <p className="mt-2 text-[12.5px] text-[#252B31]">{check?.detail ?? "Run the checks to record a result."}</p>
              <p className="mt-1 text-[11px] text-[#89929B]">{check ? `${check.latency_ms} ms · ${new Date(check.checked_at).toLocaleString("en-GB")}` : "—"}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2" title="Check history" bodyClassName="">
          {history && history.length > 0 ? (
            <table className="w-full text-left text-[12px]">
              <thead className="border-b border-[#EDEFF1] bg-[#FAF9F7] text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">
                <tr><th className="px-4 py-2 font-semibold">Checked</th><th className="px-4 py-2 font-semibold">Service</th><th className="px-4 py-2 font-semibold">Status</th><th className="px-4 py-2 font-semibold">Latency</th></tr>
              </thead>
              <tbody className="divide-y divide-[#F0F1F2]">
                {history.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-2 text-[#59636D]">{new Date(row.checked_at).toLocaleString("en-GB")}</td>
                    <td className="px-4 py-2 text-[#252B31]">{row.service}</td>
                    <td className="px-4 py-2"><StatusPill status={row.status} /></td>
                    <td className="px-4 py-2 text-[#59636D]">{row.latency_ms} ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Empty title="No checks recorded" description="Run the checks to create the first record." />
          )}
        </Card>
        <div className="space-y-4">
          <Card title="Deployment">
            <dl className="space-y-1.5 text-[12px] text-[#59636D]">
              <div className="flex justify-between"><dt>Host</dt><dd className="text-[#252B31]">Vercel</dd></div>
              <div className="flex justify-between"><dt>Region</dt><dd className="text-[#252B31]">iad1</dd></div>
              <div className="flex justify-between"><dt>Framework</dt><dd className="text-[#252B31]">Next.js 16</dd></div>
              <div className="flex justify-between"><dt>Database</dt><dd className="text-[#252B31]">Supabase Postgres 17</dd></div>
            </dl>
          </Card>
          <Card title="Applied migrations" description="Recorded in the database by the deploy step">
            {migrations && migrations.length > 0 ? (
              <ul className="space-y-1.5 text-[11.5px]">
                {migrations.map((m) => (
                  <li key={m.version} className="flex items-center justify-between gap-2">
                    <span className="min-w-0 truncate font-mono text-[11px] text-[#252B31]">{m.file_name}</span>
                    <span className="shrink-0 text-[#89929B]" title={m.checksum}>
                      {new Date(m.applied_at).toLocaleDateString("en-GB")}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[12px] text-[#89929B]">No migration records are visible to your role.</p>
            )}
          </Card>
          <Card title="Not configured">
            <ul className="space-y-1.5 text-[12px] text-[#59636D]">
              <li>· Email provider (SMTP) — notifications are in-app only</li>
              <li>· Analytics provider — traffic panels stay empty by design</li>
              <li>· Error tracking (Sentry) — not connected</li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  )
}
