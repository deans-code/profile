# broad-term-options Specification

## Purpose
Lets users select a broader term, such as CI/CD, instead of naming specific technologies or practices, while keeping every individual option available.

## Requirements

### Requirement: Broader terms head groups of their options
Each of the values page and the technical, engineering, interpersonal and AI engineering pages SHALL show each broader term inside the category card that holds most of the options it covers, as the head of a group that also contains the options it covers that belong to that card. Each option SHALL be shown once: under the covering term with the shortest list of covered options (ties going to the term listed first), or among the card's other options when no term covers it. Every broader term SHALL head at least two options. Options covered by a term but belonging to another category SHALL stay in their own category. No separate "Broader terms" card SHALL be shown.

#### Scenario: Group in the category
- **WHEN** the user opens the technical page
- **THEN** in "Containers, infrastructure and delivery" the term "CI/CD" is followed in its group by options such as Jenkins and GitHub Actions, and those options are not listed again elsewhere on the page

#### Scenario: Overlapping terms
- **WHEN** an option is covered by two terms in the same category
- **THEN** it is shown once, under the term with the shorter covers list

#### Scenario: Unclaimed options
- **WHEN** a card has options that no term covers
- **THEN** they are shown below the groups under an "Other options" line

#### Scenario: Every term has a group
- **WHEN** the catalog is checked
- **THEN** every broader term heads at least two options in its own category

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

### Requirement: Broader terms have definitions covering their options
Each broader term SHALL have a definition, reachable the same ways as other definitions, that names the individual options it covers.

#### Scenario: Definition lists covered options
- **WHEN** the user right-clicks "CI/CD"
- **THEN** a definition opens that explains the term and names the options it covers, such as Jenkins

### Requirement: Broader terms are filtered and loaded like other options
The page filter SHALL match broader terms and options by name. A group SHALL be shown when its term or any of its options match, with only the matching options visible and the term shown for context; the match count SHALL count only words that match. A card SHALL be hidden when none of its words match. A saved profile containing a broader term's name SHALL load it as that built-in option in the right section.

#### Scenario: Filter on an option
- **WHEN** the user types "jenkins" in the technical filter
- **THEN** the group headed "CI/CD" shows with Jenkins visible, and the status counts one match

#### Scenario: Filter on a term
- **WHEN** the user types "ci/cd"
- **THEN** the "CI/CD" group shows with its term and its options matching "ci/cd", and cards with no match are hidden

#### Scenario: Load
- **WHEN** a saved profile lists "ci/cd" under technical skills
- **THEN** it loads as the built-in "CI/CD", not as a custom skill

### Requirement: Broader term names are unique
A broader term name SHALL NOT match, ignoring case, any individual option, value or other broader term, in any section.

#### Scenario: Duplicate name
- **WHEN** the catalog is checked
- **THEN** no broader term shares its name with any other built-in option or broader term

### Requirement: Broader values on the values page
The values page SHALL offer at least 20 broader values, each covering at least 3 individual values and shown, like broader skill terms, as the head of a group inside the category card that holds most of the values it covers, with the same dashed border, "Broad" label and explanatory note. A broader value SHALL be selectable, SHALL count toward the limit of 5 to 10 values, SHALL appear in the profile and export, and SHALL NOT select the values it covers.

#### Scenario: Placed in its category
- **WHEN** the user opens the values page
- **THEN** "Honesty and ethics" heads a group in "Personal character" and is labelled "Broad", and Honesty and Integrity are listed in that group

#### Scenario: Counts toward the limit
- **WHEN** the user has selected 10 values including one broader value
- **THEN** no further value can be selected until one is deselected, and the status shows 10 of 10

#### Scenario: Independent of covered values
- **WHEN** the user selects "Honesty and ethics" and "Honesty"
- **THEN** both are kept and counted, and deselecting one leaves the other selected

#### Scenario: Definition
- **WHEN** the user opens the definition of "Learning and self-development"
- **THEN** it explains the term and names the values it covers, such as Curiosity

#### Scenario: Load
- **WHEN** a saved profile lists "honesty and ethics" under values
- **THEN** it loads as the built-in "Honesty and ethics", not as a custom value

### Requirement: Every category has broader terms
Every category card on the values page and the four skills pages SHALL contain at least two broader terms, or one if the category lists fewer than 8 options, each covering at least 3 of the options on that page. A broader term MAY cover options that another broader term also covers.

#### Scenario: Previously empty categories
- **WHEN** the user opens the technical page
- **THEN** "Editors and IDEs" and "Game development and graphics" each show at least two broader terms heading groups in their cards, and their options are still listed

#### Scenario: Coverage check
- **WHEN** the catalog is checked
- **THEN** every category has the required number of broader terms and every covered name exists in the same page's catalog

### Requirement: Broader term names are unique across values and skills
A broader term name SHALL NOT match, ignoring case, any value, skill or other broader term on any page.

#### Scenario: Duplicate name
- **WHEN** the catalog is checked
- **THEN** no broader value or skill term shares a name with any other built-in option or term
