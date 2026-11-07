import { requirePermission } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, PageHeader, formatDate } from "@/components/admin/ui"
import { Checkbox, Field, SubmitButton, TextArea, TextInput } from "@/components/admin/form"
import { saveHomepageSection, toggleHomepageSection } from "@/app/admin/actions/site"

export default async function HomepageManager() {
  await requirePermission("homepage.manage")
  const supabase = await createSupabaseServerClient()
  const { data: sections } = await supabase.from("homepage_sections").select("*").order("display_order", { ascending: true })

  return (
    <>
      <PageHeader
        title="Homepage manager"
        description="Each block below is rendered live on the public homepage. Hiding a section removes it from the page without deleting the content."
        actions={<a href="/" target="_blank" className="rounded-lg border border-[#DDE1E4] bg-white px-3 py-2 text-[12.5px] font-semibold text-[#252B31] hover:bg-[#F0F1F2]">View homepage ↗</a>}
      />
      <div className="space-y-4">
        {(sections ?? []).map((section) => (
          <Card
            key={section.id}
            title={`${section.label}`}
            description={`Key: ${section.section_key} · order ${section.display_order} · updated ${formatDate(section.updated_at)}`}
            actions={
              <form action={toggleHomepageSection}>
                <input type="hidden" name="id" value={section.id} />
                <input type="hidden" name="visible" value={String(!section.is_visible)} />
                <SubmitButton variant="secondary">{section.is_visible ? "Hide section" : "Show section"}</SubmitButton>
              </form>
            }
          >
            <form action={saveHomepageSection}>
              <input type="hidden" name="id" value={section.id} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Eyebrow"><TextInput name="eyebrow" defaultValue={section.eyebrow} /></Field>
                <Field label="Display order"><TextInput name="display_order" type="number" defaultValue={section.display_order} /></Field>
                <Field label="Title" className="sm:col-span-2"><TextInput name="title" defaultValue={section.title} /></Field>
                <Field label="Subtitle" className="sm:col-span-2"><TextInput name="subtitle" defaultValue={section.subtitle} /></Field>
                <Field label="Body copy" className="sm:col-span-2"><TextArea name="body" rows={3} defaultValue={section.body} /></Field>
                <Field label="Image URL"><TextInput name="image_url" defaultValue={section.image_url} /></Field>
                <Field label="Image alt text"><TextInput name="image_alt" defaultValue={section.image_alt} /></Field>
                <Field label="Primary CTA label"><TextInput name="cta_label" defaultValue={section.cta_label} /></Field>
                <Field label="Primary CTA link"><TextInput name="cta_href" defaultValue={section.cta_href} /></Field>
                <Field label="Secondary CTA label"><TextInput name="secondary_cta_label" defaultValue={section.secondary_cta_label} /></Field>
                <Field label="Secondary CTA link"><TextInput name="secondary_cta_href" defaultValue={section.secondary_cta_href} /></Field>
                <div className="sm:col-span-2"><Checkbox name="is_visible" defaultChecked={section.is_visible} label="Visible on the public homepage" /></div>
              </div>
              <div className="mt-3 flex justify-end"><SubmitButton>Save section</SubmitButton></div>
            </form>
          </Card>
        ))}
        {(!sections || sections.length === 0) && (
          <Card><p className="text-[12.5px] text-[#89929B]">No homepage sections are registered. Run the seed migration to create them.</p></Card>
        )}
      </div>
    </>
  )
}
