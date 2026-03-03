## Context

The sidebar currently stores projects as `string[]` in localStorage and in `SidebarProjects.tsx` local state. Authentication is JWT-based; `getSession()` returns `{ email, id }`. The MongoDB layer uses a Mongoose singleton (`connectDB`). `DashboardLayout` is a React Server Component that already calls `getSession()` and passes user data to child components. `Sidebar.tsx` and `MobileSidebar.tsx` are `"use client"` components.

## Goals / Non-Goals

**Goals:**
- Introduce a `Project` Mongoose model with `name`, `userId`, and timestamps
- Persist new projects to MongoDB via a `createProject` server action called from `SidebarProjects`
- Load the project list server-side in `DashboardLayout` and pass it down as `initialProjects` props
- Replace the sidebar project items with `<Link>` components that navigate to `/projects/[id]`
- Create a project detail page at `app/(dashboard)/projects/[id]/page.tsx`
- Remove localStorage project list (keep only `isOpen` in localStorage)

**Non-Goals:**
- Editing or deleting projects
- Project membership / sharing between users
- Rich project content (descriptions, tasks, files)
- Pagination of the project list in the sidebar

## Decisions

### 1. Project model

**Decision**: New Mongoose model `Project` at `lib/models/Project.ts`:
```ts
interface IProject extends Document {
  name: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```
`userId` references the `User` collection. An index on `userId` is added for efficient per-user queries.

### 2. Server action for creation

**Decision**: `app/(dashboard)/projects/actions.ts` with `"use server"` exports a `createProject(name: string)` function that:
1. Calls `getSession()` — returns `null` if unauthenticated
2. Calls `connectDB()`
3. Inserts a new `Project` document
4. Returns `{ id: string; name: string }` to the client

The client (`SidebarProjects`) calls this action as a regular async function in a `startTransition`, then appends the returned project to local state and navigates with `router.push`.

**Rationale**: Consistent with the existing `updateProfile` server action pattern. No separate API route needed.

### 3. Loading projects server-side

**Decision**: `DashboardLayout` fetches all projects for the current user after `getSession()` and passes them as `initialProjects: { id: string; name: string }[]` to both `Sidebar` and `MobileSidebar`, which forward them to `SidebarProjects`.

**Rationale**: SSR avoids a client-side fetch waterfall and ensures projects are available on first paint. `DashboardLayout` already has async capability (calls `getSession()`).

### 4. SidebarProjects state shape

**Decision**: Change state from `string[]` to `{ id: string; name: string }[]`. `initialProjects` is the initial value. After a successful `createProject` call, the returned project object is appended to state. localStorage project list key is removed; only `isOpen` remains.

### 5. Project items as links

**Decision**: Replace the `<span>` project rows with `<Link href={/projects/${project.id}}>` from `next/link`. Styled identically to the current rows but with `cursor-pointer` and active-state highlight when the current path matches.

### 6. Project detail page

**Decision**: `app/(dashboard)/projects/[id]/page.tsx` — async Server Component that:
1. Reads `params.id`
2. Calls `getSession()` — redirects to `/` if unauthenticated
3. Calls `connectDB()` and fetches `Project.findById(id).lean()`
4. Returns 404 (`notFound()`) if not found or `userId` doesn't match `session.id`
5. Renders the project name, creation date, and a placeholder for future content

**Rationale**: Access control at the page level prevents users from viewing other users' projects.

## Risks / Trade-offs

- **DashboardLayout fetches on every navigation** → Minor overhead per request. Acceptable for a small app; caching can be added later via React's `cache()`.
- **No optimistic UI on create** → The sidebar adds the project to state immediately after the server action resolves, which takes ~200–500ms. Acceptable UX given the lightweight operation.
- **localStorage project list orphaned on existing browsers** → Old clients have stale `sidebar-projects` in localStorage. This is harmless — `SidebarProjects` no longer reads that key and it will be ignored. Optionally, it can be cleared on mount.
