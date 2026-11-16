# Tasks

## 1. Placement

- [x] 1.1 Add `broadTermCategory(section, term)` to `src/data/skills.ts` (not `broad-terms.ts`, to avoid a circular import) (majority category of `covers`, ties to first in catalog order); verify with data tests that every term resolves to an existing category with no tie, and that "CI/CD" resolves to "Containers, infrastructure and delivery".
- [x] 1.2 In `SkillStep`, put each broader term at the start of its category's words and pass the set of broader names to `WordPicker`; remove the `broadTerms` card, `BROAD_CARD` and its caption from `WordPicker`; verify UI tests: no "Broader terms" heading, each term first in its category with its covered options still listed, filter hides cards with no match, counts still correct.

## 2. Look

- [x] 2.1 Restyle `.chip.broad` in `src/styles.css`: normal surface background, dashed `--broad` border, "Broad" label (aria-hidden, accessible name unchanged), selected state inherited from `.chip[aria-pressed='true']`; remove `--broad-tint` and the selected overrides; verify a component test that unselected has the label and no check mark, and selected looks like other options.
- [x] 2.2 Add the one-line broader-terms note under the filter hint on skills pages only; verify it shows on the four skills pages and not on values.
- [x] 2.3 Extend `src/theme.test.ts` for the border (3:1) and label (4.5:1) contrast in light, dark and each accessibility option, and that `--broad` differs from every section accent; verify `npm test` passes.

## 3. Docs and integration

- [x] 3.1 Update the README note on broader terms to say they sit inside their category with a dashed border and "Broad" label.
- [ ] 3.2 Run `npm test` and `npm run build`, then view each skills page in light, dark and an accessibility option at narrow and wide widths; verify the only failing test is the existing `transitions.test.tsx` one.
