## Why

The project view currently only offers a kanban board, which is great for workflow visualization but poor for scanning or editing task metadata across many tasks at once. A table view gives users a compact, sortable, row-per-task layout where all fields are visible without opening individual cards.

## What Changes

- Add a tab bar to the project view page with two tabs: **Kanban** and **Table**
- The **Kanban** tab renders the existing `KanbanBoard` component unchanged
- The **Table** tab renders a new `TaskTable` component listing all project tasks one row per task, showing all task fields (title, status, priority, assignee, due date, description)
- Clicking any row in the table opens the existing `TaskDetailDrawer` to edit the task
- Changes saved in the drawer are reflected in the table immediately (optimistic update)
- Deleted tasks are removed from the table immediately

## Capabilities

### New Capabilities

- `project-table-view`: A tabbed interface on the project page with a table view tab that lists tasks in rows with all fields visible, and opens `TaskDetailDrawer` on row click

### Modified Capabilities

- `project-page`: Adds tab navigation (Kanban / Table) to the project detail page layout

## Impact

- **Modified files**: `app/(dashboard)/projects/[id]/page.tsx` — wraps content in a tab layout
- **New files**: `app/(dashboard)/projects/[id]/ProjectTabs.tsx` — client component managing tab state and rendering Kanban or Table view; `app/(dashboard)/projects/[id]/TaskTable.tsx` — table view component
- **No schema/API changes** — reuses existing `TaskItem` type, server actions, and `TaskDetailDrawer`
- **No new dependencies** — uses existing shadcn/ui `Tabs` component (if not yet added, install via `npx shadcn add tabs`)
