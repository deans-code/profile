## ADDED Requirements

### Requirement: Options stay in view while scrolling
On each skill page the "Previous experience" and "Desired experience" options, with their counts, SHALL stay pinned at the top of the viewport while the user scrolls the page, on desktop and mobile widths, so both are always visible. The pinned options SHALL be opaque so content does not show through, SHALL remain operable by pointer, touch and keyboard, and SHALL NOT cover the footer navigation, the description panel or a word that has keyboard focus.

#### Scenario: Pinned while scrolling
- **WHEN** the user scrolls down a skill page past the original position of the options
- **THEN** both options and their counts remain visible at the top of the viewport

#### Scenario: Switching while pinned
- **WHEN** the options are pinned and the user activates "Desired experience"
- **THEN** the page shows the desired-experience selections and the active option is indicated, without scrolling back up

#### Scenario: Mobile width
- **WHEN** the page is viewed at 320 px wide
- **THEN** both options are visible together, full width, with touch targets at least 44 px tall and no horizontal scrolling

#### Scenario: Focus not hidden
- **WHEN** the user tabs to a word near the top of the viewport
- **THEN** the word is scrolled clear of the pinned options

#### Scenario: Values page
- **WHEN** the user opens the values page
- **THEN** no options are shown or pinned
