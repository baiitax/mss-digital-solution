import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export const metadata = { title: "Privacy Policy — MSS Digital Solutions" }

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFBF9]">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <h1 className="font-display text-3xl font-bold tracking-tight text-[#10283F]">Privacy Policy</h1>
        <p className="text-sm text-[#71808B] mt-2">Last updated: 6 November 2026 • RC 7341058 • Kano, Nigeria</p>
        <div className="mt-8 prose prose-neutral max-w-none prose-p:leading-relaxed prose-p:text-[#273744] prose-headings:text-[#10283F]">
          <p>This Privacy Policy describes how MSS Digital Solutions Ltd (“MSS”, “we”) handles information collected via this corporate website. This site is a <strong>corporate presence only</strong> and does not collect patient health information.</p>
          <h2>Information we collect</h2>
          <p>We collect information you provide via contact and partnership enquiry forms: full name, organisation, professional email, telephone, country, area of interest, subject and message. Submissions are stored in Supabase (or browser localStorage in demo mode) with timestamps and status, and are accessible only to authenticated administrators with appropriate roles.</p>
          <h2>How we use your information</h2>
          <p>To respond to your enquiry, manage the partnership pipeline, and maintain administrative records. We do not sell your data. We do not use it for unrelated marketing without consent.</p>
          <h2>Legal basis & NDPA</h2>
          <p>Where applicable, processing is based on consent and legitimate interest in responding to corporate enquiries. We consider applicable Nigerian Data Protection Act (NDPA) obligations. This notice should be reviewed by qualified counsel before launch.</p>
          <h2>Retention & security</h2>
          <p>Enquiries are retained as needed for programme administration, with access controlled by Supabase Row Level Security and role-based permissions. All administrative operations are enforced server-side. We use HTTPS-ready deployment, secure headers, input sanitisation, server-side validation and rate limiting on sensitive endpoints.</p>
          <h2>Your rights</h2>
          <p>You may request access, correction or deletion of your enquiry data via the contact channel on this site. Placeholders for contact details indicate information awaiting MSS verification.</p>
          <h2>Updates</h2>
          <p>This policy is editable via Admin → Settings → SEO/Compliance. Changes take effect when published.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
