## ADDED Requirements

### Requirement: Entries guided by published surveys
The Technical development catalog SHALL include a technology when it has at least 10% usage in a ranked list in the Stack Overflow Developer Survey 2026 technology data, or is named in the JetBrains Developer Ecosystem 2026 tools and trends report or the State of Cloud Native Development Q1 2026 report, unless it is already offered on any page. Every added entry SHALL have a description, and no entry SHALL appear on two pages.

#### Scenario: Survey-ranked entries present
- **WHEN** the user browses Technical development
- **THEN** "PowerShell", "jQuery", "Express", "ASP.NET Core", "MariaDB", "OpenSearch", "Firebase", "Vercel", "Podman", "Datadog", "npm" and "pnpm" are offered

#### Scenario: Entry already on another page
- **WHEN** a surveyed technology is already on another page, such as "Feature flags" on Engineering
- **THEN** it is not added to Technical development

### Requirement: Testing and code quality tools category
The Technical development page SHALL have a "Testing and code quality tools" category containing at least "Playwright", "Jest", "Vitest", "pytest", "JUnit", "Postman", "ESLint" and "SonarQube". "Playwright" SHALL appear only in this category.

#### Scenario: Category present
- **WHEN** the user views Technical development
- **THEN** a "Testing and code quality tools" card lists those entries and "Playwright" is not in "Web and frontend"

### Requirement: Editors, IDEs and package managers category
The Technical development page SHALL have an "Editors, IDEs and package managers" category containing at least "Visual Studio Code", "Visual Studio", "IntelliJ IDEA", "Vim and Neovim", "npm", "pnpm", "pip and uv", "Homebrew" and "Make and Makefiles". AI-first editors SHALL remain on the AI engineering page.

#### Scenario: Category present
- **WHEN** the user views Technical development
- **THEN** an "Editors, IDEs and package managers" card lists those entries and does not list "Cursor"

### Requirement: Cloud native entries from the CNCF report
The Technical development "Cloud and DevOps" category SHALL include "Service mesh" and "Podman" alongside the existing Kubernetes and container entries.

#### Scenario: Cloud native
- **WHEN** the user filters Technical development for "mesh"
- **THEN** "Service mesh" is shown and can be selected

### Requirement: Names kept for saved profiles
Every technical entry name that existed before this change SHALL still be offered unchanged, including when its category changes.

#### Scenario: Saved profile with Playwright
- **WHEN** a saved profile lists "Playwright" under technical skills
- **THEN** it loads as the built-in "Playwright"
