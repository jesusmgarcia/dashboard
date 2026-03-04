## Requirements

### Requirement: Project page displays tabbed views
The project page SHALL present a tab bar with two tabs — **Kanban** and **Table** — below the project header. The **Kanban** tab SHALL be selected by default. Tab selection SHALL not be persisted across page navigations.

#### Scenario: Default tab on page load
- **WHEN** the user navigates to a project page
- **THEN** the Kanban tab is selected and the kanban board is visible

#### Scenario: Switching to Table tab
- **WHEN** the user clicks the Table tab
- **THEN** the table view becomes visible and the kanban board is hidden

#### Scenario: Switching back to Kanban tab
- **WHEN** the user is on the Table tab and clicks the Kanban tab
- **THEN** the kanban board becomes visible and the table is hidden

### Requirement: Project detail page route
The system SHALL provide a route at `/projects/[id]` that renders a detail page for the specified project within the dashboard layout, showing the project name, creation date, and a Kanban board of tasks belonging to that project.

#### Scenario: Authenticated owner can view their project with Kanban board
- **WHEN** an authenticated user navigates to `/projects/[id]` and the project belongs to them
- **THEN** the system SHALL render the project detail page showing the project name, creation date, and a Kanban board with columns populated from the project's tasks in the database

#### Scenario: Unauthenticated access is blocked
- **WHEN** an unauthenticated visitor navigates to `/projects/[id]`
- **THEN** the system SHALL redirect them to `/`

#### Scenario: Non-existent project returns 404
- **WHEN** an authenticated user navigates to `/projects/[id]` and no project with that ID exists
- **THEN** the system SHALL render a 404 not-found response

#### Scenario: Project belonging to another user returns 404
- **WHEN** an authenticated user navigates to `/projects/[id]` and the project belongs to a different user
- **THEN** the system SHALL render a 404 not-found response (not a 403, to avoid revealing existence)
