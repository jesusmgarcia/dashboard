## Context

The sidebar (`components/dashboard/Sidebar.tsx`) is a `"use client"` component that renders a static list of nav links from `navItems.ts`. The mobile version (`MobileSidebar.tsx`) mirrors the same structure inside a Sheet drawer. Both import `NavLink` for individual links.

No backend persistence (MongoDB) is introduced in this change. Projects are stored in `localStorage` so they survive page refreshes within the same browser without requiring a database or auth-aware API.

## Goals / Non-Goals

**Goals:**
- Add a `SidebarProjects` component that renders below the nav links in both desktop and mobile sidebars
- Collapsible section with a chevron toggle in the header
- Small "+" icon button next to the header label to trigger inline project creation
- Inline `<input>` appears under the header when adding; Enter/blur commits, Escape cancels
- Project list and collapsed state persisted to `localStorage`

**Non-Goals:**
- Persisting projects to MongoDB or any server-side store
- Editing or deleting existing projects
- Navigating to a project-specific route on click (items are display-only in this change)
- Drag-to-reorder

## Decisions

### 1. Component: `SidebarProjects.tsx`

**Decision**: Implement as a self-contained `"use client"` component at `components/dashboard/SidebarProjects.tsx`. Both `Sidebar.tsx` and `MobileSidebar.tsx` import and render it below the `<nav>` block.

**Rationale**: Keeps the logic isolated, avoids touching `Sidebar.tsx` beyond adding one import and one JSX line.

### 2. State management

**Decision**: Three pieces of `useState`:
- `isOpen: boolean` — section collapsed/expanded
- `projects: string[]` — list of project names
- `isAdding: boolean` — whether the inline input is shown

`isOpen` and `projects` are initialised from `localStorage` (via lazy initialiser) and written back on every change.

**Rationale**: No external state library needed. Lazy initialisers avoid SSR/hydration mismatches by running only in the browser.

### 3. localStorage key

**Decision**: `sidebar-projects` for the project list (JSON array) and `sidebar-projects-open` for the collapsed state (boolean string).

### 4. Inline input UX

**Decision**:
- Input appears as the first item inside the expanded list when `isAdding` is true
- `onBlur` commits if the value is non-empty, otherwise cancels
- `onKeyDown`: Enter commits, Escape cancels
- After committing, input is dismissed and the new project appears at the bottom of the list

### 5. Icons

**Decision**: Use `ChevronDown` / `ChevronRight` from `lucide-react` for the collapse toggle and `Plus` for the add button. All icons are already available via the existing `lucide-react` dependency.

### 6. Styling

**Decision**: Match the sidebar's existing token set (`text-sidebar-foreground`, `hover:bg-sidebar-accent`, `border-sidebar-border`). The Projects header row uses the same height/padding as a `NavLink`. The "+" button is a small ghost icon button (`h-5 w-5 rounded`). Project items are rendered as plain text rows with left padding (no route/link yet).

## Risks / Trade-offs

- **localStorage not available during SSR** → Mitigated by lazy `useState` initialisers that only read `localStorage` on the client.
- **No delete/edit** → Projects accumulate. This is acceptable for the initial feature; management UI is a follow-up concern.
- **No server sync** → Projects are browser-local. Acceptable per Non-Goals.
