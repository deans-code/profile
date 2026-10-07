# Spec Delta

## Purpose

Presents values in named categories, with a broader set to choose from, so users can scan and pick values more easily.

## ADDED Requirements

### Requirement: Values are grouped into categories
The system SHALL present the built-in values grouped under named category headings, each category shown as its own card, in the same card layout as the skill sections.

#### Scenario: Categories shown
- **WHEN** the user reaches the values step
- **THEN** values appear under category headings such as Character, Relationships and Growth, rather than as one flat list

### Requirement: Expanded set of values
The system SHALL offer at least 100 built-in values across at least 8 categories, with no value appearing in more than one category, and every built-in value SHALL have a description.

#### Scenario: Catalog size
- **WHEN** the built-in values are inspected
- **THEN** there are at least 100, in at least 8 categories, each with a non-empty description and no duplicates ignoring case

#### Scenario: Earlier values retained
- **WHEN** a profile saved before this change contains built-in values from the original list
- **THEN** each still loads as the same built-in value

### Requirement: Values can be filtered
The system SHALL let the user filter the values by text, matching names case-insensitively, hiding categories with no matches and keeping existing selections.

#### Scenario: Filter
- **WHEN** the user types "res" in the values filter
- **THEN** only values whose names contain "res" are shown, grouped under their categories, and previous selections are retained

### Requirement: Custom values group
Custom values SHALL appear in a "Custom" category on the values step, selected when added, and SHALL be removable as before.

#### Scenario: Add custom value
- **WHEN** the user adds "Craftsmanship of docs"
- **THEN** a Custom category appears containing that value, selected

### Requirement: Values keep their selection limit
Selection on the values step SHALL remain limited to 10 words, including custom values, with the existing count, limit message and unavailable-word behavior.

#### Scenario: Limit still applies
- **WHEN** the user has selected 10 values and tries to select an 11th
- **THEN** it is not selected and the page shows "10 of 10 selected" with the limit message

### Requirement: Uniform presentation
Values SHALL be displayed at one uniform size, and SHALL open their description on right-click, as on the skill pages.

#### Scenario: Description on right-click
- **WHEN** the user right-clicks "Integrity"
- **THEN** its description opens and its selection state is unchanged
