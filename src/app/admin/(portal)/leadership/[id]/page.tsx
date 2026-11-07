import Link from "next/link"
import { notFound } from "next/navigation"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { can } from "@/lib/auth/session"
import { Card, PageHeader, StatusPill } from "@/components/admin/ui"
import { Checkbox, Field, SubmitButton, TextArea, TextInput } from "@/components/admin/form"
import { Workflow } from "@/components/admin/Workflow"
import { saveLeadership } from "@/app/admin/actions/content"

export default async function LeadershipEditor({ params }: { params: Promise<{ id: string }> }) {
  const session = await requirePermission("leadership.view")
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data: row } = await supabase.from("leadership_profiles").select("*").eq("id", id).maybeSingle()
  if (!row) notFound()

  return (
    <>
      <PageHeader
        title={row.full_name}
        description={row.position}
        actions={<><StatusPill status={row.status} /><Link href="/admin/leadership" className="rounded-lg border border-[#DDE1E4] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">All profiles</Link></>}
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <form action={saveLeadership} className="space-y-4 xl:col-span-2">
          <input type="hidden" name="id" value={row.id} />
          <Card title="Profile">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Full name"><TextInput name="full_name" defaultValue={row.full_name} required /></Field>
              <Field label="Slug"><TextInput name="slug" defaultValue={row.slug} required /></Field>
              <Field label="Position"><TextInput name="position" defaultValue={row.position} /></Field>
              <Field label="Portrait URL"><TextInput name="portrait_url" defaultValue={row.portrait_url} /></Field>
              <Field label="Professional summary" className="sm:col-span-2"><TextArea name="summary" rows={3} defaultValue={row.summary} /></Field>
              <Field label="Full biography" className="sm:col-span-2"><TextArea name="biography" rows={8} defaultValue={row.biography} /></Field>
              <Field label="Credentials (JSON array)"><TextArea name="credentials" rows={3} defaultValue={JSON.stringify(row.credentials ?? [])} /></Field>
              <Field label="Education (JSON array)"><TextArea name="education" rows={3} defaultValue={JSON.stringify(row.education ?? [])} /></Field>
              <Field label="Certifications (JSON array)"><TextArea name="certifications" rows={3} defaultValue={JSON.stringify(row.certifications ?? [])} /></Field>
              <Field label="Career history (JSON array)"><TextArea name="career_history" rows={3} defaultValue={JSON.stringify(row.career_history ?? [])} /></Field>
              <Field label="Display order"><TextInput name="display_order" type="number" defaultValue={row.display_order} /></Field>
              <Field label="Visibility"><div className="pt-2"><Checkbox name="is_visible" defaultChecked={row.is_visible} label="Show on public leadership pages" /></div></Field>
            </div>
          </Card>
          <div className="flex justify-end"><SubmitButton>Save profile</SubmitButton></div>
        </form>
        <div className="space-y-4">
          <Card title="Workflow"><Workflow entity="leadership_profiles" id={row.id} status={row.status} canPublish={can(session, "leadership.manage")} /></Card>
          <Card title="Approval rule">
            <p className="text-[12px] leading-relaxed text-[#59636D]">
              Leadership content is restricted to approved organisational information. Portraits must be supplied and released by the individual — never generated.
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
