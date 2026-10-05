# Spec Delta

## Purpose

Lets users build lists of technical development, engineering and interpersonal skills by choosing from comprehensive curated catalogs or adding their own.

## ADDED Requirements

### Requirement: Three skill sections with curated catalogs
The system SHALL provide three separate skill sections (technical development, engineering, interpersonal), each offering a curated catalog grouped by category.

#### Scenario: Catalog content
- **WHEN** the user reaches a skill section
- **THEN** skills are shown grouped under category headings, e.g. Languages and Frameworks for technical development; Architecture and Testing for engineering; Communication and Leadership for interpersonal

#### Scenario: Sections are distinct
- **WHEN** the user views any two sections
- **THEN** no skill appears in both catalogs

### Requirement: Catalogs are comprehensive yet relevant
The system SHALL offer at least 40 skills per section, limited to skills that are broadly recognized in professional software work.

#### Scenario: Catalog size
- **WHEN** a section's catalog is displayed
- **THEN** it contains at least 40 skills across at least 5 categories

### Requirement: Skills can be selected and filtered
The system SHALL let the user select and deselect skills, and filter a section's catalog by text.

#### Scenario: Select skill
- **WHEN** the user activates an unselected skill
- **THEN** it becomes selected and the section's selected count updates

#### Scenario: Filter
- **WHEN** the user types "test" in the filter
- **THEN** only skills whose names contain "test" (case-insensitive) are shown, and existing selections are retained

### Requirement: Custom skills can be added
The system SHALL let the user add custom skills to each section, under a "Custom" category and selected.

#### Scenario: Add custom skill
- **WHEN** the user adds "Rust" to the technical development section
- **THEN** it appears selected under Custom in that section only

#### Scenario: Duplicate or empty entry rejected
- **WHEN** the entry is empty or matches an existing skill in that section ignoring case and whitespace
- **THEN** no duplicate is added; an existing match is selected instead

### Requirement: Each skill section requires a selection
The system SHALL require at least one selected skill in each section before the user can proceed to scoring.

#### Scenario: Scoring gated
- **WHEN** any of the three skill sections has no selected skills
- **THEN** the user cannot proceed to scoring and is told which sections are missing selections

#### Scenario: Selections preserved on navigation
- **WHEN** the user navigates back to an earlier step
- **THEN** all previous selections are retained
