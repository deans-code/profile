# Spec Delta

## Purpose

Lets users select a broader term, such as CI/CD, instead of naming specific technologies or practices, while keeping every individual option available.

## ADDED Requirements

### Requirement: Broader terms card at the top of each skills section
Each of the technical, engineering, interpersonal and AI engineering pages SHALL show a "Broader terms" card before its category cards, offering at least 8 broader terms, each covering at least 3 individual options that remain listed in their existing category cards.

#### Scenario: Card shown first
- **WHEN** the user opens any of the four skills pages
- **THEN** a "Broader terms" card appears above the category cards, with at least 8 terms, and the individual options remain in their categories

#### Scenario: Example term
- **WHEN** the user opens the technical page
- **THEN** "CI/CD" is among the broader terms and tools such as Jenkins and GitHub Actions are still listed in their categories

### Requirement: Broader terms are selectable options
A broader term SHALL be selectable like any skill, separately for previous and desired experience, SHALL appear in the profile and export, and SHALL NOT select or deselect the options it covers.

#### Scenario: Select a broader term
- **WHEN** the user selects "CI/CD" as previous experience
- **THEN** "CI/CD" is selected and counted, and "Jenkins" is not selected

#### Scenario: Independent of covered options
- **WHEN** the user selects both "CI/CD" and "Jenkins"
- **THEN** both are kept in the profile, and deselecting one leaves the other selected

### Requirement: Broader terms are visually distinct
Broader terms SHALL be shown in a different colour from other options, SHALL be identifiable without colour (a card heading and caption, and the same selected indicator as other options), and SHALL meet WCAG AA contrast in light, dark and the accessibility options.

#### Scenario: Different colour
- **WHEN** a skills page is shown
- **THEN** broader-term options use a colour that differs from the other options and from the page's accent

#### Scenario: Contrast
- **WHEN** the colours of a broader term, selected or not, are checked in each theme
- **THEN** its text has at least 4.5:1 contrast against its background and its border and selected state at least 3:1

### Requirement: Broader terms have definitions covering their options
Each broader term SHALL have a definition, reachable the same ways as other definitions, that names the individual options it covers.

#### Scenario: Definition lists covered options
- **WHEN** the user right-clicks "CI/CD"
- **THEN** a definition opens that explains the term and names the options it covers, such as Jenkins

### Requirement: Broader terms are filtered and loaded like other options
The page filter SHALL match broader terms by name, hiding the card when none match, and a saved profile containing a broader term's name SHALL load it as that built-in option in the right section.

#### Scenario: Filter
- **WHEN** the user types "ci" in the technical filter
- **THEN** "CI/CD" shows in the Broader terms card together with other matching options

#### Scenario: Load
- **WHEN** a saved profile lists "ci/cd" under technical skills
- **THEN** it loads as the built-in "CI/CD", not as a custom skill

### Requirement: Broader term names are unique
A broader term name SHALL NOT match, ignoring case, any individual option, value or other broader term, in any section.

#### Scenario: Duplicate name
- **WHEN** the catalog is checked
- **THEN** no broader term shares its name with any other built-in option or broader term
