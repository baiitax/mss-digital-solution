# Geo-ST4R — what the case-study images actually show

Four assets supplied by the owner were added to `/our-work/geo-st4r-kano` on
2026-11-07. They replace a licensed stock "reference visual" in the settlement
mapping section and add evidence to the GMT and training sections.

Everything here is registered in `src/content/images.ts` under the
`documentation` kind, which renders the badge **MSS documentation**. That badge
is reserved for assets showing an actual MSS deliverable. Licensed stock keeps
the **Representative image** badge; synthetic diagrams keep **Illustrative —
synthetic data**.

| Manifest key | File | What it shows | What it must not be read as |
| --- | --- | --- | --- |
| `gmt-ward-map-print` | `gmt-ward-map-print.jpg` (1056 × 792) | A printed GMT ward map: settlements, schools, places of worship, health facilities, catchments, roads, waterbodies, legend, scale bar. Sheet header reads **Ward: Ijegun · LGA: Alimosho · State: Lagos**. | Not a Kano ward, not a Kano map, and not the deployment footprint. The page says so in the caption and again in the note beneath it. |
| `gmt-tablet-ward-tree` | `gmt-tablet-ward-tree.jpg` (1210 × 1030) | The GMT running in a tablet browser: status filters, `Search for a State/LGA/Ward`, the state → LGA → ward tree, map panel. | Not a record of live data entry. The tree shown is the tool's national hierarchy. |
| `gmt-progress-dashboard` | `gmt-progress-dashboard.jpg` (952 × 812) | The microplan progress dashboard: national state map, legend for microplan status, field-data collection status and validation. | Not operational data — every state reads "Not started" because it is a test build. The page states this in the caption and the "About these screens" note. |
| `field-planning-session` | `field-planning-session.jpg` (1008 × 756) | Health workers seated together reviewing a tablet during a planning session. | Nothing about attendance, numbers trained, or location beyond what is visible. |

## Edits made to the supplied files

Only cropping, colour and metadata work — no compositing, no synthetic content:

- **Metadata stripped** from all four (PIL re-save). The originals carried EXIF
  blocks; none contained GPS, but they are not republished either way.
- **Annotations removed by cropping.** Two screenshots arrived with hand-drawn
  arrows (a red arrow over the LGA list, a green arrow pointing at "Install
  app"). Those mark up an internal walkthrough, not the interface, so the frames
  were cropped to the application area instead. Nothing was painted out.
- **UAT hostname removed by cropping.** The tablet capture showed
  `uat.gmt-pilot.health` in the address bar; the browser chrome above the app
  was cropped so the internal test endpoint is not published.
- **Light autocontrast** on the two photographs (map print, planning session) to
  correct camera exposure. No retouching of people.

## Outstanding (owner)

1. **Photo release.** `field-planning-session.jpg` shows identifiable
   participants. Confirm the programme holds consent covering publication on the
   corporate site, or say the word and the image comes off.
2. **Kano lanes.** Both screenshots come from the pilot/UAT build. If the Kano
   deployment runs a different configuration, supply a capture from it and it
   will replace these; the caption already declines to claim they are Kano
   screens.
3. **Ward map.** Publication assumes the printed Ijegun ward map is cleared for
   public use. It is a Lagos ward on a Kano case study — deliberate, captioned,
   and easy to remove if you would rather wait for a Kano sheet.
