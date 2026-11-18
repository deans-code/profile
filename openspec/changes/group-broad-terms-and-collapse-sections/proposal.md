## Why

Broader terms (for example "CI/CD") currently sit beside their options but behave independently, so a user can end up with both "CI/CD" and "Jenkins" in their profile, which says the same thing twice and uses up the selection limit. The dashed styling is also easy to miss, and the long category cards make the pages hard to scan.

## What Changes

- **BREAKING**: Selecting a broader term deselects every option it covers, and selecting a covered option deselects the broader term. This replaces the rule that a broader term never changes the selection of its options.
- The rule applies separately to previous and desired experience, and to the values page.
- A broader term's group is drawn with a solid border, and the broader term gets a solid border too, so the group reads as one clearly bounded unit. The "Broad" label and the "Groups these" caption stay, so the grouping does not depend on line style alone.
- Every category card on the values and skills pages can be collapsed and expanded with a header button. Cards start expanded, show how many of their options are selected while collapsed, and stay open while a filter is matching them.
- The explanatory note on each page is updated to describe the new behaviour.

## Capabilities

### New Capabilities
- `collapsible-categories`: Category cards on the values and skills pages collapse and expand, and report their selection count while collapsed.

### Modified Capabilities
- `broad-term-options`: broader terms and their covered options become mutually exclusive in the selection, and the group's visual treatment changes from dashed to solid.

## Impact

- `src/state/profile.ts`: `toggleValue` and `toggleSkill` reducers apply the exclusivity rule (needs the covered-option lookup from `src/data/broad-terms.ts`). Adding a custom entry that matches an existing option goes through the same rule.
- `src/components/WordPicker.tsx` and `src/styles.css`: collapsible card header, solid group and term borders, updated note.
- Tests: `src/broad-terms.test.tsx`, `src/values-grouping.test.tsx`, `src/limits.test.tsx`, `src/accessibility.test.tsx` and the reducer tests need updates; new tests for collapsing.
- Profiles already saved or loaded that contain both a term and options it covers are kept as they are; the rule applies only to later selections.
