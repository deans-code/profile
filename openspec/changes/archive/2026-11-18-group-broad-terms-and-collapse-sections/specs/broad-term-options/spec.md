## MODIFIED Requirements

### Requirement: Broader terms are selectable options
A broader term SHALL be selectable like any skill or value, separately for previous and desired experience, SHALL appear in the profile and export, and SHALL be mutually exclusive with the options it covers: selecting a broader term SHALL deselect every option it covers, and selecting an option SHALL deselect every broader term that covers it. Deselecting SHALL change only the item deselected. The rule SHALL apply within the experience option being edited, and on the values page.

#### Scenario: Select a broader term
- **WHEN** the user selects "CI/CD" as previous experience
- **THEN** "CI/CD" is selected and counted, and "Jenkins" is not selected

#### Scenario: Independent of covered options
- **WHEN** the user selects "CI/CD" and then "Jenkins"
- **THEN** only "Jenkins" is kept; the two are no longer kept together, and deselecting "Jenkins" does not reselect "CI/CD"

#### Scenario: Selecting a term deselects its options
- **WHEN** the user has selected "Jenkins" and "GitHub Actions" as previous experience and then selects "CI/CD"
- **THEN** "CI/CD" is selected and "Jenkins" and "GitHub Actions" are deselected

#### Scenario: Selecting an option deselects its term
- **WHEN** the user has selected "CI/CD" and then selects "Jenkins"
- **THEN** "Jenkins" is selected and "CI/CD" is deselected

#### Scenario: Option in another category
- **WHEN** the user has selected "CI/CD" and selects an option it covers that is shown in a different category
- **THEN** "CI/CD" is deselected

#### Scenario: Overlapping terms
- **WHEN** an option is covered by two selected broader terms and the user selects it
- **THEN** both broader terms are deselected

#### Scenario: Other experience option unaffected
- **WHEN** the user selects "CI/CD" as previous experience
- **THEN** "Jenkins" selected as desired experience stays selected

#### Scenario: Deselecting
- **WHEN** the user deselects "CI/CD"
- **THEN** no option changes

#### Scenario: Values page
- **WHEN** the user selects "Honesty" and then "Honesty and ethics"
- **THEN** "Honesty and ethics" is selected, "Honesty" is deselected, and the status shows 1 value

#### Scenario: Limit still applies
- **WHEN** the values page is at its limit of 10 and the user selects an unselected broader value
- **THEN** the selection does not change

### Requirement: Broader terms are visually distinct
Each group SHALL be shown as one block with a solid border, the broader term first, a visible caption saying the term groups the options that follow, and the options in the ordinary option style. The broader term SHALL have a solid border and a "Broad" label, and SHALL NOT use the selected style unless selected. A page that has broader terms SHALL explain, once, that a broader term heads the group of options below it and that choosing it deselects them (and choosing one of them deselects it). Colours SHALL meet at least 3:1 for the group border and 4.5:1 for text in light, dark and the accessibility options.

#### Scenario: Grouping is visible
- **WHEN** a skills or values page is shown
- **THEN** each broader term and its options appear together in one solid-bordered block with a "Groups these" caption, not as separate chips in a flat list

#### Scenario: Accessible grouping
- **WHEN** a screen reader reaches a group
- **THEN** it is announced as a group named after its broader term, and the term and options are each selectable buttons with unchanged names

#### Scenario: Not colour only
- **WHEN** the page is viewed without colour
- **THEN** the grouping is still identified by the block, the caption and the "Broad" label

#### Scenario: Explained once
- **WHEN** a page with broader terms is shown
- **THEN** one note explains that choosing a broader term deselects the options below it and the reverse
