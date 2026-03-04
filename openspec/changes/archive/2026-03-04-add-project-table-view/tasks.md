## 1. Dependencies & Setup

- [x] 1.1 Run `npx shadcn add tabs` to install the shadcn/ui Tabs component into `components/ui/tabs.tsx`

## 2. Refactor KanbanBoard to accept external task-click handler

- [x] 2.1 Add `onTaskClick: (task: TaskItem) => void` prop to `KanbanBoard`'s props interface
- [x] 2.2 Remove `selectedTask` state and `TaskDetailDrawer` JSX from `KanbanBoard`
- [x] 2.3 Replace the internal `setSelectedTask(task)` call in `TaskCard`'s click handler with `onTaskClick(task)`
- [x] 2.4 Remove `onSaved` and `onDeleted` handler logic that updated `columnTasks` from the drawer — these will now be passed down from `ProjectTabs`; keep `handleTaskSaved` and `handleTaskDeleted` as props or passed callbacks

## 3. Create `ProjectTabs` client component

- [x] 3.1 Create `app/(dashboard)/projects/[id]/ProjectTabs.tsx` as a `"use client"` component
- [x] 3.2 Accept props: `projectId: string`, `initialTasks: GroupedTasks`
- [x] 3.3 Manage state: `columnTasks: GroupedTasks`, `selectedTask: TaskItem | null`
- [x] 3.4 Implement `handleTaskSaved(updated: TaskItem)` — updates the task in `columnTasks` across all columns
- [x] 3.5 Implement `handleTaskDeleted(taskId: string)` — removes the task from `columnTasks` across all columns
- [x] 3.6 Render shadcn `Tabs` with two `TabsTrigger` items: "Kanban" and "Table"
- [x] 3.7 Render `KanbanBoard` inside the Kanban `TabsContent`, passing `onTaskClick`, `onSaved`, and `onDeleted` callbacks
- [x] 3.8 Render `TaskTable` inside the Table `TabsContent`, passing flat task list and `onTaskClick`
- [x] 3.9 Render `TaskDetailDrawer` once at the `ProjectTabs` level, driven by `selectedTask` state

## 4. Create `TaskTable` component

- [x] 4.1 Create `app/(dashboard)/projects/[id]/TaskTable.tsx` as a `"use client"` component
- [x] 4.2 Accept props: `tasks: TaskItem[]`, `onTaskClick: (task: TaskItem) => void`
- [x] 4.3 Render a `<table>` with columns: Title, Status, Priority, Assignee, Due Date, Description
- [x] 4.4 Render one `<tr>` per task; entire row is clickable (calls `onTaskClick(task)`)
- [x] 4.5 Render Status as a styled badge matching kanban color scheme (slate/blue/green)
- [x] 4.6 Render Priority as a styled badge matching kanban color scheme (red/yellow/green)
- [x] 4.7 Format `dueDate` as a readable date string (e.g., "Mar 4, 2026"); show dash if absent
- [x] 4.8 Truncate Description text to fit the column (single line with overflow ellipsis)
- [x] 4.9 Add empty state row/message when `tasks` array is empty ("No tasks yet")
- [x] 4.10 Apply hover styles to rows to indicate they are clickable (`cursor-pointer`, `hover:bg-muted/50`)

## 5. Update project page to use `ProjectTabs`

- [x] 5.1 In `app/(dashboard)/projects/[id]/page.tsx`, replace the `<KanbanBoard>` render with `<ProjectTabs projectId={id} initialTasks={groupedTasks} />`
- [x] 5.2 Remove the `KanbanBoard` import from `page.tsx` and add the `ProjectTabs` import
