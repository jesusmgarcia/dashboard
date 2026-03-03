## Why

The sidebar only offers static navigation links with no way to organise work into projects. Adding a collapsible Projects section gives users a lightweight way to create and view named projects directly from the sidebar, without leaving their current page.

## What Changes

- Add a collapsible "Projects" section to the bottom of the sidebar nav, below the existing navigation links
- The section header shows a collapse/expand toggle (chevron icon) and a small "+" add button
- Clicking "+" inserts an inline text input under the Projects header to enter a new project name; pressing Enter or blurring commits the project, pressing Escape cancels
- Confirmed projects appear as a list of items inside the section
- The section persists its collapsed/expanded state and project list in localStorage so they survive page refreshes
- The feature is integrated into both the desktop sidebar and the mobile off-canvas drawer

## Capabilities

### New Capabilities

- `sidebar-projects`: Collapsible Projects section in the sidebar with inline project creation.

### Modified Capabilities

_(none — this change adds a new section without altering existing nav links or layout requirements)_

## Impact

- `components/dashboard/Sidebar.tsx` — import and render the new `SidebarProjects` component below the nav list
- `components/dashboard/MobileSidebar.tsx` — same integration for the mobile drawer
- New file: `components/dashboard/SidebarProjects.tsx` — the collapsible projects component
- No API routes, database changes, or auth logic required
