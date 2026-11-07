import Link from "next/link"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, Empty, PageHeader, StatusPill, formatDate } from "@/components/admin/ui"
import { Field, SubmitButton, TextArea, TextInput } from "@/components/admin/form"
import { saveInsight } from "@/app/admin/actions/content"

const CATEGORIES = ["digital-health", "geospatial-intelligence", "public-health", "immunisation", "healthcare-data", "technology-innovation", "programme-implementation", "research-policy"]

export default async function InsightsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requirePermission("insights.view")
  const { status } = await searchParams
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from("insights")
    .select("id, slug, title, category, author, status, featured, published_at, updated_at")
    .is("deleted_at", null)
    .order("updated_at", { ascending: false })
  if (status) query = query.eq("status", status)
  const { data: rows } = await query

  return (
    <>
      <PageHeader title="Insights & publications" description="Editorial pipeline: Draft → Review → Approved → Published → Archived. Editors cannot publish without the publish permission." />
      <form action="/admin/insights" className="mb-4 flex items-center gap-2">
        <select name="status" defaultValue={status ?? ""} className="h-9 rounded-lg border border-[#DDE1E4] bg-white px-2 text-[12.5px]">
          <option value="">All stages</option>
          <option value="draft">Draft</option>
          <option value="in_review">In review</option>
          <option value="approved">Approved</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
        <button className="h-9 rounded-lg bg-[#252B31] px-3 text-[12.5px] font-semibold text-white">Filter</button>
        <span className="ml-auto text-[11.5px] text-[#89929B]">{rows?.length ?? 0} articles</span>
      </form>
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card bodyClassName="">
            {rows && rows.length > 0 ? (
              <ul className="divide-y divide-[#F0F1F2]">
                {rows.map((row) => (
                  <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                    <div className="min-w-0">
                      <Link href={`/admin/insights/${row.id}`} className="text-[13px] font-semibold text-[#252B31] hover:text-[#701F3D]">{row.title}</Link>
                      <p className="text-[11.5px] text-[#89929B]">{row.category} · {row.author}{row.featured ? " · featured" : ""}{row.published_at ? ` · published ${formatDate(row.published_at)}` : ""}</p>
                    </div>
                    <StatusPill status={row.status} />
                  </li>
                ))}
              </ul>
            ) : (
              <Empty title="No articles yet" description="Articles are only published when an approved manuscript exists. Nothing is invented on the public site in the meantime." />
            )}
          </Card>
        </div>
        <Card title="Create article">
          <form action={saveInsight} className="space-y-3">
            <Field label="Title"><TextInput name="title" required /></Field>
            <Field label="Slug"><TextInput name="slug" required /></Field>
            <Field label="Category">
              <select name="category" className="mt-1 w-full rounded-lg border border-[#DDE1E4] px-3 py-2 text-[13px]">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace(/-/g, " ")}</option>)}
              </select>
            </Field>
            <Field label="Author"><TextInput name="author" defaultValue="MSS Digital Solutions" /></Field>
            <Field label="Excerpt"><TextArea name="excerpt" rows={2} /></Field>
            <SubmitButton className="w-full justify-center">Create draft</SubmitButton>
          </form>
        </Card>
      </div>
    </>
  )
}
