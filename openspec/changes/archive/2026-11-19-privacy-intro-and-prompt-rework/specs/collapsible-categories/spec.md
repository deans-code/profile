## ADDED Requirements

### Requirement: Values page uses the same column layout
The values page SHALL lay out its category cards in the same stacked columns as the skill pages, with the same card width at the same screen width, rather than stretching each card across the full page. This SHALL hold on first load, after resizing the window, and after navigating to the values page from another page.

#### Scenario: Wide screen
- **WHEN** the values page is viewed at a width where a skill page shows two or more columns
- **THEN** the values page shows the same number of columns with cards of the same width

#### Scenario: Navigate back
- **WHEN** the user goes from a skill page back to the values page
- **THEN** the cards are in columns, not full width
