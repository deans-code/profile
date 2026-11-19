## Why

On every selection page the "Add your own" control sits below all the category cards, so on long pages users never see it and assume they cannot add a word that is missing. It also looks like a plain input with a small button, with no explanation of what it does or where the new word goes.

## What Changes

- Move the add-your-own control to the top of every selection page (values and the four skill pages), above the filter and the category cards and below the page guidance.
- Style it as a highlighted panel: a heading ("Add your own value" or "Add your own skill"), a visibly emphasised input and a primary Add button, using the page's accent colour in light and dark themes.
- Show a short instruction beside it: that it is for words not in the lists, to type a word and press Add (or Enter), and that it will appear under "Custom" and be selected.
- When the limit is reached (values page), show the reason inside the panel, next to the disabled Add button, instead of only in the status line at the bottom.
- Keep behaviour unchanged: custom words are still added to the Custom card, duplicates still select the existing entry, the limit still disables Add, and the control's accessible name stays "Add your own value" / "Add your own <section> skill".

## Capabilities

### New Capabilities
- `add-your-own`: Where the add-your-own control appears on selection pages, how it is highlighted, and the instruction shown with it.

### Modified Capabilities
None. Existing specs describe the Add control's behaviour (disabled at the limit, enabled for unlimited skills) but not its position, which this change defines in the new capability without altering that behaviour.

## Impact

- Code: `src/components/WordPicker.tsx` (move the control up), `src/components/AddEntry.tsx` (heading, instruction, limit message), `src/styles.css` (highlighted panel, both themes, phone width).
- Tests: existing tests find the input by label and are unaffected; add tests for the position above the filter and categories, the instruction text, and the limit message beside the control.
- No data, export or saved-profile changes, and no new dependencies.
- Assumptions: "Add new.." means the existing "Add your own" control; "top" means directly after the page guidance and before the filter, not above the page heading; the instruction wording is a first draft for the user to review. Overlap with the committed usability change is limited to `src/styles.css`.
