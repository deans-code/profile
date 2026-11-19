# add-your-own Specification

## Purpose
TBD - created by archiving change highlight-add-your-own-at-top. Update Purpose after archive.

## Requirements

### Requirement: Add control at the top of every selection page
On the values page and on every skill page, the add-your-own control SHALL appear in the page's tools row, above the category cards, after the page guidance, so it is visible without scrolling past the word lists. On skill pages it SHALL follow the experience options in that row.

#### Scenario: Values page
- **WHEN** the user opens the values page
- **THEN** the add-your-own control appears in the tools row before the first category card

#### Scenario: Skill page
- **WHEN** the user opens any skill page
- **THEN** the add-your-own control appears in the tools row before the first category card, and after the Previous experience / Desired experience options

### Requirement: Highlighted as an option
The control SHALL be presented as a visually distinct panel with a heading naming what can be added ("Add your own value" or "Add your own skill"), an emphasised input, and a primary-styled Add button, using the page's accent colour and keeping text contrast at WCAG AA in light and dark themes.

#### Scenario: Distinct from the word lists
- **WHEN** a selection page is displayed
- **THEN** the control has a heading and a panel treatment that sets it apart from the filter and the category cards

### Requirement: Short instruction beside the control
The app SHALL provide a short instruction saying the control is for words that are not in the lists, to type a word and press Add or Enter, and that the word will appear under Custom and be selected. The instruction SHALL be in the page's Help area and SHALL be associated with the input for assistive technology, so it is announced when the input is focused even while Help is collapsed.

#### Scenario: Instruction present
- **WHEN** the user expands Help on a selection page
- **THEN** the instruction text is shown

#### Scenario: Announced with the input
- **WHEN** a screen reader user focuses the add-your-own input while Help is collapsed
- **THEN** the input's accessible description contains the instruction

### Requirement: Limit reason beside the control
When the page has a selection limit that is reached, the control SHALL stay visible with Add disabled and SHALL show the reason ("Limit reached: deselect a word to add another") beside the control as well as in the page status line.

#### Scenario: Values limit reached
- **WHEN** the user has 5 values selected
- **THEN** Add is disabled, the typed text is kept, and the reason is shown beside the control

### Requirement: Behaviour unchanged
Adding a word SHALL still place it in the Custom card, select it, select the existing entry on a duplicate, ignore empty text, and keep the control's accessible name ("Add your own value", or "Add your own <section> skill").

#### Scenario: Adding a word
- **WHEN** the user types "Grit" and presses Enter
- **THEN** "Grit" appears selected under Custom and the input is cleared
