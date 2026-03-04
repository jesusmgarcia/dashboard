### Requirement: Dashboard displays total project count widget
The system SHALL display a card widget on the dashboard home page showing the total number of projects owned by the authenticated user.

#### Scenario: User has projects
- **WHEN** an authenticated user navigates to the dashboard home page
- **THEN** the system SHALL display a card titled "Projects" showing the exact count of projects belonging to that user

#### Scenario: User has no projects
- **WHEN** an authenticated user has no projects
- **THEN** the dashboard card SHALL display a count of 0

### Requirement: Dashboard displays last created project widget
The system SHALL display a card widget showing the name and creation date of the most recently created project belonging to the authenticated user.

#### Scenario: User has at least one project
- **WHEN** an authenticated user navigates to the dashboard home page
- **THEN** the system SHALL display a card titled "Last Project" showing the project name and a human-readable creation date

#### Scenario: User has no projects
- **WHEN** an authenticated user has no projects
- **THEN** the "Last Project" card SHALL display an empty-state message (e.g., "No projects yet")

### Requirement: Dashboard displays high priority tasks widget
The system SHALL display a card widget listing tasks with `priority: "high"` where the `assignee` field matches the authenticated user's email, capped at 10 items.

#### Scenario: User has high priority tasks assigned
- **WHEN** an authenticated user has one or more tasks with `priority: "high"` and `assignee` equal to their email
- **THEN** the system SHALL display those tasks as a list inside the widget, each item showing the task title and a link to its project's Kanban board

#### Scenario: User has no high priority tasks
- **WHEN** an authenticated user has no tasks with `priority: "high"` assigned to them
- **THEN** the high priority tasks card SHALL display an empty-state message (e.g., "No high priority tasks")

#### Scenario: More than 10 high priority tasks exist
- **WHEN** an authenticated user has more than 10 tasks with `priority: "high"` assigned to them
- **THEN** the system SHALL display only the 10 most recently created tasks

### Requirement: Dashboard widgets are scoped to the authenticated user
The system SHALL ensure all widget data (projects, tasks) is filtered to the currently authenticated user and SHALL NOT expose data belonging to other users.

#### Scenario: Widgets show only the user's own data
- **WHEN** the dashboard page renders for user A
- **THEN** the project count, last project, and task list SHALL only include data where `userId` or `assignee` matches user A's session identity
