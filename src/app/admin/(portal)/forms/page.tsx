import { requirePermission } from "@/lib/auth/guards"
import { can, getAdminSession } from "@/lib/auth/session"
import { PageHeader } from "@/components/admin/ui"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getContactFormConfig } from "@/lib/site-config"
import { FormSettingsForm } from "./FormSettingsForm"

export default async function FormsPage() {
  await requirePermission("settings.view")
  const session = await getAdminSession()
  const config = await getContactFormConfig()

  // Who receives the in-app notification for a new enquiry — derived from the
  // permission itself, so the list is accurate rather than maintained by hand.
  const supabase = await createSupabaseServerClient()
  const { data: people } = await supabase
    .from("profiles")
    .select("email, status")
    .eq("status", "active")
  const staffCount = people?.length ?? 0

  return (
    <>
      <PageHeader
        title="Forms"
        description="Configuration for the public enquiry form. Changes take effect on the live site immediately — no redeploy."
      />
      <FormSettingsForm
        config={config}
        canEdit={can(session, "settings.manage")}
        notificationRecipients={`${staffCount} active administrator${staffCount === 1 ? "" : "s"} receive new-enquiry notifications (role-based: enquiries.manage)`}
      />
    </>
  )
}
