## 1. Server Action

- [x] 1.1 Add `createTask(projectId: string, title: string, status: TaskStatus)` to `app/(dashboard)/projects/actions.ts` — verify session, verify project ownership, insert Task document, return `{ id, title } | null`

## 2. Inline Add Form Component

- [x] 2.1 Create `app/(dashboard)/projects/[id]/AddTaskForm.tsx` as a client component with a controlled text input, a confirm button, and an Escape key / cancel affordance
- [x] 2.2 Disable the input and confirm button while the server action is pending (use `useTransition`)
- [x] 2.3 On submit, validate that the trimmed title is non-empty before calling the server action; keep the input open if empty
- [x] 2.4 On successful creation, reset the input and call an `onAdded` callback with the new task so the parent can update state; on failure, roll back without crashing

## 3. Column Add Button & Optimistic State

- [x] 3.1 In `KanbanBoard.tsx`, lift column task lists into `useState` initialised from the `tasks` prop so the board can update without a page reload
- [x] 3.2 Add an `showAddForm` toggle to the To Do and In Progress `Column` renders; wire the "Add task" `+` button to open `AddTaskForm` inline at the bottom of the column
- [x] 3.3 Implement the `onAdded` handler: append the new task optimistically to the correct column's state and close the form
- [x] 3.4 Ensure the Done column renders no add button
