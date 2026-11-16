# Tasks

## 1. Data model

- [x] 1.1 Key `BROAD_TERMS` by kind (`values` plus the four sections) and generalise `broadTermCategory`, `broadTermHasTie` and `categoriesWithBroadTerms` in `src/data/skills.ts` to read categories from `VALUE_CATEGORIES` for values; verify `npx tsc --noEmit` and the existing broader-term tests pass unchanged for skills.
- [x] 1.2 Add the broader values from design.md (at least 20, names verified against the catalog) with definitions via `broadTermDefinition` merged into the values definitions; verify the "every built-in has a definition" test is extended to values and passes.
- [x] 1.3 Extend `src/data/broad-terms.test.ts`: names unique across values, skills and terms; covers exist in the same kind; at least 3 covered; at least 2 terms per category (1 under 8 options); no placement ties; at least 20 values terms; definitions name every covered option; verify the minimum-per-category test fails first for the empty categories.

## 2. More skills groupings

- [x] 2.1 Technical: add terms so every category meets the minimum, starting with Editors and IDEs and Game development and graphics, and add 2 to 4 more to Testing and code quality, Web frameworks and technologies, Languages and Databases; verify the data tests.
- [x] 2.2 Engineering: add terms for Software knowledge areas and 2 to 4 more for Microservice and integration patterns, Architecture and design and Delivery and process; verify the data tests.
- [x] 2.3 Interpersonal: add terms so every category has at least two, including Belbin's action, people and thinking groups in Team roles; verify the data tests.
- [x] 2.4 AI engineering: add terms so every category has at least two, with more for Model providers, Agents and extensibility and AI security; verify the data tests.

## 3. Values page

- [x] 3.1 Pass the broader value names from `ValuesStep` to `WordPicker` so the note and labels show on the values page; verify UI tests: each term among the first options in its category with covered values still listed, labelled "Broad", note shown, filter works.
- [x] 3.2 Make `profileToState` resolve saved value names against broader values; verify load tests: "honesty and ethics" loads as the built-in, unknown names still load as custom.
- [x] 3.3 Verify limit behaviour with state and UI tests: a broader value counts toward the 10 limit, is independent of the values it covers, and appears in the export.
- [x] 3.4 Update existing tests that assume the values page has no broader terms; verify `npm test` passes.

## 4. Docs and integration

- [x] 4.1 Update the README note on broader terms to include values and the minimum per category.
- [ ] 4.2 Run `npm test` and `npm run build`, then view the values page and each skills page in light, dark and an accessibility option at narrow and wide widths, checking the pages do not feel crowded; verify the only failing test is the existing `transitions.test.tsx` one if it still fails.
