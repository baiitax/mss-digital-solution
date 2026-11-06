import { test, expect } from "@playwright/test";

// Fast smoke test for the burgundy mobile drawer (run before the full audit).
test("drawer opens and closes @375", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);

  const toggle = page.getByRole("button", { name: /(open|close) menu/i }).first();
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  await toggle.click();
  await page.waitForTimeout(500);
  await expect(toggle).toHaveAttribute("aria-expanded", "true");

  const drawer = page.getByRole("dialog", { name: "Main menu" });
  await expect(drawer).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

  await page.screenshot({ path: "screenshots/final/375_drawer.png" });

  // Escape closes the drawer
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");

  // X control closes it too
  await toggle.click();
  await page.waitForTimeout(400);
  await expect(drawer).toBeVisible();
  await toggle.click();
  await page.waitForTimeout(400);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});
