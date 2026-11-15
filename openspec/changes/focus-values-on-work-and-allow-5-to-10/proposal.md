## Why

The values step should describe a person as a professional. The "Wellbeing and a good life" group (love, pleasure, salvation, life satisfaction and similar) is not about work and is not useful, so it goes. A fixed maximum of 5 values is also too tight to describe someone's working character, so users should choose between 5 and 10.

## What Changes

- Remove the "Wellbeing and a good life" group and every value that appears only in it (about 30, across the VIA, Schwartz, Rokeach, Work ethic, Value ethics, Outline of self and Self-determination sources).
- Remove anything that is no longer referenced once those values are gone: the group name in the README group list, the design note that introduced it, and any source or attribution that ends up contributing no values or no longer appears in the app. The other eleven groups are unchanged.
- Change the values selection rule from "at most 5" to "between 5 and 10": the user needs at least 5 to continue and cannot select more than 10. Custom values count.
- Update the count, limit message, instructions and over-limit messages to match ("n of 10 selected", "Select 5 to 10 values", with a message while fewer than 5 are selected).
- Saved profiles still load: a removed value becomes a custom value, as with earlier removals. A loaded profile with fewer than 5 values opens on the values page; one with more than 10 must be reduced to 10.
- **BREAKING** (for users): a values selection of 1 to 4 no longer lets the user continue.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `values-grouping`: the Wellbeing group no longer exists; the catalog thresholds still hold with the smaller set.
- `values-selection`: the instructions and limit become 5 to 10, and at least 5 are required to continue.
- `selection-limits`: the values limit becomes 10 with a 5 minimum; feedback, custom-value and over-limit rules follow.
- `profile-flow`: values completion needs 5 selections, not one.
- `profile-loading`: loaded values over 10 are constrained, and under 5 open the values page.

## Impact

- `src/data/catalog/values/*.ts` (seven source files lose the group), possibly `src/data/sources.ts` and README source text if a source becomes unreferenced.
- `src/state/profile.ts` (`MAX_SELECTION`, `LIMITS`, `overBy`, `pageComplete`, step gating), `src/components/SelectionStatus.tsx`, `SelectionHelp`/values instructions, `AddEntry` messages.
- Tests: `limits.test.tsx`, `App.test.tsx`, `load-ui.test.tsx`, `add-entry.test.tsx`, `profile.test.ts`, `load.test.ts`.
- README (group list, selection-limit sections, checklist).

## Assumptions

- "Between 5 and 10" is inclusive and a minimum of 5 is enforced before continuing, not just a recommendation.
- Skills stay unlimited.
- "Sections no longer referenced" means the group name and any source or text that exists only because of it; all eleven sources still contribute to other groups, so none are expected to be removed (to be verified when applying).
