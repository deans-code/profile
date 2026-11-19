## Why

Category cards now collapse, but they start fully open, so each page opens as a long wall of options. They also sit in a grid of rows, so expanding one card stretches its row neighbours to the same height and leaves large blank gaps. Starting collapsed and flowing cards down columns makes the pages scannable and makes an opened card push down only the cards beneath it.

## What Changes

- Category cards on the values page and the four skills pages start collapsed.
- A "Collapse all" button and a "Show all" button sit above the cards and collapse or expand every card at once.
- Cards flow in stacked columns instead of aligned rows: expanding a card makes only the cards below it in the same column move down, and its neighbours in other columns do not grow.
- A card that has selected options still shows "N selected" in its collapsed header, so a collapsed start does not hide choices (for example after loading a saved profile).
- **BREAKING**: replaces the rule that cards start expanded.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `collapsible-categories`: initial state becomes collapsed, adds the collapse all / show all controls, and adds the stacked-column layout.

## Impact

- `src/components/WordPicker.tsx`: initial collapsed state, two buttons with a live status.
- `src/styles.css`: `.categories` changes from a grid to CSS columns; cards avoid splitting across columns.
- Tests: `src/collapse.test.tsx` and any test that clicks or counts options on a freshly opened page must expand cards first (`src/broad-terms.test.tsx`, `src/App.test.tsx`, `src/limits.test.tsx`, `src/values-grouping.test.tsx` and others that find chips on first render).
- Depends on the `collapsible-categories` spec from `group-broad-terms-and-collapse-sections`: archive that change before applying or archiving this one.
