import Image from "next/image"
import { images, provenanceLabel, type ImageKey, type SiteImage } from "@/content/images"

type FigureProps = {
  /** Key into the central image manifest. */
  name: ImageKey
  /** Sizing hints for the browser — always pass the real rendered widths. */
  sizes?: string
  /** True only for the single LCP image on the page. */
  priority?: boolean
  className?: string
  imgClassName?: string
  /** Renders the provenance line beneath the frame. */
  caption?: boolean
  /** Overrides the manifest caption. */
  captionText?: string
  /** Corner radius utility for the frame. */
  rounded?: string
}

/**
 * Manifest-driven photograph.
 *
 * The frame always has a defined aspect ratio (from the intrinsic
 * width/height of the manifest entry), so nothing shifts as images load.
 * `object-cover` handles the crop; `object-position` is set per image in
 * the page where the composition needs it.
 */
export function Figure({
  name,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px",
  priority = false,
  className = "",
  imgClassName = "",
  caption = false,
  captionText,
  rounded = "rounded-2xl",
}: FigureProps) {
  const img = images[name] as SiteImage
  const label = provenanceLabel(img.kind)
  const text = captionText ?? img.caption
  const showCaption = caption && (text || label)

  return (
    <figure className={`min-w-0 ${className}`}>
      <div
        className={`relative overflow-hidden bg-[#E8EAEC] ${rounded}`}
        style={{ aspectRatio: `${img.width} / ${img.height}` }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes={sizes}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? undefined : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      </div>
      {showCaption && (
        <figcaption className="mt-2.5 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[11px] leading-relaxed text-[#89929B]">
          {text && <span>{text}</span>}
          {label && (
            <span className="inline-flex items-center rounded-full border border-[#E8EAEC] bg-white px-2 py-0.5 font-semibold tracking-[0.06em] uppercase text-[9.5px] text-[#59636D]">
              {label}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
