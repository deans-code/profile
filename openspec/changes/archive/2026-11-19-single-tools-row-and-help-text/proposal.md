# Proposal

## Why

Each selection page stacks its tools in several places: experience options and Add in a pinned bar, then a labelled Filter with its own hint, then Show all / Collapse all on a separate row. Above them sit three blocks of explanatory text. This pushes the word lists far down the page and repeats what the page lead already says.

## What Changes

- Put the page's tools in one row: Previous/Desired experience options (skill pages), Add your own, the filter box, and Show all / Collapse all. The row wraps only when the screen is too narrow for it.
- Move explanatory text into the existing collapsed Help area, keeping only what is useful:
  - Keep and move: the two-kinds-of-experience explanation (skill pages), the "Want to add a {noun} not here?" instruction, and a one-line filter hint.
  - Drop: "Select the skills/values that apply, or add your own." (it repeats the page lead).
- The filter keeps an accessible label but no longer shows a visible heading or hint line above it.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `add-your-own`: control sits in the tools row, before the cards; its instruction is in Help and still tied to the input for assistive technology.
- `experience-modes`: the pinned bar becomes the tools row; the experience introduction moves into Help.
- `selection-instructions`: Help area also holds the add-your-own instruction, the experience introduction and the filter hint; add-your-own hint no longer always visible.
- `page-guidance`: the experience intro is in Help rather than above the options.
- `collapsible-categories`: Show all / Collapse all are in the tools row.
- `values-selection`: the values page's pinned bar is the tools row (Add, filter, Show all, Collapse all).

## Impact

- `src/components/WordPicker.tsx`, `AddEntry.tsx`, `SelectionHelp.tsx`, `SkillStep.tsx`, `ValuesStep.tsx`, `src/styles.css`.
- Tests that read the hint, filter hint, experience intro or "Select the ... skills" text (`add-entry.test.tsx`, `values-grouping.test.tsx`, `guidance.test.tsx` and others) need updating.
- No state, export, load or data changes.
