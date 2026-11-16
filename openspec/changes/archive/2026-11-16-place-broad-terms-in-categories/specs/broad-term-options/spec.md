# Spec Delta

## MODIFIED Requirements

### Requirement: Broader terms card at the top of each skills section
Each of the technical, engineering, interpersonal and AI engineering pages SHALL show at least 8 broader terms, each covering at least 3 individual options. Each broader term SHALL appear inside the existing category card that holds most of the options it covers (ties going to the category listed first), before that card's other options, and SHALL NOT appear in a separate card. The individual options SHALL remain listed in their categories.

#### Scenario: Placed in its category
- **WHEN** the user opens the technical page
- **THEN** "CI/CD" is the first option in the "Containers, infrastructure and delivery" card, "Relational databases" is first in the "Databases" card, and there is no card headed "Broader terms"

#### Scenario: Options remain
- **WHEN** the user opens the technical page
- **THEN** Jenkins and GitHub Actions are still listed in the same card as "CI/CD"

#### Scenario: Every term has a category
- **WHEN** the catalog is checked
- **THEN** every broader term resolves to exactly one existing category with no tie

### Requirement: Broader terms are visually distinct
Unselected broader terms SHALL differ from ordinary options by a dashed border in a dedicated colour and a visible "Broad" label, and SHALL NOT use the selected style. Selected broader terms SHALL use the same selected style as every other option. A page that has broader terms SHALL explain, once, that dashed options are broader terms that do not select the options they cover. The dedicated colour SHALL differ from every section accent and from the selected colours, and the border SHALL have at least 3:1 contrast and the label at least 4.5:1 in light, dark and the accessibility options.

#### Scenario: Unselected is not selected-looking
- **WHEN** a skills page is shown with nothing selected
- **THEN** broader terms have a dashed border and a "Broad" label, and no tinted background or check mark

#### Scenario: Selected matches others
- **WHEN** the user selects "CI/CD" and "Jenkins"
- **THEN** both show the same accent border, tint and check mark

#### Scenario: Not colour only
- **WHEN** the page is viewed without colour
- **THEN** broader terms are still identified by the dashed border and the "Broad" label

#### Scenario: Contrast
- **WHEN** the broader-term border and label colours are checked in each theme
- **THEN** the border has at least 3:1 and the label at least 4.5:1 contrast against the chip background

### Requirement: Broader terms are filtered and loaded like other options
The page filter SHALL match broader terms by name within their category cards, hiding a card when none of its options match, and a saved profile containing a broader term's name SHALL load it as that built-in option in the right section.

#### Scenario: Filter
- **WHEN** the user types "ci" in the technical filter
- **THEN** "CI/CD" shows in its category card together with other matching options

#### Scenario: Load
- **WHEN** a saved profile lists "ci/cd" under technical skills
- **THEN** it loads as the built-in "CI/CD", not as a custom skill
