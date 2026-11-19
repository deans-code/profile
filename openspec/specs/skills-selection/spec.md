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

### Requirement: Skill pages do not require a selection
The system SHALL NOT require any selected skill on a skill page. The user MAY reach the profile with no skills selected, in either experience option, on any or all of the four skill pages.

#### Scenario: Profile gated
- **WHEN** any of the four skill pages has no selected skills in either option and the values are valid
- **THEN** the user can still reach the profile and is not told that selections are missing

#### Scenario: Selections preserved on navigation
- **WHEN** the user navigates back to an earlier step
- **THEN** all previous selections are retained

### Requirement: Adding a custom skill reveals it
On every skills tab, when the user adds a new custom skill, the system SHALL scroll the page so the Custom card, including the new skill, is in view and not hidden behind the pinned bar, using smooth scrolling unless the user prefers reduced motion, in which case the scroll SHALL be instant. If the skills filter would hide the new skill, the system SHALL clear the filter. No scroll SHALL happen when nothing new was added.

#### Scenario: New custom skill scrolled into view
- **WHEN** the user is on the technical skills tab, scrolled to the top, types "Zig" and presses Add
- **THEN** the page scrolls to the Custom card and "Zig" is visible there, selected

#### Scenario: Every skills tab
- **WHEN** the user adds a custom skill on the engineering, interpersonal or AI engineering tab
- **THEN** the page scrolls to that tab's Custom card

#### Scenario: Switching tabs does not scroll to Custom
- **WHEN** the user switches between the previous and desired experience options, or between tabs, with custom skills already present
- **THEN** the page does not scroll to the Custom card
