## Context

The app currently has three separate pages: a Next.js boilerplate root (`/`), a login page (`/login`), and a register page (`/register`). The auth flows were built independently using shadcn/ui `Card` components with cross-links between them. The goal is to replace the unused root with a single tabbed auth surface, removing the detour through `/login` → click "Sign up" → `/register`.

Stack constraints: Next.js 16 App Router, shadcn/ui, Tailwind CSS v4, `proxy.ts` for route protection.

## Goals / Non-Goals

**Goals:**
- Single auth entry point at `/` with "Sign In" and "Sign Up" tabs
- `proxy.ts` updated: unauthenticated `/dashboard/**` redirects to `/`; authenticated users redirected from `/` to `/dashboard`
- Successful registration switches to the Sign In tab (no full navigation)
- `/login` and `/register` routes removed
- No API changes — auth endpoints are unchanged

**Non-Goals:**
- URL query-param deep-linking to a specific tab (e.g. `/?tab=register`) — tab state stays in component memory only
- Animations or transitions between tabs beyond shadcn/ui defaults
- Changes to sign-in/sign-out API logic

## Decisions

### 1. shadcn/ui `Tabs` component

**Chosen**: `npx shadcn add tabs` — drops in Radix UI Tabs with Tailwind styling already wired up, consistent with the rest of the UI.
**Alternative**: Custom tab implementation — unnecessary complexity when shadcn already provides it.

### 2. Single page component with internal tab state

**Chosen**: One `"use client"` page component (`app/page.tsx`) holding `activeTab` state. The Sign In and Sign Up forms are extracted into sibling components (`SignInForm`, `SignUpForm`) co-located in `app/(auth)/` or inline.
**Alternative**: Two separate `<TabsContent>` blocks inlined — workable but the component becomes large; extracting forms keeps each ~50 lines.

### 3. Post-registration flow: switch tab instead of redirect

**Chosen**: On successful registration the page calls `setActiveTab("sign-in")` rather than `router.push("/login")`. This is a smoother UX — the user stays on the same page and can log in immediately.
**Alternative**: `router.push("/")` with a query param — adds URL complexity for no benefit.

### 4. proxy.ts matcher update

**Chosen**: Replace `/login` and `/register` in the matcher with `/` and update redirect targets from `/login` to `/`.
**Rationale**: The proxy must protect `/` from authenticated users (to avoid re-showing the auth page) and redirect unauthenticated dashboard visitors to the new entry point.

### 5. Remove `/login` and `/register` routes entirely

**Chosen**: Delete `app/login/` and `app/register/` directories. No 301 redirects needed — these were internal navigation targets with no external links or indexing requirements.
**Alternative**: Keep as redirect shims (`redirect("/")`) — unnecessary indirection.

## Risks / Trade-offs

- **Bookmark breakage**: Any bookmarked `/login` or `/register` URL will 404. → Acceptable for a private dashboard with no public-facing auth links.
- **Tab state lost on refresh**: If a user refreshes mid-registration, they land on the Sign In tab (default). → Low impact; form data is already lost on refresh.
- **proxy.ts matcher change**: Adding `/` to the matcher means every root-page visit goes through JWT verification. → Negligible overhead; `jwtVerify` is fast and the route is only hit once per navigation.

## Migration Plan

1. Install `tabs` shadcn component.
2. Rewrite `app/page.tsx` with the tabbed layout.
3. Update `proxy.ts` matcher and redirect targets.
4. Delete `app/login/` and `app/register/`.
5. Verify all auth flows manually.
