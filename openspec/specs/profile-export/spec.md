# profile-export Specification

## Purpose

Presents the finished profile as a card and lets users download it in portable JSON or Markdown formats, with values as one list and each skill page split into previous and desired experience.

## Requirements

### Requirement: Profile card summary
The system SHALL show a profile card containing the selected values as one list and, for each skill page, the previous-experience words and the desired-experience words as separate groups, omitting an empty group, and without scores.

#### Scenario: Card content
- **WHEN** the user finishes the last page
- **THEN** the card lists all selected values, and each skill page with its "Previous experience" and "Desired experience" words, with no score bars or numbers

#### Scenario: Edit from card
- **WHEN** the user chooses to edit
- **THEN** they return to the builder with all selections intact

### Requirement: JSON contents
The JSON download SHALL be a valid file containing an `exportedAt` ISO-8601 timestamp, `values` as an array of plain names sorted alphabetically, and `skills` with an object for each of technical, engineering, interpersonal and ai holding an `experience` list and a `desired` list of plain names sorted alphabetically. It SHALL NOT contain scores.

#### Scenario: JSON shape
- **WHEN** the user clicks Download JSON
- **THEN** the file has `values` as an array of strings and, for each of the four skill pages, `skills.<page>.experience` and `skills.<page>.desired`, each an array of strings, and no property named score

### Requirement: Markdown contents
The Markdown download SHALL have a title, a Values section listing the values once with no option headings, and one section for each skill page with a "Previous experience" list and a "Desired experience" list, omitting empty lists, with no scores.

#### Scenario: Markdown headings
- **WHEN** the user clicks Download Markdown
- **THEN** the Values section is a single list, and each skill page has its heading followed by the applicable "Previous experience" and "Desired experience" lists

### Requirement: Exports are local and faithful
Downloads SHALL be generated on the user's device without sending profile data to any server, and SHALL contain the same selections shown on the card, including custom entries.

#### Scenario: Custom entries exported
- **WHEN** the profile includes a custom value and a custom skill
- **THEN** both appear in the JSON and Markdown downloads

#### Scenario: Special characters
- **WHEN** a custom entry contains quotes, Markdown symbols or non-ASCII characters
- **THEN** the JSON remains valid and the Markdown renders the text literally

### Requirement: Round trip
A downloaded JSON file SHALL be loadable by the app and restore the same selections.

#### Scenario: Round trip
- **WHEN** the user downloads a profile and loads it into a fresh session
- **THEN** the values and every skill page show the same selections, previous and desired
