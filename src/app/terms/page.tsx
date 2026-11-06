import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export const metadata = { title: "Terms of Use — MSS Digital Solutions" }

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF7]">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <h1 className="font-display text-3xl font-bold tracking-tight text-[#0B1930]">Terms of Use</h1>
        <p className="text-sm text-[#94A3B8] mt-2">Effective: 6 November 2026 • MSS Digital Solutions Ltd • RC 7341058</p>
        <div className="mt-8 prose prose-neutral max-w-none prose-p:leading-relaxed prose-p:text-[#334155] prose-headings:text-[#0B1930]">
          <p>By accessing this website you agree to these Terms. This site presents corporate information about MSS Digital Solutions Ltd, its capabilities, flagship Geo-ST4R programme and leadership.</p>
          <h2>Accuracy & content integrity</h2>
          <p>The company profile is the primary source of truth. MSS does not invent clients, contracts, dates, counts or impact statistics. Illustrative maps and datasets are explicitly labelled as synthetic; they must not be interpreted as operational programme data.</p>
          <h2>Intellectual property</h2>
          <p>Content on this site — including text, design, and illustrative visualisations — is owned or licensed by MSS. You may share links with attribution but may not reproduce substantial content without permission.</p>
          <h2>Acceptable use</h2>
          <p>You must not attempt to breach security, scrape administrative routes, or submit false enquiries or spam. Rate limiting and logging are in effect.</p>
          <h2>Liability</h2>
          <p>This is a corporate information site, not a medical or regulated advice service. MSS makes no warranty that site content is error-free; it is provided as-is.</p>
          <h2>Contact</h2>
          <p>For questions, use the Contact page. Placeholders indicate information awaiting MSS verification.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
