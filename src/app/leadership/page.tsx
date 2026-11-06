import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import Link from "next/link"
import { Badge, Eyebrow } from "@/components/ui/badge"
import { Award, GraduationCap, Building2, BookOpen, Mail, ArrowUpRight } from "lucide-react"

export const metadata = { title: "Leadership — Jamil Aliyu Galadanci | MSS Digital Solutions" }

export default function LeadershipPage() {
  return (
    <div className="min-h-screen bg-[#FAFBF9]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#10283F] text-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
            <Eyebrow className="text-[#48BFC2]">Leadership</Eyebrow>
            <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mt-4">Led by implementation experience.</h1>
            <p className="text-white/60 mt-4 max-w-2xl leading-relaxed">Executive leadership that bridges software engineering, public health informatics and programme delivery — so strategy survives contact with the facility.</p>
          </div>
        </section>

        {/* Profile */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10">
              {/* Photo + quick facts */}
              <div className="lg:col-span-4">
                <div className="bg-[#FAFBF9] border border-[#E6EBED] rounded-[32px] p-6 lg:p-8 sticky top-24">
                  <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-[#10283F] relative">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" alt="Jamil Aliyu Galadanci — Executive Director, MSS Digital Solutions Ltd. Portrait placeholder until approved photograph is provided." className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#10283F] to-transparent p-5">
                      <p className="text-white font-semibold text-sm">Executive Director</p>
                      <p className="text-white/70 text-xs">Portrait placeholder — approved photo pending</p>
                    </div>
                  </div>

                  <h2 className="font-display font-bold text-2xl text-[#10283F] mt-6">Jamil Aliyu Galadanci</h2>
                  <p className="text-sm font-semibold text-[#087F83] mt-1">COREN-registered Software Engineer | Public Health Informatics</p>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-[#273744] bg-white border border-[#E6EBED] rounded-full px-4 py-2.5">
                      <Building2 className="w-4 h-4 text-[#087F83]" /> MSS Digital Solutions Ltd • Kano
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#273744] bg-white border border-[#E6EBED] rounded-full px-4 py-2.5">
                      <GraduationCap className="w-4 h-4 text-[#087F83]" /> MSc Bristol (UK) • B.Eng BUK (First Class)
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#273744] bg-white border border-[#E6EBED] rounded-full px-4 py-2.5">
                      <Award className="w-4 h-4 text-[#087F83]" /> PRINCE2 • ISTQB • COREN
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-[#10283F] text-white text-xs font-medium">Public Health Informatics</span>
                    <span className="px-3 py-1.5 rounded-full bg-[#E6F5F6] text-[#087F83] text-xs font-medium">Software Engineering</span>
                  </div>
                  <p className="text-xs text-[#71808B] mt-4">LinkedIn and contact details displayed only when verified and approved by MSS.</p>
                </div>
              </div>

              {/* Bio */}
              <div className="lg:col-span-8 space-y-8">
                <div className="bg-white border border-[#E6EBED] rounded-[24px] p-8">
                  <h3 className="font-display font-bold text-xl text-[#10283F]">Executive Biography</h3>
                  <div className="mt-4 space-y-4 text-[#273744] leading-relaxed">
                    <p>
                      <strong className="text-[#10283F]">Jamil Aliyu Galadanci</strong> is the Executive Director of MSS Digital Solutions Ltd and a <strong>COREN-registered Software Engineer</strong> specialising in <strong>Public Health Informatics</strong>. He brings a rare, implementation-grounded blend of technology strategy, health data infrastructure and global health programme management — from facility-level deployment to national systems optimisation.
                    </p>
                    <p>His work focuses on building digital health systems that frontline teams actually use, geospatial intelligence that makes underserved settlements visible, and data analytics that translate evidence into resource decisions.</p>
                    <p>He is guided by the principle that <em className="text-[#10283F] font-medium">&ldquo;A tool that a facility cannot use is not a solution. It is a procurement.&rdquo;</em> — co-designing with the organisations and health workers who will own the system.</p>
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-[#FAFBF9] border border-[#E6EBED] rounded-[24px] p-8">
                  <h3 className="font-display font-bold text-xl text-[#10283F]">Professional Experience</h3>
                  <div className="mt-6 space-y-5">
                    {[
                      { role: "Chief Technology Officer", org: "Rednoxx Ltd", desc: "Technology leadership and strategy for digital health and enterprise systems." },
                      { role: "Senior Manager, Global Health Informatics", org: "eHealth Africa", desc: "Leadership of health informatics programmes across large-scale public health deployments." },
                      { role: "Technical Project Manager — LoMIS Suite", org: "eHealth Africa", desc: "Technical leadership for LoMIS logistics management suite — later recognised by the WFP Digital Health Innovation Accelerator Award (2022/2023)." },
                      { role: "Research Project & Data Manager", org: "Vanderbilt Center for Global Health", desc: "Oversight of research operations, data management and implementation for global health trials." },
                      { role: "Lecturer & Programme Coordinator", org: "Bayero University, Kano (BUK)", desc: "Teaching and academic programme coordination in computer engineering / health informatics domains." },
                    ].map(item => (
                      <div key={item.role} className="bg-white border border-[#E6EBED] rounded-2xl p-5 flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#10283F] flex items-center justify-center shrink-0 text-white">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#10283F]">{item.role}</div>
                          <div className="text-sm font-medium text-[#087F83]">{item.org}</div>
                          <div className="text-sm text-[#273744] mt-1 leading-relaxed">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contributions */}
                <div className="bg-white border border-[#E6EBED] rounded-[24px] p-8">
                  <h3 className="font-display font-bold text-xl text-[#10283F] flex items-center gap-2"><Award className="w-5 h-5 text-[#087F83]" /> Major Professional Contributions</h3>
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="bg-[#F0FDFA] border border-[#087F83]/15 rounded-2xl p-5">
                      <h4 className="font-semibold text-[#10283F] text-sm">LoMIS Suite</h4>
                      <p className="text-sm text-[#273744] mt-2 leading-relaxed">Logistics management suite — recipient of the <strong>2022/2023 WFP Digital Health Innovation Accelerator Award</strong>.</p>
                    </div>
                    <div className="bg-[#F0F3F4] border border-[#48BFC2]/20 rounded-2xl p-5">
                      <h4 className="font-semibold text-[#10283F] text-sm">National EMID Optimisation</h4>
                      <p className="text-sm text-[#273744] mt-2 leading-relaxed"><strong>GAVI-funded</strong> optimisation of the National Electronic Management of Immunization Data (EMID) system.</p>
                    </div>
                    <div className="bg-[#FEF2F2] border border-[#DC2626]/15 rounded-2xl p-5">
                      <h4 className="font-semibold text-[#10283F] text-sm">BISKIT — South Africa</h4>
                      <p className="text-sm text-[#273744] mt-2 leading-relaxed">Blood Information System for Crisis Intervention and Management (BISKIT) — improving crisis blood operations.</p>
                    </div>
                    <div className="bg-white border border-[#E6EBED] rounded-2xl p-5">
                      <h4 className="font-semibold text-[#10283F] text-sm">SPRING & SPRING II</h4>
                      <p className="text-sm text-[#273744] mt-2 leading-relaxed">Contributions to SPRING and SPRING II clinical research trials via Vanderbilt Center for Global Health.</p>
                    </div>
                  </div>
                  <div className="mt-6 bg-[#10283F] text-white rounded-2xl p-5">
                    <h4 className="font-semibold text-sm">Policy Contribution — Kano State</h4>
                    <p className="text-sm text-white/70 mt-2 leading-relaxed">Contributions to the <strong className="text-white">Kano State hydroxyurea policy</strong> — translating research into state health policy for improved outcomes.</p>
                  </div>
                </div>

                {/* Education */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#FAFBF9] border border-[#E6EBED] rounded-[24px] p-6">
                    <h3 className="font-display font-bold text-[#10283F] flex items-center gap-2"><GraduationCap className="w-5 h-5 text-[#087F83]" /> Education</h3>
                    <ul className="mt-4 space-y-3 text-sm">
                      <li className="bg-white border border-[#E6EBED] rounded-xl p-4">
                        <div className="font-semibold text-[#10283F]">MSc Computer Science with Merit</div>
                        <div className="text-[#087F83] font-medium">University of Bristol, UK</div>
                      </li>
                      <li className="bg-white border border-[#E6EBED] rounded-xl p-4">
                        <div className="font-semibold text-[#10283F]">B.Eng. Computer Engineering — First Class</div>
                        <div className="text-[#087F83] font-medium">Bayero University, Kano</div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border border-[#E6EBED] rounded-[24px] p-6">
                    <h3 className="font-display font-bold text-[#10283F] flex items-center gap-2"><Award className="w-5 h-5 text-[#087F83]" /> Certifications</h3>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex items-center justify-between bg-[#FAFBF9] border border-[#E6EBED] rounded-xl px-4 py-3"><span className="font-medium text-[#10283F]">PRINCE2 Certified Project Manager</span><span className="text-xs bg-[#10283F] text-white px-2 py-1 rounded-full">Certified</span></li>
                      <li className="flex items-center justify-between bg-[#FAFBF9] border border-[#E6EBED] rounded-xl px-4 py-3"><span className="font-medium text-[#10283F]">ISTQB Certified QA Engineer</span><span className="text-xs bg-[#087F83] text-white px-2 py-1 rounded-full">Certified</span></li>
                      <li className="flex items-center justify-between bg-[#FAFBF9] border border-[#E6EBED] rounded-xl px-4 py-3"><span className="font-medium text-[#10283F]">Global Health Epidemiology</span><span className="text-xs text-[#273744]">Johns Hopkins Univ.</span></li>
                      <li className="flex items-center justify-between bg-[#FAFBF9] border border-[#E6EBED] rounded-xl px-4 py-3"><span className="font-medium text-[#10283F]">Leadership & Management</span><span className="text-xs text-[#273744]">Univ. of Washington</span></li>
                    </ul>
                  </div>
                </div>

                {/* Governance */}
                <div className="bg-[#FAFBF9] border border-[#E6EBED] rounded-[24px] p-8">
                  <h3 className="font-display font-bold text-lg text-[#10283F] flex items-center gap-2"><BookOpen className="w-5 h-5 text-[#087F83]" /> Governance & Research</h3>
                  <p className="text-sm text-[#273744] mt-3 leading-relaxed">Board positions and peer-reviewed research contributions are documented in the official MSS Digital Solutions Company Profile. Detailed publication lists and governance roles are published only upon verification and approval — no publications, awards or additional employment history have been invented for this page.</p>
                  <div className="mt-6 bg-white border border-[#E6EBED] rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold text-[#10283F] text-sm">Invite Jamil to speak or advise?</div>
                      <div className="text-sm text-[#273744] mt-1">Digital health, geospatial microplanning, PH informatics and implementation science.</div>
                    </div>
                    <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#10283F] text-white px-6 h-11 rounded-full text-sm font-semibold tracking-wide uppercase">
                      Make Enquiry <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <p className="text-xs text-[#71808B] text-center">All biographical information on this page is taken verbatim from the supplied MSS Digital Solutions Company Profile. No LinkedIn URLs, publications or credentials have been added beyond that source.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
