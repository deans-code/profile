# Spec Delta

## Purpose

Defines the two-panel arrangement of the app: a side bar for orientation, navigation and settings, and a main panel for the work of selecting and reviewing.

## ADDED Requirements

### Requirement: Side bar and main panel
The app SHALL present a side bar and a main panel side by side on every step, including the final profile. The side bar SHALL be a labelled landmark and the main panel SHALL be the page's main landmark.

#### Scenario: Both panels present
- **WHEN** the user opens the app or moves to any step
- **THEN** a side bar and a main panel are shown together, each exposed as its own landmark

### Requirement: Side bar contents
The side bar SHALL contain, and the main panel SHALL NOT contain: the title and introduction (including the purpose and privacy lines), the "How this works" instructions, the "Privacy" statement, the step navigation (step status, progress bar and step buttons), the Accessibility options and Load profile.

#### Scenario: Supporting material in the side bar
- **WHEN** the user views any step
- **THEN** all six items above are found in the side bar and none appears in the main panel

### Requirement: Main panel contents
The main panel SHALL contain the step content (page heading and lead, selection options, experience switch and profile card), the Back and Continue controls, and the Sources list, and nothing from the side bar.

#### Scenario: Work in the main panel
- **WHEN** the user views a skill page
- **THEN** its heading, lead, options, Back/Continue controls and Sources are in the main panel

### Requirement: Side bar stays in view on wide screens
On viewports at least 60rem wide the side bar SHALL stay in view while the main panel scrolls, and SHALL scroll within itself if taller than the viewport so no side bar content is unreachable.

#### Scenario: Scrolling long pages
- **WHEN** the user scrolls a long skill page on a wide screen
- **THEN** the step navigation remains visible and usable

### Requirement: Narrow screens stack the panels
On viewports narrower than 60rem the side bar SHALL appear above the main panel in a single column, with no horizontal scrolling, and its collapsible items SHALL remain collapsed by default. At the largest text size the layout SHALL remain usable without horizontal scrolling at a 1280px-wide viewport.

#### Scenario: Phone width
- **WHEN** the viewport is 24rem wide
- **THEN** the side bar is above the main panel, nothing is cut off, and collapsed items take little space

### Requirement: Order and behavior preserved
Moving content into the side bar SHALL NOT change tab order within a panel (side bar first, then main panel), step order, blocking rules, collapse defaults or any control's behavior.

#### Scenario: Keyboard use
- **WHEN** the user tabs from the start of the page
- **THEN** side bar controls are reached first in their existing order, then the main panel
