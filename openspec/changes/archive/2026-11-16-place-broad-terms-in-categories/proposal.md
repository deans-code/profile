# Proposal

## Why

The broader terms (CI/CD, Relational databases, Software testing and so on) were added as one separate "Broader terms" card at the top of each skills page. That splits related options apart: a user looking at "Databases" does not see "Relational databases" there. The broader terms also share a purple tint and border that looks the same as the selected style of ordinary options, so an unselected broader term reads as already chosen.

## What Changes

- Remove the dedicated "Broader terms" card. Each broader term is shown inside the existing category card it belongs to (for example "CI/CD" in "Containers, infrastructure and delivery", "Relational databases" in "Databases"), at the start of that card's list.
- A broader term's category is the category holding most of the options it covers (ties go to the category listed first). No new data is needed; the app works it out, and a test checks every term lands in a category.
- Give broader terms a look that is clearly different from the selected look. Unselected, a broader term keeps the normal chip background with a dashed border in the broader-term colour and a small "Broad" label; selected, it uses the same selected style as every other option (accent border, tint, check mark). Colour stays secondary: the dashed border and label identify broader terms without relying on colour.
- Replace the old card caption with one short note near the filter explaining that dashed options are broader terms and do not select the options they cover.
- Filtering, definitions, selection, export, loading and counts are unchanged.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `broad-term-options`: where broader terms appear (inside their category, not a separate card) and how they are told apart from selected options. Note: this capability is introduced by the not-yet-archived change `add-broad-term-options`, which must be archived first so the modified requirements have something to modify.

## Impact

- `src/components/WordPicker.tsx` and `SkillStep.tsx` (merge broader terms into categories, drop the card), `src/data/broad-terms.ts` (a helper that maps a term to its category).
- `src/styles.css` (new broader-term look; the `--broad` tokens stay for light, dark and the accessibility options).
- Tests: `src/broad-terms.test.tsx`, `src/data/broad-terms.test.ts`, `src/theme.test.ts` (contrast of the new border and label colours).
- README note about the placement.
