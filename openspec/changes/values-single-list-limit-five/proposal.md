# Proposal

## Why

Values describe who a person is, not what they have done or want to learn, so asking for "previous" and "desired" values is confusing and doubles the work. A short list of core values (five) is also more meaningful than twenty. Separately, carrying the chosen experience option from page to page is surprising: each skill page should start on "Previous experience" so the user sees the same starting point every time.

## What Changes

- **Values page has a single selection**: no Previous/Desired switch on the values page, one list, one count.
- **Limit values to 5** (down from 20). The limit, count and messages say 5. Skill pages remain unlimited.
- **The experience option resets on every page change**: opening any page (by Continue, Back, the step tabs, Edit or after loading a profile) shows "Previous experience" active. Choosing "Desired experience" applies to the current skill page only.
- **Profile card, JSON and Markdown**: values are a single list with no Previous/Desired grouping. **BREAKING** for the JSON `values` property (now a plain list of names).
- **Loading**: accepts the plain values list, the earlier `{ experience, desired }` object (both lists are merged into one, without duplicates) and older scored files. A loaded profile with more than 5 values opens the values page and asks the user to deselect down to 5.
- Instructions on the values page drop the "other option" wording.

## Capabilities

### New Capabilities
- `values-selection`: Values are chosen in one list, with a limit of 5.
- `experience-option-reset`: The experience option defaults to previous experience whenever a page is opened.
- `values-profile-format`: How values appear on the profile card, in downloads and when loading older or newer files.

### Modified Capabilities
<!-- None can be declared: earlier changes are not archived into openspec/specs, which is empty. design.md lists which earlier requirements this change supersedes. -->

## Impact

- Code: `src/state/profile.ts` (values state becomes a single list, `MAX_SELECTION` 5, `setMode` reset on navigation and load), `WordPicker`/`ValuesStep`/`SkillStep` (switch only on skill pages), `SelectionHelp`, `SelectionStatus`, `ProfileCard`, `src/export.ts`, `src/load.ts`, `App.tsx`, `useStepNavigation`, tests and README.
- No catalog or description changes; no new dependencies.
- Existing downloaded files keep loading. Files with more than 5 values load in full but must be trimmed before continuing.
- Out of scope: changing the skill pages' options, limits on skills, any new grouping of values.
- Assumptions:
  - "When switching tabs" means any change of page, including the step tabs, Continue, Back, Edit and loading a profile.
  - A value previously saved only under desired experience is treated as one of the user's values (merged), rather than dropped.
  - The existing 20-value test data and README text are updated to 5.
