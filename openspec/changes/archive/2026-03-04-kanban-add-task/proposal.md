## Why

The Kanban board currently only displays tasks — users have no way to create them without direct database access. Adding inline "Add task" buttons to the To Do and In Progress columns makes the board actionable.

## What Changes

- Add a `+` / "Add task" button at the bottom of the **To Do** and **In Progress** columns
- Clicking the button reveals an inline input form within the column
- Submitting the form calls a server action that persists the new task to the database with the correct `status` and `projectId`
- The board updates optimistically to show the new task immediately
- The **Done** column does not get an add button (tasks reach Done by progression, not direct creation)

## Capabilities

### New Capabilities

- `kanban-task-creation`: Inline task creation within Kanban columns (To Do and In Progress), persisted to the database via a server action

### Modified Capabilities

- `project-kanban-board`: The Kanban board requirement changes — columns now support inline task creation, not just display

## Impact

- `app/(dashboard)/projects/[id]/KanbanBoard.tsx` — add inline form UI and optimistic state management
- `app/(dashboard)/projects/actions.ts` — new `createTask` server action
- No new dependencies required
