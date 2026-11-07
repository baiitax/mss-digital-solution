#!/usr/bin/env node
/**
 * Removes the content created by the automated QA runs (Playwright E2E and the
 * permission suite) so the portal is handed over in a clean state.
 *
 * Deliberately NOT removed:
 *  - audit_logs      append-only by design; deleting would break the trail
 *  - system_health_checks  genuine recorded checks
 *  - page_versions   snapshots of published pages (delete only for QA pages)
 */
import fs from "node:fs"

const env = {}
for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "")
}
const url = env.NEXT_PUBLIC_SUPABASE_URL
const key = env.SUPABASE_SERVICE_ROLE_KEY
const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=representation" }

const del = async (table, query) => {
  const res = await fetch(`${url}/rest/v1/${table}?${query}`, { method: "DELETE", headers })
  const text = await res.text()
  let count = 0
  try {
    count = JSON.parse(text).length
  } catch {
    count = 0
  }
  console.log(`${res.ok ? "removed" : "FAILED "} ${table} ${query} -> ${res.status} ${res.ok ? count : text.slice(0, 120)}`)
}

const run = async () => {
  // QA article/page ids first (children reference them)
  const pages = await (await fetch(`${url}/rest/v1/pages?select=id&slug=like./qa-e2e*`, { headers })).json()
  for (const p of pages) await del("page_versions", `page_id=eq.${p.id}`)
  await del("pages", "slug=like./qa-e2e*")

  await del("insights", "slug=like.qa-e2e*")
  await del("record_notes", "body=like.E2E verification note*")
  await del("contact_enquiries", "full_name=like.Playwright QA*")
  await del("contact_enquiries", "full_name=like.Config QA*")

  // Uploaded test assets + their storage objects
  const media = await (await fetch(`${url}/rest/v1/media_assets?select=id,path&alt_text=eq.E2E verification asset`, { headers })).json()
  const paths = media.map((m) => m.path)
  if (paths.length) {
    await fetch(`${url}/storage/v1/object/website-media`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({ prefixes: paths }),
    }).then(async (r) => console.log(`storage delete -> ${r.status}`))
  }
  await del("media_assets", "alt_text=eq.E2E verification asset")
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
