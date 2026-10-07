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
