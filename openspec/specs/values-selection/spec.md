# values-selection Specification

## Purpose

Lets users choose, once and from a short list, the personal and professional values that describe them, from curated common values or by adding their own.

## Requirements

### Requirement: Values are presented for selection
The system SHALL present common values, grouped by category as described by the values-grouping capability, that the user can select from, none selected initially.

#### Scenario: Values shown
- **WHEN** the user reaches the values page
- **THEN** at least 100 common values are displayed, none selected

### Requirement: Values can be toggled
The system SHALL let the user select and deselect any value, and SHALL visibly distinguish selected values from unselected ones.

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
The system SHALL let the user add their own values, which appear under Custom as selected.

#### Scenario: Add custom value
- **WHEN** the user enters "Craftsmanship" and confirms
- **THEN** it is added and selected

#### Scenario: Duplicate or empty entry rejected
- **WHEN** the user enters an empty value, or one matching an existing value ignoring case and surrounding whitespace
- **THEN** no new value is added; for a duplicate the existing value is selected instead

#### Scenario: Remove custom value
- **WHEN** the user removes a custom value
- **THEN** it disappears from the page and the selection

### Requirement: Values step requires a selection
The system SHALL require at least one selected value before the user can continue past the values page.

#### Scenario: Continue blocked
- **WHEN** no values are selected
- **THEN** the continue action is disabled with an explanation

### Requirement: Single values list
The values page SHALL have one selection and SHALL NOT offer the Previous experience and Desired experience options.

#### Scenario: No option switch
- **WHEN** the user opens the values page
- **THEN** no experience option switch is shown, and the instructions do not mention an "other option"

### Requirement: Limit of five values
The user SHALL be able to select at most 5 values, including custom values, with the feedback described by the selection-limits capability. The instructions on the values page SHALL say to select up to 5 values.

#### Scenario: Limit reached
- **WHEN** the user has selected 5 values
- **THEN** the other values cannot be selected, the Add control is disabled, and the message says to deselect a value to choose another

#### Scenario: Custom value counts
- **WHEN** the user has 4 values selected and adds a custom value
- **THEN** it is selected and the count reads "5 of 5 selected"

#### Scenario: Instructions state the limit
- **WHEN** the user reads the instructions on the values page
- **THEN** they say to select up to 5 values

### Requirement: Over-limit selections block progress
If more than 5 values are selected (for example after loading a file), the user SHALL NOT be able to move to a later page until the selection is within the limit, and the message SHALL say how many values to deselect.

#### Scenario: Loaded file with seven values
- **WHEN** a loaded profile has 7 values
- **THEN** the values page opens with a message asking to deselect 2 values, and Continue is unavailable until 5 or fewer remain
