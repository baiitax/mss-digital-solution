import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CapabilityTemplate } from "@/components/sections/CapabilityTemplate"

export const metadata = {
  title: "Digital Health Systems — MSS Digital Solutions",
  description:
    "Digital healthcare delivery systems, health information systems, EHR integration, reporting and recording, immunisation information systems and logistics visibility — designed for facility-level deployment.",
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />
      <main>
        <CapabilityTemplate
          num="01"
          slug="digital-health-systems"
          name="Digital Health Systems"
          heroTitle="Digital systems that health workers actually use,"
          heroHighlight="inside the facility they work in."
          heroDescription="MSS designs and deploys digital health systems for service delivery, recording, reporting, ordering and reconciliation — built for intermittent connectivity, low digital literacy thresholds and the real rhythm of a primary healthcare facility."
          heroChips={["Facility-level deployment", "Offline-first design", "Co-designed with users"]}
          challenge={{
            problem: "Paper registers duplicate effort, delay reporting and conceal stock-outs and defaulters until the reporting window has closed. Systems bought without the user in the room become shelfware.",
            approach: "Co-design with the teams who will operate the system, build for offline and low bandwidth, and support adoption through training and supervision until the workflow is routine.",
          }}
          areasHeading="Nine areas of digital health delivery."
          areasIntro="From healthcare delivery platforms to the adoption work that determines whether a system survives its first quarter."
          areas={[
            { title: "Digital Healthcare Delivery Systems", desc: "Platforms supporting service delivery — outreach planning, session management, client follow-up and referral movement between levels of care." },
            { title: "Healthcare Information Systems", desc: "Structured capture of facility, programme and administrative data with validation at entry and reconciliation against source registers." },
            { title: "EHR Integration Experience", desc: "Working with existing electronic health record environments where records already exist — aligning identifiers, workflows and reporting rather than replacing what is in use." },
            { title: "Digital Reporting & Recording", desc: "Digitising routine registers and reporting flows so that the facility's daily record becomes the reporting dataset, rather than a second, parallel task." },
            { title: "Immunisation Information Systems", desc: "Routine immunisation registers, session data and microplan linkage — informed by National EMID optimisation experience and Geo-ST4R field deployment." },
            { title: "Logistics & Commodity Visibility", desc: "Stock visibility, ordering, consumption and cold-chain oversight so that supply decisions are made from current data, not the last physical count." },
            { title: "Healthcare Workflow Optimisation", desc: "Redesign of the steps around a system: who records, when, on what, and what is removed so the worker's day gets lighter rather than heavier." },
            { title: "Facility-Level Deployment", desc: "Onboarding, device readiness, connectivity planning and supportive supervision — deployment treated as an operational activity, not an installation." },
            { title: "Technology Adoption & Capacity Building", desc: "Role-based training, SOPs, mentoring and handover so government and facility teams own the system and its maintenance." },
          ]}
          practice={[
            { title: "One record, one entry", desc: "The register entry the health worker already writes becomes the reported figure — removing duplicate transcription at month end." },
            { title: "Connectivity-aware", desc: "Capture works offline and synchronises when connectivity returns, so a dropped signal does not become a lost session." },
            { title: "Validation where it happens", desc: "Obvious errors are caught at the point of entry, before they travel up the reporting chain and become someone else's correction task." },
            { title: "Supervision over enforcement", desc: "Adoption is supported through routine supervision and targeted mentoring rather than compliance reminders." },
          ]}
          documented={{
            demonstrated: [
              "LoMIS Suite — logistics management information system; WFP Digital Health Innovation Accelerator Award, 2022/2023",
              "GAVI-funded optimisation of the National Electronic Management of Immunization Data (EMID)",
              "BISKIT — Blood Information System for Crisis Intervention and Management (South Africa)",
              "SPRING and SPRING II clinical research data systems via Vanderbilt Center for Global Health",
            ],
            capability:
              "MSS is able to extend comparable architectures to new programmes and facilities. We do not claim that every service area listed above has been deployed at scale; those with documented implementation experience are named specifically, and the rest represent our current service capability.",
          }}
          related={[
            { label: "Geospatial Intelligence", href: "/capabilities/geospatial-intelligence" },
            { label: "Data Analytics", href: "/capabilities/data-analytics" },
            { label: "Geo-ST4R Case Study", href: "/our-work/geo-st4r-kano" },
          ]}
          ctaLabel="Discuss a Digital Health System"
        />
      </main>
      <Footer />
    </div>
  )
}
