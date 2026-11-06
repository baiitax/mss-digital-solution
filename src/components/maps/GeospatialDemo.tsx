"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Layers, MapPin, Users, Crosshair, Eye, EyeOff } from "lucide-react"

type Settlement = { id: number; x: number; y: number; type: "settlement"; reached: boolean; name: string }
type Facility = { id: number; x: number; y: number; type: "facility"; name: string }

const settlements: Settlement[] = Array.from({ length: 84 }, (_, i) => ({
  id: i,
  x: 8 + Math.random() * 84,
  y: 10 + Math.random() * 78,
  type: "settlement",
  reached: Math.random() > 0.32,
  name: `Settlement ${String(i+1).padStart(3, "0")}`
}))

const facilities: Facility[] = [
  { id: 1, x: 22, y: 28, type: "facility", name: "Gwale PHC" },
  { id: 2, x: 68, y: 35, type: "facility", name: "Dala Health Centre" },
  { id: 3, x: 45, y: 65, type: "facility", name: "Kumbotso PHC" },
  { id: 4, x: 78, y: 72, type: "facility", name: "Tarauni Clinic" },
  { id: 5, x: 35, y: 48, type: "facility", name: "Nassarawa Maternity" },
  { id: 6, x: 58, y: 22, type: "facility", name: "Fagge Disp." },
]

export function GeospatialDemo({ compact = false }: { compact?: boolean }) {
  const [showReached, setShowReached] = useState(true)
  const [showUnreached, setShowUnreached] = useState(true)
  const [showFacilities, setShowFacilities] = useState(true)
  const [showCatchments, setShowCatchments] = useState(true)
  const [hovered, setHovered] = useState<Settlement | Facility | null>(null)

  const reachedCount = settlements.filter(s => s.reached).length
  const unreachedCount = settlements.filter(s => !s.reached).length
  const facilityCount = facilities.length

  return (
    <div className="bg-white rounded-2xl sm:rounded-[24px] border border-[#E2E8F0] overflow-hidden shadow-[0_8px_40px_rgba(11,25,48,0.06)]">
      {/* Header - stack on mobile */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-[#E2E8F0] flex flex-col gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#0B1930] flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-semibold text-[#0B1930] leading-tight text-sm sm:text-base">Geospatial Microplanning — Illustrative Demo</h3>
            <p className="text-[11px] sm:text-xs text-[#64748B] mt-1 leading-snug">Kano State • Settlement & facility layers • <span className="font-medium text-[#0E7C7B]">Synthetic data — not operational GMT data</span></p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setShowCatchments(!showCatchments)} className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-colors ${showCatchments ? "bg-[#0B1930] text-white border-[#0B1930]" : "bg-white text-[#64748B] border-[#E2E8F0]"}`}>
            <Crosshair className="w-3.5 h-3.5 shrink-0" /> Catchments {showCatchments ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          </button>
          <button onClick={() => setShowFacilities(!showFacilities)} className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-colors ${showFacilities ? "bg-[#0E7C7B] text-white border-[#0E7C7B]" : "bg-white text-[#64748B] border-[#E2E8F0]"}`}>
            <MapPin className="w-3.5 h-3.5 shrink-0" /> Facilities
          </button>
          <button onClick={() => setShowUnreached(!showUnreached)} className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-colors ${showUnreached ? "bg-[#DC2626] text-white border-[#DC2626]" : "bg-white text-[#64748B] border-[#E2E8F0]"}`}>
            <Users className="w-3.5 h-3.5 shrink-0" /> Unreached
          </button>
          <button onClick={() => setShowReached(!showReached)} className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-colors ${showReached ? "bg-[#059669] text-white border-[#059669]" : "bg-white text-[#64748B] border-[#E2E8F0]"}`}>
            Reached
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-0">
        {/* Map */}
        <div className={`relative bg-[#F8FAFC] p-3 sm:p-4 lg:p-6 ${compact ? "min-h-[420px]" : "min-h-[480px] sm:min-h-[520px]"}`}>
          <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] bg-[#E8EEF5] rounded-xl sm:rounded-2xl overflow-hidden border border-[#E2E8F0]">
            {/* Grid */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `linear-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(90deg, #CBD5E1 1px, transparent 1px)`,
              backgroundSize: "24px 24px"
            }} />
            <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF]/60 via-transparent to-[#F0FDF4]/40" />

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path d="M 20% 15% L 55% 10% L 85% 25% L 80% 80% L 30% 85% L 12% 55% Z" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.5" />
              <path d="M 20% 15% L 45% 40% L 30% 85%" fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <text x="50%" y="12%" textAnchor="middle" fontSize="9" fill="#64748B" fontWeight="600">KANO STATE — ILLUSTRATIVE EXTENT</text>
            </svg>

            {showCatchments && showFacilities && facilities.map(f => (
              <div
                key={`catch-${f.id}`}
                className="absolute rounded-full border-2 border-[#0E7C7B]/25 bg-[#0E7C7B]/[0.06] pointer-events-none"
                style={{
                  left: `${f.x}%`,
                  top: `${f.y}%`,
                  width: "18%",
                  height: "22%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}

            {settlements.map(s => {
              if (s.reached && !showReached) return null
              if (!s.reached && !showUnreached) return null
              return (
                <button
                  key={s.id}
                  onMouseEnter={() => setHovered(s)}
                  onMouseLeave={() => setHovered(null)}
                  onTouchStart={() => setHovered(s)}
                  className={`absolute w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm hover:scale-150 transition-transform cursor-pointer ${s.reached ? "bg-[#059669]" : "bg-[#DC2626] animate-pulse"}`}
                  style={{ left: `${s.x}%`, top: `${s.y}%`, transform: "translate(-50%, -50%)" }}
                  aria-label={s.name}
                />
              )
            })}

            {showFacilities && facilities.map(f => (
              <button
                key={f.id}
                onMouseEnter={() => setHovered(f)}
                onMouseLeave={() => setHovered(null)}
                className="absolute w-6 h-6 sm:w-7 sm:h-7 -ml-3 -mt-3 sm:-ml-3.5 sm:-mt-3.5 bg-[#0B1930] rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer z-10"
                style={{ left: `${f.x}%`, top: `${f.y}%` }}
              >
                <span className="text-[7px] sm:text-[8px] font-bold text-white">+</span>
              </button>
            ))}

            {hovered && (
              <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-[260px] bg-[#0B1930] text-white text-xs px-3 py-2.5 rounded-xl shadow-xl pointer-events-none z-20">
                <div className="font-semibold leading-tight">{hovered.name}</div>
                <div className="text-white/70 text-[11px] leading-snug mt-1">{hovered.type === "facility" ? "Health Facility • Catchment hub" : (hovered as Settlement).reached ? "Reached settlement • GMT-verified" : "Unreached • Priority for microplanning"}</div>
              </div>
            )}

            <div className="absolute top-3 right-3 flex flex-col gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#64748B] text-sm font-bold">+</div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#64748B] text-sm font-bold">−</div>
            </div>

            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white/90 backdrop-blur px-2 sm:px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-medium tracking-wide text-[#64748B] border border-[#E2E8F0]">
              © Illustrative • Not operational data
            </div>
          </div>

          {/* Stats bar - responsive */}
          <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-2.5 sm:p-3 text-center">
              <div className="text-[9px] sm:text-[11px] tracking-widest uppercase font-semibold text-[#64748B] leading-tight">Facilities</div>
              <div className="font-display text-lg sm:text-xl font-bold text-[#0B1930] leading-none mt-1">{facilityCount}</div>
              <div className="text-[10px] sm:text-[11px] text-[#94A3B8] leading-tight">catchment hubs</div>
            </div>
            <div className="bg-[#ECFDF5] rounded-xl border border-[#059669]/20 p-2.5 sm:p-3 text-center">
              <div className="text-[9px] sm:text-[11px] tracking-widest uppercase font-semibold text-[#059669] leading-tight">Reached</div>
              <div className="font-display text-lg sm:text-xl font-bold text-[#059669] leading-none mt-1">{reachedCount}</div>
              <div className="text-[10px] sm:text-[11px] text-[#059669]/70 leading-tight">settlements</div>
            </div>
            <div className="bg-[#FEF2F2] rounded-xl border border-[#DC2626]/20 p-2.5 sm:p-3 text-center">
              <div className="text-[9px] sm:text-[11px] tracking-widest uppercase font-semibold text-[#DC2626] leading-tight">Unreached</div>
              <div className="font-display text-lg sm:text-xl font-bold text-[#DC2626] leading-none mt-1">{unreachedCount}</div>
              <div className="text-[10px] sm:text-[11px] text-[#DC2626]/70 leading-tight">priority</div>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="border-t lg:border-t-0 lg:border-l border-[#E2E8F0] bg-white p-4 sm:p-6 space-y-5 sm:space-y-6">
          <div>
            <h4 className="font-display font-semibold text-sm text-[#0B1930]">What the map shows</h4>
            <p className="text-xs sm:text-xs leading-relaxed text-[#64748B] mt-2">
              Traditional microplanning uses estimated catchment populations. GMT uses <strong className="text-[#0B1930]">mapped settlement locations</strong> so teams plan against real geography — not assumptions.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-[11px] tracking-widest uppercase font-bold text-[#0B1930]">Legend — Illustrative Layers</h5>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-3">
                <span className="w-3 h-3 rounded-full bg-[#0B1930] border-2 border-white shadow-sm shrink-0 mt-0.5" />
                <span className="text-[#334155] leading-snug"><strong>Health facility</strong> — session planning hub</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-3 h-3 rounded-full bg-[#059669] border-2 border-white shadow-sm shrink-0 mt-0.5" />
                <span className="text-[#334155] leading-snug"><strong>Reached</strong> — has scheduled outreach</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-3 h-3 rounded-full bg-[#DC2626] border-2 border-white shadow-sm animate-pulse shrink-0 mt-0.5" />
                <span className="text-[#334155] leading-snug"><strong>Unreached</strong> — gap, prioritise microplan</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full border-2 border-[#0E7C7B]/30 bg-[#0E7C7B]/10 shrink-0" />
                <span className="text-[#334155] leading-snug"><strong>5 km catchment</strong> — proximity analysis</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F0FDFA] border border-[#0E7C7B]/15 rounded-2xl p-4">
            <h5 className="text-xs font-semibold text-[#0E7C7B]">How GMT helps</h5>
            <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-[#334155] list-none p-0 m-0">
              <li className="flex gap-2"><span className="text-[#0E7C7B] mt-1 shrink-0">•</span><span>Visualise every settlement relative to facilities</span></li>
              <li className="flex gap-2"><span className="text-[#0E7C7B] mt-1 shrink-0">•</span><span>Identify missed clusters beyond perceived catchments</span></li>
              <li className="flex gap-2"><span className="text-[#0E7C7B] mt-1 shrink-0">•</span><span>Assign sessions to real places, not estimates</span></li>
              <li className="flex gap-2"><span className="text-[#0E7C7B] mt-1 shrink-0">•</span><span>Track coverage at settlement-level granularity</span></li>
            </ul>
          </div>

          <div className="bg-[#FFF7ED] border border-[#F59E0B]/20 rounded-2xl p-4">
            <p className="text-[11px] font-semibold tracking-wide uppercase text-[#9A3412]">Data Integrity Notice</p>
            <p className="text-xs leading-relaxed text-[#7C2D12] mt-1.5">
              All points and boundaries are <strong>synthetic illustration</strong> to demonstrate capability. No confidential government, patient or programme dataset is displayed.
            </p>
          </div>

          <div className="flex gap-2">
            <Badge variant="teal">GEOSPATIAL • ILLUSTRATIVE</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
