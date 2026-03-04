## 1. Data Model & Server Action

- [x] 1.1 Add optional fields to `app/lib/models/Task.ts`: `assignee` (String), `dueDate` (Date), `priority` (enum: "high" | "medium" | "low"), `description` (String)
- [x] 1.2 Extend `TaskItem` type in `actions.ts` to include: `assignee?`, `dueDate?`, `priority?`, `description?`
- [x] 1.3 Update `getTasksByProject` to map the new fields onto returned `TaskItem` objects
- [x] 1.4 Add `updateTask(taskId, patch)` server action that accepts partial task fields, verifies session + project ownership, and returns the updated `TaskItem` or null

## 2. Drag vs Click Fix

- [x] 2.1 Add `activationConstraint: { distance: 4 }` to `PointerSensor` in `KanbanBoard.tsx` so short pointer movements do not activate drag

## 3. TaskDetailDrawer Component

- [x] 3.1 Create `app/(dashboard)/projects/[id]/TaskDetailDrawer.tsx` as a client component using shadcn `Sheet` (side="right")
- [x] 3.2 Implement drawer header: status badge (read-only) + close button (`X` icon)
- [x] 3.3 Implement editable task name input (pre-filled, controlled)
- [x] 3.4 Implement assignee text input (pre-filled, controlled)
- [x] 3.5 Implement due date input (`<input type="date">`, controlled)
- [x] 3.6 Implement priority selector: three badge buttons (High=red, Medium=yellow, Low=green), clicking one sets the priority
- [x] 3.7 Implement description textarea (pre-filled, controlled)
- [x] 3.8 On `onOpenChange(false)`: call `updateTask`, update parent state with returned task, or show inline error if null

## 4. Wire Drawer into KanbanBoard

- [x] 4.1 Add `selectedTask` and `setSelectedTask` state to `KanbanBoard`
- [x] 4.2 Pass `onSelect` callback to `TaskCard`; call it on click (only when not dragging)
- [x] 4.3 Render `TaskDetailDrawer` inside `KanbanBoard`, controlled by `selectedTask`
- [x] 4.4 On drawer save, update `columnTasks` state with the returned task (update title and other fields in the correct column)

## 5. Verify

- [x] 5.1 Run `npm run build` and confirm no TypeScript errors
