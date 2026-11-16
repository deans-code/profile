# Spec Delta

## ADDED Requirements

### Requirement: Broader values on the values page
The values page SHALL offer at least 20 broader values, each covering at least 3 individual values and placed, like broader skill terms, first inside the category card that holds most of the values it covers, with the same dashed border, "Broad" label and explanatory note. A broader value SHALL be selectable, SHALL count toward the limit of 5 to 10 values, SHALL appear in the profile and export, and SHALL NOT select the values it covers.

#### Scenario: Placed in its category
- **WHEN** the user opens the values page
- **THEN** "Honesty and ethics" is among the first options in "Personal character" and is labelled "Broad", and Honesty and Integrity are still listed in that card

#### Scenario: Counts toward the limit
- **WHEN** the user has selected 10 values including one broader value
- **THEN** no further value can be selected until one is deselected, and the status shows 10 of 10

#### Scenario: Independent of covered values
- **WHEN** the user selects "Honesty and ethics" and "Honesty"
- **THEN** both are kept and counted, and deselecting one leaves the other selected

#### Scenario: Definition
- **WHEN** the user opens the definition of "Lifelong learning"
- **THEN** it explains the term and names the values it covers, such as Curiosity

#### Scenario: Load
- **WHEN** a saved profile lists "honesty and ethics" under values
- **THEN** it loads as the built-in "Honesty and ethics", not as a custom value

### Requirement: Every category has broader terms
Every category card on the values page and the four skills pages SHALL contain at least two broader terms, or one if the category lists fewer than 8 options, each covering at least 3 of the options on that page. A broader term MAY cover options that another broader term also covers.

#### Scenario: Previously empty categories
- **WHEN** the user opens the technical page
- **THEN** "Editors and IDEs" and "Game development and graphics" each show at least two broader terms first in their cards, and their options are still listed

#### Scenario: Coverage check
- **WHEN** the catalog is checked
- **THEN** every category has the required number of broader terms and every covered name exists in the same page's catalog

### Requirement: Broader term names are unique across values and skills
A broader term name SHALL NOT match, ignoring case, any value, skill or other broader term on any page.

#### Scenario: Duplicate name
- **WHEN** the catalog is checked
- **THEN** no broader value or skill term shares a name with any other built-in option or term
