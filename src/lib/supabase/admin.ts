import "server-only"

import { createClient } from "@supabase/supabase-js"

/**
 * Service-role client. Bypasses RLS — server-side only.
 * Every caller must have already passed an explicit permission check.
 */
export function createSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) throw new Error("Service role credentials are not configured")
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
