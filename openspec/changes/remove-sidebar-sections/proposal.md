## Why

The sidebar currently shows Analytics, Users, and Settings links that point to unimplemented routes, creating a cluttered navigation with dead-end pages. Removing them keeps the sidebar focused on features that actually exist.

## What Changes

- Remove the `Analytics`, `Users`, and `Settings` entries from `navItems`
- Remove unused icon imports (`BarChart3`, `Users`, `Settings`) from `navItems.ts`
- The `Dashboard` nav link remains as the sole top-level nav item

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `dashboard-layout`: Sidebar navigation requirement changes — only the Dashboard link is shown; Analytics, Users, and Settings links are removed

## Impact

- `app/components/dashboard/navItems.ts` — remove three nav entries and their icon imports
- No routes, APIs, or other components are affected
