"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, MapPinned } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-[#FAF9F7] overflow-hidden">
      {/* subtle background depth */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F9E9EE]/35 via-transparent to-[#F0F1F2]/40" />
        <div className="absolute -top-20 -right-20 w-[60%] h-[70%] bg-[#701F3D]/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative container-mss">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 py-10 sm:py-14 lg:py-16 items-center">
          {/* Left — editorial */}
          <div className="lg:col-span-6 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              Kano-based Implementation Partner • RC 7341058
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="font-bold tracking-[-0.03em] leading-[0.92] text-[#252B31] mt-5"
              style={{ fontSize: "clamp(34px, 5vw, 62px)" }}
            >
              Bridging Healthcare<br />
              Delivery, <span className="text-[#701F3D]">Geospatial</span><br />
              Intelligence <span className="font-light italic text-[#343D46]">and</span> Data.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-[#343D46]/80 leading-relaxed mt-6 max-w-[560px] text-[15px] sm:text-[17px]"
            >
              We build digital health systems and geospatial solutions that help governments and development partners reach underserved communities and strengthen healthcare delivery — settlement by settlement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex flex-col sm:flex-row gap-3 mt-8"
            >
              <Link href="/capabilities" className="inline-flex items-center justify-center gap-2 bg-[#252B31] hover:bg-[#343D46] text-white px-7 h-12 rounded-full text-[13px] font-semibold tracking-[0.06em] uppercase shadow-[0_8px_24px_rgba(16,40,63,0.15)] transition-colors">
                Explore Our Capabilities <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F0F1F2] text-[#252B31] border border-[#E8EAEC] px-7 h-12 rounded-full text-[13px] font-semibold tracking-[0.06em] uppercase transition-colors">
                Partner With Us
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-2.5"
            >
              {[
                "Settlement-level microplanning",
                "Facility-level deployment",
                "Implementation-verified",
              ].map(t => (
                <span key={t} className="inline-flex items-center gap-2 bg-white border border-[#E8EAEC] rounded-full px-3.5 py-1.5 text-xs text-[#343D46]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#701F3D]" /> {t}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 border-l-[3px] border-[#701F3D] pl-5 py-1"
            >
              <p className="font-medium italic text-[#252B31] text-sm leading-relaxed">&ldquo;A tool that a facility cannot use is not a solution. It is a procurement.&rdquo;</p>
              <p className="text-xs tracking-[0.08em] uppercase font-semibold text-[#89929B] mt-1">Operating philosophy — co-design, always</p>
            </motion.div>
          </div>

          {/* Right — premium editorial image with geospatial overlay */}
          <div className="lg:col-span-6 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-[20px] lg:rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(16,40,63,0.12)] border border-[#E8EAEC] p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] lg:rounded-[20px] bg-[#343D46]">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1400&auto=format&fit=crop"
                    alt="Community health worker using tablet in Nigerian primary healthcare"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#343D46]/75 via-[#252B31]/10 to-transparent" />
                  {/* Geospatial overlay lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300" fill="none">
                    <path d="M40 80 L120 60 L180 90 L260 70 L340 110" stroke="#E8A0B8" strokeWidth="1.2" strokeDasharray="6 6" />
                    <circle cx="120" cy="60" r="4" fill="#E8A0B8" stroke="white" strokeWidth="1.5" />
                    <circle cx="260" cy="70" r="4" fill="#E8A0B8" stroke="white" strokeWidth="1.5" />
                    <circle cx="180" cy="90" r="3" fill="white" />
                  </svg>

                  {/* Top label */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 shadow-lg">
                    <div className="text-[10px] tracking-[0.12em] uppercase font-bold text-[#89929B]">Programme</div>
                    <div className="font-bold text-[#252B31] text-sm leading-tight">Geo-ST4R — Kano State</div>
                    <div className="text-xs text-[#701F3D] font-medium">Geospatial Microplanning Toolkit</div>
                  </div>

                  {/* Bottom panel */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-[#343D46]/85 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-white font-semibold text-sm">Settlement-level mapping</div>
                        <div className="text-white/60 text-xs mt-1">Every community visible. No child invisible.</div>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-[#701F3D] flex items-center justify-center shrink-0">
                        <MapPinned className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] border border-white/10">GMT</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#701F3D] text-white text-[11px]">Illustrative data</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 px-2 pt-4 pb-2">
                  <div>
                    <div className="text-[10px] tracking-[0.12em] uppercase font-bold text-[#89929B]">Partners</div>
                    <div className="text-xs font-medium text-[#252B31] mt-1 leading-tight">Natview • DSN • Pathfinder</div>
                  </div>
                  <div className="border-l border-[#E8EAEC] pl-4">
                    <div className="text-[10px] tracking-[0.12em] uppercase font-bold text-[#89929B]">Focus</div>
                    <div className="text-xs font-medium text-[#252B31] mt-1">PHC • RI • Zero-Dose</div>
                  </div>
                  <div className="border-l border-[#E8EAEC] pl-4">
                    <div className="text-[10px] tracking-[0.12em] uppercase font-bold text-[#89929B]">Approach</div>
                    <div className="text-xs font-medium text-[#701F3D] mt-1">Co-design → Deploy → Verify</div>
                  </div>
                </div>
              </div>

              {/* Floating accent — desktop only — illustrative */}
              <div className="hidden xl:block absolute -left-6 -bottom-6 bg-white rounded-2xl shadow-[0_12px_32px_rgba(16,40,63,0.10)] border border-[#E8EAEC] p-4 w-[220px]">
                <div className="text-xs font-bold text-[#252B31]">Data to Decision</div>
                <div className="text-xs text-[#89929B]">Settlement-level mapping</div>
                <div className="mt-3 h-1.5 bg-[#F0F1F2] rounded-full overflow-hidden"><div className="h-full w-[72%] bg-[#701F3D] rounded-full" /></div>
                <div className="mt-2 text-[11px] text-[#89929B]">Illustrative • GMT approach</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
