import { requirePermission } from "@/lib/auth/guards"
import { can, getAdminSession } from "@/lib/auth/session"
import { Card, PageHeader, Stat } from "@/components/admin/ui"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getOperationalSettings, getPublicSiteStatus } from "@/lib/site-config"
import { SettingsForm } from "./SettingsForm"

export default async function SystemSettingsPage() {
  await requirePermission("system.view")
  const session = await getAdminSession()
  const supabase = await createSupabaseServerClient()

  const [operational, status, { count: archived }, { data: buckets }] = await Promise.all([
    getOperationalSettings(),
    getPublicSiteStatus(),
    supabase.from("contact_enquiries").select("id", { count: "exact", head: true }).not("deleted_at", "is", null),
    supabase.storage.listBuckets(),
  ])

  const integrations = [
    { name: "Email delivery (SMTP)", configured: false, note: "Not connected — notifications are in-app only" },
    { name: "Analytics provider", configured: false, note: "Not connected — no traffic panel is shown anywhere" },
    { name: "Error tracking", configured: false, note: "Not connected" },
    {
      name: "Object storage",
      configured: (buckets?.length ?? 0) > 0,
      note: (buckets ?? []).map((b) => `${b.name}${b.public ? " (public)" : " (private)"}`).join(", ") || "No buckets visible",
    },
  ]

  return (
    <>
      <PageHeader
        title="System settings"
        description="Platform behaviour that the live site reads at request time, plus the operational state of this deployment."
      />

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Enquiry intake" value={operational.enquiries_enabled ? "Open" : "Closed"} hint="Site-wide switch" />
        <Stat
          label="Maintenance bar"
          value={status.maintenance_mode ? "Shown" : "Off"}
          hint={status.message ? status.message.slice(0, 40) : "No message set"}
          tone={status.maintenance_mode ? "attention" : "default"}
        />
        <Stat label="Archived enquiries" value={archived ?? 0} hint={`Retention ${operational.retention_days} days`} />
        <Stat label="Notifications" value={operational.notify_on_enquiry ? "On" : "Off"} hint="Per new enquiry" />
      </div>

      <SettingsForm
        operational={operational}
        maintenanceMessage={status.message ?? ""}
        canEdit={can(session, "settings.manage")}
      />

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Card title="Integrations" description="Derived from the deployment, not from a stored list">
          <ul className="space-y-2 text-[12.5px]">
            {integrations.map((integration) => (
              <li key={integration.name} className="flex flex-wrap items-start justify-between gap-2 rounded-lg border border-[#EDEFF1] px-3 py-2">
                <div>
                  <p className="font-medium text-[#252B31]">{integration.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-[#89929B]">{integration.note}</p>
                </div>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                    integration.configured
                      ? "border-[#2F6B4F]/20 bg-[#EAF3EE] text-[#2F6B4F]"
                      : "border-[#8A5A15]/20 bg-[#FDF4E7] text-[#8A5A15]"
                  }`}
                >
                  {integration.configured ? "connected" : "not connected"}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Deployment facts" description="Runtime values, no secrets">
          <dl className="space-y-1.5 text-[12px] text-[#59636D]">
            <div className="flex justify-between"><dt>Framework</dt><dd className="text-[#252B31]">Next.js 16 (App Router)</dd></div>
            <div className="flex justify-between"><dt>Runtime</dt><dd className="text-[#252B31]">Node.js {process.version}</dd></div>
            <div className="flex justify-between"><dt>Database</dt><dd className="text-[#252B31]">Supabase Postgres 17</dd></div>
            <div className="flex justify-between"><dt>Storage buckets</dt><dd className="text-[#252B31]">{buckets?.length ?? 0}</dd></div>
            <div className="flex justify-between"><dt>Service key exposed to browser</dt><dd className="text-[#2F6B4F]">No — server only</dd></div>
            <div className="flex justify-between"><dt>Public admin registration</dt><dd className="text-[#2F6B4F]">Disabled — invite only</dd></div>
          </dl>
        </Card>
      </div>
    </>
  )
}
