import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import Image from "next/image"
import Link from "next/link"
import { Award, GraduationCap, Building2, BookOpen, ArrowUpRight, Quote, MapPin, Shield } from "lucide-react"

export const metadata = { title: "Leadership — Jamil Aliyu Galadanci | MSS Digital Solutions" }

export default function LeadershipPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />
      <main>
        <section className="bg-[#343D46] text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#701F3D]/12 via-transparent to-[#252B31]/60" />
            <div className="absolute -top-24 -right-24 w-[48%] h-[70%] bg-[#E8A0B8]/[0.06] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          </div>
          <div className="relative container-mss py-12 sm:py-16">
            <div className="mb-5"><Breadcrumbs items={[{ label: "Leadership" }]} /></div>
            <div className="max-w-[880px]">
              <div className="eyebrow !text-[#E8A0B8] before:!bg-[#E8A0B8]">Leadership • Implementation experience</div>
              <h1 className="font-bold tracking-[-0.03em] leading-[0.95] mt-4 text-white" style={{ fontSize: "clamp(30px, 4vw, 52px)" }}>Led by implementation<br />experience, not slideware.</h1>
              <p className="text-white/60 mt-4 max-w-2xl leading-relaxed text-[15px] sm:text-[16px]">Executive leadership that bridges software engineering, public health informatics and programme delivery — so strategy survives contact with the facility.</p>
              <div className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase font-semibold text-white/60">
                <MapPin className="w-3.5 h-3.5 text-[#E8A0B8]" /> Kano • Global Health Informatics • Software Engineering
              </div>
            </div>
          </div>
        </section>

        <section className="section-y bg-white">
          <div className="container-mss">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-4">
                <div className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-[20px] p-5 sm:p-6 lg:sticky lg:top-[88px]">
                  <div className="aspect-[4/5] rounded-[16px] overflow-hidden bg-[#252B31] relative shadow-card">
                    <Image src="/images/leadership/jamil-aliu-galadanci.jpg" alt="Jamil Aliyu Galadanci — Executive Director, MSS Digital Solutions Ltd" width={640} height={800} sizes="(max-width: 1024px) 40vw, 240px" className="w-full h-full object-cover object-top" />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#343D46] via-[#343D46]/60 to-transparent p-5">
                      <p className="text-white font-semibold text-[13px]">Executive Director</p>
                      <p className="text-white/60 text-[11px]">MSS Digital Solutions Ltd • Kano</p>
                    </div>
                  </div>
                  <h2 className="font-bold text-[22px] tracking-tight text-[#252B31] mt-5">Jamil Aliyu Galadanci</h2>
                  <p className="text-[12px] font-semibold text-[#701F3D] mt-1 leading-snug">COREN-registered Software Engineer • Public Health Informatics</p>
                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-center gap-3 text-[12.5px] text-[#343D46] bg-white border border-[#E8EAEC] rounded-full px-4 py-2.5">
                      <Building2 className="w-4 h-4 text-[#701F3D] shrink-0" /> MSS Digital Solutions Ltd • Kano
                    </div>
                    <div className="flex items-center gap-3 text-[12.5px] text-[#343D46] bg-white border border-[#E8EAEC] rounded-full px-4 py-2.5">
                      <GraduationCap className="w-4 h-4 text-[#701F3D] shrink-0" /> MSc Bristol (UK) • B.Eng BUK (First Class)
                    </div>
                    <div className="flex items-center gap-3 text-[12.5px] text-[#343D46] bg-white border border-[#E8EAEC] rounded-full px-4 py-2.5">
                      <Award className="w-4 h-4 text-[#701F3D] shrink-0" /> PRINCE2 • ISTQB • COREN
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-[#252B31] text-white text-[11px] font-medium">Public Health Informatics</span>
                    <span className="px-3 py-1.5 rounded-full bg-[#F9E9EE] border border-[#701F3D]/15 text-[#701F3D] text-[11px] font-medium">Software Engineering</span>
                  </div>
                  <p className="text-[11px] text-[#89929B] mt-4 leading-relaxed">LinkedIn and contact details displayed only when verified and approved by MSS.</p>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white border border-[#E8EAEC] rounded-[20px] p-6 sm:p-8 shadow-card">
                  <div className="eyebrow">Executive Biography</div>
                  <div className="mt-4 space-y-4 text-[#343D46] leading-relaxed text-[14px]">
                    <p><strong className="text-[#252B31]">Jamil Aliyu Galadanci</strong> is the Executive Director of MSS Digital Solutions Ltd and a <strong>COREN-registered Software Engineer</strong> specialising in <strong>Public Health Informatics</strong>. He brings a rare, implementation-grounded blend of technology strategy, health data infrastructure and global health programme management.</p>
                    <p>His work focuses on building digital health systems that frontline teams actually use, geospatial intelligence that makes underserved settlements visible, and data analytics that translate evidence into resource decisions.</p>
                    <div className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-2xl p-5 flex gap-3">
                      <Quote className="w-5 h-5 text-[#701F3D]/50 shrink-0 mt-0.5" />
                      <p className="font-medium italic text-[#252B31] text-[14px] leading-relaxed">&ldquo;A tool that a facility cannot use is not a solution. It is a procurement.&rdquo; — co-designing with the organisations and health workers who will own the system.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-[20px] p-6 sm:p-8">
                  <h3 className="font-bold text-[#252B31] text-[16px]">Professional Experience</h3>
                  <div className="mt-6 space-y-3">
                    {[
                      { role: "Chief Technology Officer", org: "Rednoxx Ltd", desc: "Technology leadership and strategy for digital health and enterprise systems." },
                      { role: "Senior Manager, Global Health Informatics", org: "eHealth Africa", desc: "Leadership of health informatics programmes across large-scale public health deployments." },
                      { role: "Technical Project Manager — LoMIS Suite", org: "eHealth Africa", desc: "LoMIS logistics management suite — recipient of WFP Digital Health Innovation Accelerator Award (2022/2023)." },
                      { role: "Research Project & Data Manager", org: "Vanderbilt Center for Global Health", desc: "Oversight of research operations, data management and implementation for global health trials." },
                      { role: "Lecturer & Programme Coordinator", org: "Bayero University, Kano (BUK)", desc: "Teaching and academic programme coordination in computer engineering / health informatics." },
                    ].map(item => (
                      <div key={item.role} className="bg-white border border-[#E8EAEC] rounded-2xl p-5 flex gap-4 hover:border-[#701F3D]/20 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-[#252B31] flex items-center justify-center shrink-0 text-white"><Building2 className="w-4 h-4" /></div>
                        <div>
                          <div className="font-bold text-[#252B31] text-[13px]">{item.role}</div>
                          <div className="text-[12px] font-semibold text-[#701F3D]">{item.org}</div>
                          <div className="text-[12.5px] text-[#343D46]/70 mt-1 leading-relaxed">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-[#E8EAEC] rounded-[20px] p-6 sm:p-8">
                  <h3 className="font-bold text-[#252B31] flex items-center gap-2 text-[16px]"><Award className="w-5 h-5 text-[#701F3D]" /> Major Contributions</h3>
                  <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    <div className="bg-[#F9E9EE] border border-[#701F3D]/15 rounded-2xl p-5">
                      <h4 className="font-bold text-[#252B31] text-[13px]">LoMIS Suite</h4>
                      <p className="text-[12.5px] text-[#343D46]/70 mt-2 leading-relaxed"><strong>WFP Digital Health Innovation Accelerator Award</strong> 2022/2023.</p>
                    </div>
                    <div className="bg-[#F0F1F2] border border-[#E8A0B8]/20 rounded-2xl p-5">
                      <h4 className="font-bold text-[#252B31] text-[13px]">National EMID Optimisation</h4>
                      <p className="text-[12.5px] text-[#343D46]/70 mt-2 leading-relaxed"><strong>GAVI-funded</strong> optimisation of National EMID system.</p>
                    </div>
                    <div className="bg-[#FFF7ED] border border-[#F59E0B]/15 rounded-2xl p-5">
                      <h4 className="font-bold text-[#252B31] text-[13px]">BISKIT — South Africa</h4>
                      <p className="text-[12.5px] text-[#343D46]/70 mt-2 leading-relaxed">Blood Information System for Crisis Intervention and Management.</p>
                    </div>
                    <div className="bg-white border border-[#E8EAEC] rounded-2xl p-5">
                      <h4 className="font-bold text-[#252B31] text-[13px]">SPRING & SPRING II</h4>
                      <p className="text-[12.5px] text-[#343D46]/70 mt-2 leading-relaxed">Clinical research trials via Vanderbilt Center for Global Health.</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-[#252B31] text-white rounded-2xl p-5 flex gap-3">
                    <Shield className="w-5 h-5 text-[#E8A0B8] shrink-0" />
                    <p className="text-[12.5px] text-white/70 leading-relaxed"><strong className="text-white">Kano State hydroxyurea policy</strong> — translating research into state health policy for improved outcomes.</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-[20px] p-6">
                    <h3 className="font-bold text-[#252B31] flex items-center gap-2 text-[14px]"><GraduationCap className="w-4 h-4 text-[#701F3D]" /> Education</h3>
                    <div className="mt-4 space-y-3">
                      <div className="bg-white border border-[#E8EAEC] rounded-xl p-4"><div className="font-bold text-[#252B31] text-[13px]">MSc Computer Science with Merit</div><div className="text-[#701F3D] font-medium text-[12px]">University of Bristol, UK</div></div>
                      <div className="bg-white border border-[#E8EAEC] rounded-xl p-4"><div className="font-bold text-[#252B31] text-[13px]">B.Eng. Computer Engineering — First Class</div><div className="text-[#701F3D] font-medium text-[12px]">Bayero University, Kano</div></div>
                    </div>
                  </div>
                  <div className="bg-white border border-[#E8EAEC] rounded-[20px] p-6">
                    <h3 className="font-bold text-[#252B31] flex items-center gap-2 text-[14px]"><Award className="w-4 h-4 text-[#701F3D]" /> Certifications</h3>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between bg-[#FAF9F7] border border-[#E8EAEC] rounded-xl px-4 py-3"><span className="font-medium text-[#252B31] text-[12.5px]">PRINCE2 Certified</span><span className="text-[11px] bg-[#252B31] text-white px-2 py-1 rounded-full">Certified</span></div>
                      <div className="flex items-center justify-between bg-[#FAF9F7] border border-[#E8EAEC] rounded-xl px-4 py-3"><span className="font-medium text-[#252B31] text-[12.5px]">ISTQB QA Engineer</span><span className="text-[11px] bg-[#701F3D] text-white px-2 py-1 rounded-full">Certified</span></div>
                      <div className="flex items-center justify-between bg-[#FAF9F7] border border-[#E8EAEC] rounded-xl px-4 py-3"><span className="font-medium text-[#252B31] text-[12.5px]">Global Health Epidemiology</span><span className="text-[11px] text-[#89929B]">Johns Hopkins</span></div>
                      <div className="flex items-center justify-between bg-[#FAF9F7] border border-[#E8EAEC] rounded-xl px-4 py-3"><span className="font-medium text-[#252B31] text-[12.5px]">Leadership & Management</span><span className="text-[11px] text-[#89929B]">U. of Washington</span></div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF9F7] border border-[#E8EAEC] rounded-[20px] p-6 sm:p-7">
                  <h3 className="font-bold text-[#252B31] flex items-center gap-2 text-[15px]"><BookOpen className="w-4 h-4 text-[#701F3D]" /> Governance & Research</h3>
                  <p className="text-[13px] text-[#343D46]/70 mt-3 leading-relaxed">Board positions and peer-reviewed research contributions are documented in the official MSS Company Profile. Publication lists and governance roles are published only upon verification — no publications, awards or employment history have been invented.</p>
                  <div className="mt-6 bg-white border border-[#E8EAEC] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div><div className="font-bold text-[#252B31] text-[13px]">Invite Jamil to speak or advise</div><div className="text-[12px] text-[#343D46]/60 mt-1">Digital health, geospatial microplanning, PH informatics.</div></div>
                    <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#252B31] text-white px-6 h-10 rounded-full text-[12px] font-semibold tracking-[0.06em] uppercase hover:bg-[#343D46] transition-colors">Make Enquiry <ArrowUpRight className="w-4 h-4" /></Link>
                  </div>
                </div>
                <p className="text-[11px] text-[#89929B] text-center">All biographical information is taken verbatim from the supplied MSS Company Profile.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
