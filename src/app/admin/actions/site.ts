"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { assertPermission } from "@/lib/auth/guards"

function str(formData: FormData, key: string) {
  const v = formData.get(key)
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null
}

async function audit(action: string, module: string, summary: string, entity?: string, entityId?: string) {
  const supabase = await createSupabaseServerClient()
  await supabase.rpc("record_audit", {
    p_action: action,
    p_module: module,
    p_entity: entity ?? null,
    p_entity_id: entityId ?? null,
    p_summary: summary,
  })
}

// ── Homepage ────────────────────────────────────────────────
export async function saveHomepageSection(formData: FormData) {
  const session = await assertPermission("homepage.manage")
  const id = z.string().uuid().parse(formData.get("id"))
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase
    .from("homepage_sections")
    .update({
      eyebrow: str(formData, "eyebrow"),
      title: str(formData, "title"),
      subtitle: str(formData, "subtitle"),
      body: str(formData, "body"),
      image_url: str(formData, "image_url"),
      image_alt: str(formData, "image_alt"),
      cta_label: str(formData, "cta_label"),
      cta_href: str(formData, "cta_href"),
      secondary_cta_label: str(formData, "secondary_cta_label"),
      secondary_cta_href: str(formData, "secondary_cta_href"),
      is_visible: formData.get("is_visible") === "on",
      display_order: Number(formData.get("display_order")) || 0,
      updated_by: session.userId,
    })
    .eq("id", id)
  if (error) throw new Error(error.message)

  await audit("homepage.section_saved", "Homepage", "Homepage section updated", "homepage_sections", id)
  revalidatePath("/admin/homepage")
  revalidatePath("/")
}

export async function toggleHomepageSection(formData: FormData) {
  await assertPermission("homepage.manage")
  const id = z.string().uuid().parse(formData.get("id"))
  const visible = formData.get("visible") === "true"
  const supabase = await createSupabaseServerClient()
  await supabase.from("homepage_sections").update({ is_visible: visible }).eq("id", id)
  await audit("homepage.section_toggled", "Homepage", `Section ${visible ? "shown" : "hidden"}`, "homepage_sections", id)
  revalidatePath("/admin/homepage")
  revalidatePath("/")
}

// ── Site settings ───────────────────────────────────────────
export async function saveSettings(formData: FormData) {
  await assertPermission("settings.manage")
  const supabase = await createSupabaseServerClient()

  const entries: { key: string; value: unknown; is_public: boolean }[] = []
  const fields: { key: string; isPublic: boolean }[] = [
    { key: "site.name", isPublic: true },
    { key: "site.title", isPublic: true },
    { key: "site.description", isPublic: true },
    { key: "site.url", isPublic: true },
    { key: "contact.email", isPublic: true },
    { key: "contact.phone", isPublic: true },
    { key: "contact.address", isPublic: true },
    { key: "social.linkedin", isPublic: true },
    { key: "social.x", isPublic: true },
    { key: "brand.primary", isPublic: true },
    { key: "brand.secondary", isPublic: true },
    { key: "footer.description", isPublic: true },
    { key: "footer.copyright", isPublic: true },
    { key: "operations.maintenance_mode", isPublic: true },
    { key: "operations.enquiry_form_enabled", isPublic: true },
    { key: "media.max_upload_mb", isPublic: false },
    { key: "notifications.email", isPublic: false },
  ]

  for (const field of fields) {
    const raw = formData.get(field.key)
    if (raw === null) continue
    const value = raw === "on" ? true : String(raw)
    entries.push({ key: field.key, value, is_public: field.isPublic })
  }

  if (entries.length === 0) return

  const { error } = await supabase
    .from("site_settings")
    .upsert(entries.map((e) => ({ key: e.key, value: e.value, is_public: e.is_public })), { onConflict: "key" })
  if (error) throw new Error(error.message)

  await audit("settings.updated", "Settings", `${entries.length} settings updated`)
  revalidatePath("/admin/settings")
  revalidatePath("/", "layout")
}

// ── Navigation ──────────────────────────────────────────────
export async function saveNavigationItem(formData: FormData) {
  await assertPermission("navigation.manage")
  const supabase = await createSupabaseServerClient()
  const id = str(formData, "id")
  const payload = {
    location: str(formData, "location") ?? "header",
    label: z.string().trim().min(1).max(80).parse(formData.get("label")),
    href: z.string().trim().min(1).max(300).parse(formData.get("href")),
    parent_id: str(formData, "parent_id"),
    display_order: Number(formData.get("display_order")) || 0,
    is_visible: formData.get("is_visible") === "on",
    is_external: formData.get("is_external") === "on",
  }
  const { error } = id
    ? await supabase.from("navigation_items").update(payload).eq("id", id)
    : await supabase.from("navigation_items").insert(payload)
  if (error) throw new Error(error.message)
  await audit("navigation.saved", "Navigation", `Navigation item "${payload.label}" saved`, "navigation_items", id ?? undefined)
  revalidatePath("/admin/navigation")
  revalidatePath("/", "layout")
}

export async function deleteNavigationItem(formData: FormData) {
  await assertPermission("navigation.manage")
  const id = z.string().uuid().parse(formData.get("id"))
  const supabase = await createSupabaseServerClient()
  await supabase.from("navigation_items").delete().eq("id", id)
  await audit("navigation.deleted", "Navigation", "Navigation item deleted", "navigation_items", id)
  revalidatePath("/admin/navigation")
  revalidatePath("/", "layout")
}

// ── SEO ─────────────────────────────────────────────────────
export async function saveSeoMetadata(formData: FormData) {
  await assertPermission("seo.manage")
  const path = z.string().trim().min(1).max(200).parse(formData.get("path"))
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from("seo_metadata").upsert(
    {
      path,
      title: str(formData, "title"),
      description: str(formData, "description"),
      og_title: str(formData, "og_title"),
      og_description: str(formData, "og_description"),
      og_image: str(formData, "og_image"),
      canonical: str(formData, "canonical"),
      no_index: formData.get("no_index") === "on",
    },
    { onConflict: "path" }
  )
  if (error) throw new Error(error.message)
  await audit("seo.updated", "SEO", `SEO metadata updated for ${path}`)
  revalidatePath("/admin/seo")
  revalidatePath(path)
}

// ── Redirects ───────────────────────────────────────────────
export async function saveRedirect(formData: FormData) {
  await assertPermission("navigation.manage")
  const supabase = await createSupabaseServerClient()
  const source = z.string().trim().startsWith("/").max(300).parse(formData.get("source"))
  const destination = z.string().trim().min(1).max(300).parse(formData.get("destination"))
  const { error } = await supabase.from("redirects").insert({
    source,
    destination,
    status_code: Number(formData.get("status_code")) || 308,
    is_active: true,
  })
  if (error) throw new Error(error.message)
  await audit("redirect.created", "Redirects", `${source} → ${destination}`)
  revalidatePath("/admin/redirects")
}

export async function toggleRedirect(formData: FormData) {
  await assertPermission("navigation.manage")
  const id = z.string().uuid().parse(formData.get("id"))
  const active = formData.get("is_active") === "true"
  const supabase = await createSupabaseServerClient()
  await supabase.from("redirects").update({ is_active: active }).eq("id", id)
  revalidatePath("/admin/redirects")
}

export async function deleteRedirect(formData: FormData) {
  await assertPermission("navigation.manage")
  const id = z.string().uuid().parse(formData.get("id"))
  const supabase = await createSupabaseServerClient()
  await supabase.from("redirects").delete().eq("id", id)
  await audit("redirect.deleted", "Redirects", "Redirect removed")
  revalidatePath("/admin/redirects")
}

// ── Notifications ───────────────────────────────────────────
export async function markNotificationRead(formData: FormData) {
  await assertPermission("notifications.view")
  const id = z.string().uuid().parse(formData.get("id"))
  const supabase = await createSupabaseServerClient()
  await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("id", id)
  revalidatePath("/admin/notifications")
}

export async function markAllNotificationsRead() {
  const session = await assertPermission("notifications.view")
  const supabase = await createSupabaseServerClient()
  await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("user_id", session.userId).is("read_at", null)
  revalidatePath("/admin/notifications")
}

// ── Partnerships ────────────────────────────────────────────
export async function setPartnershipStatus(formData: FormData) {
  await assertPermission("partnerships.manage")
  const id = z.string().uuid().parse(formData.get("id"))
  const status = z.enum(["new", "assessment", "discussion", "proposal", "active", "closed"]).parse(formData.get("status"))
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from("partnership_requests").update({ status }).eq("id", id)
  if (error) throw new Error(error.message)
  await audit("partnership.status_changed", "Partnerships", `Partnership request set to ${status}`, "partnership_requests", id)
  revalidatePath("/admin/partnerships")
}

export async function deletePartnership(formData: FormData) {
  await assertPermission("partnerships.manage")
  const id = z.string().uuid().parse(formData.get("id"))
  const supabase = await createSupabaseServerClient()
  await supabase.from("partnership_requests").delete().eq("id", id)
  await audit("partnership.deleted", "Partnerships", "Partnership request removed", "partnership_requests", id)
  revalidatePath("/admin/partnerships")
  redirect("/admin/partnerships")
}
