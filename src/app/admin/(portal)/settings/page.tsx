import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, PageHeader } from "@/components/admin/ui"
import { Checkbox, Field, SubmitButton, TextArea, TextInput } from "@/components/admin/form"
import { saveSettings } from "@/app/admin/actions/site"

export default async function SettingsPage() {
  await requirePermission("settings.view")
  const supabase = await createSupabaseServerClient()
  const { data: rows } = await supabase.from("site_settings").select("key, value, is_public")
  const get = (key: string) => {
    const row = (rows ?? []).find((r) => r.key === key)
    const value = row?.value
    if (typeof value === "string") return value
    if (typeof value === "boolean") return value
    return ""
  }

  return (
    <>
      <PageHeader
        title="Website settings"
        description="Contact details, brand tokens and operational switches. Only verified company information should be entered here — placeholders are preferable to invented values."
      />
      <form action={saveSettings} className="grid gap-4 xl:grid-cols-2">
        <Card title="General">
          <div className="grid gap-3">
            <Field label="Company name"><TextInput name="site.name" defaultValue={String(get("site.name") || "MSS Digital Solutions Ltd")} /></Field>
            <Field label="Website title"><TextInput name="site.title" defaultValue={String(get("site.title") || "")} /></Field>
            <Field label="Website description"><TextArea name="site.description" rows={2} defaultValue={String(get("site.description") || "")} /></Field>
            <Field label="Public URL"><TextInput name="site.url" defaultValue={String(get("site.url") || "https://mss-digital.vercel.app")} /></Field>
          </div>
        </Card>

        <Card title="Contact">
          <div className="grid gap-3">
            <Field label="Official email" hint="Leave blank until a verified address is approved"><TextInput name="contact.email" defaultValue={String(get("contact.email") || "")} /></Field>
            <Field label="Telephone" hint="Leave blank until verified"><TextInput name="contact.phone" defaultValue={String(get("contact.phone") || "")} /></Field>
            <Field label="Office address"><TextArea name="contact.address" rows={2} defaultValue={String(get("contact.address") || "")} /></Field>
            <Field label="LinkedIn"><TextInput name="social.linkedin" defaultValue={String(get("social.linkedin") || "")} /></Field>
            <Field label="X / Twitter"><TextInput name="social.x" defaultValue={String(get("social.x") || "")} /></Field>
          </div>
        </Card>

        <Card title="Brand">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Primary (burgundy)"><TextInput name="brand.primary" defaultValue={String(get("brand.primary") || "#701F3D")} /></Field>
            <Field label="Secondary (storm grey)"><TextInput name="brand.secondary" defaultValue={String(get("brand.secondary") || "#343D46")} /></Field>
          </div>
          <p className="mt-3 text-[11.5px] leading-relaxed text-[#89929B]">Brand tokens are recorded here for reference and future theming. The compiled interface keeps its audited palette.</p>
        </Card>

        <Card title="Footer">
          <div className="grid gap-3">
            <Field label="Corporate description"><TextArea name="footer.description" rows={3} defaultValue={String(get("footer.description") || "")} /></Field>
            <Field label="Copyright text"><TextInput name="footer.copyright" defaultValue={String(get("footer.copyright") || "")} /></Field>
          </div>
        </Card>

        <Card title="Operations">
          <div className="space-y-3">
            <Checkbox name="operations.maintenance_mode" defaultChecked={get("operations.maintenance_mode") === true} label="Maintenance mode" />
            <Checkbox name="operations.enquiry_form_enabled" defaultChecked={get("operations.enquiry_form_enabled") !== false} label="Public enquiry form enabled" />
            <Field label="Maximum upload size (MB)"><TextInput name="media.max_upload_mb" type="number" defaultValue={String(get("media.max_upload_mb") || 10)} /></Field>
          </div>
        </Card>

        <Card title="Notifications">
          <Field label="Notification email" hint="Used by the email provider once configured"><TextInput name="notifications.email" defaultValue={String(get("notifications.email") || "")} /></Field>
          <p className="mt-2 text-[11.5px] leading-relaxed text-[#89929B]">No SMTP provider is connected in this deployment, so notifications are delivered in-app only. The value is stored for when a provider is added.</p>
        </Card>

        <div className="xl:col-span-2 flex justify-end"><SubmitButton>Save settings</SubmitButton></div>
      </form>
    </>
  )
}
