# Spec Delta

## Purpose

Defines the order of steps and when the user may move on, now that scoring is removed.

## ADDED Requirements

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
A page SHALL count as complete when at least one word is selected in either option. The user SHALL NOT enter a later step while an earlier page is incomplete or while the values selection in either option is over its limit, and the reason SHALL be shown.

#### Scenario: Desired only
- **WHEN** a user has selected words only under "Desired experience" on every page
- **THEN** they can reach the Profile

#### Scenario: Empty page blocks
- **WHEN** the AI engineering page has no selection in either option
- **THEN** the Profile step is unavailable and the message names AI engineering as needing a selection

### Requirement: Profile card shows both options
The profile card SHALL show, for the values and for each skill page, the previous-experience words and the desired-experience words as separate groups, omitting an empty group, and without scores.

#### Scenario: Card content
- **WHEN** the user reaches the Profile
- **THEN** each page is shown with its "Previous experience" and "Desired experience" words, and no score bars or numbers
