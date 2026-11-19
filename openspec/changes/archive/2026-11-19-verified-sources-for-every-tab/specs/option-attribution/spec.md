## ADDED Requirements

### Requirement: Every option records its sources
Every built-in option on every tab SHALL be supported by at least one source from that tab's Sources list, and SHALL record all the listed sources that support it.

#### Scenario: Complete coverage
- **WHEN** every built-in option on every tab is inspected
- **THEN** each has one or more sources, and each of those is on that tab's Sources list

#### Scenario: Option in several sources
- **WHEN** an option appears in more than one listed source
- **THEN** all of those sources are recorded for it, not only the first

### Requirement: Description shows where the option came from
When the description of a built-in option is shown (right-click, the keyboard shortcut or long press), the panel SHALL include a "Sourced from" list naming every source recorded for that option, each as a link to the same address as in the tab's Sources list. Custom entries have no description panel and are unaffected.

#### Scenario: One source
- **WHEN** the user right-clicks an option supported by one source
- **THEN** the panel shows its description and "Sourced from" with that source's name as a link

#### Scenario: Several sources
- **WHEN** the user right-clicks an option supported by three sources
- **THEN** all three are listed, in the order they appear on the tab

#### Scenario: Keyboard and touch
- **WHEN** the user opens the description with the keyboard or a long press
- **THEN** the same "Sourced from" list is shown and its links are reachable by keyboard

#### Scenario: Panel behaviour unchanged
- **WHEN** the panel includes sources
- **THEN** it still closes on Escape, outside click or Close, stays on screen, and does not change the option's selection

### Requirement: Attribution does not change the profile
Sources SHALL NOT be added to the profile card, the downloaded profile or the saved-profile format.

#### Scenario: Export unchanged
- **WHEN** the user downloads their profile
- **THEN** the file contains no source information
