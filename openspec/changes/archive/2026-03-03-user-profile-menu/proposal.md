## Why

The dashboard has authentication but no visible user identity or quick access to account actions. Users need a persistent, discoverable way to access their profile settings and log out from any page in the app.

## What Changes

- Add a user profile avatar/menu button in the top-right corner of the dashboard header
- Clicking the button opens a dropdown menu with "Settings" and "Logout" options
- "Settings" navigates to a `/settings` page where the user can manage their profile
- "Logout" calls the existing logout API and redirects to `/login`
- Display the authenticated user's name or email in the menu

## Capabilities

### New Capabilities

- `user-profile-menu`: Dropdown menu component in the header showing user identity with Settings and Logout actions
- `user-settings`: Settings page (`/settings`) where the user can view and update their profile information

### Modified Capabilities

- `dashboard-layout`: Add the profile menu to the top-right of the existing dashboard header

## Impact

- **Components**: New `UserProfileMenu` client component; new `/app/settings/page.tsx`
- **Layout**: `app/layout.tsx` or dashboard header component updated to include profile menu
- **API**: Reuses existing `POST /api/auth/logout` route
- **Auth**: Reads user identity from the JWT token (via existing auth infrastructure)
- **Dependencies**: No new dependencies required (lucide-react for icons, existing shadcn/ui primitives)
