## ADDED Requirements

### Requirement: Shared components live in app/components
All shared UI components SHALL reside under `app/components/` and be imported using the `@/app/components/...` path alias.

#### Scenario: Component imported from correct location
- **WHEN** a file imports a shared UI component
- **THEN** the import path SHALL start with `@/app/components/`

#### Scenario: No components remain at root
- **WHEN** the project structure is inspected
- **THEN** there SHALL be no `components/` directory at the repository root
