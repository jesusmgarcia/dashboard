## Why

The current settings card uses a vertical layout with the avatar centered at the top and fields stacked below, which wastes horizontal space on wide viewports. A horizontal layout — avatar on the left, form fields on the right — makes better use of the available width and gives the profile card a more polished, desktop-native look.

## What Changes

- Restructure the profile card from a vertical (top-avatar) layout to a horizontal (left-avatar, right-fields) layout
- Place the profile avatar, name, and email in a fixed-width left column
- Place all editable form fields in the right column, arranged in a 2-column grid with personal information and address fields displayed side by side
- Remove the separate "Personal Information" and "Address" stacked sections in favor of a unified 2-column field grid on the right side of the card

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `user-settings`: Card layout requirement changes from vertical (avatar above fields) to horizontal (avatar left column, fields right column with a 2-column grid arrangement).

## Impact

- `app/(dashboard)/settings/ProfileForm.tsx` — layout restructured; no logic changes
- `app/(dashboard)/settings/ProfileAvatar.tsx` — no changes needed (component is reused as-is)
- `openspec/specs/user-settings/spec.md` — layout-related requirements updated
