import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/auth/session"
import { LoginForm } from "./LoginForm"
import { Logo } from "@/components/brand/Logo"

export const metadata: Metadata = {
  title: "Administrator sign in",
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
        <div>
          <Logo tone="dark" height={44} priority className="h-11 w-auto" />
          <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/50">Administration Portal</p>
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
