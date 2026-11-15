## MODIFIED Requirements

### Requirement: Expanded set of values
The system SHALL offer at least 100 built-in values across at least 8 categories, all relating to professional work, with no value appearing in more than one category, and every built-in value SHALL have a description. There SHALL be no "Wellbeing and a good life" category, and no built-in value whose only context is personal wellbeing, romance, leisure or religion.

#### Scenario: Catalog size
- **WHEN** the built-in values are inspected
- **THEN** there are at least 100, in at least 8 categories, each with a non-empty description and no duplicates ignoring case

#### Scenario: Wellbeing group removed
- **WHEN** the user browses the values
- **THEN** no "Wellbeing and a good life" heading is shown, and "Love", "Zest", "Spirituality", "Hedonism", "Salvation", "Pleasure", "Life satisfaction" and "Leisure" are not offered

#### Scenario: Earlier values retained
- **WHEN** a profile saved before this change contains built-in values that remain in the catalog
- **THEN** each still loads as the same built-in value
