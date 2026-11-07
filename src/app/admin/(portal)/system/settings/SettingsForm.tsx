"use client"

import { useActionState } from "react"
import { Card } from "@/components/admin/ui"
import { Checkbox, Field, Notice, SubmitButton, TextArea, TextInput } from "@/components/admin/form"
import { purgeArchivedEnquiries, saveOperationalSettings, type OperationalState, type PurgeState } from "@/app/admin/actions/runtime"
import type { OperationalSettings } from "@/lib/site-config"

export function SettingsForm({
  operational,
  maintenanceMessage,
  canEdit,
}: {
  operational: OperationalSettings
  maintenanceMessage: string
  canEdit: boolean
}) {
  const [state, action] = useActionState<OperationalState, FormData>(saveOperationalSettings, {})
  // A rejected save keeps what the operator had entered rather than resetting.
  const current = state.values
  const [purgeState, purgeAction] = useActionState<PurgeState, FormData>(purgeArchivedEnquiries, {})

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-4">
        <form action={action}>
          <Card title="Platform behaviour" description="Read by the public application at request time">
            {state.error && <Notice tone="error">{state.error}</Notice>}
            {state.success && <Notice tone="success">{state.success}</Notice>}

            <div className="space-y-4">
              <Checkbox name="enquiries_enabled" defaultChecked={current?.enquiries_enabled ?? operational.enquiries_enabled} label="Enquiry intake open (site-wide)" />
              <Checkbox name="notify_on_enquiry" defaultChecked={current?.notify_on_enquiry ?? operational.notify_on_enquiry} label="Create an in-app notification for each new enquiry" />

              <div className="rounded-lg border border-[#E3E6E8] p-3">
                <Checkbox name="maintenance_mode" defaultChecked={current?.maintenance_mode ?? operational.maintenance_mode} label="Maintenance mode — show a notice bar across the public site" />
                <div className="mt-3">
                  <Field label="Maintenance message" hint="Shown in the notice bar. Keep it short and factual.">
                    <TextArea name="maintenance_message" rows={2} defaultValue={current?.maintenance_message ?? maintenanceMessage} />
                  </Field>
                </div>
                <div className="mt-3 rounded-lg border border-[#8F2D2D]/25 bg-[#FBEAEA] p-2.5">
                  <Checkbox name="confirm_maintenance" label="I understand this changes what every visitor sees" />
                </div>
                <p className="mt-2 text-[11.5px] leading-relaxed text-[#89929B]">
                  Maintenance mode does not take the site offline; it adds a notice. Taking the site down is a deployment action, not a setting.
                </p>
              </div>

              <Field label="Enquiry retention window (days)" hint="Archived enquiries older than this can be purged below. 30–3650 days.">
                <TextInput name="retention_days" type="number" defaultValue={current?.retention_days ?? operational.retention_days} />
              </Field>
            </div>

            <div className="mt-4 flex justify-end">
              <SubmitButton>{canEdit ? "Save platform settings" : "Saving requires settings.manage"}</SubmitButton>
            </div>
          </Card>
        </form>

        <form action={purgeAction}>
          <Card title="Danger zone" description="Permanent deletion of archived enquiry records">
            {purgeState.error && <Notice tone="error">{purgeState.error}</Notice>}
            {purgeState.success && <Notice tone="success">{purgeState.success}</Notice>}
            <p className="text-[12.5px] leading-relaxed text-[#59636D]">
              Enquiries removed from the inbox are kept as soft-deleted records so the decision stays reviewable. This action
              hard-deletes those records once they are older than the retention window. It cannot be undone, and the removal is
              written to the audit log.
            </p>
            <input type="hidden" name="retention_days" value={operational.retention_days} />
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <div className="w-40">
                <Field label="Type PURGE to confirm">
                  <TextInput name="confirm" placeholder="PURGE" />
                </Field>
              </div>
              <SubmitButton variant="danger">Purge archived enquiries</SubmitButton>
            </div>
          </Card>
        </form>
      </div>

      <div className="space-y-4">
        <Card title="How settings are stored">
          <p className="text-[12.5px] leading-relaxed text-[#59636D]">
            Settings live in <code className="text-[11.5px]">site_settings</code>. Rows marked private are readable only by staff
            with <code className="text-[11.5px]">settings.view</code>; the public notice row is readable by anonymous visitors
            but holds no internal data.
          </p>
          <p className="mt-2 text-[11.5px] leading-relaxed text-[#89929B]">
            Every save is written to the append-only audit log with the acting administrator and the values changed.
          </p>
        </Card>
      </div>
    </div>
  )
}
