# Spec Delta

## MODIFIED Requirements

### Requirement: Collapse all and show all
Pages with category cards SHALL provide a "Collapse all" button and a "Show all" button in the page's tools row, above the cards. "Show all" SHALL expand every card, including the Custom card when present, and "Collapse all" SHALL collapse every card. Neither SHALL change any selection. The result SHALL be announced in a polite live region.

#### Scenario: Show all
- **WHEN** the user activates "Show all"
- **THEN** every card is expanded and the page announces that all sections are shown

#### Scenario: Collapse all
- **WHEN** the user has expanded some cards and activates "Collapse all"
- **THEN** every card is collapsed, their selected counts are shown in the headers, and selections are unchanged

#### Scenario: Keeps selections
- **WHEN** the user has selected options, activates "Collapse all", then "Show all"
- **THEN** the same options are still selected
