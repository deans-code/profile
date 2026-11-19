## ADDED Requirements

### Requirement: Help area on selection pages
On the values page and every skills page, the selection instructions and the ChatGPT suggestion ("Not sure which … fit you?") SHALL be placed together in one collapsible Help area, collapsed by default. The control SHALL expose its expanded/collapsed state and be operable by keyboard and touch; collapsed content SHALL NOT be focusable. The add-your-own box and its hint SHALL stay outside the Help area and always visible.

#### Scenario: Collapsed by default
- **WHEN** the user opens the values page or any skills page
- **THEN** the "Click a word…" instructions and the ChatGPT suggestion are hidden and a Help control is shown

#### Scenario: Expand help
- **WHEN** the user activates the Help control
- **THEN** the instructions and the ChatGPT suggestion (where the page has one) are shown

#### Scenario: Add box unaffected
- **WHEN** Help is collapsed
- **THEN** the add-your-own box and its hint are still visible and usable

### Requirement: Add-your-own hint wording
The hint beside the add-your-own box SHALL read "Want to add a {noun} not here?" followed by the instruction to type it and press Add or Enter and that it appears under Custom, selected, where {noun} is "value" on the values page and "skill" on skills pages. It SHALL NOT use the wording "Not in the lists?".

#### Scenario: Values page
- **WHEN** the user is on the values page
- **THEN** the hint begins "Want to add a value not here?"

#### Scenario: Skill page
- **WHEN** the user is on any skills page
- **THEN** the hint begins "Want to add a skill not here?"

## MODIFIED Requirements

### Requirement: Desktop-first instructions
The instructions inside the Help area of each selection page SHALL lead with the desktop controls: clicking a word selects or deselects it, and right-clicking a word shows its description.

#### Scenario: Primary controls
- **WHEN** the user expands Help on any selection page
- **THEN** the first line of the instructions says to click a word to select it and to right-click a word to read its description
