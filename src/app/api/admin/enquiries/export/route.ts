import { NextResponse } from "next/server"
import { getAdminSession } from "@/lib/auth/session"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function GET() {
  const session = await getAdminSession()
  if (!session || !session.permissions.includes("enquiries.view")) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("contact_enquiries")
    .select("created_at, full_name, organisation, role, email, telephone, country, enquiry_type, area_of_interest, subject, status, priority, message")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })

  if (error) return new NextResponse(error.message, { status: 500 })

  const headers = ["received", "name", "organisation", "position", "email", "telephone", "country", "type", "area_of_interest", "subject", "status", "priority", "message"]
  const escape = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`
  const csv = [
    headers.join(","),
    ...(data ?? []).map((row) =>
      [row.created_at, row.full_name, row.organisation, row.role, row.email, row.telephone, row.country, row.enquiry_type, row.area_of_interest, row.subject, row.status, row.priority, row.message]
        .map(escape)
        .join(",")
    ),
  ].join("\n")

  await supabase.rpc("record_audit", {
    p_action: "enquiry.exported",
    p_module: "Enquiries",
    p_summary: `Exported ${data?.length ?? 0} enquiry records`,
    p_metadata: { format: "csv" },
  })

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="mss-enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  })
}
