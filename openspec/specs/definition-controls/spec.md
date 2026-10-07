# definition-controls Specification

## Purpose

Makes the controls that open and close word definitions behave reliably across mouse, keyboard and touch, correcting faults found in an audit of the original implementation.

## Requirements

### Requirement: Long-press never swallows a later selection
A touch long-press that opens a definition SHALL suppress only the click belonging to that press, and SHALL NOT affect any later click, tap or keyboard activation, even when the press ends without a click.

#### Scenario: Press ends without a click
- **WHEN** the user long-presses a word, the definition opens, and the finger is released away from the word with no click
- **THEN** the next click on any word selects it normally

#### Scenario: Mouse after touch
- **WHEN** a long-press opened a definition and the user next uses a mouse to click a word
- **THEN** the word toggles

### Requirement: Panel survives viewport changes that are not scrolling
An open definition panel SHALL NOT be dismissed by viewport resizes caused by browser chrome (such as a mobile address bar showing or hiding), and SHALL stay on screen and attached to its word when the viewport changes. It MAY close when the user scrolls the page.

#### Scenario: Address bar hides
- **WHEN** a definition is open and the viewport height changes without the word moving off screen
- **THEN** the panel stays open and is repositioned within the viewport

### Requirement: Panel closes when its word goes away
The system SHALL close any open definition when the user changes section or when the word it describes is no longer shown.

#### Scenario: Section change by keyboard
- **WHEN** a definition is open and the user changes section using the keyboard
- **THEN** the panel is closed and no panel remains for a word that is not on screen

#### Scenario: Filter hides the word
- **WHEN** a definition is open and the user's filter removes that word from view
- **THEN** the panel closes

### Requirement: Words advertise and associate definitions
Words with a definition SHALL indicate to assistive technology that a definition panel is available, and the open panel SHALL be programmatically associated with its word.

#### Scenario: Association
- **WHEN** a definition panel is open for a word
- **THEN** the word references the panel and the panel is labelled with the word's name

### Requirement: Controls match the instructions
The instructions shown on each selection page SHALL describe controls that work as stated, and each described control SHALL be covered by an automated test.

#### Scenario: Documented controls work
- **WHEN** a word is right-clicked, or focused and sent "?", the context-menu key or Shift+F10, or long-pressed
- **THEN** its definition opens without changing its selection state
