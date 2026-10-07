# skills-selection Specification

## Purpose

Lets users build lists of technical development, engineering, interpersonal and AI engineering skills by choosing from comprehensive curated catalogs or adding their own.

## Requirements

### Requirement: Four skill pages with curated catalogs
The system SHALL provide four separate skill pages (technical development, engineering, interpersonal, AI engineering), each offering a curated catalog grouped by category. The AI engineering catalog is specified by the ai-engineering-section capability and the technical catalog's focus by technical-skills-catalog.

#### Scenario: Catalog content
- **WHEN** the user reaches a skill page
- **THEN** skills are shown grouped under category headings, e.g. Languages and Data for technical development; Architecture and Testing for engineering; Communication and Leadership for interpersonal; Approaches and Local runtimes and tools for AI engineering

#### Scenario: Pages are distinct
- **WHEN** the user views any two skill pages
- **THEN** no skill appears in both catalogs

### Requirement: Catalogs are comprehensive yet relevant
The system SHALL offer at least 40 skills on each skill page, limited to skills that are broadly recognized in professional software work.

#### Scenario: Catalog size
- **WHEN** a skill page's catalog is displayed
- **THEN** it contains at least 40 skills across at least 5 categories

### Requirement: Skills can be selected and filtered
The system SHALL let the user select and deselect skills, and filter a page's catalog by text.

#### Scenario: Select skill
- **WHEN** the user activates an unselected skill
- **THEN** it becomes selected for the active experience option and the page's selected count updates

#### Scenario: Filter
- **WHEN** the user types "test" in the filter
- **THEN** only skills whose names contain "test" (case-insensitive) are shown, and existing selections are retained

### Requirement: Custom skills can be added
The system SHALL let the user add custom skills to each skill page, under a "Custom" category and selected.

#### Scenario: Add custom skill
- **WHEN** the user adds "Rust" to the technical development page
- **THEN** it appears selected under Custom on that page only

#### Scenario: Duplicate or empty entry rejected
- **WHEN** the entry is empty or matches an existing skill on that page ignoring case and whitespace
- **THEN** no duplicate is added; an existing match is selected instead

### Requirement: Each skill page requires a selection
The system SHALL require at least one selected skill, in either experience option, on each skill page before the user can reach the profile.

#### Scenario: Profile gated
- **WHEN** any of the four skill pages has no selected skills in either option
- **THEN** the user cannot reach the profile and is told which pages are missing selections

#### Scenario: Selections preserved on navigation
- **WHEN** the user navigates back to an earlier step
- **THEN** all previous selections are retained
