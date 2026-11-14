## 1. Fix deployment run errors

- [ ] 1.1 In `.github/workflows/deploy.yml`, remove the "Ensure Pages project exists" step, set `wranglerVersion` on the deploy step to a current 4.x, and update checkout, setup-node and wrangler-action to the latest majors that run on Node 24 (check each release's inputs first). Verify: the YAML is valid and contains no `pages project create` or `continue-on-error`.
- [ ] 1.2 Add a test in `src/deployment.test.ts` that reads the workflow and asserts it has no project-create step, no `continue-on-error`, and a pinned `wranglerVersion`. Verify: `npm test` passes and fails if the ensure step is restored.
- [ ] 1.3 Update `README.md` with the one-time instruction to create the `profile` Pages project (`wrangler pages project create profile --production-branch=main`). Verify: README no longer implies the workflow creates it.
- [ ] 1.4 Push and run the workflow (or `workflow_dispatch`). Verify with `gh run view <id>`: success with no error annotations and no code 8000002 or `npx canceled` lines in the log.

## 2. Preferences and theming

- [ ] 2.1 Add `src/preferences.ts` with the theme and text-size value lists, validated read from `localStorage` (try/catch, defaults on failure), write, and apply-to-`<html>` functions. Verify: unit tests cover defaults, valid values, invalid saved values and throwing storage.
- [ ] 2.2 Add an inline script to `index.html` that applies saved attributes before first paint (same validation, silent on failure). Verify: build output contains it and a test confirms it sets `data-theme` and `data-text-size` from stored values.
- [ ] 2.3 In `src/styles.css`, add `:root[data-theme='dark']` mirroring the dark palette, scope the media query to `:root:not([data-theme='light'])`, and set `color-scheme` per theme. Verify: `src/theme.test.ts` extended to check both dark blocks have identical tokens and that every palette meets AA contrast in light and dark.
- [ ] 2.4 Add `data-text-size` rules scaling the root font size (100, 112.5, 125, 150%) and convert text-bearing `px` sizes to `rem`. Verify: tests assert the four rules exist; manually check no horizontal scroll at 1280px at Largest.

## 3. Accessibility control

- [ ] 3.1 Create `src/components/AccessibilityOptions.tsx`: an "Accessibility" disclosure button opening a panel with Theme (Match system, Light, Dark) and Text size (Default, Large, Larger, Largest) radio groups; selecting applies and saves immediately. Verify: component tests cover default state, each option updating `<html>` attributes and storage, keyboard selection, and storage unavailable.
- [ ] 3.2 Place it in the `header-row` in `src/App.tsx` and style it to wrap cleanly at large text and narrow widths. Verify: `App` test finds the control on every step including the profile; export test confirms the downloaded file has no preference fields.
- [ ] 3.3 Update `README.md` with the accessibility options and where preferences are stored. Verify: README section present.

## 4. Final checks

- [ ] 4.1 Run `npm test` and `npm run build`. Verify: both pass.
- [ ] 4.2 Walk the full flow in the browser in Light, Dark and Match system at each text size, reloading to confirm persistence and no theme flash. Verify: all steps readable with no overlap or horizontal scroll.
