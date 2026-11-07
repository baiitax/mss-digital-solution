import Link from "next/link"
import { notFound } from "next/navigation"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { can } from "@/lib/auth/session"
import { Card, PageHeader, StatusPill } from "@/components/admin/ui"
import { Field, SubmitButton, TextArea, TextInput } from "@/components/admin/form"
import { Workflow } from "@/components/admin/Workflow"
import { saveCapability } from "@/app/admin/actions/content"

export default async function CapabilityEditor({ params }: { params: Promise<{ id: string }> }) {
  const session = await requirePermission("capabilities.view")
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data: row } = await supabase.from("capabilities").select("*").eq("id", id).maybeSingle()
  if (!row) notFound()

  return (
    <>
      <PageHeader
        title={row.name}
        description={`/capabilities/${row.slug}`}
        actions={<><StatusPill status={row.status} /><Link href="/admin/capabilities" className="rounded-lg border border-[#DDE1E4] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">All capabilities</Link></>}
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <form action={saveCapability} className="space-y-4 xl:col-span-2">
          <input type="hidden" name="id" value={row.id} />
          <Card title="Identity">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Name"><TextInput name="name" defaultValue={row.name} required /></Field>
              <Field label="Slug"><TextInput name="slug" defaultValue={row.slug} required /></Field>
              <Field label="Short name"><TextInput name="short_name" defaultValue={row.short_name} /></Field>
              <Field label="Display order"><TextInput name="display_order" type="number" defaultValue={row.display_order} /></Field>
              <Field label="Summary" className="sm:col-span-2"><TextArea name="summary" rows={2} defaultValue={row.summary} /></Field>
              <Field label="Detailed description" className="sm:col-span-2"><TextArea name="description" rows={6} defaultValue={row.description} /></Field>
            </div>
          </Card>
          <Card title="Imagery" description="Paths or absolute URLs — reference media library assets where possible">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Hero image"><TextInput name="hero_image" defaultValue={row.hero_image} /></Field>
              <Field label="Gallery (JSON array of URLs)"><TextInput name="gallery" defaultValue={JSON.stringify(row.gallery ?? [])} /></Field>
            </div>
          </Card>
          <Card title="Structure">
            <div className="grid gap-3">
              <Field label="Areas of expertise (JSON array)" hint='["Settlement mapping", "Facility catchments"]'>
                <TextArea name="expertise" rows={3} defaultValue={JSON.stringify(row.expertise ?? [])} />
              </Field>
              <Field label="Process steps (JSON array of {title, body})">
                <TextArea name="process_steps" rows={4} defaultValue={JSON.stringify(row.process_steps ?? [])} />
              </Field>
            </div>
          </Card>
          <Card title="SEO">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="SEO title"><TextInput name="seo_title" defaultValue={row.seo_title} /></Field>
              <Field label="SEO description"><TextInput name="seo_description" defaultValue={row.seo_description} /></Field>
            </div>
          </Card>
          <div className="flex justify-end"><SubmitButton>Save capability</SubmitButton></div>
        </form>
        <div className="space-y-4">
          <Card title="Workflow"><Workflow entity="capabilities" id={row.id} status={row.status} canPublish={can(session, "capabilities.manage")} /></Card>
          <Card title="Public surface">
            <p className="text-[12px] leading-relaxed text-[#59636D]">Published capabilities appear on the homepage grid, the /capabilities index and the detail route.</p>
            <Link href={`/capabilities/${row.slug}`} target="_blank" className="mt-3 inline-flex text-[12px] font-semibold text-[#701F3D] hover:underline">View public page ↗</Link>
          </Card>
        </div>
      </div>
    </>
  )
}
