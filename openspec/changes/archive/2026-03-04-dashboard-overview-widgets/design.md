## Context

The dashboard home page (`app/(dashboard)/dashboard/page.tsx`) is a static Server Component with no data. The app has:
- A `Project` model scoped by `userId` (ObjectId)
- A `Task` model with `priority`, `assignee` (string — stores the user's email), and `projectId`
- `getSession()` which returns `{ email, id }` from the JWT cookie

The three widgets need: total project count, the most recent project, and high-priority tasks where `assignee === session.email`.

## Goals / Non-Goals

**Goals:**
- Render three data-driven widget cards on the dashboard home without client-side JavaScript
- Fetch all data in a single Server Component render pass
- Scope all queries to the authenticated user

**Non-Goals:**
- Real-time updates or polling
- Pagination of high-priority tasks (show a reasonable cap, e.g., 10)
- Editing tasks or projects inline from the dashboard

## Decisions

### 1. Server Component with direct DB queries (no API route)

The dashboard page is already a Server Component. Adding a dedicated API route would add unnecessary indirection. Data is fetched directly using Mongoose models inside the Server Component (or a co-located `getData` async function), the same pattern used in `app/(dashboard)/projects/[id]/page.tsx`.

**Alternative considered:** API route + `fetch` from the component. Rejected — adds latency and boilerplate with no benefit for SSR-only data.

### 2. `assignee` matching by email (not user ObjectId)

The `Task.assignee` field is a plain string. The session provides `email`. Tasks will be queried with `assignee: session.email`. No schema change is needed.

**Alternative considered:** Add a `userId` field to Task and migrate. Rejected — out of scope; the existing string-based assignee is sufficient for current needs.

### 3. Widget layout: CSS Grid, three columns on wide screens

Three equal-width cards arranged in a responsive grid (`grid-cols-1 sm:grid-cols-3`). The high-priority tasks card spans full width on narrow screens and shows a compact list. This follows the shadcn/ui card component pattern already used elsewhere.

### 4. Co-located data-fetch function in the page file

A single `getDashboardData(userId, email)` async function inside `dashboard/page.tsx` runs three parallel Mongoose queries with `Promise.all`. Keeping it co-located avoids premature abstraction for a single-use data fetch.

## Risks / Trade-offs

- **Cold DB connection on first render** → Mitigated by the existing `mongoose.ts` singleton connection helper used across all pages
- **`assignee` is a free-text string** — a typo or different casing when a task was created would cause a mismatch → Acceptable for now; out of scope to fix here
- **No loading state** — Next.js streaming/Suspense could improve perceived performance → Can add later with a `loading.tsx` file; not required for this change

## Open Questions

- Should the high-priority tasks list link to the project's Kanban board? (Assumed: yes — task item links to `/projects/[projectId]`)
- Cap on high-priority tasks shown: 10 items assumed; can be adjusted after UX review
