## 1. Data Fetching

- [x] 1.1 Add `getDashboardData(userId: string, email: string)` async function in `app/(dashboard)/dashboard/page.tsx` that runs three parallel Mongoose queries with `Promise.all`: project count, last created project, and high-priority tasks assigned to the user (capped at 10, sorted by `createdAt` descending)
- [x] 1.2 Call `getSession()` in the dashboard page and redirect to `/login` if unauthenticated
- [x] 1.3 Verify queries are scoped correctly — projects filtered by `userId`, tasks filtered by `assignee: email` and `priority: "high"`

## 2. Widget Components

- [x] 2.1 Create a `StatCard` presentational component (inline or in `app/(dashboard)/dashboard/`) that renders a shadcn `Card` with a title, a large primary value, and an optional subtitle
- [x] 2.2 Implement the **Total Projects** widget using `StatCard` — displays the project count as the primary value
- [x] 2.3 Implement the **Last Project** widget using `StatCard` — displays the project name as the primary value and its creation date as the subtitle; show "No projects yet" when null
- [x] 2.4 Create a `HighPriorityTasksCard` component that renders a shadcn `Card` with a list of task items; each item shows the task title and links to `/projects/[projectId]`; show "No high priority tasks" when the list is empty

## 3. Dashboard Page Layout

- [x] 3.1 Update `app/(dashboard)/dashboard/page.tsx` to render the three widgets in a responsive CSS grid (`grid-cols-1 sm:grid-cols-3`) below the existing greeting header
- [x] 3.2 Place the `HighPriorityTasksCard` spanning full width below the top row of stat cards
