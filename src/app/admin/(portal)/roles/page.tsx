import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, PageHeader } from "@/components/admin/ui"
import { SubmitButton } from "@/components/admin/form"
import { saveRolePermissions } from "@/app/admin/actions/system"

export default async function RolesPage() {
  await requirePermission("roles.manage")
  const supabase = await createSupabaseServerClient()
  const [{ data: roles }, { data: permissions }, { data: granted }, { data: userRoles }] = await Promise.all([
    supabase.from("roles").select("id, key, name, description, rank, is_system").order("rank"),
    supabase.from("permissions").select("key, module, description").order("module").order("key"),
    supabase.from("role_permissions").select("role_id, permission_key"),
    supabase.from("user_roles").select("role_id"),
  ])

  const modules = Array.from(new Set((permissions ?? []).map((p) => p.module)))

  return (
    <>
      <PageHeader
        title="Roles & permissions"
        description="Access is enforced by Postgres Row Level Security using these grants — not by hiding links. Changes take effect on the next request."
      />
      <div className="space-y-4">
        {(roles ?? []).map((role) => {
          const rolePerms = (granted ?? []).filter((g) => g.role_id === role.id).map((g) => g.permission_key)
          const members = (userRoles ?? []).filter((u) => u.role_id === role.id).length
          const fixed = role.key === "super_admin"
          return (
            <Card
              key={role.id}
              title={role.name}
              description={`${role.description ?? ""} · ${members} member${members === 1 ? "" : "s"} · ${rolePerms.length} permissions${fixed ? " · fixed" : ""}`}
            >
              <form action={saveRolePermissions}>
                <input type="hidden" name="role_id" value={role.id} />
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {modules.map((module) => (
                    <div key={module}>
                      <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#89929B]">{module}</p>
                      <ul className="mt-1 space-y-1">
                        {(permissions ?? []).filter((p) => p.module === module).map((permission) => (
                          <li key={permission.key}>
                            <label className="flex items-center gap-2 text-[12px] text-[#252B31]">
                              <input
                                type="checkbox"
                                name="permissions"
                                value={permission.key}
                                defaultChecked={rolePerms.includes(permission.key)}
                                disabled={fixed}
                                className="h-3.5 w-3.5 rounded border-[#DDE1E4] text-[#701F3D]"
                              />
                              {permission.key}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {!fixed && <div className="mt-3 flex justify-end"><SubmitButton variant="secondary">Save permissions</SubmitButton></div>}
              </form>
            </Card>
          )
        })}
      </div>
    </>
  )
}
