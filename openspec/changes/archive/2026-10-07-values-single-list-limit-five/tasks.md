# Tasks

## 1. State: single values list, limit 5, reset on navigation

- [x] 1.1 Change `selectedValues` to `string[]`, set `MAX_SELECTION` to 5, make the value actions and the selectors ignore the mode for the values page, drop "under {mode}" from the values over-limit message, and set `mode: 'experience'` in `goTo`; verify reducer tests (values stop at 5, a custom value counts, mode does not affect values, `goTo` and `loadProfile` reset mode while keeping desired skill selections, over-limit values still block later steps and `loadLanding` opens the values page) and a clean `tsc` for `src/state`

## 2. Values page UI

- [x] 2.1 Make `ModeSwitch` props optional in `WordPicker` and the option line optional in `SelectionHelp`, remove them from `ValuesStep`, and update the values limit line to "Select up to 5 values."; verify component tests that the values page has no radio group or option wording, shows "n of 5 selected", dims and disables Add at 5, and still opens descriptions for dimmed values, and that skill pages still show the switch with Previous experience active
- [x] 2.2 Verify with an App test that choosing "Desired experience" then using Continue, Back, a step tab and Edit always lands on "Previous experience", with the desired words and count kept

## 3. Profile card, export and loading

- [x] 3.1 Change `Profile.values` to a sorted `string[]` in `buildProfile`, `toJson`, `toMarkdown` and `ProfileCard` (single list, no option headings for values; skills unchanged); verify export tests for the JSON array, the Markdown values list without option headings, and the card
- [x] 3.2 Add `parseValues` to `src/load.ts` (plain list, `{ experience, desired }` merged without duplicates ignoring case, entry and name checks per list) and update `profileToState` and `LoadedProfile`; verify load tests for each format including the old scored file, the 8-value file loading in full and opening the values page with a message to deselect 3, custom values, rejections and the round trip, and update the load UI tests

## 4. Documentation and integration

- [x] 4.1 Update the README (limit 5, no desired option for values, the option resets on each page, JSON `values` is a list, earlier formats still load) and verify no text still says 20 values or per-option value limits
- [ ] 4.2 Run `npm test` and `npm run build`, then walk through the app once (values page without the switch, 5 values max, Desired on a skill page then Continue and Back, download JSON, reload it) and verify everything passes and the download has `values` as an array
