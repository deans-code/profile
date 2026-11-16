# Proposal

## Why

Broader terms now sit first in the category card, but as chips in the same grid as the options. Nothing shows which options a term groups: "CI/CD" sits at the top and Jenkins and GitHub Actions are scattered further down among 30 others, so the term reads as just another option. With about 196 terms (24 on values pages) the grouping is the whole point of a broader term, and it is invisible.

## What Changes

- Inside each category card, each broader term heads a visible group: the term chip first, then the options it covers that belong to that category, together in one bordered block with a short heading line ("Groups these:" or similar) so it reads as "this term is the grouping of these options".
- Each option appears once. An option covered by several terms is shown under the most specific term (the one covering the fewest options, ties to the one listed first). Options no term claims stay below the groups, under a plain "Other options" line when the card has groups, so every option is still reachable.
- Covered options that live in a different category stay in their own card (they cannot be moved); the term's definition still names them.
- Terms whose options would all be claimed by more specific terms are reworked so every term heads at least two options (7 of 196 terms are thin today; the data is adjusted, for example by dropping an umbrella term that only repeats its more specific siblings).
- The explanatory note is reworded to say a broader term heads the group of options beneath it.
- Selecting, filtering, definitions, counts, export, loading and keyboard behaviour are unchanged. Choosing a term still does not choose its options. Applies to the values page and all four skills pages.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `broad-term-options`: where a broader term and its options appear (as a group, not a lone chip) and how that grouping is explained. This capability is introduced by earlier changes that are not yet archived (`add-broad-term-options`, `place-broad-terms-in-categories`, `add-broad-values-and-more-groupings`), which must be archived first.

## Impact

- `src/data/skills.ts` (a grouping helper that builds each category's groups and leftover options), `src/data/broad-terms.ts` (a few term lists adjusted so each head at least two options), `src/components/WordPicker.tsx`, `SkillStep.tsx`, `ValuesStep.tsx` (render groups), `src/styles.css` (group block, heading).
- Tests: data (each term heads at least two options, each option shown once), UI (group markup, order, filter, accessibility name), existing placement tests updated.
- README note.
