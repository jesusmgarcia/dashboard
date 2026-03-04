## 1. Dependency

- [x] 1.1 Install `@dnd-kit/core` and `@dnd-kit/utilities` packages

## 2. Server Action

- [x] 2.1 Add `updateTaskStatus(taskId: string, status: TaskStatus)` to `app/(dashboard)/projects/actions.ts` — verify session, fetch task, verify project ownership via `task.projectId`, update `status`, return updated `TaskItem | null`

## 3. DnD Integration in KanbanBoard

- [x] 3.1 Wrap the board grid in `DndContext` (from `@dnd-kit/core`) with a `PointerSensor`; wire `onDragEnd` to handle cross-column moves
- [x] 3.2 In `onDragEnd`, extract `active.id` (taskId) and `over.id` (target column status); skip if same column or no target
- [x] 3.3 Optimistically move the task in `columnTasks` state, then call `updateTaskStatus` in a transition; roll back to the previous state if the action returns null
- [x] 3.4 Make each `Column` a drop target using `useDroppable` with its `status` as the `id`; apply a highlight style when `isOver` is true
- [x] 3.5 Make each `TaskCard` draggable using `useDraggable` with the task `id`; apply a CSS transform and reduced opacity while dragging (`transform` style from `useDraggable` attributes)
