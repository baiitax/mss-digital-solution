import { test, expect } from "@playwright/test";

const BASE = "https://mss-digital.vercel.app";

const viewports = [
  { name: "320", width: 320, height: 800 },
  { name: "375", width: 375, height: 812 },
  { name: "390", width: 390, height: 844 },
  { name: "430", width: 430, height: 932 },
];

const routes = [
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
  "/privacy-policy",
  "/terms",
];

const legacyRedirects: Array<[string, string]> = [
  ["/capabilities/digital-health", "/capabilities/digital-health-systems"],
  ["/capabilities/geospatial", "/capabilities/geospatial-intelligence"],
  ["/capabilities/analytics", "/capabilities/data-analytics"],
  ["/projects/geo-st4r", "/our-work/geo-st4r-kano"],
  ["/privacy", "/privacy-policy"],
];

// 1 — Stylesheet is a full Tailwind v4 build carrying the Burgundy tokens
test("prod CSS is a full build with Burgundy design tokens", async ({ request }) => {
  const htmlRes = await request.get(`${BASE}/`);
  expect(htmlRes.status()).toBe(200);
  const html = await htmlRes.text();

  const cssMatch = html.match(/_next\/static\/immutable\/chunks\/[^"')\s]+\.css/);
  expect(cssMatch, "css chunk href in html").toBeTruthy();
  const cssPath = cssMatch![0];

  const cssRes = await request.get(`${BASE}/${cssPath}`);
  expect(cssRes.status()).toBe(200);
  expect(cssRes.headers()["content-type"]).toContain("text/css");

  const css = await cssRes.text();
  console.log(`CSS ${cssPath} size ${css.length}`);

  // A truncated build produced a ~15k head-only sheet previously; a real build is far larger.
  expect(css.length).toBeGreaterThan(50000);
  // responsive utilities only exist in the full scan
  expect(css).toMatch(/sm:/);
  // Burgundy brand token must be present
  expect(css.toLowerCase()).toContain("701f3d");
});

// 2 — Legacy navy/teal direction is gone from the rendered homepage
test("no legacy navy/teal colours in computed styles", async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  const legacyHits = await page.evaluate(() => {
    const legacy = ["rgb(16, 40, 63)", "rgb(10, 29, 48)", "rgb(8, 127, 131)", "rgb(72, 191, 194)"];
    let hits = 0;
    document.querySelectorAll("*").forEach((el) => {
      const cs = getComputedStyle(el);
      for (const v of [cs.backgroundColor, cs.color, cs.borderTopColor]) {
        if (legacy.includes(v)) hits++;
      }
    });
    return hits;
  });
  expect(legacyHits, "legacy navy/teal usages").toBe(0);
});

// 3 — Every canonical route responds 200, has one h1, and the portrait still resolves
test("all canonical routes 200 with a single h1", async ({ request, page }) => {
  for (const route of routes) {
    const res = await request.get(`${BASE}${route}`);
    expect(res.status(), route).toBe(200);
  }

  const portrait = await request.get(`${BASE}/images/leadership/jamil-aliu-galadanci.jpg`);
  expect(portrait.status()).toBe(200);
  expect(portrait.headers()["content-type"]).toMatch(/image\/jpeg/);

  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1"), `${route} h1 count`).toHaveCount(1);
  }
});

// 4 — Retired routes redirect permanently to their canonical destinations
test("legacy routes redirect 308 to canonical routes", async ({ request }) => {
  for (const [from, to] of legacyRedirects) {
    const res = await request.get(`${BASE}${from}`, { maxRedirects: 0 });
    expect(res.status(), from).toBe(308);
    expect(res.headers()["location"], from).toContain(to);
  }
});

// 5 — No broken images, no horizontal overflow, exactly one h1 — per viewport
for (const vp of viewports) {
  test(`viewport ${vp.name} — no overflow, no broken images`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    for (const route of routes) {
      await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(700);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow, `${route} @${vp.name} horizontal overflow`).toBeLessThanOrEqual(2);

      const broken = await page.$$eval(
        "img",
        (imgs) => imgs.filter((i) => (i as HTMLImageElement).complete && (i as HTMLImageElement).naturalWidth < 2).length
      );
      expect(broken, `${route} @${vp.name} broken images`).toBe(0);

      const header = page.locator("header").first();
      await expect(header).toBeVisible();
      const box = await header.boundingBox();
      expect(box!.height).toBeGreaterThan(50);
      expect(box!.height).toBeLessThan(140);
    }
  });
}

// 6 — Mobile drawer: open, capabilities accordion, body scroll lock, backdrop dismiss
test("mobile drawer opens, expands capabilities and dismisses @375", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);

  const toggle = page.locator('button[aria-label="Toggle menu"]').first();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  await toggle.click();
  await page.waitForTimeout(500);
  await expect(toggle).toHaveAttribute("aria-expanded", "true");

  const drawer = page.getByRole("dialog", { name: "Main menu" });
  await expect(drawer).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

  // capabilities accordion exposes the four capability routes
  await page.locator('button[aria-label="Toggle capabilities"]').first().click();
  await page.waitForTimeout(400);
  await expect(drawer.locator('a[href="/capabilities/geospatial-intelligence"]').first()).toBeVisible();

  // touch targets
  const links = drawer.locator("a[href]");
  const count = await links.count();
  for (let i = 0; i < count; i++) {
    const box = await links.nth(i).boundingBox();
    if (box) expect(box.height, `drawer link ${i} height`).toBeGreaterThanOrEqual(44);
  }

  // Escape dismisses the drawer and releases the scroll lock
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

// 7 — Desktop capabilities dropdown
test("desktop capabilities dropdown reveals sublinks", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  await page.getByRole("link", { name: "Capabilities" }).first().hover();
  await page.waitForTimeout(400);
  await expect(page.locator('header a[href="/capabilities/data-analytics"]').first()).toBeVisible();
});

// 8 — Contact form validates, submits and persists through the API
test("contact enquiry validates and submits", async ({ page, request }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${BASE}/contact`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);

  // empty submit → inline validation
  await page.getByRole("button", { name: /Submit Partnership Enquiry/ }).click();
  await expect(page.getByText(/Please complete your name, email address and message/)).toBeVisible();

  // API contract: validation rejection and successful acceptance
  const invalid = await request.post(`${BASE}/api/contact`, { data: { full_name: "", email: "nope", message: "x" } });
  expect(invalid.status()).toBe(400);

  // NOTE: this submission is written to the production enquiries table.
  // It is labelled so administrators can filter and delete it.
  const valid = await request.post(`${BASE}/api/contact`, {
    data: {
      full_name: "Playwright QA [AUTOMATED — SAFE TO DELETE]",
      organisation: "MSS QA",
      email: "qa-playwright@example.org",
      enquiry_type: "partnership",
      area_of_interest: "Data Analytics",
      subject: "[AUTOMATED QA — SAFE TO DELETE]",
      message: "Automated end-to-end check of the enquiry endpoint; safe to discard.",
    },
  });
  expect(valid.status()).toBe(200);
});
