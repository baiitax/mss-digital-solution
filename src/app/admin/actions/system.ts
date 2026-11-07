"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { createSupabaseAdmin } from "@/lib/supabase/admin"
import { assertPermission } from "@/lib/auth/guards"

// ── Users ───────────────────────────────────────────────────
export type InviteState = { error?: string; inviteLink?: string; email?: string }

export async function inviteUser(_prev: InviteState, formData: FormData): Promise<InviteState> {
  const session = await assertPermission("users.manage")
  const schema = z.object({
    email: z.string().email(),
    full_name: z.string().trim().min(2).max(120),
    job_title: z.string().trim().max(120).optional(),
    role_id: z.string().uuid(),
  })
  const parsed = schema.safeParse({
    email: formData.get("email"),
    full_name: formData.get("full_name"),
    job_title: (formData.get("job_title") as string) || undefined,
    role_id: formData.get("role_id"),
  })
  if (!parsed.success) return { error: "Check the name, email address and role." }

  const admin = createSupabaseAdmin()
  const { data: created, error } = await admin.auth.admin.createUser({
    email: parsed.data.email,
    email_confirm: true,
    user_metadata: { full_name: parsed.data.full_name },
  })
  if (error || !created.user) return { error: error?.message ?? "Could not create the account." }

  await admin.from("profiles").upsert({
    id: created.user.id,
    email: parsed.data.email,
    full_name: parsed.data.full_name,
    job_title: parsed.data.job_title ?? null,
    status: "invited",
    invited_by: session.userId,
  })

  await admin.from("user_roles").insert({ user_id: created.user.id, role_id: parsed.data.role_id, granted_by: session.userId })

  // One-time sign-in link — emailed when SMTP is configured, otherwise copied by the administrator.
  const { data: link, error: linkError } = await admin.auth.admin.generateLink({
    type: "recovery",
    email: parsed.data.email,
    options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/admin/login` },
  })

  const supabase = await createSupabaseServerClient()
  await supabase.rpc("record_audit", {
    p_action: "user.invited",
    p_module: "Users",
    p_entity: "profiles",
    p_entity_id: created.user.id,
    p_summary: `Invited ${parsed.data.email}`,
  })

  revalidatePath("/admin/users")
  return {
    email: parsed.data.email,
    inviteLink: linkError ? undefined : link?.properties?.action_link,
  }
}

export async function setUserStatus(formData: FormData) {
  await assertPermission("users.manage")
  const id = z.string().uuid().parse(formData.get("id"))
  const status = z.enum(["active", "suspended", "invited"]).parse(formData.get("status"))
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from("profiles").update({ status }).eq("id", id)
  if (error) throw new Error(error.message)
  await supabase.rpc("record_audit", {
    p_action: `user.${status}`,
    p_module: "Users",
    p_entity: "profiles",
    p_entity_id: id,
    p_summary: `Account status set to ${status}`,
  })
  revalidatePath("/admin/users")
}

export async function setUserRole(formData: FormData) {
  await assertPermission("users.manage")
  const userId = z.string().uuid().parse(formData.get("user_id"))
  const roleId = z.string().uuid().parse(formData.get("role_id"))
  const supabase = await createSupabaseServerClient()
  await supabase.from("user_roles").delete().eq("user_id", userId)
  const { error } = await supabase.from("user_roles").insert({ user_id: userId, role_id: roleId })
  if (error) throw new Error(error.message)
  await supabase.rpc("record_audit", {
    p_action: "user.role_changed",
    p_module: "Users",
    p_entity: "profiles",
    p_entity_id: userId,
    p_summary: "Role assignment changed",
  })
  revalidatePath("/admin/users")
}

// ── Roles ───────────────────────────────────────────────────
export async function saveRolePermissions(formData: FormData) {
  await assertPermission("roles.manage")
  const roleId = z.string().uuid().parse(formData.get("role_id"))
  const supabase = await createSupabaseServerClient()
  const { data: role } = await supabase.from("roles").select("key, is_system").eq("id", roleId).single()
  if (role?.key === "super_admin") throw new Error("Super Administrator permissions are fixed.")

  const selected = formData.getAll("permissions").map(String).filter(Boolean)
  await supabase.from("role_permissions").delete().eq("role_id", roleId)
  if (selected.length) {
    const { error } = await supabase.from("role_permissions").insert(selected.map((permission_key) => ({ role_id: roleId, permission_key })))
    if (error) throw new Error(error.message)
  }
  await supabase.rpc("record_audit", {
    p_action: "role.permissions_updated",
    p_module: "Roles",
    p_entity: "roles",
    p_entity_id: roleId,
    p_summary: `Permissions updated (${selected.length} granted)`,
  })
  revalidatePath("/admin/roles")
}

// ── System health ───────────────────────────────────────────
export async function runHealthCheck() {
  await assertPermission("system.view")
  const supabase = await createSupabaseServerClient()
  const admin = createSupabaseAdmin()
  const results: { service: string; status: string; latency_ms: number | null; detail: string }[] = []

  const time = async (fn: () => Promise<{ error?: { message: string } | null }>, service: string, detail: string) => {
    const start = Date.now()
    try {
      const { error } = await fn()
      results.push({ service, status: error ? "degraded" : "ok", latency_ms: Date.now() - start, detail: error?.message ?? detail })
    } catch (e) {
      results.push({ service, status: "down", latency_ms: Date.now() - start, detail: e instanceof Error ? e.message : "unknown error" })
    }
  }

  await time(async () => await supabase.from("pages").select("id", { head: true, count: "exact" }).limit(1), "database", "public.pages reachable")
  await time(async () => await supabase.auth.getSession(), "auth", "session endpoint reachable")
  await time(async () => await admin.storage.getBucket("website-media"), "storage", "website-media bucket reachable")

  const { error } = await supabase.from("system_health_checks").insert(results)
  if (error) {
    // Recording may fail if RLS blocks it; still surface the live result by throwing a readable error.
    throw new Error("Health results computed but could not be recorded: " + error.message)
  }
  revalidatePath("/admin/system/health")
}
