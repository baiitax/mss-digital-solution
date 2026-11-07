import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, PageHeader, StatusPill, formatDate } from "@/components/admin/ui"
import { Select, SubmitButton } from "@/components/admin/form"
import { setUserRole, setUserStatus } from "@/app/admin/actions/system"
import { InviteForm } from "./InviteForm"

export default async function UsersPage() {
  await requirePermission("users.manage")
  const supabase = await createSupabaseServerClient()

  const [{ data: profiles }, { data: roles }, { data: assignments }] = await Promise.all([
    supabase.from("profiles").select("id, email, full_name, job_title, status, last_login_at, created_at").order("created_at", { ascending: true }),
    supabase.from("roles").select("id, key, name").order("rank"),
    supabase.from("user_roles").select("user_id, role_id"),
  ])

  return (
    <>
      <PageHeader
        title="User management"
        description="Administrator accounts. New accounts are invitation-only — there is no public registration path into the portal."
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card bodyClassName="">
            <ul className="divide-y divide-[#F0F1F2]">
              {(profiles ?? []).map((profile) => {
                const assignment = (assignments ?? []).find((a) => a.user_id === profile.id)
                return (
                  <li key={profile.id} className="space-y-2 px-4 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-[13px] font-semibold text-[#252B31]">{profile.full_name || profile.email}</p>
                        <p className="text-[11.5px] text-[#89929B]">{profile.email}{profile.job_title ? ` · ${profile.job_title}` : ""} · last sign-in {profile.last_login_at ? formatDate(profile.last_login_at) : "never"}</p>
                      </div>
                      <StatusPill status={profile.status} />
                    </div>
                    <div className="flex flex-wrap items-end gap-2">
                      <form action={setUserRole} className="flex items-end gap-2">
                        <input type="hidden" name="user_id" value={profile.id} />
                        <Select name="role_id" defaultValue={assignment?.role_id} options={(roles ?? []).map((r) => ({ value: r.id, label: r.name }))} className="h-9 py-1" />
                        <SubmitButton variant="secondary">Set role</SubmitButton>
                      </form>
                      {profile.status === "suspended" ? (
                        <form action={setUserStatus}>
                          <input type="hidden" name="id" value={profile.id} />
                          <input type="hidden" name="status" value="active" />
                          <SubmitButton variant="secondary">Reactivate</SubmitButton>
                        </form>
                      ) : (
                        <form action={setUserStatus}>
                          <input type="hidden" name="id" value={profile.id} />
                          <input type="hidden" name="status" value="suspended" />
                          <SubmitButton variant="danger">Suspend</SubmitButton>
                        </form>
                      )}
                    </div>
                  </li>
                )
              })}
              {(!profiles || profiles.length === 0) && <li className="px-4 py-6 text-[12.5px] text-[#89929B]">No administrator accounts yet.</li>}
            </ul>
          </Card>
        </div>
        <Card title="Invite administrator" description="A role is assigned immediately; the account stays inactive until the first sign-in">
          <InviteForm roles={(roles ?? []).map((r) => ({ id: r.id, name: r.name }))} />
        </Card>
      </div>
    </>
  )
}
