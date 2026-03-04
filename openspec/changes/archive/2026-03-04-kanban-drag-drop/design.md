## Context

`KanbanBoard.tsx` is a client component holding task lists in `useState`. Cards are static — there is no drag interaction. The `Task` Mongoose model has a `status` field but no server action exists to update it. The board state is owned client-side; the server is the source of truth on page load.

## Goals / Non-Goals

**Goals:**
- Make task cards draggable across all three columns
- Highlight the target column during a drag
- On drop into a different column: update local state instantly and persist status to the database via a server action
- Use `@dnd-kit/core` for the DnD primitives

**Non-Goals:**
- Reordering tasks within a column (only cross-column moves)
- Drag handle icon on cards (full card is the drag handle)
- Undo/redo for moves
- Multi-select drag

## Decisions

### 1. `@dnd-kit/core` over native HTML5 drag-and-drop

`@dnd-kit/core` provides pointer + keyboard accessibility, cross-browser touch support, and clean React primitives (`DndContext`, `useDraggable`, `useDroppable`). Native HTML5 DnD has poor touch support and requires manual cross-browser workarounds.

**Alternative considered**: `react-beautiful-dnd` — abandoned, not compatible with React 18+. Rejected.

### 2. Optimistic client update before server round-trip

On `onDragEnd`, the task is moved in `columnTasks` state immediately. The `updateTaskStatus` server action fires in the background. If it fails, the card snaps back to its original column.

**Rationale**: Instant visual feedback is critical for drag-and-drop UX. A delay would make the interaction feel broken.

### 3. Column as the drop target (not individual card positions)

Each column is a single `useDroppable` zone. Cards drop into the column, appending to the bottom of the list. No intra-column sorting.

**Rationale**: Keeps implementation simple and matches the current append-to-bottom model used by task creation. Sorting within columns can be added in a future change using `@dnd-kit/sortable`.

### 4. `updateTaskStatus` server action with ownership check

A new `updateTaskStatus(taskId, status)` action in `actions.ts` fetches the task, verifies the session owns the associated project, then updates `status`.

**Rationale**: The client passes only `taskId` and `status`; server must re-verify ownership to prevent cross-user mutations.

### 5. Install only `@dnd-kit/core` and `@dnd-kit/utilities`

`@dnd-kit/sortable` is not needed since we don't sort within columns.

## Risks / Trade-offs

- **Optimistic rollback UX** → On server failure, the card snaps back silently. Acceptable per current error-handling convention; a future change can add a toast.
- **Touch support** → `@dnd-kit` requires `PointerSensor` which handles touch natively — no extra config needed.
- **Card overlap during drag** → `@dnd-kit` uses CSS transforms; the dragged card renders in-place with an overlay. This is the default and requires no extra layering config.
