# technical-skills-catalog Specification

## ADDED Requirements

### Requirement: Curated technical, engineering and interpersonal lists
The technical development, engineering and interpersonal pages SHALL drop entries that are obscure, redundant with a neighbouring entry, or too narrow to describe a skill, and SHALL add current, widely used ones. No word SHALL appear on two pages, and every offered word SHALL have a description.

#### Scenario: Technical
- **WHEN** the user browses technical development
- **THEN** "Expo", "Cloud GPU instances" and "Parquet and data formats" are not offered, and "Deno and Bun", "Playwright", "Vite", "Docker Compose", "Supabase" and "Cloudflare" are

#### Scenario: Engineering
- **WHEN** the user browses engineering
- **THEN** "Exploratory testing" is not offered, and "Architecture decision records", "Platform engineering", "Supply chain security", "Dependency management", "Legacy system modernisation", "Database migrations" and "Cost optimisation (FinOps)" are

#### Scenario: Interpersonal
- **WHEN** the user browses interpersonal
- **THEN** "Cultural awareness", "Commercial awareness" and "Self-motivation" are not offered, and "Psychological safety", "Pair and mob programming", "Onboarding new team members", "Knowledge sharing" and "Asynchronous communication" are
