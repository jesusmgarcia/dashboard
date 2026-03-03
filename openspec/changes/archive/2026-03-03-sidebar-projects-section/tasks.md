## 1. SidebarProjects Component

- [x] 1.1 Create `components/dashboard/SidebarProjects.tsx` as a `"use client"` component with three state values: `isOpen` (boolean), `projects` (string[]), and `isAdding` (boolean) — initialise `isOpen` and `projects` from `localStorage` via lazy initialisers
- [x] 1.2 Implement the section header row: "Projects" label on the left, a small "+" `Plus` icon button on the right, and a `ChevronDown`/`ChevronRight` chevron that rotates based on `isOpen` — clicking the label/chevron area toggles `isOpen`
- [x] 1.3 Implement the collapsible body: render the project list and optional inline input only when `isOpen` is true
- [x] 1.4 Implement the inline input: shown as the first item when `isAdding` is true; auto-focused on mount; Enter/blur commits a non-empty name; Escape cancels; always dismisses the input afterwards
- [x] 1.5 Render each project as a plain row with left padding and sidebar foreground color, matching the sidebar's visual style
- [x] 1.6 Write `isOpen` to `localStorage` (`sidebar-projects-open`) whenever it changes and `projects` to `localStorage` (`sidebar-projects`) whenever the list changes

## 2. Wire into Sidebars

- [x] 2.1 Import and render `<SidebarProjects />` at the bottom of the `<nav>` block in `components/dashboard/Sidebar.tsx`, separated from the nav links by a subtle top border or spacing
- [x] 2.2 Import and render `<SidebarProjects />` inside the `<nav>` block of `components/dashboard/MobileSidebar.tsx` in the same position

## 3. Styling & Polish

- [x] 3.1 Style the "+" button as a small ghost icon button (`size-5`, rounded, `hover:bg-sidebar-accent`) that stops click propagation so it doesn't toggle the section collapse
- [x] 3.2 Style the inline input to match the sidebar background and foreground tokens (`bg-sidebar`, `text-sidebar-foreground`, no visible border focus ring that clashes with sidebar colors)
