# Spec Delta

## Purpose

Values are chosen once, in a short list.

## ADDED Requirements

### Requirement: Single values list
The values page SHALL have one selection and SHALL NOT offer the Previous experience and Desired experience options.

#### Scenario: No option switch
- **WHEN** the user opens the values page
- **THEN** no experience option switch is shown, and the instructions do not mention an "other option"

### Requirement: Limit of five values
The user SHALL be able to select at most 5 values, including custom values. The count SHALL read "n of 5 selected", and at the limit the remaining values SHALL be unavailable with a message explaining how to free a slot. Descriptions SHALL still open for unavailable values. Skill pages SHALL remain unlimited.

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
