# Spec Delta

## MODIFIED Requirements

### Requirement: Experience intro on skill pages
In the Help area of every skill page, the app SHALL show a short intro stating that the profile is built from previous experience and desired experience, and that both can be filled in. The values page SHALL NOT show it. The page SHALL NOT repeat the page lead as a separate "Select the skills that apply" line.

#### Scenario: Intro placement
- **WHEN** the user expands Help on any skill page
- **THEN** the intro is shown, and it does not appear on the values page or the profile

#### Scenario: No duplicate line
- **WHEN** the user opens any selection page
- **THEN** only the page lead is shown under the heading, with no further "Select the … or add your own" line
