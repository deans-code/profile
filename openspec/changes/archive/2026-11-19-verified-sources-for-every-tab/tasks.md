## 1. Source registry and attribution structure

- [x] 1.1 Replace the flat list in `src/data/sources.ts` with a source registry (id, title, publisher, url, year) and a per-tab ordered list `TAB_SOURCES` for values, technical, engineering, interpersonal and ai, seeded with the sources already listed. Verify: type-check passes and a test reads the registry and each tab's list.
- [x] 1.2 Create `src/data/attribution.ts` mapping each tab and option name to `{ sources, checked }` with a `getAttribution(kind, name)` lookup. Verify: unit test for lookup, case-insensitive like definitions, and undefined for custom names.
- [x] 1.3 Add integrity tests (spec: catalog-verification): every built-in option on every tab has at least one source on its tab's list and a check date, no attribution for options not in the catalog, no source listed on a tab that supports no option there, each source has title, publisher, url and year, no option on more than one tab. Verify: tests run and currently fail only where data is missing.
- [x] 1.4 Render the per-tab Sources section in `src/App.tsx` from `TAB_SOURCES[state.step]` (none on the Profile page), with the existing note and `target="_blank" rel="noopener noreferrer"` links; update `src/styles.css` if needed. Verify: UI test shows different sources on Technical and Interpersonal, and none on Profile.
- [x] 1.5 Add "Sourced from" to `Panel` in `src/components/DefinitionPanel.tsx`: a list of links to every recorded source, in tab order, shown for right-click, keyboard and long-press. Verify: tests cover one source, several sources, keyboard-reachable links, Escape/outside-click/Close still work, selection unchanged, and export contains no sources.

## 2. Technical development tab

- [x] 2.1 Fetch and vet the candidate sources for the tab (reachable, current, terms permit linking), and record accepted ones in the registry with year. Verify: at least three accepted, each address opens, rejects and reasons noted in the README.
- [x] 2.2 Check every existing technical option against those sources; record supporting sources and the check date in `attribution.ts`; remove unsupported options; fix out-of-date names and descriptions. Verify: integrity tests pass for the technical tab and a list of removals and renames is in the README.
- [x] 2.3 Add technologies the sources show to be widely used that are missing, to the right category with a description and attribution. Verify: integrity tests pass; each addition cites at least one source that names it.
- [x] 2.4 Confirm saved profiles with removed technical options still load as custom entries. Verify: a test loads a profile containing a removed name and finds it among custom entries.

## 3. Engineering tab

- [x] 3.1 Vet and register at least three sources for Engineering (see design candidates). Verify: each address opens; rejects noted.
- [x] 3.2 Check, attribute, correct and prune every Engineering option; add missing sourced options with descriptions. Verify: integrity tests pass for the tab; removals and additions listed in the README.

## 4. Interpersonal tab

- [x] 4.1 Vet and register at least three sources for Interpersonal. Verify: each address opens; rejects noted.
- [x] 4.2 Check, attribute, correct and prune every Interpersonal option; add missing sourced options with descriptions. Verify: integrity tests pass for the tab; removals and additions listed in the README.

## 5. AI engineering tab

- [x] 5.1 Vet and register at least three sources for AI engineering, favouring ones updated within the last year because the field moves quickly. Verify: each address opens and shows a current edition; rejects noted.
- [x] 5.2 Check, attribute, correct and prune every AI engineering option, including model, tool and provider names that may be renamed or retired; add missing sourced options with descriptions. Verify: integrity tests pass for the tab; removals, renames and additions listed in the README.

## 6. Values tab

- [x] 6.1 Vet and register at least three sources for Values (published value frameworks and surveys). Verify: each address opens; rejects noted.
- [x] 6.2 Check, attribute and prune every value; correct descriptions; keep the grouping tests passing. Verify: integrity and values-grouping tests pass; removals listed in the README.

## 7. Documentation and final checks

- [x] 7.1 Update `README.md`: sources per tab with links, publishers and years, the inclusion and verification rules, how to refresh a tab's sources, and the list of removed, renamed and added options. Verify: every source URL in the README appears in the registry and the reverse, enforced by a test.
- [x] 7.2 Run `npm test` and `npm run build`. Verify: both pass.
- [ ] 7.3 Walk each tab in the browser: Sources list is correct, right-click an option with one source and one with several, check links open, panel behaves on keyboard and touch. Verify: no wrong, broken or missing source links; no layout overlap at large text size.
