import { SubmitButton } from "@/components/admin/form"
import { archiveEntity, setEntityStatus } from "@/app/admin/actions/content"

const FLOW = [
  { status: "draft", label: "Draft" },
  { status: "in_review", label: "Submit for review" },
  { status: "approved", label: "Approve" },
  { status: "published", label: "Publish" },
]

export function Workflow({ entity, id, status, canPublish }: { entity: string; id: string; status: string; canPublish: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {FLOW.map((step) => {
          const isCurrent = status === step.status
          const needsPublish = step.status === "published" || step.status === "approved"
          if (needsPublish && !canPublish) return null
          return (
            <form key={step.status} action={setEntityStatus}>
              <input type="hidden" name="entity" value={entity} />
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="status" value={step.status} />
              <SubmitButton
                variant={isCurrent ? "secondary" : step.status === "published" ? "primary" : "secondary"}
                className={isCurrent ? "opacity-60" : ""}
              >
                {isCurrent ? `${step.label} ✓` : step.label}
              </SubmitButton>
            </form>
          )
        })}
      </div>
      <form action={archiveEntity}>
        <input type="hidden" name="entity" value={entity} />
        <input type="hidden" name="id" value={id} />
        <SubmitButton variant="danger" className="w-full justify-center">Archive</SubmitButton>
      </form>
    </div>
  )
}
