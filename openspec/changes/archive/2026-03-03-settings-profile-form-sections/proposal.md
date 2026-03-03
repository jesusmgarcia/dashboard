## Why

The profile form currently renders all nine fields in a single flat 2-column grid with no visual grouping. Adding named sections — "Information" and "Address" — makes the form easier to scan, signals the purpose of each field cluster, and gives the right panel clearer visual hierarchy.

## What Changes

- Split the flat 2-column field grid into two labelled sections inside the right panel:
  - **Information**: Full Name, Email Address, Phone Number, User Role
  - **Address**: Country, State/Region, City, ZIP/Postal Code, Address
- Each section has a section header label above its own 2-column field grid
- No data model, server action, routing, or field logic changes

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `user-settings`: The field grouping requirement changes — fields are now organised under named sections ("Information" and "Address") rather than a single flat grid.

## Impact

- `app/(dashboard)/settings/ProfileForm.tsx` — right panel layout updated; no other files affected
