# Tasks

## 1. Per-page limits

- [x] 1.1 Replace the single limit with `LIMITS` and `limitFor(page)` (values only), and update `isFull`, `overBy`, the gating and `loadLanding` to use it; verify reducer and loader tests that skills accept 30 selections and custom skills past 10, values still stop at 10, loaded skill lists over 10 do not block, and a loaded over-limit values list still opens the values page
- [x] 1.2 Make `SelectionStatus` take an optional limit ("n of 10 selected" with messages on values; plain "n selected" on skills) and apply dimming and the disabled Add control only when a limit exists and is reached; verify component tests on a skill page with 12 selected (no dimming, Add enabled, no limit text) and on the values page (unchanged behavior)

## 2. Shared picker

- [x] 2.1 Extract `WordPicker` from `SkillStep` (filter, category cards, Custom group, Add, status, descriptions) and make `SkillStep` a thin wrapper; verify the existing component, limit, definition and end-to-end tests pass unchanged

## 3. Grouped, expanded values

- [x] 3.1 Restructure `src/data/values.ts` into `VALUE_CATEGORIES` (8 or more categories) with the flat `COMMON_VALUES` derived from it, keeping every original value verbatim, and add values to reach at least 100; verify data tests for size, category count, no duplicates across categories, and that a test loading a profile with every original value restores each as built-in
- [x] 3.2 Write descriptions for every new value in `src/data/definitions/values.ts`; verify the coverage and two-sentence tests pass for all values
- [x] 3.3 Render the values page with `WordPicker` (category cards, filter, Custom group, limit of 10 retained); verify component tests for grouped headings, filtering with retained selections, the Custom group, the limit behavior and a right-click description, and a screenshot check at 360, 1024 and 1600 px with no horizontal scrolling

## 4. Instructions

- [x] 4.1 Rewrite `SelectionHelp` (desktop-first primary line, page-specific limit line, one secondary keyboard and touch line) and change user-visible "definition" wording to "description", including the panel's accessible name; verify tests that the values page mentions up to 10, skill pages mention no limit, the primary line comes first, and each described control still opens a description without changing selection

## 5. Documentation and integration

- [x] 5.1 Update the README (features, usage, selection limit section for values only, grouped values) and add an end-to-end test with 30 or more skills across sections through scoring, the card and both downloads; verify `npm test` and `npm run build` pass
- [x] 5.2 Check in a real browser with a script: right-click descriptions on values and skills, 25 or more skills selected without a limit, the values limit at 10, grouped values layout and loading an older saved profile; verify output and screenshots match the specs
