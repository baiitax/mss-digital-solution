"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Layers, MapPin, Users, Crosshair, Eye, EyeOff } from "lucide-react"

type Settlement = { id: number; x: number; y: number; type: "settlement"; reached: boolean; name: string }
type Facility = { id: number; x: number; y: number; type: "facility"; name: string }

// Deterministic seeded RNG to avoid hydration mismatch (no Math.random on server)
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function generateSettlements(): Settlement[] {
  const rng = seededRandom(7341058) // RC 7341058 as seed — deterministic
  return Array.from({ length: 61 }, (_, i) => ({
    id: i,
    x: 8 + rng() * 84,
    y: 10 + rng() * 78,
    type: "settlement" as const,
    reached: rng() > 0.32,
    name: `Settlement ${String(i + 1).padStart(3, "0")}`,
  }))
}

const settlementsStatic = generateSettlements()

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

  const [settlements] = useState<Settlement[]>(settlementsStatic)
  const reachedCount = settlements.filter(s => s.reached).length
  const unreachedCount = settlements.filter(s => !s.reached).length
  const facilityCount = facilities.length

  // Keep deterministic on both server/client; no effect needed — seed ensures same output

  return (
    <div className="bg-white rounded-2xl sm:rounded-[24px] border border-[#E8EAEC] overflow-hidden shadow-[0_8px_40px_rgba(52,61,70,0.06)]">
      {/* Header - stack on mobile */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-[#E8EAEC] flex flex-col gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#252B31] flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-semibold text-[#252B31] leading-tight text-sm sm:text-base">Geospatial Microplanning — Illustrative Demo</h3>
            <p className="text-[11px] sm:text-xs text-[#89929B] mt-1 leading-snug">Kano State • Settlement & facility layers • <span className="font-medium text-[#701F3D]">Synthetic data — not operational GMT data</span></p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setShowCatchments(!showCatchments)} className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-colors ${showCatchments ? "bg-[#252B31] text-white border-[#252B31]" : "bg-white text-[#89929B] border-[#E8EAEC]"}`}>
            <Crosshair className="w-3.5 h-3.5 shrink-0" /> Catchments {showCatchments ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          </button>
          <button onClick={() => setShowFacilities(!showFacilities)} className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-colors ${showFacilities ? "bg-[#701F3D] text-white border-[#701F3D]" : "bg-white text-[#89929B] border-[#E8EAEC]"}`}>
            <MapPin className="w-3.5 h-3.5 shrink-0" /> Facilities
          </button>
          <button onClick={() => setShowUnreached(!showUnreached)} className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-colors ${showUnreached ? "bg-[#50152D] text-white border-[#50152D]" : "bg-white text-[#89929B] border-[#E8EAEC]"}`}>
            <Users className="w-3.5 h-3.5 shrink-0" /> Unreached
          </button>
          <button onClick={() => setShowReached(!showReached)} className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-colors ${showReached ? "bg-[#701F3D] text-white border-[#701F3D]" : "bg-white text-[#89929B] border-[#E8EAEC]"}`}>
            Reached
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-0">
        {/* Map */}
        <div className={`relative bg-[#FAF9F7] p-3 sm:p-4 lg:p-6 ${compact ? "min-h-[360px]" : "min-h-[380px] sm:min-h-[420px]"}`}>
          <div className="relative w-full h-full min-h-[320px] sm:min-h-[360px] bg-[#F0F1F2] rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8EAEC]">
            {/* Grid */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `linear-gradient(#DCDEE1 1px, transparent 1px), linear-gradient(90deg, #DCDEE1 1px, transparent 1px)`,
              backgroundSize: "24px 24px"
            }} />
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-[#F9E9EE]/50" />

            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 20 15 L 55 10 L 85 25 L 80 80 L 30 85 L 12 55 Z" fill="none" stroke="#89929B" strokeWidth="0.4" strokeDasharray="2 1.5" opacity="0.5" />
              <path d="M 20 15 L 45 40 L 30 85" fill="none" stroke="#89929B" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.3" />
              <text x="50" y="9" textAnchor="middle" fontSize="2.2" fill="#89929B" fontWeight="600">KANO STATE — ILLUSTRATIVE EXTENT</text>
            </svg>

            {showCatchments && showFacilities && facilities.map(f => (
              <div
                key={`catch-${f.id}`}
                className="absolute rounded-full border-2 border-[#701F3D]/25 bg-[#701F3D]/[0.06] pointer-events-none"
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
                  className={`absolute w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm hover:scale-150 transition-transform cursor-pointer ${s.reached ? "bg-[#701F3D]" : "bg-[#50152D] animate-pulse"}`}
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
                className="absolute w-6 h-6 sm:w-7 sm:h-7 -ml-3 -mt-3 sm:-ml-3.5 sm:-mt-3.5 bg-[#252B31] rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer z-10"
                style={{ left: `${f.x}%`, top: `${f.y}%` }}
              >
                <span className="text-[7px] sm:text-[8px] font-bold text-white">+</span>
              </button>
            ))}

            {hovered && (
              <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-[260px] bg-[#252B31] text-white text-xs px-3 py-2.5 rounded-xl shadow-xl pointer-events-none z-20">
                <div className="font-semibold leading-tight">{hovered.name}</div>
                <div className="text-white/70 text-[11px] leading-snug mt-1">{hovered.type === "facility" ? "Health Facility • Catchment hub" : (hovered as Settlement).reached ? "Reached settlement • GMT-verified" : "Unreached • Priority for microplanning"}</div>
              </div>
            )}

            <div className="absolute top-3 right-3 flex flex-col gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-[#E8EAEC] shadow-sm flex items-center justify-center text-[#89929B] text-sm font-bold">+</div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-[#E8EAEC] shadow-sm flex items-center justify-center text-[#89929B] text-sm font-bold">−</div>
            </div>

            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white/90 backdrop-blur px-2 sm:px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-medium tracking-wide text-[#89929B] border border-[#E8EAEC]">
              © Illustrative • Not operational data
            </div>
          </div>

          {/* Stats bar - responsive */}
          <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-white rounded-xl border border-[#E8EAEC] p-2.5 sm:p-3 text-center">
              <div className="text-[9px] sm:text-[11px] tracking-widest uppercase font-semibold text-[#89929B] leading-tight">Facilities</div>
              <div className="font-display text-lg sm:text-xl font-bold text-[#252B31] leading-none mt-1">{facilityCount}</div>
              <div className="text-[10px] sm:text-[11px] text-[#89929B] leading-tight">catchment hubs</div>
            </div>
            <div className="bg-[#F9E9EE] rounded-xl border border-[#701F3D]/20 p-2.5 sm:p-3 text-center">
              <div className="text-[9px] sm:text-[11px] tracking-widest uppercase font-semibold text-[#701F3D] leading-tight">Reached</div>
              <div className="font-display text-lg sm:text-xl font-bold text-[#701F3D] leading-none mt-1">{reachedCount}</div>
              <div className="text-[10px] sm:text-[11px] text-[#701F3D]/70 leading-tight">settlements</div>
            </div>
            <div className="bg-[#F9E9EE] rounded-xl border border-[#50152D]/25 p-2.5 sm:p-3 text-center">
              <div className="text-[9px] sm:text-[11px] tracking-widest uppercase font-semibold text-[#50152D] leading-tight">Unreached</div>
              <div className="font-display text-lg sm:text-xl font-bold text-[#50152D] leading-none mt-1">{unreachedCount}</div>
              <div className="text-[10px] sm:text-[11px] text-[#50152D]/70 leading-tight">priority</div>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="border-t lg:border-t-0 lg:border-l border-[#E8EAEC] bg-white p-4 sm:p-6 space-y-5 sm:space-y-6">
          <div>
            <h4 className="font-display font-semibold text-sm text-[#252B31]">What the map shows</h4>
            <p className="text-xs sm:text-xs leading-relaxed text-[#89929B] mt-2">
              Traditional microplanning uses estimated catchment populations. GMT uses <strong className="text-[#252B31]">mapped settlement locations</strong> so teams plan against real geography — not assumptions.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-[11px] tracking-widest uppercase font-bold text-[#252B31]">Legend — Illustrative Layers</h5>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-3">
                <span className="w-3 h-3 rounded-full bg-[#252B31] border-2 border-white shadow-sm shrink-0 mt-0.5" />
                <span className="text-[#343D46] leading-snug"><strong>Health facility</strong> — session planning hub</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-3 h-3 rounded-full bg-[#701F3D] border-2 border-white shadow-sm shrink-0 mt-0.5" />
                <span className="text-[#343D46] leading-snug"><strong>Reached</strong> — has scheduled outreach</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-3 h-3 rounded-full bg-[#50152D] border-2 border-white shadow-sm animate-pulse shrink-0 mt-0.5" />
                <span className="text-[#343D46] leading-snug"><strong>Unreached</strong> — gap, prioritise microplan</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full border-2 border-[#701F3D]/30 bg-[#701F3D]/10 shrink-0" />
                <span className="text-[#343D46] leading-snug"><strong>5 km catchment</strong> — proximity analysis</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F9E9EE] border border-[#701F3D]/15 rounded-2xl p-4">
            <h5 className="text-xs font-semibold text-[#701F3D]">How GMT helps</h5>
            <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-[#343D46] list-none p-0 m-0">
              <li className="flex gap-2"><span className="text-[#701F3D] mt-1 shrink-0">•</span><span>Visualise every settlement relative to facilities</span></li>
              <li className="flex gap-2"><span className="text-[#701F3D] mt-1 shrink-0">•</span><span>Identify missed clusters beyond perceived catchments</span></li>
              <li className="flex gap-2"><span className="text-[#701F3D] mt-1 shrink-0">•</span><span>Assign sessions to real places, not estimates</span></li>
              <li className="flex gap-2"><span className="text-[#701F3D] mt-1 shrink-0">•</span><span>Track coverage at settlement-level granularity</span></li>
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
