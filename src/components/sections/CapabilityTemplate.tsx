import Link from "next/link"
import { ArrowUpRight, Check, AlertTriangle } from "lucide-react"

export type CapabilityArea = { title: string; desc: string }

export type CapabilityTemplateProps = {
  num: string
  slug: string
  name: string
  heroTitle: string
  heroHighlight: string
  heroDescription: string
  heroChips: string[]
  challenge: { problem: string; approach: string }
  areasHeading: string
  areasIntro: string
  areas: CapabilityArea[]
  documented?: { demonstrated: string[]; capability: string }
  practice?: { title: string; desc: string }[]
  related: { label: string; href: string }[]
  ctaLabel: string
  children?: React.ReactNode
}

export function CapabilityTemplate({
  num, name, heroTitle, heroHighlight, heroDescription = "", heroChips,
  challenge, areasHeading, areasIntro, areas, documented, practice, related, ctaLabel, children,
}: Omit<CapabilityTemplateProps, "heroDescription"> & { heroDescription?: string }) {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#343D46] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#701F3D]/16 via-transparent to-[#252B31]/60" />
          <div className="absolute -top-28 -right-28 w-[55%] h-[78%] bg-[#701F3D]/[0.07] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        </div>
        <div className="relative container-mss py-14 sm:py-16 lg:py-20">
          <div className="flex items-center gap-2 text-xs text-white/45">
            <Link href="/capabilities" className="hover:text-white transition-colors">Capabilities</Link>
            <span>/</span>
            <span className="text-white/70">{name}</span>
          </div>
          <div className="mt-6 grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.10] rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80">
                Capability {num} — {name}
              </div>
              <h1 className="font-bold tracking-[-0.03em] leading-[0.93] mt-5 text-white" style={{ fontSize: "clamp(30px, 4vw, 52px)" }}>
                {heroTitle}<br /><span className="text-[#E8A0B8]">{heroHighlight}</span>
              </h1>
              {heroDescription && (
                <p className="text-white/65 leading-relaxed mt-5 max-w-[720px] text-[16px]">{heroDescription}</p>
              )}
              <div className="mt-6 flex flex-wrap gap-2 text-[11px]">
                {heroChips.map((c, i) => (
                  <span key={c} className={i === 0 ? "px-3.5 py-1.5 rounded-full bg-[#701F3D] text-white font-medium" : "px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70"}>{c}</span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-white text-[#252B31] rounded-[20px] p-6">
                <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#701F3D]">The challenge</div>
                <p className="text-[13px] text-[#343D46] mt-2.5 leading-relaxed">{challenge.problem}</p>
                <div className="h-px bg-[#E8EAEC] my-5" />
                <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#701F3D]">Our approach</div>
                <p className="text-[13px] text-[#343D46] mt-2.5 leading-relaxed">{challenge.approach}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content areas */}
      <section className="section-y bg-white">
        <div className="container-mss">
          <div className="max-w-2xl">
            <div className="eyebrow">Scope</div>
            <h2 className="font-bold tracking-tight text-[#252B31] mt-4" style={{ fontSize: "clamp(26px, 3vw, 38px)" }}>{areasHeading}</h2>
            <p className="text-[#59636D] mt-3 leading-relaxed text-[15px]">{areasIntro}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {areas.map((a, i) => (
              <div key={a.title} className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-2xl p-5 hover:border-[#701F3D]/15 hover:bg-white hover:shadow-[0_8px_24px_rgba(52,61,70,0.06)] transition-all">
                <div className="font-mono text-[11px] font-bold text-[#897C82]">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-bold text-[14px] text-[#252B31] mt-2 leading-snug">{a.title}</h3>
                <p className="text-[12.5px] text-[#59636D] mt-2 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {children}

      {/* Practice / how it lands */}
      {practice && practice.length > 0 && (
        <section className="section-y bg-[#F0F1F2]">
          <div className="container-mss">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="eyebrow">In Practice</div>
                <h2 className="font-bold tracking-tight text-[#252B31] mt-4" style={{ fontSize: "clamp(24px, 2.8vw, 34px)" }}>How this lands in a facility.</h2>
                <p className="text-[#59636D] mt-3 leading-relaxed text-[14px]">The practical difference between a capability described and a capability delivered.</p>
              </div>
              <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
                {practice.map((p) => (
                  <div key={p.title} className="bg-white border border-[#E8EAEC] rounded-2xl p-5">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#701F3D]" />
                      <h3 className="font-semibold text-[13.5px] text-[#252B31]">{p.title}</h3>
                    </div>
                    <p className="text-[12.5px] text-[#59636D] mt-2 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Documented vs capability */}
      {documented && (
        <section className="section-y bg-white">
          <div className="container-mss">
            <div className="max-w-3xl">
              <div className="eyebrow">Transparency</div>
              <h2 className="font-bold tracking-tight text-[#252B31] mt-4" style={{ fontSize: "clamp(24px, 2.8vw, 32px)" }}>Documented experience vs. service capability.</h2>
              <p className="text-[#59636D] mt-3 leading-relaxed text-[15px]">
                MSS distinguishes what has been delivered from what it is able to deliver. The distinction matters when you are deciding who to partner with.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5 mt-8">
              <div className="bg-[#F9E9EE] border border-[#701F3D]/12 rounded-[20px] p-6">
                <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#701F3D]">Documented experience</div>
                <ul className="mt-4 space-y-2.5">
                  {documented.demonstrated.map((d) => (
                    <li key={d} className="flex gap-2.5 text-[13px] text-[#252B31] leading-relaxed"><Check className="w-3.5 h-3.5 text-[#701F3D] shrink-0 mt-1" />{d}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-[20px] p-6">
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase text-[#89929B]">
                  <AlertTriangle className="w-3.5 h-3.5" /> Service capability
                </div>
                <p className="mt-4 text-[13px] text-[#343D46] leading-relaxed">{documented.capability}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related + CTA */}
      <section className="section-y bg-[#FAF9F7] border-t border-[#E8EAEC]">
        <div className="container-mss">
          <div className="bg-[#252B31] rounded-[24px] p-6 sm:p-8 lg:p-10 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="font-bold text-xl sm:text-2xl tracking-tight">Discuss this capability with MSS.</h2>
              <p className="text-white/60 mt-3 leading-relaxed text-sm">
                Share your geography, programme and timeline — we will recommend an entry point and what to expect.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[11px]">
                {related.map((r) => (
                  <Link key={r.href} href={r.href} className="px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.10] text-white/70 hover:text-white hover:bg-white/[0.12] transition-colors inline-flex items-center gap-1.5">
                    {r.label} <ArrowUpRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/contact" className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#701F3D] hover:bg-[#50152D] text-white px-7 h-12 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-colors w-full lg:w-auto">
              {ctaLabel} <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
