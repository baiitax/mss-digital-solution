import Link from "next/link"
import { notFound } from "next/navigation"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { can } from "@/lib/auth/session"
import { Card, PageHeader, StatusPill } from "@/components/admin/ui"
import { Checkbox, Field, Select, SubmitButton, TextArea, TextInput } from "@/components/admin/form"
import { Workflow } from "@/components/admin/Workflow"
import { saveProject } from "@/app/admin/actions/content"

export default async function ProjectEditor({ params }: { params: Promise<{ id: string }> }) {
  const session = await requirePermission("projects.view")
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data: row } = await supabase.from("projects").select("*").eq("id", id).maybeSingle()
  if (!row) notFound()

  return (
    <>
      <PageHeader
        title={row.title}
        description={`/our-work/${row.slug}`}
        actions={<><StatusPill status={row.status} /><Link href="/admin/projects" className="rounded-lg border border-[#DDE1E4] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">All projects</Link></>}
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <form action={saveProject} className="space-y-4 xl:col-span-2">
          <input type="hidden" name="id" value={row.id} />
          <Card title="Overview">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Title"><TextInput name="title" defaultValue={row.title} required /></Field>
              <Field label="Slug"><TextInput name="slug" defaultValue={row.slug} required /></Field>
              <Field label="Category"><TextInput name="category" defaultValue={row.category} /></Field>
              <Field label="Implementation period"><TextInput name="period" defaultValue={row.period} /></Field>
              <Field label="State"><TextInput name="state" defaultValue={row.state} /></Field>
              <Field label="Country"><TextInput name="country" defaultValue={row.country} /></Field>
              <Field label="Focus areas (comma separated)"><TextInput name="focus_areas" defaultValue={(row.focus_areas ?? []).join(", ")} /></Field>
              <Field label="Partners (comma separated)"><TextInput name="partners" defaultValue={(row.partners ?? []).join(", ")} /></Field>
              <Field label="Summary" className="sm:col-span-2"><TextArea name="summary" rows={3} defaultValue={row.summary} /></Field>
              <Field label="Cover image"><TextInput name="cover_image" defaultValue={row.cover_image} /></Field>
              <Field label="Featured"><div className="pt-2"><Checkbox name="featured" defaultChecked={row.featured} label="Feature on homepage" /></div></Field>
            </div>
          </Card>
          <Card title="Narrative">
            <div className="grid gap-3">
              <Field label="Approach"><TextArea name="approach" rows={4} defaultValue={row.approach} /></Field>
              <Field label="Methodology"><TextArea name="methodology" rows={4} defaultValue={row.methodology} /></Field>
              <Field label="Objectives (JSON array)"><TextArea name="objectives" rows={3} defaultValue={JSON.stringify(row.objectives ?? [])} /></Field>
              <Field label="Verified results (JSON array)" hint="Only approved, verifiable figures belong here"><TextArea name="results" rows={3} defaultValue={JSON.stringify(row.results ?? [])} /></Field>
              <Field label="Sections (JSON array of {heading, body})"><TextArea name="sections" rows={4} defaultValue={JSON.stringify(row.sections ?? [])} /></Field>
              <Field label="Gallery (JSON array of URLs)"><TextArea name="gallery" rows={2} defaultValue={JSON.stringify(row.gallery ?? [])} /></Field>
            </div>
          </Card>
          <Card title="Search engine metadata">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="SEO title"><TextInput name="seo_title" defaultValue={row.seo_title} /></Field>
              <Field label="SEO description"><TextInput name="seo_description" defaultValue={row.seo_description} /></Field>
            </div>
          </Card>
          <div className="flex justify-end"><SubmitButton>Save project</SubmitButton></div>
        </form>
        <div className="space-y-4">
          <Card title="Verification" description="Governs how this content may be described publicly">
            <Field label="Verification level">
              <Select name="verification_level" defaultValue={row.verification_level ?? "awaiting_approval"} options={[
                { value: "verified", label: "Verified project information" },
                { value: "illustrative", label: "Illustrative content" },
                { value: "synthetic", label: "Synthetic demonstration" },
                { value: "awaiting_approval", label: "Awaiting approval" },
              ]} />
            </Field>
            <p className="mt-2 text-[11.5px] leading-relaxed text-[#89929B]">Saved with the rest of the record. Illustrative and synthetic content must not be presented as programme results.</p>
          </Card>
          <Card title="Workflow"><Workflow entity="projects" id={row.id} status={row.status} canPublish={can(session, "projects.manage")} /></Card>
        </div>
      </div>
    </>
  )
}
