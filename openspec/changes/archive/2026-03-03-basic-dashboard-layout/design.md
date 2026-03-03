## Context

The project is a Next.js 16 App Router application with React 19, TypeScript, Tailwind CSS v4, and shadcn/ui. Currently it has only the default Next.js scaffold with no dashboard UI. The goal is to introduce a standard dashboard shell — sidebar + header + content — that will serve as the persistent frame for all dashboard routes going forward.

## Goals / Non-Goals

**Goals:**
- A route group `app/(dashboard)/` with a shared `layout.tsx` rendering `DashboardLayout`
- A collapsible `Sidebar` with navigation links and app branding
- A `Header` with page title and a slot for actions/user menu
- Full dark mode support via the existing `.dark` class mechanism
- Responsive layout: sidebar collapses to an off-canvas drawer on mobile (shadcn/ui `Sheet`)
- Use existing design tokens (`--background`, `--foreground`, `--sidebar-*`, etc.)

**Non-Goals:**
- Authentication or protected routes
- Real navigation data (links will be static/placeholder for now)
- Data fetching or API integration
- Breadcrumbs, notifications, or user profile pages
- Animations beyond Tailwind defaults

## Decisions

### 1. Route group `(dashboard)` for layout isolation
**Decision**: Place all dashboard pages under `app/(dashboard)/` using a Next.js route group.
**Rationale**: Route groups allow a dedicated `layout.tsx` without affecting the URL path. The root `app/layout.tsx` stays clean (fonts, global CSS only). This is the idiomatic App Router pattern.
**Alternative considered**: Wrapping in a single shared component at the root layout — rejected because it forces the dashboard chrome onto every route (e.g., future marketing pages).

### 2. Component location: `components/dashboard/`
**Decision**: Place `DashboardLayout`, `Sidebar`, and `Header` under `components/dashboard/`.
**Rationale**: Keeps dashboard-specific UI separate from generic shadcn/ui components in `components/ui/`. Clear ownership and easy to find.

### 3. Sidebar state: CSS-driven collapse, not JS state
**Decision**: Desktop sidebar is always visible (fixed width). Mobile uses a `Sheet` (shadcn/ui) triggered by a hamburger button in the `Header`.
**Rationale**: Avoids managing sidebar open/closed state in a Server Component hierarchy. Desktop collapse can be added later. Keeps the initial implementation simple and correct.
**Alternative considered**: A fully collapsible sidebar with icon-only mode — deferred to a future change.

### 4. `"use client"` boundary at `Sidebar` (mobile Sheet) and `Header` (toggle button)
**Decision**: `DashboardLayout` is a Server Component. `Sidebar` and `Header` are Client Components only where interactivity is required (mobile toggle).
**Rationale**: Minimizes client bundle. The sheet open/close state lives in a small client wrapper.

### 5. Navigation items as static data
**Decision**: Nav items are a static array in `Sidebar` for now.
**Rationale**: The spec only requires a structural shell. Dynamic nav is a future concern.

## Risks / Trade-offs

- **Mobile sheet requires `"use client"`** → Mitigation: Isolate to the smallest component; rest of layout stays server-rendered.
- **Static nav items** → Acceptable for a layout foundation; active-link highlighting may require `usePathname()` (client hook), so the nav link component will be a small client wrapper.
- **No sidebar collapse on desktop** → Users get a fixed sidebar; acceptable for initial layout. Collapse is a common follow-up request.

## Migration Plan

1. Create `app/(dashboard)/layout.tsx` — replaces `app/page.tsx` as the entry for dashboard routes
2. Move or create `app/(dashboard)/page.tsx` as the default dashboard home
3. No changes to `app/layout.tsx` (root layout untouched)
4. No database or API migration required
