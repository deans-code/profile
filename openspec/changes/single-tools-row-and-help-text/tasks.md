# Tasks

## 1. Move text into Help

- [x] 1.1 In `WordPicker.tsx`, `SkillStep.tsx` and `ValuesStep.tsx`, remove the `hint` line, and render the add-your-own instruction (`AddEntryHelp`, same id), the filter hint and, on skill pages, the experience explanation inside the Help `<details>`; verify that with Help collapsed none of them is visible and with it open all are.
- [x] 1.2 Update tests that read this text (`add-entry.test.tsx`, `values-grouping.test.tsx`, `guidance.test.tsx`, others failing), add a test that the input's accessible description still contains the add instruction while Help is collapsed, and verify `npm test` passes.

## 2. Single tools row

- [x] 2.1 In `WordPicker.tsx`, move the filter input (with a visually hidden label and short placeholder) and the Show all / Collapse all buttons into the pinned bar after Add, keeping the filter count and bulk status live regions just below the row; verify all controls still work (filter, bulk, add, mode).
- [ ] 2.2 In `src/styles.css`, lay the row out on one line at desktop widths with a flexible filter, keep options and Add pinned on narrow screens (filter and bulk buttons not sticky below 40rem), and update `--pinned-bar-height`; verify in the browser at 1280px, 768px and 24rem that the row is one line at 1280px, nothing overflows horizontally, and the pinned bar does not cover a focused word.
- [x] 2.3 Add a test that the filter input and both bulk buttons are in the same container as Add (and the options on skill pages) and that the removed visible "Filter …" heading and hint are gone; verify it passes.

## 3. Final checks

- [x] 3.1 Run `npm test`, `npm run build` and `openspec validate single-tools-row-and-help-text --strict` and verify all succeed.
