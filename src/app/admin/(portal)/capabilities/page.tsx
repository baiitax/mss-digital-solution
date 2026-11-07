import Link from "next/link"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, Empty, PageHeader, StatusPill } from "@/components/admin/ui"
import { saveCapability } from "@/app/admin/actions/content"
import { Field, SubmitButton, TextArea, TextInput } from "@/components/admin/form"

export default async function CapabilitiesPage() {
  await requirePermission("capabilities.view")
  const supabase = await createSupabaseServerClient()
  const { data: rows } = await supabase
    .from("capabilities")
    .select("id, slug, name, summary, status, display_order")
    .order("display_order", { ascending: true })

  return (
    <>
      <PageHeader
        title="Capabilities manager"
        description="The four practice areas shown on the homepage, the capabilities index and their detail pages. Edits here flow to all three surfaces."
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card bodyClassName="">
            {rows && rows.length > 0 ? (
              <ul className="divide-y divide-[#F0F1F2]">
                {rows.map((row) => (
                  <li key={row.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <Link href={`/admin/capabilities/${row.id}`} className="text-[13px] font-semibold text-[#252B31] hover:text-[#701F3D]">{row.name}</Link>
                      <p className="truncate text-[11.5px] text-[#89929B]">/{row.slug} · order {row.display_order}</p>
                    </div>
                    <StatusPill status={row.status} />
                  </li>
                ))}
              </ul>
            ) : (
              <Empty title="No capabilities recorded" description="Create the four practice areas to populate the homepage and capability pages." />
            )}
          </Card>
        </div>
        <Card title="Create capability" description="Starts as a draft">
          <form action={saveCapability} className="space-y-3">
            <Field label="Name"><TextInput name="name" required /></Field>
            <Field label="Slug" hint="e.g. digital-health-systems"><TextInput name="slug" required /></Field>
            <Field label="Summary"><TextArea name="summary" rows={2} /></Field>
            <Field label="Display order"><TextInput name="display_order" type="number" defaultValue={0} /></Field>
            <SubmitButton className="w-full justify-center">Create draft</SubmitButton>
          </form>
        </Card>
      </div>
    </>
  )
}
