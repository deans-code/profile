## ADDED Requirements

### Requirement: Options are checked against the sources
Each option on every tab SHALL be checked against that tab's sources, and it SHALL be offered only if at least one listed source supports it. The check SHALL record the date it was made. An option is supported when a source names it, ranks it, or shows it in current use or relevance; a source that only mentions it as obsolete does not support it.

#### Scenario: Supported option kept
- **WHEN** a listed source shows an existing option in current use
- **THEN** the option stays and records that source and the check date

#### Scenario: Unsupported option removed
- **WHEN** no listed source supports an existing option
- **THEN** it is removed from the catalog

#### Scenario: Saved profile with a removed option
- **WHEN** the user loads a saved profile containing a removed option
- **THEN** the profile loads and the option appears as a custom entry

### Requirement: Missing options are added
Options that a listed source shows to be widely used or relevant, and that are not already offered on any tab, SHALL be added to the most fitting tab and category with an accurate description, subject to a stated inclusion rule per tab that the README records.

#### Scenario: New sourced option
- **WHEN** a listed source ranks or names a technology not yet offered
- **THEN** it is added to the correct category with a description and its supporting sources

### Requirement: Descriptions are accurate and current
Every built-in option's description SHALL be consistent with the sources recorded for it and SHALL NOT describe a discontinued or renamed product as current.

#### Scenario: Renamed product
- **WHEN** a source shows an option has been renamed or superseded
- **THEN** the option name and description use the current name, and the previous spelling is not offered as a separate option

### Requirement: Data integrity is tested
Automated tests SHALL fail if any option has no sources, names a source not on its tab's list, has no description or check date, appears on more than one tab, or sits in an empty category, or if a source on a tab has no supporting option or lacks a title, publisher, address or year.

#### Scenario: Orphan source
- **WHEN** a source is listed on a tab but supports no option there
- **THEN** the tests fail

#### Scenario: Missing attribution
- **WHEN** an option is added without recorded sources
- **THEN** the tests fail
