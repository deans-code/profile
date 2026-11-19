# Tasks

## 1. Page Help blocks

- [ ] 1.1 In `src/styles.css`, style `.page-help` as the area block and add a shared `.help-block` inner-block rule (surface background, border, accent left edge), retiring the separate `.help` tint and `.assistant` dashed border; verify by building and checking the rules exist with no leftover conflicting styles.
- [ ] 1.2 Add the `help-block` class to the ChatGPT aside, `SelectionHelp` aside, experience intro, add-your-own instruction and filter hint (`AssistantLink.tsx`, `SelectionHelp.tsx`, `AddEntry.tsx`, `WordPicker.tsx`); verify with a test that an expanded skill-page Help holds five `.help-block` elements inside `.page-help`, the values page holds four, and none are visible when collapsed.

## 2. Side bar blocks

- [ ] 2.1 Style `.route-help` as the same area block (summary inside the block) in `src/styles.css`, and add a test that "How this works" and "Privacy" are both block containers, collapsed by default, and still toggle; verify the test passes.

## 3. Checks

- [ ] 3.1 In the browser, check all four skill sections, the values page and the side bar in light and dark themes for contrast (≥4.5:1 text, ≥3:1 block border), that inner blocks are visibly different from the area block, and that summaries keep a 44px target and a visible focus outline; adjust colours if needed.
- [ ] 3.2 Run `npm test`, `npm run build` and `openspec validate help-blocks --strict` and verify all succeed after group 4 is also done.

## 4. Optional skill pages

- [ ] 4.1 In `src/state/profile.ts`, remove the skill-page requirement from `stepBlockedReason` and `loadLanding`, delete `missingSections`, add `furthest` tracking, and mark skill steps complete when they have a selection or are behind `furthest`; verify with unit tests that the profile card is reachable with empty skill pages, that 4 values still blocks, and that over-limit still blocks.
- [ ] 4.2 In `src/App.tsx` use the new completion rule for check marks and progress, and in `ProfileCard.tsx` show "Nothing chosen" for empty skill groups; verify with component tests of the step marks, progress bar and card.
- [ ] 4.3 Update tests that assert the old rule (`App.test.tsx`, `load.test.ts`, `limits.test.tsx`, others failing) and add a test that a saved file with empty skill pages opens the profile card; verify `npm test` passes in full.
