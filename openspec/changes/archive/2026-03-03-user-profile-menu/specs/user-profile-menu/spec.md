## ADDED Requirements

### Requirement: User profile menu button
The system SHALL display a user profile button in the top-right corner of the dashboard header that reveals the authenticated user's identity.

#### Scenario: Button is visible on all dashboard pages
- **WHEN** any dashboard route is visited by an authenticated user
- **THEN** the header SHALL display a profile button in the right-aligned action slot containing the user's initial or avatar

#### Scenario: Button shows user initial
- **WHEN** the profile button is rendered
- **THEN** it SHALL display the first character of the authenticated user's email as a fallback avatar

### Requirement: Profile dropdown menu
The system SHALL display a dropdown menu when the user activates the profile button, containing identity information and action items.

#### Scenario: Dropdown opens on click
- **WHEN** the user clicks the profile button
- **THEN** a dropdown menu SHALL appear below the button containing the user's email, a "Settings" option, and a "Logout" option

#### Scenario: Dropdown closes on outside click
- **WHEN** the dropdown is open and the user clicks outside of it
- **THEN** the dropdown SHALL close without triggering any action

#### Scenario: Dropdown is keyboard accessible
- **WHEN** the user opens the dropdown and presses the arrow keys
- **THEN** focus SHALL move between the menu items; pressing Enter SHALL activate the focused item

### Requirement: Logout action
The system SHALL allow the user to end their session from the profile menu.

#### Scenario: Logout clears session and redirects
- **WHEN** the user selects "Logout" from the profile dropdown
- **THEN** the system SHALL call `POST /api/auth/logout`, clear the `auth-token` cookie, and redirect the browser to `/`

#### Scenario: Logout shows loading state
- **WHEN** the logout request is in flight
- **THEN** the "Logout" button SHALL be disabled and show a loading indicator

### Requirement: Settings navigation
The system SHALL navigate the user to the settings page when they select "Settings" from the profile menu.

#### Scenario: Settings item navigates to /settings
- **WHEN** the user selects "Settings" from the profile dropdown
- **THEN** the browser SHALL navigate to `/settings` and the dropdown SHALL close
