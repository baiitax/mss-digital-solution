import Link from "next/link"
import { notFound } from "next/navigation"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { can } from "@/lib/auth/session"
import { Card, PageHeader, formatDate } from "@/components/admin/ui"
import { Field, Select, SubmitButton, TextArea, TextInput } from "@/components/admin/form"
import { deleteMedia, updateMedia } from "@/app/admin/actions/media"

const CATEGORIES = ["brand", "homepage", "about", "digital-health", "geospatial", "analytics", "programme-management", "geo-st4r", "leadership", "insights", "contact", "documents"]

export default async function MediaDetail({ params }: { params: Promise<{ id: string }> }) {
  const session = await requirePermission("media.view")
  const { id } = await params
  const supabase = await createSupabaseServerClient()

  const { data: asset } = await supabase.from("media_assets").select("*").eq("id", id).maybeSingle()
  if (!asset) notFound()

  const url = supabase.storage.from(asset.bucket).getPublicUrl(asset.path).data.publicUrl
  const { data: usage } = await supabase.from("media_usage").select("id, entity, entity_id, field").eq("media_id", id)

  return (
    <>
      <PageHeader
        title={asset.file_name}
        description={`${asset.category} · ${Math.round((asset.size_bytes ?? 0) / 1024)} KB · uploaded ${formatDate(asset.created_at)}`}
        actions={<Link href="/admin/media" className="rounded-lg border border-[#DDE1E4] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">Back to library</Link>}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Preview" className="lg:col-span-2">
          {asset.mime_type?.startsWith("image/") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt={asset.alt_text} className="max-h-[460px] w-full rounded-lg object-contain" />
          ) : (
            <div className="rounded-lg border border-dashed border-[#CBD2D7] p-10 text-center text-[12.5px] text-[#89929B]">Document preview is not available in the portal.</div>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <code className="flex-1 truncate rounded bg-[#F0F1F2] px-2 py-1.5 text-[11.5px] text-[#59636D]">{url}</code>
            <a href={url} target="_blank" rel="noreferrer" className="rounded-lg border border-[#DDE1E4] px-2.5 py-1.5 text-[11.5px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">Open</a>
          </div>
        </Card>

        <div className="space-y-4">
          <Card title="Metadata">
            <form action={updateMedia} className="space-y-3">
              <input type="hidden" name="id" value={asset.id} />
              <Field label="Alt text"><TextArea name="alt_text" rows={2} defaultValue={asset.alt_text} /></Field>
              <Field label="Caption"><TextInput name="caption" defaultValue={asset.caption} /></Field>
              <Field label="Category">
                <Select name="category" defaultValue={asset.category} options={CATEGORIES.map((c) => ({ value: c, label: c }))} />
              </Field>
              <SubmitButton variant="secondary" className="w-full justify-center">Save metadata</SubmitButton>
            </form>
            <dl className="mt-4 space-y-1 border-t border-[#EDEFF1] pt-3 text-[11.5px] text-[#59636D]">
              <div className="flex justify-between"><dt>Dimensions</dt><dd>{asset.width ? `${asset.width} × ${asset.height}` : "not recorded"}</dd></div>
              <div className="flex justify-between"><dt>MIME type</dt><dd>{asset.mime_type}</dd></div>
              <div className="flex justify-between"><dt>Bucket</dt><dd>{asset.bucket}</dd></div>
            </dl>
          </Card>

          <Card title="Usage">
            {usage && usage.length > 0 ? (
              <ul className="space-y-1.5 text-[12px] text-[#252B31]">
                {usage.map((u) => <li key={u.id}>{u.entity}{u.field ? ` · ${u.field}` : ""}</li>)}
              </ul>
            ) : (
              <p className="text-[12px] text-[#89929B]">Not referenced by any managed content record.</p>
            )}
          </Card>

          {can(session, "media.delete") && (
            <Card title="Delete">
              <p className="text-[12px] leading-relaxed text-[#59636D]">Removes the file from storage and the register. Blocked while the asset is in use.</p>
              <form action={deleteMedia} className="mt-3">
                <input type="hidden" name="id" value={asset.id} />
                <SubmitButton variant="danger" className="w-full justify-center">Delete asset</SubmitButton>
              </form>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}
