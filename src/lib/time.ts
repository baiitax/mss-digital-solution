/**
 * Time helpers kept outside component scope.
 *
 * React's purity rules forbid reading the clock inside a component body, so all
 * "now" reads and relative-time formatting live here and are called from server
 * components (which render once per request) or from event handlers.
 */

export function nowIso(): string {
  return new Date().toISOString()
}

export function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString()
}

export function relativeLabel(iso: string | null, nowMs: number = Date.now()): string {
  if (!iso) return "—"
  const diff = nowMs - new Date(iso).getTime()
  const mins = Math.round(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  if (mins < 1440) return `${Math.round(mins / 60)}h ago`
  return `${Math.round(mins / 1440)}d ago`
}

/** Stable, collision-resistant client-side id for newly added editor blocks. */
export function newBlockId(): string {
  const random = Math.random().toString(36).slice(2, 8)
  return `blk-${Date.now().toString(36)}-${random}`
}

export function dayGreeting(nowMs: number = Date.now()): string {
  const hour = new Date(nowMs).getHours()
  return hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening"
}
