## MODIFIED Requirements

### Requirement: Values step requires a selection
The system SHALL require at least 5 selected values before the user can continue past the values page, and SHALL explain how many more are needed.

#### Scenario: Continue blocked
- **WHEN** fewer than 5 values are selected
- **THEN** the continue action is disabled with an explanation of how many more to choose

### Requirement: Limit of five values
The user SHALL select between 5 and 10 values, including custom values, with the feedback described by the selection-limits capability. The instructions on the values page SHALL say to select 5 to 10 values.

#### Scenario: Limit reached
- **WHEN** the user has selected 10 values
- **THEN** the other values cannot be selected, the Add control is disabled, and the message says to deselect a value to choose another

#### Scenario: Custom value counts
- **WHEN** the user has 9 values selected and adds a custom value
- **THEN** it is selected and the count reads "10 of 10 selected"

#### Scenario: Instructions state the range
- **WHEN** the user reads the instructions on the values page
- **THEN** they say to select 5 to 10 values

### Requirement: Over-limit selections block progress
If more than 10 values are selected (for example after loading a file), the user SHALL NOT be able to move to a later page until the selection is within the limit, and the message SHALL say how many values to deselect.

#### Scenario: Loaded file with twelve values
- **WHEN** a loaded profile has 12 values
- **THEN** the values page opens with a message asking to deselect 2 values, and Continue is unavailable until 10 or fewer remain
