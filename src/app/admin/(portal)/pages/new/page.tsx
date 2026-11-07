import { requirePermission } from "@/lib/auth/guards"
import { Card, PageHeader } from "@/components/admin/ui"
import { Field, Select, SubmitButton, TextArea, TextInput } from "@/components/admin/form"
import { savePage } from "@/app/admin/actions/pages"

export default async function NewPage() {
  await requirePermission("pages.create")
  return (
    <>
      <PageHeader title="Create page" description="New pages start as drafts. Nothing appears on the public site until it is published." />
      <form action={savePage} className="max-w-3xl">
        <Card title="Page details">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Title"><TextInput name="title" required /></Field>
            <Field label="Route (slug)" hint="Lowercase, starts with /"><TextInput name="slug" placeholder="/about/our-approach" required /></Field>
            <Field label="Navigation label"><TextInput name="nav_label" /></Field>
            <Field label="Template">
              <Select name="template" options={[
                { value: "standard", label: "Standard" },
                { value: "capability", label: "Capability" },
                { value: "case-study", label: "Case study" },
                { value: "legal", label: "Legal" },
              ]} />
            </Field>
            <Field label="Summary" className="sm:col-span-2"><TextArea name="summary" rows={2} /></Field>
          </div>
          <div className="mt-4 flex justify-end"><SubmitButton>Create draft</SubmitButton></div>
        </Card>
      </form>
    </>
  )
}
