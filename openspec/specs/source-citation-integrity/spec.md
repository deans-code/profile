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

### Requirement: Character strengths cited to a UK-based profiling organisation
The system SHALL offer the 24 Strengthscope strengths as built-in values, cite Strengthscope Limited with a link to the page they were read from, and SHALL NOT cite or offer the VIA Institute on Character as a source.

#### Scenario: Strengthscope strengths offered
- **WHEN** the built-in values are inspected
- **THEN** all 24 strengths (Courage, Emotional control, Enthusiasm, Optimism, Resilience, Self-confidence, Collaboration, Compassion, Developing others, Empathy, Leading, Persuasiveness, Relationship building, Common sense, Creativity, Critical thinking, Detail orientation, Strategic mindedness, Decisiveness, Efficiency, Flexibility, Initiative, Results-focus, Self-improvement) are present, each with a non-empty description and each citing Strengthscope

#### Scenario: VIA no longer cited
- **WHEN** the sources shown for the values tab and the README source list are inspected
- **THEN** none mentions VIA or viacharacter.org

#### Scenario: Descriptions survive the source change
- **WHEN** any built-in value formerly described by VIA, such as "Honesty", is shown
- **THEN** it still has a non-empty description

### Requirement: Profiles saved with VIA-only strengths still load
A saved profile containing a value that was offered only by VIA SHALL load without error, with that value restored as a custom value.

#### Scenario: Old VIA value
- **WHEN** a saved profile lists "Humor" as a value
- **THEN** it loads and "Humor" appears selected under Custom
