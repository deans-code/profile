## ADDED Requirements

### Requirement: Category cards collapse and expand
Each category card on the values page and the four skills pages, including the Custom card, SHALL have a header control that collapses and expands the card's options. Cards SHALL start expanded. The control SHALL be a button exposing its state with `aria-expanded` and the region it controls, operable by keyboard and touch. Collapsing SHALL NOT change any selection. Collapsed content SHALL NOT be focusable.

#### Scenario: Collapse a card
- **WHEN** the user activates the header of "Containers, infrastructure and delivery"
- **THEN** its groups and options are hidden, the header reports it is collapsed, and selections are unchanged

#### Scenario: Expand a card
- **WHEN** the user activates the header of a collapsed card
- **THEN** its groups and options are shown again

#### Scenario: Keyboard
- **WHEN** the user focuses a card header and presses Enter or Space
- **THEN** the card toggles

### Requirement: Collapsed cards show their selection
A collapsed card's header SHALL show how many of its options are selected whenever at least one is.

#### Scenario: Count shown
- **WHEN** a card with two selected options is collapsed
- **THEN** its header shows "2 selected"

### Requirement: Filtering and adding reveal cards
While the filter has text, every card with matches SHALL be shown expanded, and cards return to their previous state when the filter is cleared. Adding a custom entry SHALL expand the Custom card before it is scrolled into view.

#### Scenario: Filter opens collapsed card
- **WHEN** a card is collapsed and the user types a word that matches one of its options
- **THEN** the card is shown expanded with the matching options, and after clearing the filter it is collapsed again

#### Scenario: Add to collapsed Custom card
- **WHEN** the Custom card is collapsed and the user adds a custom entry
- **THEN** the Custom card is expanded and shows the new entry
