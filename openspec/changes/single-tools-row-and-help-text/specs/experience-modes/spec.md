# Spec Delta

## MODIFIED Requirements

### Requirement: Options are introduced
Each skill page SHALL introduce the two options in its Help area, as defined by the page-guidance capability, so users know the profile records both what they have done and what they want to do.

#### Scenario: Intro precedes options
- **WHEN** the user expands Help on a skill page
- **THEN** the experience intro is shown, above the options in reading order, explaining the Previous experience and Desired experience options

### Requirement: Options stay in view while scrolling
On each skill page the tools row SHALL hold, in order, the "Previous experience" and "Desired experience" options with their counts, the add-your-own text box and its Add button, the filter box, and the Show all and Collapse all buttons. The row SHALL stay pinned at the top of the viewport while the user scrolls, on desktop widths. On narrow screens the options and the add-your-own controls SHALL stay pinned, and the filter and bulk buttons MAY scroll with the page. The pinned area SHALL be opaque, SHALL remain operable by pointer, touch and keyboard, and SHALL NOT cover the footer navigation, the description panel or a word that has keyboard focus.

#### Scenario: Pinned while scrolling
- **WHEN** the user scrolls down a skill page past the original position of the options
- **THEN** both options with their counts, and the add-your-own text box with its Add button, remain visible at the top of the viewport

#### Scenario: Side by side on desktop
- **WHEN** the page is viewed at 1280 px wide
- **THEN** the options, add-your-own controls, filter box and Show all / Collapse all buttons sit on one row

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
- **THEN** it has an accessible label and is described by the explanation of what Add does, which is in the Help area
