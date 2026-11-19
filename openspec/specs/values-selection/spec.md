# values-selection Specification

## Purpose

Lets users choose, once and from a short list, the personal and professional values that describe them, from curated common values or by adding their own.

## Requirements

### Requirement: Values are presented for selection
The system SHALL present common values, grouped by category as described by the values-grouping capability, that the user can select from, none selected initially.

#### Scenario: Values shown
- **WHEN** the user reaches the values page
- **THEN** at least 100 common values are displayed, none selected

### Requirement: Values can be toggled
The system SHALL let the user select and deselect any value, and SHALL visibly distinguish selected values from unselected ones.

#### Scenario: Select a value
- **WHEN** the user activates an unselected value
- **THEN** the value becomes selected and the selected count updates

#### Scenario: Deselect a value
- **WHEN** the user activates a selected value
- **THEN** the value becomes unselected

#### Scenario: Keyboard operation
- **WHEN** the user focuses a value and presses Enter or Space
- **THEN** its selection toggles

### Requirement: Custom values can be added
The system SHALL let the user add their own values, which appear under Custom as selected.

#### Scenario: Add custom value
- **WHEN** the user enters "Craftsmanship" and confirms
- **THEN** it is added and selected

#### Scenario: Duplicate or empty entry rejected
- **WHEN** the user enters an empty value, or one matching an existing value ignoring case and surrounding whitespace
- **THEN** no new value is added; for a duplicate the existing value is selected instead

#### Scenario: Remove custom value
- **WHEN** the user removes a custom value
- **THEN** it disappears from the page and the selection

### Requirement: Values step requires a selection
The system SHALL require at least 5 selected values before the user can continue past the values page, and SHALL explain how many more are needed.

#### Scenario: Continue blocked
- **WHEN** fewer than 5 values are selected
- **THEN** the continue action is disabled with an explanation of how many more to choose

### Requirement: Single values list
The values page SHALL have one selection and SHALL NOT offer the Previous experience and Desired experience options.

#### Scenario: No option switch
- **WHEN** the user opens the values page
- **THEN** no experience option switch is shown, and the instructions do not mention an "other option"

### Requirement: Limit of five values
The user SHALL select between 5 and 10 values, including custom values, with the feedback described by the selection-limits capability. The instructions on the values page SHALL say to select 5 to 10 values.

#### Scenario: Limit reached
- **WHEN** the user has selected 10 values
- **THEN** the other values cannot be selected, the Add control is disabled, and the message says to deselect a value to choose another

#### Scenario: Custom value counts
- **WHEN** the user has 9 values selected and adds a custom value
- **THEN** it is selected and the count reads "10 of 10 selected"

#### Scenario: Instructions state the range
- **WHEN** the user reads the instructions on the values page
- **THEN** they say to select 5 to 10 values

### Requirement: Over-limit selections block progress
If more than 10 values are selected (for example after loading a file), the user SHALL NOT be able to move to a later page until the selection is within the limit, and the message SHALL say how many values to deselect.

#### Scenario: Loaded file with twelve values
- **WHEN** a loaded profile has 12 values
- **THEN** the values page opens with a message asking to deselect 2 values, and Continue is unavailable until 10 or fewer remain

### Requirement: Curated values list
The built-in values SHALL exclude entries that are vague, duplicate another value in meaning, or are unsuited to a working profile, and SHALL include strong working-life values currently missing. Category membership rules and the five-value limit are unchanged.

#### Scenario: Weak values removed
- **WHEN** the user browses the values
- **THEN** "Comfort", "Spontaneity", "Hospitality", "Cooperation", "Knowledge", "Balance", "Success", "Recognition", "Drive", "Choice" and "Fairness in pay" are not offered

#### Scenario: Strong values added
- **WHEN** the user browses the values
- **THEN** "Psychological safety", "Intellectual honesty", "Rigour", "Sustainable pace" and "Learning in public" are offered, each with a description

### Requirement: Removed words in saved profiles
A saved profile containing a word that is no longer built in SHALL still load, keeping that word as the user's own custom entry.

#### Scenario: Load old profile
- **WHEN** a profile selecting "Comfort" is loaded
- **THEN** it loads without error and "Comfort" appears as a custom value

### Requirement: Add your own stays in view
On the values page the tools row, holding the add-your-own text box and its Add button, the filter box and the Show all and Collapse all buttons, SHALL be pinned at the top of the viewport while the user scrolls, with an opaque background, on desktop widths. On narrow screens the add-your-own box and Add button SHALL stay pinned. When the selection limit is reached the Add button SHALL be disabled with the limit message shown in the pinned bar, and the typed text SHALL be kept.

#### Scenario: Pinned while scrolling
- **WHEN** the user scrolls down the values page
- **THEN** the add-your-own box and Add button remain visible at the top of the viewport

#### Scenario: Limit shown in the bar
- **WHEN** 10 values are selected and the user has typed a custom value
- **THEN** the pinned Add button is disabled, the limit message is visible in the bar, and the typed text remains

### Requirement: Adding a custom value reveals it
When the user adds a new custom value, the system SHALL scroll the page so the Custom card, including the new value, is in view and not hidden behind the pinned bar, using smooth scrolling unless the user prefers reduced motion, in which case the scroll SHALL be instant. If the values filter would hide the new value, the system SHALL clear the filter. No scroll SHALL happen when nothing new was added.

#### Scenario: New custom value scrolled into view
- **WHEN** the user scrolls to the top of the values page, types "Craftsmanship of docs" and presses Add
- **THEN** the page scrolls to the Custom card and "Craftsmanship of docs" is visible there, selected

#### Scenario: Filter cleared so the value shows
- **WHEN** the filter is "res" and the user adds "Grit"
- **THEN** the filter is cleared and "Grit" is shown in the Custom card, with earlier selections kept

#### Scenario: Reduced motion
- **WHEN** the user prefers reduced motion and adds a custom value
- **THEN** the page scrolls to the Custom card without animation

#### Scenario: Nothing added, no scroll
- **WHEN** the user adds text that matches an existing value, or presses Add with empty text, or loads a saved profile containing custom values
- **THEN** the page does not scroll to the Custom card
