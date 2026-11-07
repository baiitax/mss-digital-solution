"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { assertPermission } from "@/lib/auth/guards"

const STATUSES = ["new", "in_review", "awaiting_response", "responded", "closed", "spam"] as const
const PRIORITIES = ["low", "normal", "high", "urgent"] as const

const statusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(STATUSES),
})

const assignSchema = z.object({
  id: z.string().uuid(),
  assigned_to: z.string().uuid().or(z.literal("")),
  priority: z.enum(PRIORITIES),
})

const noteSchema = z.object({
  id: z.string().uuid(),
  body: z.string().min(2).max(4000),
})

export async function setEnquiryStatus(formData: FormData) {
  const session = await assertPermission("enquiries.manage")
  const parsed = statusSchema.safeParse({ id: formData.get("id"), status: formData.get("status") })
  if (!parsed.success) return
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from("contact_enquiries")
    .update({ status: parsed.data.status, read_at: new Date().toISOString() })
    .eq("id", parsed.data.id)
  if (error) throw new Error(error.message)
  await supabase.rpc("record_audit", {
    p_action: "enquiry.status_changed",
    p_module: "Enquiries",
    p_entity: "contact_enquiries",
    p_entity_id: parsed.data.id,
    p_summary: `Enquiry status set to ${parsed.data.status}`,
    p_metadata: { actor: session.email, status: parsed.data.status },
  })
  revalidatePath("/admin/enquiries")
  revalidatePath(`/admin/enquiries/${parsed.data.id}`)
}

export async function assignEnquiry(formData: FormData) {
  await assertPermission("enquiries.manage")
  const parsed = assignSchema.safeParse({
    id: formData.get("id"),
    assigned_to: formData.get("assigned_to") ?? "",
    priority: formData.get("priority") ?? "normal",
  })
  if (!parsed.success) return

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from("contact_enquiries")
    .update({
      assigned_to: parsed.data.assigned_to === "" ? null : parsed.data.assigned_to,
      priority: parsed.data.priority,
    })
    .eq("id", parsed.data.id)
  if (error) throw new Error(error.message)
  await supabase.rpc("record_audit", {
    p_action: "enquiry.assigned",
    p_module: "Enquiries",
    p_entity: "contact_enquiries",
    p_entity_id: parsed.data.id,
    p_summary: parsed.data.assigned_to ? "Enquiry assigned to an administrator" : "Enquiry unassigned",
    p_metadata: { priority: parsed.data.priority },
  })
  revalidatePath(`/admin/enquiries/${parsed.data.id}`)
}

export async function addEnquiryNote(formData: FormData) {
  const session = await assertPermission("enquiries.manage")
  const parsed = noteSchema.safeParse({ id: formData.get("id"), body: formData.get("body") })
  if (!parsed.success) return

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from("record_notes").insert({
    entity: "enquiry",
    entity_id: parsed.data.id,
    body: parsed.data.body.trim(),
    author_id: session.userId,
  })
  if (error) throw new Error(error.message)
  await supabase.from("contact_enquiries").update({ read_at: new Date().toISOString() }).eq("id", parsed.data.id).is("read_at", null)
  await supabase.rpc("record_audit", {
    p_action: "enquiry.note_added",
    p_module: "Enquiries",
    p_entity: "contact_enquiries",
    p_entity_id: parsed.data.id,
    p_summary: "Internal note added to enquiry",
  })
  revalidatePath(`/admin/enquiries/${parsed.data.id}`)
}

export async function markEnquiryRead(id: string) {
  await assertPermission("enquiries.view")
  const supabase = await createSupabaseServerClient()
  await supabase.from("contact_enquiries").update({ read_at: new Date().toISOString() }).eq("id", id).is("read_at", null)
  revalidatePath("/admin/enquiries")
}

export async function deleteEnquiry(formData: FormData) {
  const session = await assertPermission("enquiries.manage")
  const id = String(formData.get("id") ?? "")
  if (!z.string().uuid().safeParse(id).success) return
  const supabase = await createSupabaseServerClient()
  // Soft delete — retention-friendly, and reversible by a Super Administrator.
  const { error } = await supabase.from("contact_enquiries").update({ deleted_at: new Date().toISOString(), status: "closed" }).eq("id", id)
  if (error) throw new Error(error.message)
  await supabase.rpc("record_audit", {
    p_action: "enquiry.archived",
    p_module: "Enquiries",
    p_entity: "contact_enquiries",
    p_entity_id: id,
    p_summary: `Enquiry archived by ${session.email}`,
    p_metadata: { retention: "soft-delete" },
  })
  revalidatePath("/admin/enquiries")
}
