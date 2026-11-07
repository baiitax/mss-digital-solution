import "server-only"

import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

/**
 * Request-scoped Supabase client bound to the admin session cookies.
 * Row Level Security applies — this client can never exceed the signed-in user's grants.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error("Supabase is not configured")

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Called from a Server Component render — middleware refreshes the session instead.
        }
      },
    },
  })
}
