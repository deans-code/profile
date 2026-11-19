# Spec Delta

## MODIFIED Requirements

### Requirement: Limit of five values
The user SHALL select between 5 and 10 values, including custom values, with the feedback described by the selection-limits capability. The instructions on the values page SHALL NOT repeat the range; the page's status line shows the count against the limit.

#### Scenario: Limit reached
- **WHEN** the user has selected 10 values
- **THEN** the other values cannot be selected, the Add control is disabled, and the message says to deselect a value to choose another

#### Scenario: Custom value counts
- **WHEN** the user has 9 values selected and adds a custom value
- **THEN** it is selected and the count reads "10 of 10 selected"

#### Scenario: Instructions state the range
- **WHEN** the user reads the instructions on the values page
- **THEN** they contain no "Select 5 to 10 values" sentence, and the status line reads "n of 10 selected"
