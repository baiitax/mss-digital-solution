import Link from "next/link"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, Empty, PageHeader, StatusPill } from "@/components/admin/ui"
import { Field, SubmitButton, TextInput } from "@/components/admin/form"
import { saveLeadership } from "@/app/admin/actions/content"

export default async function LeadershipPage() {
  await requirePermission("leadership.view")
  const supabase = await createSupabaseServerClient()
  const { data: rows } = await supabase
    .from("leadership_profiles")
    .select("id, slug, full_name, position, status, is_visible, display_order")
    .order("display_order", { ascending: true })

  return (
    <>
      <PageHeader title="Leadership manager" description="Approved organisational profiles only. Additional people may be added when verified information is supplied." />
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card bodyClassName="">
            {rows && rows.length > 0 ? (
              <ul className="divide-y divide-[#F0F1F2]">
                {rows.map((row) => (
                  <li key={row.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div>
                      <Link href={`/admin/leadership/${row.id}`} className="text-[13px] font-semibold text-[#252B31] hover:text-[#701F3D]">{row.full_name}</Link>
                      <p className="text-[11.5px] text-[#89929B]">{row.position}{row.is_visible ? "" : " · hidden"}</p>
                    </div>
                    <StatusPill status={row.status} />
                  </li>
                ))}
              </ul>
            ) : (
              <Empty title="No profiles" description="Add the executive profile once the approved biography and portrait are available." />
            )}
          </Card>
        </div>
        <Card title="Add profile" description="Only with approved information">
          <form action={saveLeadership} className="space-y-3">
            <Field label="Full name"><TextInput name="full_name" required /></Field>
            <Field label="Slug"><TextInput name="slug" required /></Field>
            <Field label="Position"><TextInput name="position" defaultValue="Executive Director" /></Field>
            <Field label="Display order"><TextInput name="display_order" type="number" defaultValue={0} /></Field>
            <SubmitButton className="w-full justify-center">Create profile</SubmitButton>
          </form>
        </Card>
      </div>
    </>
  )
}
