## ADDED Requirements

### Requirement: Plain-language messages
Every user-facing status, blocked, limit and load message SHALL be written in plain language, say what happened, and say what the user can do next. Messages SHALL NOT use internal terms or bare codes.

#### Scenario: Blocked by an empty values page
- **WHEN** the user has selected no values and a later step is unavailable
- **THEN** the message reads as an instruction such as "Choose at least one value to unlock the next step", not a bare statement of state

#### Scenario: Blocked by an empty skill page
- **WHEN** the Profile step is unavailable because skill pages have no selection
- **THEN** the message names each page that still needs a selection and tells the user to pick at least one skill on each

### Requirement: Limit messages state the fix
When a selection limit is reached or exceeded, the message SHALL state the count, the limit, and the exact action needed (how many words to deselect, or that another cannot be added until one is deselected).

#### Scenario: Over the limit
- **WHEN** the user has 7 values selected and the limit is 5
- **THEN** the message says 7 of 5 are selected and to deselect 2 values to continue

#### Scenario: At the limit
- **WHEN** the user has exactly 5 values selected
- **THEN** the message says the limit is reached and to deselect a value to choose another

### Requirement: Prominent blocked reason
When the user cannot continue, the reason SHALL be shown as a clearly visible callout next to the Continue control, with text contrast that meets WCAG AA in both light and dark themes, and SHALL be announced to assistive technology.

#### Scenario: Reason is visible and announced
- **WHEN** an earlier page is incomplete and the user is on a later page
- **THEN** a callout with the reason is displayed beside the Continue control and is exposed as a status message

### Requirement: Load outcome messages
Loading a saved profile SHALL report its outcome in plain language: what was loaded, what was wrong with a rejected file and that the current profile is unchanged, and, when the loaded profile opens on a page needing attention, what to do there. Success, error and information messages SHALL be visually distinguishable without relying on colour alone.

#### Scenario: Rejected file
- **WHEN** the user chooses a file that is not a valid profile
- **THEN** the message names the file, says in plain words why it was not loaded, and says the current profile is unchanged

#### Scenario: Not by colour alone
- **WHEN** a success or error message is shown
- **THEN** it carries a text or icon label ("Loaded", "Could not load") in addition to any colour
