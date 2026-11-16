# Spec Delta

## MODIFIED Requirements

### Requirement: Broader terms card at the top of each skills section
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

### Requirement: Broader terms are visually distinct
Each group SHALL be shown as one block with the broader term first, a visible caption saying the term groups the options that follow, and the options in the ordinary option style. The broader term SHALL keep its dashed border and "Broad" label, and SHALL NOT use the selected style unless selected. A page that has broader terms SHALL explain, once, that a broader term heads the group of options below it and that choosing it does not choose them. Colours SHALL meet at least 3:1 for the group border and 4.5:1 for text in light, dark and the accessibility options.

#### Scenario: Grouping is visible
- **WHEN** a skills or values page is shown
- **THEN** each broader term and its options appear together in one bordered block with a "Groups these" caption, not as separate chips in a flat list

#### Scenario: Accessible grouping
- **WHEN** a screen reader reaches a group
- **THEN** it is announced as a group named after its broader term, and the term and options are each selectable buttons with unchanged names

#### Scenario: Not colour only
- **WHEN** the page is viewed without colour
- **THEN** the grouping is still identified by the block, the caption and the "Broad" label

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
