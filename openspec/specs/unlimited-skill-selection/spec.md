# unlimited-skill-selection Specification

## Purpose

Lets users select as many skills as apply on each of the technical development, engineering, interpersonal and AI engineering pages, in either experience option.

## Requirements

### Requirement: No limit on skill selection
The system SHALL NOT limit how many skills can be selected on the technical development, engineering, interpersonal or AI engineering pages, including custom skills.

#### Scenario: Select many skills
- **WHEN** the user selects 25 skills in the technical development section
- **THEN** all 25 are selected and none is refused

#### Scenario: Custom skills unrestricted
- **WHEN** the user has selected 15 skills and adds a custom skill
- **THEN** the custom skill is added and selected

### Requirement: Skill pages show a plain count
Each skill section SHALL show how many skills are selected ("n selected") without a limit, and SHALL NOT show limit messages, dimmed unavailable words or a disabled Add control because of a count.

#### Scenario: Count only
- **WHEN** the user has selected 12 skills on a skill page
- **THEN** the page shows "12 selected", no word is dimmed, and the Add control is enabled

### Requirement: Loaded profiles with many skills
Loading a saved profile SHALL accept any number of skills per section up to the file-format maximum of 100 entries per list, and SHALL NOT require the user to deselect skills to continue.

#### Scenario: Many skills load
- **WHEN** a saved profile has 40 technical development skills
- **THEN** all 40 are loaded, the profile card opens, and the user is not asked to deselect any

### Requirement: Values limit unaffected by skills
The limit of 5 values SHALL remain independent of skill selections, including for loaded profiles with more than 5 values.

#### Scenario: Over-limit values still gated
- **WHEN** a loaded profile has 8 values and 30 skills
- **THEN** the values page opens and asks the user to deselect 3 values, and the skills are loaded in full

### Requirement: Many skills on the profile
The profile card and the downloads SHALL include every selected skill however many are selected.

#### Scenario: Many skills exported
- **WHEN** 30 skills are selected across the skill pages
- **THEN** the profile card shows all 30 and the JSON and Markdown downloads contain all 30
