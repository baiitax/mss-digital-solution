/**
 * CENTRAL IMAGE MANIFEST
 * ------------------------------------------------------------------
 * Every photograph used on the site is registered here once, with its
 * provenance, licence and a written purpose. Components reference an
 * image by key, so an asset can be swapped without touching page code.
 *
 * `kind` is a truthfulness label, not a style hint:
 *   authentic    — supplied by MSS (company asset). Currently only the
 *                  Executive Director portrait.
 *   documentation — supplied by MSS and showing an actual MSS deliverable:
 *                  a printed GMT map, the GMT interface, a planning session.
 *                  This IS project documentation — captions must say exactly
 *                  what it shows and must not be widened beyond that.
 *   contextual   — licensed stock photography used to illustrate the
 *                  subject. NOT documentation of an MSS project.
 *   illustrative — original diagrammatic / synthetic visualisation.
 *
 * Photographic sources are Pexels (Pexels License: free for commercial
 * use, modification permitted, no attribution required). Attribution is
 * recorded anyway and published in the visual implementation report.
 */

export type ImageKind = "authentic" | "documentation" | "contextual" | "illustrative"

export type SiteImage = {
  src: string
  width: number
  height: number
  alt: string
  kind: ImageKind
  /** Short internal note on why this image exists in the page. */
  purpose: string
  /** Caption shown under the frame when a page opts in. */
  caption?: string
  /** Photographer / rights holder. */
  credit?: string
  licence?: string
  sourceUrl?: string
}

export const images = {
  /* ── Homepage ─────────────────────────────────────────────── */
  "home-hero-community-health": {
    src: "/images/homepage/home-hero-community-health.jpg",
    width: 1920,
    height: 1080,
    alt: "Two Nigerian health workers in white coats attending to an elderly man at an outdoor community health outreach point",
    kind: "contextual",
    purpose: "Hero — healthcare delivery reaching people where they live.",
    caption: "Community health outreach in northern Nigeria — representative image.",
    credit: "MK Photoz",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/33127835/",
  },
  "home-intro-collaboration": {
    src: "/images/homepage/home-intro-collaboration.jpg",
    width: 1400,
    height: 1000,
    alt: "A presenter standing beside a wall-mounted screen of charts, addressing a seated technical team",
    kind: "contextual",
    purpose: "Introduction — multidisciplinary expertise behind the four capabilities.",
    caption: "Representative image.",
    credit: "Mikhail Nilov",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/9301257/",
  },

  /* ── Capability cards ─────────────────────────────────────── */
  "cap-digital-health-systems": {
    src: "/images/capabilities/cap-digital-health-systems.jpg",
    width: 900,
    height: 700,
    alt: "A clinician in a white coat reviewing a digital record on a tablet",
    kind: "contextual",
    purpose: "Digital Health Systems — digital workflow at the point of care.",
    credit: "Tessy Agbonome",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/19963124/",
  },
  "cap-geospatial-intelligence": {
    src: "/images/capabilities/cap-geospatial-intelligence.jpg",
    width: 900,
    height: 700,
    alt: "A hand placing red location pins on a printed map",
    kind: "contextual",
    purpose: "Geospatial Intelligence — settlement-level location work.",
    credit: "GeoJango Maps",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/7663519/",
  },
  "cap-data-analytics": {
    src: "/images/capabilities/cap-data-analytics.jpg",
    width: 900,
    height: 700,
    alt: "Two analysts reviewing data on a laptop screen in an office",
    kind: "contextual",
    purpose: "Data Analytics — turning routine data into a decision.",
    credit: "Mikhail Nilov",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/9301295/",
  },
  "cap-programme-management": {
    src: "/images/capabilities/cap-programme-management.jpg",
    width: 900,
    height: 700,
    alt: "A small implementation team in discussion around a meeting-room table",
    kind: "contextual",
    purpose: "Programme Management — coordination across stakeholders.",
    credit: "Mikhail Nilov",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/9301303/",
  },

  /* ── Featured work / case study ───────────────────────────── */
  "geo-st4r-kano-landscape": {
    src: "/images/projects/geo-st4r/geo-st4r-kano-landscape.jpg",
    width: 1400,
    height: 900,
    alt: "Elevated view over densely built rooftops and minarets in Kano, Nigeria",
    kind: "contextual",
    purpose: "Featured work — the geography Geo-ST4R works within.",
    caption: "Kano, Nigeria — representative view of the state where Geo-ST4R is implemented.",
    credit: "Abduljalil Attahir",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/38330923/",
  },
  "kano-urban-sprawl": {
    src: "/images/projects/geo-st4r/kano-urban-sprawl.jpg",
    width: 1400,
    height: 900,
    alt: "Wide view of low-rise housing across a densely settled district of Kano",
    kind: "contextual",
    purpose: "Case study — settlement density that administrative catchments conceal.",
    caption: "Representative view of settlement density in Kano State.",
    credit: "Al'ameen NG",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/31729409/",
  },
  "kano-street-mobility": {
    src: "/images/projects/geo-st4r/kano-street-mobility.jpg",
    width: 1400,
    height: 900,
    alt: "Motorcyclists travelling along a road under an underpass in Kano",
    kind: "contextual",
    purpose: "Case study — travel and access conditions between settlements and facilities.",
    credit: "Nasiru Othman",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/40620781/",
  },
  /* ── Geo-ST4R programme evidence ───────────────────────────────
   * Supplied by MSS from programme work. These replaced licensed stock where
   * the case study previously showed a generic "reference visual". Each
   * caption states exactly what the asset is — and the ward map is a Lagos
   * ward, so it is never described as a Kano ward.
   */
  "gmt-ward-map-print": {
    src: "/images/projects/geo-st4r/gmt-ward-map-print.jpg",
    width: 1056,
    height: 792,
    alt: "Printed GMT ward map for Ijegun Ward, Alimosho LGA, Lagos State, showing settlements, schools, health facilities, catchment boundaries, roads and waterbodies with a legend and scale bar",
    kind: "documentation",
    purpose: "Case study — the ward-level map a facility team actually plans from, printed.",
    caption:
      "GMT ward map output (printed) — Ijegun Ward, Alimosho LGA, Lagos State. Settlements, schools, places of worship, health facilities, catchments and ward boundaries on a single planning sheet.",
    credit: "MSS Digital Solutions",
    licence: "MSS project documentation",
  },
  "gmt-progress-dashboard": {
    src: "/images/projects/geo-st4r/gmt-progress-dashboard.jpg",
    width: 952,
    height: 812,
    alt: "GMT microplan progress dashboard showing a map of Nigeria's states with a legend for microplan and field data collection status",
    kind: "documentation",
    purpose: "Case study — how microplan and field-data status are surfaced per planning unit.",
    caption:
      "GMT microplan progress dashboard (test build). Every state reads “Not started” — this is user-acceptance testing, not operational programme data.",
    credit: "MSS Digital Solutions",
    licence: "MSS project documentation",
  },
  "gmt-tablet-ward-tree": {
    src: "/images/projects/geo-st4r/gmt-tablet-ward-tree.jpg",
    width: 1210,
    height: 1030,
    alt: "GMT running in a tablet browser, showing microplan status filters, a search box and a state, LGA and ward selection tree for Nigeria",
    kind: "documentation",
    purpose: "Case study — the tool is legible on a tablet and organised by state / LGA / ward.",
    caption:
      "GMT in a tablet browser (test build): status filters, the state / LGA / ward tree and the map panel on one screen — no GIS training required to read it.",
    credit: "MSS Digital Solutions",
    licence: "MSS project documentation",
  },
  "field-planning-session": {
    src: "/images/projects/geo-st4r/field-planning-session.jpg",
    width: 1008,
    height: 756,
    alt: "Health workers seated in a row at a planning session, reviewing a tablet together",
    kind: "documentation",
    purpose: "Case study — planning happens seated together, around one device, not in a dashboard alone.",
    caption:
      "Facility and ward teams reviewing a planning site together during a session — the setting in which microplans are actually drafted.",
    credit: "MSS Digital Solutions",
    licence: "MSS project documentation",
  },

  "immunisation-service-point": {
    src: "/images/projects/geo-st4r/immunisation-service-point.jpg",
    width: 1400,
    height: 900,
    alt: "A health worker drawing a vaccine dose from a vial at a service point",
    kind: "contextual",
    purpose: "Case study — routine immunisation, the service Geo-ST4R plans for.",
    credit: "Gustavo Fring",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/8770698/",
  },

  /* ── Implementation stages / How We Work ──────────────────── */
  "stage-assess-community": {
    src: "/images/methodology/stage-assess-community.jpg",
    width: 800,
    height: 600,
    alt: "Health workers speaking with a household during a community assessment visit",
    kind: "contextual",
    purpose: "Assess — field assessment and household-level data collection.",
    credit: "Adamu Galadima",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/37285163/",
  },
  "stage-co-design-workshop": {
    src: "/images/methodology/stage-co-design-workshop.jpg",
    width: 800,
    height: 600,
    alt: "A group of colleagues collaborating around a laptop during a working session",
    kind: "contextual",
    purpose: "Co-design — multidisciplinary planning with the people who deliver services.",
    credit: "Picha Stock",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/3869649/",
  },
  "stage-deploy-service-delivery": {
    src: "/images/methodology/stage-deploy-service-delivery.jpg",
    width: 800,
    height: 600,
    alt: "A nurse administering an injection to a patient at an outdoor health post",
    kind: "contextual",
    purpose: "Deploy — frontline service delivery during implementation.",
    credit: "Denis Ngai",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/7321689/",
  },
  "stage-verify-analysis": {
    src: "/images/methodology/stage-verify-analysis.jpg",
    width: 800,
    height: 600,
    alt: "A person pointing at location markers plotted on a wall-mounted map",
    kind: "contextual",
    purpose: "Verify — checking reported coverage against mapped geography.",
    credit: "Kampus Production",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/8463138/",
  },

  /* ── About ────────────────────────────────────────────────── */
  "about-team-institutional": {
    src: "/images/about/about-team-institutional.jpg",
    width: 1600,
    height: 900,
    alt: "Three colleagues reviewing documents together at a table in a bright office",
    kind: "contextual",
    purpose: "About hero — the organisation as a working team.",
    caption: "Representative image.",
    credit: "Edmond Dantes",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/8550500/",
  },
  "about-community-care": {
    src: "/images/about/about-community-care.jpg",
    width: 900,
    height: 700,
    alt: "A community health worker sitting outdoors with two young children",
    kind: "contextual",
    purpose: "About — the community level the company's work is measured at.",
    credit: "Khanh Hoang Minh",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/34717769/",
  },
  "about-digital-record": {
    src: "/images/about/about-digital-record.jpg",
    width: 900,
    height: 700,
    alt: "A clinician entering notes on a tablet beside an open notebook",
    kind: "contextual",
    purpose: "About — implementation is a daily workflow, not a launch event.",
    credit: "Tessy Agbonome",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/19957221/",
  },

  /* ── Capability pages ─────────────────────────────────────── */
  "dhs-facility-environment": {
    src: "/images/capabilities/digital-health/dhs-facility-environment.jpg",
    width: 1600,
    height: 900,
    alt: "A nurse attending to equipment in a newborn care unit",
    kind: "contextual",
    purpose: "Digital health hero — the facility environment systems must fit.",
    caption: "Representative image.",
    credit: "SpeakMedia Uganda",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/34185205/",
  },
  "dhs-tablet-workflow": {
    src: "/images/capabilities/digital-health/dhs-tablet-workflow.jpg",
    width: 900,
    height: 700,
    alt: "A health worker reading a patient record on a tablet in a clinic corridor",
    kind: "contextual",
    purpose: "Digital health — offline-capable data capture at the point of care.",
    credit: "Tima Miroshnichenko",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/5452188/",
  },
  "dhs-workforce-portrait": {
    src: "/images/capabilities/digital-health/dhs-workforce-portrait.jpg",
    width: 900,
    height: 700,
    alt: "Portrait of a nurse in blue scrubs with a stethoscope",
    kind: "contextual",
    purpose: "Digital health — the workforce that has to use the system.",
    credit: "Wundef",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/5430213/",
  },
  "geo-cartography-desk": {
    src: "/images/capabilities/geospatial/geo-cartography-desk.jpg",
    width: 1600,
    height: 900,
    alt: "Close view of a detailed printed road map with route markings",
    kind: "contextual",
    purpose: "Geospatial hero — working with real geography rather than catchment estimates.",
    caption: "Representative image.",
    credit: "Sonny",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/6759307/",
  },
  "geo-aerial-settlement-pattern": {
    src: "/images/capabilities/geospatial/geo-aerial-settlement-pattern.jpg",
    width: 1400,
    height: 900,
    alt: "Aerial view of a patchwork of small agricultural plots and settlement edges",
    kind: "contextual",
    purpose: "Geospatial — what dispersed settlement looks like from above.",
    credit: "Zakaria Joy",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/34850159/",
  },
  "analytics-review-session": {
    src: "/images/capabilities/analytics/analytics-review-session.jpg",
    width: 1600,
    height: 900,
    alt: "A team seated around a conference table reviewing information shown on a wall screen",
    kind: "contextual",
    purpose: "Analytics hero — review meetings where data becomes a decision.",
    caption: "Representative image.",
    credit: "Divine Techy Girl",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/1181745/",
  },
  "analytics-team-working": {
    src: "/images/capabilities/analytics/analytics-team-working.jpg",
    width: 1400,
    height: 900,
    alt: "Colleagues working together at laptops in an open-plan office",
    kind: "contextual",
    purpose: "Analytics — analysis as team practice, not a single dashboard.",
    credit: "Edmond Dantes",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/8547282/",
  },
  "programme-stakeholder-table": {
    src: "/images/capabilities/programme-management/programme-stakeholder-table.jpg",
    width: 1600,
    height: 900,
    alt: "Health workers and a colleague in discussion with a community member across a table",
    kind: "contextual",
    purpose: "Programme management hero — coordination at the point of delivery.",
    caption: "Representative image.",
    credit: "Mahyub Hamida",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/30313899/",
  },

  /* ── Contact ──────────────────────────────────────────────── */
  "contact-institutional-dialogue": {
    src: "/images/contact/contact-institutional-dialogue.jpg",
    width: 1200,
    height: 800,
    alt: "Three colleagues in discussion across a meeting table",
    kind: "contextual",
    purpose: "Contact — an institutional conversation, kept visually quiet.",
    credit: "Edmond Dantes",
    licence: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/8550500/",
  },

  /* ── Authentic company asset ──────────────────────────────── */
  "executive-director-portrait": {
    src: "/images/leadership/jamil-aliu-galadanci.jpg",
    width: 640,
    height: 800,
    alt: "Portrait of Jamil Aliyu Galadanci, Executive Director of MSS Digital Solutions",
    kind: "authentic",
    purpose: "Leadership — the company's own approved portrait.",
  },
} as const satisfies Record<string, SiteImage>

export type ImageKey = keyof typeof images

export function getImage(key: ImageKey): SiteImage {
  return images[key]
}

/** Default caption label for non-authentic imagery, used by <Figure>. */
export function provenanceLabel(kind: ImageKind): string | null {
  if (kind === "documentation") return "MSS documentation"
  if (kind === "contextual") return "Representative image"
  if (kind === "illustrative") return "Illustrative — synthetic data"
  return null
}
