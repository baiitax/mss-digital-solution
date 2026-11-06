import Link from "next/link"

export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  meta,
}: {
  eyebrow: string
  title: string
  highlight?: string
  description: string
  meta?: React.ReactNode
}) {
  return (
    <section className="bg-[#0A1D30] text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#087F83]/15 via-transparent to-[#10283F]/60" />
        <div className="absolute -top-32 -right-32 w-[55%] h-[80%] bg-[#087F83]/[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>
      <div className="relative container-mss py-14 sm:py-16 lg:py-20">
        <div className="max-w-[900px]">
          <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.10] rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80">
            {eyebrow}
          </div>
          <h1 className="font-bold tracking-[-0.03em] leading-[0.93] mt-5 text-white" style={{ fontSize: "clamp(32px, 4.2vw, 56px)" }}>
            {title}
            {highlight ? <span className="text-[#48BFC2]"> {highlight}</span> : null}
          </h1>
          <p className="text-white/65 leading-relaxed mt-5 max-w-[720px] text-[15px] sm:text-[16px] lg:text-[18px]">{description}</p>
          {meta ? <div className="mt-8">{meta}</div> : null}
        </div>
      </div>
    </section>
  )
}

export function SectionTag({ children }: { children: string }) {
  return (
    <div className="eyebrow">
      {children}
    </div>
  )
}
