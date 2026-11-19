# Spec Delta

## MODIFIED Requirements

### Requirement: Over-limit and incomplete files
A file with more than 10 values SHALL be loaded in full and then constrained as in the selection-limits capability. A file with fewer than 5 values SHALL be loaded in full and open the values page with a message saying how many more to choose. A value that is no longer built in SHALL load as a custom value. A file that cannot satisfy the completion rules to reach the profile card SHALL open on the first page that needs attention, with a message saying what to do. Empty skill pages SHALL NOT count as needing attention.

#### Scenario: Over-limit file
- **WHEN** the file has 12 values
- **THEN** all 12 are loaded, the values page opens, and the user is told to deselect 2 to continue

#### Scenario: Too few values
- **WHEN** the file has 3 values
- **THEN** the values page opens with the 3 selected and a message to choose at least 2 more

#### Scenario: Removed wellbeing value
- **WHEN** the file selects "Life satisfaction"
- **THEN** it loads without error as a custom value

#### Scenario: Incomplete file
- **WHEN** the loaded file has no AI engineering selections in either option and its values are valid
- **THEN** the profile card opens with no message about missing skills
