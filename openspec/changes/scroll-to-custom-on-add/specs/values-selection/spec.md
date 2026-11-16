# Spec Delta

## ADDED Requirements

### Requirement: Adding a custom value reveals it
When the user adds a new custom value, the system SHALL scroll the page so the Custom card, including the new value, is in view and not hidden behind the pinned bar, using smooth scrolling unless the user prefers reduced motion, in which case the scroll SHALL be instant. If the values filter would hide the new value, the system SHALL clear the filter. No scroll SHALL happen when nothing new was added.

#### Scenario: New custom value scrolled into view
- **WHEN** the user scrolls to the top of the values page, types "Craftsmanship of docs" and presses Add
- **THEN** the page scrolls to the Custom card and "Craftsmanship of docs" is visible there, selected

#### Scenario: Filter cleared so the value shows
- **WHEN** the filter is "res" and the user adds "Grit"
- **THEN** the filter is cleared and "Grit" is shown in the Custom card, with earlier selections kept

#### Scenario: Reduced motion
- **WHEN** the user prefers reduced motion and adds a custom value
- **THEN** the page scrolls to the Custom card without animation

#### Scenario: Nothing added, no scroll
- **WHEN** the user adds text that matches an existing value, or presses Add with empty text, or loads a saved profile containing custom values
- **THEN** the page does not scroll to the Custom card
