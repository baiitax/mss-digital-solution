import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CapabilityTemplate } from "@/components/sections/CapabilityTemplate"

export const metadata = {
  title: "Programme & Project Management — MSS Digital Solutions",
  description:
    "Programme coordination, stakeholder engagement, partner management, field deployment, training, implementation oversight, monitoring and evaluation, independent verification and project reporting.",
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />
      <main>
        <CapabilityTemplate
          num="04"
          slug="programme-management"
          name="Programme & Project Management"
          heroTitle="Implementation is a discipline,"
          heroHighlight="not an afterthought to development."
          heroDescription="MSS coordinates programmes from design through field deployment to verified adoption — stakeholder alignment, partner management, training, oversight, monitoring and reporting. This is the work that separates a system that ships from a system that gets used."
          heroChips={["Field deployment", "Partner coordination", "Independent verification"]}
          challenge={{
            problem: "Technology development and programme implementation are different disciplines. A well-built system without deployment coordination, training and supervision arrives at a facility with no one prepared to use it.",
            approach: "Treat implementation as its own workstream with named owners, a coordination cadence and verification — planned from the start rather than added once the build is finished.",
          }}
          areasHeading="Nine programme delivery service areas."
          areasIntro="The operating disciplines that carry a solution from plan to verified routine use."
          areas={[
            { title: "Programme Coordination", desc: "Workplans, dependencies, cadence and issue resolution across the full implementation period." },
            { title: "Stakeholder Engagement", desc: "Engagement across federal, state, LGA and facility levels, with the reporting relationships between them respected." },
            { title: "Partner Management", desc: "Joint planning, shared metrics and transparent reporting across consortia and implementing partners." },
            { title: "Field Deployment", desc: "Facility onboarding, logistics, device readiness and supervision scheduling — deployment as a managed operation." },
            { title: "Training & Capacity Building", desc: "Role-specific, competency-based training with post-training mentorship rather than a single workshop." },
            { title: "Implementation Oversight", desc: "Fidelity checks, corrective action and escalation paths so drift is caught while it is still cheap to fix." },
            { title: "Monitoring & Evaluation", desc: "Indicator frameworks, routine monitoring and learning loops that inform adaptive management." },
            { title: "Independent Verification", desc: "Unbiased assessment of implementation fidelity and data quality, including verification of MSS's own work." },
            { title: "Project Reporting", desc: "Structured reporting to funders, ministries and partners — progress, risks, decisions needed — with figures that trace to a source." },
          ]}
          practice={[
            { title: "Verification includes us", desc: "Where verification is in scope, it covers MSS's delivery as well as the facility's — including findings we would rather not have." },
            { title: "Named owners", desc: "Every workstream has a responsible person and a reporting date, at both partner and facility level." },
            { title: "Escalation before failure", desc: "Issues escalate on a defined path so a supply delay or connectivity fault does not silently become a missed quarter." },
            { title: "Handover as a milestone", desc: "Training, SOPs and ownership transfer are scheduled deliverables, not closing remarks." },
          ]}
          related={[
            { label: "How We Work", href: "/how-we-work" },
            { label: "Digital Health Systems", href: "/capabilities/digital-health-systems" },
            { label: "Our Work", href: "/our-work" },
          ]}
          ctaLabel="Discuss Managed Delivery"
        />
      </main>
      <Footer />
    </div>
  )
}
