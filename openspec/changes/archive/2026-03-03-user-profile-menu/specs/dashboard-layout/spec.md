## MODIFIED Requirements

### Requirement: Header bar
The header SHALL display the current page title and a user profile menu in the right-aligned action slot.

#### Scenario: Header renders page title
- **WHEN** the dashboard layout is rendered
- **THEN** the header SHALL display a title identifying the current section

#### Scenario: Header renders user profile menu
- **WHEN** the dashboard layout is rendered for an authenticated user
- **THEN** the header SHALL include a right-aligned `UserProfileMenu` component showing the user's identity and providing access to Settings and Logout actions
