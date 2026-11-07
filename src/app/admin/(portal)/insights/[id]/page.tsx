import Link from "next/link"
import { notFound } from "next/navigation"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { can } from "@/lib/auth/session"
import { Card, PageHeader, StatusPill, formatDate } from "@/components/admin/ui"
import { Checkbox, Field, SubmitButton, TextArea, TextInput } from "@/components/admin/form"
import { Workflow } from "@/components/admin/Workflow"
import { saveInsight } from "@/app/admin/actions/content"

export default async function InsightEditor({ params }: { params: Promise<{ id: string }> }) {
  const session = await requirePermission("insights.view")
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data: row } = await supabase.from("insights").select("*").eq("id", id).maybeSingle()
  if (!row) notFound()

  return (
    <>
      <PageHeader
        title={row.title}
        description={`/insights/${row.slug}${row.approved_at ? ` · approved ${formatDate(row.approved_at)}` : ""}`}
        actions={<><StatusPill status={row.status} /><Link href="/admin/insights" className="rounded-lg border border-[#DDE1E4] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">All articles</Link></>}
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <form action={saveInsight} className="space-y-4 xl:col-span-2">
          <input type="hidden" name="id" value={row.id} />
          <Card title="Article">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Title"><TextInput name="title" defaultValue={row.title} required /></Field>
              <Field label="Slug"><TextInput name="slug" defaultValue={row.slug} required /></Field>
              <Field label="Category"><TextInput name="category" defaultValue={row.category} /></Field>
              <Field label="Author"><TextInput name="author" defaultValue={row.author} /></Field>
              <Field label="Reading time (minutes)"><TextInput name="read_minutes" type="number" defaultValue={row.read_minutes} /></Field>
              <Field label="Cover image"><TextInput name="cover_image" defaultValue={row.cover_image} /></Field>
              <Field label="Tags (comma separated)"><TextInput name="tags" defaultValue={(row.tags ?? []).join(", ")} /></Field>
              <Field label="Featured"><div className="pt-2"><Checkbox name="featured" defaultChecked={row.featured} label="Feature on insights index" /></div></Field>
              <Field label="Excerpt" className="sm:col-span-2"><TextArea name="excerpt" rows={2} defaultValue={row.excerpt} /></Field>
              <Field label="Article body" hint="Plain text and paragraph breaks. Rendered without raw HTML." className="sm:col-span-2">
                <TextArea name="body" rows={16} defaultValue={row.body} />
              </Field>
              <Field label="Review notes" className="sm:col-span-2"><TextArea name="review_notes" rows={2} defaultValue={row.review_notes} /></Field>
            </div>
          </Card>
          <Card title="SEO">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="SEO title"><TextInput name="seo_title" defaultValue={row.seo_title} /></Field>
              <Field label="SEO description"><TextInput name="seo_description" defaultValue={row.seo_description} /></Field>
            </div>
          </Card>
          <div className="flex justify-end"><SubmitButton>Save article</SubmitButton></div>
        </form>
        <div className="space-y-4">
          <Card title="Editorial workflow" description="Approval is required before publication">
            <Workflow entity="insights" id={row.id} status={row.status} canPublish={can(session, "insights.publish")} />
            <dl className="mt-3 space-y-1 border-t border-[#EDEFF1] pt-3 text-[11.5px] text-[#59636D]">
              <div className="flex justify-between"><dt>Published</dt><dd>{row.published_at ? formatDate(row.published_at) : "—"}</dd></div>
              <div className="flex justify-between"><dt>Scheduled</dt><dd>{row.scheduled_for ? formatDate(row.scheduled_for) : "—"}</dd></div>
              <div className="flex justify-between"><dt>Approved</dt><dd>{row.approved_at ? formatDate(row.approved_at) : "—"}</dd></div>
            </dl>
          </Card>
          <Card title="Corrections policy">
            <p className="text-[12px] leading-relaxed text-[#59636D]">
              Research claims, data points and authorship must be verifiable before approval. If a source cannot be confirmed, the article stays in draft.
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
