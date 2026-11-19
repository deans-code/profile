# Spec Delta

## MODIFIED Requirements

### Requirement: Full privacy statement
A "Privacy" control in the side bar SHALL reveal a fuller statement, collapsed by default, operable by keyboard and touch, with collapsed content not focusable. The statement SHALL say: choices are kept only in memory on the device and are lost when the page is closed or reloaded; no cookies are set; the only thing stored on the device is the chosen theme and text size; downloads and loading a saved profile happen locally; the hosting provider may keep ordinary server logs that the app does not control; and links to outside sites, including the optional ChatGPT link, leave the app, with the ChatGPT link sending only a fixed generic prompt and never the user's selections.

#### Scenario: Expand statement
- **WHEN** the user activates "Privacy"
- **THEN** the full statement is shown including the hosting-logs and outside-links notes
