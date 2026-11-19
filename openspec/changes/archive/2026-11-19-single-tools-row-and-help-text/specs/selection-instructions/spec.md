# Spec Delta

## MODIFIED Requirements

### Requirement: Help area on selection pages
On the values page and every skills page, the selection instructions, the add-your-own instruction, the filter hint and the ChatGPT suggestion ("Not sure which … fit you?") SHALL be placed together in one collapsible Help area, collapsed by default. On skill pages the Help area SHALL also hold the explanation of previous and desired experience. The control SHALL expose its expanded/collapsed state and be operable by keyboard and touch; collapsed content SHALL NOT be focusable. The add-your-own box and the filter box SHALL stay outside the Help area and always visible.

#### Scenario: Collapsed by default
- **WHEN** the user opens the values page or any skills page
- **THEN** the "Click a word…" instructions, the add-your-own instruction, the filter hint and the ChatGPT suggestion are hidden and a Help control is shown

#### Scenario: Expand help
- **WHEN** the user activates the Help control
- **THEN** the instructions, the add-your-own instruction, the filter hint and the ChatGPT suggestion (where the page has one) are shown

#### Scenario: Add box unaffected
- **WHEN** Help is collapsed
- **THEN** the add-your-own box and the filter box are still visible and usable

### Requirement: Add-your-own hint wording
The add-your-own instruction in the Help area SHALL read "Want to add a {noun} not here?" followed by the instruction to type it and press Add or Enter and that it appears under Custom, selected, where {noun} is "value" on the values page and "skill" on skills pages. It SHALL NOT use the wording "Not in the lists?".

#### Scenario: Values page
- **WHEN** the user expands Help on the values page
- **THEN** the instruction begins "Want to add a value not here?"

#### Scenario: Skill page
- **WHEN** the user expands Help on any skills page
- **THEN** the instruction begins "Want to add a skill not here?"
