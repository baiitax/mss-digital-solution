import Link from "next/link"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, Empty, PageHeader, StatusPill } from "@/components/admin/ui"

export default async function GeoSt4rPage() {
  await requirePermission("geost4r.manage")
  const supabase = await createSupabaseServerClient()

  const [{ data: project }, { data: partners }, { data: related }] = await Promise.all([
    supabase.from("projects").select("*").eq("slug", "geo-st4r-kano").maybeSingle(),
    supabase.from("project_partners").select("id, name, role, website"),
    supabase.from("projects").select("id, title, slug, status").neq("slug", "geo-st4r-kano").limit(5),
  ])

  return (
    <>
      <PageHeader
        title="Geo-ST4R programme"
        description="Dedicated controls for the flagship Kano State programme. Content is bound to the case study record, so the public page and this module never diverge."
        actions={<Link href="/our-work/geo-st4r-kano" target="_blank" className="rounded-lg border border-[#DDE1E4] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">View case study ↗</Link>}
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          {project ? (
            <Card title="Programme record" description={`Slug: ${project.slug}`} actions={<StatusPill status={project.status} />}>
              <dl className="grid gap-3 text-[12.5px] sm:grid-cols-2">
                <div><dt className="text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">Title</dt><dd className="mt-0.5 text-[#252B31]">{project.title}</dd></div>
                <div><dt className="text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">Location</dt><dd className="mt-0.5 text-[#252B31]">{project.state}, {project.country}</dd></div>
                <div><dt className="text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">Period</dt><dd className="mt-0.5 text-[#252B31]">{project.period || "—"}</dd></div>
                <div><dt className="text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">Verification</dt><dd className="mt-0.5 text-[#252B31]">{project.verification_level?.replace(/_/g, " ")}</dd></div>
              </dl>
              <p className="mt-3 text-[12.5px] leading-relaxed text-[#59636D]">{project.summary}</p>
              <Link href={`/admin/projects/${project.id}`} className="mt-4 inline-flex rounded-lg bg-[#701F3D] px-3 py-2 text-[12.5px] font-semibold text-white hover:bg-[#50152D]">Edit programme content</Link>
            </Card>
          ) : (
            <Card>
              <Empty title="Programme record not found" description="The case study record with slug geo-st4r-kano does not exist yet." action={<Link href="/admin/projects" className="text-[12px] font-semibold text-[#701F3D] hover:underline">Create a project</Link>} />
            </Card>
          )}

          <Card title="Geospatial demonstration" description="The interactive map on the public capability page">
            <p className="text-[12.5px] leading-relaxed text-[#59636D]">
              The demo renders synthetic layers client-side: settlement points, facility hubs and catchment radii. It is
              labelled “Synthetic demonstration data” in the interface and reads no operational data.
            </p>
            <ul className="mt-3 space-y-1.5 text-[12px] text-[#59636D]">
              <li>· Layer toggles: catchments, facilities, reached settlements, unreached settlements</li>
              <li>· No coordinates, facility names or beneficiary records are stored in this database</li>
              <li>· Programme photography is registered in the media library, never generated</li>
            </ul>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Partners" description="Only verified partners">
            {partners && partners.length > 0 ? (
              <ul className="space-y-1.5 text-[12.5px] text-[#252B31]">
                {partners.map((p) => <li key={p.id}>{p.name}{p.role ? ` · ${p.role}` : ""}</li>)}
              </ul>
            ) : (
              <p className="text-[12px] text-[#89929B]">No partner records linked yet. Partners must be confirmed before publication.</p>
            )}
          </Card>
          <Card title="Related projects">
            {related && related.length > 0 ? (
              <ul className="space-y-1.5 text-[12.5px]">
                {related.map((r) => <li key={r.id}><Link href={`/admin/projects/${r.id}`} className="text-[#252B31] hover:text-[#701F3D]">{r.title}</Link></li>)}
              </ul>
            ) : (
              <p className="text-[12px] text-[#89929B]">No other programmes recorded.</p>
            )}
          </Card>
          <Card title="Data protection">
            <p className="text-[12px] leading-relaxed text-[#59636D]">
              Community-level or facility-level operational data must never be exposed through public endpoints. This
              module governs presentation content only.
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
