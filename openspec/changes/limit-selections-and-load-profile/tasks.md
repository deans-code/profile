# Tasks

## 1. Selection limits

- [ ] 1.1 Add `MAX_SELECTION = 10`, reducer enforcement for toggle and add-custom (including duplicate-match selection), `selectionCount`/`overBy` helpers, and the over-limit gating in `stepBlockedReason`; verify reducer tests for reaching the limit, swapping a word, custom entries counting, per-page limits and an over-limit page blocking forward navigation but not back
- [ ] 1.2 Add the `SelectionStatus` count and limit message, `aria-disabled` styling for unavailable words, and the disabled Add control that keeps typed text, on the values and skill pages; verify component tests for "7 of 10 selected", the live message at the limit, unavailable words staying focusable, Add disabled with text retained, and a definition still opening at the limit

## 2. Definition controls

- [ ] 2.1 Fix the long-press flag in `TermButton` (clear on new pointerdown and shortly after pointerup/cancel); verify tests that a press ending with no click does not swallow the next mouse click or tap
- [ ] 2.2 Rework `DefinitionPanel` positioning and closing (reposition on scroll/resize/visualViewport, close when the anchor is off screen or removed, close on step change via a `resetKey`); verify tests for a viewport change keeping the panel open, section change by keyboard closing it, a filter hiding the word closing it, and removal of a custom word closing it
- [ ] 2.3 Add `aria-haspopup`/`aria-describedby` association and a test for each control described in the instructions (right-click, `?`, context-menu key, Shift+F10, long-press); verify the tests pass and the instructions text matches the controls

## 3. Load a saved profile

- [ ] 3.1 Implement `parseProfile` and the mapping to state in `src/load.ts` with the size, shape, score, entry-count and name-length checks; verify unit tests for a valid file, round trip with `toJson`, custom versus built-in matching, trimming and de-duplication, unknown properties, and each rejection case with specific messages
- [ ] 3.2 Add the `loadProfile` reducer action and landing-step logic (card when allowed, otherwise the first page needing attention with a message); verify reducer tests for atomic replacement, over-limit files, empty lists and scores applied
- [ ] 3.3 Build the `LoadProfile` control in the header (file input, live region, inline replace/cancel confirmation, re-pickable same file) and wire it through the step navigation; verify component tests for success, each error leaving the current profile unchanged, confirm and cancel, loading the same file twice, and editing a loaded profile through every step

## 4. Documentation and integration

- [ ] 4.1 Update the README (features, usage for the limit and for loading, known defects) and add an end-to-end test (build a profile, download JSON, load it into a fresh app, edit, download again); verify `npm test` and `npm run build` pass and the README matches the app
- [ ] 4.2 Check in a real browser with a script: the 10-word limit, load of a downloaded file, the long-press and viewport fixes where simulable, and no horizontal overflow at 360 and 1600 px; verify the script output and screenshots match the specs
