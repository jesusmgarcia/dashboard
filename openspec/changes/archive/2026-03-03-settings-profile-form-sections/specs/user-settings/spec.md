## MODIFIED Requirements

### Requirement: Extended profile fields
The settings page SHALL organise the nine editable fields into two named sections within the right panel of the card: an "Information" section containing full name, email address, phone number, and user role; and an "Address" section containing country, state/region, city, ZIP/postal code, and address. Each section SHALL display its fields in a 2-column grid with a visible section header above it.

#### Scenario: Information section is visible with its header and fields
- **WHEN** the settings page is rendered
- **THEN** the right panel SHALL display an "Information" section header followed by a 2-column grid containing: Full Name, Email Address, Phone Number, and User Role

#### Scenario: Address section is visible with its header and fields
- **WHEN** the settings page is rendered
- **THEN** the right panel SHALL display an "Address" section header followed by a 2-column grid containing: Country, State/Region, City, ZIP/Postal Code, and Address (spanning full width)

#### Scenario: Profile data is saved to MongoDB
- **WHEN** the user submits the form with valid data
- **THEN** the server action SHALL update the user's `profile` subdocument in MongoDB with all submitted field values

#### Scenario: Email field retains current authenticated email by default
- **WHEN** the settings page is rendered
- **THEN** the email field SHALL be pre-populated with the authenticated user's current email address
