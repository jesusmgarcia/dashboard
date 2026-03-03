## MODIFIED Requirements

### Requirement: Project list persistence
The project list SHALL be loaded from MongoDB on the server and passed to the sidebar as initial state. localStorage SHALL no longer be used to persist project names.

#### Scenario: Projects loaded from database on page render
- **WHEN** the dashboard layout is rendered for an authenticated user
- **THEN** the sidebar SHALL display all projects belonging to that user, retrieved from MongoDB

#### Scenario: New project persisted to MongoDB on creation
- **WHEN** the user commits a non-empty project name in the inline input
- **THEN** the system SHALL call a server action that creates a `Project` document in MongoDB associated with the authenticated user's ID and returns the new project's `id` and `name`

#### Scenario: New project appears in sidebar immediately after creation
- **WHEN** the server action successfully creates the project
- **THEN** the new project SHALL appear in the sidebar project list without requiring a page refresh

## ADDED Requirements

### Requirement: Project items link to project page
Each project in the sidebar project list SHALL be a navigable link to the project's detail page.

#### Scenario: Clicking a project navigates to its page
- **WHEN** the user clicks a project item in the sidebar
- **THEN** the browser SHALL navigate to `/projects/[id]` where `[id]` is the project's MongoDB document ID

#### Scenario: Active project link is highlighted
- **WHEN** the current URL matches a project item's href
- **THEN** that project item SHALL be visually distinguished from inactive items
