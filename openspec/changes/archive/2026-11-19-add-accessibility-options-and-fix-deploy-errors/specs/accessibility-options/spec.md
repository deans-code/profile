## ADDED Requirements

### Requirement: Accessibility controls at the top of the page
The app SHALL show an Accessibility control in the page header, reachable on every step, offering a theme choice (Match system, Light, Dark) and a text size choice (Default, Large, Larger, Largest). The control SHALL be operable by keyboard and expose its current selection to assistive technology.

#### Scenario: Controls are available on every step
- **WHEN** the user is on any step, including the final profile
- **THEN** the Accessibility control is visible in the header and shows the current theme and text size

#### Scenario: Keyboard use
- **WHEN** the user operates the control with the keyboard only
- **THEN** every option can be reached and selected, and the selected option is announced as selected

### Requirement: Theme choice
The app SHALL apply the chosen theme to all screens immediately. "Match system" SHALL follow the operating system's light or dark setting and is the default. "Light" and "Dark" SHALL override the system setting. Every section palette SHALL remain readable, with text and accent colours meeting WCAG AA contrast, in both light and dark.

#### Scenario: Default follows the system
- **WHEN** a first-time visitor whose system is set to dark opens the app
- **THEN** the app is shown in the dark theme and the control shows Match system

#### Scenario: Override the system
- **WHEN** the user selects Light while their system is set to dark
- **THEN** the whole app switches to the light theme at once, on every section

### Requirement: Text size choice
The app SHALL scale all text, and the controls and spacing sized relative to it, according to the chosen text size, with Default equal to the current size. At the largest size the app SHALL remain usable without horizontal scrolling at a 1280px-wide viewport.

#### Scenario: Increase text size
- **WHEN** the user selects Larger
- **THEN** text throughout the app becomes visibly larger immediately and no content is cut off or overlapping

#### Scenario: Return to default
- **WHEN** the user selects Default
- **THEN** the app returns to its original text size

### Requirement: Preferences are remembered
The app SHALL remember the chosen theme and text size in the browser and apply them on later visits before the page first paints, without a flash of the wrong theme. If saved values are missing, invalid or storage is unavailable, the app SHALL use the defaults and continue to work. Preferences SHALL NOT be included in a downloaded profile.

#### Scenario: Return visit
- **WHEN** the user chose Dark and Large, then reloads or revisits the app
- **THEN** the app opens in the dark theme at Large text

#### Scenario: Storage unavailable
- **WHEN** the browser blocks storage or holds an unrecognised saved value
- **THEN** the app uses Match system and Default, and the controls still change the display for the current visit

#### Scenario: Profile export unaffected
- **WHEN** the user downloads their profile after changing accessibility options
- **THEN** the file contains no theme or text size information
