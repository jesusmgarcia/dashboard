## Why

Task cards on the Kanban board currently show only a title with no way to view or edit details. Users need to enrich tasks with assignee, due date, priority, and description information — and a slide-in drawer gives them a focused, non-disruptive editing surface without leaving the board.

## What Changes

- Add new fields to the `Task` model: `assignee` (string), `dueDate` (Date), `priority` ("high" | "medium" | "low"), `description` (string) — all optional
- Extend `TaskItem` type to carry the new fields
- Add a `updateTask` server action that persists all editable task fields
- Create a `TaskDetailDrawer` component (right-side Sheet) opened by clicking a task card
- Drawer header: task status badge + close button
- Drawer body: editable task name, assignee, due date picker, priority badge selector (red/yellow/green), description textarea
- On drawer close: save all edits to the database and update the task in the Kanban column state
- Differentiate click (open drawer) from drag (move card) so both gestures work correctly

## Capabilities

### New Capabilities
- `task-detail-drawer`: Drawer UI for viewing and editing task details from the Kanban board

### Modified Capabilities
- `kanban-drag-drop`: Task cards must distinguish a click gesture from a drag gesture so clicking opens the drawer without conflicting with drag-and-drop

## Impact

- `app/lib/models/Task.ts` — new schema fields
- `app/(dashboard)/projects/actions.ts` — new `updateTask` server action; extend `TaskItem` type
- `app/(dashboard)/projects/[id]/KanbanBoard.tsx` — wire click handler on `TaskCard`, pass drawer open/close logic
- New file: `app/(dashboard)/projects/[id]/TaskDetailDrawer.tsx`
- shadcn `Sheet` component already in project (used by `MobileSidebar`)
