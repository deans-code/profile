# Spec Delta

## Purpose

Lets users return to a profile they previously downloaded, restore it in the builder, and continue editing it.

## ADDED Requirements

### Requirement: Load a saved profile
The system SHALL provide a "Load saved profile" control, available from every page, that lets the user choose a JSON profile file previously downloaded from the app and restores its values, skills and scores.

#### Scenario: Successful load
- **WHEN** the user chooses a valid downloaded profile file
- **THEN** the builder's values, skills and scores equal those in the file and the profile card is shown

#### Scenario: Round trip
- **WHEN** a profile is downloaded as JSON and loaded again
- **THEN** the profile card and a subsequent JSON download contain the same values, skills and scores

### Requirement: Edit after loading
After a successful load the system SHALL let the user edit the profile using the normal steps, with all selections and scores shown as in the file.

#### Scenario: Edit a loaded profile
- **WHEN** the user loads a profile and chooses Edit
- **THEN** the values step shows the loaded values selected, each skill section shows its loaded skills selected, and the scoring step shows the loaded scores

### Requirement: Custom entries restored
Values and skills in the file that are not built-in entries SHALL be restored as custom entries in the same list, and entries matching a built-in entry ignoring case and surrounding whitespace SHALL be restored as that built-in entry.

#### Scenario: Custom and built-in
- **WHEN** the file contains the skill "python" and "Zig" in technical development
- **THEN** "Python" is selected as the built-in skill and "Zig" appears selected under Custom

### Requirement: Invalid files are rejected safely
The system SHALL reject files that are not valid JSON, do not match the exported structure, contain non-text names, contain scores that are not whole numbers from 1 to 10, are larger than 1 MB, contain more than 100 entries in a list, or contain names longer than 100 characters. Rejection SHALL show a message describing the problem and SHALL leave the current profile unchanged.

#### Scenario: Not JSON
- **WHEN** the user chooses a text file that is not valid JSON
- **THEN** a message says the file is not a valid profile and the current profile is unchanged

#### Scenario: Wrong structure
- **WHEN** the file is JSON but lacks the skills sections
- **THEN** it is rejected with a message and nothing changes

#### Scenario: Bad score
- **WHEN** a score in the file is 11 or 4.5
- **THEN** the file is rejected naming the skill with the invalid score

### Requirement: Tolerant of harmless differences
The system SHALL ignore unknown extra properties and the `exportedAt` timestamp, remove duplicate entries ignoring case, and trim whitespace around names.

#### Scenario: Extra data
- **WHEN** the file has additional unrecognised properties and a duplicate value
- **THEN** it loads, ignoring the extra properties and keeping one copy of the value

### Requirement: Loading replaces the current profile with confirmation
Loading SHALL replace the current profile. If the user has made any selections, the system SHALL ask for confirmation before replacing them, and cancelling SHALL leave everything unchanged.

#### Scenario: Confirm
- **WHEN** the user has selections and chooses a valid file
- **THEN** they are asked to confirm replacing their current profile before it is replaced

#### Scenario: Cancel
- **WHEN** the user declines the confirmation
- **THEN** the current profile and page are unchanged

### Requirement: Over-limit and incomplete files
A file with more than 10 entries in a list SHALL be loaded in full and then constrained as in the selection-limits capability. A file that cannot satisfy the requirements to reach the profile card (for example an empty list) SHALL open on the first page that needs attention, with a message.

#### Scenario: Over-limit file
- **WHEN** the file has 12 values
- **THEN** all 12 are loaded, the values page opens, and the user is told to deselect 2 to continue

### Requirement: Local processing and feedback
The file SHALL be read only in the browser and never uploaded. After a load the system SHALL announce the result (success with the file name, or the error) to assistive technology, and SHALL allow choosing the same file again.

#### Scenario: Same file twice
- **WHEN** the user loads a file, edits, and loads the same file again
- **THEN** the second load is processed
