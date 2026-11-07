#!/usr/bin/env node
/**
 * Captures the admin portal module screenshots used in the handover report.
 * Run against a production build: node scripts/admin-screenshots.mjs
 */
import fs from "node:fs"
import { chromium } from "playwright"

const BASE = process.env.E2E_BASE ?? "http://localhost:3100"
const OUT = "screenshots/admin"

function loadEnv(path) {
  const out = {}
  for (const line of fs.readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "")
  }
  return out
}

const env = loadEnv(".qa-credentials")

const MODULES = [
  ["dashboard", "/admin"],
  ["activity", "/admin/activity"],
  ["notifications", "/admin/notifications"],
  ["homepage", "/admin/homepage"],
  ["pages", "/admin/pages"],
  ["navigation", "/admin/navigation"],
  ["capabilities", "/admin/capabilities"],
  ["projects", "/admin/projects"],
  ["geo-st4r", "/admin/geo-st4r"],
  ["leadership", "/admin/leadership"],
  ["insights", "/admin/insights"],
  ["media", "/admin/media"],
  ["enquiries", "/admin/enquiries"],
  ["partnerships", "/admin/partnerships"],
  ["seo", "/admin/seo"],
  ["settings", "/admin/settings"],
  ["footer", "/admin/footer"],
  ["forms", "/admin/forms"],
  ["redirects", "/admin/redirects"],
  ["users", "/admin/users"],
  ["roles", "/admin/roles"],
  ["audit-logs", "/admin/audit-logs"],
  ["system-settings", "/admin/system/settings"],
  ["system-health", "/admin/system/health"],
]

async function main() {
  fs.mkdirSync(OUT, { recursive: true })
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()

  await page.goto(`${BASE}/admin/login`, { waitUntil: "domcontentloaded" })
  await page.screenshot({ path: `${OUT}/login.png`, fullPage: false })

  await page.fill("#email", env.QA_EMAIL)
  await page.fill("#password", env.QA_PASSWORD)
  await page.click("button[type=submit]")
  await page.waitForURL((url) => !new URL(url).pathname.startsWith("/admin/login"), { timeout: 30000 })

  for (const [name, path] of MODULES) {
    await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" })
    await page.waitForTimeout(1800)
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false })
    console.log(`captured ${name}`)
  }

  // One representative detail screen per content type
  const details = [
    ["page-editor", "/admin/pages", 'table tbody tr a'],
    ["enquiry-detail", "/admin/enquiries", 'table tbody tr a'],
  ]
  for (const [name, listPath, linkSelector] of details) {
    await page.goto(`${BASE}${listPath}`, { waitUntil: "domcontentloaded" })
    await page.waitForTimeout(900)
    const link = page.locator(linkSelector).first()
    if (await link.count()) {
      await link.click()
      await page.waitForTimeout(2000)
      await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false })
      console.log(`captured ${name}`)
    }
  }

  // Public site reflecting CMS content
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(1800)
  await page.screenshot({ path: `${OUT}/public-homepage.png`, fullPage: false })

  // Mobile drawer
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const mp = await mobile.newPage()
  await mp.goto(`${BASE}/admin/login`, { waitUntil: "domcontentloaded" })
  await mp.fill("#email", env.QA_EMAIL)
  await mp.fill("#password", env.QA_PASSWORD)
  await mp.click("button[type=submit]")
  await mp.waitForURL((url) => !new URL(url).pathname.startsWith("/admin/login"), { timeout: 30000 })
  await mp.locator('button[aria-label="Open menu"]').click()
  await mp.waitForTimeout(700)
  await mp.screenshot({ path: `${OUT}/mobile-drawer.png` })
  await mp.locator('button[aria-label="Close menu"]').click()
  await mp.waitForTimeout(400)
  await mp.screenshot({ path: `${OUT}/mobile-dashboard.png` })
  console.log("captured mobile")

  await browser.close()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
