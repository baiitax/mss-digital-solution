import { test, expect } from "@playwright/test"

/**
 * Navigation + preloader + About-page IA checks.
 * Runs against the deployed site (see playwright.config.ts baseURL).
 */

test.describe("Fixed header", () => {
  test("header stays pinned to the top while scrolling (mobile, tablet, desktop)", async ({ page }) => {
    for (const viewport of [
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ]) {
      await page.setViewportSize(viewport)
      await page.goto("/", { waitUntil: "networkidle" })

      // Dismiss the preloader if it is still on screen.
      await expect(page.locator("[data-preloader]")).toHaveCount(0, { timeout: 10_000 })

      await page.evaluate(() => window.scrollTo(0, 1400))
      await page.waitForTimeout(400)

      const header = page.locator("header").first()
      const box = await header.boundingBox()
      expect(box, "header should be present").not.toBeNull()
      expect(Math.round(box!.y)).toBe(0)
      await expect(header).toBeVisible()
      expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(400)
    }
  })

  test("no horizontal overflow at any breakpoint", async ({ page }) => {
    for (const width of [375, 390, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto("/", { waitUntil: "networkidle" })
      await expect(page.locator("[data-preloader]")).toHaveCount(0, { timeout: 10_000 })
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      )
      expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(1)
    }
  })

  test("mobile nav is usable and every link is at least 44px tall", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/", { waitUntil: "networkidle" })
    await expect(page.locator("[data-preloader]")).toHaveCount(0, { timeout: 10_000 })

    await page.getByRole("button", { name: /open menu/i }).click()
    const dialog = page.locator("#mobile-menu")
    await expect(dialog).toBeVisible()

    const links = dialog.locator("a")
    const count = await links.count()
    expect(count).toBeGreaterThan(6)
    for (let i = 0; i < count; i++) {
      const box = await links.nth(i).boundingBox()
      if (box) expect(box.height, `tap target ${i}`).toBeGreaterThanOrEqual(44)
    }

    // Capabilities accordion expands in place.
    await dialog.getByRole("button", { name: /capabilities/i }).click()
    await expect(dialog.getByRole("link", { name: /geospatial intelligence/i })).toBeVisible()

    await page.keyboard.press("Escape")
    await expect(dialog).toHaveCount(0)
  })
})

test.describe("Preloader", () => {
  test("covers the first paint, then removes itself and releases scrolling", async ({ page }) => {
    await page.goto("/", { waitUntil: "commit" })

    // The curtain is part of the server-rendered HTML, so it is in the DOM immediately.
    await expect(page.locator("[data-preloader]")).toHaveCount(1)

    // It must not trap the visitor.
    await expect(page.locator("[data-preloader]")).toHaveCount(0, { timeout: 10_000 })
    await expect(page.locator("h1").first()).toBeVisible()

    const bodyOverflow = await page.evaluate(() => getComputedStyle(document.body).overflow)
    expect(bodyOverflow).not.toBe("hidden")
  })

  test("does not reappear on client-side navigation", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })
    await expect(page.locator("[data-preloader]")).toHaveCount(0, { timeout: 10_000 })

    await page.getByRole("link", { name: "About", exact: true }).first().click()
    await page.waitForURL("**/about")
    await page.waitForTimeout(600)
    await expect(page.locator("[data-preloader]")).toHaveCount(0)
  })
})

test.describe("About page information architecture", () => {
  test("carries Our Team and Leadership and the homepage no longer has Leadership", async ({ page }) => {
    await page.goto("/about", { waitUntil: "networkidle" })
    await expect(page.locator("[data-preloader]")).toHaveCount(0, { timeout: 10_000 })

    await expect(page.getByRole("heading", { name: /one practice, four disciplines/i })).toBeVisible()
    await expect(page.getByText("Our Team", { exact: true }).first()).toBeVisible()
    await expect(
      page.getByRole("heading", { name: /leadership grounded in technology and public health/i })
    ).toBeVisible()
    await expect(page.getByText(/verified team profiles — admin-configurable/i)).toBeVisible()

    // Single h1 per page still holds.
    await expect(page.locator("h1")).toHaveCount(1)

    await page.goto("/", { waitUntil: "networkidle" })
    await expect(page.locator("[data-preloader]")).toHaveCount(0, { timeout: 10_000 })
    await expect(
      page.getByRole("heading", { name: /leadership grounded in technology and public health/i })
    ).toHaveCount(0)
    // Homepage is a six-section gateway.
    expect(await page.locator("main > section").count()).toBe(6)
  })
})
