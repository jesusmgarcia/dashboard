## Context

The dashboard already has a working auth system (JWT cookie, login/logout API, route protection via `proxy.ts`). The header layout has a right-aligned action slot that is currently empty. Users have no visible identity indicator or way to log out from within the dashboard. The JWT payload contains the user's email, which can be decoded on the server to display identity.

## Goals / Non-Goals

**Goals:**
- Render a user avatar/button in the top-right header slot
- Dropdown with "Settings" (navigates to `/settings`) and "Logout" (calls POST /api/auth/logout)
- Settings page showing the user's current profile info (email)
- Read user identity from the JWT token server-side to avoid a separate API call

**Non-Goals:**
- Editing username, password, or any user data (out of scope for this change)
- Notification badges, themes switcher, or other menu items
- User avatar image upload

## Decisions

### 1. JWT decoded server-side via a helper, passed as a prop

**Decision**: Decode the JWT token in a Server Component (layout or page) and pass the user object down as a prop to the client `UserProfileMenu` component.

**Rationale**: Avoids an extra round-trip API call. The `verifyToken` utility in `lib/auth/jwt.ts` already exists. Keeps the client component simple — it only handles UI state (open/close).

**Alternative considered**: Fetch `/api/auth/me` from the client. Rejected — adds latency and requires a new API route for data that's already available in the cookie.

### 2. Dropdown built from existing shadcn/ui DropdownMenu primitive

**Decision**: Use the `DropdownMenu` shadcn/ui component (Radix UI under the hood) for the popover menu.

**Rationale**: Already part of the project's component stack, handles accessibility (keyboard navigation, focus trap, ARIA) out of the box. No new dependencies.

### 3. Settings page is a simple Server Component

**Decision**: `/app/settings/page.tsx` is a Server Component that reads the JWT and renders a read-only profile card. No form or mutation in this change.

**Rationale**: Keeps scope minimal. A future change can add editable fields.

### 4. Logout stays client-side fetch to existing POST /api/auth/logout

**Decision**: The "Logout" menu item is a client-side button that calls `fetch('POST /api/auth/logout')` then `router.push('/')`.

**Rationale**: The existing logout route clears the cookie. No change needed on the server side.

## Risks / Trade-offs

- **JWT decoded in layout on every render** → Mitigation: `verifyToken` uses `jose` (fast, native). Impact is negligible for a dashboard app at this scale.
- **Settings page shows read-only data** → Users may expect to edit. Mitigation: clearly label as "Profile" view; a future change adds editing.
- **No loading state for logout** → If the logout API is slow, the button appears unresponsive. Mitigation: add a simple loading spinner state in the button.
