# Spec Delta

## Purpose

Defines what the downloaded JSON and Markdown profile files contain.

## ADDED Requirements

### Requirement: JSON contents
The JSON download SHALL contain an export timestamp and, for the values and for each of technical, engineering, interpersonal and ai, an object with an `experience` list and a `desired` list of plain names, with no scores. Lists SHALL be sorted alphabetically.

#### Scenario: JSON shape
- **WHEN** the user downloads the JSON
- **THEN** it has `values.experience`, `values.desired` and, for each of the four skill pages, `skills.<page>.experience` and `skills.<page>.desired`, each an array of strings, and no property named score

### Requirement: Markdown contents
The Markdown download SHALL list, under a heading for the values and for each skill page, a "Previous experience" list and a "Desired experience" list, omitting empty lists, with no scores.

#### Scenario: Markdown headings
- **WHEN** the user downloads the Markdown
- **THEN** each page has its heading followed by the applicable "Previous experience" and "Desired experience" lists

### Requirement: Round trip
A downloaded JSON file SHALL be loadable by the app and restore the same selections.

#### Scenario: Round trip
- **WHEN** the user downloads a profile and loads it into a fresh session
- **THEN** every page shows the same previous and desired selections
