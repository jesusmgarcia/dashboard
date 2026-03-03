## Why

The application currently has no dashboard UI — only a default Next.js scaffold. A basic dashboard layout is needed to give the app a structural foundation: a sidebar for navigation, a top header, and a main content area, so that future features have a consistent, production-ready shell to build within.

## What Changes

- Add a persistent sidebar with navigation links and branding
- Add a top header bar with page title and user/action area
- Add a main content area with proper scroll and padding
- Create a shared `DashboardLayout` component applied across all dashboard routes
- Define a `/dashboard` route group with its own layout

## Capabilities

### New Capabilities

- `dashboard-layout`: Shell layout composed of sidebar, header, and content area; wraps all dashboard routes and provides consistent navigation structure

### Modified Capabilities

<!-- No existing specs have requirement changes -->

## Impact

- New route group `app/(dashboard)/` with a `layout.tsx` that renders `DashboardLayout`
- New components: `Sidebar`, `Header`, `DashboardLayout` under `app/components/` or `components/`
- Uses shadcn/ui primitives (Sheet for mobile sidebar, separators, etc.) and Lucide icons for nav
- Tailwind CSS v4 design tokens for colors and spacing; dark mode support via `.dark` class
- No external dependencies beyond those already installed
