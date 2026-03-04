## MODIFIED Requirements

### Requirement: Task card background reflects priority
Task cards on the Kanban board SHALL display a right-aligned colored badge with a text label indicating the task's priority. Cards with no priority set SHALL display no badge and use the default card background. All cards SHALL use the default card background regardless of priority.

#### Scenario: High priority card shows red badge
- **WHEN** a task card has priority set to "high"
- **THEN** the card SHALL display a right-aligned red badge with the label "High"
- **THEN** the card SHALL use the default card background (no red tint)

#### Scenario: Medium priority card shows yellow badge
- **WHEN** a task card has priority set to "medium"
- **THEN** the card SHALL display a right-aligned yellow badge with the label "Medium"
- **THEN** the card SHALL use the default card background (no yellow tint)

#### Scenario: Low priority card shows green badge
- **WHEN** a task card has priority set to "low"
- **THEN** the card SHALL display a right-aligned green badge with the label "Low"
- **THEN** the card SHALL use the default card background (no green tint)

#### Scenario: Unprioritized card has default background and no badge
- **WHEN** a task card has no priority set
- **THEN** the card SHALL display the default card background with no color tint
- **THEN** the card SHALL NOT display a priority badge
