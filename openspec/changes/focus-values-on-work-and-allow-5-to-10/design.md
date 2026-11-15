## Context

Values come from source files in `src/data/catalog/values/`, merged in order by `mergeContributions`; the first source naming a value sets its group. Eight files currently have a `'Wellbeing and a good life'` group. The limit is a single constant `MAX_SELECTION = 5` in `src/state/profile.ts`, used by `LIMITS`, `isFull` and `overBy`; `pageComplete('values')` is "at least one selected". Messages in `SelectionStatus` and `AddEntry` are generic ("Limit reached", "Over the limit").

## Goals / Non-Goals

**Goals:**
- Values describe working life only; no empty or orphaned references to the removed group.
- Selection of 5 to 10 values, enforced consistently in the UI, flow gating and file loading.

**Non-Goals:**
- Changing the other eleven groups, skills pages, or the Personal character and Society groups.
- A minimum for skills.

## Decisions

1. **Delete the group block from each source file** rather than hiding it in the UI. Removed values then drop out of the catalog, descriptions and attribution automatically, and old profiles containing them load as custom values through the existing path.
2. **Check for resurfacing.** A later source can name a value that an earlier source placed in Wellbeing. Once the earlier entry is gone the later source would add it under its own group. Apply must search the remaining files for each removed name and delete those too, since the user wants no wellbeing values.
3. **Check for orphans after removal.** Verify every source still contributes at least one value, that `sources.ts` and the README list only sources still used, and update the README group list and the group list in `broaden-sources-and-deepen-lists` is left alone (it is a historical change; the main specs are what is synced).
4. **Min and max constants.** Replace `MAX_SELECTION` with `MIN_VALUES = 5` and `MAX_VALUES = 10`. `LIMITS` stays the maximum, so `isFull` and `overBy` are unchanged in shape. Add `underBy` for values and make `pageComplete('values')` require `MIN_VALUES`. Step gating then blocks on under- and over-selection with the existing "reason shown" mechanism.
   - Alternative: keep one-selection completion and only warn below 5. Rejected: the user said select between 5 and 10.
5. **Feedback wording.** Count reads "n of 10 selected"; below 5 it adds "Choose at least 5" (how many more); at 10 the existing limit message applies; over 10 the existing over-limit message. Instructions read "Select 5 to 10 values."
6. **Loading.** `load.ts` still loads everything; gating moves the user to the values page when the count is outside 5 to 10.

## Risks / Trade-offs

- [Some saved profiles with 1 to 4 values now cannot reach the profile card] → the values page opens with a message saying how many more to choose.
- [Removing about 30 values may drop the catalog below spec thresholds] → about 160 remain in 11 groups, above the 100 and 8 in `values-grouping`; apply must confirm with the existing catalog test.
- [Hidden references to the group name in tests] → only `load.test.ts` mentions "Wellbeing", as an old original value (`ORIGINAL_VALUES`); it must still produce some removed values for that test to pass, which "Wellbeing" does.
