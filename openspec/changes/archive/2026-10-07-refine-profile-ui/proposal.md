# Proposal

## Why

The first version of the profile builder works, but the interface is narrow, the cloud's varying word sizes make the lists hard to scan, users cannot tell what an unfamiliar value or skill means before choosing it, and moving between sections feels abrupt, with every section looking the same. This change makes the interface cleaner, clearer and easier to use.

## What Changes

- Use more of the screen width on wide displays, with lists flowing into more columns, while staying readable on phones.
- Show every value and skill at the same size; remove the size variation based on how common a value is.
- Add definitions for the values and skills a user can select. Right-clicking a word opens its definition, with equivalent keyboard and touch gestures so definitions are not mouse-only.
- Show clear instructions at the top of the selection steps explaining how to select a word and how to view its definition.
- When the user completes a section and continues, scroll back to the top and animate the change of section (respecting a reduced-motion preference).
- Give each section its own accent colour, applied to its buttons, selected words and stepper, in both light and dark themes.

## Capabilities

### New Capabilities
- `term-definitions`: Definitions for selectable values and skills, and how users open and dismiss them (right-click, keyboard, touch).
- `section-transitions`: Scrolling to the top and animating when moving between sections, including reduced-motion behavior.
- `section-theming`: Per-section accent colours, uniform word sizing and the wide, uncluttered layout, plus the instructions shown at the top of selection steps.

### Modified Capabilities
<!-- None. The specs from build-profile-builder are not yet archived into openspec/specs, so nothing can be modified yet; see design.md for how this change relates to them. -->

## Impact

- Affects the existing React components, styles and data modules from `build-profile-builder` (selection steps, stepper, app shell, `src/data`).
- Adds a definitions data set covering all built-in values and skills (roughly 300 entries); custom entries have no definition.
- No new runtime dependencies are expected; definitions are bundled, so the app stays offline-capable and sends no data anywhere.
- Out of scope: definitions for custom entries, looking definitions up from an external service, user-editable definitions, localization.
- Assumptions: definitions are short (one or two sentences) and written for this app; "section" means each wizard step (values, three skill sections, scoring, profile card).
