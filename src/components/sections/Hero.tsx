"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Play, MapPinned, Database, ShieldCheck } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FDFCF7]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E6F3F3]/40 via-[#FDFCF7] to-[#EFF6FF]/30" />
        <div className="absolute top-0 right-0 w-[70%] h-[70%] bg-gradient-to-bl from-[#0E7C7B]/[0.05] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 py-8 sm:py-10 lg:py-16 items-center">
          {/* Left */}
          <div className="lg:col-span-7 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex flex-wrap items-center gap-2 bg-white border border-[#E2E8F0] rounded-full px-3.5 py-2 shadow-sm max-w-full"
            >
              <span className="w-2 h-2 rounded-full bg-[#0E7C7B] animate-pulse shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-[#0B1930]">Kano-based • Implementation Partner • RC 7341058</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[#64748B] ml-1"><ShieldCheck className="w-3.5 h-3.5" /> Verified</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold tracking-[-0.03em] leading-[0.92] text-[#0B1930] mt-5 sm:mt-6 text-[32px] sm:text-[42px] lg:text-[58px] xl:text-[64px]"
            >
              Bridging Healthcare<br />
              Delivery, <span className="text-[#0E7C7B]">Geospatial</span><br />
              Intelligence <span className="font-light italic text-[#334155]">and</span> Data.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#475569] leading-relaxed mt-5 sm:mt-6 max-w-2xl text-[15px] sm:text-base lg:text-lg"
            >
              We build digital health systems and geospatial solutions that help governments and development partners reach underserved communities, strengthen primary healthcare and make <span className="font-semibold text-[#0B1930]">evidence-driven decisions</span> — settlement by settlement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 mt-7 sm:mt-8"
            >
              <Link href="/capabilities" className="inline-flex items-center justify-center gap-2 bg-[#0B1930] hover:bg-[#132A4C] text-white px-6 sm:px-7 h-[50px] rounded-full text-[13px] font-semibold tracking-wide uppercase shadow-lg shadow-[#0B1930]/10 transition-colors">
                Explore Our Capabilities <ArrowUpRight className="w-4 h-4 shrink-0" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F8FAFC] text-[#0B1930] border border-[#E2E8F0] px-6 sm:px-7 h-[50px] rounded-full text-[13px] font-semibold tracking-wide uppercase transition-colors">
                <Play className="w-4 h-4 shrink-0" /> Discuss a Partnership
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-7 sm:mt-8 flex flex-wrap gap-3 sm:gap-6 text-[12px] sm:text-xs text-[#64748B]"
            >
              <span className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-full px-3 py-1.5"><MapPinned className="w-3.5 h-3.5 text-[#0E7C7B] shrink-0" /> Settlement-level microplanning</span>
              <span className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-full px-3 py-1.5"><Database className="w-3.5 h-3.5 text-[#0E7C7B] shrink-0" /> Facility-level deployment</span>
              <span className="hidden sm:inline-flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-full px-3 py-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#0E7C7B] shrink-0" /> Implementation-verified</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 sm:mt-8 border-l-[3px] border-[#0E7C7B] pl-4 sm:pl-5 py-2 bg-white/60 backdrop-blur rounded-r-2xl"
            >
              <p className="font-display italic text-[#0B1930] text-[13px] sm:text-sm leading-relaxed">&ldquo;A tool that a facility cannot use is not a solution. It is a procurement.&rdquo;</p>
              <p className="text-[10px] sm:text-xs tracking-widest uppercase font-semibold text-[#64748B] mt-1">Our operating philosophy — co-design, always</p>
            </motion.div>
          </div>

          {/* Right - Editorial composition */}
          <div className="lg:col-span-5 min-w-0">
            <div className="relative">
              <div className="relative bg-white rounded-2xl sm:rounded-[28px] overflow-hidden shadow-[0_16px_48px_rgba(11,25,48,0.12)] border border-[#E2E8F0]">
                <div className="aspect-[4/3.1] relative bg-gradient-to-br from-[#0B1930] via-[#0F2540] to-[#0E7C7B] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1586776802477-3680284eda45?q=80&w=1200&auto=format&fit=crop"
                    alt="African healthcare worker using digital tablet for community outreach"
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1930]/85 via-[#0B1930]/15 to-transparent" />
                  
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-auto bg-white/95 backdrop-blur rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-lg sm:max-w-[260px]">
                    <div className="text-[10px] tracking-widest uppercase font-bold text-[#64748B]">Programme</div>
                    <div className="font-display font-bold text-[#0B1930] text-[13px] sm:text-sm leading-tight mt-1">Geo-ST4R — Kano State</div>
                    <div className="text-xs text-[#0E7C7B] font-medium mt-1">Geospatial Microplanning Toolkit</div>
                  </div>

                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-[#0B1930]/90 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-white font-semibold text-[13px] sm:text-sm leading-tight">Settlement-level mapping</div>
                        <div className="text-white/60 text-xs mt-1 leading-tight">Every community visible. No child invisible.</div>
                      </div>
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0E7C7B] flex items-center justify-center shrink-0">
                        <MapPinned className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                      <span className="px-2 sm:px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/10">GMT</span>
                      <span className="px-2 sm:px-2.5 py-1 rounded-full bg-[#0E7C7B] text-white">Illustrative data</span>
                      <span className="ml-auto text-white/50 hidden sm:inline">Kano • Nigeria</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 grid grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <div className="text-[10px] tracking-widest uppercase font-bold text-[#94A3B8]">Partners</div>
                    <div className="text-[11px] sm:text-xs font-medium text-[#0B1930] mt-1 leading-tight">Natview • DSN • Pathfinder</div>
                  </div>
                  <div className="border-l border-[#E2E8F0] pl-3 sm:pl-4">
                    <div className="text-[10px] tracking-widest uppercase font-bold text-[#94A3B8]">Focus</div>
                    <div className="text-[11px] sm:text-xs font-medium text-[#0B1930] mt-1">PHC • RI • Zero-Dose</div>
                  </div>
                  <div className="border-l border-[#E2E8F0] pl-3 sm:pl-4">
                    <div className="text-[10px] tracking-widest uppercase font-bold text-[#94A3B8]">Approach</div>
                    <div className="text-[11px] sm:text-xs font-medium text-[#0E7C7B] mt-1">Co-design → Deploy → Verify</div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block absolute -right-4 top-8 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-4 w-52">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E6F3F3] flex items-center justify-center text-[#0E7C7B] shrink-0">
                    <Database className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#0B1930] leading-tight">Data to Decision</div>
                    <div className="text-[11px] text-[#64748B]">Coverage dashboards</div>
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full w-[72%] bg-[#0E7C7B] rounded-full" />
                </div>
              </div>

              <div className="hidden lg:flex absolute -left-4 bottom-12 bg-[#0B1930] rounded-2xl shadow-xl p-3.5 items-center gap-3">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=100&auto=format&fit=crop" alt="Health worker" className="w-10 h-10 rounded-xl object-cover shrink-0" />
                <div className="min-w-0">
                  <div className="text-white text-xs font-semibold leading-tight">Frontline-trained teams</div>
                  <div className="text-white/60 text-xs">Facility-level implementation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
