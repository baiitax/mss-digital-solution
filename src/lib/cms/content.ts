import "server-only"

import { createClient } from "@supabase/supabase-js"

/**
 * Public content reads. Uses the anon key so RLS applies — only rows the
 * policies expose to `anon` (published, visible) can ever reach a visitor.
 */
function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key, {
    auth: { persistSession: false },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, { ...init, next: { revalidate: 60 } } as RequestInit),
    },
  })
}

export type HomepageSection = {
  section_key: string
  eyebrow: string | null
  title: string | null
  subtitle: string | null
  body: string | null
  image_url: string | null
  image_alt: string | null
  cta_label: string | null
  cta_href: string | null
  secondary_cta_label: string | null
  secondary_cta_href: string | null
}

export async function getHomepageSections(): Promise<Record<string, HomepageSection>> {
  const supabase = publicClient()
  if (!supabase) return {}
  try {
    const { data } = await supabase
      .from("homepage_sections")
      .select("section_key, eyebrow, title, subtitle, body, image_url, image_alt, cta_label, cta_href, secondary_cta_label, secondary_cta_href")
      .eq("is_visible", true)
    return Object.fromEntries((data ?? []).map((row) => [row.section_key, row as HomepageSection]))
  } catch {
    return {}
  }
}

export async function getPublishedCapabilities() {
  const supabase = publicClient()
  if (!supabase) return []
  try {
    const { data } = await supabase
      .from("capabilities")
      .select("slug, name, short_name, summary, hero_image, display_order")
      .eq("status", "published")
      .order("display_order")
    return data ?? []
  } catch {
    return []
  }
}

export async function getPublishedInsights(limit = 40) {
  const supabase = publicClient()
  if (!supabase) return []
  try {
    const { data } = await supabase
      .from("insights")
      .select("slug, title, excerpt, category, author, read_minutes, published_at, cover_image, featured")
      .eq("status", "published")
      .is("deleted_at", null)
      .order("published_at", { ascending: false })
      .limit(limit)
    return data ?? []
  } catch {
    return []
  }
}

export async function getInsightBySlug(slug: string) {
  const supabase = publicClient()
  if (!supabase) return null
  try {
    const { data } = await supabase
      .from("insights")
      .select("slug, title, excerpt, body, category, author, read_minutes, published_at, seo_title, seo_description, cover_image, tags")
      .eq("slug", slug)
      .eq("status", "published")
      .is("deleted_at", null)
      .maybeSingle()
    return data
  } catch {
    return null
  }
}

export async function getPublishedProjects(limit = 12) {
  const supabase = publicClient()
  if (!supabase) return []
  try {
    const { data } = await supabase
      .from("projects")
      .select("slug, title, summary, category, state, country, period, cover_image, featured, verification_level")
      .eq("status", "published")
      .is("deleted_at", null)
      .order("featured", { ascending: false })
      .order("updated_at", { ascending: false })
      .limit(limit)
    return data ?? []
  } catch {
    return []
  }
}

export async function getVisibleLeadership() {
  const supabase = publicClient()
  if (!supabase) return []
  try {
    const { data } = await supabase
      .from("leadership_profiles")
      .select("slug, full_name, position, summary, biography, portrait_url")
      .eq("status", "published")
      .eq("is_visible", true)
      .order("display_order")
    return data ?? []
  } catch {
    return []
  }
}

export async function getPublicSiteSettings() {
  const supabase = publicClient()
  if (!supabase) return {} as Record<string, unknown>
  try {
    const { data } = await supabase.from("site_settings").select("key, value").eq("is_public", true)
    return Object.fromEntries((data ?? []).map((row) => [row.key, row.value]))
  } catch {
    return {} as Record<string, unknown>
  }
}

export type CmsPage = {
  slug: string
  title: string
  nav_label: string | null
  summary: string | null
  hero_eyebrow: string | null
  hero_title: string | null
  hero_description: string | null
  blocks: { id?: string; type: string; [key: string]: unknown }[] | null
  published_at: string | null
  seo_title: string | null
  seo_description: string | null
}

/**
 * A single published page. RLS already restricts `anon` to published rows;
 * the explicit filters keep drafts and future-scheduled pages out of the
 * public renderer even if a policy is ever widened by mistake.
 */
export async function getPublishedPageBySlug(slug: string): Promise<CmsPage | null> {
  const supabase = publicClient()
  if (!supabase) return null
  try {
    const { data } = await supabase
      .from("pages")
      .select("slug, title, nav_label, summary, hero_eyebrow, hero_title, hero_description, blocks, published_at, seo_title, seo_description")
      .eq("slug", slug)
      .eq("status", "published")
      .is("deleted_at", null)
      .lte("published_at", new Date().toISOString())
      .maybeSingle()
    return (data as CmsPage) ?? null
  } catch {
    return null
  }
}
