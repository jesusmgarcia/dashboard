## Context

The task detail drawer (`TaskDetailDrawer.tsx`) has a header with a status badge and a close button (X). It communicates with the backend via server actions in `actions.ts`. Currently only `updateTask` and `createTask` exist — there is no delete action.

The drawer receives `task`, `onClose`, and `onSaved` props from the Kanban board page. The board page holds task state in a `useState` map; `onSaved` updates that state when edits are committed.

## Goals / Non-Goals

**Goals:**
- Add a `deleteTask(taskId)` server action with the same ownership verification pattern as `updateTask`
- Add a delete (trash) icon button in the drawer header, to the left of the close button
- Wire up an `onDeleted(taskId)` callback so the board removes the task card from local state on success

**Non-Goals:**
- Confirmation dialog / undo — the button deletes immediately
- Bulk delete
- Soft delete / archiving

## Decisions

**No confirmation dialog** — The feature request specifies a small inline button; a confirm dialog adds friction. Accidental deletes can be mitigated in a later change if needed.

**`onDeleted(taskId)` callback on `TaskDetailDrawer`** — Mirrors the existing `onSaved` pattern. The board page removes the task from all status columns in its local state.

**Separate loading state for delete** — The existing `saving` state guards the close/save flow. A separate `deleting` boolean prevents the two operations from conflicting and keeps intent clear.

**Trash icon (`Trash2` from lucide-react)** — Consistent with the icon library already in use. Styled in destructive red on hover to signal danger without being alarming at rest.

## Risks / Trade-offs

- [Accidental deletion] → No confirmation; mitigated by destructive-color hover affordance. A confirm step can be added later.
- [Race condition: delete while save in flight] — Both buttons are disabled while either `saving` or `deleting` is true, preventing concurrent operations.
