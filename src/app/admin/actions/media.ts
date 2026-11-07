"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { assertPermission } from "@/lib/auth/guards"

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml", "application/pdf"]
const MAX_BYTES = 10 * 1024 * 1024

const CATEGORIES = ["brand", "homepage", "about", "digital-health", "geospatial", "analytics", "programme-management", "geo-st4r", "leadership", "insights", "contact", "documents"]

export async function uploadMedia(formData: FormData) {
  const session = await assertPermission("media.upload")
  const file = formData.get("file")
  const category = String(formData.get("category") ?? "homepage")
  const altText = String(formData.get("alt_text") ?? "").trim()

  if (!(file instanceof File) || file.size === 0) throw new Error("No file supplied")
  if (!ALLOWED.includes(file.type)) throw new Error(`Unsupported file type: ${file.type || "unknown"}`)
  if (file.size > MAX_BYTES) throw new Error("File exceeds the 10 MB limit")
  if (!altText) throw new Error("Alt text is required — it is published with the image")
  if (!CATEGORIES.includes(category)) throw new Error("Unknown media category")

  const supabase = await createSupabaseServerClient()
  const extension = (file.name.split(".").pop() ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "")
  const base = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
  const path = `${category}/${base || "asset"}-${Date.now().toString(36)}.${extension}`

  const { error: uploadError } = await supabase.storage.from("website-media").upload(path, file, {
    contentType: file.type,
    upsert: false,
    cacheControl: "31536000",
  })
  if (uploadError) throw new Error(uploadError.message)

  const width = Number(formData.get("width")) || null
  const height = Number(formData.get("height")) || null

  const { data, error } = await supabase
    .from("media_assets")
    .insert({
      bucket: "website-media",
      path,
      file_name: file.name.slice(0, 180),
      mime_type: file.type,
      size_bytes: file.size,
      width,
      height,
      alt_text: altText.slice(0, 300),
      caption: (String(formData.get("caption") ?? "").trim() || null) as string | null,
      category,
      tags: [],
      uploaded_by: session.userId,
    })
    .select("id")
    .single()

  if (error) {
    await supabase.storage.from("website-media").remove([path])
    throw new Error(error.message)
  }

  await supabase.rpc("record_audit", {
    p_action: "media.uploaded",
    p_module: "Media",
    p_entity: "media_assets",
    p_entity_id: data.id,
    p_summary: `Uploaded ${file.name} to ${category}`,
    p_metadata: { bytes: file.size, mime: file.type },
  })

  revalidatePath("/admin/media")
}

export async function updateMedia(formData: FormData) {
  await assertPermission("media.manage")
  const schema = z.object({
    id: z.string().uuid(),
    alt_text: z.string().trim().min(1).max(300),
    caption: z.string().trim().max(500).optional(),
    category: z.string().trim().min(1).max(60),
  })
  const parsed = schema.safeParse({
    id: formData.get("id"),
    alt_text: formData.get("alt_text"),
    caption: (formData.get("caption") as string) || undefined,
    category: formData.get("category"),
  })
  if (!parsed.success) throw new Error("Invalid media details")

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from("media_assets")
    .update({ alt_text: parsed.data.alt_text, caption: parsed.data.caption ?? null, category: parsed.data.category })
    .eq("id", parsed.data.id)
  if (error) throw new Error(error.message)

  await supabase.rpc("record_audit", {
    p_action: "media.updated",
    p_module: "Media",
    p_entity: "media_assets",
    p_entity_id: parsed.data.id,
    p_summary: "Media metadata updated",
  })
  revalidatePath("/admin/media")
  revalidatePath(`/admin/media/${parsed.data.id}`)
}

export async function deleteMedia(formData: FormData) {
  await assertPermission("media.delete")
  const id = String(formData.get("id") ?? "")
  if (!z.string().uuid().safeParse(id).success) return

  const supabase = await createSupabaseServerClient()
  const { data: asset } = await supabase.from("media_assets").select("id, bucket, path, file_name").eq("id", id).single()
  if (!asset) return

  // Refuse to delete an asset that is still referenced by content.
  const { count } = await supabase.from("media_usage").select("id", { count: "exact", head: true }).eq("media_id", id)
  if ((count ?? 0) > 0) throw new Error("This asset is in use. Remove the references first.")

  await supabase.storage.from(asset.bucket).remove([asset.path])
  const { error } = await supabase.from("media_assets").delete().eq("id", id)
  if (error) throw new Error(error.message)

  await supabase.rpc("record_audit", {
    p_action: "media.deleted",
    p_module: "Media",
    p_entity: "media_assets",
    p_entity_id: id,
    p_summary: `Deleted ${asset.file_name}`,
  })
  revalidatePath("/admin/media")
}
