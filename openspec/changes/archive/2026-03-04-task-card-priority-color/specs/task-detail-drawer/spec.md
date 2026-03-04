## ADDED Requirements

### Requirement: Task card background reflects priority
Task cards on the Kanban board SHALL display a background color tint that corresponds to the task's priority: red for high, yellow for medium, green for low. Cards with no priority set SHALL use the default card background.

#### Scenario: High priority card has red background
- **WHEN** a task card has priority set to "high"
- **THEN** the card SHALL display a red background tint

#### Scenario: Medium priority card has yellow background
- **WHEN** a task card has priority set to "medium"
- **THEN** the card SHALL display a yellow background tint

#### Scenario: Low priority card has green background
- **WHEN** a task card has priority set to "low"
- **THEN** the card SHALL display a green background tint

#### Scenario: Unprioritized card has default background
- **WHEN** a task card has no priority set
- **THEN** the card SHALL display the default card background with no color tint
