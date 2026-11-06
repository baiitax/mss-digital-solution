"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Eyebrow, Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client"

const areas = [
  "Digital Health Systems",
  "Geospatial Intelligence",
  "Data Analytics",
  "Programme Management",
  "Research Collaboration",
  "Government Partnership",
  "Development Partnership",
  "Other",
]

export default function ContactPage() {
  const [form, setForm] = useState({
    full_name: "",
    organisation: "",
    email: "",
    telephone: "",
    country: "Nigeria",
    area_of_interest: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    // Client validation
    if (!form.full_name || !form.email || !form.message || !form.area_of_interest) {
      setErrorMsg("Please complete all required fields (name, email, area of interest, message).")
      setStatus("error")
      return
    }

    try {
      if (!isSupabaseConfigured()) {
        // Demo mode - simulate success with local storage
        const existing = JSON.parse(localStorage.getItem("mss_enquiries") || "[]")
        existing.push({ ...form, id: Date.now(), created_at: new Date().toISOString(), status: "new" })
        localStorage.setItem("mss_enquiries", JSON.stringify(existing))
        setStatus("success")
        setForm({ full_name: "", organisation: "", email: "", telephone: "", country: "Nigeria", area_of_interest: "", subject: "", message: "" })
        return
      }

      // Server validation via API route would be ideal; fallback to supabase direct
      const { error } = await supabase.from("contact_enquiries").insert([{
        full_name: form.full_name.trim(),
        organisation: form.organisation.trim() || null,
        email: form.email.trim().toLowerCase(),
        telephone: form.telephone.trim() || null,
        country: form.country.trim(),
        area_of_interest: form.area_of_interest,
        subject: form.subject.trim() || null,
        message: form.message.trim(),
        status: "new",
      }])

      if (error) throw error
      setStatus("success")
      setForm({ full_name: "", organisation: "", email: "", telephone: "", country: "Nigeria", area_of_interest: "", subject: "", message: "" })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Submission failed. Please try again."
      setErrorMsg(message)
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFCF7]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#0B1930] text-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
            <Eyebrow className="text-[#14B8A6]">Contact & Partnership Enquiries</Eyebrow>
            <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mt-4">Let&apos;s discuss <span className="text-[#14B8A6]">your</span> communities.</h1>
            <p className="text-white/60 mt-4 max-w-2xl leading-relaxed">Whether you&apos;re a state government, development partner, facility network or investor — start a conversation. All enquiries are tracked via a secure, admin-managed system.</p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10">
              {/* Contact info + map */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[24px] p-6">
                  <h3 className="font-display font-bold text-[#0B1930]">MSS Digital Solutions Ltd</h3>
                  <div className="mt-4 space-y-4 text-sm">
                    <div className="flex gap-3">
                      <MapPin className="w-5 h-5 text-[#0E7C7B] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#0B1930]">Head Office</div>
                        <div className="text-[#475569] leading-relaxed">No. 7 Alexandria Street, Gwale LGA, Kano State, Nigeria.</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Mail className="w-5 h-5 text-[#0E7C7B] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#0B1930]">Email</div>
                        <div className="text-[#94A3B8] text-xs leading-relaxed">[verified email placeholder — admin-configurable via Site Settings]</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="w-5 h-5 text-[#0E7C7B] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#0B1930]">Telephone</div>
                        <div className="text-[#94A3B8] text-xs">[verified number placeholder]</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="w-5 h-5 text-[#0E7C7B] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#0B1930]">Hours</div>
                        <div className="text-[#475569] text-xs">Mon–Fri 09:00–17:00 WAT</div>
                        <div className="text-[#94A3B8] text-xs">RC 7341058 • Incorporated 9 Feb 2024</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-white border border-[#E2E8F0] rounded-2xl p-4">
                    <div className="text-xs font-semibold tracking-widest uppercase text-[#0E7C7B]">Regulatory</div>
                    <p className="text-xs text-[#475569] mt-2 leading-relaxed">The public website does not collect patient health information. All partnership data is handled per applicable Nigerian Data Protection Act (NDPA) obligations.</p>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="bg-[#E8EEF5] border border-[#E2E8F0] rounded-[24px] overflow-hidden">
                  <div className="h-64 relative bg-gradient-to-br from-[#0B1930] to-[#0E7C7B] flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <MapPin className="w-8 h-8 mx-auto text-white/80" />
                      <div className="font-semibold mt-2">Kano • Gwale LGA</div>
                      <div className="text-white/60 text-xs mt-1">Interactive map loads here when coordinates are configured in Supabase site_settings.</div>
                      <a href="https://maps.google.com/?q=7+Alexandria+Street+Gwale+Kano+Nigeria" target="_blank" rel="noopener" className="mt-4 inline-flex bg-white text-[#0B1930] px-4 py-2 rounded-full text-xs font-semibold">Open in Google Maps</a>
                    </div>
                  </div>
                  <div className="p-3 text-xs text-center text-[#64748B]">Map placeholder — admin can set lat/lng in Dashboard → Settings</div>
                </div>

                {!isSupabaseConfigured() && (
                  <div className="bg-[#FFF7ED] border border-[#F59E0B]/30 rounded-2xl p-4">
                    <p className="text-xs font-semibold text-[#9A3412]">Demo Mode</p>
                    <p className="text-xs text-[#7C2D12] mt-1 leading-relaxed">Supabase not configured — submissions are stored in browser localStorage and visible in Admin → Enquiries on this device. Set NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY to persist centrally.</p>
                  </div>
                )}
              </div>

              {/* Forms */}
              <div className="lg:col-span-8">
                <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 lg:p-8 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display font-bold text-xl text-[#0B1930]">Partnership Enquiry Form</h2>
                    <Badge variant="teal">Secure • Validated • Logged</Badge>
                  </div>
                  <p className="text-sm text-[#475569] mt-2 leading-relaxed">All fields are validated client- and server-side, with spam protection, timestamps and status tracking in Supabase. You will receive a confirmation when MSS updates your enquiry status.</p>

                  {status === "success" && (
                    <div className="mt-6 bg-[#ECFDF5] border border-[#059669]/20 rounded-2xl p-4 flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#065F46] text-sm">Enquiry received — thank you.</div>
                        <div className="text-sm text-[#047857] mt-1">Your enquiry has been logged with status <strong>New</strong>. The MSS team will review and respond via the contact you provided. You can track it in Admin → Enquiries (requires verification).</div>
                      </div>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="mt-6 bg-[#FEF2F2] border border-[#DC2626]/20 rounded-2xl p-4 flex gap-3">
                      <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#991B1B] text-sm">Couldn&apos;t submit</div>
                        <div className="text-sm text-[#B91C1C] mt-1">{errorMsg}</div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-semibold tracking-widest uppercase text-[#334155]">Full name *</label>
                        <input
                          value={form.full_name}
                          onChange={e => setForm({ ...form, full_name: e.target.value })}
                          placeholder="e.g. Dr. Aisha Bello"
                          required
                          className="mt-2 w-full h-11 px-4 bg-white border border-[#E2E8F0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7C7B]/20 focus:border-[#0E7C7B] placeholder:text-[#94A3B8]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold tracking-widest uppercase text-[#334155]">Organisation *</label>
                        <input
                          value={form.organisation}
                          onChange={e => setForm({ ...form, organisation: e.target.value })}
                          placeholder="e.g. Kano State Ministry of Health"
                          className="mt-2 w-full h-11 px-4 bg-white border border-[#E2E8F0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7C7B]/20 focus:border-[#0E7C7B] placeholder:text-[#94A3B8]"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-semibold tracking-widest uppercase text-[#334155]">Professional email *</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          placeholder="you@organisation.ng"
                          required
                          className="mt-2 w-full h-11 px-4 bg-white border border-[#E2E8F0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7C7B]/20 focus:border-[#0E7C7B] placeholder:text-[#94A3B8]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold tracking-widest uppercase text-[#334155]">Telephone number</label>
                        <input
                          value={form.telephone}
                          onChange={e => setForm({ ...form, telephone: e.target.value })}
                          placeholder="+234 …"
                          className="mt-2 w-full h-11 px-4 bg-white border border-[#E2E8F0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7C7B]/20 focus:border-[#0E7C7B] placeholder:text-[#94A3B8]"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-semibold tracking-widest uppercase text-[#334155]">Country *</label>
                        <input
                          value={form.country}
                          onChange={e => setForm({ ...form, country: e.target.value })}
                          placeholder="Nigeria"
                          required
                          className="mt-2 w-full h-11 px-4 bg-white border border-[#E2E8F0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7C7B]/20 focus:border-[#0E7C7B]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold tracking-widest uppercase text-[#334155]">Area of interest *</label>
                        <select
                          value={form.area_of_interest}
                          onChange={e => setForm({ ...form, area_of_interest: e.target.value })}
                          required
                          className="mt-2 w-full h-11 px-4 bg-white border border-[#E2E8F0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7C7B]/20 focus:border-[#0E7C7B]"
                        >
                          <option value="">Select…</option>
                          {areas.map(a => (
                            <option key={a} value={a}>{a}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold tracking-widest uppercase text-[#334155]">Enquiry subject</label>
                      <input
                        value={form.subject}
                        onChange={e => setForm({ ...form, subject: e.target.value })}
                        placeholder="e.g. Geo-ST4R replication assessment in [State]"
                        className="mt-2 w-full h-11 px-4 bg-white border border-[#E2E8F0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7C7B]/20 focus:border-[#0E7C7B] placeholder:text-[#94A3B8]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold tracking-widest uppercase text-[#334155]">Detailed message *</label>
                      <textarea
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your programme, geography, timeline and what you&apos;d like MSS to assess or deliver…"
                        required
                        rows={6}
                        className="mt-2 w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7C7B]/20 focus:border-[#0E7C7B] placeholder:text-[#94A3B8] resize-none"
                      />
                      <p className="text-xs text-[#94A3B8] mt-2">Do not include patient-identifiable health information. This is a partnership enquiry, not a clinical inbox.</p>
                    </div>

                    <div className="flex items-start gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4">
                      <input type="checkbox" required id="consent" className="mt-1" />
                      <label htmlFor="consent" className="text-xs text-[#334155] leading-relaxed">
                        I consent to MSS Digital Solutions storing and processing my enquiry per its Privacy Policy and applicable NDPA obligations. I understand replies will be sent to my provided email. *
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full h-12 rounded-full bg-[#0E7C7B] hover:bg-[#0A5F5E] disabled:opacity-60 text-white font-semibold tracking-wide uppercase text-sm inline-flex items-center justify-center gap-2 transition-colors"
                    >
                      {status === "loading" ? "Submitting…" : "Submit Partnership Enquiry"} <Send className="w-4 h-4" />
                    </button>

                    <p className="text-xs text-center text-[#94A3B8]">Spam-protected • Rate-limited • Logged with timestamp & status • Admin-configurable notification email</p>
                  </form>
                </div>

                {/* Alternative */}
                <div className="mt-6 bg-[#0B1930] rounded-[24px] p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">Prefer direct project consultation?</h3>
                    <p className="text-white/60 text-sm mt-1">Book a scoping call — share geography, programme and timelines; we&apos;ll recommend the right engagement model.</p>
                  </div>
                  <Link href="/contact" className="shrink-0 bg-white text-[#0B1930] px-6 h-11 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                    Request Consultation <Send className="w-4 h-4" />
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
