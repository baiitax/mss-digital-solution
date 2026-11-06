"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Play, MapPinned, Database, ShieldCheck } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FDFCF7]">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E6F3F3]/40 via-[#FDFCF7] to-[#EFF6FF]/30" />
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-to-bl from-[#0E7C7B]/[0.04] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 py-10 lg:py-16 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-full px-3 py-1.5 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#0E7C7B] animate-pulse" />
              <span className="text-xs font-semibold tracking-wide uppercase text-[#0B1930]">Kano-based • Implementation Partner • RC 7341058</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[#64748B] ml-1"><ShieldCheck className="w-3.5 h-3.5" /> Verified</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold tracking-[-0.03em] leading-[0.9] text-[#0B1930] mt-6 text-4xl sm:text-5xl lg:text-[64px]"
            >
              Bridging Healthcare<br />
              Delivery, <span className="text-[#0E7C7B]">Geospatial</span><br />
              Intelligence <span className="font-light italic text-[#334155]">and</span> Data.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#475569] leading-relaxed mt-6 max-w-2xl text-base lg:text-lg"
            >
              We build digital health systems and geospatial solutions that help governments and development partners reach underserved communities, strengthen primary healthcare and make <span className="font-semibold text-[#0B1930]">evidence-driven decisions</span> — settlement by settlement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 mt-8"
            >
              <Link href="/capabilities" className="inline-flex items-center gap-2 bg-[#0B1930] hover:bg-[#132A4C] text-white px-7 h-12 rounded-full text-sm font-semibold tracking-wide uppercase shadow-lg shadow-[#0B1930]/10 transition-colors">
                Explore Our Capabilities <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white hover:bg-[#F8FAFC] text-[#0B1930] border border-[#E2E8F0] px-7 h-12 rounded-full text-sm font-semibold tracking-wide uppercase transition-colors">
                <Play className="w-4 h-4" /> Discuss a Partnership
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-6 text-xs text-[#64748B]"
            >
              <span className="flex items-center gap-2"><MapPinned className="w-4 h-4 text-[#0E7C7B]" /> Settlement-level microplanning</span>
              <span className="flex items-center gap-2"><Database className="w-4 h-4 text-[#0E7C7B]" /> Facility-level deployment</span>
              <span className="hidden sm:flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#0E7C7B]" /> Implementation-verified</span>
            </motion.div>

            {/* Philosophy quote */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 border-l-2 border-[#0E7C7B] pl-5 py-2"
            >
              <p className="font-display italic text-[#0B1930] text-sm leading-relaxed">&ldquo;A tool that a facility cannot use is not a solution. It is a procurement.&rdquo;</p>
              <p className="text-xs tracking-widest uppercase font-semibold text-[#64748B] mt-1">Our operating philosophy — co-design, always</p>
            </motion.div>
          </div>

          {/* Right - Editorial composition */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Main image card */}
              <div className="relative bg-white rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(11,25,48,0.12)] border border-[#E2E8F0]">
                <div className="aspect-[4/3.2] relative bg-gradient-to-br from-[#0B1930] via-[#0F2540] to-[#0E7C7B] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1586776802477-3680284eda45?q=80&w=1200&auto=format&fit=crop"
                    alt="African healthcare worker using digital tablet for community outreach"
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1930]/80 via-[#0B1930]/10 to-transparent" />
                  
                  {/* Floating stats */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-2xl px-4 py-3 shadow-lg">
                    <div className="text-[11px] tracking-widest uppercase font-bold text-[#64748B]">Programme</div>
                    <div className="font-display font-bold text-[#0B1930] text-sm leading-none mt-1">Geo-ST4R — Kano State</div>
                    <div className="text-xs text-[#0E7C7B] font-medium mt-1">Geospatial Microplanning Toolkit</div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-[#0B1930]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold text-sm">Settlement-level mapping</div>
                        <div className="text-white/60 text-xs mt-1">Every community visible. No child invisible.</div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#0E7C7B] flex items-center justify-center shrink-0">
                        <MapPinned className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/10">GMT</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#0E7C7B] text-white">Illustrative data</span>
                      <span className="ml-auto text-white/50">Kano • Nigeria</span>
                    </div>
                  </div>
                </div>

                {/* Bottom meta */}
                <div className="p-5 grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-[11px] tracking-widest uppercase font-bold text-[#94A3B8]">Partners</div>
                    <div className="text-xs font-medium text-[#0B1930] mt-1 leading-tight">Natview • Data Science Network • Pathfinder</div>
                  </div>
                  <div className="border-l border-[#E2E8F0] pl-4">
                    <div className="text-[11px] tracking-widest uppercase font-bold text-[#94A3B8]">Focus</div>
                    <div className="text-xs font-medium text-[#0B1930] mt-1">PHC • RI • Zero-Dose</div>
                  </div>
                  <div className="border-l border-[#E2E8F0] pl-4">
                    <div className="text-[11px] tracking-widest uppercase font-bold text-[#94A3B8]">Approach</div>
                    <div className="text-xs font-medium text-[#0E7C7B] mt-1">Co-design → Deploy → Verify</div>
                  </div>
                </div>
              </div>

              {/* Floating secondary cards */}
              <div className="hidden lg:block absolute -right-6 top-10 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-4 w-56">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E6F3F3] flex items-center justify-center text-[#0E7C7B]">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1930]">Data to Decision</div>
                    <div className="text-[11px] text-[#64748B]">Coverage dashboards</div>
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full w-[72%] bg-[#0E7C7B] rounded-full" />
                </div>
              </div>

              <div className="hidden lg:flex absolute -left-6 bottom-16 bg-[#0B1930] rounded-2xl shadow-xl p-4 items-center gap-3">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=100&auto=format&fit=crop" alt="Health worker" className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <div className="text-white text-xs font-semibold">Frontline-trained teams</div>
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
