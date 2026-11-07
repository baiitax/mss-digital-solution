import "server-only"

import { createClient } from "@supabase/supabase-js"

/**
 * Runtime settings that the public application actually consumes.
 *
 * Two read paths:
 *  - `getPublicSiteStatus()` uses the anon key, so only `is_public` rows can be
 *    read. It is safe to call from any public render.
 *  - `getContactFormConfig()` and `getOperationalSettings()` require the service
 *    role and are only ever called from server code that must not leak the
 *    private operational row to the browser.
 */

export type SiteStatus = { maintenance_mode: boolean; message: string | null }

export type ContactFormConfig = {
  enquiries_enabled: boolean
  accepted_types: ("partnership" | "general")[]
  rate_limit_per_minute: number
  acknowledgement: string | null
}

export type OperationalSettings = {
  notify_on_enquiry: boolean
  enquiries_enabled: boolean
  maintenance_mode: boolean
  retention_days: number
}

const DEFAULT_FORM_CONFIG: ContactFormConfig = {
  enquiries_enabled: true,
  accepted_types: ["partnership", "general"],
  rate_limit_per_minute: 5,
  acknowledgement: null,
}

const DEFAULT_OPERATIONAL: OperationalSettings = {
  notify_on_enquiry: true,
  enquiries_enabled: true,
  maintenance_mode: false,
  retention_days: 730,
}

function anonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key, {
    auth: { persistSession: false },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => fetch(input, { ...init, next: { revalidate: 30 } } as RequestInit),
    },
  })
}

function serviceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

type SettingsClient = { from: (table: string) => unknown }

async function readSetting(
  client: SettingsClient | null,
  key: string
): Promise<Record<string, unknown> | null> {
  if (!client) return null
  try {
    const query = client.from("site_settings") as {
      select: (columns: string) => {
        eq: (column: string, value: string) => { maybeSingle: () => Promise<{ data: { value: unknown } | null }> }
      }
    }
    const { data } = await query.select("value").eq("key", key).maybeSingle()
    return (data?.value as Record<string, unknown>) ?? null
  } catch {
    return null
  }
}

export async function getPublicSiteStatus(): Promise<SiteStatus> {
  const value = await readSetting(anonClient(), "site_status")
  return {
    maintenance_mode: value?.maintenance_mode === true,
    message: typeof value?.message === "string" && value.message.trim() ? value.message : null,
  }
}

export async function getContactFormConfig(): Promise<ContactFormConfig> {
  const value = await readSetting(serviceClient(), "forms.contact")
  if (!value) return DEFAULT_FORM_CONFIG
  const types = Array.isArray(value.accepted_types)
    ? (value.accepted_types.filter((t) => t === "partnership" || t === "general") as ("partnership" | "general")[])
    : DEFAULT_FORM_CONFIG.accepted_types
  const rate = Number(value.rate_limit_per_minute)
  return {
    enquiries_enabled: value.enquiries_enabled !== false && types.length > 0,
    accepted_types: types.length ? types : DEFAULT_FORM_CONFIG.accepted_types,
    rate_limit_per_minute: Number.isFinite(rate) && rate >= 1 && rate <= 20 ? rate : DEFAULT_FORM_CONFIG.rate_limit_per_minute,
    acknowledgement: typeof value.acknowledgement === "string" && value.acknowledgement.trim() ? value.acknowledgement : null,
  }
}

export async function getOperationalSettings(): Promise<OperationalSettings> {
  const value = await readSetting(serviceClient(), "operational")
  if (!value) return DEFAULT_OPERATIONAL
  const retention = Number(value.retention_days)
  return {
    notify_on_enquiry: value.notify_on_enquiry !== false,
    enquiries_enabled: value.enquiries_enabled !== false,
    maintenance_mode: value.maintenance_mode === true,
    retention_days: Number.isFinite(retention) && retention >= 30 && retention <= 3650 ? retention : DEFAULT_OPERATIONAL.retention_days,
  }
}
