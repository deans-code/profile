# Spec Delta

## RENAMED Requirements

- FROM: `### Requirement: Each skill page requires a selection`
- TO: `### Requirement: Skill pages do not require a selection`

## MODIFIED Requirements

### Requirement: Skill pages do not require a selection
The system SHALL NOT require any selected skill on a skill page. The user MAY reach the profile with no skills selected, in either experience option, on any or all of the four skill pages.

#### Scenario: Profile gated
- **WHEN** any of the four skill pages has no selected skills in either option and the values are valid
- **THEN** the user can still reach the profile and is not told that selections are missing

#### Scenario: Selections preserved on navigation
- **WHEN** the user navigates back to an earlier step
- **THEN** all previous selections are retained
