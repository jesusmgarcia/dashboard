## ADDED Requirements

### Requirement: Task model with Kanban status
The system SHALL provide a `Task` Mongoose model with fields: `title` (string, required), `status` (enum: `todo` | `in-progress` | `done`, default `todo`), `projectId` (ObjectId reference to Project, required), and `createdAt` / `updatedAt` timestamps.

#### Scenario: Task is associated with a project
- **WHEN** a `Task` document is created with a valid `projectId`
- **THEN** the system SHALL persist it in the `tasks` collection linked to the referenced project

#### Scenario: Task status defaults to todo
- **WHEN** a `Task` is created without an explicit `status`
- **THEN** the system SHALL set `status` to `todo`

### Requirement: Kanban board renders three columns from database tasks
The system SHALL render a Kanban board on the project detail page with three columns — **To Do**, **In Progress**, and **Done** — each populated with tasks fetched from the database whose `status` matches the column.

#### Scenario: Tasks are displayed in the correct column
- **WHEN** a project has tasks with various `status` values
- **THEN** each task SHALL appear in the column corresponding to its `status` (`todo` → To Do, `in-progress` → In Progress, `done` → Done)

#### Scenario: Empty column shows a placeholder
- **WHEN** a project has no tasks for a given status
- **THEN** the corresponding column SHALL display an empty-state message (e.g., "No tasks")

#### Scenario: Only tasks belonging to the project are shown
- **WHEN** the board renders for project A
- **THEN** the system SHALL only fetch and display tasks whose `projectId` matches project A's ID
