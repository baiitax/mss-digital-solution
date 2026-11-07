import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

/**
 * Current public site notice state.
 *
 * The public routes are statically rendered with a revalidation window, so the
 * notice cannot be baked into the HTML — it is fetched by the client on mount.
 * Only the public `site_status` row is read here; no internal data is exposed.
 */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.json({ maintenance_mode: false, message: null })

  try {
    const res = await fetch(`${url}/rest/v1/site_settings?select=value&key=eq.site_status`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    })
    if (!res.ok) return NextResponse.json({ maintenance_mode: false, message: null })
    const rows = (await res.json()) as { value?: { maintenance_mode?: boolean; message?: string } }[]
    const value = rows?.[0]?.value ?? {}
    return NextResponse.json({
      maintenance_mode: value.maintenance_mode === true,
      message: typeof value.message === "string" && value.message.trim() ? value.message : null,
    })
  } catch {
    return NextResponse.json({ maintenance_mode: false, message: null })
  }
}
