import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

/**
 * /contact is a client component (it owns the enquiry form state), so it cannot
 * export metadata itself. A route-level layout carries it instead.
 */
export const metadata: Metadata = pageMetadata({
  title: "Contact — Partner With Us",
  path: "/contact",
  description:
    "Contact MSS Digital Solutions in Kano, Nigeria about digital health systems, geospatial intelligence, data analytics and programme implementation partnerships.",
  shareDescription:
    "Talk to MSS Digital Solutions about a programme, a partnership or a technical question — a Kano-based implementation partner for governments, development partners and healthcare institutions.",
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
