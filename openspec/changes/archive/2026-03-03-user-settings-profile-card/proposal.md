## Why

The current settings page displays user information in a read-only view with only email and account creation date. Users need a proper profile management experience where they can view and update their personal and contact details in one place.

## What Changes

- Replace the read-only settings page with a centered, visually rich profile card
- Add a profile photo display area at the top of the card
- Add editable fields: full name, email address, phone number, country, state/region, city, address, zip/postal code, and user role
- Add a save/update action to persist profile changes

## Capabilities

### New Capabilities

_(none — this change modifies the existing user-settings capability)_

### Modified Capabilities

- `user-settings`: Profile information changes from a read-only display to a fully editable form with expanded fields (full name, phone, country, state/region, city, address, zip/postal code, user role) and a profile photo section.

## Impact

- `app/settings/page.tsx` — replaced with new editable profile card UI
- `openspec/specs/user-settings/spec.md` — requirements updated to reflect editable fields and save behavior
- Possible: API route or server action for persisting updated profile data
- Possible: MongoDB user document schema extended with new profile fields
