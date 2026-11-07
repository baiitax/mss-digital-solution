import "server-only"

import { redirect } from "next/navigation"
import { getAdminSession, type AdminSession } from "@/lib/auth/session"

/** Redirects to the login screen when the visitor is not an active administrator. */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession()
  if (!session) redirect("/admin/login")
  return session
}

/**
 * Server-side authorisation gate for a module page or server action.
 * Unauthenticated → login. Authenticated but unauthorised → /admin/forbidden.
 */
export async function requirePermission(permission: string): Promise<AdminSession> {
  const session = await requireAdmin()
  if (!session.permissions.includes(permission)) redirect("/admin/forbidden")
  return session
}

/** Same check for server actions, throwing instead of redirecting. */
export async function assertPermission(permission: string): Promise<AdminSession> {
  const session = await getAdminSession()
  if (!session) throw new Error("UNAUTHENTICATED")
  if (!session.permissions.includes(permission)) throw new Error("FORBIDDEN: " + permission)
  return session
}
