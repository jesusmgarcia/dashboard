## ADDED Requirements

### Requirement: Project detail page route
The system SHALL provide a route at `/projects/[id]` that renders a detail page for the specified project within the dashboard layout.

#### Scenario: Authenticated owner can view their project
- **WHEN** an authenticated user navigates to `/projects/[id]` and the project belongs to them
- **THEN** the system SHALL render the project detail page showing the project name and creation date

#### Scenario: Unauthenticated access is blocked
- **WHEN** an unauthenticated visitor navigates to `/projects/[id]`
- **THEN** the system SHALL redirect them to `/`

#### Scenario: Non-existent project returns 404
- **WHEN** an authenticated user navigates to `/projects/[id]` and no project with that ID exists
- **THEN** the system SHALL render a 404 not-found response

#### Scenario: Project belonging to another user returns 404
- **WHEN** an authenticated user navigates to `/projects/[id]` and the project belongs to a different user
- **THEN** the system SHALL render a 404 not-found response (not a 403, to avoid revealing existence)
