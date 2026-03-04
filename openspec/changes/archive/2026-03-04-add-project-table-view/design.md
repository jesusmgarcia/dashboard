## Context

The project detail page (`/projects/[id]`) is a Server Component that fetches tasks and renders `KanbanBoard`. `KanbanBoard` is a Client Component that manages its own task state, drag-and-drop, and the `TaskDetailDrawer`. The `TaskDetailDrawer` is opened via `selectedTask` state inside `KanbanBoard`.

Adding a table view requires shared state (selected tab, selected task for drawer) across both views. The drawer must work identically regardless of which view triggered it.

## Goals / Non-Goals

**Goals:**
- Add Kanban / Table tab navigation to the project page
- Table view shows all tasks (all statuses) in a flat list, one row per task, all fields visible
- Clicking a table row opens `TaskDetailDrawer` exactly as clicking a kanban card does
- Save and delete from drawer reflect immediately in the table (no full page reload)
- Consistent behavior: tab selection is not persisted across navigations (defaults to Kanban)

**Non-Goals:**
- Sorting or filtering the table (not in scope for this change)
- Persisting the selected tab in URL params or localStorage
- Inline editing of table cells (drawer is the only edit path)
- Pagination (all tasks rendered at once, consistent with kanban)

## Decisions

### 1. Single `ProjectTabs` client component owns all shared state

**Decision:** Extract a new `ProjectTabs` client component that receives the initial `GroupedTasks` from the server page and manages tab state, flat task list state, and `selectedTask` state. Both `KanbanBoard` and `TaskTable` are rendered inside `ProjectTabs`, with only the active tab visible.

**Rationale:** Both views need to share `selectedTask` (to open the drawer) and task mutation handlers (`onSaved`, `onDeleted`). Lifting state into `ProjectTabs` keeps both views in sync without prop drilling through the server page. Alternatives considered:
- **Keep drawer inside each view separately**: Would duplicate drawer logic and risk state divergence between tabs.
- **URL-based tab state with separate server fetches**: Overkill for a UI-only toggle; adds latency.

### 2. `KanbanBoard` refactored to accept callbacks instead of owning drawer

**Decision:** Move `selectedTask` state and `TaskDetailDrawer` rendering out of `KanbanBoard` into `ProjectTabs`. `KanbanBoard` receives an `onTaskClick(task: TaskItem)` prop to signal row/card selections upward.

**Rationale:** The drawer must be shared between both views. Keeping it inside `KanbanBoard` would make it inaccessible to `TaskTable`. This is a minimal refactor — only the drawer state and rendering moves out; all kanban-specific state (column tasks, drag) stays in `KanbanBoard`.

### 3. `TaskTable` uses a flat list derived from `GroupedTasks`

**Decision:** `TaskTable` receives a `tasks: TaskItem[]` flat array (flattened from all columns) and renders a `<table>` with one `<tr>` per task. Columns: Title, Status, Priority, Assignee, Due Date, Description (truncated).

**Rationale:** The flat list is easy to derive once in `ProjectTabs` (`Object.values(groupedTasks).flat()`). Keeping `TaskTable` stateless simplifies it and makes the data flow predictable.

### 4. shadcn/ui `Tabs` component for tab navigation

**Decision:** Use the shadcn/ui `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` primitives. If not already installed, add with `npx shadcn add tabs`.

**Rationale:** Consistent with the existing component stack. Radix UI under the hood gives accessible keyboard navigation for free.

## Risks / Trade-offs

- **KanbanBoard refactor risk** → Mitigation: The change is minimal (extract `selectedTask` state + drawer JSX to parent). Existing kanban tests (if any) should still pass because internal column/drag logic is untouched.
- **All tasks rendered at once in table** → For projects with hundreds of tasks this could be slow. Acceptable for now given kanban has the same limitation; pagination deferred.
- **shadcn Tabs not yet installed** → Mitigation: Task includes an install step; it's a zero-config add.
