/**
 * ORIGINAL VISUALISATIONS — authored for MSS, not sourced.
 *
 * These are diagrammatic, not evidentiary. Every figure shown is
 * synthetic and every component renders a "Synthetic demonstration"
 * label so it can never be mistaken for programme data or a screenshot
 * of deployed software.
 */

type VisualProps = { className?: string }

const INK = "#252B31"
const STORM = "#343D46"
const MUTED = "#89929B"
const BURGUNDY = "#701F3D"
const SOFT = "#F9E9EE"
const LINE = "#E8EAEC"

function Frame({
  children,
  label = "Synthetic demonstration",
  title,
  className = "",
}: {
  children: React.ReactNode
  label?: string
  title: string
  className?: string
}) {
  return (
    <figure className={`bg-white border border-[#E8EAEC] rounded-[20px] overflow-hidden ${className}`}>
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-[#E8EAEC]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#701F3D] shrink-0" />
          <figcaption className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[#59636D] truncate">
            {title}
          </figcaption>
        </div>
        <span className="shrink-0 text-[9px] font-semibold tracking-[0.08em] uppercase text-[#701F3D] bg-[#F9E9EE] rounded-full px-2 py-0.5">
          {label}
        </span>
      </div>
      <div className="bg-[#FAF9F7]">{children}</div>
    </figure>
  )
}

/** Settlement-level planning vs. administrative catchment. */
export function SettlementCatchmentMap({ className = "" }: VisualProps) {
  // Deterministic pseudo-random settlement positions — synthetic, no real coordinates.
  const settlements: [number, number, number][] = [
    [52, 84, 2.6], [88, 122, 2.2], [126, 78, 2.8], [158, 118, 2.0], [196, 86, 2.4],
    [228, 132, 2.1], [262, 92, 2.9], [296, 140, 2.3], [330, 88, 2.6], [364, 134, 2.0],
    [398, 96, 2.7], [432, 140, 2.2], [466, 100, 2.5], [500, 142, 2.1], [534, 100, 2.8],
    [566, 140, 2.2], [70, 176, 2.3], [140, 176, 2.0], [206, 178, 2.6], [272, 176, 2.2],
    [338, 182, 2.4], [404, 178, 2.1], [470, 184, 2.5], [536, 180, 2.0], [100, 226, 2.4],
    [172, 232, 2.1], [244, 224, 2.7], [316, 234, 2.2], [388, 226, 2.4], [460, 232, 2.1],
    [524, 222, 2.6], [60, 262, 2.0], [150, 274, 2.3], [238, 268, 2.1], [326, 276, 2.4],
    [414, 268, 2.0], [496, 274, 2.3],
  ]

  return (
    <Frame title="Settlement-level planning geography" className={className}>
      <svg viewBox="0 0 640 340" className="w-full h-auto block" role="img"
        aria-label="Diagram comparing an administrative catchment with settlement-level planning geography">
        <defs>
          <pattern id="gridm" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke={LINE} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="640" height="340" fill="url(#gridm)" />

        {/* Administrative catchment — assumed even coverage */}
        <circle cx="322" cy="172" r="138" fill={BURGUNDY} fillOpacity="0.05" stroke={BURGUNDY} strokeOpacity="0.28" strokeDasharray="6 5" />
        <text x="18" y="30" fontSize="10.5" fill={MUTED} letterSpacing="1.3">
          ADMINISTRATIVE CATCHMENT — ASSUMED EVEN COVERAGE
        </text>

        {/* Facility catchment rings */}
        <circle cx="196" cy="140" r="72" fill={STORM} fillOpacity="0.04" stroke={STORM} strokeOpacity="0.22" />
        <circle cx="460" cy="162" r="80" fill={STORM} fillOpacity="0.04" stroke={STORM} strokeOpacity="0.22" />

        {/* Settlements */}
        {settlements.map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r + 3} fill={BURGUNDY} fillOpacity="0.09" />
            <circle cx={x} cy={y} r={r} fill={i % 9 === 4 ? BURGUNDY : STORM} />
          </g>
        ))}

        {/* Facilities */}
        {[[196, 140], [460, 162], [312, 250]].map(([x, y], i) => (
          <g key={`f${i}`}>
            <rect x={x - 6} y={y - 6} width="12" height="12" rx="2" fill="#FFFFFF" stroke={STORM} strokeWidth="2" />
            <path d={`M${x} ${y - 3.4}v6.8M${x - 3.4} ${y}h6.8`} stroke={BURGUNDY} strokeWidth="1.6" />
          </g>
        ))}

        {/* Legend */}
        <g transform="translate(18, 300)">
          <rect x="-6" y="-16" width="286" height="30" rx="8" fill="#FFFFFF" stroke={LINE} />
          <circle cx="10" cy="-1" r="4" fill={STORM} />
          <text x="20" y="3" fontSize="9.5" fill={MUTED}>Settlement</text>
          <rect x="86" y="-5.5" width="9" height="9" rx="2" fill="#fff" stroke={STORM} strokeWidth="1.6" />
          <text x="100" y="3" fontSize="9.5" fill={MUTED}>Facility</text>
          <circle cx="152" cy="-1" r="4" fill={BURGUNDY} />
          <text x="162" y="3" fontSize="9.5" fill={MUTED}>Outside assumed pattern</text>
        </g>
      </svg>
      <p className="px-4 sm:px-5 py-3 text-[11px] text-[#89929B] border-t border-[#E8EAEC] bg-white leading-relaxed">
        Schematic only. Settlement positions, facility locations and catchment radii are
        synthetic and do not represent Kano State or any real programme geography.
      </p>
    </Frame>
  )
}

/** Assess → Co-design → Deploy → Verify, as a data flow. */
export function MicroplanningWorkflow({ className = "" }: VisualProps) {
  const steps = [
    { t: "Settlements", s: "Where communities are" },
    { t: "Catchment", s: "Who each team serves" },
    { t: "Microplan", s: "Sessions, teams and supplies" },
    { t: "Delivery", s: "Session held in settlement" },
    { t: "Verification", s: "Coverage checked against plan" },
  ]
  return (
    <Frame title="Microplanning workflow — data to decision" className={className}>
      <svg viewBox="0 0 640 250" className="w-full h-auto block" role="img"
        aria-label="Five-stage workflow diagram: settlement registry, facility catchment, microplan, delivery and verification">
        <rect width="640" height="250" fill="none" />
        {steps.map((step, i) => {
          const x = 24 + i * 120
          const active = i === 2
          return (
            <g key={step.t}>
              <rect
                x={x} y={72} width="104" height="86" rx="10"
                fill={active ? BURGUNDY : "#FFFFFF"}
                stroke={active ? BURGUNDY : LINE}
                strokeWidth={active ? 0 : 1.5}
              />
              <text x={x + 12} y={94} fontSize="9" letterSpacing="1.2"
                fill={active ? "rgba(255,255,255,0.65)" : MUTED} fontWeight="700">
                {String(i + 1).padStart(2, "0")}
              </text>
              <text x={x + 12} y={116} fontSize="11.5" fontWeight="700"
                fill={active ? "#FFFFFF" : INK}>
                {step.t}
              </text>
              <foreignObject x={x + 12} y={122} width={82} height={34}>
                <div style={{ fontSize: 9.5, lineHeight: 1.25, color: active ? "rgba(255,255,255,0.72)" : "#59636D", fontFamily: "inherit" }}>
                  {step.s}
                </div>
              </foreignObject>
              {i < steps.length - 1 && (
                <g>
                  <line x1={x + 104} y1={115} x2={x + 118} y2={115} stroke={MUTED} strokeWidth="1.4" />
                  <path d={`M${x + 115} 111.5 L${x + 119} 115 L${x + 115} 118.5`} fill="none" stroke={MUTED} strokeWidth="1.4" />
                </g>
              )}
            </g>
          )
        })}
        <text x="24" y="46" fontSize="10" letterSpacing="1.3" fill={MUTED}>
          EACH STAGE PRODUCES AN ARTEFACT THE NEXT STAGE CONSUMES
        </text>
        <text x="24" y="200" fontSize="10" fill={MUTED}>
          A step that cannot be evidenced at facility level is not treated as complete.
        </text>
      </svg>
      <p className="px-4 sm:px-5 py-3 text-[11px] text-[#89929B] border-t border-[#E8EAEC] bg-white leading-relaxed">
        Illustrative process diagram. It describes the method, not the results of any programme.
      </p>
    </Frame>
  )
}

/** Synthetic health-coverage dashboard. */
export function CoverageDashboard({ className = "" }: VisualProps) {
  const bars = [62, 71, 58, 84, 76, 68, 91, 79, 66, 88, 74, 82]
  const spark = "0,44 12,41 24,43 36,34 48,36 60,27 72,30 84,21 96,24"
  return (
    <Frame title="Coverage review — dashboard anatomy" label="Illustrative · synthetic data" className={className}>
      <svg viewBox="0 0 640 320" className="w-full h-auto block" role="img"
        aria-label="Illustrative dashboard with synthetic coverage indicators and a monthly trend">
        <rect width="640" height="320" fill="#FFFFFF" />
        {/* KPI tiles */}
        {[
          { l: "Sessions planned", v: "—" },
          { l: "Settlements reached", v: "—" },
          { l: "Facilities reporting", v: "—" },
        ].map((k, i) => (
          <g key={k.l}>
            <rect x={20 + i * 204} y={20} width="184" height="62" rx="10" fill="#FAF9F7" stroke={LINE} />
            <text x={36 + i * 204} y={42} fontSize="9.5" letterSpacing="1.1" fill={MUTED}>{k.l.toUpperCase()}</text>
            <text x={36 + i * 204} y={70} fontSize="20" fontWeight="800" fill={MUTED} letterSpacing="2">{k.v}</text>
            <text x={36 + i * 204} y={70} fontSize="9" fill={MUTED} opacity="0">placeholder</text>
          </g>
        ))}
        {/* Bars */}
        <text x="20" y="116" fontSize="9.5" letterSpacing="1.1" fill={MUTED}>MONTHLY COVERAGE INDEX — SYNTHETIC</text>
        <g transform="translate(20,130)">
          {bars.map((b, i) => (
            <g key={i}>
              <rect x={i * 40} y={120 - b} width="20" height={b} rx="3" fill={i === 6 ? BURGUNDY : "#DCDEE1"} />
            </g>
          ))}
          <line x1="0" y1="121" x2="470" y2="121" stroke={LINE} strokeWidth="1.5" />
        </g>
        {/* Sparkline + notes */}
        <g transform="translate(516,132)">
          <rect x="-10" y="-10" width="116" height="128" rx="10" fill="#FAF9F7" stroke={LINE} />
          <text x="0" y="6" fontSize="9" letterSpacing="1.1" fill={MUTED}>TREND</text>
          <g transform="translate(0, 30)">
            <polyline points={spark} fill="none" stroke={BURGUNDY} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            <line x1="0" y1="56" x2="96" y2="56" stroke={LINE} strokeWidth="1.5" />
          </g>
        </g>
        {/* Decision strip */}
        <rect x="20" y="268" width="536" height="34" rx="8" fill={SOFT} />
        <text x="34" y="290" fontSize="11" fill={BURGUNDY} fontWeight="700">
          Decision prompt: which settlements fall outside every planned session this month?
        </text>
      </svg>
      <p className="px-4 sm:px-5 py-3 text-[11px] text-[#89929B] border-t border-[#E8EAEC] bg-white leading-relaxed">
        Every value is deliberately blank or synthetic. This illustrates the anatomy of a
        coverage review — it is not a screenshot of MSS software or live programme data.
      </p>
    </Frame>
  )
}
