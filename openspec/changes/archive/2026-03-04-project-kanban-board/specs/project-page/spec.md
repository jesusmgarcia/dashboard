## MODIFIED Requirements

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
