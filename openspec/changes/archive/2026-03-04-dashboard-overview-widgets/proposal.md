## Why

The dashboard home page is currently empty — it shows a greeting but no actionable information. Users have no at-a-glance visibility into their work, forcing them to navigate away just to answer basic questions like "how many projects do I have?" or "what high-priority tasks need my attention?".

## What Changes

- Add three summary widget cards to the dashboard home page:
  - **Total Projects** — count of all projects belonging to the logged-in user
  - **Last Created Project** — name and creation date of the user's most recently created project
  - **High Priority Tasks** — a list of tasks with `priority: "high"` where `assignee` matches the current user's email
- The dashboard page (`app/(dashboard)/dashboard/page.tsx`) will be updated from a static greeting to a data-driven layout
- New server-side data-fetching logic will query MongoDB for the above aggregates

## Capabilities

### New Capabilities

- `dashboard-overview-widgets`: Summary card widgets displayed on the dashboard home — total project count, last created project, and high-priority tasks assigned to the user

### Modified Capabilities

<!-- No existing spec-level requirements are changing -->

## Impact

- **`app/(dashboard)/dashboard/page.tsx`** — converted from a static page to a Server Component that fetches and displays widget data
- **`app/lib/models/Project.ts`** and **`app/lib/models/Task.ts`** — consumed (read-only) by new data fetching
- **`app/lib/auth/session.ts`** — used to identify the current user for scoping queries
- No new dependencies required; no breaking changes
