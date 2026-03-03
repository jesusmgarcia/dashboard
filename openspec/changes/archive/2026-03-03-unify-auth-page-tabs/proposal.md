## Why

Having two separate auth pages (`/login` and `/register`) splits user attention and wastes the root URL (`/`), which currently shows the Next.js boilerplate. Consolidating both forms into a single tabbed page at `/` reduces navigation steps and gives the app a clean, professional entry point.

## What Changes

- Replace the boilerplate `app/page.tsx` with a tabbed Sign In / Sign Up auth page
- Remove `app/login/page.tsx` and the `/login` route
- Remove `app/register/page.tsx` and the `/register` route
- Install the shadcn/ui `tabs` component
- Update `proxy.ts` to redirect unauthenticated `/dashboard/**` requests to `/` and redirect authenticated users away from `/`
- After successful registration, switch to the Sign In tab (instead of redirecting to `/login`)

## Capabilities

### New Capabilities

<!-- None — no new capabilities introduced -->

### Modified Capabilities

- `user-auth`: Auth entry point moves from `/login` and `/register` to `/` (tabbed); redirect targets in proxy and post-auth flows update accordingly

## Impact

- **Removed files**: `app/login/page.tsx`, `app/register/page.tsx`
- **Modified files**: `app/page.tsx` (replaced), `proxy.ts` (updated matcher and redirect targets)
- **New dependency**: shadcn/ui `tabs` component
- **URL changes**: `/login` → `/`, `/register` → `/?tab=register` (or default tab switch); no API routes change
