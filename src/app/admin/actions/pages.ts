"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { assertPermission } from "@/lib/auth/guards"

const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(120)
  .regex(/^\/[a-z0-9\-/]*$/, "Slug must start with / and use lowercase letters, numbers and hyphens")

const pageInput = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(1).max(160),
  slug: slugSchema,
  nav_label: z.string().trim().max(80).optional().nullable(),
  template: z.string().trim().max(60).default("standard"),
  summary: z.string().trim().max(600).optional().nullable(),
  hero_eyebrow: z.string().trim().max(160).optional().nullable(),
  hero_title: z.string().trim().max(240).optional().nullable(),
  hero_description: z.string().trim().max(1200).optional().nullable(),
  hero_image: z.string().trim().max(500).optional().nullable(),
  seo_title: z.string().trim().max(200).optional().nullable(),
  seo_description: z.string().trim().max(400).optional().nullable(),
  og_image: z.string().trim().max(500).optional().nullable(),
  canonical: z.string().trim().max(500).optional().nullable(),
  no_index: z.boolean().default(false),
})

function parseBlocks(raw: unknown) {
  if (typeof raw !== "string" || raw.trim() === "") return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // Only structured blocks with a known type and string content survive.
    return parsed
      .filter((b) => b && typeof b === "object" && typeof b.type === "string")
      .slice(0, 60)
      .map((b, index) => ({
        id: typeof b.id === "string" ? b.id : `block-${index}`,
        type: String(b.type).slice(0, 40),
        ...Object.fromEntries(
          Object.entries(b)
            .filter(([k, v]) => !["id", "type"].includes(k) && (typeof v === "string" || typeof v === "boolean" || typeof v === "number" || Array.isArray(v)))
            .map(([k, v]) => [k, typeof v === "string" ? v.slice(0, 8000) : v])
        ),
      }))
  } catch {
    return []
  }
}

function readForm(formData: FormData) {
  return pageInput.safeParse({
    id: (formData.get("id") as string) || undefined,
    title: formData.get("title"),
    slug: formData.get("slug"),
    nav_label: (formData.get("nav_label") as string) || null,
    template: (formData.get("template") as string) || "standard",
    summary: (formData.get("summary") as string) || null,
    hero_eyebrow: (formData.get("hero_eyebrow") as string) || null,
    hero_title: (formData.get("hero_title") as string) || null,
    hero_description: (formData.get("hero_description") as string) || null,
    hero_image: (formData.get("hero_image") as string) || null,
    seo_title: (formData.get("seo_title") as string) || null,
    seo_description: (formData.get("seo_description") as string) || null,
    og_image: (formData.get("og_image") as string) || null,
    canonical: (formData.get("canonical") as string) || null,
    no_index: formData.get("no_index") === "on",
  })
}

export async function savePage(formData: FormData) {
  const session = await assertPermission("pages.edit")
  const parsed = readForm(formData)
  if (!parsed.success) return
  const blocks = parseBlocks(formData.get("blocks"))
  const supabase = await createSupabaseServerClient()

  if (parsed.data.id) {
    const { data: current } = await supabase.from("pages").select("version, status").eq("id", parsed.data.id).single()
    const { error } = await supabase
      .from("pages")
      .update({ ...parsed.data, blocks, updated_by: session.userId, version: (current?.version ?? 1) + 1 })
      .eq("id", parsed.data.id)
    if (error) throw new Error(error.message)
    await supabase.rpc("record_audit", {
      p_action: "page.saved",
      p_module: "Pages",
      p_entity: "pages",
      p_entity_id: parsed.data.id,
      p_summary: `Saved page "${parsed.data.title}" (${blocks.length} blocks)`,
    })
    revalidatePath(`/admin/pages/${parsed.data.id}`)
    revalidatePath(parsed.data.slug)
    return
  }

  const { data, error } = await supabase
    .from("pages")
    .insert({ ...parsed.data, blocks, status: "draft", created_by: session.userId, updated_by: session.userId })
    .select("id")
    .single()
  if (error) throw new Error(error.message)
  await supabase.rpc("record_audit", {
    p_action: "page.created",
    p_module: "Pages",
    p_entity: "pages",
    p_entity_id: data.id,
    p_summary: `Created page "${parsed.data.title}"`,
  })
  revalidatePath("/admin/pages")
  redirect(`/admin/pages/${data.id}`)
}

export async function publishPage(formData: FormData) {
  const session = await assertPermission("pages.publish")
  const id = String(formData.get("id") ?? "")
  if (!z.string().uuid().safeParse(id).success) return
  const supabase = await createSupabaseServerClient()

  const { data: page, error: readError } = await supabase.from("pages").select("*").eq("id", id).single()
  if (readError || !page) throw new Error(readError?.message ?? "Page not found")

  // Snapshot the version being published — history is never overwritten.
  const { data: lastVersion } = await supabase
    .from("page_versions")
    .select("version")
    .eq("page_id", id)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle()

  await supabase.from("page_versions").insert({
    page_id: id,
    version: (lastVersion?.version ?? 0) + 1,
    snapshot: page,
    note: `Published by ${session.email}`,
    created_by: session.userId,
  })

  const { error } = await supabase
    .from("pages")
    .update({ status: "published", published_at: new Date().toISOString(), scheduled_for: null, updated_by: session.userId })
    .eq("id", id)
  if (error) throw new Error(error.message)

  await supabase.rpc("record_audit", {
    p_action: "page.published",
    p_module: "Pages",
    p_entity: "pages",
    p_entity_id: id,
    p_summary: `Published "${page.title}"`,
  })
  revalidatePath("/admin/pages")
  revalidatePath(`/admin/pages/${id}`)
  revalidatePath(page.slug)
}

export async function unpublishPage(formData: FormData) {
  await assertPermission("pages.publish")
  const id = String(formData.get("id") ?? "")
  if (!z.string().uuid().safeParse(id).success) return
  const supabase = await createSupabaseServerClient()
  const { data: page } = await supabase.from("pages").select("slug, title").eq("id", id).single()
  const { error } = await supabase.from("pages").update({ status: "draft", published_at: null }).eq("id", id)
  if (error) throw new Error(error.message)
  await supabase.rpc("record_audit", {
    p_action: "page.unpublished",
    p_module: "Pages",
    p_entity: "pages",
    p_entity_id: id,
    p_summary: `Unpublished "${page?.title ?? id}"`,
  })
  revalidatePath("/admin/pages")
  revalidatePath(`/admin/pages/${id}`)
  if (page?.slug) revalidatePath(page.slug)
}

export async function schedulePage(formData: FormData) {
  await assertPermission("pages.publish")
  const id = String(formData.get("id") ?? "")
  const when = String(formData.get("scheduled_for") ?? "")
  if (!z.string().uuid().safeParse(id).success || !when) return
  const supabase = await createSupabaseServerClient()
  await supabase.from("pages").update({ scheduled_for: new Date(when).toISOString(), status: "in_review" }).eq("id", id)
  await supabase.rpc("record_audit", {
    p_action: "page.scheduled",
    p_module: "Pages",
    p_entity: "pages",
    p_entity_id: id,
    p_summary: `Publication scheduled for ${when}`,
  })
  revalidatePath(`/admin/pages/${id}`)
}

export async function duplicatePage(formData: FormData) {
  const session = await assertPermission("pages.create")
  const id = String(formData.get("id") ?? "")
  if (!z.string().uuid().safeParse(id).success) return
  const supabase = await createSupabaseServerClient()
  const { data: page } = await supabase.from("pages").select("*").eq("id", id).single()
  if (!page) return
  const suffix = Date.now().toString(36).slice(-4)
  const { data, error } = await supabase
    .from("pages")
    .insert({
      ...page,
      id: undefined,
      slug: `${page.slug}-copy-${suffix}`,
      title: `${page.title} (copy)`,
      status: "draft",
      is_system: false,
      published_at: null,
      scheduled_for: null,
      version: 1,
      created_by: session.userId,
      updated_by: session.userId,
      created_at: undefined,
      updated_at: undefined,
    })
    .select("id")
    .single()
  if (error) throw new Error(error.message)
  await supabase.rpc("record_audit", {
    p_action: "page.duplicated",
    p_module: "Pages",
    p_entity: "pages",
    p_entity_id: data.id,
    p_summary: `Duplicated "${page.title}"`,
  })
  revalidatePath("/admin/pages")
  redirect(`/admin/pages/${data.id}`)
}

export async function archivePage(formData: FormData) {
  await assertPermission("pages.delete")
  const id = String(formData.get("id") ?? "")
  if (!z.string().uuid().safeParse(id).success) return
  const supabase = await createSupabaseServerClient()
  await supabase.from("pages").update({ deleted_at: new Date().toISOString(), status: "archived" }).eq("id", id)
  await supabase.rpc("record_audit", {
    p_action: "page.archived",
    p_module: "Pages",
    p_entity: "pages",
    p_entity_id: id,
    p_summary: "Page archived (soft delete)",
  })
  revalidatePath("/admin/pages")
  redirect("/admin/pages")
}

export async function restorePageVersion(formData: FormData) {
  const session = await assertPermission("pages.edit")
  const pageId = String(formData.get("page_id") ?? "")
  const versionId = String(formData.get("version_id") ?? "")
  if (!z.string().uuid().safeParse(pageId).success || !z.string().uuid().safeParse(versionId).success) return
  const supabase = await createSupabaseServerClient()
  const { data: version } = await supabase.from("page_versions").select("snapshot, version").eq("id", versionId).single()
  if (!version?.snapshot) return
  const snapshot = version.snapshot as Record<string, unknown>
  const { error } = await supabase
    .from("pages")
    .update({
      title: snapshot.title as string,
      summary: snapshot.summary as string | null,
      hero_eyebrow: snapshot.hero_eyebrow as string | null,
      hero_title: snapshot.hero_title as string | null,
      hero_description: snapshot.hero_description as string | null,
      hero_image: snapshot.hero_image as string | null,
      blocks: snapshot.blocks ?? [],
      seo_title: snapshot.seo_title as string | null,
      seo_description: snapshot.seo_description as string | null,
      updated_by: session.userId,
    })
    .eq("id", pageId)
  if (error) throw new Error(error.message)
  await supabase.rpc("record_audit", {
    p_action: "page.version_restored",
    p_module: "Pages",
    p_entity: "pages",
    p_entity_id: pageId,
    p_summary: `Restored content from version ${version.version}`,
  })
  revalidatePath(`/admin/pages/${pageId}`)
}
