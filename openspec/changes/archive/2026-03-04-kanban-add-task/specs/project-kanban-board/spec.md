## MODIFIED Requirements

### Requirement: Kanban board renders three columns from database tasks
The system SHALL render a Kanban board on the project detail page with three columns — **To Do**, **In Progress**, and **Done** — each populated with tasks fetched from the database whose `status` matches the column. The To Do and In Progress columns SHALL additionally provide inline task creation affordances.

#### Scenario: Tasks are displayed in the correct column
- **WHEN** a project has tasks with various `status` values
- **THEN** each task SHALL appear in the column corresponding to its `status` (`todo` → To Do, `in-progress` → In Progress, `done` → Done)

#### Scenario: Empty column shows a placeholder
- **WHEN** a project has no tasks for a given status
- **THEN** the corresponding column SHALL display an empty-state message (e.g., "No tasks")

#### Scenario: Only tasks belonging to the project are shown
- **WHEN** the board renders for project A
- **THEN** the system SHALL only fetch and display tasks whose `projectId` matches project A's ID

#### Scenario: Newly created task appears in the correct column immediately
- **WHEN** a user creates a task via the inline form in a column
- **THEN** the task SHALL appear in that column without a full page reload
