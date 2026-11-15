## Why

The Previous / Desired experience options now stay in view as the user scrolls, but the "add your own" box does not. When someone is deep in a long catalog and finds a skill that is missing, they have to scroll back to the top to add it. The add-your-own tools should travel with the options, sitting beside them, so adding a custom entry is always one step away.

## What Changes

- On skill pages, the add-your-own text box and its Add button join the pinned bar with the Previous / Desired options, laid out side by side on desktop and stacked compactly on phones.
- On the values page, which has no options, the add-your-own box is pinned in the same bar position.
- The add box becomes compact in the bar: the long explanatory sentence ("Not in the lists? Type it and press Add or Enter...") moves out of the pinned bar into the normal page flow above it, and stays linked to the input for assistive technology. The box keeps its accent border so it remains easy to spot.
- The limit message ("Limit reached: deselect a word to add another") still appears when the values page is full, shown inside the bar next to the disabled Add button.
- No change to how custom entries work: they are added to the active option, appear under Custom, and respect the 5 to 10 value range. The filter box stays in the normal page flow.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `experience-modes`: the pinned bar on skill pages also contains the add-your-own box, beside the options.
- `values-selection`: the values page pins the add-your-own box at the top while scrolling.

## Impact

- `src/components/AddEntry.tsx` (compact layout, help text separated), `ModeSwitch.tsx` and `WordPicker.tsx` (shared pinned bar), `src/styles.css` (bar layout for desktop and phone, remove the panel styling that no longer applies).
- Tests that look up the add box by label still work; the test about its position relative to the options and the filter changes.
- README: update the note on pinned options.

## Assumptions

- "Add your own entries text box tools" means the add-your-own panel (text box and Add button). The filter box is not included; say if you also want it pinned.
- The values page should pin the add box too, for consistency, although it has no options to sit beside.
- The explanatory sentence does not need to be pinned.
