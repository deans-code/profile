## MODIFIED Requirements

### Requirement: Values shown as one list
The profile card and the JSON download SHALL present values as a single list with no Previous or Desired grouping. In JSON, `values` SHALL be an array of names sorted alphabetically.

#### Scenario: JSON values
- **WHEN** the user downloads the JSON after selecting "Integrity" and "Curiosity"
- **THEN** `values` is `["Curiosity", "Integrity"]`

#### Scenario: Markdown and card
- **WHEN** the user views the profile card
- **THEN** the values appear as one list under "Values", with no "Previous experience" or "Desired experience" headings for values
