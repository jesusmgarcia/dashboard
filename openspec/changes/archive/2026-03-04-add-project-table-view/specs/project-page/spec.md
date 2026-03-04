## MODIFIED Requirements

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
