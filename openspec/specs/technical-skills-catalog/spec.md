# technical-skills-catalog Specification

## Purpose

Keeps the Technical development page about hands-on software and data skills, which AI engineering work builds on.

## Requirements

### Requirement: Hands-on technical focus
The Technical development page SHALL list hands-on technical skills (languages, web, backend and APIs, data and storage, cloud and infrastructure, containers and compute, tooling) and SHALL NOT include AI tools, models, providers, assistants or AI-assisted methods, which belong on the AI engineering page. The former "AI and machine learning" category SHALL be removed from it.

#### Scenario: No AI category
- **WHEN** the user views the Technical development page
- **THEN** there is no "AI and machine learning" card and no entry for an AI tool, model or provider

### Requirement: Suited to an AI engineering team
The Technical development catalog SHALL include hands-on skills an AI engineering team commonly relies on, including at least: Python data tooling, notebooks, vector or search databases, data pipelines, GPU and CUDA computing, containers and orchestration, and observability.

#### Scenario: Team-relevant skills present
- **WHEN** the user filters the Technical development page for "GPU"
- **THEN** at least one matching entry is shown and can be selected

### Requirement: Existing entries keep their names
Technical entries that remain in the catalog SHALL keep their exact names, so previously saved profiles load them as built-in entries.

#### Scenario: Saved profile
- **WHEN** a saved profile lists "TypeScript" under technical skills
- **THEN** it loads as the built-in "TypeScript"

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
