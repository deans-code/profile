# Proposal

## Why

The 10-word limit suits values but is too restrictive for skills, where people legitimately have many. The values cloud is one long, ungrouped list that is hard to scan and offers fewer choices than the skill pages. The instructions describing the controls read as if keyboard and touch are on a par with the mouse, and call the feature a "definition", when the primary desktop control is simply right-click for a description.

## What Changes

- **Remove the selection limit from the three skill sections** (technical development, engineering and interpersonal). Values keep the limit of 10. Skill pages show a plain "n selected" count with no limit messaging.
- **Group the values** into named categories, shown as cards like the skill pages, with a filter, and with custom values appearing in a "Custom" group.
- **Expand the values** from about 60 to at least 100, across at least 8 categories, each with a description.
- **Rewrite the instructions text** on the selection pages: lead with desktop ("Click to select. Right-click a word to read its description."), mention the limit of 10 on the values page only, and reduce keyboard and touch to one short secondary line. User-facing wording says "description" instead of "definition".

## Capabilities

### New Capabilities
- `values-grouping`: Categorised, expanded values with filtering and custom values, retaining the 10-value limit.
- `unlimited-skill-selection`: No selection limit on the three skill sections, including for loaded profiles and custom skills.
- `selection-instructions`: The wording and per-page content of the instructions at the top of the selection pages, and the "description" terminology.

### Modified Capabilities
<!-- None can be declared: the earlier changes are not yet archived into openspec/specs. design.md lists exactly which earlier requirements this change supersedes. -->

## Impact

- Affects `src/data/values.ts` and the values definitions, the reducer limit rules and gating (`src/state/profile.ts`), the values and skill step components (likely merged into one shared picker), `SelectionStatus`, `SelectionHelp`, the description panel's accessible name, loading of saved profiles (skill lists are no longer capped by the limit), tests and the README.
- Roughly 60 new values and descriptions to author.
- The scoring and profile card pages can now become much longer, since a profile may hold many skills.
- No new dependencies. Export and file formats are unchanged, so existing saved profiles still load.
- Out of scope: expanding the skill catalogs, changing the limit of 10 for values, a different control scheme.
- Assumptions:
  - "Group the values" means categories like the skill pages' categories, and the same card layout.
  - "More options" means at least 100 values in total; further growth is easy to add later.
  - The values page also gains the text filter, since it reuses the skill picker.
  - The accessible name of the open panel becomes "Description of {word}".
