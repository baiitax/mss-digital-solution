import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CapabilityTemplate } from "@/components/sections/CapabilityTemplate"
import { GeospatialDemo } from "@/components/maps/GeospatialDemo"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export const metadata = {
  title: "Geospatial Intelligence — MSS Digital Solutions",
  description:
    "Settlement mapping, health facility mapping, geospatial microplanning, catchment analysis and coverage gap identification — the technical core of the Geo-ST4R programme.",
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />
      <main>
        <CapabilityTemplate
          num="02"
          slug="geospatial-intelligence"
          name="Geospatial Intelligence"
          heroTitle="If a settlement is not on the map,"
          heroHighlight="it is not in the plan."
          heroDescription="MSS maps settlements, facilities and the geography between them, then converts that geography into planning decisions. This is the technical core of the Geo-ST4R programme in Kano State."
          heroChips={["Settlement-level precision", "Facility catchments verified", "Microplanning ready"]}
          challenge={{
            problem: "Health planning usually works from estimated catchment populations. Estimates cannot show that a cluster of households sits four kilometres past the last scheduled outreach point.",
            approach: "Map settlements and verify facility locations first, then let catchment, accessibility and gap analysis be derived from that geography — so planning decisions reference places that exist.",
          }}
          areasHeading="Nine geospatial service areas."
          areasIntro="Each service below feeds the same objective: a planning process that reflects where people actually live."
          areas={[
            { title: "Settlement Mapping", desc: "Identification and geolocation of communities, including dispersed and seasonal clusters that administrative lists omit." },
            { title: "Health Facility Mapping", desc: "Verification of facility coordinates and service points — the reference layer for every catchment and proximity question." },
            { title: "Geospatial Microplanning", desc: "Translation of mapped geography into outreach session plans, delivered through the Geospatial Microplanning Toolkit (GMT)." },
            { title: "Geographic Catchment Analysis", desc: "Assignment and review of facility catchments so that responsibility for a settlement is explicit rather than assumed." },
            { title: "Community Accessibility Assessment", desc: "Travel distance, road condition and seasonal access considered together, because proximity on a straight line is not access." },
            { title: "Spatial Data Visualisation", desc: "Legible layered maps for planners and decision forums — designed to be read by programme staff, not only GIS specialists." },
            { title: "Coverage Gap Identification", desc: "Systematic flagging of settlements and clusters without an assigned service point or a scheduled session." },
            { title: "Geographic Resource Planning", desc: "Placement questions for teams, outreach posts and commodities, informed by settlement distribution rather than administrative symmetry." },
            { title: "Zero-Dose Identification Support", desc: "Spatial evidence that helps programmes locate where unimmunised children are most likely to be concentrated." },
          ]}
          practice={[
            { title: "Planning-grade data", desc: "Maps are built to withstand use at a planning meeting: clear layers, current facility points, and gaps stated instead of implied." },
            { title: "Geography as a workflow", desc: "Teams correct the map as they use it, so accuracy improves through routine planning rather than periodic surveys." },
            { title: "Readable by non-specialists", desc: "Layer design assumes the reader is a health worker or programme manager, not a cartographer." },
            { title: "Honest about uncertainty", desc: "Where settlement data is incomplete, that incompleteness is stated — an unmapped area is treated as a question, not an absence." },
          ]}
          related={[
            { label: "Digital Health Systems", href: "/capabilities/digital-health-systems" },
            { label: "Data Analytics", href: "/capabilities/data-analytics" },
            { label: "Geo-ST4R Case Study", href: "/our-work/geo-st4r-kano" },
          ]}
          ctaLabel="Discuss Geospatial Work"
        >
          {/* Interactive demonstration */}
          <section className="section-y bg-[#F0F1F2]">
            <div className="container-mss">
              <div className="max-w-2xl">
                <div className="eyebrow">Interactive Demonstration</div>
                <h2 className="font-bold tracking-tight text-[#252B31] mt-4" style={{ fontSize: "clamp(24px, 2.8vw, 34px)" }}>See how settlement-level geography exposes gaps.</h2>
                <p className="text-[#59636D] mt-3 leading-relaxed text-[15px]">
                  Toggle settlement and facility layers, then observe which communities sit beyond an assigned catchment. All points are synthetic and labelled as illustrative — this is a demonstration of planning logic, not operational programme data.
                </p>
              </div>
              <div className="mt-6">
                <GeospatialDemo />
              </div>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Link href="/our-work/geo-st4r-kano" className="inline-flex items-center justify-center gap-2 bg-[#701F3D] hover:bg-[#50152D] text-white px-6 h-11 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-colors">
                  See Geo-ST4R Case Study <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link href="/how-we-work" className="inline-flex items-center justify-center gap-2 bg-white border border-[#E8EAEC] hover:border-[#701F3D]/20 text-[#343D46] px-6 h-11 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-colors">
                  How We Deploy
                </Link>
              </div>
          </div>
          </section>
        </CapabilityTemplate>
      </main>
      <Footer />
    </div>
  )
}
