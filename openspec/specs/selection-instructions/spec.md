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
On the values page and every skills page, the selection instructions and the ChatGPT suggestion ("Not sure which … fit you?") SHALL be placed together in one collapsible Help area, collapsed by default. On skill pages the Help area SHALL also hold the explanation of previous and desired experience. The control SHALL expose its expanded/collapsed state and be operable by keyboard and touch; collapsed content SHALL NOT be focusable. The add-your-own box and the filter box SHALL stay outside the Help area and always visible, and SHALL have accessible labels. No separate instruction or hint text SHALL be shown for them.

#### Scenario: Collapsed by default
- **WHEN** the user opens the values page or any skills page
- **THEN** the "Click a word…" instructions and the ChatGPT suggestion are hidden and a Help control is shown

#### Scenario: Expand help
- **WHEN** the user activates the Help control
- **THEN** the instructions and the ChatGPT suggestion (where the page has one) are shown

#### Scenario: Add box unaffected
- **WHEN** Help is collapsed
- **THEN** the add-your-own box and the filter box are still visible and usable

### Requirement: Help area is a coloured block
The Help area on the values page and every skills page SHALL be presented as a block with its own background colour and a visible border, drawn in the page's section colour family, and the block SHALL include the Help toggle, so a collapsed Help area shows as a coloured bar. The colours SHALL meet WCAG AA contrast for text (4.5:1) and for the block boundary (3:1) in the light and dark themes.

#### Scenario: Collapsed Help is a block
- **WHEN** the user opens a selection page
- **THEN** the collapsed Help control is shown inside a coloured, bordered block

#### Scenario: Both themes
- **WHEN** Help is expanded in the light theme and in the dark theme
- **THEN** its text and border meet the stated contrast against the block background

### Requirement: Each help topic is its own inner block
When expanded, each topic in the Help area SHALL be shown as a separate inner block: the ChatGPT suggestion (where the page has one), the selection instructions, and the experience explanation (skill pages only). All inner blocks SHALL share one background colour, and that colour SHALL differ visibly from the Help area block that surrounds them. Block order and wording SHALL NOT change.

#### Scenario: Skill page topics
- **WHEN** the user expands Help on a skill page
- **THEN** one inner block is shown per topic (the ChatGPT suggestion only on pages that have one), all in the same colour and visibly different from the surrounding Help block

#### Scenario: Values page topics
- **WHEN** the user expands Help on the values page
- **THEN** the experience explanation block is absent and the other topics are shown as inner blocks

#### Scenario: Collapse behaviour unchanged
- **WHEN** the user collapses Help
- **THEN** the inner blocks are hidden and not focusable

### Requirement: Help areas show an expand arrow
The Help toggle SHALL show a down arrow directly after its label (for example "Help ▾") to indicate that it expands. While the area is open the arrow SHALL point up. The arrow SHALL be decorative (not announced), the expanded/collapsed state SHALL still be exposed by the control, and the turn SHALL NOT animate for users who prefer reduced motion.

#### Scenario: Collapsed arrow
- **WHEN** the user opens a selection page
- **THEN** the collapsed Help toggle shows a down arrow

#### Scenario: Open arrow
- **WHEN** the user expands Help
- **THEN** the arrow points up, and points down again when Help is collapsed
