# Tasks

## 1. Reveal the Custom card in WordPicker

- [x] 1.1 In `src/components/WordPicker.tsx`, wrap `onAddCustom` to set a pending-reveal ref and clear a non-empty filter when the text is non-blank; verify with a test that the filter is cleared after a successful add and kept after an add that adds nothing (empty text).
- [x] 1.2 Add a ref to the Custom card and an effect that, when the pending flag is set and `custom.length` has grown, calls `scrollIntoView({ block: 'nearest', behavior })` (`'auto'` when reduced motion is preferred, else `'smooth'`) and clears the flag; verify with a test that stubs `scrollIntoView` and asserts one call with the right options after adding "Craftsmanship of docs" on the values page.
- [x] 1.3 Reuse `prefersReducedMotion` from `src/useStepNavigation.ts` (export or move it to a small shared module); verify a test with reduced motion mocked asserts `behavior: 'auto'`.
- [x] 1.4 Add `scroll-margin-top: var(--pinned-bar-height)` for the Custom card in `src/styles.css`; verify the rule exists and the build passes.

## 2. Tests across tabs and no-scroll cases

- [x] 2.1 Add tests in `src/add-entry.test.tsx` that adding a custom skill scrolls on the technical, engineering, interpersonal and AI engineering tabs; verify they pass.
- [x] 2.2 Add tests that `scrollIntoView` is not called when adding text that matches an existing entry, when pressing Add with empty text, when loading a profile with custom entries, and when switching experience options or tabs; verify they pass.
- [x] 2.3 Update the README section on adding your own, if it describes where custom entries appear, to mention the scroll; verify the text matches the behaviour.

## 3. Integration check

- [ ] 3.1 Run `npm test` and `npm run build`, then in the browser add a custom value on the values page and a skills page from the top of a long list, and confirm the Custom card scrolls into view below the pinned bar; verify the only failing test is the existing `transitions.test.tsx` one.
