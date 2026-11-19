# page-guidance Specification

## Purpose
Tells users what the tool is for, where they are in the sequence, and why each skill page asks for both previous and desired experience.

## Requirements

### Requirement: Introduction in the side bar
The app SHALL show an introduction at the top of the side bar on every page, above the step navigation, stating that the tool builds a personal profile of values and skills. The outline of the route (values, then four skill pages, then the profile) SHALL be inside a collapsible instructions control that is collapsed by default. The control SHALL expose its expanded/collapsed state, be operable by keyboard and touch, and collapsed instructions SHALL NOT be focusable.

#### Scenario: Introduction visible
- **WHEN** the user opens the app or moves to any step
- **THEN** the introduction is visible at the top of the side bar above the step navigation, and the route instructions are hidden until the user expands them

#### Scenario: Expand instructions
- **WHEN** the user activates the instructions control
- **THEN** the route outline is shown, the control reports it is expanded, and activating it again hides the outline

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

### Requirement: Experience intro on skill pages
In the Help area of every skill page, the app SHALL show a short intro stating that the profile is built from previous experience and desired experience, and that both can be filled in. The values page SHALL NOT show it. The page SHALL NOT repeat the page lead as a separate "Select the skills that apply" line.

#### Scenario: Intro placement
- **WHEN** the user expands Help on any skill page
- **THEN** the intro is shown, and it does not appear on the values page or the profile

#### Scenario: No duplicate line
- **WHEN** the user opens any selection page
- **THEN** only the page lead is shown under the heading, with no further "Select the … or add your own" line

### Requirement: Page lead
Below the heading of every step page the app SHALL show a one-line lead stating what to do on that page, in plain language.

#### Scenario: Lead on values page
- **WHEN** the user opens the values page
- **THEN** a line under the heading says to pick up to five values that matter most to them

#### Scenario: Lead on skill page
- **WHEN** the user opens any skill page
- **THEN** a line under the heading says to pick the skills that apply, add their own, and switch between previous and desired experience

### Requirement: Intro and navigation as separate side bar sections
The side bar SHALL present the introduction (title, purpose and instructions control) and the step navigation (step status, progress and step buttons) as two visually distinct sections, separated by a visible divider or differing background, so the navigation reads as its own block.

#### Scenario: Two areas
- **WHEN** the user views any page
- **THEN** the step navigation is visually set apart from the introduction within the side bar, and its order and behavior are unchanged

### Requirement: Purpose line covers learning and ambition
The introduction's purpose line SHALL say that the profile captures what the user values and can do, what they want to learn, and where they want to grow (their ambition). It SHALL be visible without expanding anything.

#### Scenario: Purpose line
- **WHEN** the user opens any page
- **THEN** the introduction mentions values, skills, what they want to learn and their ambition

### Requirement: Side bar help areas are coloured blocks
The side bar's "How this works" and "Privacy" areas SHALL each be presented as a coloured, bordered block that includes its toggle, using the same block style as the page Help area, with text and boundary contrast meeting WCAG AA in the light and dark themes. Each toggle SHALL show the same decorative down arrow as the page Help area, pointing up while the area is open. Their content, order and collapse behaviour SHALL NOT change.

#### Scenario: Collapsed areas
- **WHEN** the user opens any page
- **THEN** "How this works" and "Privacy" each appear as a coloured block with a down arrow, collapsed by default

#### Scenario: Expanded area
- **WHEN** the user expands "Privacy"
- **THEN** its statement is shown inside the block, its arrow points up, and the other area is unaffected
