import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, Empty, PageHeader, formatDate } from "@/components/admin/ui"
import { Field, Select, SubmitButton, TextInput } from "@/components/admin/form"
import { deleteRedirect, saveRedirect, toggleRedirect } from "@/app/admin/actions/site"

export default async function RedirectsPage() {
  await requirePermission("navigation.manage")
  const supabase = await createSupabaseServerClient()
  const { data: rows } = await supabase.from("redirects").select("*").order("created_at", { ascending: false })

  return (
    <>
      <PageHeader title="Redirect manager" description="Database-managed redirects, applied alongside the route aliases compiled into the application." />
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card bodyClassName="">
            {rows && rows.length > 0 ? (
              <ul className="divide-y divide-[#F0F1F2]">
                {rows.map((row) => (
                  <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                    <div>
                      <p className="font-mono text-[12px] text-[#252B31]">{row.source} → {row.destination}</p>
                      <p className="text-[11px] text-[#89929B]">{row.status_code} · created {formatDate(row.created_at)} · {row.is_active ? "active" : "inactive"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <form action={toggleRedirect}>
                        <input type="hidden" name="id" value={row.id} />
                        <input type="hidden" name="is_active" value={String(!row.is_active)} />
                        <SubmitButton variant="secondary">{row.is_active ? "Disable" : "Enable"}</SubmitButton>
                      </form>
                      <form action={deleteRedirect}>
                        <input type="hidden" name="id" value={row.id} />
                        <SubmitButton variant="danger">Delete</SubmitButton>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty title="No database redirects" description="Static aliases are handled in next.config. Add records here for editorial redirects." />
            )}
          </Card>
        </div>
        <Card title="Add redirect">
          <form action={saveRedirect} className="space-y-3">
            <Field label="Source path"><TextInput name="source" placeholder="/old-page" required /></Field>
            <Field label="Destination"><TextInput name="destination" placeholder="/new-page" required /></Field>
            <Field label="Status code">
              <Select name="status_code" options={[{ value: "308", label: "308 Permanent" }, { value: "307", label: "307 Temporary" }]} />
            </Field>
            <SubmitButton className="w-full justify-center">Create redirect</SubmitButton>
          </form>
        </Card>
      </div>
    </>
  )
}
