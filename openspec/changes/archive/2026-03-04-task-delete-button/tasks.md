## 1. Server action

- [x] 1.1 Add `deleteTask(taskId: string): Promise<boolean>` server action to `app/(dashboard)/projects/actions.ts`, verifying session and project ownership before deleting the Task document

## 2. Drawer UI

- [x] 2.1 Add `onDeleted: (taskId: string) => void` prop to `TaskDetailDrawerProps`
- [x] 2.2 Add `deleting` boolean state and `handleDelete` async function that calls `deleteTask`, shows error on failure, or calls `onDeleted` + `onClose` on success
- [x] 2.3 Add `Trash2` icon button in the drawer header (left of the close button), disabled while `saving || deleting`, with destructive-color hover styling

## 3. Board integration

- [x] 3.1 Pass `onDeleted` callback from the Kanban board page to `TaskDetailDrawer` — remove the deleted task id from all status columns in local state
