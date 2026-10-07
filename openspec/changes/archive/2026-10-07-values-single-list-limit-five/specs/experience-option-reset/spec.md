# Spec Delta

## Purpose

Every skill page starts on Previous experience.

## ADDED Requirements

### Requirement: Default to previous experience on every page
Whenever a page is opened, its experience option SHALL be "Previous experience", however the page was reached (Continue, Back, the step tabs, Edit, or after loading a profile). Choosing "Desired experience" SHALL apply only to the page currently shown.

#### Scenario: Next page resets
- **WHEN** the user selects "Desired experience" on the technical page and continues to the engineering page
- **THEN** the engineering page opens with "Previous experience" active

#### Scenario: Returning to a page resets
- **WHEN** the user is on the engineering page with "Desired experience" active, goes back to the technical page, and returns
- **THEN** both pages show "Previous experience" active

#### Scenario: Selections are kept
- **WHEN** the user returns to a page where they had chosen desired words
- **THEN** the desired words are still selected, and the "Desired experience" count still shows them

#### Scenario: After loading or editing
- **WHEN** the user loads a profile, or presses Edit on the profile card
- **THEN** the page that opens shows "Previous experience" active

### Requirement: Instructions name the active option
The instructions on a skill page SHALL name the active option and say that the other option has its own selections.

#### Scenario: Instruction text
- **WHEN** the user opens a skill page
- **THEN** the instructions say they are choosing Previous experience
