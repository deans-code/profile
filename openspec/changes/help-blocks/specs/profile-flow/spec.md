# Spec Delta

## MODIFIED Requirements

### Requirement: Completion rules
The values page SHALL count as complete when 5 to 10 values are selected. A skill page SHALL NOT need any selection: the user MAY continue past it and reach the profile with no skills chosen. In the step navigation a skill page SHALL be shown as complete when it has a word selected in either option or when the user has already moved past it. The user SHALL NOT enter a later step while the values page is incomplete or while any selection is over its limit, and the reason SHALL be shown.

#### Scenario: Desired only
- **WHEN** a user has 5 values selected and has selected words only under "Desired experience" on every skill page
- **THEN** they can reach the Profile

#### Scenario: Empty page blocks
- **WHEN** the AI engineering page has no selection in either option and the values are valid
- **THEN** the Profile step is available and no message asks for a skill selection

#### Scenario: No skills at all
- **WHEN** a user has 5 values selected and nothing on any skill page
- **THEN** they can continue through all four skill pages and reach the Profile

#### Scenario: Too few values
- **WHEN** 4 values are selected
- **THEN** the user cannot continue and is told to choose at least 1 more

#### Scenario: Passed-over page shows complete
- **WHEN** the user continues past an empty skill page
- **THEN** that step is shown as complete in the navigation and counts toward the progress bar

### Requirement: Profile card shows both options
The profile card SHALL show the values as one list and, for each skill page, the previous-experience words and the desired-experience words as separate groups, omitting an empty group, and without scores. A skill page with no words in either option SHALL still be listed with a short note that nothing was chosen.

#### Scenario: Card content
- **WHEN** the user reaches the Profile
- **THEN** the values are one list, each skill page is shown with its "Previous experience" and "Desired experience" words, and no score bars or numbers

#### Scenario: Empty skill page on the card
- **WHEN** the user reaches the Profile with nothing chosen on the AI engineering page
- **THEN** the AI engineering heading is shown with a note that nothing was chosen, and the downloaded file has empty lists for it
