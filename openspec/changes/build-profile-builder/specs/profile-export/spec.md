# Spec Delta

## Purpose

Presents the finished profile as a card and lets users download it in portable JSON or Markdown formats.

## ADDED Requirements

### Requirement: Profile card summary
The system SHALL, after scoring, show a profile card containing the selected values and, for each skill section, the selected skills with their scores.

#### Scenario: Card content
- **WHEN** the user finishes scoring
- **THEN** the card lists all selected values, and each section's skills with scores, ordered by score descending then name

#### Scenario: Edit from card
- **WHEN** the user chooses to edit
- **THEN** they return to the builder with all selections and scores intact

### Requirement: Download as JSON
The system SHALL provide a button that downloads the profile as a valid JSON file.

#### Scenario: JSON content
- **WHEN** the user clicks Download JSON
- **THEN** a `.json` file is downloaded with `values` (array of strings) and `skills` containing `technical`, `engineering` and `interpersonal` arrays of `{ "name", "score" }` objects, plus an `exportedAt` ISO-8601 timestamp

### Requirement: Download as Markdown
The system SHALL provide a button that downloads the profile as a Markdown file.

#### Scenario: Markdown content
- **WHEN** the user clicks Download Markdown
- **THEN** a `.md` file is downloaded with a title, a Values section, and one section per skill group listing each skill with its score as "name — score/10"

### Requirement: Exports are local and faithful
Downloads SHALL be generated on the user's device without sending profile data to any server, and SHALL contain the same selections and scores shown on the card, including custom entries.

#### Scenario: Custom entries exported
- **WHEN** the profile includes a custom value and a custom skill
- **THEN** both appear in the JSON and Markdown downloads

#### Scenario: Special characters
- **WHEN** a custom entry contains quotes, Markdown symbols or non-ASCII characters
- **THEN** the JSON remains valid and the Markdown renders the text literally
