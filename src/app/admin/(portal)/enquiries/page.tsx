import Link from "next/link"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, Empty, PageHeader, RelativeTime, StatusPill } from "@/components/admin/ui"
import { Download, Search } from "lucide-react"

const STATUS_FILTERS = [
  { value: "", label: "All statuses" },
  { value: "new", label: "New" },
  { value: "in_review", label: "In review" },
  { value: "awaiting_response", label: "Awaiting response" },
  { value: "responded", label: "Responded" },
  { value: "closed", label: "Closed" },
  { value: "spam", label: "Spam" },
]

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; type?: string }>
}) {
  await requirePermission("enquiries.view")
  const { q, status, type } = await searchParams
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from("contact_enquiries")
    .select("id, full_name, organisation, email, country, enquiry_type, area_of_interest, subject, status, priority, assigned_to, read_at, created_at", { count: "exact" })
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(100)

  if (status) query = query.eq("status", status)
  if (type) query = query.eq("enquiry_type", type)
  if (q) query = query.or(`full_name.ilike.%${q}%,organisation.ilike.%${q}%,email.ilike.%${q}%,area_of_interest.ilike.%${q}%`)

  const { data: rows, count, error } = await query

  return (
    <>
      <PageHeader
        title="Contact enquiries"
        description="Submissions from the public contact form. Status changes, assignments and notes are audit-logged."
        actions={
          <Link href="/api/admin/enquiries/export" className="inline-flex items-center gap-1.5 rounded-lg border border-[#DDE1E4] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </Link>
        }
      />

      <form className="mb-4 flex flex-wrap items-center gap-2" action="/admin/enquiries">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#89929B]" />
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search name, organisation, email"
            className="h-9 w-64 rounded-lg border border-[#DDE1E4] bg-white pl-8 pr-3 text-[12.5px] outline-none focus:border-[#701F3D]"
          />
        </div>
        <select name="status" defaultValue={status ?? ""} className="h-9 rounded-lg border border-[#DDE1E4] bg-white px-2 text-[12.5px]">
          {STATUS_FILTERS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select name="type" defaultValue={type ?? ""} className="h-9 rounded-lg border border-[#DDE1E4] bg-white px-2 text-[12.5px]">
          <option value="">All types</option>
          <option value="partnership">Partnership</option>
          <option value="general">General</option>
        </select>
        <button type="submit" className="h-9 rounded-lg bg-[#252B31] px-3 text-[12.5px] font-semibold text-white">Filter</button>
        {(q || status || type) && <Link href="/admin/enquiries" className="text-[12px] text-[#89929B] hover:text-[#701F3D]">Clear</Link>}
        <span className="ml-auto text-[11.5px] text-[#89929B]">{count ?? 0} record{(count ?? 0) === 1 ? "" : "s"}</span>
      </form>

      <Card bodyClassName="">
        {error ? (
          <Empty title="Could not load enquiries" description={error.message} />
        ) : rows && rows.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead className="border-b border-[#EDEFF1] bg-[#FAF9F7] text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Contact</th>
                  <th className="px-4 py-2.5 font-semibold">Area of interest</th>
                  <th className="px-4 py-2.5 font-semibold">Type</th>
                  <th className="px-4 py-2.5 font-semibold">Received</th>
                  <th className="px-4 py-2.5 font-semibold">Status</th>
                  <th className="px-4 py-2.5 font-semibold">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F1F2]">
                {rows.map((row) => (
                  <tr key={row.id} className={`hover:bg-[#FAF9F7] ${row.read_at ? "" : "bg-[#FDFBFC]"}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {!row.read_at && <span className="h-1.5 w-1.5 rounded-full bg-[#701F3D]" aria-label="Unread" />}
                        <Link href={`/admin/enquiries/${row.id}`} className="font-medium text-[#252B31] hover:text-[#701F3D]">{row.full_name}</Link>
                      </div>
                      <p className="text-[11.5px] text-[#89929B]">{row.organisation || row.email}</p>
                    </td>
                    <td className="px-4 py-3 text-[#59636D]">{row.area_of_interest}</td>
                    <td className="px-4 py-3 capitalize text-[#59636D]">{row.enquiry_type}</td>
                    <td className="px-4 py-3 text-[#59636D]"><RelativeTime iso={row.created_at} /></td>
                    <td className="px-4 py-3"><StatusPill status={row.status} /></td>
                    <td className="px-4 py-3 text-[#59636D] capitalize">{row.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty
            title="No enquiries match this view"
            description="Submissions from /contact land here instantly. Adjust the filters to see earlier records."
          />
        )}
      </Card>
    </>
  )
}
