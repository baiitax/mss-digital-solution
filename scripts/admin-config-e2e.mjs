#!/usr/bin/env node
/**
 * End-to-end verification for the runtime configuration modules:
 *   /admin/forms            → changes the public enquiry API's behaviour
 *   /admin/system/settings  → maintenance notice appears/disappears on the site
 *
 * Run against a production build: node scripts/admin-config-e2e.mjs
 */
import fs from "node:fs"
import { chromium } from "playwright"

const BASE = process.env.E2E_BASE ?? "http://localhost:3100"

function loadEnv(path) {
  const out = {}
  for (const line of fs.readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "")
  }
  return out
}

const env = loadEnv(".qa-credentials")
const results = []
const record = (name, ok, detail = "") => {
  results.push({ name, status: ok ? "PASS" : "FAIL", detail })
  console.log(`${ok ? "✓" : "✗"} ${name}${detail ? ` — ${detail}` : ""}`)
}

const submit = (type) =>
  fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": `10.0.0.${Math.floor(Math.random() * 200) + 20}` },
    body: JSON.stringify({
      full_name: "Config QA [AUTOMATED — SAFE TO DELETE]",
      email: "qa.config@mss-digital.test",
      message: "Automated verification submission for form settings.",
      enquiry_type: type,
      area_of_interest: "General Enquiry",
      country: "Nigeria",
    }),
  })

async function main() {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 } })
  const page = await ctx.newPage()

  await page.goto(`${BASE}/admin/login`, { waitUntil: "domcontentloaded" })
  await page.fill("#email", env.QA_EMAIL)
  await page.fill("#password", env.QA_PASSWORD)
  await page.click("button[type=submit]")
  await page.waitForURL((url) => !new URL(url).pathname.startsWith("/admin/login"), { timeout: 30000 })

  // ── Forms module ───────────────────────────────────────────────
  const formsRes = await page.goto(`${BASE}/admin/forms`, { waitUntil: "domcontentloaded" })
  record("forms module renders", formsRes.status() === 200, `http=${formsRes.status()}`)

  const generalBefore = await submit("general")
  record("general enquiry accepted by default", generalBefore.status === 200, `http=${generalBefore.status}`)

  await page.goto(`${BASE}/admin/forms`, { waitUntil: "domcontentloaded" })
  await page.waitForSelector('input[name="type_general"]')
  await page.uncheck('input[name="type_general"]')
  await page.locator('form button[type="submit"]:has-text("Save form settings")').click()
  await page.waitForTimeout(2500)
  const savedMsg = await page.locator("main").innerText()

  const generalAfter = await submit("general")
  const partnershipAfter = await submit("partnership")
  record(
    "disabling a type in the portal is enforced by the API",
    /Saved/.test(savedMsg) && generalAfter.status === 400 && partnershipAfter.status === 200,
    `general=${generalAfter.status} partnership=${partnershipAfter.status}`
  )

  // restore
  await page.goto(`${BASE}/admin/forms`, { waitUntil: "domcontentloaded" })
  await page.waitForSelector('input[name="type_general"]')
  await page.check('input[name="type_general"]')
  await page.locator('form button[type="submit"]:has-text("Save form settings")').click()
  await page.waitForTimeout(2500)
  const restored = await submit("general")
  record("re-enabling a type restores intake without a redeploy", restored.status === 200, `http=${restored.status}`)

  // ── System settings: maintenance notice ────────────────────────
  const sysRes = await page.goto(`${BASE}/admin/system/settings`, { waitUntil: "domcontentloaded" })
  record("system settings module renders", sysRes.status() === 200, `http=${sysRes.status()}`)

  const publicPage = await ctx.newPage()
  await publicPage.goto(`${BASE}/`, { waitUntil: "domcontentloaded" })
  const beforeText = await publicPage.locator("body").innerText()

  await page.goto(`${BASE}/admin/system/settings`, { waitUntil: "domcontentloaded" })
  await page.waitForSelector('input[name="maintenance_mode"]')
  await page.fill('textarea[name="maintenance_message"]', "Scheduled maintenance — verification window.")
  await page.check('input[name="maintenance_mode"]')
  // First save without the confirmation box must be refused.
  await page.locator('form button[type="submit"]:has-text("Save platform settings")').click()
  await page.waitForTimeout(2000)
  const refused = await page.locator("main").innerText()

  await page.check('input[name="confirm_maintenance"]')
  await page.locator('form button[type="submit"]:has-text("Save platform settings")').click()
  await page.waitForTimeout(2500)

  await publicPage.goto(`${BASE}/`, { waitUntil: "domcontentloaded" })
  await publicPage.waitForTimeout(800)
  const afterText = await publicPage.locator("body").innerText()
  record(
    "maintenance notice is published to the public site",
    /confirmation box/i.test(refused) && !/Scheduled maintenance/.test(beforeText) && /Scheduled maintenance/.test(afterText),
    `guarded=${/confirmation box/i.test(refused)}`
  )

  // turn it back off, which is the state it must be handed over in
  await page.goto(`${BASE}/admin/system/settings`, { waitUntil: "domcontentloaded" })
  await page.waitForSelector('input[name="maintenance_mode"]')
  await page.uncheck('input[name="maintenance_mode"]')
  await page.locator('form button[type="submit"]:has-text("Save platform settings")').click()
  await page.waitForTimeout(2500)
  await publicPage.goto(`${BASE}/`, { waitUntil: "domcontentloaded" })
  await publicPage.waitForTimeout(800)
  const clearedText = await publicPage.locator("body").innerText()
  record("maintenance notice is removed when switched off", !/Scheduled maintenance/.test(clearedText))

  // purge guard
  await page.goto(`${BASE}/admin/system/settings`, { waitUntil: "domcontentloaded" })
  await page.fill('input[name="confirm"]', "nope")
  await page.locator('button:has-text("Purge archived enquiries")').click()
  await page.waitForTimeout(2000)
  const purgeGuard = await page.locator("main").innerText()
  record("destructive purge requires the typed confirmation", /Type PURGE to confirm/i.test(purgeGuard))

  await browser.close()

  fs.writeFileSync("qa-config.json", JSON.stringify({ at: new Date().toISOString(), results }, null, 2))
  const failed = results.filter((r) => r.status === "FAIL")
  console.log(`\n${results.length - failed.length}/${results.length} configuration checks passed`)
  process.exit(failed.length ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
