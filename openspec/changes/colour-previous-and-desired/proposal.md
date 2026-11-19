# Proposal

## Why

On each skill page the Previous experience and Desired experience lists look identical apart from the switch. Users editing one list can forget which they are in. Giving each list a slightly different colour, matching the selected button in the switch, makes the current list and its link to the switch obvious.

## What Changes

- Each skill page's two experience options get their own colour, a slight shift from the page's section colour (previous one way, desired the other), so the two stay recognisably part of the same section.
- The active option's colour is applied to the selected button in the Previous/Desired switch, the category cards and the word options (selected words, borders and tints) below it.
- Switching option changes these colours immediately; selections are unaffected.
- The values page and profile are unchanged (they have no experience option).
- Colour stays a supporting cue: the switch text, counts and selected-state marks remain.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `experience-modes`: adds a requirement that the active option's colour is shared by the switch, category cards and word options, and differs between the two options, with accessible contrast.

## Impact

- `src/components/WordPicker.tsx` (mark the scope with the active mode), `src/styles.css` (mode colour variables overriding the accent inside the scope).
- No state, data, export or load changes. New tests for the mode attribute.
