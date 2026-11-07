import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, PageHeader, formatDate } from "@/components/admin/ui"
import { Checkbox, Field, SubmitButton, TextArea, TextInput } from "@/components/admin/form"
import { saveSeoMetadata } from "@/app/admin/actions/site"

export default async function SeoPage() {
  await requirePermission("seo.manage")
  const supabase = await createSupabaseServerClient()
  const [{ data: pages }, { data: rows }] = await Promise.all([
    supabase.from("pages").select("slug, title").is("deleted_at", null).order("slug"),
    supabase.from("seo_metadata").select("*").order("path"),
  ])

  return (
    <>
      <PageHeader
        title="SEO manager"
        description="Per-route metadata. Robots and sitemap are generated from published content; drafts and administrative routes are never indexed."
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-3 xl:col-span-2">
          {(pages ?? []).map((page) => {
            const meta = (rows ?? []).find((r) => r.path === page.slug)
            return (
              <Card key={page.slug} title={page.title} description={`${page.slug}${meta ? ` · updated ${formatDate(meta.updated_at)}` : " · no metadata yet"}`}>
                <form action={saveSeoMetadata} className="grid gap-3 sm:grid-cols-2">
                  <input type="hidden" name="path" value={page.slug} />
                  <Field label="SEO title"><TextInput name="title" defaultValue={meta?.title} /></Field>
                  <Field label="Canonical URL"><TextInput name="canonical" defaultValue={meta?.canonical} /></Field>
                  <Field label="Meta description" className="sm:col-span-2"><TextArea name="description" rows={2} defaultValue={meta?.description} /></Field>
                  <Field label="Open Graph title"><TextInput name="og_title" defaultValue={meta?.og_title} /></Field>
                  <Field label="Open Graph image"><TextInput name="og_image" defaultValue={meta?.og_image} /></Field>
                  <div className="sm:col-span-2"><Checkbox name="no_index" defaultChecked={meta?.no_index} label="Exclude from search indexing" /></div>
                  <div className="sm:col-span-2 flex justify-end"><SubmitButton variant="secondary">Save metadata</SubmitButton></div>
                </form>
              </Card>
            )
          })}
        </div>
        <div className="space-y-4">
          <Card title="Sitemap" description="Generated from published routes">
            <p className="text-[12px] leading-relaxed text-[#59636D]">The sitemap includes published pages and articles only. Drafts, previews and /admin routes are excluded by construction.</p>
            <a href="/sitemap.xml" target="_blank" className="mt-3 inline-flex text-[12px] font-semibold text-[#701F3D] hover:underline">Open sitemap.xml ↗</a>
          </Card>
          <Card title="Robots">
            <p className="text-[12px] leading-relaxed text-[#59636D]">Administrative routes are disallowed for crawlers and carry a no-index header.</p>
            <a href="/robots.txt" target="_blank" className="mt-3 inline-flex text-[12px] font-semibold text-[#701F3D] hover:underline">Open robots.txt ↗</a>
          </Card>
        </div>
      </div>
    </>
  )
}
