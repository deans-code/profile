## ADDED Requirements

### Requirement: Values cover work and life contexts
The system SHALL offer values that apply to each of: doing good work; building and delivering products with a computer; working in a team; working with others such as customers, colleagues and partners; working alone or remotely; adopting new ways of working; learning and growth; business and organisational life; personal character; a person's place in the world and society; and what a person expects from others.

#### Scenario: Every context is represented
- **WHEN** the Values tab is shown
- **THEN** each context has a group with at least six values, each described and attributed to a source on the tab

### Requirement: Values are grouped by where they apply
The system SHALL present the Values tab in groups named for those contexts, replacing the groupings by source framework, and a value that suits several contexts SHALL appear once, in the context it best fits.

#### Scenario: One value, one group
- **WHEN** a value is named by several sources or fits several contexts
- **THEN** it appears in a single group and lists all supporting sources

### Requirement: Value sources include work and software references
The system SHALL draw values from sources that speak to work and software delivery, such as the Agile Manifesto, Extreme Programming, the ACM/IEEE-CS Software Engineering Code of Ethics, DevOps and lean literature, and workplace-values references, as well as the personal and world values frameworks already used.

#### Scenario: Work-related value attributed
- **WHEN** a value such as simplicity, feedback or responsible disclosure is offered
- **THEN** it cites a work or software source listed on the Values tab
