# section-theming Specification

## Purpose

Defines the visual presentation: a wide, uncluttered layout, uniformly sized words, a distinct colour per section, and clear instructions at the top of selection steps.

## Requirements

### Requirement: Wide layout
The system SHALL use more of the available screen width on large displays than the previous fixed narrow column, flowing lists into additional columns or rows as width allows, while remaining usable on phone widths without horizontal scrolling.

#### Scenario: Large display
- **WHEN** the viewport is 1600 pixels wide
- **THEN** the content area uses at least 1200 pixels of that width

#### Scenario: Phone
- **WHEN** the viewport is 360 pixels wide
- **THEN** the page does not scroll horizontally

### Requirement: Uniform word size
The system SHALL display all values and skills at the same text size, regardless of how common they are.

#### Scenario: Values
- **WHEN** the values step is displayed
- **THEN** every value is rendered at the same font size

#### Scenario: Skills
- **WHEN** a skill section is displayed
- **THEN** every skill is rendered at the same font size as the values

### Requirement: Colour per section
The system SHALL give each of the six sections (values, technical development, engineering, interpersonal, AI engineering, profile card) its own accent colour, applied to that section's buttons, selected words and its entry in the step navigation, with colours that differ from one another.

#### Scenario: Different sections differ
- **WHEN** the user moves from values to technical development
- **THEN** the primary buttons and selected words change to the technical development colour

#### Scenario: Colour is not the only cue
- **WHEN** a word is selected
- **THEN** it is also distinguished by something other than colour, such as a check mark or heavier weight

### Requirement: Accessible contrast in both themes
Section colours SHALL meet WCAG AA contrast (4.5:1 for text, 3:1 for interface boundaries) against their backgrounds in both light and dark themes.

#### Scenario: Button text
- **WHEN** a section button is shown in either theme
- **THEN** its label meets 4.5:1 contrast against the button background

### Requirement: Instructions at the top
The values page and each skill page SHALL show brief instructions at the top stating how to select or deselect a word and how to open its description (right-click, or keyboard and long-press equivalents).

#### Scenario: Instructions visible
- **WHEN** the user reaches the values step
- **THEN** instructions at the top explain that clicking selects a word and right-clicking shows its definition

#### Scenario: Alternatives mentioned
- **WHEN** the instructions are displayed
- **THEN** they also mention the keyboard and touch alternatives
