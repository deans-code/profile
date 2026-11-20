## Why

The selection instructions repeat themselves: "right-click a word" appears in the first line and again as "Mouse: right-click a word" in the secondary line. The opening "Click a word to select or deselect it" is obvious from the page and not needed. The inner help topic blocks also have a strong border and accent bar that make the Help area look busy.

## What Changes

- Remove the "Click a word to select or deselect it." sentence from the selection instructions.
- Remove the repeated right-click wording: line one says "Right-click a word to read its description."; the secondary line drops its "Mouse:" part and keeps only the keyboard and touch alternatives.
- Make the border around the inner help topic blocks less obvious: no visible border or accent bar, only a subtle background colour difference from the surrounding Help block.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `selection-instructions`: instruction wording (primary and secondary lines) and the inner help block styling.

## Impact

- `src/components/SelectionHelp.tsx` (wording), `src/styles.css` (`.help-block` inside the Help area), `src/App.test.tsx` (instruction text assertions), and the README line describing selection.
