# Spec Delta

## Purpose

Lets users choose the personal and professional values that describe them, from a curated cloud of common values or by adding their own.

## ADDED Requirements

### Requirement: Values cloud presents common values
The system SHALL present a cloud of common values (for example Integrity, Curiosity, Collaboration, Autonomy) that the user can select from.

#### Scenario: Cloud is shown
- **WHEN** the user reaches the values step
- **THEN** a cloud of at least 40 common values is displayed, none selected initially

### Requirement: Values can be toggled
The system SHALL let the user select and deselect any value in the cloud, and SHALL visibly distinguish selected values from unselected ones.

#### Scenario: Select a value
- **WHEN** the user activates an unselected value
- **THEN** the value becomes selected and the selected count updates

#### Scenario: Deselect a value
- **WHEN** the user activates a selected value
- **THEN** the value becomes unselected

#### Scenario: Keyboard operation
- **WHEN** the user focuses a value and presses Enter or Space
- **THEN** its selection toggles

### Requirement: Custom values can be added
The system SHALL let the user add their own values, which appear in the cloud as selected.

#### Scenario: Add custom value
- **WHEN** the user enters "Craftsmanship" and confirms
- **THEN** it is added to the cloud and selected

#### Scenario: Duplicate or empty entry rejected
- **WHEN** the user enters an empty value, or one matching an existing value ignoring case and surrounding whitespace
- **THEN** no new value is added; for a duplicate the existing value is selected instead

#### Scenario: Remove custom value
- **WHEN** the user removes a custom value
- **THEN** it disappears from the cloud and the selection

### Requirement: Values step requires a selection
The system SHALL require at least one selected value before the user can continue past the values step.

#### Scenario: Continue blocked
- **WHEN** no values are selected
- **THEN** the continue action is disabled with an explanation
