## 1. Project MongoDB Model

- [x] 1.1 Create `lib/models/Project.ts` with `IProject` interface (`name: string`, `userId: ObjectId`, timestamps) and a Mongoose schema with a `userId` index and the standard singleton model export pattern

## 2. Server Action

- [x] 2.1 Create `app/(dashboard)/projects/actions.ts` with `"use server"` and a `createProject(name: string)` function that: gets the session, connects to DB, inserts a Project document, and returns `{ id: string; name: string }` (or `null` on failure)

## 3. Dashboard Layout — Server-side Project Fetching

- [x] 3.1 In `components/dashboard/DashboardLayout.tsx`, after `getSession()`, connect to DB and fetch all projects for the current user (`Project.find({ userId: session.id }).select('name').lean()`), map to `{ id, name }[]`, and pass as `initialProjects` prop to both `<Sidebar>` and `<MobileSidebar>`

## 4. Sidebar Component Props

- [x] 4.1 Update `components/dashboard/Sidebar.tsx` to accept `initialProjects: { id: string; name: string }[]` and forward it to `<SidebarProjects>`
- [x] 4.2 Update `components/dashboard/MobileSidebar.tsx` to accept and forward `initialProjects` to `<SidebarProjects>` in the same way

## 5. SidebarProjects — DB-backed State & Navigation

- [x] 5.1 Update `SidebarProjects.tsx` to accept `initialProjects: { id: string; name: string }[]` and use it as the initial value of the projects state (replacing the localStorage read); remove the localStorage write effect for project names
- [x] 5.2 On `commitInput`: call `createProject(name)` from the server action, and on success append `{ id, name }` to projects state and navigate to `/projects/${id}` using `useRouter`
- [x] 5.3 Replace each `<span>` project row with a `<Link href={/projects/${project.id}}>` that highlights when the current pathname matches (using `usePathname`), styled with `cursor-pointer`

## 6. Project Detail Page

- [x] 6.1 Create `app/(dashboard)/projects/[id]/page.tsx` as a server component: get session (redirect to `/` if missing), connect to DB, fetch `Project.findById(params.id).lean()`, call `notFound()` if not found or `userId` doesn't match `session.id`, then render the project name and creation date in a card
