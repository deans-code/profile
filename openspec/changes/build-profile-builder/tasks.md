# Tasks

## 1. Project setup

- [ ] 1.1 Scaffold Vite + React + TypeScript app, add Vitest and Testing Library, and Node entries in `.gitignore`; verify `npm run build` and `npm test` succeed on the empty app
- [ ] 1.2 Add a README section on running, testing and building; verify the documented commands run as written

## 2. Domain model and data

- [ ] 2.1 Define profile types and the wizard reducer (select/deselect, add/remove custom, set score, deselect resets score, step gating); verify reducer unit tests for the values-selection, skills-selection and skill-scoring spec scenarios pass
- [ ] 2.2 Author the values list (~50) and the three skill catalogs (≥40 skills, ≥5 categories each); verify a data test checks sizes and no duplicates within or across skill sections

## 3. Values step

- [ ] 3.1 Build the values cloud with toggle buttons, selected count, custom-value input with duplicate/empty handling, removal of custom values, and a continue gate; verify component tests cover the values-selection scenarios including keyboard toggling

## 4. Skills steps

- [ ] 4.1 Build a reusable categorized skill picker with text filter, selection, and custom-skill entry, used for the three sections; verify component tests cover filtering with retained selections and custom/duplicate handling
- [ ] 4.2 Add the stepper and gating so scoring is unavailable until all three sections have selections, with a message naming missing sections; verify a test for the gating scenario and back-navigation preserving selections

## 5. Scoring step

- [ ] 5.1 Build the scoring screen with a 1–10 slider and readout per selected skill grouped by section, default 5; verify component tests for default, adjustment, retained scores and reset after deselect

## 6. Profile card and export

- [ ] 6.1 Implement `toJson` and `toMarkdown` pure functions with Markdown escaping; verify unit tests for structure, custom entries, special characters and valid JSON
- [ ] 6.2 Build the profile card (values, scored skills ordered by score then name), Edit action, and Download JSON/Markdown buttons using Blob downloads; verify component tests for card content and download triggers

## 7. Polish and integration

- [ ] 7.1 Apply responsive and light/dark styling and verify keyboard and focus behavior manually at phone and desktop widths
- [ ] 7.2 Run an end-to-end flow test (values → three skill sections → scoring → card → both downloads) and `npm run build`; verify both pass

## 8. Hosting

- [ ] 8.1 Set the Vite `base` for GitHub Pages and add a GitHub Actions workflow that runs tests, builds and deploys `dist/` to Pages on push to `main`; verify `npm run build` followed by `npm run preview` serves the app correctly under the base path
- [ ] 8.2 Enable Pages (GitHub Actions source) in the repo settings, push, and document the deploy process and live URL in the README; verify the deployed site loads and the workflow run succeeds
