# Spec Delta

## MODIFIED Requirements

### Requirement: Plain-language messages
Every user-facing status, blocked, limit and load message SHALL be written in plain language, say what happened, and say what the user can do next. Messages SHALL NOT use internal terms or bare codes. No message SHALL say a skill page needs a selection.

#### Scenario: Blocked by an empty values page
- **WHEN** the user has selected no values and a later step is unavailable
- **THEN** the message reads as an instruction such as "Choose at least one value to unlock the next step", not a bare statement of state

#### Scenario: Blocked by an empty skill page
- **WHEN** a skill page has no selection and the values are valid
- **THEN** no blocked message about that page is shown
