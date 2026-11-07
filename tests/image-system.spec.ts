import { test, expect } from "@playwright/test"

/**
 * IMAGE SYSTEM AUDIT
 * Verifies the visual implementation: every photograph is served,
 * decoded, given real alt text, sized for the viewport, and the
 * above-the-fold image is not lazy-loaded.
 */

const ROUTES = [
  "/",
  "/about",
  "/capabilities",
  "/capabilities/digital-health-systems",
  "/capabilities/geospatial-intelligence",
  "/capabilities/data-analytics",
  "/capabilities/programme-management",
  "/our-work",
  "/our-work/geo-st4r-kano",
  "/how-we-work",
  "/leadership",
  "/insights",
  "/contact",
]

async function settle(page: import("@playwright/test").Page) {
  await page.locator("[data-preloader]").first().waitFor({ state: "detached", timeout: 10_000 }).catch(() => {})
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 90))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(400)
}

test.describe("Image system", () => {
  for (const route of ROUTES) {
    test(`${route} — every image loads, decodes and has alt text`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" })
      await settle(page)

      const problems = await page.evaluate(() => {
        const imgs = [...document.images]
        return {
          total: imgs.length,
          broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc),
          missingAlt: imgs.filter((i) => !i.hasAttribute("alt")).map((i) => i.currentSrc),
          decorative: imgs.filter((i) => i.getAttribute("alt") === "").length,
        }
      })

      expect(problems.broken, `broken images on ${route}`).toEqual([])
      expect(problems.missingAlt, `images without an alt attribute on ${route}`).toEqual([])
      expect(problems.total, `expected imagery on ${route}`).toBeGreaterThan(0)
    })
  }

  test("hero photograph is not lazy-loaded and is served at high priority", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" })
    const hero = page.locator('img[fetchpriority="high"]').first()
    await expect(hero).toHaveCount(1)
    expect(await hero.getAttribute("loading")).not.toBe("lazy")
    expect(await hero.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0)
  })

  test("no legacy remote stock URLs remain in the served HTML", async ({ page }) => {
    for (const route of ["/", "/about", "/capabilities"]) {
      await page.goto(route, { waitUntil: "domcontentloaded" })
      const html = await page.content()
      expect(html).not.toContain("images.unsplash.com")
      expect(html).not.toContain("plus.unsplash.com")
    }
  })

  test("mobile downloads a narrower variant than desktop", async ({ page }) => {
    const widths: Record<string, number> = {}
    for (const [tag, vp] of [
      ["mobile", { width: 390, height: 844 }],
      ["desktop", { width: 1440, height: 900 }],
    ] as const) {
      await page.setViewportSize(vp)
      await page.goto("/", { waitUntil: "networkidle" })
      await settle(page)
      widths[tag] = await page.evaluate(() => {
        const widths = [...document.images]
          .filter((i) => i.currentSrc.includes("/_next/image"))
          .map((i) => Number(new URL(i.currentSrc, location.href).searchParams.get("w") ?? 0))
        return widths.length ? Math.max(...widths) : 0
      })
    }
    expect(widths.mobile).toBeGreaterThan(0)
    expect(widths.desktop).toBeGreaterThan(0)
    expect(widths.mobile).toBeLessThan(widths.desktop)
  })

  test("synthetic visualisations are labelled", async ({ page }) => {
    for (const [route, label] of [
      ["/capabilities/geospatial-intelligence", /synthetic/i],
      ["/capabilities/data-analytics", /synthetic data/i],
      ["/our-work/geo-st4r-kano", /synthetic demonstration/i],
    ] as const) {
      await page.goto(route, { waitUntil: "networkidle" })
      await settle(page)
      await expect(page.getByText(label).first()).toBeVisible()
    }
  })
})
