# source-citation-integrity Specification

## Purpose

Ensures a source is shown on a tab only when an option there cites it, and that no source file is left empty.

## Requirements

### Requirement: A source is shown only if an option cites it
The system SHALL show a source in a tab's Sources section only if at least one option on that tab cites it, and SHALL cite on an option only sources listed on its tab.

#### Scenario: Unused source
- **WHEN** a source is registered for a tab but no option on that tab cites it
- **THEN** the automated tests fail until the source is removed from that tab or an option cites it

#### Scenario: Sources section matches citations
- **WHEN** a tab is rendered
- **THEN** the sources shown in its Sources section are exactly the sources that at least one of its options cites, in the tab's order

### Requirement: No orphaned source files
The system SHALL NOT keep a per-source data file that contributes no option.

#### Scenario: Empty source file
- **WHEN** a source data file names no option
- **THEN** the tests fail
