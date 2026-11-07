"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { assertPermission } from "@/lib/auth/guards"

/**
 * Actions for the runtime configuration modules: the public enquiry form
 * (/admin/forms) and platform settings (/admin/system/settings).
 *
 * Both write `site_settings` rows that the live application reads at request
 * time, so a save here changes behaviour rather than just a record.
 */

async function audit(action: string, module: string, summary: string, metadata?: Record<string, unknown>) {
  const supabase = await createSupabaseServerClient()
  await supabase.rpc("record_audit", {
    p_action: action,
    p_module: module,
    p_entity: "site_settings",
    p_entity_id: null,
    p_summary: summary,
    p_metadata: metadata ?? {},
  })
}

export type FormSettingsState = {
  error?: string
  success?: string
  /** Echo of the submitted values so a rejected save never discards the edit. */
  values?: {
    enquiries_enabled: boolean
    accepted_types: string[]
    rate_limit_per_minute: number
    acknowledgement: string
  }
}

export async function saveFormSettings(_prev: FormSettingsState, formData: FormData): Promise<FormSettingsState> {
  const session = await assertPermission("settings.manage")
  const supabase = await createSupabaseServerClient()

  const types = ["partnership", "general"].filter((t) => formData.get(`type_${t}`) === "on")
  const rate = Number(formData.get("rate_limit_per_minute"))
  const acknowledgement = String(formData.get("acknowledgement") ?? "").trim().slice(0, 500)

  const echoed = {
    enquiries_enabled: formData.get("enquiries_enabled") === "on",
    accepted_types: types,
    rate_limit_per_minute: Number.isFinite(rate) ? rate : 5,
    acknowledgement,
  }

  if (types.length === 0) {
    return { error: "At least one enquiry type must stay enabled.", values: echoed }
  }
  if (!Number.isFinite(rate) || rate < 1 || rate > 20) {
    return { error: "Submissions per minute must be between 1 and 20.", values: echoed }
  }

  const value = {
    enquiries_enabled: formData.get("enquiries_enabled") === "on",
    accepted_types: types,
    rate_limit_per_minute: rate,
    acknowledgement,
  }

  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: "forms.contact", value, is_public: false }, { onConflict: "key" })
  if (error) return { error: error.message }

  await audit("forms.updated", "Forms", `Enquiry form updated by ${session.email}`, value)
  revalidatePath("/admin/forms")
  revalidatePath("/contact")
  return { success: "Saved — the public enquiry form now uses these settings." }
}

export type OperationalState = {
  error?: string
  success?: string
  values?: {
    notify_on_enquiry: boolean
    enquiries_enabled: boolean
    maintenance_mode: boolean
    retention_days: number
    maintenance_message: string
  }
}

export async function saveOperationalSettings(_prev: OperationalState, formData: FormData): Promise<OperationalState> {
  const session = await assertPermission("settings.manage")
  const supabase = await createSupabaseServerClient()

  const maintenance = formData.get("maintenance_mode") === "on"
  const message = String(formData.get("maintenance_message") ?? "").trim().slice(0, 300)
  const retention = Number(formData.get("retention_days"))

  const echoed = {
    notify_on_enquiry: formData.get("notify_on_enquiry") === "on",
    enquiries_enabled: formData.get("enquiries_enabled") === "on",
    maintenance_mode: maintenance,
    retention_days: Number.isFinite(retention) ? retention : 730,
    maintenance_message: message,
  }

  if (!Number.isFinite(retention) || retention < 30 || retention > 3650) {
    return { error: "Retention must be between 30 and 3650 days.", values: echoed }
  }

  // Maintenance mode takes the public site into a notice state; it is a
  // high-impact change, so the operator must confirm it explicitly.
  if (maintenance && formData.get("confirm_maintenance") !== "on") {
    return {
      error: "Tick the confirmation box to switch the public site into maintenance mode.",
      values: echoed,
    }
  }

  const operational = {
    notify_on_enquiry: formData.get("notify_on_enquiry") === "on",
    enquiries_enabled: formData.get("enquiries_enabled") === "on",
    maintenance_mode: maintenance,
    retention_days: retention,
  }

  const [first, second] = await Promise.all([
    supabase.from("site_settings").upsert({ key: "operational", value: operational, is_public: false }, { onConflict: "key" }),
    // Mirror the two fields the public renderer is allowed to read.
    supabase.from("site_settings").upsert(
      { key: "site_status", value: { maintenance_mode: maintenance, message }, is_public: true },
      { onConflict: "key" }
    ),
  ])
  const error = first.error ?? second.error
  if (error) return { error: error.message }

  await audit("system.settings_updated", "System settings", `Operational settings updated by ${session.email}`, {
    maintenance_mode: maintenance,
    notify_on_enquiry: operational.notify_on_enquiry,
  })
  revalidatePath("/admin/system/settings")
  revalidatePath("/", "layout")
  return { success: "Operational settings saved." }
}

export type PurgeState = { error?: string; success?: string }

/**
 * Permanently removes enquiries that were soft-deleted before the retention
 * window. Two guards: settings.manage is required, and the operator has to type
 * the word PURGE — this deletes rows and cannot be undone.
 */
export async function purgeArchivedEnquiries(_prev: PurgeState, formData: FormData): Promise<PurgeState> {
  const session = await assertPermission("settings.manage")
  if (String(formData.get("confirm") ?? "").trim().toUpperCase() !== "PURGE") {
    return { error: "Type PURGE to confirm. This action cannot be undone." }
  }

  const retention = Number(formData.get("retention_days"))
  const days = Number.isFinite(retention) && retention >= 30 ? retention : 730
  const cutoff = new Date(Date.now() - days * 86_400_000).toISOString()

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("contact_enquiries")
    .delete()
    .not("deleted_at", "is", null)
    .lt("deleted_at", cutoff)
    .select("id")

  if (error) return { error: error.message }

  await audit("enquiries.purged", "Enquiries", `${data?.length ?? 0} archived enquiries purged (older than ${days} days) by ${session.email}`, {
    removed: data?.length ?? 0,
    cutoff,
    retention_days: days,
  })
  revalidatePath("/admin/enquiries")
  revalidatePath("/admin/system/settings")
  return { success: `${data?.length ?? 0} archived enquiries permanently removed.` }
}
