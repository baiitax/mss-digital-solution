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

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })

  const { full_name, organisation, email, telephone, country, area_of_interest, subject, message } = body

  // Server-side validation
  if (!full_name?.trim() || !email?.trim() || !area_of_interest?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Missing required fields: full_name, email, area_of_interest, message." }, { status: 400 })
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  if (!emailOk) return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
  if (message.trim().length < 10) return NextResponse.json({ error: "Message too short." }, { status: 400 })
  if (message.trim().length > 5000) return NextResponse.json({ error: "Message too long." }, { status: 400 })

  const allowed = ["Digital Health Systems","Geospatial Intelligence","Data Analytics","Programme Management","Research Collaboration","Government Partnership","Development Partnership","Other"]
  if (!allowed.includes(area_of_interest)) return NextResponse.json({ error: "Invalid area_of_interest." }, { status: 400 })

  // Sanitise subject/message for storage (basic)
  const clean = (s: string) => s.replace(/[<>]/g, "").trim()

  const supabase = createServerClient()
  if (!supabase) {
    // No Supabase configured — return success for demo, but log
    console.warn("Supabase not configured; contact enquiry not persisted:", { full_name, email })
    return NextResponse.json({ ok: true, demo: true })
  }

  const { error } = await supabase.from("contact_enquiries").insert([{
    full_name: clean(full_name),
    organisation: organisation ? clean(organisation) : null,
    email: email.trim().toLowerCase(),
    telephone: telephone ? clean(telephone) : null,
    country: clean(country || "Nigeria"),
    area_of_interest,
    subject: subject ? clean(subject) : null,
    message: clean(message),
    status: "new",
  }])

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Optional: trigger email via Supabase Edge Function / Resend — configured via site_settings notification_email

  return NextResponse.json({ ok: true })
}
