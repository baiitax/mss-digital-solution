import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

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

const ALLOWED_TYPES = ["partnership", "general"]

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })

  const { full_name, organisation, role, email, telephone, country, area_of_interest, subject, message } = body

  // Normalise enquiry type — partnership vs general
  const enquiry_type = ALLOWED_TYPES.includes(body.enquiry_type) ? body.enquiry_type : "partnership"

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

  const supabase = createServerClient()
  if (!supabase) {
    // No Supabase configured — acknowledge for demo, but log
    console.warn("Supabase not configured; enquiry not persisted:", { full_name, email, enquiry_type })
    return NextResponse.json({ ok: true, demo: true })
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

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
