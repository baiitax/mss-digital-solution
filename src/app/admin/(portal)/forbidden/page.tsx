import Link from "next/link"
import { requireAdmin } from "@/lib/auth/guards"
import { firstAllowedPath } from "@/lib/admin/nav"

export default async function ForbiddenPage() {
  const session = await requireAdmin()
  const home = firstAllowedPath(session.permissions)
  return (
    <div className="mx-auto max-w-lg rounded-xl border border-[#E3E6E8] bg-white p-8 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#701F3D]">403 · Not permitted</p>
      <h1 className="mt-2 text-[20px] font-bold text-[#252B31]">Your role cannot open this module</h1>
      <p className="mt-2 text-[13px] leading-relaxed text-[#59636D]">
        Access is enforced on the server and in the database, not by hiding links. If you need this module, ask a Super
        Administrator to adjust your role.
      </p>
      <p className="mt-4 text-[12px] text-[#89929B]">Signed in as {session.email} · {session.roles.map((r) => r.name).join(", ")}</p>
      <Link href={home} className="mt-5 inline-flex rounded-lg bg-[#701F3D] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#50152D]">
        Back to an accessible module
      </Link>
    </div>
  )
}
