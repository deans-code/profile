## 1. Header

- [ ] 1.1 In `src/App.tsx`, wrap the how-it-works `ol` in `<details className="route-help">` with summary "How this works", collapsed by default
- [ ] 1.2 Wrap title row, intro and the details in `.intro-block`; wrap step status, progress and stepper nav in `.nav-block`
- [ ] 1.3 In `src/styles.css`, style `.nav-block` (tint background, border, radius, padding, gap from intro) and the details/summary (visible affordance, focus ring); check light/dark and any high-contrast styles

## 2. Page help

- [ ] 2.1 In `WordPicker.tsx`, wrap `AssistantLink` (when present) and `SelectionHelp` in `<details className="page-help">` with summary "Help", collapsed by default; leave `AddEntryHelp` and the pinned bar outside
- [ ] 2.2 Style `.page-help` in `src/styles.css`, tidying margins of the nested `.help` and `.assistant` blocks
- [ ] 2.3 In `AddEntry.tsx`, give `AddEntryHelp` a `noun` prop and change the text to "Want to add a {noun} not here? Type it and press Add or Enter. It will appear under Custom, selected."; pass "value"/"skill" from `WordPicker`

## 3. Tests

- [ ] 3.1 Update `src/App.test.tsx` instruction tests to expand Help first; add tests that Help and "How this works" start collapsed and toggle, on the values page and a skill page
- [ ] 3.2 Update `src/add-entry.test.tsx` for the new wording (value and skill pages)
- [ ] 3.3 Update `src/assistant.test.tsx` to expand Help before asserting on the ChatGPT box
- [ ] 3.4 Run the full test suite and typecheck/build; fix failures

## 4. Verify

- [ ] 4.1 Run the app and check every tab: intro vs navigation separation, collapsed defaults, add hint wording
