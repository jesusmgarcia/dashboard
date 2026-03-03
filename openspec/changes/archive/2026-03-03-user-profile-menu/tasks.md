## 1. Setup

- [x] 1.1 Add the shadcn/ui DropdownMenu component (`npx shadcn add dropdown-menu`)
- [x] 1.2 Add the shadcn/ui Avatar component (`npx shadcn add avatar`)

## 2. Auth Helper

- [x] 2.1 Create `lib/auth/session.ts` with a `getSession()` helper that reads the `auth-token` cookie and returns the decoded JWT payload (email, id), or `null` if missing/invalid

## 3. UserProfileMenu Component

- [x] 3.1 Create `app/components/UserProfileMenu.tsx` as a `"use client"` component accepting a `user: { email: string }` prop
- [x] 3.2 Render an Avatar button showing the first character of the user's email
- [x] 3.3 Wrap with `DropdownMenu` showing user email at the top (non-interactive), then "Settings" and "Logout" items
- [x] 3.4 Implement "Settings" item as a `<Link href="/settings">` that closes the dropdown
- [x] 3.5 Implement "Logout" item: on click, call `POST /api/auth/logout`, then `router.push('/')` — show a loading/disabled state during the request

## 4. Dashboard Header Integration

- [x] 4.1 Locate the header component in the dashboard layout
- [x] 4.2 In the header's Server Component, call `getSession()` to retrieve the current user
- [x] 4.3 Render `<UserProfileMenu user={session} />` in the right-aligned action slot of the header

## 5. Settings Page

- [x] 5.1 Create `app/settings/page.tsx` as a Server Component
- [x] 5.2 Call `getSession()` to get the current user; redirect to `/` if no session
- [x] 5.3 Render a profile card showing the user's email and account creation date (if available)
- [x] 5.4 Ensure the page is wrapped in the dashboard layout (verify route nesting)

## 6. Route Protection

- [x] 6.1 Confirm `proxy.ts` already protects `/settings` (it should cover all non-auth paths); if not, extend the protected route pattern to include `/settings`

## 7. Verification

- [x] 7.1 Verify profile button appears in header on all dashboard pages
- [x] 7.2 Verify dropdown opens with correct user email, Settings, and Logout items
- [x] 7.3 Verify "Settings" navigates to `/settings` and profile info is displayed
- [x] 7.4 Verify "Logout" clears the session cookie and redirects to `/`
- [x] 7.5 Verify unauthenticated access to `/settings` redirects to `/`
- [x] 7.6 Verify keyboard navigation works in the dropdown (arrow keys, Enter, Escape)
