# profile-flow Specification

## ADDED Requirements

### Requirement: Navigation shows route and progress
The step navigation SHALL show each step's number, the user's current position out of the total, and which steps are complete, without changing the step order or the completion rules.

#### Scenario: Blocked step
- **WHEN** an earlier page is incomplete
- **THEN** later steps appear unavailable and the existing reason is still shown
