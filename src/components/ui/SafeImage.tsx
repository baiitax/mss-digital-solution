"use client"
import { useState } from "react"

type SafeImageProps = {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  width?: number
  height?: number
}

// Branded fallback: subtle gradient with MSS monogram
function Fallback({ alt, className }: { alt: string; className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0A1D30] to-[#10283F] text-white/80 ${className || ""}`}
      role="img"
      aria-label={alt}
    >
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sm font-bold tracking-tight border border-white/15">MSS</div>
      <span className="text-[10px] tracking-[0.14em] uppercase font-semibold text-white/50 mt-2">Image unavailable</span>
    </div>
  )
}

export function SafeImage({ src, alt, className, fallbackSrc }: SafeImageProps) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (failed) {
    if (fallbackSrc) {
      return <img src={fallbackSrc} alt={alt} className={className} onError={() => setFailed(true)} />
    }
    return <Fallback alt={alt} className={className} />
  }

  return (
    <div className={`relative ${className || ""}`}>
      {!loaded && <div className="absolute inset-0 bg-[#F0F3F4] animate-pulse rounded-[inherit]" />}
      <img
        src={src}
        alt={alt}
        className={`${className || ""} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
