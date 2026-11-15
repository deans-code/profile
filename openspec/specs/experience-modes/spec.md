# experience-modes Specification

## Purpose

Lets users record both what they have already done and what they want to do, on every skill page. Values are chosen once and have no options.
## Requirements
### Requirement: Two experience options on every skill page
Each skill page (technical development, engineering, interpersonal and AI engineering) SHALL offer exactly two options: "Previous experience" and "Desired experience". The values page does not offer them. Exactly one SHALL be active, visibly indicated and exposed to assistive technology as the selected option.

#### Scenario: Options shown
- **WHEN** the user opens any skill page
- **THEN** the page shows a "Previous experience" option and a "Desired experience" option, and "Previous experience" is active whenever the page is opened

#### Scenario: Switching option
- **WHEN** the user activates "Desired experience"
- **THEN** the page shows the selections made for desired experience, and clicking a word changes only that list

### Requirement: Independent selections
The previous-experience and desired-experience selections SHALL be independent: a word MAY be selected in either, both or neither, and selecting or deselecting in one SHALL NOT change the other.

#### Scenario: Same word in both lists
- **WHEN** the user selects "Python" under "Previous experience" and then under "Desired experience"
- **THEN** "Python" is selected in both lists, and deselecting it under "Desired experience" leaves it selected under "Previous experience"

### Requirement: Counts for both options
Each option SHALL display how many words are selected in it, so the user can see both counts without switching.

#### Scenario: Counts visible
- **WHEN** the user has 3 previous-experience and 5 desired-experience words on a page
- **THEN** the "Previous experience" option shows 3 and the "Desired experience" option shows 5

### Requirement: Skill pages have their own limits
Skill pages SHALL have no limit in either option. A custom entry SHALL be added to the active option's list and selected in it only.

#### Scenario: Custom entry
- **WHEN** the user adds the custom skill "Zig" while "Desired experience" is active
- **THEN** "Zig" appears in the Custom group, selected for desired experience only

### Requirement: Instructions describe the options
The instructions on each skill page SHALL state which option is active and that the other option is selected separately.

#### Scenario: Instruction text
- **WHEN** the user reads the instructions on any skill page
- **THEN** they name the active option and say the other option has its own selections

### Requirement: Options are introduced
Each skill page SHALL introduce the two options with text above them, as defined by the page-guidance capability, so users know the profile records both what they have done and what they want to do.

#### Scenario: Intro precedes options
- **WHEN** the user reads a skill page from the top
- **THEN** the experience intro is read before the Previous experience and Desired experience options

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

