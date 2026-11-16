# Tasks

## 1. Data and integrity

- [x] 1.1 Add a `BroadTerm` type and per-section broader-terms files (at least 8 each, using the initial lists in design.md adjusted to real catalog names), exposed through `src/data/skills.ts`; verify `npx tsc --noEmit` passes.
- [x] 1.2 Add definitions for every broader term in `src/data/definitions/*.ts`, each naming the options it covers; verify the existing "every built-in has a definition" test is extended to broader terms and passes.
- [x] 1.3 Add data tests: every `covers` name exists in the same section, each term covers at least 3 options, names are unique ignoring case across sections, values and options, at least 8 per section, definitions mention each covered option; verify `npm test` passes.

## 2. Selection, filter, load and export

- [x] 2.1 Make the load code, state and export treat broader terms as built-in options (no custom entry, spelling restored); verify load tests: "ci/cd" loads as "CI/CD", other names still load as custom.
- [x] 2.2 Verify selecting a broader term never selects its covered options and the two are independent in both experience options, with a state test.

## 3. UI and colour

- [x] 3.1 Render a "Broader terms" card with a caption before the category cards in `WordPicker` via a `broadTerms` prop, passed from `SkillStep`, with filtering applied; verify UI tests: card first on all four pages, hidden when the filter matches nothing, individual options still listed.
- [x] 3.2 Add the `.chip.broad` style and colour tokens for light, dark and the accessibility options in `src/styles.css`; verify a test (or a documented calculation in the test file) that text contrast is at least 4.5:1 and border/selected at least 3:1 in each theme, and that the colour differs from the section accents.
- [x] 3.3 Verify keyboard, right-click and long-press open broader term definitions and the selected indicator is not colour-only, with component tests.

## 4. Docs and integration

- [x] 4.1 Add a README note that broader terms are the app's own groupings with no source citation; verify the sources README test still passes.
- [ ] 4.2 Run `npm test` and `npm run build`, then view each skills page in the browser in light, dark and an accessibility option; verify the only failing test is the existing `transitions.test.tsx` one.
