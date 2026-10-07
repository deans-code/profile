# profile-loading Specification

## Purpose

Lets users return to a profile they previously downloaded, in the current format or an earlier one, restore it in the builder, and continue editing it.

## Requirements

### Requirement: Load a saved profile
The system SHALL provide a "Load saved profile" control, available from every page, that lets the user choose a JSON profile file previously downloaded from the app and restores its values and its previous and desired skills.

#### Scenario: Successful load
- **WHEN** the user chooses a valid downloaded profile file
- **THEN** the builder's values and skills equal those in the file and the profile card is shown

#### Scenario: Round trip
- **WHEN** a profile is downloaded as JSON and loaded again
- **THEN** the profile card and a subsequent JSON download contain the same values and skills

### Requirement: Edit after loading
After a successful load the system SHALL let the user edit the profile using the normal steps, with all selections shown as in the file and every page opening on Previous experience.

#### Scenario: Edit a loaded profile
- **WHEN** the user loads a profile and chooses Edit
- **THEN** the values page shows the loaded values selected, and each skill page shows its loaded previous and desired skills under the matching option

### Requirement: Custom entries restored
Values and skills in the file that are not built-in entries SHALL be restored as custom entries on the same page, in the right option, and entries matching a built-in entry ignoring case and surrounding whitespace SHALL be restored as that built-in entry.

#### Scenario: Custom and built-in
- **WHEN** the file contains the skill "python" and "Zig" in technical development
- **THEN** "Python" is selected as the built-in skill and "Zig" appears selected under Custom

### Requirement: Load current-format profiles
The app SHALL load a JSON profile in which `values` is a list of names and each skill page has `experience` and `desired` lists of names. A missing `ai` page SHALL be treated as empty.

#### Scenario: Valid file
- **WHEN** the user loads a current-format profile
- **THEN** every skill page shows the file's previous and desired selections, with unknown names as custom entries

### Requirement: Load earlier formats
The app SHALL load profiles saved when values had two options (`values` as an object with `experience` and `desired` lists, which SHALL be merged into one list without duplicates, ignoring case) and profiles saved before experience options existed, in which each skills list holds names with scores. In the latter, values and skills SHALL be treated as previous experience, the scores ignored, and the AI engineering page SHALL start empty. Names no longer in a catalog SHALL load as custom entries.

#### Scenario: Two-option values
- **WHEN** the user loads a file whose values are `{ "experience": ["Integrity"], "desired": ["Curiosity", "integrity"] }`
- **THEN** the selected values are "Integrity" and "Curiosity"

#### Scenario: Scored file
- **WHEN** the user loads a file in which "Python" has a score of 8
- **THEN** "Python" is selected under "Previous experience" and no score is shown

### Requirement: Invalid files are rejected safely
The system SHALL reject files that are not valid JSON, do not match the exported structure, contain non-text or empty names, are larger than 1 MB, contain more than 100 entries in a list, or contain names longer than 100 characters. Rejection SHALL show a message describing the problem and SHALL leave the current profile unchanged.

#### Scenario: Not JSON
- **WHEN** the user chooses a text file that is not valid JSON
- **THEN** a message says the file is not a valid profile and the current profile is unchanged

#### Scenario: Wrong structure
- **WHEN** the file is JSON but lacks the skills pages
- **THEN** it is rejected with a message and nothing changes

### Requirement: Tolerant of harmless differences
The system SHALL ignore unknown extra properties and the `exportedAt` timestamp, remove duplicate entries ignoring case, and trim whitespace around names.

#### Scenario: Extra data
- **WHEN** the file has additional unrecognised properties and a duplicate value
- **THEN** it loads, ignoring the extra properties and keeping one copy of the value

### Requirement: Loading replaces the current profile with confirmation
Loading SHALL replace the current profile. If the user has made any selection in either option on any page, the system SHALL ask for confirmation before replacing them, and cancelling SHALL leave everything unchanged.

#### Scenario: Confirm
- **WHEN** the user has selections and chooses a valid file
- **THEN** they are asked to confirm replacing their current profile before it is replaced

#### Scenario: Cancel
- **WHEN** the user declines the confirmation
- **THEN** the current profile and page are unchanged

### Requirement: Over-limit and incomplete files
A file with more than 5 values SHALL be loaded in full and then constrained as in the selection-limits capability. A file that cannot satisfy the completion rules to reach the profile card SHALL open on the first page that needs attention, with a message saying what to do.

#### Scenario: Over-limit file
- **WHEN** the file has 8 values
- **THEN** all 8 are loaded, the values page opens, and the user is told to deselect 3 to continue

#### Scenario: Incomplete file
- **WHEN** the loaded file has no AI engineering selections in either option
- **THEN** the AI engineering page opens with a message asking for at least one selection

### Requirement: Local processing and feedback
The file SHALL be read only in the browser and never uploaded. After a load the system SHALL announce the result (success with the file name, or the error) to assistive technology, and SHALL allow choosing the same file again.

#### Scenario: Same file twice
- **WHEN** the user loads a file, edits, and loads the same file again
- **THEN** the second load is processed
