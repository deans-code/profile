## MODIFIED Requirements

### Requirement: Introduction above the steps
The app SHALL show an introduction at the top of every page, above the step navigation, consisting of a one-sentence purpose statement and a short three-part "how it works" summary: choose up to five values, pick skills on four pages, then download the profile. The introduction SHALL be broken into separate short items, not one dense paragraph.

#### Scenario: Introduction visible
- **WHEN** the user opens the app or moves to any step
- **THEN** the introduction is visible above the step navigation, states the purpose in one sentence, and lists the three parts of the route as separate items

### Requirement: Guided step indicator
The step navigation SHALL present the steps as a numbered sequence with a visible number badge on each step, show the current position as "Step N of 6" with the step name, mark completed steps with a check mark, make clear which step comes next, and show a progress bar reflecting how many steps are complete. The current step SHALL be visually dominant, and steps that cannot yet be entered SHALL look locked and SHALL keep their existing blocked reason. Each step SHALL have a touch target of at least 44 by 44 CSS pixels.

#### Scenario: Position shown
- **WHEN** the user is on the Engineering page
- **THEN** the indicator reads "Step 3 of 6" with "Engineering", completed earlier steps show a check mark, the current step is visually dominant, and later steps appear locked

#### Scenario: Check mark renders correctly
- **WHEN** a step is complete and not current
- **THEN** a check mark symbol is shown, with an accessible text equivalent such as "complete", and no garbled characters appear

#### Scenario: Progress bar
- **WHEN** two of the six steps are complete
- **THEN** the progress bar shows two of six complete and exposes that value to assistive technology

#### Scenario: Move between steps
- **WHEN** the user activates a reachable step in the indicator
- **THEN** that step opens, and the Back and Continue controls remain available

## ADDED Requirements

### Requirement: Page lead
Below the heading of every step page the app SHALL show a one-line lead stating what to do on that page, in plain language.

#### Scenario: Lead on values page
- **WHEN** the user opens the values page
- **THEN** a line under the heading says to pick up to five values that matter most to them

#### Scenario: Lead on skill page
- **WHEN** the user opens any skill page
- **THEN** a line under the heading says to pick the skills that apply, add their own, and switch between previous and desired experience
