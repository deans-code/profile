# Spec Delta

## ADDED Requirements

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
