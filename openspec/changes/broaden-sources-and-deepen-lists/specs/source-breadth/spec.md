## ADDED Requirements

### Requirement: Each tab lists at least six sources
The system SHALL list at least six sources in each tab's Sources section for Values, Technical development, Engineering, Interpersonal and AI engineering, and each listed source SHALL support at least one option on that tab.

#### Scenario: Source count per tab
- **WHEN** the registry's per-tab lists are read
- **THEN** each of the five tabs lists six or more distinct registered sources

#### Scenario: No unused source
- **WHEN** a source is listed on a tab
- **THEN** at least one option on that tab is attributed to it

### Requirement: Older sources are accepted when still in use
The system SHALL accept a source older than two years when it is a standing framework, standard, reference work or survey series that is still in use, and SHALL reject a source that has been superseded, withdrawn or is no longer in use. Each source SHALL record its year or edition.

#### Scenario: Standing framework
- **WHEN** a framework published before 2024, such as the Agile Manifesto or ISO/IEC 25010, is still current
- **THEN** it may be listed with its year or edition

#### Scenario: Superseded source
- **WHEN** a newer edition of a source exists and has been read
- **THEN** the older edition is not listed

### Requirement: Wikipedia is an accepted source
The system SHALL accept a Wikipedia article or list as a source when it lists the items being offered and cites its own references, and SHALL credit it by article title, link, edit date and CC BY-SA 4.0 licence. The system SHALL NOT copy article text.

#### Scenario: Wikipedia list credited
- **WHEN** a Wikipedia article supports an option
- **THEN** the option's "Sourced from" list links to that article and the README records its edit date and licence

### Requirement: Sources are read before they are listed
The system SHALL list a source only after its page has been fetched and read for the tab, and SHALL record sources that could not be read or whose terms forbid linking in the README as rejected, with the reason.

#### Scenario: Unreadable source
- **WHEN** a candidate source refuses automated access
- **THEN** it is not listed and the README names it with the reason
