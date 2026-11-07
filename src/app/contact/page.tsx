"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import Link from "next/link"
import { Figure } from "@/components/ui/Figure"
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, AlertCircle, Building2, Handshake, MessageSquare } from "lucide-react"

const partnershipAreas = [
  "Digital Health Systems",
  "Geospatial Intelligence",
  "Data Analytics",
  "Programme Management",
  "Government Partnership",
  "Development Partnership",
  "Research Collaboration",
  "Other",
]

const generalAreas = [
  "General Enquiry",
  "Media & Communications",
  "Careers",
  "Research Collaboration",
  "Other",
]

const emptyForm = {
  full_name: "",
  organisation: "",
  role: "",
  email: "",
  telephone: "",
  country: "Nigeria",
  area_of_interest: "",
  subject: "",
  message: "",
}

export default function ContactPage() {
  const [enquiryType, setEnquiryType] = useState<"partnership" | "general">("partnership")
  const [form, setForm] = useState(emptyForm)
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const areas = enquiryType === "partnership" ? partnershipAreas : generalAreas

  const switchType = (t: "partnership" | "general") => {
    setEnquiryType(t)
    setForm((f) => ({ ...f, area_of_interest: "" }))
    setStatus("idle")
    setErrorMsg("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    if (!form.full_name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg("Please complete your name, email address and message.")
      setStatus("error")
      return
    }
    if (enquiryType === "partnership" && !form.area_of_interest) {
      setErrorMsg("Please select an area of interest for your partnership enquiry.")
      setStatus("error")
      return
    }
    if (!consent) {
      setErrorMsg("Please confirm consent to continue.")
      setStatus("error")
      return
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          enquiry_type: enquiryType,
          area_of_interest: form.area_of_interest || (enquiryType === "general" ? "General Enquiry" : ""),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "Submission failed. Please try again.")
      setStatus("success")
      setForm(emptyForm)
      setConsent(false)
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Please try again.")
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#343D46] text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#701F3D]/16 via-transparent to-[#252B31]/60" />
            <div className="absolute -top-28 -right-28 w-[55%] h-[78%] bg-[#701F3D]/[0.07] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          </div>
          <div className="relative container-mss py-14 sm:py-16 lg:py-20">
            <div className="max-w-[860px]">
              <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.10] rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8A0B8] animate-pulse" /> Contact & Partnership Enquiries
              </div>
              <h1 className="font-bold tracking-[-0.03em] leading-[0.93] mt-5 text-white" style={{ fontSize: "clamp(32px, 4.2vw, 52px)" }}>
                Start a conversation<br />
                about <span className="text-[#E8A0B8]">your communities.</span>
              </h1>
              <p className="text-white/65 leading-relaxed mt-5 max-w-[680px] text-[16px]">
                Whether you are a government institution, development partner, healthcare organisation or researcher, tell us about your geography, programme and timeline. Enquiries are logged and reviewed by the MSS team.
              </p>
            </div>
          </div>
        </section>

        <section className="section-y bg-white">
          <div className="container-mss">
            <div className="grid lg:grid-cols-12 gap-10">
              {/* Organisation details */}
              <div className="lg:col-span-4 space-y-5">
                <div className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-[24px] p-6">
                  <h2 className="font-bold text-[#252B31] text-[16px]">MSS Digital Solutions Ltd</h2>
                  <p className="text-xs text-[#89929B] mt-1">RC 7341058 • Incorporated 9 February 2024</p>
                  <div className="mt-5 space-y-4 text-sm">
                    <div className="flex gap-3">
                      <MapPin className="w-4 h-4 text-[#701F3D] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#252B31] text-[13px]">Head Office</div>
                        <div className="text-[#343D46] text-[13px] leading-relaxed">No. 7 Alexandria Street,<br />Gwale LGA, Kano State, Nigeria.</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Mail className="w-4 h-4 text-[#701F3D] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#252B31] text-[13px]">Email</div>
                        <div className="text-[#89929B] text-xs leading-relaxed">To be confirmed — address published once verified by MSS.</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="w-4 h-4 text-[#701F3D] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#252B31] text-[13px]">Telephone</div>
                        <div className="text-[#89929B] text-xs leading-relaxed">To be confirmed — number published once verified by MSS.</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="w-4 h-4 text-[#701F3D] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#252B31] text-[13px]">Office Hours</div>
                        <div className="text-[#343D46] text-[13px]">Monday – Friday, 09:00 – 17:00 WAT</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Building2 className="w-4 h-4 text-[#701F3D] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#252B31] text-[13px]">Sector</div>
                        <div className="text-[#343D46] text-[13px] leading-relaxed">Digital Health Technology &amp; Geospatial Intelligence</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#89929B] mt-5 leading-relaxed border-t border-[#E8EAEC] pt-4">
                    Contact details marked &ldquo;to be confirmed&rdquo; are deliberate administrative placeholders. MSS does not publish unverified telephone numbers or email addresses.
                  </p>
                </div>

                <div className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-[24px] overflow-hidden">
                  <div className="h-52 relative bg-[#343D46]">
                    <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "22px 22px" }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                      <MapPin className="w-7 h-7 text-[#E8A0B8]" />
                      <div className="font-semibold text-white mt-2.5 text-[14px]">Kano • Gwale LGA</div>
                      <div className="text-white/50 text-xs mt-1 leading-relaxed">No. 7 Alexandria Street</div>
                      <a
                        href="https://maps.google.com/?q=7+Alexandria+Street+Gwale+Kano+Nigeria"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 bg-white text-[#252B31] px-4 h-9 rounded-full text-xs font-semibold"
                      >
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F9E9EE] border border-[#701F3D]/12 rounded-2xl p-5">
                  <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#701F3D]">Data protection</div>
                  <p className="text-xs text-[#343D46] mt-2 leading-relaxed">
                    This website does not collect patient health information. Enquiry data is processed in line with the privacy notice published on this site.
                  </p>
                  <Link href="/privacy-policy" className="mt-3 inline-flex text-xs font-semibold text-[#701F3D] underline underline-offset-2">
                    Read the privacy policy
                  </Link>
                </div>
                <Figure
                  name="contact-institutional-dialogue"
                  sizes="(max-width: 1024px) 92vw, 360px"
                  rounded="rounded-[24px]"
                  caption
                  className="hidden lg:block"
                />
              </div>

              {/* Enquiry forms */}
              <div className="lg:col-span-8">
                <div className="bg-white border border-[#E8EAEC] rounded-[24px] p-6 sm:p-8 shadow-sm">
                  {/* Type switch */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => switchType("partnership")}
                      aria-pressed={enquiryType === "partnership"}
                      className={`text-left rounded-2xl border p-4 transition-colors ${enquiryType === "partnership" ? "border-[#701F3D] bg-[#F9E9EE]" : "border-[#E8EAEC] bg-white hover:border-[#701F3D]/25"}`}
                    >
                      <Handshake className={`w-5 h-5 ${enquiryType === "partnership" ? "text-[#701F3D]" : "text-[#89929B]"}`} />
                      <div className={`font-bold text-[13.5px] mt-2 ${enquiryType === "partnership" ? "text-[#701F3D]" : "text-[#252B31]"}`}>Partnership Enquiry</div>
                      <div className="text-[11.5px] text-[#59636D] mt-1 leading-relaxed">Programme collaboration, assessment, co-design or managed delivery.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => switchType("general")}
                      aria-pressed={enquiryType === "general"}
                      className={`text-left rounded-2xl border p-4 transition-colors ${enquiryType === "general" ? "border-[#701F3D] bg-[#F9E9EE]" : "border-[#E8EAEC] bg-white hover:border-[#701F3D]/25"}`}
                    >
                      <MessageSquare className={`w-5 h-5 ${enquiryType === "general" ? "text-[#701F3D]" : "text-[#89929B]"}`} />
                      <div className={`font-bold text-[13.5px] mt-2 ${enquiryType === "general" ? "text-[#701F3D]" : "text-[#252B31]"}`}>General Enquiry</div>
                      <div className="text-[11.5px] text-[#59636D] mt-1 leading-relaxed">Media, careers, research correspondence and general questions.</div>
                    </button>
                  </div>

                  <h2 className="font-bold text-[#252B31] mt-7 text-[18px]">
                    {enquiryType === "partnership" ? "Partnership Enquiry Form" : "General Enquiry Form"}
                  </h2>
                  <p className="text-sm text-[#59636D] mt-2 leading-relaxed">
                    Required fields are marked with an asterisk. Submissions are validated and logged; the team reviews enquiries during office hours.
                  </p>

                  {status === "success" && (
                    <div className="mt-6 bg-[#F9E9EE] border border-[#701F3D]/20 rounded-2xl p-4 flex gap-3" role="status">
                      <CheckCircle2 className="w-5 h-5 text-[#701F3D] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#701F3D] text-sm">Enquiry received — thank you.</div>
                        <div className="text-sm text-[#343D46] mt-1 leading-relaxed">Your enquiry has been logged and will be reviewed by the MSS team. A response will be sent to the email address you provided.</div>
                      </div>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="mt-6 bg-[#FEF2F2] border border-[#DC2626]/20 rounded-2xl p-4 flex gap-3" role="alert">
                      <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#991B1B] text-sm">Couldn&apos;t submit</div>
                        <div className="text-sm text-[#B91C1C] mt-1 leading-relaxed">{errorMsg}</div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="full_name" className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#343D46]">Full name *</label>
                        <input
                          id="full_name"
                          value={form.full_name}
                          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                          placeholder="e.g. Dr. Aisha Bello"
                          required
                          autoComplete="name"
                          className="mt-2 w-full h-11 px-4 bg-white border border-[#E8EAEC] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#701F3D]/20 focus:border-[#701F3D] placeholder:text-[#C8CDD1]"
                        />
                      </div>
                      <div>
                        <label htmlFor="organisation" className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#343D46]">Organisation</label>
                        <input
                          id="organisation"
                          value={form.organisation}
                          onChange={(e) => setForm({ ...form, organisation: e.target.value })}
                          placeholder="e.g. Kano State Ministry of Health"
                          autoComplete="organization"
                          className="mt-2 w-full h-11 px-4 bg-white border border-[#E8EAEC] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#701F3D]/20 focus:border-[#701F3D] placeholder:text-[#C8CDD1]"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#343D46]">Email address *</label>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@organisation.org"
                          required
                          autoComplete="email"
                          className="mt-2 w-full h-11 px-4 bg-white border border-[#E8EAEC] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#701F3D]/20 focus:border-[#701F3D] placeholder:text-[#C8CDD1]"
                        />
                      </div>
                      <div>
                        <label htmlFor="telephone" className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#343D46]">Telephone</label>
                        <input
                          id="telephone"
                          value={form.telephone}
                          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                          placeholder="+234 …"
                          autoComplete="tel"
                          className="mt-2 w-full h-11 px-4 bg-white border border-[#E8EAEC] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#701F3D]/20 focus:border-[#701F3D] placeholder:text-[#C8CDD1]"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="role" className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#343D46]">Role / position</label>
                        <input
                          id="role"
                          value={form.role}
                          onChange={(e) => setForm({ ...form, role: e.target.value })}
                          placeholder="e.g. Programme Manager"
                          className="mt-2 w-full h-11 px-4 bg-white border border-[#E8EAEC] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#701F3D]/20 focus:border-[#701F3D] placeholder:text-[#C8CDD1]"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#343D46]">Country *</label>
                        <input
                          id="country"
                          value={form.country}
                          onChange={(e) => setForm({ ...form, country: e.target.value })}
                          placeholder="Nigeria"
                          required
                          autoComplete="country-name"
                          className="mt-2 w-full h-11 px-4 bg-white border border-[#E8EAEC] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#701F3D]/20 focus:border-[#701F3D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="area_of_interest" className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#343D46]">
                        Area of interest {enquiryType === "partnership" ? "*" : ""}
                      </label>
                      <select
                        id="area_of_interest"
                        value={form.area_of_interest}
                        onChange={(e) => setForm({ ...form, area_of_interest: e.target.value })}
                        required={enquiryType === "partnership"}
                        className="mt-2 w-full h-11 px-4 bg-white border border-[#E8EAEC] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#701F3D]/20 focus:border-[#701F3D]"
                      >
                        <option value="">Select…</option>
                        {areas.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="subject" className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#343D46]">Subject</label>
                      <input
                        id="subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder={enquiryType === "partnership" ? "e.g. Geospatial readiness assessment in Kaduna State" : "e.g. Media request"}
                        className="mt-2 w-full h-11 px-4 bg-white border border-[#E8EAEC] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#701F3D]/20 focus:border-[#701F3D] placeholder:text-[#C8CDD1]"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#343D46]">Message *</label>
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your programme, geography, timeline and what you would like MSS to assess or deliver."
                        required
                        rows={6}
                        className="mt-2 w-full px-4 py-3 bg-white border border-[#E8EAEC] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#701F3D]/20 focus:border-[#701F3D] placeholder:text-[#C8CDD1] resize-none"
                      />
                      <p className="text-xs text-[#89929B] mt-2 leading-relaxed">Please do not include patient-identifiable health information. This is a corporate enquiry channel, not a clinical inbox.</p>
                    </div>

                    <div className="flex items-start gap-3 bg-[#FAF9F7] border border-[#E8EAEC] rounded-2xl p-4">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 accent-[#701F3D]"
                      />
                      <label htmlFor="consent" className="text-xs text-[#343D46] leading-relaxed">
                        I consent to MSS Digital Solutions Ltd storing and processing this enquiry in accordance with its{" "}
                        <Link href="/privacy-policy" className="text-[#701F3D] underline underline-offset-2">privacy notice</Link>. *
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full h-12 rounded-full bg-[#701F3D] hover:bg-[#50152D] disabled:opacity-60 text-white font-semibold tracking-wide uppercase text-sm inline-flex items-center justify-center gap-2 transition-colors"
                    >
                      {status === "loading" ? "Submitting…" : enquiryType === "partnership" ? "Submit Partnership Enquiry" : "Submit General Enquiry"}
                      <Send className="w-4 h-4" />
                    </button>

                    <p className="text-xs text-center text-[#89929B] leading-relaxed">
                      Validated server-side • Rate-limited • Logged with timestamp and status
                    </p>
                  </form>
                </div>

                <div className="mt-5 bg-[#252B31] rounded-[20px] p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-[15px]">Prefer to review our approach first?</h3>
                    <p className="text-white/60 text-sm mt-1 leading-relaxed">Read how MSS assesses, co-designs, deploys and verifies before you get in touch.</p>
                  </div>
                  <Link href="/how-we-work" className="shrink-0 bg-white text-[#252B31] px-6 h-10 rounded-full text-[13px] font-semibold inline-flex items-center gap-2">
                    How We Work
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
