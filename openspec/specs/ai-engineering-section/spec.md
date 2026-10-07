# ai-engineering-section Specification

## Purpose

Provides a dedicated AI engineering page for capturing experience with AI-assisted development tools, methods, providers and models.

## Requirements

### Requirement: AI engineering page
The app SHALL provide an "AI engineering" page as its own step and tab, after the interpersonal page and before the profile card, with its own distinct colour. It SHALL behave like the other skill pages: categorised cards, a filter, custom entries, no selection limit, and previous and desired experience options.

#### Scenario: Page reachable
- **WHEN** the user has completed the earlier pages
- **THEN** an "AI engineering" tab is available and opens the page

### Requirement: Catalog categories
The AI engineering catalog SHALL contain at least ten categories covering, at least: approaches, frameworks and methodologies, terminal (TUI or CLI) tools, desktop apps and AI-first editors, IDE and code-editor plugins, closed-model providers, inference providers and gateways, open-weight models, local runtimes and tools, local hardware and optimisation, and agent extensibility.

#### Scenario: Categories present
- **WHEN** the user views the AI engineering page
- **THEN** a card exists for each required topic area, each with at least four entries

### Requirement: Required named entries
The catalog SHALL include at least: the approaches "Vibe coding" and "Spec-driven development"; the frameworks "Superpowers" and "OpenSpec"; the open-source tool "OpenCode"; the inference providers "Fireworks AI" and "OpenRouter"; the local tools "Ollama", "llama.cpp" and "LM Studio"; and an entry for running open-weight models on local hardware.

#### Scenario: Named entries selectable
- **WHEN** the user filters the AI engineering page for "OpenRouter"
- **THEN** "OpenRouter" is shown under an inference providers category and can be selected

#### Scenario: Local hardware
- **WHEN** the user views the local hardware category
- **THEN** it includes an entry for running open-weight models on local hardware

### Requirement: Descriptions
Every built-in AI engineering entry SHALL have a plain-language description of one or two sentences, shown by right-click (and the existing keyboard and touch alternatives). Entries SHALL be unique across the categories of the page.

#### Scenario: Describe an entry
- **WHEN** the user right-clicks "Ollama"
- **THEN** a panel named "Description of Ollama" shows its description without changing the selection

### Requirement: Technical and AI catalogs do not overlap
No entry SHALL appear in both the technical development catalog and the AI engineering catalog.

#### Scenario: No duplicates
- **WHEN** the two catalogs are compared
- **THEN** no name, ignoring case, is in both
