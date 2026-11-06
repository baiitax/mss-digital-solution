"use client"

import { useEffect, useState } from "react"

/**
 * Site preloader — a Burgundy curtain with the animated MSS mark.
 *
 * Behaviour
 * - Rendered in the server HTML, so it paints before any content is visible.
 * - Holds for a minimum of ~900 ms (so the animation reads as intentional
 *   rather than as a flicker), then fades out once the page has loaded.
 * - Hard ceiling of 3.5 s: a slow image can never trap a visitor behind it.
 * - Body scroll is locked while visible and released on exit.
 * - `prefers-reduced-motion` shortens the hold and the animation.
 * - Only runs on a full page load; client-side route changes do not re-trigger it.
 */
export function Preloader() {
  const [leaving, setLeaving] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const minHold = reduce ? 350 : 900
    const fade = reduce ? 200 : 520
    const started = performance.now()
    let hideTimer: ReturnType<typeof setTimeout>
    let removeTimer: ReturnType<typeof setTimeout>

    document.body.style.overflow = "hidden"

    const finish = () => {
      const elapsed = performance.now() - started
      const wait = Math.max(0, minHold - elapsed)
      hideTimer = setTimeout(() => {
        setLeaving(true)
        document.body.style.overflow = ""
        removeTimer = setTimeout(() => setDone(true), fade + 60)
      }, wait)
    }

    // Already loaded (warm cache / bfcache): leave as soon as the hold elapses.
    if (document.readyState === "complete") {
      finish()
    } else {
      window.addEventListener("load", finish, { once: true })
    }

    // Safety net — never let the curtain outstay its welcome.
    const ceiling = setTimeout(finish, 3500)

    return () => {
      window.removeEventListener("load", finish)
      clearTimeout(hideTimer)
      clearTimeout(removeTimer)
      clearTimeout(ceiling)
      document.body.style.overflow = ""
    }
  }, [])

  if (done) return null

  return (
    <div
      className="mss-preloader"
      data-preloader=""
      data-leaving={leaving}
      role="status"
      aria-live="polite"
      aria-label="Loading MSS Digital Solutions"
      aria-hidden={leaving}
    >
      <div className="mss-preloader__grid" aria-hidden="true" />
      <div className="mss-preloader__inner">
        <div className="mss-preloader__mark" aria-hidden="true">
          <span>MSS</span>
        </div>
        <div className="mss-preloader__word">MSS Digital Solutions</div>
        <div className="mss-preloader__sub">Digital Health · Geospatial Intelligence</div>
        <div className="mss-preloader__bar" aria-hidden="true">
          <i />
        </div>
        <span className="sr-only">Loading, please wait.</span>
      </div>
    </div>
  )
}
