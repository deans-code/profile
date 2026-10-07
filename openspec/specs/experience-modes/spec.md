# experience-modes Specification

## Purpose

Lets users record both what they have already done and what they want to do, on every skill page. Values are chosen once and have no options.

## Requirements

### Requirement: Two experience options on every skill page
Each skill page (technical development, engineering, interpersonal and AI engineering) SHALL offer exactly two options: "Previous experience" and "Desired experience". The values page does not offer them. Exactly one SHALL be active, visibly indicated and exposed to assistive technology as the selected option.

#### Scenario: Options shown
- **WHEN** the user opens any skill page
- **THEN** the page shows a "Previous experience" option and a "Desired experience" option, and "Previous experience" is active whenever the page is opened

#### Scenario: Switching option
- **WHEN** the user activates "Desired experience"
- **THEN** the page shows the selections made for desired experience, and clicking a word changes only that list

### Requirement: Independent selections
The previous-experience and desired-experience selections SHALL be independent: a word MAY be selected in either, both or neither, and selecting or deselecting in one SHALL NOT change the other.

#### Scenario: Same word in both lists
- **WHEN** the user selects "Python" under "Previous experience" and then under "Desired experience"
- **THEN** "Python" is selected in both lists, and deselecting it under "Desired experience" leaves it selected under "Previous experience"

### Requirement: Counts for both options
Each option SHALL display how many words are selected in it, so the user can see both counts without switching.

#### Scenario: Counts visible
- **WHEN** the user has 3 previous-experience and 5 desired-experience words on a page
- **THEN** the "Previous experience" option shows 3 and the "Desired experience" option shows 5

### Requirement: Skill pages have their own limits
Skill pages SHALL have no limit in either option. A custom entry SHALL be added to the active option's list and selected in it only.

#### Scenario: Custom entry
- **WHEN** the user adds the custom skill "Zig" while "Desired experience" is active
- **THEN** "Zig" appears in the Custom group, selected for desired experience only

### Requirement: Instructions describe the options
The instructions on each skill page SHALL state which option is active and that the other option is selected separately.

#### Scenario: Instruction text
- **WHEN** the user reads the instructions on any skill page
- **THEN** they name the active option and say the other option has its own selections
