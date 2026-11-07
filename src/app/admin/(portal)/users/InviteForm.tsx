"use client"

import { useActionState } from "react"
import { Field, Select, SubmitButton, TextInput } from "@/components/admin/form"
import { inviteUser, type InviteState } from "@/app/admin/actions/system"

export function InviteForm({ roles }: { roles: { id: string; name: string }[] }) {
  const [state, action] = useActionState(inviteUser, {} as InviteState)

  return (
    <form action={action} className="space-y-3">
      <Field label="Full name"><TextInput name="full_name" required /></Field>
      <Field label="Email address"><TextInput name="email" type="email" required /></Field>
      <Field label="Job title"><TextInput name="job_title" /></Field>
      <Field label="Role">
        <Select name="role_id" options={roles.map((r) => ({ value: r.id, label: r.name }))} />
      </Field>
      {state.error && <p className="rounded-lg border border-[#8F2D2D]/25 bg-[#FBEAEA] px-3 py-2 text-[12px] text-[#8F2D2D]">{state.error}</p>}
      <SubmitButton className="w-full justify-center">Create invitation</SubmitButton>

      {state.email && (
        <div className="rounded-lg border border-[#2F6B4F]/25 bg-[#EAF3EE] p-3 text-[12px] text-[#2F6B4F]">
          <p className="font-semibold">Account created for {state.email}</p>
          {state.inviteLink ? (
            <>
              <p className="mt-1 leading-relaxed">Send this one-time sign-in link to the administrator through a secure channel. It expires automatically.</p>
              <textarea readOnly value={state.inviteLink} rows={3} className="mt-2 w-full rounded border border-[#2F6B4F]/20 bg-white p-2 font-mono text-[10.5px] text-[#252B31]" />
            </>
          ) : (
            <p className="mt-1 leading-relaxed">No sign-in link could be generated. Ask the administrator to use “Forgot password” on the login screen.</p>
          )}
        </div>
      )}
    </form>
  )
}
