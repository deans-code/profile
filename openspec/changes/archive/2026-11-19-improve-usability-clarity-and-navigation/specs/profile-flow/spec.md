## MODIFIED Requirements

### Requirement: Navigation shows route and progress
The step navigation SHALL show each step's number, the user's current position out of the total, and which steps are complete, without changing the step order or the completion rules. The Back and Continue controls SHALL name their destination (for example "Back to Values", "Continue to Engineering", "Finish and view profile") and SHALL remain visible at the bottom of the viewport while the page scrolls.

#### Scenario: Blocked step
- **WHEN** an earlier page is incomplete
- **THEN** later steps appear unavailable and the existing reason is still shown

#### Scenario: Controls name destinations
- **WHEN** the user is on the Interpersonal page
- **THEN** the controls read "Back to Engineering" and "Continue to AI engineering"

#### Scenario: Controls stay in reach
- **WHEN** a long page is scrolled so the footer would be off screen
- **THEN** the Back and Continue controls are still visible and usable
