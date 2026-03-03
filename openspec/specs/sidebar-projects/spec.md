### Requirement: Projects section in sidebar
The sidebar SHALL display a collapsible "Projects" section below the main navigation links, visible in both the desktop sidebar and the mobile off-canvas drawer.

#### Scenario: Projects section is visible below nav links
- **WHEN** the dashboard layout is rendered
- **THEN** a "Projects" section header SHALL appear below the main navigation links in the sidebar

#### Scenario: Section is expanded by default
- **WHEN** the Projects section has not been previously collapsed by the user
- **THEN** the section SHALL render in the expanded state, showing any existing projects

### Requirement: Collapsible Projects section
The Projects section header SHALL act as a toggle that expands and collapses the project list.

#### Scenario: Clicking the header collapses an expanded section
- **WHEN** the user clicks the Projects section header while the section is expanded
- **THEN** the project list SHALL collapse and the chevron icon SHALL rotate to indicate the collapsed state

#### Scenario: Clicking the header expands a collapsed section
- **WHEN** the user clicks the Projects section header while the section is collapsed
- **THEN** the project list SHALL expand and the chevron icon SHALL rotate to indicate the expanded state

#### Scenario: Collapsed state persists across page refreshes
- **WHEN** the user collapses the Projects section and refreshes the page
- **THEN** the section SHALL remain collapsed on the next render

### Requirement: Add project button
The Projects section header SHALL include a small "+" icon button that triggers inline project creation.

#### Scenario: Add button is visible in the header
- **WHEN** the Projects section is rendered
- **THEN** a small "+" icon button SHALL appear to the right of the "Projects" label in the section header

#### Scenario: Clicking the add button shows the inline input
- **WHEN** the user clicks the "+" button
- **THEN** the Projects section SHALL expand (if collapsed) and an inline text input SHALL appear as the first item in the project list

### Requirement: Inline project creation
When the add button is clicked, the sidebar SHALL display an inline text input for entering a new project name.

#### Scenario: Pressing Enter commits the new project
- **WHEN** the user types a non-empty project name and presses Enter
- **THEN** the project SHALL be added to the project list and the input SHALL be dismissed

#### Scenario: Blurring the input commits a non-empty value
- **WHEN** the user types a non-empty project name and moves focus away from the input
- **THEN** the project SHALL be added to the project list and the input SHALL be dismissed

#### Scenario: Pressing Escape cancels the input
- **WHEN** the user presses Escape while the inline input is focused
- **THEN** the input SHALL be dismissed without adding a project

#### Scenario: Blurring an empty input cancels silently
- **WHEN** the user focuses the inline input and moves focus away without typing anything
- **THEN** the input SHALL be dismissed without adding a project

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

### Requirement: Project items link to project page
Each project in the sidebar project list SHALL be a navigable link to the project's detail page.

#### Scenario: Clicking a project navigates to its page
- **WHEN** the user clicks a project item in the sidebar
- **THEN** the browser SHALL navigate to `/projects/[id]` where `[id]` is the project's MongoDB document ID

#### Scenario: Active project link is highlighted
- **WHEN** the current URL matches a project item's href
- **THEN** that project item SHALL be visually distinguished from inactive items
