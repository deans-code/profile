# Spec Delta

## Purpose

Lets users rate each selected skill from 1 to 10 once all sections have selections.

## ADDED Requirements

### Requirement: Selected skills listed with sliders
The system SHALL, after all sections have selections, present every selected skill grouped by section, each with an adjacent slider scoring 1 to 10.

#### Scenario: Scoring screen
- **WHEN** the user proceeds to scoring
- **THEN** each selected skill is shown with a slider and its numeric value, and unselected skills are not shown

### Requirement: Score range and default
Scores SHALL be whole numbers from 1 to 10 inclusive, and SHALL default to 5.

#### Scenario: Default
- **WHEN** a skill first appears on the scoring screen
- **THEN** its slider is at 5

#### Scenario: Adjust
- **WHEN** the user moves a slider to 8
- **THEN** the displayed value is 8 and no value outside 1–10 is possible

#### Scenario: Keyboard
- **WHEN** a slider is focused and the user presses the arrow keys
- **THEN** the score changes by 1 within 1–10

### Requirement: Scores survive navigation
The system SHALL retain entered scores when the user moves between steps, and SHALL discard the score of a skill that is deselected.

#### Scenario: Return to scoring
- **WHEN** the user goes back, adds one skill and returns
- **THEN** existing scores are unchanged and the new skill is at 5

#### Scenario: Deselected skill
- **WHEN** a scored skill is deselected and later reselected
- **THEN** its score resets to 5
