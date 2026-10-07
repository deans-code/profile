# Tasks

## 1. State model, steps and scoring removal

- [ ] 1.1 Add `Mode`, the `ai` section, the two-list state shape, `setMode`, per-mode toggle/add/remove actions and selectors; delete `scores`, `setScore`, `getScore`, `clampScore` and score constants; set `STEPS` to values, technical, engineering, interpersonal, ai, card; verify with reducer tests (independent lists, same word in both, custom entry shared and removed from both, sticky mode) and a clean `tsc` for `src/state`
- [ ] 1.2 Implement `pageComplete`, per-mode values limit of 20 (`overBy`, `isFull`), the updated `stepBlockedReason` messages (naming the mode and the AI engineering page) and `loadLanding`; verify with tests for desired-only completion, an empty AI page blocking the Profile, over-limit in either mode, and landing on the first page needing attention

## 2. Catalogs and descriptions

- [ ] 2.1 Rebalance `CATALOGS.technical`: remove "AI and machine learning", move AI entries to the AI catalog, add hands-on categories and entries for an AI engineering team (Python data tooling, notebooks, vector and search databases, data pipelines, GPU and CUDA, observability, queues), keeping existing names verbatim; write their descriptions in `definitions/technical.ts`; verify data tests (no AI category, "GPU" filter finds an entry, every entry described, names unique, a saved profile with the original technical names still matches built-ins)
- [ ] 2.2 Add `CATALOGS.ai` (11 or more categories, about 150 entries, covering every topic and named entry in the ai-engineering-section spec), review names for currency, and add `src/data/definitions/ai.ts` wired into `definitions.ts` (`TermKind`, index); verify data tests for required categories with 4 or more entries each, required named entries, full description coverage, uniqueness within the catalog and no overlap with technical

## 3. Experience mode UI

- [ ] 3.1 Create `ModeSwitch` (radio group, arrow keys, counts for both options) and render it on the values and all skill pages, wiring `ValuesStep`/`SkillStep`/`WordPicker`/`SelectionStatus` to the active mode; verify component tests for default option, switching, independent selections, counts, sticky mode on Continue, values limit per option and a custom entry added in "Desired experience"
- [ ] 3.2 Update `SelectionHelp` (active option line and "other option is separate" line) and the stepper/app shell for the AI engineering tab (label, `data-section="ai"` colour, navigation, Finish label); verify tests for the instruction text on every page, the step order and the AI tab being reachable, then check at 360, 1024 and 1600 px that the switch and AI colour render without horizontal scrolling

## 4. Profile card, export and loading

- [ ] 4.1 Remove `ScoringStep` and scoring styles and tests; change `buildProfile`, `toJson`, `toMarkdown` and `ProfileCard` to the two-group, no-score format; verify export tests for JSON shape (no `score`), sorted lists, Markdown headings with empty lists omitted, and a card test with no bars or numbers
- [ ] 4.2 Update `parseProfile` and `profileToState` for the new shape plus the legacy shape (values array, scored skills, scores ignored, empty `ai`); verify load tests for new format, legacy file with a score of 8 loading as previous experience, round trip of a downloaded profile, unknown names becoming custom, invalid or oversized files rejected, and the landing page and message for an incomplete file

## 5. Documentation and integration

- [ ] 5.1 Update the README (scope list: remove scoring, add AI engineering page and experience options, the new JSON format and that older files still load) and verify the text matches behavior
- [ ] 5.2 Run `npm test`, `npm run build` and a manual walkthrough (select on both options across all pages, finish, download JSON and Markdown, reload the JSON) and verify everything passes and the downloads contain no scores
