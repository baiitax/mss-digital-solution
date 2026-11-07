"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { assertPermission } from "@/lib/auth/guards"

type Entity = "capabilities" | "projects" | "insights" | "leadership_profiles"

const ENTITY_PERMISSIONS: Record<Entity, { manage: string; publish: string }> = {
  capabilities: { manage: "capabilities.manage", publish: "capabilities.manage" },
  projects: { manage: "projects.manage", publish: "projects.manage" },
  insights: { manage: "insights.manage", publish: "insights.publish" },
  leadership_profiles: { manage: "leadership.manage", publish: "leadership.manage" },
}

const PUBLIC_PATHS: Record<Entity, string> = {
  capabilities: "/capabilities",
  projects: "/our-work",
  insights: "/insights",
  leadership_profiles: "/leadership",
}

function str(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === "on"
}

function json(formData: FormData, key: string, fallback: unknown = []) {
  const raw = formData.get(key)
  if (typeof raw !== "string" || raw.trim() === "") return fallback
  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function slugField(formData: FormData) {
  return z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9\-/]+$/, "Slug must use lowercase letters, numbers and hyphens")
    .parse(formData.get("slug"))
}

async function audit(action: string, module: string, entity: Entity, entityId: string, summary: string) {
  const supabase = await createSupabaseServerClient()
  await supabase.rpc("record_audit", {
    p_action: action,
    p_module: module,
    p_entity: entity,
    p_entity_id: entityId,
    p_summary: summary,
  })
}

async function saveEntity(entity: Entity, formData: FormData, payload: Record<string, unknown>, moduleName: string) {
  const session = await assertPermission(ENTITY_PERMISSIONS[entity].manage)
  const supabase = await createSupabaseServerClient()
  const id = str(formData, "id")

  if (id) {
    const { error } = await supabase.from(entity).update({ ...payload, updated_by: session.userId }).eq("id", id)
    if (error) throw new Error(error.message)
    await audit(`${entity}.saved`, moduleName, entity, id, `Updated ${entity.replace(/_/g, " ")} record`)
    revalidatePath(`/admin/${entity === "leadership_profiles" ? "leadership" : entity}/${id}`)
  } else {
    const { data, error } = await supabase
      .from(entity)
      .insert({ ...payload, created_by: session.userId, updated_by: session.userId })
      .select("id")
      .single()
    if (error) throw new Error(error.message)
    await audit(`${entity}.created`, moduleName, entity, data.id, `Created ${entity.replace(/_/g, " ")} record`)
    revalidatePath(PUBLIC_PATHS[entity])
    redirect(`/admin/${entity === "leadership_profiles" ? "leadership" : entity}/${data.id}`)
  }
  revalidatePath(PUBLIC_PATHS[entity])
}

// ── Capabilities ─────────────────────────────────────────────
export async function saveCapability(formData: FormData) {
  await saveEntity("capabilities", formData, {
    slug: slugField(formData),
    name: z.string().trim().min(1).max(160).parse(formData.get("name")),
    short_name: str(formData, "short_name"),
    summary: str(formData, "summary"),
    description: str(formData, "description"),
    hero_image: str(formData, "hero_image"),
    gallery: json(formData, "gallery"),
    expertise: json(formData, "expertise"),
    process_steps: json(formData, "process_steps"),
    display_order: Number(formData.get("display_order")) || 0,
    seo_title: str(formData, "seo_title"),
    seo_description: str(formData, "seo_description"),
  }, "Capabilities")
}

// ── Projects ─────────────────────────────────────────────────
export async function saveProject(formData: FormData) {
  await saveEntity("projects", formData, {
    slug: slugField(formData),
    title: z.string().trim().min(1).max(200).parse(formData.get("title")),
    summary: str(formData, "summary"),
    category: str(formData, "category"),
    state: str(formData, "state"),
    country: str(formData, "country") ?? "Nigeria",
    period: str(formData, "period"),
    focus_areas: str(formData, "focus_areas")?.split(",").map((s) => s.trim()).filter(Boolean) ?? [],
    partners: str(formData, "partners")?.split(",").map((s) => s.trim()).filter(Boolean) ?? [],
    objectives: json(formData, "objectives"),
    approach: str(formData, "approach"),
    methodology: str(formData, "methodology"),
    results: json(formData, "results"),
    sections: json(formData, "sections"),
    gallery: json(formData, "gallery"),
    cover_image: str(formData, "cover_image"),
    verification_level: str(formData, "verification_level") ?? "awaiting_approval",
    featured: bool(formData, "featured"),
    seo_title: str(formData, "seo_title"),
    seo_description: str(formData, "seo_description"),
  }, "Projects")
}

// ── Insights ─────────────────────────────────────────────────
export async function saveInsight(formData: FormData) {
  await saveEntity("insights", formData, {
    slug: slugField(formData),
    title: z.string().trim().min(1).max(220).parse(formData.get("title")),
    excerpt: str(formData, "excerpt"),
    body: str(formData, "body"),
    category: str(formData, "category") ?? "digital-health",
    author: str(formData, "author") ?? "MSS Digital Solutions",
    read_minutes: Number(formData.get("read_minutes")) || null,
    cover_image: str(formData, "cover_image"),
    tags: str(formData, "tags")?.split(",").map((s) => s.trim()).filter(Boolean) ?? [],
    featured: bool(formData, "featured"),
    scheduled_for: str(formData, "scheduled_for"),
    seo_title: str(formData, "seo_title"),
    seo_description: str(formData, "seo_description"),
    review_notes: str(formData, "review_notes"),
  }, "Insights")
}

// ── Leadership ───────────────────────────────────────────────
export async function saveLeadership(formData: FormData) {
  await saveEntity("leadership_profiles", formData, {
    slug: slugField(formData),
    full_name: z.string().trim().min(1).max(160).parse(formData.get("full_name")),
    position: str(formData, "position") ?? "Executive Director",
    summary: str(formData, "summary"),
    biography: str(formData, "biography"),
    credentials: json(formData, "credentials"),
    education: json(formData, "education"),
    certifications: json(formData, "certifications"),
    career_history: json(formData, "career_history"),
    portrait_url: str(formData, "portrait_url"),
    gallery: json(formData, "gallery"),
    display_order: Number(formData.get("display_order")) || 0,
    is_visible: bool(formData, "is_visible"),
  }, "Leadership")
}

// ── Shared workflow ──────────────────────────────────────────
export async function setEntityStatus(formData: FormData) {
  const entity = String(formData.get("entity") ?? "") as Entity
  const id = String(formData.get("id") ?? "")
  const status = String(formData.get("status") ?? "")
  if (!ENTITY_PERMISSIONS[entity] || !z.string().uuid().safeParse(id).success) return
  if (!["draft", "in_review", "approved", "published", "archived"].includes(status)) return

  const session = await assertPermission(
    status === "published" ? ENTITY_PERMISSIONS[entity].publish : ENTITY_PERMISSIONS[entity].manage
  )
  const supabase = await createSupabaseServerClient()
  const patch: Record<string, unknown> = { status, updated_by: session.userId }
  if (status === "published") patch.published_at = new Date().toISOString()
  if (status === "approved") {
    patch.approved_by = session.userId
    patch.approved_at = new Date().toISOString()
  }
  const { error } = await supabase.from(entity).update(patch).eq("id", id)
  if (error) throw new Error(error.message)
  await audit(`${entity}.${status}`, "Content workflow", entity, id, `Status set to ${status}`)
  revalidatePath(PUBLIC_PATHS[entity])
  revalidatePath(`/admin/${entity === "leadership_profiles" ? "leadership" : entity}`)
}

export async function archiveEntity(formData: FormData) {
  const entity = String(formData.get("entity") ?? "") as Entity
  const id = String(formData.get("id") ?? "")
  if (!ENTITY_PERMISSIONS[entity] || !z.string().uuid().safeParse(id).success) return
  await assertPermission(ENTITY_PERMISSIONS[entity].manage)
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from(entity).update({ status: "archived" }).eq("id", id)
  if (error) throw new Error(error.message)
  await audit(`${entity}.archived`, "Content workflow", entity, id, "Record archived")
  revalidatePath(PUBLIC_PATHS[entity])
  redirect(`/admin/${entity === "leadership_profiles" ? "leadership" : entity}`)
}
