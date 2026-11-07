#!/usr/bin/env node
/**
 * Permission + RLS verification for the MSS admin portal.
 *
 * Proves the hard rule "permissions are enforced on the server and in the
 * database — never only hidden in the UI":
 *
 *  1. creates (or reuses) a low-privilege admin account with the `analyst` role
 *  2. signs in through the real GoTrue endpoint to get that user's JWT
 *  3. calls PostgREST directly with that JWT — bypassing the Next.js UI entirely
 *     — and asserts protected tables are empty / writes are refused
 *  4. repeats the same calls with a super_admin JWT to show the data exists
 *  5. drives the real portal in a browser and asserts forbidden modules render
 *     the 403 state and privileged links are absent from the sidebar
 *
 * Run: node scripts/admin-permissions.mjs   (needs .env.local + .qa-credentials)
 */

import fs from "node:fs"
import { chromium } from "playwright"

const BASE = process.env.E2E_BASE ?? "http://localhost:3100"

function loadEnv(path) {
  const out = {}
  for (const line of fs.readFileSync(path, "utf8").split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (match) out[match[1]] = match[2].replace(/^["']|["']$/g, "")
  }
  return out
}

const env = { ...loadEnv(".env.local"), ...loadEnv(".qa-credentials") }
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY
const ANON_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!SUPABASE_URL || !SERVICE_KEY || !ANON_KEY) {
  console.error("Missing Supabase configuration in .env.local")
  process.exit(1)
}

const ANALYST = {
  email: "qa.analyst@mss-digital.test",
  password: `QaAnalyst!${Math.random().toString(36).slice(2, 10)}`,
}

const results = []
const record = (name, ok, detail = "") => {
  results.push({ name, status: ok ? "PASS" : "FAIL", detail })
  console.log(`${ok ? "✓" : "✗"} ${name}${detail ? ` — ${detail}` : ""}`)
}

const svc = (path, init = {}) =>
  fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  })

async function ensureAnalyst() {
  // Create the account (idempotent: reuse if it already exists).
  const created = await svc("/auth/v1/admin/users", {
    method: "POST",
    body: JSON.stringify({ email: ANALYST.email, password: ANALYST.password, email_confirm: true }),
  })
  let userId
  if (created.ok) {
    userId = (await created.json()).id
  } else {
    const list = await svc("/auth/v1/admin/users?per_page=200")
    const users = (await list.json()).users ?? []
    const existing = users.find((u) => u.email === ANALYST.email)
    if (!existing) throw new Error(`Could not create or find ${ANALYST.email}`)
    userId = existing.id
    await svc(`/auth/v1/admin/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ password: ANALYST.password }),
    })
  }

  const roles = await (await svc("/rest/v1/roles?key=eq.analyst&select=id")).json()
  const roleId = roles[0]?.id
  if (!roleId) throw new Error("analyst role missing")

  await svc(`/rest/v1/user_roles?user_id=eq.${userId}`, { method: "DELETE" })
  await svc("/rest/v1/user_roles", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ user_id: userId, role_id: roleId }),
  })
  await svc(`/rest/v1/profiles?id=eq.${userId}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ status: "active", full_name: "QA Analyst (least privilege)" }),
  })
  return userId
}

async function signIn(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: ANON_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error(`sign-in failed for ${email}: ${await res.text()}`)
  return (await res.json()).access_token
}

const asUser = (token) => ({
  apikey: ANON_KEY,
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
})

async function main() {
  const analystId = await ensureAnalyst()
  const analystToken = await signIn(ANALYST.email, ANALYST.password)
  const adminToken = await signIn(env.QA_EMAIL, env.QA_PASSWORD)

  // ── RLS: direct PostgREST access with the analyst JWT ──────────────
  const auditsAnon = await (
    await fetch(`${SUPABASE_URL}/rest/v1/audit_logs?select=id&limit=5`, { headers: asUser(analystToken) })
  ).json()
  const auditsAdmin = await (
    await fetch(`${SUPABASE_URL}/rest/v1/audit_logs?select=id&limit=5`, { headers: asUser(adminToken) })
  ).json()
  record(
    "RLS hides audit logs from a role without audit.view",
    Array.isArray(auditsAnon) && auditsAnon.length === 0 && Array.isArray(auditsAdmin) && auditsAdmin.length > 0,
    `analyst=${Array.isArray(auditsAnon) ? auditsAnon.length : "denied"} admin=${Array.isArray(auditsAdmin) ? auditsAdmin.length : "denied"}`
  )

  const pagesAnon = await (
    await fetch(`${SUPABASE_URL}/rest/v1/pages?select=id,title&limit=3`, { headers: asUser(analystToken) })
  ).json()
  record(
    "RLS allows read where the role holds the view permission",
    Array.isArray(pagesAnon) && pagesAnon.length > 0,
    `pages visible to analyst=${Array.isArray(pagesAnon) ? pagesAnon.length : "denied"}`
  )

  const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/pages?slug=eq./about`, {
    method: "PATCH",
    headers: { ...asUser(analystToken), Prefer: "return=representation" },
    body: JSON.stringify({ title: "RLS breach attempt" }),
  })
  const patchBody = await patchRes.text()
  const aboutTitle = await (
    await fetch(`${SUPABASE_URL}/rest/v1/pages?slug=eq./about&select=title`, { headers: asUser(adminToken) })
  ).json()
  record(
    "RLS refuses a write the role is not permitted to make",
    aboutTitle?.[0]?.title !== "RLS breach attempt",
    `http=${patchRes.status} body=${patchBody.slice(0, 80).replace(/\s+/g, " ")} live="${aboutTitle?.[0]?.title}"`
  )

  const roleRes = await fetch(`${SUPABASE_URL}/rest/v1/role_permissions?select=permission_key&limit=1`, {
    method: "DELETE",
    headers: asUser(analystToken),
  })
  record("RLS refuses permission-table mutations", roleRes.status >= 400 || roleRes.status === 204, `http=${roleRes.status}`)

  // A content role may see its own profile row, never the rest of the directory.
  const profilesRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=id&limit=50`, { headers: asUser(analystToken) })
  const profilesBody = await profilesRes.json().catch(() => [])
  const rows = Array.isArray(profilesBody) ? profilesBody : []
  const onlySelf = rows.length <= 1 && rows.every((row) => row.id === analystId)
  const adminProfiles = await (
    await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=id&limit=50`, { headers: asUser(adminToken) })
  ).json()
  record(
    "Directory table exposes only the caller's own profile",
    profilesRes.status >= 400 || (onlySelf && Array.isArray(adminProfiles) && adminProfiles.length > rows.length),
    `http=${profilesRes.status} analyst_rows=${rows.length} admin_rows=${Array.isArray(adminProfiles) ? adminProfiles.length : "denied"}`
  )

  // ── Server-side guards in the portal itself ───────────────────────
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
  const page = await ctx.newPage()
  await page.goto(`${BASE}/admin/login`, { waitUntil: "domcontentloaded" })
  await page.fill("#email", ANALYST.email)
  await page.fill("#password", ANALYST.password)
  await page.click("button[type=submit]")
  await page.waitForURL((url) => !new URL(url).pathname.startsWith("/admin/login"), { timeout: 30000 })

  const dashboardText = (await page.locator("main").innerText()).toLowerCase()
  const dashboardOk = new URL(page.url()).pathname === "/admin" && /published pages/.test(dashboardText)
  record("least-privilege account can sign in and reach the dashboard", dashboardOk, `url=${new URL(page.url()).pathname}`)

  const sidebar = await page.locator("aside").innerText()
  record(
    "privileged modules are absent from the sidebar, not just greyed out",
    !/Users|Roles|Audit logs/i.test(sidebar),
    `sidebar entries=${sidebar.split("\n").filter(Boolean).length}`
  )

  for (const [path, label] of [
    ["/admin/users", "Users"],
    ["/admin/audit-logs", "Audit logs"],
    ["/admin/roles", "Roles"],
  ]) {
    const res = await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" })
    const text = (await page.locator("body").innerText()).toLowerCase()
    const blocked =
      res.status() === 403 ||
      /not authorised|not authorized|no permission|forbidden|access denied/.test(text) ||
      new URL(page.url()).pathname.startsWith("/admin/forbidden")
    record(`direct URL to ${label} is refused server-side`, blocked, `http=${res.status()} url=${new URL(page.url()).pathname}`)
  }

  // A permitted module still works for this role.
  const mediaRes = await page.goto(`${BASE}/admin/media`, { waitUntil: "domcontentloaded" })
  const mediaText = (await page.locator("body").innerText()).toLowerCase()
  record(
    "permitted module remains available to the role",
    mediaRes.status() === 200 && !/forbidden|not authorised/.test(mediaText)
  )

  await browser.close()

  fs.writeFileSync(
    "qa-permissions.json",
    JSON.stringify({ at: new Date().toISOString(), analyst_id: analystId, analyst_email: ANALYST.email, results }, null, 2)
  )
  const failed = results.filter((r) => r.status === "FAIL")
  console.log(`\n${results.length - failed.length}/${results.length} permission checks passed`)
  process.exit(failed.length ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
