import Link from "next/link"
import { requireAdmin } from "@/lib/auth/guards"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Card, Empty, NotConfigured, PageHeader, RelativeTime, Stat, StatusPill, formatDate } from "@/components/admin/ui"
import { dayGreeting } from "@/lib/time"


type EnquiryRow = {
  id: string
  full_name: string
  organisation: string | null
  area_of_interest: string | null
  enquiry_type: string
  status: string
  priority: string
  created_at: string
  read_at: string | null
}

type AuditRow = {
  id: string
  actor_email: string | null
  action: string
  module: string
  summary: string | null
  created_at: string
}

type PageRow = {
  id: string
  slug: string
  title: string
  status: string
  updated_at: string
}

export default async function DashboardPage() {
  const session = await requireAdmin()
  const supabase = await createSupabaseServerClient()
  const p = session.permissions
  const can = (perm: string) => p.includes(perm)

  // Counts are issued as explicit typed queries; each resolves to a count or null
  // when the signed-in role is not permitted to read the table at all.
  const n = (result: { count: number | null } | null): number | null => result?.count ?? null

  const [
    pagesPublished, pagesDraft, projectsPublished, insightsPublished, insightsDraft,
    enquiriesTotal, enquiriesUnread, enquiriesNew, partnershipsPending,
    mediaAssets, activeAdmins,
  ] = await Promise.all([
    can("pages.view") ? supabase.from("pages").select("id", { count: "exact", head: true }).eq("status", "published").is("deleted_at", null) : null,
    can("pages.view") ? supabase.from("pages").select("id", { count: "exact", head: true }).eq("status", "draft").is("deleted_at", null) : null,
    can("projects.view") ? supabase.from("projects").select("id", { count: "exact", head: true }).eq("status", "published").is("deleted_at", null) : null,
    can("insights.view") ? supabase.from("insights").select("id", { count: "exact", head: true }).eq("status", "published").is("deleted_at", null) : null,
    can("insights.view") ? supabase.from("insights").select("id", { count: "exact", head: true }).in("status", ["draft", "in_review"]).is("deleted_at", null) : null,
    can("enquiries.view") ? supabase.from("contact_enquiries").select("id", { count: "exact", head: true }).is("deleted_at", null) : null,
    can("enquiries.view") ? supabase.from("contact_enquiries").select("id", { count: "exact", head: true }).is("read_at", null).is("deleted_at", null) : null,
    can("enquiries.view") ? supabase.from("contact_enquiries").select("id", { count: "exact", head: true }).eq("status", "new").is("deleted_at", null) : null,
    can("partnerships.view") ? supabase.from("partnership_requests").select("id", { count: "exact", head: true }).in("status", ["new", "assessment"]) : null,
    can("media.view") ? supabase.from("media_assets").select("id", { count: "exact", head: true }) : null,
    can("users.manage") ? supabase.from("profiles").select("id", { count: "exact", head: true }).eq("status", "active") : null,
  ])

  const [recentEnquiries, recentAudit, recentPages, drafts] = await Promise.all([
    can("enquiries.view")
      ? supabase.from("contact_enquiries")
          .select("id, full_name, organisation, area_of_interest, enquiry_type, status, priority, created_at, read_at")
          .is("deleted_at", null).order("created_at", { ascending: false }).limit(6)
      : { data: [] as EnquiryRow[] },
    can("audit.view")
      ? supabase.from("audit_logs").select("id, actor_email, action, module, summary, created_at").order("created_at", { ascending: false }).limit(8)
      : { data: [] as AuditRow[] },
    can("pages.view")
      ? supabase.from("pages").select("id, slug, title, status, updated_at").is("deleted_at", null).order("updated_at", { ascending: false }).limit(6)
      : { data: [] as PageRow[] },
    can("pages.view")
      ? supabase.from("pages").select("id, slug, title, status, updated_at").in("status", ["draft", "in_review"]).is("deleted_at", null).order("updated_at", { ascending: false }).limit(5)
      : { data: [] as PageRow[] },
  ])

  const quickActions = [
    can("pages.create") && { label: "Create page", href: "/admin/pages/new" },
    can("projects.manage") && { label: "Add project", href: "/admin/projects/new" },
    can("media.upload") && { label: "Upload image", href: "/admin/media" },
    can("insights.manage") && { label: "Publish insight", href: "/admin/insights/new" },
    can("enquiries.view") && { label: "Review enquiries", href: "/admin/enquiries" },
    can("homepage.manage") && { label: "Update homepage", href: "/admin/homepage" },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <>
      <PageHeader
        title={`Good ${dayGreeting()}, ${session.fullName.split(" ")[0] || "Administrator"}`}
        description="Operational state of the public website, content pipeline and inbound enquiries. Every figure below is read live from the database."
        actions={
          quickActions.slice(0, 3).map((a) => (
            <Link key={a.href} href={a.href} className="rounded-lg bg-[#701F3D] px-3 py-2 text-[12.5px] font-semibold text-white hover:bg-[#50152D]">
              {a.label}
            </Link>
          ))
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Published pages" value={n(pagesPublished)} hint={n(pagesDraft) ? `${n(pagesDraft)} draft` : "No drafts"} href={can("pages.view") ? "/admin/pages" : undefined} />
        <Stat label="Published projects" value={n(projectsPublished)} hint="Case studies live" href={can("projects.view") ? "/admin/projects" : undefined} />
        <Stat label="Published insights" value={n(insightsPublished)} hint={n(insightsDraft) ? `${n(insightsDraft)} awaiting review` : "Pipeline clear"} href={can("insights.view") ? "/admin/insights" : undefined} />
        <Stat label="Unread enquiries" value={n(enquiriesUnread)} tone={n(enquiriesUnread) ? "attention" : "default"} hint={n(enquiriesTotal) !== null ? `${n(enquiriesTotal)} total received` : undefined} href={can("enquiries.view") ? "/admin/enquiries" : undefined} />
        <Stat label="New enquiries" value={n(enquiriesNew)} tone={n(enquiriesNew) ? "attention" : "default"} hint="Status: new" href={can("enquiries.view") ? "/admin/enquiries?status=new" : undefined} />
        <Stat label="Partnership requests" value={n(partnershipsPending)} hint="New or in assessment" href={can("partnerships.view") ? "/admin/partnerships" : undefined} />
        <Stat label="Media assets" value={n(mediaAssets)} hint="Registered in the library" href={can("media.view") ? "/admin/media" : undefined} />
        <Stat label="Active administrators" value={n(activeAdmins)} hint="Accounts enabled" href={can("users.manage") ? "/admin/users" : undefined} />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        <Card
          className="xl:col-span-2"
          title="Recent enquiries"
          description="Latest submissions from the public contact form"
          actions={can("enquiries.view") ? <Link href="/admin/enquiries" className="text-[12px] font-semibold text-[#701F3D] hover:underline">Open inbox</Link> : undefined}
          bodyClassName=""
        >
          {recentEnquiries.data && recentEnquiries.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12.5px]">
                <thead className="border-b border-[#EDEFF1] bg-[#FAF9F7] text-[10.5px] uppercase tracking-[0.12em] text-[#89929B]">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">Contact</th>
                    <th className="px-4 py-2.5 font-semibold">Type</th>
                    <th className="px-4 py-2.5 font-semibold">Received</th>
                    <th className="px-4 py-2.5 font-semibold">Status</th>
                    <th className="px-4 py-2.5 font-semibold">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F1F2]">
                  {recentEnquiries.data.map((row) => (
                    <tr key={row.id} className="hover:bg-[#FAF9F7]">
                      <td className="px-4 py-3">
                        <Link href={`/admin/enquiries/${row.id}`} className="font-medium text-[#252B31] hover:text-[#701F3D]">{row.full_name}</Link>
                        <p className="text-[11.5px] text-[#89929B]">{row.organisation || row.area_of_interest}</p>
                      </td>
                      <td className="px-4 py-3 capitalize text-[#59636D]">{row.enquiry_type}</td>
                      <td className="px-4 py-3 text-[#59636D]"><RelativeTime iso={row.created_at} /></td>
                      <td className="px-4 py-3"><StatusPill status={row.status} /></td>
                      <td className="px-4 py-3 text-[#59636D] capitalize">{row.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty title="No enquiries yet" description="Submissions from the public contact form appear here immediately." />
          )}
        </Card>

        <Card title="Quick actions" description="Shortcuts permitted for your role">
          <div className="grid gap-2">
            {quickActions.map((a) => (
              <Link key={a.href} href={a.href} className="flex items-center justify-between rounded-lg border border-[#E3E6E8] px-3 py-2.5 text-[12.5px] font-medium text-[#252B31] hover:border-[#701F3D]/40 hover:bg-[#FAF9F7]">
                {a.label}
                <span className="text-[#89929B]">→</span>
              </Link>
            ))}
            {quickActions.length === 0 && <p className="text-[12.5px] text-[#89929B]">No quick actions are permitted for your role.</p>}
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card title="Content needing attention" description="Drafts and items in review">
          {drafts.data && drafts.data.length > 0 ? (
            <ul className="divide-y divide-[#F0F1F2]">
              {drafts.data.map((page) => (
                <li key={page.id} className="flex items-center justify-between gap-2 py-2.5">
                  <div className="min-w-0">
                    <Link href={`/admin/pages/${page.id}`} className="block truncate text-[12.5px] font-medium text-[#252B31] hover:text-[#701F3D]">{page.title}</Link>
                    <p className="truncate text-[11px] text-[#89929B]">{page.slug}</p>
                  </div>
                  <StatusPill status={page.status} />
                </li>
              ))}
            </ul>
          ) : (
            <Empty title="Nothing waiting" description="No drafts or review items on pages." />
          )}
        </Card>

        <Card title="Recently edited pages" description="Ordered by last update">
          {recentPages.data && recentPages.data.length > 0 ? (
            <ul className="divide-y divide-[#F0F1F2]">
              {recentPages.data.map((page) => (
                <li key={page.id} className="flex items-center justify-between gap-2 py-2.5">
                  <Link href={`/admin/pages/${page.id}`} className="min-w-0 truncate text-[12.5px] text-[#252B31] hover:text-[#701F3D]">{page.title}</Link>
                  <span className="shrink-0 text-[11px] text-[#89929B]">{formatDate(page.updated_at)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <Empty title="No pages edited yet" description="Page edits are timestamped here." />
          )}
        </Card>

        <Card title="Website analytics" description="Traffic and conversion reporting">
          <NotConfigured
            what="Analytics"
            detail="No analytics provider is connected to this project, so traffic, most-visited pages and conversion trends are not shown. Connect a provider in Website Settings to enable this panel."
          />
        </Card>
      </div>

      {can("audit.view") && (
        <Card className="mt-4" title="Recent administrative activity" description="Append-only audit trail" actions={<Link href="/admin/audit-logs" className="text-[12px] font-semibold text-[#701F3D] hover:underline">Full log</Link>} bodyClassName="">
          {recentAudit.data && recentAudit.data.length > 0 ? (
            <ul className="divide-y divide-[#F0F1F2]">
              {recentAudit.data.map((entry) => (
                <li key={entry.id} className="flex flex-wrap items-center gap-x-2 gap-y-1 px-4 py-2.5 text-[12.5px]">
                  <span className="font-medium text-[#252B31]">{entry.actor_email || "system"}</span>
                  <span className="text-[#89929B]">{entry.summary || entry.action}</span>
                  <span className="rounded bg-[#F0F1F2] px-1.5 py-0.5 text-[10.5px] uppercase tracking-wide text-[#59636D]">{entry.module}</span>
                  <span className="ml-auto text-[11px] text-[#89929B]"><RelativeTime iso={entry.created_at} /></span>
                </li>
              ))}
            </ul>
          ) : (
            <Empty title="No activity recorded yet" description="Administrative actions are appended here as they occur." />
          )}
        </Card>
      )}
    </>
  )
}


