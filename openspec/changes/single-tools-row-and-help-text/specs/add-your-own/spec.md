# Spec Delta

## MODIFIED Requirements

### Requirement: Add control at the top of every selection page
On the values page and on every skill page, the add-your-own control SHALL appear in the page's tools row, above the category cards, after the page guidance, so it is visible without scrolling past the word lists. On skill pages it SHALL follow the experience options in that row.

#### Scenario: Values page
- **WHEN** the user opens the values page
- **THEN** the add-your-own control appears in the tools row before the first category card

#### Scenario: Skill page
- **WHEN** the user opens any skill page
- **THEN** the add-your-own control appears in the tools row before the first category card, and after the Previous experience / Desired experience options

### Requirement: Short instruction beside the control
The app SHALL provide a short instruction saying the control is for words that are not in the lists, to type a word and press Add or Enter, and that the word will appear under Custom and be selected. The instruction SHALL be in the page's Help area and SHALL be associated with the input for assistive technology, so it is announced when the input is focused even while Help is collapsed.

#### Scenario: Instruction present
- **WHEN** the user expands Help on a selection page
- **THEN** the instruction text is shown

#### Scenario: Announced with the input
- **WHEN** a screen reader user focuses the add-your-own input while Help is collapsed
- **THEN** the input's accessible description contains the instruction
