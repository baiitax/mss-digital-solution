import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, Calendar, User } from "lucide-react"
import { getInsightBySlug } from "@/lib/cms/content"
import { LogoMark } from "@/components/brand/Logo"

/**
 * Insight article template.
 *
 * Publishing architecture — no invented articles are shipped:
 * 1. Add a record to `postsBySlug` (or load from Supabase `insights` table).
 * 2. Fields: title, category, date, read, author, body[] (rich paragraphs).
 * 3. Static params are generated automatically; SEO metadata is derived per slug.
 *
 * While the registry is empty, every /insights/[slug] request returns 404 —
 * which is correct: MSS does not publish unapproved or fictional research.
 */
type InsightPost = {
  title: string
  category: string
  date: string
  read: string
  author: string
  body: string[]
}

const postsBySlug: Record<string, InsightPost> = {}

// Rendered on demand rather than prerendered while the article registry is empty.
export const dynamic = "force-dynamic"

// Once articles exist, reinstate pre-rendering:
//   export async function generateStaticParams() {
//     return Object.keys(postsBySlug).map((slug) => ({ slug }))
//   }
// (Cache Components requires a non-empty result, so it is enabled with the
// first published article rather than before.)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cms = await getInsightBySlug(slug)
  if (cms) {
    return {
      title: cms.seo_title ?? `${cms.title} | MSS Insights`,
      description: cms.seo_description ?? cms.excerpt ?? undefined,
      openGraph: { title: cms.title, type: "article", publishedTime: cms.published_at ?? undefined },
      robots: { index: true, follow: true },
    }
  }
  const post = postsBySlug[slug]
  if (!post) {
    // Not a published article: render the branded not-found state and make
    // sure search engines do not index the URL.
    return { title: "Insight not found — MSS Digital Solutions", robots: { index: false, follow: false } }
  }
  return {
    title: `${post.title} | MSS Insights`,
    description: post.body[0]?.slice(0, 155),
    openGraph: { title: post.title, type: "article", publishedTime: post.date },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cms = await getInsightBySlug(slug)

  if (cms) {
    // Published article managed in the admin portal. Body is plain text authored
    // in the editor — blank-line separated paragraphs, rendered as text only.
    const paragraphs = String(cms.body ?? "").split(/\n{2,}/).map((p: string) => p.trim()).filter(Boolean)
    return (
      <div className="min-h-screen bg-[#FAF9F7]">
        <Navbar />
        <main>
          <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
            <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-[#701F3D] hover:text-[#252B31] font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge variant="burgundy">{cms.category.replace(/-/g, " ")}</Badge>
              {cms.published_at && (
                <span className="text-xs text-[#89929B] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {new Date(cms.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              )}
              {cms.read_minutes && (
                <span className="text-xs text-[#89929B] flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {cms.read_minutes} min read</span>
              )}
            </div>

            <h1 className="font-bold text-3xl lg:text-4xl tracking-tight text-[#252B31] mt-6 leading-tight">{cms.title}</h1>
            {cms.excerpt && <p className="mt-4 text-[16px] leading-relaxed text-[#59636D]">{cms.excerpt}</p>}

            <div className="mt-6 flex items-center border-y border-[#E8EAEC] py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-[#E8EAEC] bg-white flex items-center justify-center">
                  <LogoMark size={22} className="h-[22px] w-auto" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#252B31] flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {cms.author}</div>
                  <div className="text-xs text-[#89929B]">MSS Digital Solutions Ltd</div>
                </div>
              </div>
            </div>

            {cms.cover_image && (
              <figure className="mt-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cms.cover_image} alt="" className="w-full rounded-2xl border border-[#E8EAEC] object-cover" />
              </figure>
            )}

            <div className="mt-8 space-y-4 text-[#343D46] leading-relaxed">
              {paragraphs.length > 0 ? paragraphs.map((para: string, i: number) => <p key={i}>{para}</p>) : null}
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-[#E8EAEC] pt-6">
              <Link href="/insights" className="text-sm font-semibold text-[#701F3D] hover:text-[#252B31]">← More insights</Link>
              <Link href="/contact" className="bg-[#343D46] text-white px-5 h-10 rounded-full text-sm font-semibold inline-flex items-center">Discuss this topic with MSS</Link>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    )
  }

  const post = postsBySlug[slug]
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Navbar />
      <main>
        <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-[#701F3D] hover:text-[#252B31] font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge variant="burgundy">{post.category}</Badge>
            <span className="text-xs text-[#89929B] flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
            <span className="text-xs text-[#89929B] flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.read}</span>
          </div>

          <h1 className="font-bold text-3xl lg:text-4xl tracking-tight text-[#252B31] mt-6 leading-tight">{post.title}</h1>

          <div className="mt-6 flex items-center border-y border-[#E8EAEC] py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#E8EAEC] bg-white flex items-center justify-center">
                  <LogoMark size={22} className="h-[22px] w-auto" />
                </div>
              <div>
                <div className="text-sm font-semibold text-[#252B31] flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.author}</div>
                <div className="text-xs text-[#89929B]">MSS Digital Solutions Ltd • Kano</div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-[#343D46] leading-relaxed">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-[#E8EAEC] pt-6">
            <Link href="/insights" className="text-sm font-semibold text-[#701F3D] hover:text-[#252B31]">← More insights</Link>
            <Link href="/contact" className="bg-[#343D46] text-white px-5 h-10 rounded-full text-sm font-semibold inline-flex items-center">Discuss this topic with MSS</Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
