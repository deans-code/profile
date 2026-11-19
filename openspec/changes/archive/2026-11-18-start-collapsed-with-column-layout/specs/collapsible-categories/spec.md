## MODIFIED Requirements

### Requirement: Category cards collapse and expand
Each category card on the values page and the four skills pages, including the Custom card, SHALL have a header control that collapses and expands the card's options. Cards SHALL start collapsed. The control SHALL be a button exposing its state with `aria-expanded` and the region it controls, operable by keyboard and touch. Collapsing SHALL NOT change any selection. Collapsed content SHALL NOT be focusable.

#### Scenario: Collapse a card
- **WHEN** the user activates the header of "Containers, infrastructure and delivery"
- **THEN** its groups and options are hidden, the header reports it is collapsed, and selections are unchanged

#### Scenario: Expand a card
- **WHEN** the user activates the header of a collapsed card
- **THEN** its groups and options are shown again

#### Scenario: Keyboard
- **WHEN** the user focuses a card header and presses Enter or Space
- **THEN** the card toggles

#### Scenario: Pages open collapsed
- **WHEN** the user opens the values page or any skills page
- **THEN** every card is collapsed and only the card headers are shown

## ADDED Requirements

### Requirement: Collapse all and show all
Pages with category cards SHALL provide a "Collapse all" button and a "Show all" button above the cards. "Show all" SHALL expand every card, including the Custom card when present, and "Collapse all" SHALL collapse every card. Neither SHALL change any selection. The result SHALL be announced in a polite live region.

#### Scenario: Show all
- **WHEN** the user activates "Show all"
- **THEN** every card is expanded and the page announces that all sections are shown

#### Scenario: Collapse all
- **WHEN** the user has expanded some cards and activates "Collapse all"
- **THEN** every card is collapsed, their selected counts are shown in the headers, and selections are unchanged

#### Scenario: Keeps selections
- **WHEN** the user has selected options, activates "Collapse all", then "Show all"
- **THEN** the same options are still selected

### Requirement: Cards stack in columns
Category cards SHALL be laid out in stacked columns, each card at its own height. Expanding or collapsing a card SHALL move only the cards below it in the same column and SHALL NOT change the height of cards beside it. A card SHALL NOT be split across columns. The reading and tab order SHALL stay the category order. On a narrow screen there SHALL be a single column with no horizontal scrolling.

#### Scenario: Neighbour unchanged
- **WHEN** the user expands a card that has another card beside it in the next column
- **THEN** the neighbouring card keeps its height and the cards below the expanded card move down

#### Scenario: Phone width
- **WHEN** the page is viewed at phone width
- **THEN** cards are shown in one column and the page does not scroll sideways

### Requirement: Selection stays visible while collapsed
A collapsed card with selected options SHALL show how many in its header, including after a saved profile is loaded.

#### Scenario: Loaded profile
- **WHEN** a saved profile with selections is loaded and the user opens a page
- **THEN** each collapsed card holding selections shows "N selected" in its header
