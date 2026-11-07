import Image from "next/image"

/**
 * The MSS Digital Solutions logo, in the two tones the site actually needs.
 *
 * Source artwork: the supplied master logo (`public/brand/logo-full.png`), with
 * the white surround removed so it sits on any background. `logo-full-on-dark`
 * is the same artwork with the charcoal wordmark reversed to white and the
 * burgundy reversed to the site's dark-background accent, because the dark
 * wordmark and burgundy pin are unreadable on the storm/near-black sections.
 *
 * Sizes are given as a height; the width follows the artwork's aspect ratio
 * (1083 × 408 for the lockup, 354 × 408 for the emblem) so the mark never
 * distorts.
 *
 * Pass a `className` (e.g. `h-10 lg:h-12 w-auto`) when the size has to respond
 * to a breakpoint. The inline height is only a fallback: inline styles beat
 * utility classes, so setting both would make the responsive class a no-op.
 */

const LOCKUP_ASPECT = 1083 / 408
const MARK_ASPECT = 354 / 408

const LOCKUP_SRC = {
  light: "/brand/logo-full.png",
  dark: "/brand/logo-full-on-dark.png",
} as const

export function Logo({
  tone = "light",
  height = 36,
  priority = false,
  className = "",
}: {
  /** The background the logo sits on: `light` = white/paper, `dark` = storm/near-black. */
  tone?: "light" | "dark"
  height?: number
  priority?: boolean
  className?: string
}) {
  return (
    <Image
      src={LOCKUP_SRC[tone]}
      alt="MSS Digital Solutions"
      width={Math.round(height * LOCKUP_ASPECT)}
      height={height}
      priority={priority}
      className={className}
      style={className ? undefined : { height, width: "auto" }}
    />
  )
}

export function LogoMark({
  size = 32,
  priority = false,
  className = "",
}: {
  size?: number
  priority?: boolean
  className?: string
}) {
  return (
    <Image
      src="/brand/logo-mark.png"
      alt="MSS Digital Solutions"
      width={Math.round(size * MARK_ASPECT)}
      height={size}
      priority={priority}
      className={className}
      style={className ? undefined : { height: size, width: "auto" }}
    />
  )
}
