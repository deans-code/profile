# Tasks

## 1. Restructure the layout

- [ ] 1.1 In `src/App.tsx`, replace the `<header>` with an `<aside aria-label>` containing the intro block (title, intro, privacy line, How this works, Privacy), Accessibility options, Load profile and the step navigation, and wrap `<main>`, the Back/Continue footer and Sources in a main-panel container; verify the app renders and the step flow works (`npm test`).
- [ ] 1.2 In `src/styles.css`, add the grid layout (side bar `minmax(16rem, 22rem)`, main `minmax(0, 1fr)`) at 60rem and up, a sticky scrollable side bar, and single-column stacking below 60rem; verify in the browser at 1280px and 24rem widths with no horizontal scroll.
- [ ] 1.3 Make the stepper vertical in the side bar with 44px targets and stack the Accessibility and Load profile tools; verify the stepper and an open Accessibility panel fit and stay reachable at the Largest text size.
- [ ] 1.4 Check `useStepNavigation` scroll/focus after a step change still lands on the main panel; verify by changing steps on a long page and on a narrow viewport.

## 2. Tests

- [ ] 2.1 Add tests for the side bar and main landmarks and their contents (six items in the side bar and none in main; heading, Back/Continue and Sources in main) and verify they pass.
- [ ] 2.2 Update existing tests that rely on the header (for example `accessibility.test.tsx`, `privacy.test.tsx`, `guidance.test.tsx`, `load-ui.test.tsx`) and verify `npm test` passes in full.
- [ ] 2.3 Run `npm run build` and verify type-check and build succeed.

## 3. Specs

- [ ] 3.1 Run `openspec validate move-guidance-to-sidebar --strict` and verify it reports the change valid.
