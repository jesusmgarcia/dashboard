## Context

The sidebar navigation is defined by a static `navItems` array in `app/components/dashboard/navItems.ts`. It currently exports four entries: Dashboard, Analytics, Users, and Settings. Analytics, Users, and Settings have no corresponding implemented pages, making them dead navigation links.

## Goals / Non-Goals

**Goals:**
- Remove Analytics, Users, and Settings from the sidebar nav
- Clean up unused icon imports

**Non-Goals:**
- Implementing Analytics, Users, or Settings pages
- Restructuring the nav system or adding dynamic nav

## Decisions

**Remove entries from the static array** — The `navItems` array is the single source of truth for sidebar links. Deleting the three entries and their icon imports is the complete change. No abstraction or configuration needed.

## Risks / Trade-offs

- [Dead links removed] → If those routes are added later, entries must be re-added manually to `navItems.ts`
