# Proposal

## Why

Two changes are bundled here.

**Skill pages are required today.** Every skill page needs at least one selection before the profile can be reached, which forces people to pick something on pages that may not apply to them (for example AI engineering). Only the values page should be a requirement.

**Help areas blend together.** The Help area on selection pages is a plain run of paragraphs: the ChatGPT suggestion, the selection instructions, the experience explanation, the add-your-own instruction and the filter hint all blend together. Users cannot tell where one topic ends and the next begins. The side bar's "How this works" and "Privacy" areas are likewise unmarked. Framing each help area as a coloured block, with each topic in its own inner block, makes them scannable and makes it clear what is help.

## What Changes

**Optional skill pages**

- A skill page no longer needs any selection. The user can continue through all four skill pages, and reach the profile, with none selected. The values page still requires 5 to 10 values.
- The blocked message for the profile no longer mentions skill pages; limits on skills are unchanged.
- A skill step shows as complete in the navigation when it has a selection or the user has already moved past it.
- The profile card shows a short "Nothing chosen" note for a skill page with no words.
- A saved profile with empty skill pages loads straight to the profile card when its values are valid.

**Help blocks**

- Each help area becomes a coloured block that includes its toggle ("Help", "How this works", "Privacy"), so a collapsed area reads as a coloured bar.
- On selection pages, each topic inside the page Help area is its own inner block: ChatGPT suggestion, selection instructions and experience explanation (skill pages).
- Remove text that is not needed: "Select 5 to 10 values.", "Select as many skills as apply.", the add-your-own instruction ("Want to add a value/skill not here? …") and the filter hint ("Type part of a word…"). The add and filter boxes keep their labels.
- Each help toggle (page Help, How this works, Privacy) shows a down arrow that turns up while open.
- Inner blocks share one colour with each other, and it differs from the surrounding area block.
- Side bar "How this works" and "Privacy" are single blocks with no inner blocks, because each is one topic (a list).
- Other text, order, collapse behaviour and links are unchanged.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `profile-flow`: skill pages no longer need a selection; navigation completion and the profile card handle empty skill pages.
- `skills-selection`: replaces "each skill page requires a selection" with optional skill pages.
- `user-messages`: the blocked message for empty skill pages is removed.
- `profile-loading`: a file with empty skill pages is complete and opens the profile card.
- `selection-instructions`: the page Help area is a coloured block with an expand arrow, whose topics are inner blocks in a shared, different colour; the limit sentence, add instruction and filter hint are removed.
- `add-your-own`: the instruction beside the control is removed.
- `values-selection`: the instructions no longer repeat the 5 to 10 range.
- `page-guidance`: the side bar's "How this works" and "Privacy" areas are coloured blocks in the same style.

## Impact

- `src/state/profile.ts` (completion and blocking rules, furthest-step tracking), `src/components/ProfileCard.tsx`, `src/load.ts` landing logic, `src/App.tsx` (step completion marks).
- Tests for the old "must pick one skill per page" rule need updating (for example in `App.test.tsx`, `load.test.ts`, `limits.test.tsx`).
- `src/components/WordPicker.tsx`, `SelectionHelp.tsx`, `AssistantLink.tsx`, `AddEntry.tsx` (class names or wrappers for inner blocks), `src/App.tsx` (classes), `src/styles.css`.
- Help blocks: removed text is asserted by several tests (`App.test.tsx`, `add-entry.test.tsx`, `values-grouping.test.tsx`, `limits.test.tsx`), which need updating; new tests cover the structure.
- Optional skill pages add one field to state (furthest step reached); data and the export format are unchanged.
