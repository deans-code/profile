# Spec Delta

## Purpose

Loading a previously downloaded profile, in the new format and from before this change.

## ADDED Requirements

### Requirement: Load new-format profiles
The app SHALL load a JSON profile in the new format, mapping names that match built-in entries to those entries and other names to custom entries in the right option, trimming names and removing duplicates ignoring case, and keeping the existing file size, entry count and name length checks.

#### Scenario: Valid file
- **WHEN** the user loads a new-format profile
- **THEN** every page shows the file's previous and desired selections, with unknown names as custom entries

### Requirement: Load older profiles
The app SHALL load profiles downloaded before this change, in which values is a list of names and each skills list holds names with scores. Their values and skills SHALL be treated as previous experience, the scores ignored, and the AI engineering page SHALL start empty. Names no longer in a catalog SHALL load as custom entries.

#### Scenario: Older file
- **WHEN** the user loads a file in which "Python" has a score of 8
- **THEN** "Python" is selected under "Previous experience" and no score is shown

### Requirement: Invalid files rejected clearly
A file that is not JSON, is too large, lacks the required structure, or contains empty, non-text or over-long names SHALL be rejected with a message, leaving the current profile unchanged.

#### Scenario: Wrong file
- **WHEN** the user loads a file that is not a profile
- **THEN** a message explains the problem and nothing changes

### Requirement: Landing after load
After loading, the app SHALL open the Profile when the loaded profile is complete under the completion rules, otherwise the first page needing attention, with a message saying what to do, including when a values option is over its limit.

#### Scenario: Incomplete file
- **WHEN** the loaded file has no AI engineering selections in either option
- **THEN** the AI engineering page opens with a message asking for at least one selection
