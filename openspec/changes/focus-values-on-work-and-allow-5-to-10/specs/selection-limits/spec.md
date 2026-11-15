## MODIFIED Requirements

### Requirement: Five values
The system SHALL allow at most 10 selected values, including custom values, and SHALL require at least 5 to continue. Skill pages (technical development, engineering, interpersonal and AI engineering) SHALL have no limit, in either experience option.

#### Scenario: Limit reached
- **WHEN** the user has selected 10 values and activates an unselected value
- **THEN** the value is not selected and the selection stays at 10

#### Scenario: Skills are not limited
- **WHEN** the user has selected 10 values
- **THEN** they can select any number of skills on each skill page

#### Scenario: Custom entries count
- **WHEN** 9 values are selected and the user adds a custom value, then tries to add another
- **THEN** the first is added as the tenth selection and the second is rejected

### Requirement: Count and limit feedback
The values page SHALL show how many values are selected out of 10, SHALL say how many more are needed while fewer than 5 are selected, and when the limit is reached SHALL state that it has been reached and how to free a slot. Values that cannot be selected SHALL be visibly and programmatically marked as unavailable while remaining focusable. Skill pages SHALL show a plain "n selected" count with no limit wording.

#### Scenario: Count shown
- **WHEN** the user has selected 3 values
- **THEN** the page shows "3 of 10 selected" and says to choose at least 2 more

#### Scenario: Limit message
- **WHEN** the user reaches 10 selections
- **THEN** a message says the limit is reached and that deselecting a value allows another choice, and it is announced to assistive technology

#### Scenario: Unavailable values
- **WHEN** the limit is reached
- **THEN** unselected values appear dimmed and are exposed as disabled-like (aria-disabled), while selected values remain active

### Requirement: Deselecting frees a slot
The system SHALL allow a selected value to be deselected at any time, after which another value can be selected.

#### Scenario: Swap a value
- **WHEN** the limit is reached, the user deselects one value and selects another
- **THEN** the new value is selected and the count remains 10

### Requirement: Limit applies to existing selections
A values selection holding more than 10 values (for example a loaded profile) SHALL allow deselecting but not selecting, and the user SHALL NOT be able to continue from the values page until it holds 10 or fewer, with a message stating how many to remove.

#### Scenario: Over the limit
- **WHEN** the values page holds 13 selected values
- **THEN** the count shows "13 of 10 selected", continue is disabled, and the message says to deselect 3 words
