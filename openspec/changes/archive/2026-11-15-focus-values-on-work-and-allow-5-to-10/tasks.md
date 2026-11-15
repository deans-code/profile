## 1. Remove the Wellbeing group

- [x] 1.1 Delete the `'Wellbeing and a good life'` block from the seven source files that have it (VIA, Schwartz, Rokeach, Work ethic, Value ethics, Outline of self, Self-determination)
- [x] 1.2 Search the remaining source files for each removed value name and delete any that would now surface under another group (for example Love, Gratitude, Self-fulfilment, Happiness, Leisure)
- [x] 1.3 Check every source still contributes at least one value; remove its file, its `index.ts` entry, its `sources.ts` entry and its README line only if it does not
- [x] 1.4 Remove "Wellbeing and a good life" from the README group list and update any value or group counts there; confirm no other reference remains (`grep -ri "wellbeing\|good life"`)
- [x] 1.5 Confirm the catalog still has at least 100 values in at least 8 groups with descriptions and no duplicates

## 2. Selection range of 5 to 10

- [x] 2.1 In `src/state/profile.ts` replace `MAX_SELECTION` with `MIN_VALUES = 5` and `MAX_VALUES = 10`, point `LIMITS` at the maximum, add an under-by helper, and make `pageComplete('values')` require the minimum
- [x] 2.2 Make step gating and its reason message cover too few values ("choose at least n more") as well as too many
- [x] 2.3 Update `SelectionStatus` so values show "n of 10 selected", with a "choose at least n more" note below 5, and keep the limit and over-limit notes
- [x] 2.4 Change the values instructions to "Select 5 to 10 values." and check `AddEntry` messaging at 10
- [x] 2.5 Make loading open the values page for fewer than 5 values with the right message, and keep over-10 loaded in full

## 3. Tests and docs

- [x] 3.1 Update `limits.test.tsx`, `App.test.tsx`, `add-entry.test.tsx`, `load-ui.test.tsx`, `profile.test.ts` and `load.test.ts` for 5 to 10 (including a test that a removed Wellbeing value loads as custom)
- [x] 3.2 Add tests for the minimum: continue blocked at 4, allowed at 5; selection blocked at 10; loaded 3 and 12 values
- [x] 3.3 Update the README selection-limit sections, feature checklist and loading notes from "5" to "5 to 10"
- [x] 3.4 Run the test suite, type check and build, and fix failures
