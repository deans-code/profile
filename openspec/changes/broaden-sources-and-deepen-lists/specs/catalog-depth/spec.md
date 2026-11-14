## ADDED Requirements

### Requirement: Each source is read in full for its tab
The system SHALL offer, for each listed source, every option that source names for that tab and that meets the tab's inclusion rule, not only its headline entries, and SHALL give each a description and attribute it to every listed source that names it.

#### Scenario: Complete coverage of a source
- **WHEN** a source is read for a tab
- **THEN** each worthwhile item it names is offered, or the README records why it was left out

### Requirement: Tab lists meet minimum sizes
The system SHALL offer at least 150 options on Values, 250 on Technical development, 120 on Engineering, 100 on Interpersonal and 120 on AI engineering.

#### Scenario: Size check
- **WHEN** the catalog is loaded
- **THEN** each tab offers at least its minimum number of options

### Requirement: Small groups are combined
The system SHALL NOT show a group of fewer than six options, and SHALL merge any such group into the closest related group, unless the README records why merging would mix unrelated things.

#### Scenario: Group size check
- **WHEN** the catalog is loaded
- **THEN** every group on every tab has six or more options, or is listed as an exception in the README

#### Scenario: Merged group names
- **WHEN** groups are merged
- **THEN** the merged group has a name that describes all its options and each option keeps its sources

### Requirement: Older saved profiles still load
The system SHALL load saved profiles that contain options or group names removed, renamed or merged by this change, treating names not in the catalog as custom entries.

#### Scenario: Removed option name
- **WHEN** a saved profile names an option no longer offered
- **THEN** it loads as a custom entry and nothing is lost
