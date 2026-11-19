# Spec Delta

## ADDED Requirements

### Requirement: Adding a custom skill reveals it
On every skills tab, when the user adds a new custom skill, the system SHALL scroll the page so the Custom card, including the new skill, is in view and not hidden behind the pinned bar, using smooth scrolling unless the user prefers reduced motion, in which case the scroll SHALL be instant. If the skills filter would hide the new skill, the system SHALL clear the filter. No scroll SHALL happen when nothing new was added.

#### Scenario: New custom skill scrolled into view
- **WHEN** the user is on the technical skills tab, scrolled to the top, types "Zig" and presses Add
- **THEN** the page scrolls to the Custom card and "Zig" is visible there, selected

#### Scenario: Every skills tab
- **WHEN** the user adds a custom skill on the engineering, interpersonal or AI engineering tab
- **THEN** the page scrolls to that tab's Custom card

#### Scenario: Switching tabs does not scroll to Custom
- **WHEN** the user switches between the previous and desired experience options, or between tabs, with custom skills already present
- **THEN** the page does not scroll to the Custom card
