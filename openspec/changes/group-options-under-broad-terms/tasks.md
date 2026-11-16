# Tasks

## 1. Grouping data

- [ ] 1.1 Add `groupedCategories(kind)` to `src/data/skills.ts` returning, per category, its groups (term and owned options) and the other options, using the shortest-covers-first rule with ties to the term listed first; verify data tests: each option appears once per page, an overlap example (an option covered by two terms) goes to the shorter one, covered options from other categories are not pulled in, and the flat words of `categoriesWithBroadTerms` equal the grouped words.
- [ ] 1.2 Add a data test that every broader term heads at least two options in its category, watch it fail on the seven known cases (NoSQL databases, Unit testing frameworks, Identity providers and SSO, Code quality and refactoring, Application security practices, Belbin team roles, Coding agent tools), then adjust `src/data/broad-terms.ts` (drop the Belbin umbrella term, trim overlap or widen covers in the others) until it passes; verify the existing data tests (at least two terms per category, at least 3 covered, no ties, names unique) still pass.

## 2. Rendering

- [ ] 2.1 Make `WordPicker` render each card as groups then other options: a `div role="group"` labelled by the term, the term chip, a "Groups these:" caption, the options, and an "Other options" line only when the card has groups and leftovers; pass the grouped structure from `SkillStep` and `ValuesStep`; verify UI tests for the values page and each skills page: each term first in its group, its owned options inside the group and nowhere else, group named by the term, caption visible.
- [ ] 2.2 Apply the filter to groups: show a group when its term or an option matches, only matching options inside, term kept for context, cards with no match hidden; keep the "Showing x of y" count to matching words; verify UI tests for filtering on an option, on a term and with no match.
- [ ] 2.3 Reword the explanatory note to say a broader term heads the group of options below it and choosing it does not choose them; verify it shows on the values and skills pages only.

## 3. Look

- [ ] 3.1 Style `.broad-group` and its caption and the "Other options" line in `src/styles.css` (dashed `--broad` block border with padding, muted caption), keeping the term chip and "Broad" label; verify the contrast test still passes in light, dark and the accessibility options and that the group border has at least 3:1 against the card background.

## 4. Docs and integration

- [ ] 4.1 Update existing placement tests (`src/broad-terms.test.tsx`, `src/App.test.tsx`) that assume terms are leading chips in a flat list; verify `npm test` passes.
- [ ] 4.2 Update the README note to describe groups; run `npm run build`, then view the values page and each skills page in light, dark and an accessibility option at narrow and wide widths, checking groups read clearly and cards are not too tall.
