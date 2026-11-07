import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, Empty, PageHeader, RelativeTime, StatusPill } from "@/components/admin/ui"
import { Select, SubmitButton } from "@/components/admin/form"
import { deletePartnership, setPartnershipStatus } from "@/app/admin/actions/site"

export default async function PartnershipsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requirePermission("partnerships.view")
  const { status } = await searchParams
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from("partnership_requests")
    .select("id, organisation, contact_name, role, email, country, partnership_type, message, status, created_at")
    .order("created_at", { ascending: false })
  if (status) query = query.eq("status", status)
  const { data: rows } = await query

  return (
    <>
      <PageHeader
        title="Partnership requests"
        description="Institutional and strategic partnership enquiries. Submitting an enquiry never makes an organisation an established partner — that requires the workflow below."
      />
      <form action="/admin/partnerships" className="mb-4 flex items-center gap-2">
        <select name="status" defaultValue={status ?? ""} className="h-9 rounded-lg border border-[#DDE1E4] bg-white px-2 text-[12.5px]">
          <option value="">All stages</option>
          <option value="new">New</option>
          <option value="assessment">Assessment</option>
          <option value="discussion">Discussion</option>
          <option value="proposal">Proposal</option>
          <option value="active">Active partnership</option>
          <option value="closed">Closed</option>
        </select>
        <button className="h-9 rounded-lg bg-[#252B31] px-3 text-[12.5px] font-semibold text-white">Filter</button>
      </form>

      {rows && rows.length > 0 ? (
        <div className="grid gap-3 lg:grid-cols-2">
          {rows.map((row) => (
            <Card key={row.id} title={row.organisation} description={`${row.contact_name}${row.role ? ` · ${row.role}` : ""} · ${row.country}`}>
              <p className="whitespace-pre-wrap text-[12.5px] leading-relaxed text-[#252B31]">{row.message}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#EDEFF1] pt-3 text-[11.5px] text-[#89929B]">
                <StatusPill status={row.status} />
                <span>{row.partnership_type}</span>
                <span>·</span>
                <a href={`mailto:${row.email}`} className="hover:text-[#701F3D]">{row.email}</a>
                <span className="ml-auto"><RelativeTime iso={row.created_at} /></span>
              </div>
              <div className="mt-3 flex flex-wrap items-end gap-2">
                <form action={setPartnershipStatus} className="flex items-end gap-2">
                  <input type="hidden" name="id" value={row.id} />
                  <Select name="status" defaultValue={row.status} options={[
                    { value: "new", label: "New" },
                    { value: "assessment", label: "Assessment" },
                    { value: "discussion", label: "Discussion" },
                    { value: "proposal", label: "Proposal" },
                    { value: "active", label: "Active partnership" },
                    { value: "closed", label: "Closed" },
                  ]} className="h-9 py-1" />
                  <SubmitButton variant="secondary">Update stage</SubmitButton>
                </form>
                <form action={deletePartnership}>
                  <input type="hidden" name="id" value={row.id} />
                  <SubmitButton variant="danger">Delete</SubmitButton>
                </form>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card><Empty title="No partnership requests" description="Requests submitted through the partnership form are listed here for assessment." /></Card>
      )}
    </>
  )
}
