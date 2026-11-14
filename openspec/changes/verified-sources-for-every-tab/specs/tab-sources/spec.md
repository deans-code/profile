## ADDED Requirements

### Requirement: Sources are shown under their own tab
Each of the Values, Technical development, Engineering, Interpersonal and AI engineering tabs SHALL show a "Sources" list below its content naming the sources that tab's options draw on, each as a link with its publisher and year or edition. A source SHALL appear only on the tabs it supports, and a source supporting several tabs SHALL appear on each of them. The Profile page SHALL show no sources list.

#### Scenario: Sources differ by tab
- **WHEN** the user moves from Technical development to Interpersonal
- **THEN** the Sources list changes to the sources for Interpersonal, and sources that only support technology are not shown

#### Scenario: Shared source
- **WHEN** a source supports both Technical development and AI engineering
- **THEN** it is listed on both tabs

#### Scenario: Links open the source
- **WHEN** the user activates a source link
- **THEN** the source opens in a new tab without leaving the app

### Requirement: Each tab has several credible, current sources
Each tab SHALL list at least three sources. A source SHALL qualify only if it is published by an identifiable organisation, shows current usage or relevance (or recent adoption still in use) within roughly the last two years, is publicly reachable at the listed address, and permits being linked and credited. The Sources list SHALL state that the sources guided which options are offered and that their data is not reproduced.

#### Scenario: Minimum per tab
- **WHEN** the sources for any tab are inspected
- **THEN** there are at least three, each with publisher, title, address and year

#### Scenario: Stale source rejected
- **WHEN** a candidate source's latest edition is older than two years and is not a standing framework
- **THEN** it is not listed for that tab

### Requirement: Source terms are respected
Sources SHALL be linked and credited without reproducing their data or altering their content, including sources published under no-derivatives terms.

#### Scenario: No source data in the app
- **WHEN** the app's sources and options are inspected
- **THEN** they contain source names and links but no figures, rankings or text copied from a source
