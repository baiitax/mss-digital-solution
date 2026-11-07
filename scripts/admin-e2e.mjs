import { chromium } from "playwright"
import fs from "node:fs"

const BASE = process.env.BASE_URL ?? "http://localhost:3100"
const env = Object.fromEntries(
  fs.readFileSync(".qa-credentials", "utf8").split("\n").filter(Boolean).map((line) => line.split("="))
)

const results = []
const record = (step, status, detail) => {
  results.push({ step, status, detail })
  console.log(`${status === "PASS" ? "✓" : "✗"} ${step}${detail ? " — " + detail : ""}`)
}

export async function login(page) {
  await page.goto(`${BASE}/admin`, { waitUntil: "domcontentloaded" })
  if (!new URL(page.url()).pathname.startsWith("/admin/login")) return
  await page.fill("#email", env.QA_EMAIL)
  await page.fill("#password", env.QA_PASSWORD)
  await page.click("button[type=submit]")
  await page.waitForURL((url) => new URL(url).pathname === "/admin", { timeout: 30000 })
}

async function main() {
  const browser = await chromium.launch()
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()

  // 1 — unauthenticated access
  await page.goto(`${BASE}/admin/enquiries`, { waitUntil: "domcontentloaded" })
  record("unauthenticated /admin/enquiries redirects to login", new URL(page.url()).pathname === "/admin/login" ? "PASS" : "FAIL", new URL(page.url()).pathname)

  // 2 — bad credentials rejected
  await page.fill("#email", env.QA_EMAIL)
  await page.fill("#password", "definitely-not-the-password")
  await page.click("button[type=submit]")
  await page.waitForTimeout(1500)
  record("invalid credentials rejected", (await page.locator("text=not accepted").count()) > 0 ? "PASS" : "FAIL")

  // 3 — valid login
  await page.fill("#email", env.QA_EMAIL)
  await page.fill("#password", env.QA_PASSWORD)
  await page.click("button[type=submit]")
  await page.waitForURL((url) => !new URL(url).pathname.startsWith("/admin/login"), { timeout: 30000 })
  await page.goto(`${BASE}/admin`, { waitUntil: "domcontentloaded" })
  record("valid credentials reach dashboard", "PASS")

  // 4 — dashboard reads real data
  await page.waitForTimeout(1200)
  const dashboardText = await page.locator("main").innerText()
  record("dashboard shows database-derived metrics", /published pages/i.test(dashboardText) && /\d/.test(dashboardText) ? "PASS" : "FAIL")

  // 5 — every module page renders without error
  const modules = ["/admin/enquiries", "/admin/pages", "/admin/homepage", "/admin/capabilities", "/admin/projects", "/admin/geo-st4r",
    "/admin/leadership", "/admin/insights", "/admin/media", "/admin/partnerships", "/admin/seo", "/admin/settings",
    "/admin/navigation", "/admin/footer", "/admin/forms", "/admin/redirects", "/admin/users", "/admin/roles", "/admin/audit-logs",
    "/admin/notifications", "/admin/activity", "/admin/system/settings", "/admin/system/health"]
  let moduleFailures = 0
  for (const route of modules) {
    const response = await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" })
    const ok = response?.status() === 200 && !(await page.locator("text=Application error").count())
    if (!ok) { moduleFailures++; console.log(`   ✗ ${route} status ${response?.status()}`) }
  }
  record(`all ${modules.length} admin modules respond 200`, moduleFailures === 0 ? "PASS" : "FAIL", `${moduleFailures} failures`)

  // 6 — enquiry status change persists
  // Seed one enquiry through the real public endpoint first, so the suite does
  // not depend on leftover data (the inbox is empty in a clean handover state).
  await fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.9.9.9" },
    body: JSON.stringify({
      full_name: "Playwright QA [AUTOMATED — SAFE TO DELETE]",
      email: "qa.e2e@mss-digital.test",
      message: "Automated enquiry created by the admin end-to-end suite.",
      enquiry_type: "partnership",
      area_of_interest: "Digital Health Systems",
      country: "Nigeria",
    }),
  })
  await page.goto(`${BASE}/admin/enquiries`, { waitUntil: "domcontentloaded" })
  await page.waitForSelector('table tbody tr a', { timeout: 20000 })
  const firstEnquiry = page.locator('table tbody tr a').first()
  await firstEnquiry.click()
  await page.waitForURL(/\/admin\/enquiries\/[0-9a-f-]{36}/, { timeout: 20000 })
  await page.waitForSelector('textarea[name="body"]', { timeout: 20000 })
  const enquiryUrl = page.url()
  await page.selectOption('select[name="status"]', "in_review")
  await page.locator("form").filter({ has: page.locator('select[name="status"]') }).locator('button[type="submit"]').click()
  await page.waitForTimeout(2500)
  await page.reload({ waitUntil: "domcontentloaded" }); await page.waitForTimeout(1200)
  const statusAfter = await page.locator('select[name="status"]').inputValue()
  record("enquiry status change persists", statusAfter === "in_review" ? "PASS" : "FAIL", statusAfter)

  // 7 — internal note
  await page.goto(enquiryUrl, { waitUntil: "domcontentloaded" })
  await page.waitForSelector('textarea[name="body"]', { timeout: 20000 })
  await page.fill('textarea[name="body"]', "E2E verification note — safe to delete.")
  await page.locator('form:has(textarea[name="body"]) button[type="submit"]').click()
  await page.waitForTimeout(3000)
  await page.reload({ waitUntil: "domcontentloaded" })
  await page.waitForTimeout(1500)
  record("internal note added to enquiry", (await page.locator("text=E2E verification note").count()) > 0 ? "PASS" : "FAIL")

  // 8 — homepage edit persists to public page
  await page.goto(`${BASE}/admin/homepage`, { waitUntil: "domcontentloaded" })
  const heroCard = page.locator("section").filter({ hasText: "hero" }).first()
  const titleInput = heroCard.locator('input[name="title"]').first()
  await titleInput.inputValue()
  const marker = `Building Health\nSystems That Reach\nEvery Community.`
  await titleInput.fill(marker)
  await heroCard.locator('button[type="submit"]').first().click()
  await page.waitForTimeout(2500)
  const home = await browser.newContext().then(async (ctx) => {
    const p = await ctx.newPage()
    await p.goto(`${BASE}/`, { waitUntil: "domcontentloaded" })
    const text = await p.locator("h1").innerText()
    await ctx.close()
    return text
  })
  record("homepage hero renders CMS value on public site", /Every Community/.test(home) ? "PASS" : "FAIL", home.replace(/\n/g, " | "))

  // 9 — create draft via UI, confirm it is not public, publish, confirm it is
  const draftSlug = `/qa-e2e-draft-${Date.now().toString(36)}`
  await page.goto(`${BASE}/admin/pages/new`, { waitUntil: "domcontentloaded" })
  await page.fill('input[name="title"]', "QA E2E Draft Page")
  await page.fill('input[name="slug"]', draftSlug)
  await page.locator('button[type="submit"]:has-text("Create draft")').click()
  await page.waitForURL(/\/admin\/pages\/[0-9a-f-]{36}/, { timeout: 20000 })
  const pageUrl = page.url()
  const draftStatus = (await page.locator("main").innerText()).includes("Draft")
  const draftCtx = await browser.newContext()
  const draftPage = await draftCtx.newPage()
  const draftRes = await draftPage.goto(`${BASE}${draftSlug}`, { waitUntil: "domcontentloaded" })
  await draftCtx.close()
  record("draft page stays private", draftStatus && draftRes.status() === 404 ? "PASS" : "FAIL", `status=${draftStatus} http=${draftRes.status()}`)

  await page.waitForSelector('button:has-text("Publish now")', { timeout: 20000 })
  await page.locator('button:has-text("Publish now")').first().click()
  await page.waitForTimeout(3500)
  await page.reload({ waitUntil: "domcontentloaded" })
  await page.waitForSelector('text=Version history', { timeout: 20000 })
  const versionText = await page.locator("main").innerText()
  const hasVersion = /v1\b/.test(versionText) || /Version\s*1/i.test(versionText)
  const liveRes = await (async () => {
    const ctx = await browser.newContext()
    const lp = await ctx.newPage()
    const res = await lp.goto(`${BASE}${draftSlug}`, { waitUntil: "domcontentloaded" })
    const body = res.ok() ? await lp.locator("h1").innerText() : ""
    await ctx.close()
    return { status: res.status(), body }
  })()
  record(
    "publishing a page writes a version snapshot and goes live",
    versionText.includes("Version history") && hasVersion && liveRes.status === 200 ? "PASS" : "FAIL",
    `${pageUrl} version=${hasVersion} public=${liveRes.status} h1=${liveRes.body}`
  )

  // 9b — insight workflow: draft created in the portal reaches the public site only when published
  const insightTitle = `QA E2E Insight ${Date.now().toString(36)}`
  const insightSlug = insightTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  await page.goto(`${BASE}/admin/insights`, { waitUntil: "domcontentloaded" })
  const createForm = page.locator('form:has(input[name="title"])').last()
  await createForm.locator('input[name="title"]').fill(insightTitle)
  await createForm.locator('input[name="slug"]').fill(insightSlug)
  await createForm.locator('textarea[name="excerpt"]').fill("Verification article written by the automated E2E run.")
  await createForm.locator('button[type="submit"]').click()
  let insightCreated = false
  try {
    await page.waitForURL(/\/admin\/insights\/[0-9a-f-]{36}/, { timeout: 20000 })
    insightCreated = true
  } catch {
    insightCreated = false
  }
  if (insightCreated) {
    await page.waitForSelector('textarea[name="body"]', { timeout: 20000 })
    await page.fill('textarea[name="body"]', "First verification paragraph.\n\nSecond verification paragraph.")
    await page.locator('button:has-text("Save article")').click()
    await page.waitForTimeout(2500)
    for (const step of ["Submit for review", "Approve", "Publish"]) {
      const btn = page.locator(`form button:has-text("${step}")`).first()
      if ((await btn.count()) === 0) continue
      await btn.click()
      await page
        .waitForSelector(`button:has-text("${step} ✓")`, { timeout: 20000 })
        .catch(() => console.log(`  (workflow step "${step}" did not confirm)`))
      await page.waitForTimeout(600)
    }
  }
  const insightCtx = await browser.newContext()
  const ip = await insightCtx.newPage()
  const insightRes = await ip.goto(`${BASE}/insights/${insightSlug}`, { waitUntil: "domcontentloaded" })
  const insightBody = insightRes.ok() ? await ip.locator("h1").innerText().catch(() => "") : ""
  await insightCtx.close()
  const indexCtx = await browser.newContext()
  const xp = await indexCtx.newPage()
  await xp.goto(`${BASE}/insights`, { waitUntil: "domcontentloaded" })
  const indexHasIt = (await xp.locator(`text=${insightTitle}`).count()) > 0
  await indexCtx.close()
  record(
    "insight workflow publishes to the public site",
    insightCreated && insightRes.status() === 200 && indexHasIt ? "PASS" : "FAIL",
    `created=${insightCreated} public=${insightRes.status()} index=${indexHasIt} h1=${insightBody}`
  )

  // 10 — media upload
  await page.goto(`${BASE}/admin/media`, { waitUntil: "domcontentloaded" })
  const pngPath = "/home/user/e2e-asset.png"
  fs.writeFileSync(
    pngPath,
    Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAF0lEQVQoU2NkYGD4z0AEYBxVSF+FAAhKDveksOjmAAAAAElFTkSuQmCC",
      "base64"
    )
  )
  await page.locator('input[type="file"]').setInputFiles(pngPath)
  await page.fill('input[name="alt_text"]', "E2E verification asset")
  await page.locator('form:has(input[type="file"]) button:has-text("Upload")').first().click()
  await page.waitForTimeout(6000)
  const uploaded = (await page.locator('img[alt="E2E verification asset"]').count()) > 0
  record("media upload stores asset and renders preview", uploaded ? "PASS" : "FAIL")

  // 11 — system health check
  await page.goto(`${BASE}/admin/system/health`, { waitUntil: "domcontentloaded" })
  await page.waitForSelector('button:has-text("Run checks")', { timeout: 20000 })
  await page.locator('button:has-text("Run checks")').click()
  await page.waitForTimeout(4000)
  await page.reload({ waitUntil: "domcontentloaded" }); await page.waitForTimeout(1200)
  const healthText = await page.locator("main").innerText()
  record("system health records real service checks", /operational/i.test(healthText) ? "PASS" : "FAIL")

  // 12 — audit trail captured the session
  await page.goto(`${BASE}/admin/audit-logs`, { waitUntil: "domcontentloaded" })
  const auditText = await page.locator("main").innerText()
  record("audit log recorded actions", /auth\.sign_in/.test(auditText) && /enquiry\.status_changed/.test(auditText) ? "PASS" : "FAIL")

  // 13 — mobile admin
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const mp = await mobile.newPage()
  await mp.goto(`${BASE}/admin`, { waitUntil: "domcontentloaded" })
  const needsLogin = new URL(mp.url()).pathname === "/admin/login"
  if (needsLogin) {
    await mp.fill("#email", env.QA_EMAIL)
    await mp.fill("#password", env.QA_PASSWORD)
    await mp.click("button[type=submit]")
    await mp.waitForURL((url) => !new URL(url).pathname.startsWith("/admin/login"), { timeout: 30000 })
  }
  await mp.locator('button[aria-label="Open menu"]').click()
  await mp.waitForTimeout(600)
  const drawerOpen = (await mp.locator('aside a:has-text("Contact Enquiries")').count()) > 0
  const overflow = await mp.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
  record("mobile drawer navigation works without overflow", drawerOpen && !overflow ? "PASS" : "FAIL", `drawer=${drawerOpen} overflow=${overflow}`)
  await mobile.close()

  // 14 — sign out
  await page.goto(`${BASE}/admin`, { waitUntil: "domcontentloaded" })
  await page.locator('button[aria-label="Sign out"]').click()
  await page.waitForURL((url) => new URL(url).pathname === "/admin/login", { timeout: 20000 })
  await page.goto(`${BASE}/admin`, { waitUntil: "domcontentloaded" })
  record("sign out ends session and protects routes", new URL(page.url()).pathname === "/admin/login" ? "PASS" : "FAIL")

  await browser.close()

  const failed = results.filter((r) => r.status === "FAIL")
  fs.writeFileSync("qa-admin.json", JSON.stringify({ results, base: BASE, at: new Date().toISOString() }, null, 2))
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
  process.exit(failed.length ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
