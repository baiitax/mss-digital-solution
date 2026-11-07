import { NextRequest, NextResponse } from "next/server"
import { createSupabaseAdmin } from "@/lib/supabase/admin"
import { getContactFormConfig, getOperationalSettings } from "@/lib/site-config"

// Rate limit in-memory (per instance) — production should use Redis/Upstash
const hits = new Map<string, number[]>()

function rateLimited(ip: string, limit = 5, windowMs = 60_000) {
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter(t => now - t < windowMs)
  if (arr.length >= limit) return true
  arr.push(now)
  hits.set(ip, arr)
  return false
}

const ALLOWED_AREAS = [
  "Digital Health Systems",
  "Geospatial Intelligence",
  "Data Analytics",
  "Programme Management",
  "Research Collaboration",
  "Government Partnership",
  "Development Partnership",
  "General Enquiry",
  "Other",
]


export async function POST(req: NextRequest) {
  // Form behaviour is administered in /admin/forms and read here on every
  // request, so a change made in the portal takes effect without a redeploy.
  const formConfig = await getContactFormConfig()
  const operational = await getOperationalSettings()

  if (!formConfig.enquiries_enabled || !operational.enquiries_enabled) {
    return NextResponse.json(
      { error: "The enquiry form is temporarily closed. Please contact MSS by email." },
      { status: 503 }
    )
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (rateLimited(ip, formConfig.rate_limit_per_minute)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })

  const { full_name, organisation, role, email, telephone, country, area_of_interest, subject, message } = body

  // Normalise enquiry type — partnership vs general, restricted to the types the
  // administrator has enabled in the portal.
  const requestedType = typeof body.enquiry_type === "string" ? body.enquiry_type : ""
  if (requestedType && !formConfig.accepted_types.includes(requestedType as "partnership" | "general")) {
    return NextResponse.json({ error: "That enquiry type is not currently accepted." }, { status: 400 })
  }
  const enquiry_type = formConfig.accepted_types.includes(requestedType as "partnership" | "general")
    ? (requestedType as string)
    : formConfig.accepted_types[0]

  // Server-side validation
  if (!full_name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Missing required fields: full_name, email, message." },
      { status: 400 }
    )
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  if (!emailOk) return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
  if (message.trim().length < 10) return NextResponse.json({ error: "Message too short." }, { status: 400 })
  if (message.trim().length > 5000) return NextResponse.json({ error: "Message too long." }, { status: 400 })

  // A partnership enquiry must name an area of interest; a general enquiry need not.
  const area = enquiry_type === "partnership" ? area_of_interest : (area_of_interest || "General Enquiry")
  if (!ALLOWED_AREAS.includes(area)) {
    return NextResponse.json({ error: "Invalid area_of_interest." }, { status: 400 })
  }

  // Sanitise for storage (basic)
  const clean = (s: string) => s.replace(/[<>]/g, "").trim()

  let supabase
  try {
    supabase = createSupabaseAdmin()
  } catch {
    console.error("Supabase is not configured; enquiry was not persisted")
    return NextResponse.json({ error: "The enquiry service is temporarily unavailable." }, { status: 503 })
  }

  const { error } = await supabase.from("contact_enquiries").insert([{
    full_name: clean(full_name),
    organisation: organisation ? clean(organisation) : null,
    role: role ? clean(role) : null,
    enquiry_type,
    email: email.trim().toLowerCase(),
    telephone: telephone ? clean(telephone) : null,
    country: clean(country || "Nigeria"),
    area_of_interest: area,
    subject: subject ? clean(subject) : (enquiry_type === "general" ? "General Enquiry" : null),
    message: clean(message),
    status: "new",
  }])

  if (error) {
    console.error("Enquiry insert failed", error.message)
    return NextResponse.json({ error: "We could not record your enquiry. Please try again." }, { status: 500 })
  }

  // Notify the administrators who can manage enquiries. Duplicate-safe via dedupe key.
  if (!operational.notify_on_enquiry) {
    return NextResponse.json({ ok: true, acknowledgement: formConfig.acknowledgement })
  }
  const { error: notifyError } = await supabase.rpc("notify_permission", {
    p_permission: "enquiries.manage",
    p_type: "enquiry.new",
    p_title: `New ${enquiry_type} enquiry from ${clean(full_name)}`,
    p_body: area,
    p_link: "/admin/enquiries",
    p_severity: "info",
    p_dedupe_key: `enquiry:${email.trim().toLowerCase()}:${Date.now().toString().slice(0, -5)}`,
  })
  if (notifyError) console.error("Enquiry notification failed:", notifyError.message)

  return NextResponse.json({ ok: true, acknowledgement: formConfig.acknowledgement })
}
