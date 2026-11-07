# Administrator onboarding procedure

**For:** MSS Digital Solutions staff who will operate the website through the administration portal
**Portal:** `/admin` (`/admin/login`)
**This document contains no credentials and no secret values.** Where an account or key is needed, the procedure says who supplies it and how.

---

## 0. What the portal is for

The portal at `/admin` is the only place the website is changed. Nothing on the public site is hard-coded any more: homepage copy, page content, insights, projects, navigation, SEO metadata and the enquiry form settings all come from the database and are read by the public site.

Practical consequence: **saving a draft changes nothing for visitors, publishing does.** The website updates within about a minute of publishing (revalidation window), or immediately on a hard refresh of the public page.

---

## 1. Getting an account

There is no sign-up page. Accounts exist only because an administrator created them.

1. A **Super Administrator** or **Administrator** signs in and opens **System Administration → User Management**.
2. They choose **Invite administrator**, enter the person's work email and pick a role (see §2).
3. The portal displays a **one-time invitation link**. The administrator copies it and sends it through an approved channel. The portal does not email it — no email provider is connected.
4. The invited person opens the link, sets their own password, and signs in at `/admin/login`.

The link is single-use. If it expires, the administrator re-issues it from the same screen.

> A person's role determines what they can see. Nobody can grant themselves a permission; only a Super Administrator can edit role permissions.

## 2. Choosing the right role

| Role | Use it for | Cannot do |
| --- | --- | --- |
| **Super Administrator** | The owner and at most one deputy. Full control. | — |
| **Administrator** | Day-to-day site management | Change role permissions |
| **Content Manager** | Running the website content pipeline, media, navigation, SEO | Manage users, read audit logs, manage platform settings |
| **Editor** | Writing and preparing content | Publish, delete, or change settings |
| **Communications Manager** | Working the enquiry and partnership inboxes | Touch the website, media or settings |
| **Analyst / Viewer** | Read-only oversight | Change anything |

Start people on the smallest role that lets them do their job. The full matrix is in `ADMIN-PERMISSION-MATRIX-2026-11-07.md`.

## 3. First sign-in checklist

1. Sign in at `/admin/login`.
2. Confirm your name and role appear top-right. If the role is wrong, ask the administrator to change it — do not work around it.
3. Open **Dashboard**. Every figure on it is read live from the database. If a figure is zero, the table is genuinely empty; nothing on this screen is decorative.
4. Open **Notifications** and clear anything addressed to you.

## 4. Daily operations

### 4.1 Reading the dashboard

| Tile | Meaning |
| --- | --- |
| Published pages | Live pages registered in the CMS |
| Published projects / insights | Programmes and articles visible to the public |
| Unread enquiries | New submissions nobody has opened |
| Partnership requests | New or in assessment |
| Media assets | Files registered in the library (site imagery served from the codebase is not counted here) |
| Active administrators | Enabled accounts |

The **Website analytics** panel is deliberately empty: no analytics provider is connected, and the portal does not invent traffic figures. Connect a provider before expecting traffic data.

### 4.2 Working an enquiry

1. **Business Operations → Contact Enquiries** (the badge is the unread count).
2. Open an enquiry: the full message, the contact details and the source page are on the left.
3. Set **Status** (`new → in_review → responded → closed`), assign it to an administrator, and record internal notes — notes are staff-only and never shown to the enquirer.
4. Reply using the **Reply** button, which opens your own email client to the enquirer's address. The portal does not send email.
5. Export the filtered list to CSV from the enquiries screen when you need to report on it. Exports are audited.
6. Deleting an enquiry is a soft delete: the record stays reviewable. It can be purged permanently later under System Settings once it is older than the retention window.

### 4.3 Publishing content

**Pages**
1. **Website Management → Pages Manager**, open a page or create one. New pages start as drafts.
2. Edit the hero copy and add content blocks (heading, rich text, image, gallery, two column, feature grid, timeline, stats, quote, CTA, video). Blocks are structured fields — never paste raw HTML.
3. **Save changes** writes a working version. The public site is untouched.
4. **Publish now** makes it live and writes a version snapshot into **Version history**. You can unpublish, or schedule a future publication.

**Insights and projects** follow the same workflow with one extra step:
`Draft → In review → Approved → Published`. Publishing requires the publish permission; an Editor can take an article all the way to Approved and no further.

**Media**
Upload through **Media Library** with mandatory alt text. Alt text is published with the image and is required, not optional. Files over 10 MB are rejected; only the listed image types and PDF are accepted. Never upload an image that shows real facilities, officials or communities unless it is documented and approved.

**Homepage**
**Homepage Manager** edits the hero eyebrow, multi-line title, subtitle, both buttons and the closing call to action. Saving shows the change on the public homepage after revalidation. This is the fastest way to prove to a stakeholder that the CMS is live.

### 4.4 Changing the enquiry form

**Website Configuration → Forms** changes what the public enquiry form accepts. Two things to know:

* Disabling an enquiry type is enforced by the API, not just hidden from the form. A request for a disabled type is rejected.
* The submissions-per-minute limit is enforced server-side per address.

### 4.5 Platform settings

**System Administration → System Settings** holds the site-wide switches:

* **Enquiry intake open/closed** — closing it returns an error to the public form.
* **Notifications per new enquiry.**
* **Maintenance notice** — shows a bar across the public site. It requires ticking a confirmation box; it does not take the site offline.
* **Retention window** and the **Purge** action. Purge permanently deletes archived enquiries older than the window and requires typing `PURGE`. It is audited and cannot be undone.

## 5. Weekly / monthly routine

| Cadence | Task |
| --- | --- |
| Daily | Clear unread enquiries and assign owners |
| Weekly | Review the **Activity Centre** for unexpected changes; check **Notifications** |
| Weekly | Confirm the public homepage still reads as intended (open the site, not the editor) |
| Monthly | **Audit Logs** — review destructive actions and permission changes |
| Monthly | **System Health** — run the checks; confirm database, auth and storage report `operational` |
| Monthly | **Roles** — confirm no account holds more access than it needs; remove leavers in **User Management** immediately |
| Quarterly | Media Library — retire unused assets; confirm alt text is still accurate |

## 6. What to do when something looks wrong

1. **A page is not updating.** Check the page's status: only `published` pages are public; a saved but unpublished page is invisible by design. Then confirm the version history recorded the publication.
2. **"Not authorised" on a screen.** Your role does not hold that permission. Ask an administrator; the portal is working as intended.
3. **An enquiry is missing.** Check whether it was deleted (soft delete keeps it reviewable), then check the status filter.
4. **A form submission is rejected.** Check **Forms** — intake may be closed, or the requested enquiry type disabled.
5. **A health check reports `degraded` or `down`.** Open **System Health** to see the failing service and latency, then escalate. Do not retry a migration or edit the database by hand.

## 7. Things operators must never do

* Never share, paste into a ticket, or screenshot the service-role key, the database password or a one-time invite link.
* Never run `001_initial.sql` against this database — it is the baseline and is destructive. Apply migrations only via `scripts/db-migrate.sh`.
* Never delete audit log rows. They cannot be deleted through the application and must not be deleted in SQL.
* Never publish content that contains unverified statistics, named officials, facility counts or partner logos. The publishing rules for this site are strict for a reason.
* Never set a person's role higher than their job requires "for convenience".

## 8. Who to contact

| Situation | First contact |
| --- | --- |
| Cannot sign in / invitation expired | Your Super Administrator |
| Permission needed for a task | Your Super Administrator |
| Content question (what may be published) | Communications Manager |
| Site error, publishing failure, health warning | Technical owner |

Contact details for each of these are recorded in the site's own settings and can be updated in **Website Configuration → Website Settings**. No contact details are hard-coded in this document.
