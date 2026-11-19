# Spec Delta

## ADDED Requirements

### Requirement: Options have their own colour
On each skill page the Previous experience and Desired experience options SHALL each have a colour that differs slightly from the other and stays within the page's section colour family. The active option's colour SHALL be used for the selected button in the experience switch, for the category cards, and for the word options (borders, tints and selected words), so the lists visibly belong to the selected switch button. Changing the option SHALL update these colours at once without changing any selection.

#### Scenario: Colours differ between options
- **WHEN** the user switches from "Previous experience" to "Desired experience" on any skill page
- **THEN** the selected switch button, the category cards and the word options change to a slightly different colour of the same section family

#### Scenario: List matches the switch
- **WHEN** an option is active
- **THEN** the selected switch button, the category cards and the selected words use the same colour

#### Scenario: Selections kept
- **WHEN** the user switches option and back
- **THEN** each option's selections are unchanged

### Requirement: Option colours stay accessible and are not the only cue
The option colours SHALL meet WCAG AA contrast (4.5:1 for text, 3:1 for interface boundaries) against their backgrounds in the light and dark themes. The active option SHALL also be identified by the switch's selected state and label, and selected words by their existing non-colour cue, so colour is never the only indicator.

#### Scenario: Both themes
- **WHEN** a skill page is shown in the light theme and in the dark theme, with each option active
- **THEN** selected switch buttons, selected words and card borders meet the stated contrast

#### Scenario: Values page unaffected
- **WHEN** the user opens the values page or the profile
- **THEN** they use the section colour only, with no option colours
