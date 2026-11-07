import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CapabilityTemplate } from "@/components/sections/CapabilityTemplate"
import { CoverageDashboard } from "@/components/visuals/SyntheticVisuals"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export const metadata = {
  title: "Data Analytics — MSS Digital Solutions",
  description:
    "Routine health data analysis, survey analysis, data quality assessment, performance dashboards, programme monitoring and investment intelligence — evidence built for decisions.",
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />
      <main>
        <CapabilityTemplate
          num="03"
          slug="data-analytics"
          name="Data Analytics"
          heroTitle="Data that arrives in time"
          heroHighlight="to change the decision."
          heroDescription="MSS analyses routine health data, survey data and programme records to produce evidence that reaches a decision forum while the decision can still be made — with data quality treated as part of the analysis, not an assumption behind it."
          heroChips={["Routine & survey data", "Quality-assessed", "Decision-oriented"]}
          challenge={{
            problem: "Most health systems are not short of data. They are short of analysis that is timely, quality-checked and framed around a specific decision.",
            approach: "Start from the decision the programme needs to make, assess the data that would inform it, and build the smallest analysis that answers the question — dashboard included only when it earns its place.",
          }}
          areasHeading="Nine analytics service areas."
          areasIntro="Analytical work is scoped to a decision, a planning cycle or an investment question — never to fill a dashboard."
          areas={[
            { title: "Routine Health Data Analysis", desc: "HMIS, immunisation and programme datasets analysed for coverage, timeliness and trend — with the reporting chain understood, not just the file." },
            { title: "Survey Data Analysis", desc: "Household and facility survey datasets analysed with appropriate weighting, confidence and clear statements about what the sample can and cannot support." },
            { title: "Data Quality Assessment", desc: "Completeness, timeliness, internal consistency and validity reviewed facility by facility, with findings phrased as actions rather than verdicts." },
            { title: "Healthcare Performance Dashboards", desc: "Dashboards built around a recurring decision — coverage by geography, reporting timeliness, stock against consumption — designed to be opened, not admired." },
            { title: "Programme Monitoring", desc: "Monitoring frameworks, indicator definitions and review cadences that let a programme see its own trajectory between formal evaluations." },
            { title: "Coverage Gap Analysis", desc: "Triangulation of service data with settlement geography to identify where coverage is thin and how large the gap is likely to be." },
            { title: "Evidence-Based Decision Support", desc: "Analysis packaged for a specific forum — state review meeting, partner review, investment committee — with options and trade-offs made explicit." },
            { title: "Health Planning & Investment Intelligence", desc: "Analysis supporting resource allocation: where additional teams, outreach points or commodities would change outcomes most." },
            { title: "Research Data Infrastructure", desc: "Data management for research and evaluation — instruments, capture, cleaning, versioning and reproducible analysis pipelines." },
          ]}
          practice={[
            { title: "Decision first", desc: "Every analysis opens with the question it answers and the forum that will use it." },
            { title: "Quality stated", desc: "Limitations travel with the finding, so a number is never read as more certain than it is." },
            { title: "Facility-facing views", desc: "Where a facility's own reporting quality is the issue, the facility sees its own picture — not only the state summary." },
            { title: "No invented benchmarks", desc: "Comparative figures are used only where the underlying data supports them." },
          ]}
          related={[
            { label: "Geospatial Intelligence", href: "/capabilities/geospatial-intelligence" },
            { label: "Programme Management", href: "/capabilities/programme-management" },
            { label: "How We Work", href: "/how-we-work" },
          ]}
          ctaLabel="Discuss an Analytics Need"
          heroImage="analytics-review-session"
          gallery={[
            { image: "analytics-team-working", title: "Analysis is a working session", text: "Routine data is reviewed with the team that owns the decision — not delivered as a report after the window closes." },
            { image: "cap-data-analytics", title: "Dashboards that survive contact", text: "Indicators are chosen for the decision they support, then tested against the data quality behind them." },
          ]}
        >
          {/* Illustrative dashboard */}
          <section className="section-y bg-white">
            <div className="container-mss">
              <div className="max-w-2xl">
                <div className="eyebrow">Illustrative Visualisation</div>
                <h2 className="font-bold tracking-tight text-[#252B31] mt-4" style={{ fontSize: "clamp(24px, 2.8vw, 34px)" }}>What a decision-oriented view looks like.</h2>
                <p className="text-[#59636D] mt-3 leading-relaxed text-[15px]">
                  A monitoring view is useful when it states what happened, what it implies and what should be done next. The example below is synthetic and labelled — it demonstrates structure, not programme performance.
                </p>
              </div>

              <div className="mt-8 bg-[#FAF9F7] border border-[#E8EAEC] rounded-[24px] p-4 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#89929B]">Illustrative monitoring view — synthetic data</div>
                  <span className="px-3 py-1 rounded-full bg-[#F9E9EE] border border-[#701F3D]/12 text-[11px] font-semibold text-[#701F3D]">Not operational data</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
                  {[
                    { label: "Reporting timeliness", value: "Improving", detail: "Trend across four reporting periods", accent: false, bar: 78 },
                    { label: "Settlement coverage", value: "Gap visible", detail: "Settlements without an assigned session", accent: true, bar: 62 },
                    { label: "Data consistency", value: "Under review", detail: "Facility-level reconciliation required", accent: false, bar: 54 },
                    { label: "Priority action", value: "3 areas", detail: "Flagged for supportive supervision", accent: false, bar: 40 },
                  ].map((c) => (
                    <div key={c.label} className={`rounded-2xl p-4 border ${c.accent ? "bg-[#701F3D] text-white border-[#701F3D]" : "bg-white border-[#E8EAEC]"}`}>
                      <div className={`text-[10px] font-bold tracking-[0.12em] uppercase ${c.accent ? "text-white/60" : "text-[#89929B]"}`}>{c.label}</div>
                      <div className={`font-bold mt-1.5 ${c.accent ? "text-white" : "text-[#252B31]"} text-[15px]`}>{c.value}</div>
                      <div className={`text-[11px] mt-1 leading-relaxed ${c.accent ? "text-white/70" : "text-[#59636D]"}`}>{c.detail}</div>
                      <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${c.accent ? "bg-white/20" : "bg-[#F0F1F2]"}`}>
                        <div className={`h-full rounded-full ${c.accent ? "bg-white/70" : "bg-[#701F3D]"}`} style={{ width: `${c.bar}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid lg:grid-cols-12 gap-3">
                  <div className="lg:col-span-5 bg-white border border-[#E8EAEC] rounded-2xl p-4">
                    <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#89929B]">What the view shows</div>
                    <ul className="mt-3 space-y-2 text-[12.5px] text-[#343D46] leading-relaxed">
                      <li className="flex gap-2"><span className="text-[#701F3D] shrink-0">—</span>Coverage is not evenly distributed across the mapped area</li>
                      <li className="flex gap-2"><span className="text-[#701F3D] shrink-0">—</span>Reporting quality limits how far the coverage figure can be trusted</li>
                      <li className="flex gap-2"><span className="text-[#701F3D] shrink-0">—</span>Supervision is indicated before the next reporting period closes</li>
                    </ul>
                  </div>
                  <div className="lg:col-span-7 bg-[#252B31] text-white rounded-2xl p-4">
                    <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/50">What the decision requires</div>
                    <p className="text-[12.5px] text-white/75 mt-3 leading-relaxed">
                      A monitoring view earns its place when it converts into a scheduled action. Here the sequence would be: verify the reporting gap with the affected facilities, assign supportive supervision to the flagged areas, then re-read coverage after the next cycle — rather than re-reading the same dashboard.
                    </p>
                    <Link href="/how-we-work" className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wide uppercase text-[#E8A0B8] hover:gap-2.5 transition-all">
                      How we verify implementation <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Dashboard anatomy — original visualisation, synthetic data */}
          <section className="section-y bg-[#F0F1F2] border-t border-[#E8EAEC]">
            <div className="container-mss">
              <div className="max-w-2xl">
                <div className="eyebrow">Dashboard Anatomy</div>
                <h2 className="font-bold tracking-tight text-[#252B31] mt-4" style={{ fontSize: "clamp(24px, 2.8vw, 34px)" }}>What a coverage review actually has to answer.</h2>
                <p className="text-[#59636D] mt-3 leading-relaxed text-[15px]">
                  A dashboard is only useful if it ends in a decision. This is the anatomy we build towards —
                  indicators chosen for the question they answer, with data-quality caveats shown alongside them.
                  The values below are deliberately blank or synthetic.
                </p>
              </div>
              <div className="mt-6">
                <CoverageDashboard />
              </div>
            </div>
          </section>
        </CapabilityTemplate>
      </main>
      <Footer />
    </div>
  )
}
