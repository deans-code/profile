## MODIFIED Requirements

### Requirement: Desktop-first instructions
The instructions inside the Help area of each selection page SHALL lead with the desktop control: right-clicking a word shows its description. The instructions SHALL NOT include a line telling the user to click a word to select or deselect it.

#### Scenario: Primary controls
- **WHEN** the user expands Help on any selection page
- **THEN** the first line of the instructions says to right-click a word to read its description, and no text says to click a word to select it

### Requirement: Secondary keyboard and touch note
The instructions SHALL give keyboard and touch alternatives in a single short secondary line: press `?` or Shift+F10 on a focused word, or press and hold on a touch screen. The line SHALL NOT repeat the right-click instruction.

#### Scenario: Alternatives present but secondary
- **WHEN** the instructions are displayed
- **THEN** the keyboard and touch alternatives appear after the primary line, in one line of text, are visually secondary, and the word "right-click" appears only once in the instructions

### Requirement: Each help topic is its own inner block
When expanded, each topic in the Help area SHALL be shown as a separate inner block: the ChatGPT suggestion (where the page has one), the selection instructions, and the experience explanation (skill pages only). All inner blocks SHALL share one background colour, and that colour SHALL differ subtly from the Help area block that surrounds them. Inner blocks SHALL NOT have a visible border or accent bar; the background difference alone separates them. Block order and wording SHALL NOT change, apart from the instruction wording above.

#### Scenario: Skill page topics
- **WHEN** the user expands Help on a skill page
- **THEN** one inner block is shown per topic (the ChatGPT suggestion only on pages that have one), all in the same colour, set apart from the surrounding Help block by a subtle background difference and no visible border

#### Scenario: Values page topics
- **WHEN** the user expands Help on the values page
- **THEN** the experience explanation block is absent and the other topics are shown as inner blocks

#### Scenario: Collapse behaviour unchanged
- **WHEN** the user collapses Help
- **THEN** the inner blocks are hidden and not focusable
