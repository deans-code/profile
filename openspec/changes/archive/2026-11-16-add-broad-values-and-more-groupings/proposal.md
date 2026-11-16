# Proposal

## Why

Broader terms exist only on the four skills pages, and even there they are thin: 66 terms across about 700 options, three categories (Editors and IDEs, Game development and graphics, Software knowledge areas) have none, and most categories have only one or two terms covering a fraction of their options. The values page has none at all, although it has 11 categories and about 170 values where a person often thinks in groups ("honesty and ethics", "lifelong learning") before choosing a word.

## What Changes

- **Broader terms for values.** The values page gets broader terms placed inside its 11 categories, using the same dashed border, "Broad" label, definition and selection behaviour as on the skills pages. An initial set of 24 is drafted in design.md from the values read in the catalog (for example "Honesty and ethics" covering Honesty, Integrity, Ethical behaviour, Authenticity, Humility and Self-respect).
- **More broader terms on the skills pages.** Every category gets at least two broader terms (one if it lists fewer than 8 options), starting with the three categories that have none, and the largest and least-covered categories (Testing and code quality, Microservice and integration patterns, Web frameworks and technologies, Languages, Databases) get more. Terms may overlap: an option can be covered by more than one term.
- A broader value counts as one of the user's chosen values (so it uses one of the 5 to 10 slots), appears in the profile and export, and does not select the values it covers, exactly as on the skills pages.
- A saved profile that lists a broader value by name loads it as that built-in option.
- Existing broader terms, the placement rule, the look and the behaviour are unchanged.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `broad-term-options`: adds broader terms for values and a minimum number per category. This capability is introduced by the not-yet-archived changes `add-broad-term-options` and `place-broad-terms-in-categories`, which must be archived first. The new requirements are written as additions so they do not conflict with those.

## Impact

- `src/data/broad-terms.ts` (a values entry and many more terms), `src/data/skills.ts` (category lookup generalised to values), `src/data/definitions.ts`, `src/load.ts` (values resolve broader names), `src/components/ValuesStep.tsx` (passes the broader names).
- `src/components/WordPicker.tsx` and `src/styles.css` need no change to the look; the note under the add box already says "options".
- Tests: data integrity (names unique across values, skills and terms; covers exist; at least 3 covered; at least 2 per category), UI, load and limit tests for values.
- README note. Broader terms stay the app's own groupings with no citation.
