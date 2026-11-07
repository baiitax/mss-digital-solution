import Link from "next/link"
import { notFound } from "next/navigation"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, PageHeader, StatusPill, formatDate } from "@/components/admin/ui"
import { Field, Select, TextArea, SubmitButton } from "@/components/admin/form"
import { addEnquiryNote, assignEnquiry, deleteEnquiry, setEnquiryStatus } from "@/app/admin/actions/enquiries"

export default async function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requirePermission("enquiries.view")
  const { id } = await params
  const supabase = await createSupabaseServerClient()

  const { data: enquiry } = await supabase
    .from("contact_enquiries")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle()

  if (!enquiry) notFound()

  // Opening a record marks it read (first view only).
  if (!enquiry.read_at) {
    await supabase.from("contact_enquiries").update({ read_at: new Date().toISOString() }).eq("id", id)
  }

  const [{ data: notes }, { data: admins }, { data: trail }] = await Promise.all([
    supabase.from("record_notes").select("id, body, author_id, created_at").eq("entity", "enquiry").eq("entity_id", id).order("created_at", { ascending: true }),
    supabase.from("profiles").select("id, full_name, email").eq("status", "active").order("full_name"),
    supabase.from("audit_logs").select("id, actor_email, action, summary, created_at").eq("entity", "enquiry").eq("entity_id", id).order("created_at", { ascending: false }).limit(20),
  ])

  const canManage = true // page-level permission already enforced; action-level checks re-run server-side

  return (
    <>
      <PageHeader
        title={enquiry.full_name}
        description={`${enquiry.organisation || "No organisation given"} · received ${formatDate(enquiry.created_at)}`}
        actions={<Link href="/admin/enquiries" className="rounded-lg border border-[#DDE1E4] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">Back to inbox</Link>}
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <Card title="Message" description={`${enquiry.enquiry_type} · ${enquiry.area_of_interest}`}>
            <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-[#252B31]">{enquiry.message}</p>
            <dl className="mt-4 grid gap-3 border-t border-[#EDEFF1] pt-4 text-[12.5px] sm:grid-cols-2">
              <div><dt className="text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">Email</dt><dd className="mt-0.5 text-[#252B31]"><a className="hover:text-[#701F3D]" href={`mailto:${enquiry.email}`}>{enquiry.email}</a></dd></div>
              <div><dt className="text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">Telephone</dt><dd className="mt-0.5 text-[#252B31]">{enquiry.telephone || "—"}</dd></div>
              <div><dt className="text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">Position</dt><dd className="mt-0.5 text-[#252B31]">{enquiry.role || "—"}</dd></div>
              <div><dt className="text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">Country</dt><dd className="mt-0.5 text-[#252B31]">{enquiry.country}</dd></div>
              <div><dt className="text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">Subject</dt><dd className="mt-0.5 text-[#252B31]">{enquiry.subject || "—"}</dd></div>
              <div><dt className="text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">Current status</dt><dd className="mt-1"><StatusPill status={enquiry.status} /></dd></div>
            </dl>
          </Card>

          <Card title="Internal notes" description="Visible to administrators only — never shown on the public site">
            <ul className="space-y-3">
              {(notes ?? []).map((note) => {
                const author = admins?.find((a) => a.id === note.author_id)
                return (
                  <li key={note.id} className="rounded-lg border border-[#EDEFF1] bg-[#FAF9F7] p-3">
                    <div className="flex items-center justify-between text-[11px] text-[#89929B]">
                      <span className="font-medium text-[#59636D]">{author?.full_name || author?.email || "Administrator"}</span>
                      <span>{formatDate(note.created_at)}</span>
                    </div>
                    <p className="mt-1.5 whitespace-pre-wrap text-[12.5px] leading-relaxed text-[#252B31]">{note.body}</p>
                  </li>
                )
              })}
              {(!notes || notes.length === 0) && <li className="text-[12.5px] text-[#89929B]">No internal notes yet.</li>}
            </ul>
            {canManage && (
              <form action={addEnquiryNote} className="mt-4 border-t border-[#EDEFF1] pt-4">
                <input type="hidden" name="id" value={enquiry.id} />
                <Field label="Add a note"><TextArea name="body" rows={3} placeholder="Record a call outcome, a referral, or next steps…" /></Field>
                <div className="mt-2 flex justify-end"><SubmitButton>Add note</SubmitButton></div>
              </form>
            )}
          </Card>

          <Card title="Record history" description="Audit entries for this enquiry">
            <ul className="space-y-2 text-[12.5px]">
              {(trail ?? []).map((entry) => (
                <li key={entry.id} className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-[#252B31]">{entry.action}</span>
                  <span className="text-[#89929B]">{entry.summary}</span>
                  <span className="ml-auto text-[11px] text-[#89929B]">{entry.actor_email} · {formatDate(entry.created_at)}</span>
                </li>
              ))}
              {(!trail || trail.length === 0) && <li className="text-[#89929B]">No recorded actions yet.</li>}
            </ul>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Status">
            <form action={setEnquiryStatus} className="space-y-3">
              <input type="hidden" name="id" value={enquiry.id} />
              <Field label="Change status">
                <Select
                  name="status"
                  defaultValue={enquiry.status}
                  options={[
                    { value: "new", label: "New" },
                    { value: "in_review", label: "In review" },
                    { value: "awaiting_response", label: "Awaiting response" },
                    { value: "responded", label: "Responded" },
                    { value: "closed", label: "Closed" },
                    { value: "spam", label: "Spam" },
                  ]}
                />
              </Field>
              <SubmitButton className="w-full justify-center">Update status</SubmitButton>
            </form>
          </Card>

          <Card title="Assignment">
            <form action={assignEnquiry} className="space-y-3">
              <input type="hidden" name="id" value={enquiry.id} />
              <Field label="Assigned administrator">
                <Select
                  name="assigned_to"
                  defaultValue={enquiry.assigned_to ?? ""}
                  options={[{ value: "", label: "Unassigned" }, ...(admins ?? []).map((a) => ({ value: a.id, label: a.full_name || a.email }))]}
                />
              </Field>
              <Field label="Priority">
                <Select
                  name="priority"
                  defaultValue={enquiry.priority}
                  options={[
                    { value: "low", label: "Low" },
                    { value: "normal", label: "Normal" },
                    { value: "high", label: "High" },
                    { value: "urgent", label: "Urgent" },
                  ]}
                />
              </Field>
              <SubmitButton variant="secondary" className="w-full justify-center">Save assignment</SubmitButton>
            </form>
          </Card>

          <Card title="Retention">
            <p className="text-[12px] leading-relaxed text-[#59636D]">
              Archiving removes the record from active views but preserves it for audit and retention. Deletion is soft —
              nothing is destroyed without a Data Protection review.
            </p>
            <form action={deleteEnquiry} className="mt-3">
              <input type="hidden" name="id" value={enquiry.id} />
              <SubmitButton variant="danger" className="w-full justify-center">Archive enquiry</SubmitButton>
            </form>
          </Card>

          <Card title="Reply">
            <p className="text-[12px] leading-relaxed text-[#59636D]">
              Email delivery is not configured for this deployment, so replies are sent from your own mail client.
            </p>
            <a
              href={`mailto:${enquiry.email}?subject=${encodeURIComponent("Re: " + (enquiry.subject || "Your enquiry to MSS Digital Solutions"))}`}
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-[#252B31] px-3 py-2 text-[12.5px] font-semibold text-white hover:bg-[#343D46]"
            >
              Compose email to {enquiry.full_name.split(" ")[0]}
            </a>
          </Card>
        </div>
      </div>
    </>
  )
}
