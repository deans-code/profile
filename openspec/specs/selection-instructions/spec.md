# selection-instructions Specification

## Purpose

Tells users, in plain desktop-first wording, how to select words and read their descriptions on each selection page.

## Requirements

### Requirement: Desktop-first instructions
The instructions at the top of each selection page SHALL lead with the desktop controls: clicking a word selects or deselects it, and right-clicking a word shows its description.

#### Scenario: Primary controls
- **WHEN** the user reaches any selection page
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
