import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Database, MapPinned, LineChart, UsersRound } from "lucide-react"
import { Figure } from "@/components/ui/Figure"
import { images } from "@/content/images"

/* ──────────────────────────────────────────
   HOME — 7-section concise corporate gateway
   Brand: Burgundy #701F3D + Storm Grey #343D46
   ────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />
      <main>
        {/* 1 — HERO */}
        <section className="relative bg-[#FAF9F7] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F9E9EE]/50 via-transparent to-[#E8EAEC]/60" />
            <div className="absolute -top-24 -right-24 w-[55%] h-[75%] bg-[#701F3D]/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative container-mss">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 py-10 sm:py-14 lg:py-16 items-center">
              <div className="lg:col-span-6 min-w-0">
                <div className="inline-flex items-center gap-2 bg-white border border-[#E8EAEC] rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#59636D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#701F3D] animate-pulse" /> MSS DIGITAL SOLUTIONS • RC 7341058
                </div>
                <h1 className="font-bold tracking-[-0.03em] leading-[0.94] text-[#252B31] mt-6" style={{ fontSize: "clamp(34px, 4.8vw, 54px)" }}>
                  Building Health<br />
                  Systems That Reach<br />
                  <span className="text-[#701F3D]">Every Community.</span>
                </h1>
                <p className="text-[#343D46]/70 leading-relaxed mt-6 max-w-[540px] text-[15px] sm:text-[16px]">
                  We combine digital health systems, geospatial intelligence and data analytics to help healthcare institutions identify gaps, strengthen service delivery and reach underserved communities.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <Link href="/capabilities" className="inline-flex items-center justify-center gap-2 bg-[#701F3D] hover:bg-[#50152D] text-white px-7 h-12 rounded-full text-[13px] font-semibold tracking-[0.06em] uppercase transition-colors">
                    Explore Our Capabilities <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF9F7] text-[#343D46] border border-[#E8EAEC] hover:border-[#701F3D]/15 px-7 h-12 rounded-full text-[13px] font-semibold tracking-[0.06em] uppercase transition-colors">
                    Partner With Us
                  </Link>
                </div>
                <div className="mt-8 flex items-center gap-6 text-xs text-[#59636D]">
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#701F3D]" /> Kano • Nigeria</span>
                  <span className="w-px h-4 bg-[#E8EAEC]" />
                  <span>Implementation partner, not vendor</span>
                </div>
              </div>

              <div className="lg:col-span-6 min-w-0">
                <div className="relative bg-white rounded-[20px] lg:rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(52,61,70,0.10)] border border-[#E8EAEC] p-3">
                  <div className="relative overflow-hidden rounded-[14px] lg:rounded-[20px] bg-[#343D46]">
                    <Figure
                      name="home-hero-community-health"
                      priority
                      sizes="(max-width: 1024px) 92vw, 560px"
                      rounded="rounded-[14px] lg:rounded-[20px]"
                      imgClassName="object-[62%_45%]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#252B31]/78 via-[#252B31]/10 to-transparent" />
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#252B31]/75 backdrop-blur rounded-full px-2.5 py-1 text-[9.5px] font-semibold tracking-[0.08em] uppercase text-white/80">
                      Representative image
                    </div>
                    {/* Top label */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur rounded-xl px-3.5 py-2.5 shadow-lg">
                      <div className="text-[10px] tracking-[0.12em] uppercase font-bold text-[#59636D]">Featured</div>
                      <div className="font-bold text-[#252B31] text-sm leading-tight">Geo-ST4R — Kano State</div>
                      <div className="text-xs text-[#701F3D] font-medium">Geospatial Microplanning Toolkit</div>
                    </div>
                    {/* Bottom badge */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-[#252B31]/85 backdrop-blur-xl border border-white/10 rounded-xl p-3 sm:p-4 flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold text-sm">Settlement-level mapping</div>
                        <div className="text-white/60 text-xs mt-0.5">Every community visible. No child invisible.</div>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-[#701F3D] flex items-center justify-center shrink-0">
                        <MapPinned className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 px-2 pt-4 pb-2">
                    <div>
                      <div className="text-[10px] tracking-[0.12em] uppercase font-bold text-[#89929B]">Partners</div>
                      <div className="text-xs font-medium text-[#252B31] mt-1 leading-tight">Natview • DSN • Pathfinder</div>
                    </div>
                    <div className="border-l border-[#E8EAEC] pl-4">
                      <div className="text-[10px] tracking-[0.12em] uppercase font-bold text-[#89929B]">Focus</div>
                      <div className="text-xs font-medium text-[#252B31] mt-1">PHC • RI • Zero-Dose</div>
                    </div>
                    <div className="border-l border-[#E8EAEC] pl-4">
                      <div className="text-[10px] tracking-[0.12em] uppercase font-bold text-[#89929B]">Approach</div>
                      <div className="text-xs font-medium text-[#701F3D] mt-1">Assess → Verify</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2 — SHORT CORPORATE INTRODUCTION */}
        <section className="section-y bg-white border-y border-[#E8EAEC]">
          <div className="container-mss">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 min-w-0">
              <div className="eyebrow">Who We Are</div>
              <h2 className="font-bold tracking-[-0.02em] leading-[0.98] text-[#252B31] mt-4" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>
                Technology. Geography.<br />
                <span className="text-[#701F3D]">Better Health Outcomes.</span>
              </h2>
              <p className="text-[#343D46]/70 leading-relaxed mt-5 text-[16px]">
                MSS Digital Solutions is a Kano-based health technology company working at the intersection of healthcare delivery, geospatial intelligence and actionable data. We partner with institutions to turn complex health system challenges into practical solutions.
              </p>
              <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-[#701F3D] hover:gap-3 transition-all">
                Discover MSS <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-5 min-w-0">
              <Figure
                name="home-intro-collaboration"
                sizes="(max-width: 1024px) 92vw, 460px"
                rounded="rounded-[20px]"
                caption
              />
            </div>
            </div>
          </div>
        </section>

        {/* 3 — CORE CAPABILITIES */}
        <section className="section-y bg-[#F0F1F2]">
          <div className="container-mss">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="eyebrow">Core Competencies</div>
                <h2 className="font-bold tracking-tight text-[#252B31] mt-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>What We Do.</h2>
                <p className="text-[#59636D] mt-3 leading-relaxed max-w-xl">Four integrated practices — delivered as assessment, co-design or managed implementation.</p>
              </div>
              <Link href="/capabilities" className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-[#701F3D] hover:gap-3 transition-all">
                View all capabilities <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
              {[
                { icon: Database, image: "cap-digital-health-systems", title: "Digital Health Systems", desc: "Health information systems, immunisation platforms and logistics visibility — built for offline frontline use.", href: "/capabilities/digital-health-systems" },
                { icon: MapPinned, image: "cap-geospatial-intelligence", title: "Geospatial Intelligence", desc: "Settlement & facility mapping, catchment analysis and geospatial microplanning.", href: "/capabilities/geospatial-intelligence" },
                { icon: LineChart, image: "cap-data-analytics", title: "Data Analytics", desc: "Routine & survey analysis, data quality assessment and programme dashboards.", href: "/capabilities/data-analytics" },
                { icon: UsersRound, image: "cap-programme-management", title: "Programme & Project Management", desc: "Stakeholder coordination, field deployment, training and independent verification.", href: "/capabilities/programme-management" },
              ].map((c) => (
                <Link key={c.title} href={c.href} className="group bg-white rounded-[20px] border border-[#E8EAEC] overflow-hidden hover:shadow-[0_16px_48px_rgba(52,61,70,0.08)] hover:border-[#701F3D]/12 hover:-translate-y-0.5 transition-all flex flex-col">
                  <div className="relative">
                    <Figure
                      name={c.image as "cap-digital-health-systems"}
                      sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 24vw"
                      rounded="rounded-none"
                      imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A1F24]/40 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/95 backdrop-blur flex items-center justify-center text-[#701F3D] shadow-sm">
                      <c.icon className="w-[18px] h-[18px]" />
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-[15px] text-[#252B31] leading-tight group-hover:text-[#701F3D] transition-colors">{c.title}</h3>
                    <p className="text-[13px] leading-relaxed text-[#59636D] mt-2 flex-1">{c.desc}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase text-[#701F3D]">
                      Explore <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4 — FEATURED WORK */}
        <section className="section-y bg-white">
          <div className="container-mss">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="eyebrow">Featured Work</div>
                <h2 className="font-bold tracking-[-0.02em] leading-[0.98] text-[#252B31] mt-4" style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}>
                  Making Every<br />Community Visible.
                </h2>
                <p className="text-[#343D46]/70 leading-relaxed mt-5 text-[15px]">
                  Through the Geospatial Microplanning Toolkit, MSS contributed to a facility-level approach that helps health workers plan immunisation activities using settlement-level geographic information.
                </p>
                <Link href="/our-work/geo-st4r-kano" className="mt-7 inline-flex items-center gap-2 bg-[#701F3D] hover:bg-[#50152D] text-white px-6 h-11 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-colors">
                  Explore the Geo-ST4R Case Study <ArrowUpRight className="w-4 h-4" />
                </Link>
                <p className="text-xs text-[#89929B] mt-4 leading-relaxed">Partners: Natview Foundation • Data Science Network • Pathfinder International</p>
              </div>
              <div className="lg:col-span-7">
                <div className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-[24px] p-4 sm:p-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl overflow-hidden bg-[#343D46] relative">
                      <Figure
                        name="geo-st4r-kano-landscape"
                        sizes="(max-width: 640px) 92vw, 300px"
                        rounded="rounded-2xl"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A1F24]/80 via-[#1A1F24]/10 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/95 backdrop-blur rounded-xl px-3 py-2">
                          <div className="text-[11px] font-bold tracking-wide uppercase text-[#701F3D]">GMT at facility level</div>
                          <div className="text-xs text-[#343D46] mt-0.5">Maps, training, microplans</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white border border-[#E8EAEC] rounded-2xl p-5">
                        <div className="text-xs font-mono font-bold text-[#701F3D]">01 — Challenge</div>
                        <p className="text-sm text-[#343D46] mt-2 leading-relaxed">Estimated catchments hide dispersed settlements — zero-dose children remain invisible to planners.</p>
                      </div>
                      <div className="bg-[#701F3D] rounded-2xl p-5 text-white">
                        <div className="text-xs font-mono font-bold text-white/70">02 — Contribution</div>
                        <p className="text-sm text-white/90 mt-2 leading-relaxed">Settlement-level maps and GMT-enabled microplans — so outreach reaches where children actually live.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                    <span className="px-3 py-1.5 rounded-full bg-white border border-[#E8EAEC] text-[#59636D]">Kano State • Facility-level</span>
                    <span className="px-3 py-1.5 rounded-full bg-[#F9E9EE] border border-[#701F3D]/12 text-[#701F3D] font-medium">Illustrative • Synthetic data labelled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5 — OUR APPROACH */}
        <section className="section-y bg-[#343D46] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: "28px 28px" }} />
          <div className="relative container-mss">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-[#E8A0B8]">
                <span className="w-7 h-px bg-[#E8A0B8]" /> How We Work
              </div>
              <h2 className="font-bold tracking-tight mt-4 text-white" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>Designed With the People Who Deliver.</h2>
              <p className="text-white/55 mt-4 leading-relaxed">Four stages — from understanding geography to verifying that systems are used.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {[
                { n: "01", t: "Assess & Measure", d: "Understand actual geography, facilities, coverage gaps and data quality.", img: "stage-assess-community" },
                { n: "02", t: "Co-design & Build", d: "Develop practical solutions alongside ministries and frontline teams.", img: "stage-co-design-workshop" },
                { n: "03", t: "Deploy & Strengthen", d: "Implement systems, train teams and support adoption in the field.", img: "stage-deploy-service-delivery" },
                { n: "04", t: "Monitor & Verify", d: "Measure implementation, close gaps and feed evidence to decisions.", img: "stage-verify-analysis" },
              ].map((s) => (
                <div key={s.n} className="bg-white/[0.06] backdrop-blur border border-white/10 rounded-2xl overflow-hidden">
                  <Figure
                    name={s.img as "stage-assess-community"}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
                    rounded="rounded-none"
                    imgClassName="opacity-90"
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#701F3D] flex items-center justify-center text-white font-mono text-[12px] font-bold">{s.n}</div>
                      <h3 className="font-semibold text-white text-[15px]">{s.t}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-white/55 mt-2.5">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/how-we-work" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-[#E8A0B8] hover:gap-3 transition-all">
              Explore How We Work <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 6 — FINAL CTA */}
        <section className="py-10 sm:py-16 bg-[#FAF9F7] border-t border-[#E8EAEC]">
          <div className="container-mss">
            <div className="bg-[#701F3D] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute inset-0" aria-hidden="true">
                <Image
                  src={images["about-team-institutional"].src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  className="object-cover object-center opacity-[0.16]"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#701F3D]/95 via-[#701F3D]/88 to-[#50152D]/95" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent" />
              <div className="absolute -top-16 -right-16 w-[50%] h-[80%] bg-[#A34B68]/15 rounded-full blur-3xl" />
              <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
                <div className="max-w-2xl min-w-0">
                  <h2 className="font-bold tracking-tight text-white" style={{ fontSize: "clamp(22px, 2.6vw, 32px)" }}>Let’s Build Health Systems That Reach Everyone.</h2>
                  <p className="text-white/65 mt-4 leading-relaxed text-sm sm:text-[15px]">Whether you are a government institution, development partner or healthcare organisation, MSS is ready to explore meaningful collaboration.</p>
                </div>
                <Link href="/contact" className="shrink-0 inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF9F7] text-[#701F3D] px-8 h-12 rounded-full font-semibold tracking-wide uppercase text-sm transition-colors w-full sm:w-auto text-center">
                  Start a Partnership Conversation <ArrowUpRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
              <div className="relative mt-8 pt-6 border-t border-white/12 flex flex-wrap gap-2 sm:gap-3 text-xs text-white/50">
                <span>State & Federal Government</span><span>•</span><span>Academia</span><span>•</span><span>INGOs & Donors</span><span>•</span><span>Research</span><span>•</span><span>Investors & Private Sector</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
