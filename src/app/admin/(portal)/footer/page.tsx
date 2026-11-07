import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, PageHeader } from "@/components/admin/ui"
import { Field, SubmitButton, TextArea, TextInput } from "@/components/admin/form"
import { saveSettings } from "@/app/admin/actions/site"

export default async function FooterManager() {
  await requirePermission("navigation.manage")
  const supabase = await createSupabaseServerClient()
  const { data: rows } = await supabase.from("site_settings").select("key, value")
  const get = (key: string) => {
    const value = (rows ?? []).find((r) => r.key === key)?.value
    return typeof value === "string" ? value : ""
  }

  return (
    <>
      <PageHeader title="Footer manager" description="The footer copy, contact points and legal line rendered site-wide." />
      <form action={saveSettings} className="grid max-w-3xl gap-4">
        <Card title="Corporate block">
          <div className="grid gap-3">
            <Field label="Corporate description" hint="Two to three sentences on the company mandate"><TextArea name="footer.description" rows={3} defaultValue={get("footer.description")} /></Field>
            <Field label="Copyright line"><TextInput name="footer.copyright" defaultValue={get("footer.copyright")} /></Field>
          </div>
        </Card>
        <Card title="Contact points">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Email" hint="Only enter a verified address"><TextInput name="contact.email" defaultValue={get("contact.email")} /></Field>
            <Field label="Telephone"><TextInput name="contact.phone" defaultValue={get("contact.phone")} /></Field>
            <Field label="Office address" className="sm:col-span-2"><TextArea name="contact.address" rows={2} defaultValue={get("contact.address")} /></Field>
          </div>
        </Card>
        <div className="flex justify-end"><SubmitButton>Save footer</SubmitButton></div>
      </form>
    </>
  )
}
