# values-selection Specification

## ADDED Requirements

### Requirement: Curated values list
The built-in values SHALL exclude entries that are vague, duplicate another value in meaning, or are unsuited to a working profile, and SHALL include strong working-life values currently missing. Category membership rules and the five-value limit are unchanged.

#### Scenario: Weak values removed
- **WHEN** the user browses the values
- **THEN** "Comfort", "Spontaneity", "Hospitality", "Cooperation", "Knowledge", "Balance", "Success", "Recognition", "Drive", "Choice" and "Fairness in pay" are not offered

#### Scenario: Strong values added
- **WHEN** the user browses the values
- **THEN** "Psychological safety", "Intellectual honesty", "Rigour", "Sustainable pace" and "Learning in public" are offered, each with a description

### Requirement: Removed words in saved profiles
A saved profile containing a word that is no longer built in SHALL still load, keeping that word as the user's own custom entry.

#### Scenario: Load old profile
- **WHEN** a profile selecting "Comfort" is loaded
- **THEN** it loads without error and "Comfort" appears as a custom value
