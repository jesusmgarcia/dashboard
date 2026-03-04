## Context

The Kanban board renders `TaskCard` components using `@dnd-kit/core`'s `useDraggable`. Each card currently shows only a title. Clicking a card must open a right-side `Sheet` drawer with editable task fields; dragging must still move the card between columns.

The `Task` Mongoose model currently has: `title`, `status`, `projectId`, `createdAt`, `updatedAt`. Four optional fields need to be added. The `TaskItem` client type is the data shape passed between server actions and the board state.

The shadcn `Sheet` component is already installed and used by `MobileSidebar`. No new UI dependencies are needed.

## Goals / Non-Goals

**Goals:**
- Open a right-side drawer when a task card is clicked (not dragged)
- Display and allow editing of: task name, assignee, due date, priority, description
- Show the current task status in the drawer header (read-only badge)
- Save all changes to the database when the drawer is closed
- Reflect saved changes immediately in the Kanban column

**Non-Goals:**
- Changing task status from the drawer (status is changed by drag-and-drop only)
- Real-time collaborative updates
- File attachments or comments

## Decisions

### Distinguish click from drag on TaskCard
`useDraggable` fires pointer events. A drag involves pointer movement; a click does not. The cleanest approach is to track `pointerdown` position and compare to `pointerup` — if displacement is ≤ 4px it counts as a click. Alternatively, use dnd-kit's `activationConstraint: { distance: 4 }` on the `PointerSensor` — if the sensor doesn't activate (no drag started), the native click event fires normally. This is the preferred approach: configure `PointerSensor` with `distance: 4` so short movements don't trigger drag, and attach an `onClick` to the card wrapper.

**Alternative considered**: Track `isDragging` in state and suppress click if true. Rejected — race condition between drag end and click event timing.

### Drawer saves on close (not on every field change)
All edits are held in local state inside `TaskDetailDrawer`. On `onOpenChange(false)`, a single `updateTask` call is made. This minimises server round-trips and gives users a natural "confirm by closing" interaction.

**Alternative considered**: Auto-save on each field blur. Rejected — too many server calls; more complex to debounce correctly.

### New `updateTask` server action
A single action `updateTask(taskId, patch)` accepts a partial `TaskItem` (title, assignee, dueDate, priority, description). It verifies session and project ownership before writing. Returns the updated `TaskItem` or `null` on failure.

### Extend TaskItem type (not create a new type)
Adding optional fields to `TaskItem` keeps the existing `GroupedTasks` structure and column state management unchanged. The new fields are `undefined` for tasks created before this change.

### Priority badge colors
- `high` → red (`bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400`)
- `medium` → yellow (`bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400`)
- `low` → green (`bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400`)

Clicking the badge cycles through priorities or shows a small inline picker.

## Risks / Trade-offs

- **Data migration** → Existing tasks won't have the new fields; they'll render as empty/unset in the drawer. No migration needed — Mongoose treats missing fields as `undefined`. Mitigation: show placeholder text in the UI for unset fields.
- **Drag vs click ambiguity** → The `distance: 4` activation constraint means very short drags won't move cards. Mitigation: this is standard UX for drag-and-drop and acceptable.
- **Optimistic vs confirmed update** → The drawer updates the board state only after a successful `updateTask` call (on close). If the call fails, the drawer stays open and shows an error — no silent data loss.

## Migration Plan

1. Add optional fields to `Task` Mongoose schema (backwards compatible — no migration)
2. Extend `TaskItem` type and update `getTasksByProject` to include new fields
3. Add `updateTask` server action
4. Update `PointerSensor` with `distance: 4` activation constraint in `KanbanBoard`
5. Add `onClick` to `TaskCard`, lift selected task state to `KanbanBoard`
6. Build `TaskDetailDrawer` component
7. Wire drawer open/close and state update in `KanbanBoard`

**Rollback**: Revert commits. No irreversible DB changes — new fields are optional.
