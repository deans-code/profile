# selection-instructions Specification

## Purpose

Tells users, in plain desktop-first wording, how to select words and read their descriptions on each selection page.

## Requirements

### Requirement: Desktop-first instructions
The instructions inside the Help area of each selection page SHALL lead with the desktop controls: clicking a word selects or deselects it, and right-clicking a word shows its description.

#### Scenario: Primary controls
- **WHEN** the user expands Help on any selection page
- **THEN** the first line of the instructions says to click a word to select it and to right-click a word to read its description

### Requirement: Secondary keyboard and touch note
The instructions SHALL give keyboard and touch alternatives in a single short secondary line: press `?` or Shift+F10 on a focused word, or press and hold on a touch screen.

#### Scenario: Alternatives present but secondary
- **WHEN** the instructions are displayed
- **THEN** the keyboard and touch alternatives appear after the primary line, in one line of text, and are visually secondary

### Requirement: Page-specific limit wording
The values page instructions SHALL state that up to 5 values can be selected. The skill pages' instructions SHALL state that any number of skills can be selected and SHALL NOT mention a limit.

#### Scenario: Values page
- **WHEN** the user is on the values page
- **THEN** the instructions mention choosing up to 5 values

#### Scenario: Skill page
- **WHEN** the user is on a skill page
- **THEN** the instructions say to select as many as apply, and mention no limit

### Requirement: Consistent "description" terminology
User-facing text SHALL refer to a word's description (not "definition"), including the instructions and the accessible name of the open panel, which SHALL be "Description of {word}".

#### Scenario: Panel name
- **WHEN** the user right-clicks "Respect"
- **THEN** the panel's accessible name is "Description of Respect"

### Requirement: Instructions match behavior
Each control named in the instructions SHALL work as stated on the page it is shown, and an automated test SHALL cover each one.

#### Scenario: Documented controls work
- **WHEN** the user right-clicks a word, or presses `?` or Shift+F10 on a focused word, or long-presses it
- **THEN** its description opens and its selection state is unchanged

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
