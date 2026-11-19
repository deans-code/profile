# profile-flow Specification

## Purpose

Defines the order of steps and when the user may move on, now that scoring is removed.

## Requirements

### Requirement: No scoring
The app SHALL NOT offer scoring: no scoring step, no per-skill sliders or numbers, and no scores in the profile card or downloads.

#### Scenario: No scoring step
- **WHEN** the user views the step navigation
- **THEN** no "Scoring" step exists and no step shows a 1 to 10 control

### Requirement: Step order
The steps SHALL be, in order: Values, Technical development, Engineering, Interpersonal, AI engineering, Profile.

#### Scenario: Order
- **WHEN** the user presses Continue on the Interpersonal page
- **THEN** the AI engineering page opens, and Finish on that page opens the Profile

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

### Requirement: Navigation shows route and progress
The step navigation SHALL show each step's number, the user's current position out of the total, and which steps are complete, without changing the step order or the completion rules. The Back and Continue controls SHALL name their destination (for example "Back to Values", "Continue to Engineering", "Finish and view profile") and SHALL remain visible at the bottom of the viewport while the page scrolls.

#### Scenario: Blocked step
- **WHEN** an earlier page is incomplete
- **THEN** later steps appear unavailable and the existing reason is still shown

#### Scenario: Controls name destinations
- **WHEN** the user is on the Interpersonal page
- **THEN** the controls read "Back to Engineering" and "Continue to AI engineering"

#### Scenario: Controls stay in reach
- **WHEN** a long page is scrolled so the footer would be off screen
- **THEN** the Back and Continue controls are still visible and usable
