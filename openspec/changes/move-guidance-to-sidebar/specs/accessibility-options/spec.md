# Spec Delta

## MODIFIED Requirements

### Requirement: Accessibility controls at the top of the page
The app SHALL show an Accessibility control in the side bar, reachable on every step, offering a theme choice (Match system, Light, Dark) and a text size choice (Default, Large, Larger, Largest). The control SHALL be operable by keyboard and expose its current selection to assistive technology.

#### Scenario: Controls are available on every step
- **WHEN** the user is on any step, including the final profile
- **THEN** the Accessibility control is visible in the side bar and shows the current theme and text size

#### Scenario: Keyboard use
- **WHEN** the user operates the control with the keyboard only
- **THEN** every option can be reached and selected, and the selected option is announced as selected
