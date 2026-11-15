## ADDED Requirements

### Requirement: Add your own stays in view
On the values page the add-your-own text box and its Add button SHALL be pinned at the top of the viewport while the user scrolls, with an opaque background, on desktop and mobile widths. When the selection limit is reached the Add button SHALL be disabled with the limit message shown in the pinned bar, and the typed text SHALL be kept.

#### Scenario: Pinned while scrolling
- **WHEN** the user scrolls down the values page
- **THEN** the add-your-own box and Add button remain visible at the top of the viewport

#### Scenario: Limit shown in the bar
- **WHEN** 10 values are selected and the user has typed a custom value
- **THEN** the pinned Add button is disabled, the limit message is visible in the bar, and the typed text remains
