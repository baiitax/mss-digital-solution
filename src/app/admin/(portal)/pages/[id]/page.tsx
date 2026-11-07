import Link from "next/link"
import { notFound } from "next/navigation"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { can } from "@/lib/auth/session"
import { Card, PageHeader, StatusPill, formatDate } from "@/components/admin/ui"
import { Checkbox, Field, Select, SubmitButton, TextArea, TextInput } from "@/components/admin/form"
import { BlockEditor, type Block } from "@/components/admin/BlockEditor"
import { archivePage, duplicatePage, publishPage, restorePageVersion, savePage, schedulePage, unpublishPage } from "@/app/admin/actions/pages"

export default async function PageEditor({ params }: { params: Promise<{ id: string }> }) {
  const session = await requirePermission("pages.view")
  const { id } = await params
  const supabase = await createSupabaseServerClient()

  const { data: page } = await supabase.from("pages").select("*").eq("id", id).is("deleted_at", null).maybeSingle()
  if (!page) notFound()

  const { data: versions } = await supabase
    .from("page_versions")
    .select("id, version, note, created_at")
    .eq("page_id", id)
    .order("version", { ascending: false })
    .limit(10)

  const blocks: Block[] = Array.isArray(page.blocks) ? (page.blocks as Block[]) : []
  const editable = can(session, "pages.edit")
  const publishable = can(session, "pages.publish")

  return (
    <>
      <PageHeader
        title={page.title}
        description={`${page.slug} · version ${page.version} · updated ${formatDate(page.updated_at)}`}
        actions={
          <>
            <StatusPill status={page.status} />
            {page.status === "published" && (
              <Link href={page.slug} target="_blank" className="rounded-lg border border-[#DDE1E4] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">Preview live</Link>
            )}
            <Link href="/admin/pages" className="rounded-lg border border-[#DDE1E4] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">All pages</Link>
          </>
        }
      />

      <form action={savePage}>
        <input type="hidden" name="id" value={page.id} />
        <div className="grid gap-4 xl:grid-cols-3">
          <div className="space-y-4 xl:col-span-2">
            <Card title="Page identity">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Title"><TextInput name="title" defaultValue={page.title} required /></Field>
                <Field label="Route (slug)" hint="Must start with /. Changing this changes the public URL."><TextInput name="slug" defaultValue={page.slug} required /></Field>
                <Field label="Navigation label"><TextInput name="nav_label" defaultValue={page.nav_label} /></Field>
                <Field label="Template">
                  <Select name="template" defaultValue={page.template} options={[
                    { value: "standard", label: "Standard" },
                    { value: "capability", label: "Capability" },
                    { value: "case-study", label: "Case study" },
                    { value: "legal", label: "Legal" },
                  ]} />
                </Field>
                <Field label="Summary" className="sm:col-span-2"><TextArea name="summary" rows={2} defaultValue={page.summary} /></Field>
              </div>
            </Card>

            <Card title="Hero">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Eyebrow"><TextInput name="hero_eyebrow" defaultValue={page.hero_eyebrow} /></Field>
                <Field label="Hero image URL"><TextInput name="hero_image" defaultValue={page.hero_image} /></Field>
                <Field label="Hero title" className="sm:col-span-2"><TextInput name="hero_title" defaultValue={page.hero_title} /></Field>
                <Field label="Hero description" className="sm:col-span-2"><TextArea name="hero_description" rows={3} defaultValue={page.hero_description} /></Field>
              </div>
            </Card>

            <Card title="Content blocks" description="Structured blocks — no raw HTML, sanitised at render">
              {editable ? <BlockEditor name="blocks" initial={blocks} /> : <p className="text-[12.5px] text-[#89929B]">Your role can view but not edit page content.</p>}
            </Card>

            <Card title="Search engine metadata">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="SEO title"><TextInput name="seo_title" defaultValue={page.seo_title} /></Field>
                <Field label="Open Graph image"><TextInput name="og_image" defaultValue={page.og_image} /></Field>
                <Field label="Meta description" className="sm:col-span-2"><TextArea name="seo_description" rows={2} defaultValue={page.seo_description} /></Field>
                <Field label="Canonical URL"><TextInput name="canonical" defaultValue={page.canonical} /></Field>
                <div className="flex items-end pb-2"><Checkbox name="no_index" defaultChecked={page.no_index} label="Exclude from search indexing" /></div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card title="Save">
              <p className="text-[12px] leading-relaxed text-[#59636D]">Saving creates a new working version. The public page only changes when you publish.</p>
              <div className="mt-3 flex flex-col gap-2">
                <SubmitButton className="justify-center">{editable ? "Save changes" : "Save (view only)"}</SubmitButton>
              </div>
            </Card>

            <Card title="Publication">
              <dl className="space-y-1.5 text-[12px] text-[#59636D]">
                <div className="flex justify-between"><dt>Status</dt><dd><StatusPill status={page.status} /></dd></div>
                <div className="flex justify-between"><dt>Published</dt><dd>{page.published_at ? formatDate(page.published_at) : "—"}</dd></div>
                <div className="flex justify-between"><dt>Scheduled</dt><dd>{page.scheduled_for ? formatDate(page.scheduled_for) : "—"}</dd></div>
              </dl>
              {publishable && (
                <div className="mt-3 space-y-2">
                  {page.status === "published" ? (
                    <button formAction={unpublishPage} className="w-full rounded-lg border border-[#DDE1E4] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">Unpublish</button>
                  ) : (
                    <button formAction={publishPage} className="w-full rounded-lg bg-[#2F6B4F] px-3 py-2 text-[12.5px] font-semibold text-white hover:bg-[#255741]">Publish now</button>
                  )}
                  <div className="rounded-lg border border-[#E3E6E8] p-2.5">
                    <Field label="Schedule publication"><TextInput type="datetime-local" name="scheduled_for" /></Field>
                    <button formAction={schedulePage} className="mt-2 w-full rounded-lg border border-[#DDE1E4] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">Schedule</button>
                  </div>
                </div>
              )}
            </Card>

            <Card title="Version history" description="Snapshots written at publication">
              {versions && versions.length > 0 ? (
                <ul className="space-y-2">
                  {versions.map((v) => (
                    <li key={v.id} className="flex items-center justify-between gap-2 rounded-lg border border-[#EDEFF1] px-2.5 py-2">
                      <div className="min-w-0">
                        <p className="text-[12px] font-medium text-[#252B31]">v{v.version}</p>
                        <p className="truncate text-[11px] text-[#89929B]">{v.note || formatDate(v.created_at)}</p>
                      </div>
                      {editable && (
                        <button formAction={restorePageVersion} name="version_id" value={v.id} className="rounded border border-[#DDE1E4] px-2 py-1 text-[11px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">Restore</button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[12px] text-[#89929B]">No versions yet. The first publish creates one.</p>
              )}
              <input type="hidden" name="page_id" value={page.id} />
            </Card>

            <Card title="Housekeeping">
              <div className="space-y-2">
                {can(session, "pages.create") && (
                  <button formAction={duplicatePage} className="w-full rounded-lg border border-[#DDE1E4] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">Duplicate page</button>
                )}
                {can(session, "pages.delete") && !page.is_system && (
                  <button formAction={archivePage} className="w-full rounded-lg border border-[#8F2D2D]/30 bg-[#FBEAEA] px-3 py-2 text-[12.5px] font-semibold text-[#8F2D2D] hover:bg-[#F5D9D9]">Archive page</button>
                )}
                {page.is_system && <p className="text-[11.5px] text-[#89929B]">System pages cannot be archived — the public route depends on them.</p>}
              </div>
            </Card>
          </div>
        </div>
      </form>
    </>
  )
}
