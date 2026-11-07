"use server"

import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export type LoginState = { error?: string }

/** In-memory throttle. Per-instance only — recorded as a limitation in the security report. */
const attempts = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 6

function throttled(key: string) {
  const now = Date.now()
  const record = attempts.get(key)
  if (!record || record.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  record.count += 1
  return record.count > MAX_ATTEMPTS
}

export async function signInAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")
  const next = String(formData.get("next") ?? "/admin")

  if (!email || !password) return { error: "Enter your email address and password." }
  if (throttled(email)) return { error: "Too many attempts. Wait 15 minutes and try again." }

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error || !data.user) {
    return { error: "Those credentials were not accepted." }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("status")
    .eq("id", data.user.id)
    .maybeSingle()

  if (!profile || profile.status !== "active") {
    await supabase.auth.signOut()
    return { error: "This account is suspended or has not been activated. Contact a Super Administrator." }
  }

  await supabase.from("profiles").update({ last_login_at: new Date().toISOString() }).eq("id", data.user.id)
  await supabase.rpc("record_audit", {
    p_action: "auth.sign_in",
    p_module: "Authentication",
    p_entity: "profiles",
    p_entity_id: data.user.id,
    p_summary: "Administrator signed in",
    p_outcome: "success",
  })

  attempts.delete(email)
  redirect(next.startsWith("/admin") ? next : "/admin")
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    await supabase.rpc("record_audit", {
      p_action: "auth.sign_out",
      p_module: "Authentication",
      p_entity: "profiles",
      p_entity_id: user.id,
      p_summary: "Administrator signed out",
      p_outcome: "success",
    })
  }
  await supabase.auth.signOut()
  redirect("/admin/login")
}
