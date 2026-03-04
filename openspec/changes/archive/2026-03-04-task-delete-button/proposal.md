## Why

There is currently no way to delete a task — users can only create and edit them. Adding a delete button in the task detail drawer provides a direct, in-context way to remove unwanted tasks from both the UI and the database.

## What Changes

- Add a trash/delete icon button in the drawer header, next to the existing close button
- Add a `deleteTask(taskId)` server action that deletes the Task document after verifying session and project ownership
- When deletion succeeds, close the drawer and remove the task card from the Kanban board without a full page reload
- Show a loading state on the delete button while the request is in flight

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `task-detail-drawer`: Drawer header gains a delete button; closing after delete removes the task from the board instead of saving edits

## Impact

- `app/(dashboard)/projects/[id]/TaskDetailDrawer.tsx` — add delete button + handler
- `app/(dashboard)/projects/actions.ts` — add `deleteTask` server action
- `app/(dashboard)/projects/[id]/page.tsx` (or the Kanban board component) — handle `onDeleted` callback to remove the task from local state
