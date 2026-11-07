import Link from "next/link"
import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, Empty, PageHeader, StatusPill, formatDate } from "@/components/admin/ui"
import { Field, Select, SubmitButton, TextArea, TextInput } from "@/components/admin/form"
import { saveProject } from "@/app/admin/actions/content"

export default async function ProjectsPage() {
  await requirePermission("projects.view")
  const supabase = await createSupabaseServerClient()
  const { data: rows } = await supabase
    .from("projects")
    .select("id, slug, title, category, state, status, featured, verification_level, updated_at")
    .is("deleted_at", null)
    .order("updated_at", { ascending: false })

  return (
    <>
      <PageHeader title="Projects & case studies" description="Programme portfolio. Every record carries a verification level so illustrative content is never presented as programme results." />
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card bodyClassName="">
            {rows && rows.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[12.5px]">
                  <thead className="border-b border-[#EDEFF1] bg-[#FAF9F7] text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold">Project</th>
                      <th className="px-4 py-2.5 font-semibold">Verification</th>
                      <th className="px-4 py-2.5 font-semibold">Status</th>
                      <th className="px-4 py-2.5 font-semibold">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F1F2]">
                    {rows.map((row) => (
                      <tr key={row.id} className="hover:bg-[#FAF9F7]">
                        <td className="px-4 py-3">
                          <Link href={`/admin/projects/${row.id}`} className="font-medium text-[#252B31] hover:text-[#701F3D]">{row.title}</Link>
                          <p className="text-[11.5px] text-[#89929B]">{row.category || "Uncategorised"} · {row.state || "—"}{row.featured ? " · featured" : ""}</p>
                        </td>
                        <td className="px-4 py-3"><span className="rounded bg-[#F0F1F2] px-1.5 py-0.5 text-[10.5px] uppercase tracking-wide text-[#59636D]">{row.verification_level?.replace(/_/g, " ")}</span></td>
                        <td className="px-4 py-3"><StatusPill status={row.status} /></td>
                        <td className="px-4 py-3 text-[#59636D]">{formatDate(row.updated_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Empty title="No projects recorded" description="Create the first case study to populate Our Work and the homepage featured project." />
            )}
          </Card>
        </div>
        <Card title="Create project">
          <form action={saveProject} className="space-y-3">
            <Field label="Title"><TextInput name="title" required /></Field>
            <Field label="Slug"><TextInput name="slug" required /></Field>
            <Field label="Category"><TextInput name="category" placeholder="Immunisation systems" /></Field>
            <Field label="State"><TextInput name="state" placeholder="Kano" /></Field>
            <Field label="Verification level">
              <Select name="verification_level" options={[
                { value: "verified", label: "Verified project information" },
                { value: "illustrative", label: "Illustrative content" },
                { value: "synthetic", label: "Synthetic demonstration" },
                { value: "awaiting_approval", label: "Awaiting approval" },
              ]} />
            </Field>
            <Field label="Summary"><TextArea name="summary" rows={2} /></Field>
            <SubmitButton className="w-full justify-center">Create draft</SubmitButton>
          </form>
        </Card>
      </div>
    </>
  )
}
