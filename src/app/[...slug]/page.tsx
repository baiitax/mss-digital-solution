import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { BlockRenderer } from "@/components/cms/BlockRenderer"
import { getPublishedPageBySlug } from "@/lib/cms/content"
import { pageMetadata } from "@/lib/seo"

export const revalidate = 60

/**
 * Catch-all renderer for pages published through the admin CMS.
 *
 * Only reached when no hand-built route matches, so every existing site route
 * keeps its bespoke design. Drafts, scheduled and archived pages are excluded
 * by the CMS read itself and resolve to a 404 — a draft can never leak.
 */
type Params = { slug?: string[] }

const toPath = (params: Params) => `/${(params.slug ?? []).join("/")}`.replace(/\/+$/, "") || "/"

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolved = await params
  const path = toPath(resolved)
  const page = await getPublishedPageBySlug(path)
  if (!page) return { title: "Page not found", robots: { index: false, follow: false } }

  return {
    ...pageMetadata({
      title: page.seo_title ?? page.title,
      description: page.seo_description ?? page.summary ?? undefined,
      path,
    }),
    robots: { index: true, follow: true },
  }
}

export default async function CmsPage({ params }: { params: Promise<Params> }) {
  const path = toPath(await params)
  const page = await getPublishedPageBySlug(path)
  if (!page) notFound()

  const heading = page.hero_title ?? page.title
  const description = page.hero_description ?? page.summary

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />
      <main>
        <section className="bg-[#343D46] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#701F3D]/15 via-transparent to-[#252B31]/60" />
          <div className="relative container-mss py-14 sm:py-16 lg:py-20">
            <div className="mb-5">
              <Breadcrumbs items={[{ label: page.nav_label ?? page.title, href: path }]} />
            </div>
            <div className="max-w-[820px]">
              {page.hero_eyebrow && (
                <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.10] rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80">
                  {page.hero_eyebrow}
                </div>
              )}
              <h1
                className="font-bold tracking-[-0.03em] leading-[0.95] mt-5 text-white"
                style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
              >
                {heading}
              </h1>
              {description && (
                <p className="text-white/65 leading-relaxed mt-5 max-w-[700px] text-[16px]">{description}</p>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container-mss">
            <BlockRenderer blocks={page.blocks} />
            {(!page.blocks || page.blocks.length === 0) && (
              <p className="text-[14px] text-[#59636D]">
                This page is published, but no content blocks have been added yet.
              </p>
            )}
            <div className="mt-12 border-t border-[#E8EAEC] pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#701F3D] px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#5c1932]"
              >
                Discuss a programme with MSS
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
