## MODIFIED Requirements

### Requirement: Completion rules
The values page SHALL count as complete when 5 to 10 values are selected. A skill page SHALL count as complete when at least one word is selected in either option. The user SHALL NOT enter a later step while an earlier page is incomplete or while the values selection is over its limit, and the reason SHALL be shown.

#### Scenario: Desired only
- **WHEN** a user has 5 values selected and has selected words only under "Desired experience" on every skill page
- **THEN** they can reach the Profile

#### Scenario: Empty page blocks
- **WHEN** the AI engineering page has no selection in either option
- **THEN** the Profile step is unavailable and the message names AI engineering as needing a selection

#### Scenario: Too few values
- **WHEN** 4 values are selected
- **THEN** the user cannot continue and is told to choose at least 1 more
