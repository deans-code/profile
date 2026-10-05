# Spec Delta

## Purpose

Makes moving between sections feel deliberate: the page returns to the top and the new section animates in, so users always start a section at its beginning.

## ADDED Requirements

### Requirement: Scroll to top on section change
The system SHALL scroll the page to the top when the user moves to a different section, whether by Continue, Back, Finish, Edit or the step navigation.

#### Scenario: Continue from a scrolled page
- **WHEN** the user has scrolled down a long list and activates Continue
- **THEN** the next section is shown with the page scrolled to its top

### Requirement: Animated section change
The system SHALL animate the change of section, with the incoming section entering in the direction of travel (forward moves in from the right, backward from the left) in no more than 500 milliseconds.

#### Scenario: Forward
- **WHEN** the user continues to the next section
- **THEN** the new section animates in and the previous section is no longer shown when the animation ends

#### Scenario: Backward
- **WHEN** the user goes back
- **THEN** the new section animates in from the opposite direction to a forward move

### Requirement: Reduced motion respected
When the user's system requests reduced motion, the system SHALL change section without movement animation and scroll to the top instantly.

#### Scenario: Reduced motion
- **WHEN** the user prefers reduced motion and continues to the next section
- **THEN** the section changes with no sliding or smooth scrolling

### Requirement: Focus and announcement on section change
After a section change the system SHALL move focus to the new section's heading so keyboard and screen reader users know where they are.

#### Scenario: Focus moves
- **WHEN** the user continues to the next section
- **THEN** the new section's heading has focus

### Requirement: Interaction remains correct during animation
The system SHALL keep selections, scores and gating unchanged by transitions, and SHALL NOT allow the user to trigger a second section change until the current one has settled.

#### Scenario: Rapid double activation
- **WHEN** the user activates Continue twice in quick succession
- **THEN** exactly one section change occurs
