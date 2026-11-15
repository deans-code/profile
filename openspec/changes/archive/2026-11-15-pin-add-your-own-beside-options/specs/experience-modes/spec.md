## MODIFIED Requirements

### Requirement: Options stay in view while scrolling
On each skill page the "Previous experience" and "Desired experience" options, with their counts, SHALL stay pinned at the top of the viewport while the user scrolls the page, on desktop and mobile widths, so both are always visible. The add-your-own text box and its Add button SHALL be pinned in the same bar, beside the options on desktop and directly below them on narrow screens. The pinned bar SHALL be opaque so content does not show through, SHALL remain operable by pointer, touch and keyboard, and SHALL NOT cover the footer navigation, the description panel or a word that has keyboard focus.

#### Scenario: Pinned while scrolling
- **WHEN** the user scrolls down a skill page past the original position of the options
- **THEN** both options with their counts, and the add-your-own text box with its Add button, remain visible at the top of the viewport

#### Scenario: Side by side on desktop
- **WHEN** the page is viewed at 1280 px wide
- **THEN** the options and the add-your-own controls sit on one row in the pinned bar

#### Scenario: Add while pinned
- **WHEN** the user is far down a skill page with "Desired experience" active, types "Zig" into the pinned box and presses Enter
- **THEN** "Zig" is added under Custom for desired experience only, the text box is cleared, and the page does not scroll

#### Scenario: Switching while pinned
- **WHEN** the bar is pinned and the user activates "Desired experience"
- **THEN** the page shows the desired-experience selections and the active option is indicated, without scrolling back up

#### Scenario: Mobile width
- **WHEN** the page is viewed at 320 px wide
- **THEN** both options are visible together, full width, with the add-your-own box and Add button on a row below, all touch targets at least 44 px tall and no horizontal scrolling

#### Scenario: Focus not hidden
- **WHEN** the user tabs to a word near the top of the viewport
- **THEN** the word is scrolled clear of the pinned bar

#### Scenario: Explanation stays available
- **WHEN** the user focuses the pinned add-your-own box
- **THEN** it has an accessible label and is described by the explanation of what Add does, which appears above the bar in the normal page flow
