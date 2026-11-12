# page-guidance Specification

## Purpose
Tells users what the tool is for, where they are in the sequence, and why each skill page asks for both previous and desired experience.

## ADDED Requirements

### Requirement: Introduction above the steps
The app SHALL show an introduction at the top of every page, above the step navigation, stating that the tool builds a personal profile of values and skills and outlining the route: values, then four skill pages, then the profile.

#### Scenario: Introduction visible
- **WHEN** the user opens the app or moves to any step
- **THEN** the introduction is visible above the step navigation and names the purpose and the route

### Requirement: Guided step indicator
The step navigation SHALL present the steps as a numbered sequence, show the current position as "Step N of 6" with the step name, mark completed steps, and make clear which step comes next. Steps that cannot yet be entered SHALL look unavailable and SHALL keep their existing blocked reason.

#### Scenario: Position shown
- **WHEN** the user is on the Engineering page
- **THEN** the indicator reads "Step 3 of 6" with "Engineering", completed earlier steps are marked, and later steps show as not yet reached

#### Scenario: Move between steps
- **WHEN** the user activates a reachable step in the indicator
- **THEN** that step opens, and the Back and Continue controls remain available

### Requirement: Experience intro on skill pages
Above the Previous experience / Desired experience options on every skill page, the app SHALL show a short intro stating that the profile is built from previous experience and desired experience, and that both can be filled in. The values page SHALL NOT show it.

#### Scenario: Intro placement
- **WHEN** the user opens any skill page
- **THEN** the intro appears above the two options, and does not appear on the values page or the profile
