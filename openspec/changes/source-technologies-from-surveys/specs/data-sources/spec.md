## ADDED Requirements

### Requirement: Sources list on every page
The app SHALL show a "Sources" list at the bottom of every page, naming the three sources the technology catalog draws on, each as a link that opens the source: the Stack Overflow Developer Survey 2026 technology data, the JetBrains Developer Ecosystem 2026 tools and trends report, and the State of Cloud Native Development Q1 2026 report.

#### Scenario: Sources visible
- **WHEN** the user opens any step, including the Profile
- **THEN** a "Sources" list with the three links appears below the page content and the step controls

#### Scenario: Links open the sources
- **WHEN** the user activates a source link
- **THEN** it opens that source's address in a new tab without leaving the app

### Requirement: Attribution
The Sources list SHALL credit each source's publisher (Stack Overflow, JetBrains, and SlashData with the Cloud Native Computing Foundation for the cloud native report) and SHALL state that the catalog uses these sources only as a guide to which technologies are widely used, without reproducing their data.

#### Scenario: Credits present
- **WHEN** the Sources list is displayed
- **THEN** each entry names its publisher and the list states that the sources guided which technologies appear

### Requirement: Sources in the README
The README SHALL list the same three sources with links and publishers, and SHALL explain the rule used to choose catalog entries from them.

#### Scenario: README lists sources
- **WHEN** a reader opens the README
- **THEN** a Sources section lists the three links with publishers and states the selection rule

### Requirement: Sources do not affect the profile
The Sources list SHALL NOT appear in, or change, the profile card, downloads, saved-profile format, step order or completion rules.

#### Scenario: Downloads unchanged
- **WHEN** the user downloads their profile
- **THEN** the file contains no sources content
