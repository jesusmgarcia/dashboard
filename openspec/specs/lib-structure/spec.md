### Requirement: Shared lib modules live in app/lib
All shared server utilities, models, and helpers SHALL reside under `app/lib/` and be imported using the `@/app/lib/...` path alias.

#### Scenario: Module imported from correct location
- **WHEN** any file imports a shared utility, model, or helper
- **THEN** the import path SHALL start with `@/app/lib/`

#### Scenario: No lib directory remains at root
- **WHEN** the project structure is inspected
- **THEN** there SHALL be no `lib/` directory at the repository root
