### Requirement: Settings page route
The system SHALL provide a `/settings` route accessible to authenticated users that displays their profile information.

#### Scenario: Settings page is accessible to authenticated users
- **WHEN** an authenticated user navigates to `/settings`
- **THEN** the system SHALL render the settings page within the dashboard layout

#### Scenario: Unauthenticated access is blocked
- **WHEN** an unauthenticated visitor navigates to `/settings`
- **THEN** the proxy SHALL redirect them to `/`

### Requirement: Profile information display
The settings page SHALL display the authenticated user's profile information in a read-only view.

#### Scenario: User email is displayed
- **WHEN** the settings page is rendered
- **THEN** it SHALL display the authenticated user's email address

#### Scenario: Account creation date is displayed
- **WHEN** the settings page is rendered
- **THEN** it SHALL display the date the user account was created, if available

### Requirement: Settings page navigation
The settings page SHALL be reachable from the user profile menu and integrate into the existing dashboard navigation.

#### Scenario: Settings link in profile menu navigates correctly
- **WHEN** the user clicks "Settings" in the profile dropdown
- **THEN** the browser SHALL navigate to `/settings` and the page SHALL render the profile information
