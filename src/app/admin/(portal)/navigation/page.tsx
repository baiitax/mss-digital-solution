import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, PageHeader } from "@/components/admin/ui"
import { Checkbox, Field, Select, SubmitButton, TextInput } from "@/components/admin/form"
import { deleteNavigationItem, saveNavigationItem } from "@/app/admin/actions/site"

export default async function NavigationPage() {
  await requirePermission("navigation.manage")
  const supabase = await createSupabaseServerClient()
  const { data: items } = await supabase
    .from("navigation_items")
    .select("id, location, parent_id, label, href, display_order, is_visible, is_external")
    .order("location")
    .order("display_order", { ascending: true })

  const header = (items ?? []).filter((i) => i.location === "header")
  const footer = (items ?? []).filter((i) => i.location !== "header")

  return (
    <>
      <PageHeader title="Navigation manager" description="Header and footer link structure. Visibility is enforced in the rendered site navigation." />
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <Card title="Header menu" bodyClassName="">
            <ul className="divide-y divide-[#F0F1F2]">
              {header.map((item) => (
                <li key={item.id} className="px-4 py-3">
                  <form action={saveNavigationItem} className="grid items-end gap-2 sm:grid-cols-[1fr_1fr_80px_auto_auto]">
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="location" value={item.location} />
                    <Field label="Label"><TextInput name="label" defaultValue={item.label} /></Field>
                    <Field label="Href"><TextInput name="href" defaultValue={item.href} /></Field>
                    <Field label="Order"><TextInput name="display_order" type="number" defaultValue={item.display_order} /></Field>
                    <div className="flex flex-col gap-1 pb-1">
                      <Checkbox name="is_visible" defaultChecked={item.is_visible} label="Visible" />
                      <Checkbox name="is_external" defaultChecked={item.is_external} label="External" />
                    </div>
                    <SubmitButton variant="secondary">Save</SubmitButton>
                  </form>
                </li>
              ))}
              {header.length === 0 && <li className="px-4 py-6 text-[12.5px] text-[#89929B]">No header items registered.</li>}
            </ul>
          </Card>

          <Card title="Footer links" bodyClassName="">
            <ul className="divide-y divide-[#F0F1F2]">
              {footer.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <div>
                    <p className="text-[12.5px] font-medium text-[#252B31]">{item.label}</p>
                    <p className="text-[11.5px] text-[#89929B]">{item.href} · {item.location}</p>
                  </div>
                  <form action={deleteNavigationItem}>
                    <input type="hidden" name="id" value={item.id} />
                    <SubmitButton variant="danger">Remove</SubmitButton>
                  </form>
                </li>
              ))}
              {footer.length === 0 && <li className="px-4 py-6 text-[12.5px] text-[#89929B]">No footer items registered.</li>}
            </ul>
          </Card>
        </div>

        <Card title="Add link">
          <form action={saveNavigationItem} className="space-y-3">
            <Field label="Location">
              <Select name="location" options={[
                { value: "header", label: "Header" },
                { value: "footer-company", label: "Footer — company" },
                { value: "footer-legal", label: "Footer — legal" },
                { value: "footer-explore", label: "Footer — explore" },
              ]} />
            </Field>
            <Field label="Label"><TextInput name="label" required /></Field>
            <Field label="Href"><TextInput name="href" required placeholder="/capabilities" /></Field>
            <Field label="Order"><TextInput name="display_order" type="number" defaultValue={100} /></Field>
            <Checkbox name="is_visible" defaultChecked label="Visible" />
            <Checkbox name="is_external" label="Opens in a new tab" />
            <SubmitButton className="w-full justify-center">Add item</SubmitButton>
          </form>
        </Card>
      </div>
    </>
  )
}
