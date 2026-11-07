import { chromium } from "playwright"
import fs from "node:fs"

const BASE = process.env.BASE ?? "http://localhost:3100"
const OUT = "/home/user/mss-digital/screenshots/visual"
fs.mkdirSync(OUT, { recursive: true })

const routes = [
  ["home", "/"],
  ["about", "/about"],
  ["capabilities", "/capabilities"],
  ["digital-health", "/capabilities/digital-health-systems"],
  ["geospatial", "/capabilities/geospatial-intelligence"],
  ["analytics", "/capabilities/data-analytics"],
  ["programme", "/capabilities/programme-management"],
  ["our-work", "/our-work"],
  ["geo-st4r", "/our-work/geo-st4r-kano"],
  ["how-we-work", "/how-we-work"],
  ["leadership", "/leadership"],
  ["insights", "/insights"],
  ["contact", "/contact"],
]

const viewports = [
  [390, 844, "390"],
  [768, 1024, "768"],
  [1440, 900, "1440"],
]

const browser = await chromium.launch()
const report = []

for (const [width, height, tag] of viewports) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: width < 500 ? 2 : 1,
  })
  const page = await ctx.newPage()
  const bad = []
  page.on("response", (r) => {
    const u = r.url()
    if (r.status() >= 400 && /\.(jpg|jpeg|png|webp|avif|svg)/.test(u)) bad.push(`${r.status()} ${u}`)
  })

  for (const [name, route] of routes) {
    await page.goto(BASE + route, { waitUntil: "networkidle" })
    await page.locator("[data-preloader]").first().waitFor({ state: "detached", timeout: 8000 }).catch(() => {})
    // lazy-load everything
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 90))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(500)

    const metrics = await page.evaluate(() => {
      const imgs = [...document.images]
      const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src)
      const noAlt = imgs.filter((i) => !i.hasAttribute("alt")).map((i) => i.currentSrc || i.src)
      return {
        images: imgs.length,
        broken,
        noAlt,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        h1: document.querySelectorAll("h1").length,
      }
    })

    report.push({ tag, name, route, ...metrics, httpErrors: bad.length })
    await page.screenshot({ path: `${OUT}/${name}-${tag}.png`, fullPage: true })
  }
  await ctx.close()
}

await browser.close()
fs.writeFileSync("/home/user/mss-digital/qa-visual.json", JSON.stringify(report, null, 1))
const problems = report.filter((r) => r.broken.length || r.noAlt.length || r.overflow > 1 || r.httpErrors || r.h1 !== 1)
console.log("pages checked:", report.length)
console.log("problems:", problems.length)
for (const p of problems) console.log(JSON.stringify(p))
