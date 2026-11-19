# Spec Delta

## ADDED Requirements

### Requirement: Help area is a coloured block
The Help area on the values page and every skills page SHALL be presented as a block with its own background colour and a visible border, drawn in the page's section colour family, and the block SHALL include the Help toggle, so a collapsed Help area shows as a coloured bar. The colours SHALL meet WCAG AA contrast for text (4.5:1) and for the block boundary (3:1) in the light and dark themes.

#### Scenario: Collapsed Help is a block
- **WHEN** the user opens a selection page
- **THEN** the collapsed Help control is shown inside a coloured, bordered block

#### Scenario: Both themes
- **WHEN** Help is expanded in the light theme and in the dark theme
- **THEN** its text and border meet the stated contrast against the block background

### Requirement: Each help topic is its own inner block
When expanded, each topic in the Help area SHALL be shown as a separate inner block: the ChatGPT suggestion (where the page has one), the selection instructions, the experience explanation (skill pages only), the add-your-own instruction and the filter hint. All inner blocks SHALL share one background colour, and that colour SHALL differ visibly from the Help area block that surrounds them. Block order and wording SHALL NOT change.

#### Scenario: Skill page topics
- **WHEN** the user expands Help on a skill page
- **THEN** five inner blocks are shown, each holding one topic, all in the same colour and visibly different from the surrounding Help block

#### Scenario: Values page topics
- **WHEN** the user expands Help on the values page
- **THEN** the experience explanation block is absent and the other topics are shown as inner blocks

#### Scenario: Collapse behaviour unchanged
- **WHEN** the user collapses Help
- **THEN** the inner blocks are hidden and not focusable
