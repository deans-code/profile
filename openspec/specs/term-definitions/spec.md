# term-definitions Specification

## Purpose

Lets users read a short definition of any built-in value or skill before choosing it, without leaving the page or changing their selections.

## Requirements

### Requirement: Built-in terms have definitions
The system SHALL provide a definition of one or two sentences for every built-in value and every built-in skill in every skill catalog (technical development, engineering, interpersonal and AI engineering).

#### Scenario: Complete coverage
- **WHEN** the built-in values and skill catalogs are inspected
- **THEN** each one has a non-empty definition

### Requirement: Right-click opens a definition
The system SHALL open the definition of a value or skill when the user right-clicks it, instead of the browser's context menu, and SHALL NOT change its selection state.

#### Scenario: Right-click a skill
- **WHEN** the user right-clicks "Refactoring"
- **THEN** a definition panel for "Refactoring" is shown and its selected state is unchanged

#### Scenario: Right-click a custom entry
- **WHEN** the user right-clicks a custom value or skill
- **THEN** the browser's default context menu is not suppressed and no definition panel opens

### Requirement: Definitions are reachable without a mouse
The system SHALL let keyboard users open the definition of a focused value or skill, and touch users open it with a long press.

#### Scenario: Keyboard
- **WHEN** a word has focus and the user presses the context-menu key, Shift+F10 or "?"
- **THEN** its definition panel opens

#### Scenario: Touch
- **WHEN** the user presses and holds a word for about half a second
- **THEN** its definition panel opens and the press does not toggle selection

### Requirement: Definition panel behavior
The definition panel SHALL show the word and its definition, SHALL be dismissible with Escape, a close control or by activating outside it, and SHALL return focus to the word when closed. Only one panel SHALL be open at a time.

#### Scenario: Dismiss
- **WHEN** a panel is open and the user presses Escape
- **THEN** the panel closes and focus returns to the word

#### Scenario: Switch word
- **WHEN** a panel is open and the user right-clicks a different word
- **THEN** the first panel closes and the second opens

#### Scenario: Panel stays on screen
- **WHEN** a word near a screen edge opens its panel
- **THEN** the panel is fully visible within the viewport

### Requirement: Definitions are offline and private
Definitions SHALL be available without a network connection and SHALL NOT send any data to a server.

#### Scenario: Offline
- **WHEN** the app is used with no network access after loading
- **THEN** every built-in definition still opens
