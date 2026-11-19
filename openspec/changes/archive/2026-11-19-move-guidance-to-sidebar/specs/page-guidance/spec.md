# Spec Delta

## RENAMED Requirements

- FROM: `### Requirement: Introduction above the steps`
- TO: `### Requirement: Introduction in the side bar`

- FROM: `### Requirement: Intro and navigation visually separated`
- TO: `### Requirement: Intro and navigation as separate side bar sections`

## MODIFIED Requirements

### Requirement: Introduction in the side bar
The app SHALL show an introduction at the top of the side bar on every page, above the step navigation, stating that the tool builds a personal profile of values and skills. The outline of the route (values, then four skill pages, then the profile) SHALL be inside a collapsible instructions control that is collapsed by default. The control SHALL expose its expanded/collapsed state, be operable by keyboard and touch, and collapsed instructions SHALL NOT be focusable.

#### Scenario: Introduction visible
- **WHEN** the user opens the app or moves to any step
- **THEN** the introduction is visible at the top of the side bar above the step navigation, and the route instructions are hidden until the user expands them

#### Scenario: Expand instructions
- **WHEN** the user activates the instructions control
- **THEN** the route outline is shown, the control reports it is expanded, and activating it again hides the outline

### Requirement: Intro and navigation as separate side bar sections
The side bar SHALL present the introduction (title, purpose and instructions control) and the step navigation (step status, progress and step buttons) as two visually distinct sections, separated by a visible divider or differing background, so the navigation reads as its own block.

#### Scenario: Two areas
- **WHEN** the user views any page
- **THEN** the step navigation is visually set apart from the introduction within the side bar, and its order and behavior are unchanged
