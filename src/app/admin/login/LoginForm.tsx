"use client"

import { useActionState } from "react"
import { Loader2, LockKeyhole } from "lucide-react"
import { signInAction, type LoginState } from "@/app/admin/actions/auth"

const initial: LoginState = {}

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(signInAction, initial)

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#59636D]">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="mt-1.5 h-11 w-full rounded-lg border border-[#DDE1E4] px-3 text-sm text-[#252B31] outline-none focus:border-[#701F3D] focus:ring-2 focus:ring-[#701F3D]/15"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#59636D]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1.5 h-11 w-full rounded-lg border border-[#DDE1E4] px-3 text-sm text-[#252B31] outline-none focus:border-[#701F3D] focus:ring-2 focus:ring-[#701F3D]/15"
        />
      </div>

      {state.error && (
        <p role="alert" className="rounded-lg border border-[#701F3D]/25 bg-[#F9E9EE] px-3 py-2 text-[13px] text-[#701F3D]">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#701F3D] text-sm font-semibold text-white transition-colors hover:bg-[#50152D] disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
        {pending ? "Signing in…" : "Sign in to portal"}
      </button>
    </form>
  )
}
