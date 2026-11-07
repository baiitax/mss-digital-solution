import Link from "next/link"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { can } from "@/lib/auth/session"
import { Card, Empty, PageHeader, formatDate } from "@/components/admin/ui"
import { Uploader } from "./Uploader"
import { Search } from "lucide-react"

const CATEGORIES = [
  { value: "homepage", label: "Homepage" },
  { value: "brand", label: "Brand assets" },
  { value: "about", label: "About" },
  { value: "digital-health", label: "Digital Health" },
  { value: "geospatial", label: "Geospatial" },
  { value: "analytics", label: "Data Analytics" },
  { value: "programme-management", label: "Programme Management" },
  { value: "geo-st4r", label: "Geo-ST4R" },
  { value: "leadership", label: "Leadership" },
  { value: "insights", label: "Insights" },
  { value: "contact", label: "Contact" },
  { value: "documents", label: "Documents" },
]

export default async function MediaPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const session = await requirePermission("media.view")
  const { q, category } = await searchParams
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from("media_assets")
    .select("id, bucket, path, file_name, mime_type, size_bytes, width, height, alt_text, category, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(60)

  if (category) query = query.eq("category", category)
  if (q) query = query.or(`file_name.ilike.%${q}%,alt_text.ilike.%${q}%`)

  const { data: assets, count, error } = await query
  const publicUrl = (bucket: string, path: string) =>
    supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl

  return (
    <>
      <PageHeader
        title="Media library"
        description="Central register of every published image. Uploads are validated, stored in the public bucket and referenced by URL — never hotlinked."
        actions={<span className="text-[11.5px] text-[#89929B]">{count ?? 0} assets</span>}
      />

      {can(session, "media.upload") && (
        <Card title="Upload" description="Assets are stored under website-media and optimised by the image pipeline" className="mb-4">
          <Uploader categories={CATEGORIES} />
        </Card>
      )}

      <form action="/admin/media" className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#89929B]" />
          <input name="q" defaultValue={q ?? ""} placeholder="Search filename or alt text" className="h-9 w-60 rounded-lg border border-[#DDE1E4] bg-white pl-8 pr-3 text-[12.5px] outline-none focus:border-[#701F3D]" />
        </div>
        <select name="category" defaultValue={category ?? ""} className="h-9 rounded-lg border border-[#DDE1E4] bg-white px-2 text-[12.5px]">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <button type="submit" className="h-9 rounded-lg bg-[#252B31] px-3 text-[12.5px] font-semibold text-white">Filter</button>
      </form>

      {error ? (
        <Card><Empty title="Could not load media" description={error.message} /></Card>
      ) : assets && assets.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {assets.map((asset) => {
            const isImage = asset.mime_type?.startsWith("image/")
            return (
              <Link key={asset.id} href={`/admin/media/${asset.id}`} className="group overflow-hidden rounded-xl border border-[#E3E6E8] bg-white hover:border-[#701F3D]/40">
                <div className="relative aspect-[4/3] bg-[#F0F1F2]">
                  {isImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={publicUrl(asset.bucket, asset.path)} alt={asset.alt_text} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[11px] uppercase tracking-wide text-[#89929B]">PDF document</div>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="truncate text-[12px] font-medium text-[#252B31]">{asset.file_name}</p>
                  <p className="mt-0.5 truncate text-[11px] text-[#89929B]">{asset.category} · {Math.round((asset.size_bytes ?? 0) / 1024)} KB{asset.width ? ` · ${asset.width}×${asset.height}` : ""}</p>
                  <p className="mt-1 truncate text-[11px] text-[#89929B]">{formatDate(asset.created_at)}</p>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <Card>
          <Empty title="No media yet" description="Upload the first asset above. Files land in the public bucket with their alt text and category recorded." />
        </Card>
      )}
    </>
  )
}
