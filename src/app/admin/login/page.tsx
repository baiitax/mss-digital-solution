import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/auth/session"
import { LoginForm } from "./LoginForm"

export const metadata: Metadata = {
  title: "Administrator sign in — MSS Digital Solutions",
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const session = await getAdminSession()
  if (session) redirect("/admin")
  const { next } = await searchParams

  return (
    <main className="min-h-screen bg-[#343D46] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center font-bold text-[#50152D] tracking-tight">MSS</div>
          <div>
            <p className="text-white font-semibold leading-tight">Administration Portal</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">MSS Digital Solutions Ltd</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <h1 className="text-[22px] font-bold tracking-tight text-[#252B31]">Sign in</h1>
          <p className="mt-1.5 text-sm text-[#59636D]">
            Authorised personnel only. Access is role-based and every action is recorded in the audit log.
          </p>
          <LoginForm next={next ?? "/admin"} />
        </div>

        <p className="mt-5 text-center text-xs text-white/45">
          Accounts are issued by invitation. Public registration is disabled.
        </p>
      </div>
    </main>
  )
}
