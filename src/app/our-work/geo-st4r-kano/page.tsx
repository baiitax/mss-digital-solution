import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { GeospatialDemo } from "@/components/maps/GeospatialDemo"
import Link from "next/link"
import { Figure } from "@/components/ui/Figure"
import { MicroplanningWorkflow, SettlementCatchmentMap } from "@/components/visuals/SyntheticVisuals"
import { ArrowUpRight, MapPinned, AlertTriangle, Check } from "lucide-react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Geo-ST4R — Geospatial Microplanning in Kano State",
  path: "/our-work/geo-st4r-kano",
  description:
    "A facility-level case study of the Geospatial Microplanning Toolkit (GMT) in Kano State — settlement-level mapping, health worker training and microplanning for routine immunisation reach.",
  shareDescription:
    "Case study: the Geospatial Microplanning Toolkit in Kano State — settlement-level mapping, facility and health worker data, training and microplans built to extend routine immunisation reach to zero-dose communities.",
})

const sections = [
  { id: "introduction", n: "01", label: "Project Introduction" },
  { id: "kano-context", n: "02", label: "Kano State Context" },
  { id: "ri-challenge", n: "03", label: "Routine Immunisation Planning Challenge" },
  { id: "zero-dose", n: "04", label: "The Zero-Dose Challenge" },
  { id: "settlement-mapping", n: "05", label: "Settlement-Level Mapping" },
  { id: "gmt", n: "06", label: "Geospatial Microplanning Toolkit" },
  { id: "deployment", n: "07", label: "Facility-Level Deployment" },
  { id: "training", n: "08", label: "Health Worker Training" },
  { id: "methodology", n: "09", label: "Microplanning Methodology" },
  { id: "contribution", n: "10", label: "Programme Contribution" },
  { id: "partners", n: "11", label: "Implementation Partners" },
  { id: "replicability", n: "12", label: "Replicability Across States" },
]

export default function GeoST4RCaseStudy() {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#252B31] text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#701F3D]/25 via-transparent to-[#343D46]/70" />
            <div className="absolute -top-32 -right-32 w-[55%] h-[80%] bg-[#701F3D]/[0.12] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          </div>
          <div className="relative container-mss py-14 sm:py-16 lg:py-20">
            <div className="flex items-center gap-2 text-xs text-white/45">
              <Link href="/our-work" className="hover:text-white transition-colors">Our Work</Link>
              <span>/</span>
              <span className="text-white/70">Geo-ST4R — Kano State</span>
            </div>

            <div className="max-w-[900px] mt-6">
              <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.10] rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8A0B8] animate-pulse" /> Flagship Case Study • Kano State, Nigeria
              </div>
              <h1 className="font-bold tracking-[-0.03em] leading-[0.92] mt-5 text-white" style={{ fontSize: "clamp(30px, 4.2vw, 54px)" }}>
                Geo-ST4R — Geospatial Microplanning for<br />
                <span className="text-[#E8A0B8]">Better Immunisation Reach.</span>
              </h1>
              <p className="text-white/65 leading-relaxed mt-5 max-w-[760px] text-[16px]">
                A facility-level deployment of the <strong className="text-white">Geospatial Microplanning Toolkit (GMT)</strong> that equips health workers to plan routine immunisation sessions against mapped settlement geography — so communities that planning previously overlooked become visible, and reachable, in the microplan.
              </p>
              <div className="mt-8 flex flex-wrap gap-2 text-[11px]">
                <span className="px-3.5 py-1.5 rounded-full bg-[#701F3D] text-white font-medium">Geospatial Microplanning Toolkit</span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70">Facility-level implementation</span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70">Routine immunisation • Zero-dose</span>
                <span className="px-3.5 py-1.5 rounded-full bg-white text-[#252B31] font-semibold">Illustrative maps — synthetic data</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content integrity notice */}
        <section className="bg-[#FFF7ED] border-b border-[#F59E0B]/25">
          <div className="container-mss py-4 flex gap-3 items-start">
            <AlertTriangle className="w-4 h-4 text-[#9A3412] shrink-0 mt-0.5" />
            <p className="text-xs text-[#7C2D12] leading-relaxed">
              <strong>Content integrity notice.</strong> All maps, points and visualisations on this page are illustrative synthetic demonstrations and are labelled as such. MSS does not publish beneficiary totals, facility counts, implementation dates, financial values or quantified impact percentages without verification and partner approval.
            </p>
          </div>
        </section>

        {/* Body with sticky index */}
        <section className="section-y bg-white">
          <div className="container-mss">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Sticky index */}
              <aside className="lg:col-span-3 lg:sticky lg:top-[100px] hidden lg:block">
                <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#89929B]">Case Study Index</div>
                <nav className="mt-4 space-y-0.5 border-l border-[#E8EAEC]">
                  {sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="group flex gap-2.5 pl-3 pr-2 py-1.5 -ml-px border-l-2 border-transparent hover:border-[#701F3D] transition-colors">
                      <span className="font-mono text-[11px] text-[#C8CDD1] group-hover:text-[#701F3D] transition-colors pt-0.5">{s.n}</span>
                      <span className="text-[12.5px] text-[#59636D] group-hover:text-[#252B31] leading-snug transition-colors">{s.label}</span>
                    </a>
                  ))}
                </nav>
                <Link href="/contact" className="mt-6 inline-flex items-center gap-2 bg-[#701F3D] hover:bg-[#50152D] text-white px-5 h-10 rounded-full text-[12px] font-semibold tracking-wide uppercase transition-colors w-full justify-center">
                  Replicate This <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </aside>

              <div className="lg:col-span-9 space-y-12 min-w-0">
                {/* 01 */}
                <div id="introduction" className="scroll-mt-24">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#701F3D]">01</span>
                    <h2 className="font-bold tracking-tight text-[#252B31]" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>Project Introduction</h2>
                  </div>
                  <div className="mt-4 space-y-4 text-[#343D46] leading-relaxed">
                    <p>
                      Geo-ST4R is MSS Digital Solutions&apos; flagship geospatial programme, delivered in Kano State in collaboration with Natview Foundation, Data Science Network and Pathfinder International. It focuses on a specific, practical problem: routine immunisation microplans are frequently built from estimated catchment populations rather than the actual locations where children live.
                    </p>
                    <p>
                      The programme places the <strong className="text-[#252B31]">Geospatial Microplanning Toolkit (GMT)</strong> at health-facility level and trains the teams who prepare microplans — so outreach sessions are planned against mapped settlements, not assumed radii. The intended contribution is clearer visibility of previously overlooked communities within the planning process.
                    </p>
                  </div>
                </div>

                {/* 02 */}
                <div id="kano-context" className="scroll-mt-24">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#701F3D]">02</span>
                    <h2 className="font-bold tracking-tight text-[#252B31]" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>Kano State Context</h2>
                  </div>
                  <div className="mt-4 space-y-4 text-[#343D46] leading-relaxed">
                    <p>
                      Kano is among the most populous states in Nigeria, with a health system serving dense urban wards alongside widely dispersed rural and peri-urban settlements. That combination makes administrative catchments poor proxies for actual service coverage.
                    </p>
                    <p>
                      Facility networks are uneven: some facilities serve compact, high-density catchments, while others are nominally responsible for settlements spread across long distances with seasonal access. Planning that treats these as equivalent will systematically under-serve the dispersed ones.
                    </p>
                  </div>
                  <div className="mt-5 grid sm:grid-cols-3 gap-3">
                    {[
                      { t: "Population scale", d: "Large, young and geographically distributed" },
                      { t: "Settlement pattern", d: "Dense urban wards + dispersed rural clusters" },
                      { t: "Access", d: "Seasonal roads and long travel to fixed posts" },
                    ].map((i) => (
                      <div key={i.t} className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-2xl p-4">
                        <div className="text-xs font-bold text-[#252B31]">{i.t}</div>
                        <div className="text-xs text-[#59636D] mt-1 leading-relaxed">{i.d}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <Figure name="kano-urban-sprawl" sizes="(max-width: 640px) 92vw, 460px" rounded="rounded-2xl" caption />
                    <Figure name="kano-street-mobility" sizes="(max-width: 640px) 92vw, 460px" rounded="rounded-2xl" caption />
                  </div>
                </div>

                {/* 03 */}
                <div id="ri-challenge" className="scroll-mt-24">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#701F3D]">03</span>
                    <h2 className="font-bold tracking-tight text-[#252B31]" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>Routine Immunisation Planning Challenge</h2>
                  </div>
                  <div className="mt-4 space-y-4 text-[#343D46] leading-relaxed">
                    <p>
                      Traditional microplanning allocates sessions using catchment estimates: total population divided by the number of facilities, or historical attendance extrapolated forward. Neither method knows where settlements actually are.
                    </p>
                    <p>
                      The consequences compound. Sessions are scheduled for places with thin or non-existent populations while settlements beyond a perceived radius receive no session at all. Overlapping catchments double-count communities; gaps leave others uncounted. The plan looks complete on paper and remains incomplete in the field.
                    </p>
                  </div>
                  <div className="mt-5 grid sm:grid-cols-2 gap-3">
                    <div className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-2xl p-5">
                      <div className="text-xs font-bold tracking-wide uppercase text-[#89929B]">Estimated catchments</div>
                      <ul className="mt-3 space-y-2 text-[13px] text-[#343D46]">
                        {["Population divided by facility count", "Outdated or paper settlement lists", "Overlapping or gapped coverage", "Sessions planned by assumption"].map((x) => (
                          <li key={x} className="flex gap-2"><span className="text-[#89929B] shrink-0">—</span>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[#F9E9EE] border border-[#701F3D]/15 rounded-2xl p-5">
                      <div className="text-xs font-bold tracking-wide uppercase text-[#701F3D]">Mapped settlements</div>
                      <ul className="mt-3 space-y-2 text-[13px] text-[#252B31]">
                        {["Every settlement geolocated", "Facility catchments verified", "Gaps visible before the session", "Sessions assigned to real places"].map((x) => (
                          <li key={x} className="flex gap-2"><Check className="w-3.5 h-3.5 text-[#701F3D] shrink-0 mt-0.5" />{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Figure name="immunisation-service-point" sizes="(max-width: 640px) 92vw, 900px" rounded="rounded-2xl" caption captionText="Reference visual — vaccine preparation at a routine immunisation service point." />
                  </div>
                </div>

                {/* 04 */}
                <div id="zero-dose" className="scroll-mt-24">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#701F3D]">04</span>
                    <h2 className="font-bold tracking-tight text-[#252B31]" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>The Zero-Dose Challenge</h2>
                  </div>
                  <div className="mt-4 space-y-4 text-[#343D46] leading-relaxed">
                    <p>
                      Zero-dose children — those who have not received a single routine immunisation antigen — tend to concentrate in settlements that are hardest to see: small, dispersed, seasonal, or simply absent from administrative lists.
                    </p>
                    <p>
                      Because microplans inherit that invisibility, a zero-dose cluster can persist for years not because services are refused, but because no session was ever planned for that place. Geo-ST4R addresses this upstream, at the point where the microplan is drafted.
                    </p>
                  </div>
                  <div className="mt-5 bg-[#252B31] text-white rounded-2xl p-6">
                    <p className="text-sm text-white/80 leading-relaxed">
                      <strong className="text-white">Planning principle:</strong> a settlement that does not appear on the map cannot appear in the microplan — and a community that is not in the microplan is unlikely to receive an outreach session.
                    </p>
                  </div>
                </div>

                {/* 05 */}
                <div id="settlement-mapping" className="scroll-mt-24">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#701F3D]">05</span>
                    <h2 className="font-bold tracking-tight text-[#252B31]" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>Settlement-Level Mapping</h2>
                  </div>
                  <div className="mt-4 space-y-4 text-[#343D46] leading-relaxed">
                    <p>
                      The foundation of the programme is settlement-level mapping: identifying and geolocating communities, then relating each to the facilities that serve them. Facility coordinates are verified so that proximity and accessibility analysis reflects reality rather than assumption.
                    </p>
                    <p>
                      Mapping is treated as a working process, not a one-off data product. As teams use the maps, discrepancies surface — a settlement listed in the wrong ward, a facility recorded at the wrong point — and are corrected through supervision.
                    </p>
                  </div>
                  <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      "Settlement identification & geolocation",
                      "Facility coordinate verification",
                      "Catchment assignment by proximity",
                      "Settlement-level gap flagging",
                    ].map((x) => (
                      <div key={x} className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-xl p-4 text-[13px] text-[#343D46] leading-snug flex gap-2">
                        <MapPinned className="w-4 h-4 text-[#701F3D] shrink-0 mt-0.5" />{x}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <SettlementCatchmentMap />
                  </div>
                  <div className="mt-4">
                    <Figure name="gmt-ward-map-print" sizes="(max-width: 640px) 92vw, 900px" rounded="rounded-2xl" caption />
                    <p className="mt-3 text-[12px] leading-relaxed text-[#89929B]">
                      This sheet is a real GMT output, not an illustration: it is the ward map a facility
                      team plans from. The ward shown is in Lagos State — it is here to show what the
                      output <em>is</em>, not which wards the Kano deployment covers.
                    </p>
                  </div>
                </div>

                {/* 06 */}
                <div id="gmt" className="scroll-mt-24">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#701F3D]">06</span>
                    <h2 className="font-bold tracking-tight text-[#252B31]" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>Geospatial Microplanning Toolkit (GMT)</h2>
                  </div>
                  <div className="mt-4 space-y-4 text-[#343D46] leading-relaxed">
                    <p>
                      The GMT is the delivery instrument of the programme. It presents settlement and facility layers in a form facility teams can interpret without specialist GIS training, and supports the translation of mapped geography into session plans.
                    </p>
                    <p>
                      Its design principle mirrors MSS&apos;s operating philosophy: the tool must be usable by the team that prepares the microplan. Interfaces are kept legible on modest devices, language is operational rather than technical, and outputs map directly onto planning templates that health workers already complete.
                    </p>
                  </div>
                  <div className="mt-5 grid sm:grid-cols-3 gap-3">
                    {[
                      { t: "Layered geography", d: "Settlements, facilities, catchments and reach status in one view" },
                      { t: "Gap identification", d: "Settlements without an assigned session surface immediately" },
                      { t: "Plan-ready outputs", d: "Session assignment expressed in microplan terms" },
                    ].map((i) => (
                      <div key={i.t} className="bg-white border border-[#E8EAEC] rounded-2xl p-5">
                        <div className="text-[13px] font-bold text-[#252B31]">{i.t}</div>
                        <div className="text-xs text-[#59636D] mt-1.5 leading-relaxed">{i.d}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <Figure name="gmt-tablet-ward-tree" sizes="(max-width: 640px) 92vw, 430px" rounded="rounded-2xl" caption />
                    <Figure name="gmt-progress-dashboard" sizes="(max-width: 640px) 92vw, 430px" rounded="rounded-2xl" caption />
                  </div>
                  <div className="mt-4 flex gap-3 bg-[#FFF7ED] border border-[#F59E0B]/25 rounded-xl p-4">
                    <span className="text-[#B45309] shrink-0 mt-0.5 font-bold text-sm">i</span>
                    <p className="text-[12.5px] leading-relaxed text-[#7C2D12]">
                      <strong>About these screens:</strong> both are captures of the GMT test build used for
                      user-acceptance testing. They show how the tool organises planning units and reports
                      status; what appears in them is <strong>not operational programme data</strong>, and
                      the ward list is the tool&rsquo;s national state / LGA / ward hierarchy rather than the
                      Kano wards themselves.
                    </p>
                  </div>
                </div>

                {/* 07 */}
                <div id="deployment" className="scroll-mt-24">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#701F3D]">07</span>
                    <h2 className="font-bold tracking-tight text-[#252B31]" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>Facility-Level Deployment</h2>
                  </div>
                  <div className="mt-4 space-y-4 text-[#343D46] leading-relaxed">
                    <p>
                      The programme deliberately operates at facility level — the layer at which outreach is actually decided. Deploying at state headquarters alone would leave the microplan unchanged; deploying with facility teams changes who plans, and how.
                    </p>
                    <p>
                      Deployment included onboarding facility teams, establishing which settlements fell within each facility&apos;s responsibility, and supporting the first planning cycles with supervision until settlement-level planning became routine practice.
                    </p>
                  </div>
                </div>

                {/* 08 */}
                <div id="training" className="scroll-mt-24">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#701F3D]">08</span>
                    <h2 className="font-bold tracking-tight text-[#252B31]" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>Health Worker Training</h2>
                  </div>
                  <div className="mt-4 space-y-4 text-[#343D46] leading-relaxed">
                    <p>
                      Training was practical and role-specific: reading settlement and facility layers, confirming whether a mapped community is currently served, and assigning sessions accordingly. The objective was competence in the planning decision, not familiarity with software features.
                    </p>
                    <p>
                      Support continued beyond the training room. Supportive supervision during subsequent planning cycles allowed questions to be resolved against real maps and real settlements, which is where adoption is won or lost.
                    </p>
                  </div>
                  <div className="mt-5 grid sm:grid-cols-3 gap-3">
                    {["Map reading & settlement recognition", "Coverage gap interpretation", "Session assignment & microplan drafting"].map((x) => (
                      <div key={x} className="bg-[#F9E9EE] border border-[#701F3D]/12 rounded-xl p-4 text-[13px] text-[#252B31] leading-snug flex gap-2">
                        <Check className="w-3.5 h-3.5 text-[#701F3D] shrink-0 mt-0.5" />{x}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Figure name="field-planning-session" sizes="(max-width: 640px) 92vw, 760px" rounded="rounded-2xl" caption />
                  </div>
                </div>

                {/* 09 */}
                <div id="methodology" className="scroll-mt-24">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#701F3D]">09</span>
                    <h2 className="font-bold tracking-tight text-[#252B31]" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>Microplanning Methodology</h2>
                  </div>
                  <p className="mt-4 text-[#343D46] leading-relaxed">The programme follows a repeatable sequence that any facility team can apply each planning cycle.</p>
                  <div className="mt-5 space-y-3">
                    {[
                      { n: "01", t: "Map the geography", d: "Confirm which settlements exist and where they are relative to the facility.", },
                      { n: "02", t: "Verify service status", d: "Determine which settlements currently receive outreach and which do not.", },
                      { n: "03", t: "Assign sessions", d: "Allocate sessions to unserved settlements rather than to assumed catchments.", },
                      { n: "04", t: "Record and review", d: "Log delivery and revisit the map so next cycle planning starts from updated reality.", },
                    ].map((s) => (
                      <div key={s.n} className="flex gap-4 bg-[#FAF9F7] border border-[#E8EAEC] rounded-2xl p-5">
                        <div className="w-9 h-9 rounded-xl bg-[#701F3D] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">{s.n}</div>
                        <div>
                          <div className="font-semibold text-[#252B31] text-[14px]">{s.t}</div>
                          <div className="text-[13px] text-[#59636D] mt-1 leading-relaxed">{s.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <MicroplanningWorkflow />
                  </div>
                </div>

                {/* 10 */}
                <div id="contribution" className="scroll-mt-24">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#701F3D]">10</span>
                    <h2 className="font-bold tracking-tight text-[#252B31]" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>Programme Contribution</h2>
                  </div>
                  <div className="mt-4 space-y-4 text-[#343D46] leading-relaxed">
                    <p>
                      Geo-ST4R&apos;s contribution is procedural: it changed the evidence base on which outreach sessions are planned at facility level. Settlements that were previously absent from planning discussions entered the microplan because they could be seen.
                    </p>
                    <p>
                      A second contribution is capability. Facility teams now hold a method they can repeat without external facilitation, which is the difference between a pilot that ends and a practice that continues.
                    </p>
                    <div className="bg-[#252B31] text-white rounded-2xl p-6">
                      <p className="text-sm text-white/75 leading-relaxed">
                        <strong className="text-white">On quantification.</strong> MSS does not publish beneficiary totals, facility counts, exact implementation dates or impact percentages for Geo-ST4R on this website. Verified programme results will be released only with partner approval and appropriate attribution.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 11 */}
                <div id="partners" className="scroll-mt-24">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#701F3D]">11</span>
                    <h2 className="font-bold tracking-tight text-[#252B31]" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>Implementation Partners</h2>
                  </div>
                  <p className="mt-4 text-[#343D46] leading-relaxed">Geo-ST4R is delivered with partners bringing complementary capability.</p>
                  <div className="mt-5 grid sm:grid-cols-3 gap-4">
                    {[
                      { name: "Natview Foundation", role: "Geospatial & community intelligence" },
                      { name: "Data Science Network", role: "Data science & analytics" },
                      { name: "Pathfinder International", role: "Public health & programme expertise" },
                    ].map((p) => (
                      <div key={p.name} className="bg-white border border-[#E8EAEC] rounded-2xl p-5">
                        <div className="w-8 h-8 rounded-lg bg-[#343D46] flex items-center justify-center text-white text-xs font-bold">
                          {p.name.charAt(0)}
                        </div>
                        <div className="font-semibold text-[#252B31] text-[14px] mt-3">{p.name}</div>
                        <div className="text-xs text-[#59636D] mt-1 leading-relaxed">{p.role}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#89929B] mt-4 leading-relaxed">No partnership, funding or contract values are disclosed on this website.</p>
                </div>

                {/* 12 */}
                <div id="replicability" className="scroll-mt-24">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#701F3D]">12</span>
                    <h2 className="font-bold tracking-tight text-[#252B31]" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>Replicability Across Other States</h2>
                  </div>
                  <div className="mt-4 space-y-4 text-[#343D46] leading-relaxed">
                    <p>
                      The method is intentionally portable. It depends on settlement and facility geography plus facility teams — not on a bespoke configuration. Each state adapts the sequence to its own settlement patterns, facility network and planning calendar.
                    </p>
                    <p>
                      Replication follows the same arc: map settlements and facilities, deploy the toolkit at facility level, train the planning teams, run supervised planning cycles, then verify that unserved settlements entered the plan.
                    </p>
                  </div>
                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#701F3D] hover:bg-[#50152D] text-white px-6 h-11 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-colors">
                      Discuss Replication <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <Link href="/how-we-work" className="inline-flex items-center justify-center gap-2 bg-white border border-[#E8EAEC] hover:border-[#701F3D]/20 text-[#343D46] px-6 h-11 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-colors">
                      See How We Work
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive demonstration */}
        <section className="section-y bg-[#F0F1F2] border-y border-[#E8EAEC]">
          <div className="container-mss">
            <div className="max-w-2xl">
              <div className="eyebrow">Interactive — Illustrative Only</div>
              <h2 className="font-bold tracking-tight text-[#252B31] mt-4" style={{ fontSize: "clamp(24px, 2.8vw, 34px)" }}>See how settlement-level planning reveals gaps.</h2>
              <p className="text-[#59636D] mt-3 leading-relaxed text-[15px]">
                Toggle settlement and facility layers to see how mapped geography exposes unserved communities. Every point below is synthetic and labelled — this is a demonstration of the planning logic, not operational GMT data.
              </p>
            </div>
            <div className="mt-6">
              <GeospatialDemo />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
