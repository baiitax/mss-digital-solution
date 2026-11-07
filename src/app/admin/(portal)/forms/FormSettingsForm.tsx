"use client"

import { useActionState } from "react"
import { Card, NotConfigured } from "@/components/admin/ui"
import { Checkbox, Field, Notice, SubmitButton, TextArea, TextInput } from "@/components/admin/form"
import { saveFormSettings, type FormSettingsState } from "@/app/admin/actions/runtime"
import type { ContactFormConfig } from "@/lib/site-config"

export function FormSettingsForm({
  config,
  canEdit,
  notificationRecipients,
}: {
  config: ContactFormConfig
  canEdit: boolean
  notificationRecipients: string
}) {
  const [state, action] = useActionState<FormSettingsState, FormData>(saveFormSettings, {})
  const current = state.values

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-4">
        <form action={action}>
          <Card title="Public enquiry form" description="These settings are read by /api/contact on every submission">
            {state.error && <Notice tone="error">{state.error}</Notice>}
            {state.success && <Notice tone="success">{state.success}</Notice>}

            <div className="space-y-4">
              <Checkbox name="enquiries_enabled" defaultChecked={current?.enquiries_enabled ?? config.enquiries_enabled} label="Accept new enquiries from the public site" />

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#59636D]">Enquiry types offered</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <Checkbox name="type_partnership" defaultChecked={(current?.accepted_types ?? config.accepted_types).includes("partnership")} label="Partnership enquiry" />
                  <Checkbox name="type_general" defaultChecked={(current?.accepted_types ?? config.accepted_types).includes("general")} label="General enquiry" />
                </div>
                <p className="mt-1.5 text-[11.5px] text-[#89929B]">
                  At least one type must stay enabled. A request for a disabled type is rejected by the API, not just hidden in the form.
                </p>
              </div>

              <Field label="Submissions per minute, per address" hint="Between 1 and 20. Applies to the server-side rate limiter.">
                <TextInput name="rate_limit_per_minute" type="number" defaultValue={current?.rate_limit_per_minute ?? config.rate_limit_per_minute} />
              </Field>

              <Field label="Acknowledgement shown after submission" hint="Optional. Leave blank to keep the site's default confirmation text.">
                <TextArea name="acknowledgement" rows={3} defaultValue={current?.acknowledgement ?? config.acknowledgement ?? ""} />
              </Field>
            </div>

            <div className="mt-4 flex justify-end">
              <SubmitButton>{canEdit ? "Save form settings" : "Saving requires settings.manage"}</SubmitButton>
            </div>
          </Card>
        </form>

        <Card title="Form definition" description="Rendered by the site's contact page — read-only here">
          <ul className="space-y-1.5 text-[12.5px] text-[#59636D]">
            {[
              ["full_name", "Required", "Stored on the enquiry record"],
              ["email", "Required", "Format validated server-side; lower-cased before storage"],
              ["message", "Required", "10–5000 characters"],
              ["organisation, role, telephone, country", "Optional", "Sanitised before storage"],
              ["area_of_interest", "Required for partnership", "Must match the approved list of practice areas"],
              ["enquiry_type", "Required", "Restricted to the types enabled above"],
            ].map(([field, rule, detail]) => (
              <li key={field} className="rounded-lg border border-[#EDEFF1] px-3 py-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <code className="text-[11.5px] font-semibold text-[#252B31]">{field}</code>
                  <span className="rounded bg-[#F0F1F2] px-1.5 py-0.5 text-[10.5px] text-[#59636D]">{rule}</span>
                </div>
                <p className="mt-1 text-[11.5px] text-[#89929B]">{detail}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11.5px] leading-relaxed text-[#89929B]">
            The field set itself is defined in code (<code>src/app/contact/page.tsx</code> and{" "}
            <code>src/app/api/contact/route.ts</code>) because the validation contract is part of the deployment. Labels and
            accepted types are administered here.
          </p>
        </Card>
      </div>

      <div className="space-y-4">
        <Card title="Where submissions go">
          <p className="text-[12.5px] leading-relaxed text-[#59636D]">
            Every accepted submission is written to the enquiry inbox and read from there. New-enquiry notifications are sent to
            staff holding <code className="text-[11.5px]">enquiries.manage</code>:
          </p>
          <p className="mt-2 rounded-lg bg-[#F0F1F2] px-3 py-2 text-[12px] text-[#252B31]">{notificationRecipients}</p>
          <p className="mt-2 text-[11.5px] leading-relaxed text-[#89929B]">
            In-app notifications only — no email provider is connected to this deployment.
          </p>
        </Card>
        <Card title="Abuse controls">
          <ul className="space-y-1.5 text-[12px] text-[#59636D]">
            <li>· Server-side rate limit per address</li>
            <li>· Required-field and length validation</li>
            <li>· Area-of-interest allowlist</li>
            <li>· Enquiry type allowlist</li>
            <li>· HTML characters stripped before storage</li>
          </ul>
          <div className="mt-3">
            <NotConfigured
              what="CAPTCHA"
              detail="No CAPTCHA provider is connected. The rate limit and validation are the only automated abuse controls on this deployment."
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
