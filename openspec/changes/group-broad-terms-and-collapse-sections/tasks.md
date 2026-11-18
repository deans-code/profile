## 1. Exclusivity rule

- [x] 1.1 Add `coveredBy(kind, term)` and `termsCovering(kind, option)` helpers to `src/data/broad-terms.ts`
- [x] 1.2 Update `toggleValue` and `toggleSkill` in `src/state/profile.ts` so selecting a term removes its covered options and selecting an option removes its covering terms, current mode only, keeping the limit check first
- [x] 1.3 Apply the same rule when `addCustomValue` / `addCustomSkill` re-selects an existing built-in
- [x] 1.4 Reducer tests: term over options, option over term, other category, overlapping terms, other mode unaffected, deselect, limit

## 2. Solid grouping style

- [x] 2.1 In `src/styles.css`, change `.broad-group` and `.chip.broad` to solid borders (2px on the group) and check contrast in light, dark and accessibility options
- [x] 2.2 Update the `.broad-note` text in `WordPicker.tsx` to explain the deselect behaviour
- [x] 2.3 Update `src/broad-terms.test.tsx`, `src/values-grouping.test.tsx`, `src/limits.test.tsx`, `src/accessibility.test.tsx` for the new rule and note

## 3. Collapsible categories

- [x] 3.1 In `WordPicker.tsx`, render each card heading as an `aria-expanded` button controlling the card content; track collapsed cards in state, default expanded
- [x] 3.2 Show "N selected" in the header when collapsed and N > 0
- [x] 3.3 Force matching cards open while the filter has text, restoring state when cleared
- [x] 3.4 Expand the Custom card when a custom entry is added, before scrolling
- [x] 3.5 Style the header button (focus ring, chevron that is not colour only, 44px target) in light, dark and accessibility options
- [x] 3.6 Add tests for collapse/expand, keyboard, selection kept, count, filter, and add-to-collapsed-Custom

## 4. Verify

- [x] 4.1 Run the full test suite, type check and build
- [ ] 4.2 Check the values page and one skills page by hand at phone width and with a screen reader name check
