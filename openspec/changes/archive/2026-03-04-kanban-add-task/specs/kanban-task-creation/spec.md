## ADDED Requirements

### Requirement: Inline task creation in To Do and In Progress columns
The system SHALL render an "Add task" button at the bottom of the To Do and In Progress Kanban columns. The Done column SHALL NOT have an add button.

#### Scenario: Add button is visible on To Do and In Progress columns
- **WHEN** a user views the Kanban board
- **THEN** the To Do and In Progress columns SHALL each display an "Add task" button and the Done column SHALL NOT

#### Scenario: Clicking Add task reveals an inline input
- **WHEN** a user clicks the "Add task" button in a column
- **THEN** the system SHALL replace the button with an inline text input and a confirm action within that column

#### Scenario: Submitting a non-empty title creates the task
- **WHEN** a user types a task title and submits the inline form
- **THEN** the system SHALL call the createTask server action with the column's status and the project ID, and the new task SHALL appear in the column immediately

#### Scenario: Submitting an empty title does nothing
- **WHEN** a user submits the inline form with an empty or whitespace-only title
- **THEN** the system SHALL NOT create a task and SHALL keep the input open

#### Scenario: Cancelling dismisses the input
- **WHEN** a user presses Escape or clicks a cancel affordance
- **THEN** the inline input SHALL close and the "Add task" button SHALL reappear

### Requirement: createTask server action persists new task to database
The system SHALL provide a `createTask(projectId, title, status)` server action that creates a Task document in the database owned by the authenticated user's project.

#### Scenario: Authenticated user creates a task in their project
- **WHEN** an authenticated user submits a valid title and status for a project they own
- **THEN** the system SHALL insert a Task document with the given title, status, and projectId and return the created task's id and title

#### Scenario: Unauthenticated request is rejected
- **WHEN** an unauthenticated call is made to createTask
- **THEN** the system SHALL return null without creating any document

#### Scenario: Project ownership is enforced
- **WHEN** an authenticated user calls createTask with a projectId that belongs to a different user
- **THEN** the system SHALL return null without creating any document
