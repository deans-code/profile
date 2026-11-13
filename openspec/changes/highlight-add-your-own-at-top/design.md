# Design

## Context

`WordPicker` renders, in order: heading, lead, hint, assistant link, experience intro, mode switch, `SelectionHelp`, the filter block, the category cards, `AddEntry`, then `SelectionStatus`. `AddEntry` is a bare form (hidden label, input, Add button) styled by `.add-entry` in `src/styles.css`. It is disabled via the `full` prop when the limit is reached; the explanation lives only in `SelectionStatus` at the bottom. Existing tests locate the input by its accessible label. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Make the control visible at the top of each selection page, clearly styled, with a short instruction.
- Keep the limit reason next to the disabled control.

**Non-Goals:**
- Changing how words are added, deduplicated or limited.
- Moving the filter, the status line, or the Custom card.
- A modal, popover or floating action button.

## Decisions

1. **Move, don't duplicate.** Render `AddEntry` once, between `SelectionHelp` and the filter block in `WordPicker`, and remove it from below the cards. A second copy at the bottom would double the controls and the test queries.
2. **Panel with heading and instruction inside `AddEntry`.** `AddEntry` gets a visible heading (its `label` prop, already "Add your own value/skill") and an instruction paragraph wired to the input with `aria-describedby`. The hidden label becomes the visible heading's `<label>`, keeping the accessible name unchanged so tests still pass. Instruction text: "Not in the lists? Type it and press Add or Enter. It will appear under Custom, selected." A `noun`-neutral sentence avoids per-page wording.
3. **Limit reason in the panel.** When `full`, `AddEntry` shows "Limit reached: deselect a word to add another." beside the button, announced politely. `SelectionStatus` keeps its own message, since it also reports counts.
4. **Styling.** A bordered panel with the accent colour border (2px), a tint background, an emphasised input (accent border, larger padding) and the existing primary button style. Uses existing tokens (`--accent`, `--tint`, `--text`) so light and dark themes follow, and wraps to a single column at phone width. Contrast of accent text on tint was calculated in the usability change; two light-theme pairs (engineering 4.47, profile 4.42) are just under 4.5, so body text in the panel uses `--text`, not `--accent`.
5. **Position relative to the filter.** Above the filter because adding is the action for "can't find it", and the filter is the first step in finding. Both stay above the cards.

## Risks / Trade-offs

- **Pushes the word lists down the page** by about one panel height. Mitigation: a compact panel (one row on desktop) and a short instruction.
- **Visible heading changes the label's role** from visually hidden to visible. Mitigation: keep the exact label text so `getByLabelText('Add your own value')` still works.
- **Instruction wording is subjective.** Mitigation: review the text with the user before archive (task 4.1).
- **Competing emphasis with the Continue button and the stepper.** Mitigation: use the panel border and tint, not a second primary-coloured block.
