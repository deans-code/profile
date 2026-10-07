# values-profile-format Specification

## Purpose

Defines how values appear on the profile card and in downloads as one plain list, and how value lists from earlier file formats are loaded.

## Requirements

### Requirement: Values shown as one list
The profile card, the JSON download and the Markdown download SHALL present values as a single list with no Previous or Desired grouping. In JSON, `values` SHALL be an array of names sorted alphabetically.

#### Scenario: JSON values
- **WHEN** the user downloads the JSON after selecting "Integrity" and "Curiosity"
- **THEN** `values` is `["Curiosity", "Integrity"]`

#### Scenario: Markdown and card
- **WHEN** the user views the profile card or downloads the Markdown
- **THEN** the values appear as one list under "Values", with no "Previous experience" or "Desired experience" headings for values

### Requirement: Skills unchanged
Skill pages SHALL continue to be presented, downloaded and loaded with separate previous and desired lists.

#### Scenario: Skills still grouped
- **WHEN** the user downloads the JSON
- **THEN** each skill page still has `experience` and `desired` lists

### Requirement: Loading values from any earlier format
Loading SHALL accept `values` as a plain list of names, as an object with `experience` and `desired` lists (which SHALL be merged into one list without duplicates, ignoring case), and as the list from older files that carried scores on skills. A loaded values list longer than 5 SHALL be loaded in full.

#### Scenario: Earlier object format
- **WHEN** the user loads a file whose values are `{ "experience": ["Integrity"], "desired": ["Curiosity", "integrity"] }`
- **THEN** the selected values are "Integrity" and "Curiosity"

#### Scenario: Round trip
- **WHEN** the user downloads a profile and loads it again
- **THEN** the same values and skills are selected

#### Scenario: Too many values
- **WHEN** a loaded file has 8 values
- **THEN** all 8 are selected and the values page opens asking to deselect 3
