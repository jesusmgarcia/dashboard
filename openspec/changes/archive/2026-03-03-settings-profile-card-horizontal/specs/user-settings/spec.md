## MODIFIED Requirements

### Requirement: Profile information display
The settings page SHALL display the authenticated user's profile information in an editable card with a horizontal layout: a left panel containing the profile avatar, name, and email, and a right panel containing all editable form fields arranged in a 2-column grid.

#### Scenario: Profile card is rendered with horizontal layout on wide viewports
- **WHEN** the settings page is rendered on a viewport wider than the `md` breakpoint
- **THEN** the system SHALL display the card with the avatar panel on the left and the form fields on the right

#### Scenario: Profile card collapses to vertical layout on small viewports
- **WHEN** the settings page is rendered on a viewport narrower than the `md` breakpoint
- **THEN** the system SHALL display the card with the avatar panel stacked above the form fields

#### Scenario: Avatar shows user initials
- **WHEN** the settings page is rendered
- **THEN** the avatar SHALL display the user's initials derived from their full name, or a default placeholder if no name is set

#### Scenario: All profile fields are pre-populated
- **WHEN** the settings page is rendered
- **THEN** each editable field SHALL be pre-populated with the current value stored in the user's profile (full name, email address, phone number, country, state/region, city, address, zip/postal code, user role)

#### Scenario: User can edit profile fields
- **WHEN** the user modifies one or more fields and submits the form
- **THEN** the system SHALL persist the updated values to the user's MongoDB document and confirm success

#### Scenario: Save action shows loading state
- **WHEN** the user submits the profile form
- **THEN** the save button SHALL display a loading indicator until the server action completes

### Requirement: Profile photo section
The settings card SHALL display the circular profile photo in the left panel of the horizontal card layout, alongside the user's name and email.

#### Scenario: Avatar is displayed in the left panel
- **WHEN** the settings page is rendered on a wide viewport
- **THEN** the avatar SHALL appear in the left panel, centered vertically and horizontally within that panel

#### Scenario: Avatar is displayed with initials
- **WHEN** the user has a full name stored
- **THEN** the avatar SHALL render the first letter of the first name and first letter of the last name in a styled circle

#### Scenario: Avatar displays placeholder when no name is set
- **WHEN** the user has no full name stored
- **THEN** the avatar SHALL render a generic person icon or the first character of the email address

### Requirement: Extended profile fields
The settings page SHALL arrange all nine editable fields in a 2-column grid on the right side of the card: full name and email address in the first row, phone number and user role in the second row, country and state/region in the third row, city and ZIP/postal code in the fourth row, and address spanning the full width in the fifth row.

#### Scenario: All fields are visible and labeled in a 2-column grid
- **WHEN** the settings page is rendered on a wide viewport
- **THEN** each of the nine profile fields SHALL be visible with a clear label, arranged in a 2-column grid within the right panel

#### Scenario: Address field spans full width
- **WHEN** the settings page is rendered
- **THEN** the address field SHALL span both columns of the grid

#### Scenario: Profile data is saved to MongoDB
- **WHEN** the user submits the form with valid data
- **THEN** the server action SHALL update the user's `profile` subdocument in MongoDB with all submitted field values

#### Scenario: Email field retains current authenticated email by default
- **WHEN** the settings page is rendered
- **THEN** the email field SHALL be pre-populated with the authenticated user's current email address
