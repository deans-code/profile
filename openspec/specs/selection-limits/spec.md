# selection-limits Specification

## Purpose

Keeps the values list focused by capping how many values a user can select, tells them clearly when the cap is reached, and leaves skill pages unlimited.

## Requirements

### Requirement: Five values
The system SHALL allow at most 5 selected values, including custom values. Skill pages (technical development, engineering, interpersonal and AI engineering) SHALL have no limit, in either experience option.

#### Scenario: Limit reached
- **WHEN** the user has selected 5 values and activates an unselected value
- **THEN** the value is not selected and the selection stays at 5

#### Scenario: Skills are not limited
- **WHEN** the user has selected 5 values
- **THEN** they can select any number of skills on each skill page

#### Scenario: Custom entries count
- **WHEN** 4 values are selected and the user adds a custom value, then tries to add another
- **THEN** the first is added as the fifth selection and the second is rejected

### Requirement: Deselecting frees a slot
The system SHALL allow a selected value to be deselected at any time, after which another value can be selected.

#### Scenario: Swap a value
- **WHEN** the limit is reached, the user deselects one value and selects another
- **THEN** the new value is selected and the count remains 5

### Requirement: Count and limit feedback
The values page SHALL show how many values are selected out of 5, and when the limit is reached SHALL state that it has been reached and how to free a slot. Values that cannot be selected SHALL be visibly and programmatically marked as unavailable while remaining focusable. Skill pages SHALL show a plain "n selected" count with no limit wording.

#### Scenario: Count shown
- **WHEN** the user has selected 3 values
- **THEN** the page shows "3 of 5 selected"

#### Scenario: Limit message
- **WHEN** the user reaches 5 selections
- **THEN** a message says the limit is reached and that deselecting a value allows another choice, and it is announced to assistive technology

#### Scenario: Unavailable values
- **WHEN** the limit is reached
- **THEN** unselected values appear dimmed and are exposed as disabled-like (aria-disabled), while selected values remain active

### Requirement: Adding custom values at the limit
The system SHALL disable the add-your-own control with an explanation while the values page is at its limit, and SHALL NOT discard the text the user has typed.

#### Scenario: Add disabled
- **WHEN** the values page is at its limit and the user has typed a custom value
- **THEN** the Add control is disabled, the limit message is shown, and the typed text remains

### Requirement: Descriptions remain available at the limit
Values that cannot be selected because of the limit SHALL still open their descriptions.

#### Scenario: Description at limit
- **WHEN** the limit is reached and the user right-clicks an unselected value
- **THEN** its description opens and the selection is unchanged

### Requirement: Limit applies to existing selections
A values selection holding more than 5 values (for example a loaded profile) SHALL allow deselecting but not selecting, and the user SHALL NOT be able to continue from the values page until it holds 5 or fewer, with a message stating how many to remove.

#### Scenario: Over the limit
- **WHEN** the values page holds 8 selected values
- **THEN** the count shows "8 of 5 selected", continue is disabled, and the message says to deselect 3 words
