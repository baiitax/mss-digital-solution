import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

/**
 * Refreshes the Supabase session cookie on every request and gates /admin.
 * The admin layout performs the authoritative permission checks; this is the
 * first line of defence and keeps unauthenticated visitors out of the portal.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return response

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname, search } = request.nextUrl
  const isAdminArea = pathname.startsWith("/admin")
  const isPublicAdminRoute = pathname === "/admin/login" || pathname === "/admin/forbidden"

  if (isAdminArea && !isPublicAdminRoute && !user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = "/admin/login"
    redirectUrl.search = ""
    redirectUrl.searchParams.set("next", pathname + search)
    return NextResponse.redirect(redirectUrl)
  }

  if (pathname === "/admin/login" && user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = "/admin"
    redirectUrl.search = ""
    return NextResponse.redirect(redirectUrl)
  }

  return response
}
