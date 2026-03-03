## Why

Projects created in the sidebar are currently stored only in localStorage, meaning they are browser-local, lost on sign-out, and invisible on other devices. Persisting them to MongoDB makes projects real data entities that survive sessions and can grow in value over time. A dedicated project page gives each project a meaningful home to display its information.

## What Changes

- When the user commits a new project name in the sidebar, a server action creates a `Project` document in MongoDB associated with the authenticated user
- The sidebar project list is loaded from MongoDB on the server (via `DashboardLayout`) instead of from localStorage
- Each project item in the sidebar becomes a link that navigates to `/projects/[id]`
- A new route `app/(dashboard)/projects/[id]/page.tsx` renders a project detail page showing the project's name, ID, and creation date
- The `Project` MongoDB model is introduced in `lib/models/Project.ts`
- The localStorage-based project list is removed; only the collapse state (`isOpen`) remains in localStorage

## Capabilities

### New Capabilities

- `project-page`: Dedicated route at `/projects/[id]` that displays project information for the authenticated owner.

### Modified Capabilities

- `sidebar-projects`: Project creation now persists to MongoDB via a server action; project list is loaded server-side; project items link to the project page; localStorage project list is replaced by server state.
- `mongodb-user-store`: A new `Project` model is introduced alongside the existing `User` model.

## Impact

- New file: `lib/models/Project.ts` — Mongoose model for projects
- New file: `app/(dashboard)/projects/actions.ts` — `createProject` server action
- New file: `app/(dashboard)/projects/[id]/page.tsx` — project detail page
- Modified: `components/dashboard/DashboardLayout.tsx` — fetches user projects from DB and passes to sidebars
- Modified: `components/dashboard/Sidebar.tsx` — accepts and forwards `initialProjects` prop
- Modified: `components/dashboard/MobileSidebar.tsx` — accepts and forwards `initialProjects` prop
- Modified: `components/dashboard/SidebarProjects.tsx` — uses server-loaded projects and server action for creation; project items become links
