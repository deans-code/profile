# Spec Delta

## ADDED Requirements

### Requirement: Side bar help areas are coloured blocks
The side bar's "How this works" and "Privacy" areas SHALL each be presented as a coloured, bordered block that includes its toggle, using the same block style as the page Help area, with text and boundary contrast meeting WCAG AA in the light and dark themes. Each toggle SHALL show the same decorative down arrow as the page Help area, pointing up while the area is open. Their content, order and collapse behaviour SHALL NOT change.

#### Scenario: Collapsed areas
- **WHEN** the user opens any page
- **THEN** "How this works" and "Privacy" each appear as a coloured block with a down arrow, collapsed by default

#### Scenario: Expanded area
- **WHEN** the user expands "Privacy"
- **THEN** its statement is shown inside the block, its arrow points up, and the other area is unaffected
