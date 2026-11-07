import "server-only"

import { cache } from "react"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export type AdminSession = {
  userId: string
  email: string
  fullName: string
  jobTitle: string | null
  status: string
  avatarUrl: string | null
  roles: { key: string; name: string }[]
  permissions: string[]
}

/**
 * Resolves the current administrator from the auth cookie, then loads profile,
 * roles and the flattened permission set. Cached per request.
 * Returns null when there is no session, the account is not active, or no role is granted.
 */
export const getAdminSession = cache(async (): Promise<AdminSession | null> => {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, job_title, status, avatar_url")
    .eq("id", user.id)
    .maybeSingle()

  if (!profile || profile.status !== "active") return null

  const { data: roleRows } = await supabase
    .from("user_roles")
    .select("role_id, roles(key, name)")
    .eq("user_id", user.id)

  const roles = (roleRows ?? [])
    .map((row) => {
      const role = Array.isArray(row.roles) ? row.roles[0] : row.roles
      return role ? { key: role.key as string, name: role.name as string } : null
    })
    .filter((r): r is { key: string; name: string } => Boolean(r))

  if (roles.length === 0) return null

  const roleIds = (roleRows ?? []).map((r) => r.role_id)
  const { data: perms } = await supabase
    .from("role_permissions")
    .select("permission_key")
    .in("role_id", roleIds)

  return {
    userId: user.id,
    email: profile.email ?? user.email ?? "",
    fullName: profile.full_name ?? "",
    jobTitle: profile.job_title ?? null,
    status: profile.status,
    avatarUrl: profile.avatar_url ?? null,
    roles,
    permissions: Array.from(new Set((perms ?? []).map((p) => p.permission_key as string))).sort(),
  }
})

export function can(session: AdminSession | null, permission: string): boolean {
  return Boolean(session?.permissions.includes(permission))
}

export function canAny(session: AdminSession | null, permissions: string[]): boolean {
  return permissions.some((p) => can(session, p))
}
