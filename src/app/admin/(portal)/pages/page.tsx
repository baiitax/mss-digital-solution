import Link from "next/link"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, Empty, PageHeader, StatusPill, formatDate } from "@/components/admin/ui"
import { can } from "@/lib/auth/session"
import { Plus, Search } from "lucide-react"

export default async function PagesPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  const session = await requirePermission("pages.view")
  const { q, status } = await searchParams
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from("pages")
    .select("id, slug, title, status, is_system, version, published_at, scheduled_for, updated_at", { count: "exact" })
    .is("deleted_at", null)
    .order("title", { ascending: true })

  if (status) query = query.eq("status", status)
  if (q) query = query.or(`title.ilike.%${q}%,slug.ilike.%${q}%`)

  const { data: pages, count, error } = await query

  return (
    <>
      <PageHeader
        title="Pages manager"
        description="Every public route, its status and its version. Publishing writes a version snapshot and revalidates the live route."
        actions={
          can(session, "pages.create") ? (
            <Link href="/admin/pages/new" className="inline-flex items-center gap-1.5 rounded-lg bg-[#701F3D] px-3 py-2 text-[12.5px] font-semibold text-white hover:bg-[#50152D]">
              <Plus className="h-3.5 w-3.5" /> New page
            </Link>
          ) : undefined
        }
      />

      <form action="/admin/pages" className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#89929B]" />
          <input name="q" defaultValue={q ?? ""} placeholder="Search title or slug" className="h-9 w-60 rounded-lg border border-[#DDE1E4] bg-white pl-8 pr-3 text-[12.5px] outline-none focus:border-[#701F3D]" />
        </div>
        <select name="status" defaultValue={status ?? ""} className="h-9 rounded-lg border border-[#DDE1E4] bg-white px-2 text-[12.5px]">
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="in_review">In review</option>
          <option value="archived">Archived</option>
        </select>
        <button type="submit" className="h-9 rounded-lg bg-[#252B31] px-3 text-[12.5px] font-semibold text-white">Filter</button>
        <span className="ml-auto text-[11.5px] text-[#89929B]">{count ?? 0} pages</span>
      </form>

      <Card bodyClassName="">
        {error ? (
          <Empty title="Could not load pages" description={error.message} />
        ) : pages && pages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead className="border-b border-[#EDEFF1] bg-[#FAF9F7] text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Page</th>
                  <th className="px-4 py-2.5 font-semibold">Route</th>
                  <th className="px-4 py-2.5 font-semibold">Status</th>
                  <th className="px-4 py-2.5 font-semibold">Version</th>
                  <th className="px-4 py-2.5 font-semibold">Updated</th>
                  <th className="px-4 py-2.5 font-semibold" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F1F2]">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-[#FAF9F7]">
                    <td className="px-4 py-3">
                      <Link href={`/admin/pages/${page.id}`} className="font-medium text-[#252B31] hover:text-[#701F3D]">{page.title}</Link>
                      {page.is_system && <span className="ml-2 rounded bg-[#F0F1F2] px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-[#59636D]">system</span>}
                    </td>
                    <td className="px-4 py-3 font-mono text-[11.5px] text-[#59636D]">{page.slug}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={page.status} />
                      {page.scheduled_for && <span className="ml-2 text-[11px] text-[#8A5A15]">scheduled {formatDate(page.scheduled_for)}</span>}
                    </td>
                    <td className="px-4 py-3 text-[#59636D]">v{page.version}</td>
                    <td className="px-4 py-3 text-[#59636D]">{formatDate(page.updated_at)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/pages/${page.id}`} className="text-[12px] font-semibold text-[#701F3D] hover:underline">Edit</Link>
                      {page.status === "published" && (
                        <Link href={page.slug} target="_blank" className="ml-3 text-[12px] text-[#59636D] hover:text-[#701F3D]">View</Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty title="No pages match" description="Clear the filters to see all managed routes." />
        )}
      </Card>
    </>
  )
}
