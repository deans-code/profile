## REMOVED Requirements

### Requirement: Markdown contents
**Reason**: The Markdown download is removed; it duplicated the JSON, could not be loaded back, and was an extra format to maintain.
**Migration**: Use the JSON download, which holds the same selections and can be loaded back.

## MODIFIED Requirements

### Requirement: Exports are local and faithful
The JSON download SHALL be generated on the user's device without sending profile data to any server, and SHALL contain the same selections shown on the card, including custom entries. The profile card SHALL offer Download JSON and Edit only, with no Markdown option.

#### Scenario: Custom entries exported
- **WHEN** the profile includes a custom value and a custom skill
- **THEN** both appear in the JSON download

#### Scenario: Special characters
- **WHEN** a custom entry contains quotes, Markdown symbols or non-ASCII characters
- **THEN** the JSON remains valid and the text is preserved exactly
