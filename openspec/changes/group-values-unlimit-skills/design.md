# Design

## Context

The app after `build-profile-builder`, `refine-profile-ui` and `limit-selections-and-load-profile` (all implemented; none archived, so `openspec/specs/` is empty). Relevant current code: `MAX_SELECTION` and `isFull`/`overBy` apply to every page in `src/state/profile.ts`; `PAGES` drives the over-limit gating and `loadLanding`; `ValuesStep` renders a flat cloud of `COMMON_VALUES` in a grid, while `SkillStep` renders categorised cards with a filter and a Custom group; `SelectionStatus` always shows "n of 10"; `SelectionHelp` has fixed text; the panel's accessible name is "Definition of {word}". See proposal.md for scope.

## Goals / Non-Goals

**Goals:**
- Limit only values; skills unlimited everywhere (selection, custom entries, loading, gating).
- Categorised, expanded values on the same card layout as skills, reusing one picker.
- Accurate, desktop-first, page-specific instructions.

**Non-Goals:**
- Expanding skill catalogs, changing the values limit, new input schemes, changing file formats.

## Decisions

1. **Limits become per-page configuration.** Replace the single `MAX_SELECTION` rule with `LIMITS: Partial<Record<Page, number>> = { values: 10 }` and helper `limitFor(page)`. `isFull`, `overBy` and the over-limit gating read `limitFor`, returning "no limit" for skills. The reducer, `stepBlockedReason` and `loadLanding` therefore need no skill-specific code, and a future limit change is one line. Alternative: delete limit code for skills inline, rejected as it would scatter special cases.
2. **Superseded earlier requirements** (to reconcile when the earlier changes are archived; this change's specs state the final behavior): `selection-limits` requirements "Ten selections per page", "Count and limit feedback", "Adding custom words at the limit" and "Limit applies to existing selections" apply to the values page only; `profile-loading` "Over-limit and incomplete files" applies to values only; `term-definitions`/`definition-controls` wording uses "description"; `section-theming` "Instructions at the top" is replaced by `selection-instructions`. Archiving the earlier changes first would allow these to be written as MODIFIED deltas.
3. **Values catalog as categories.** `src/data/values.ts` exports `VALUE_CATEGORIES: { category: string; values: string[] }[]` (same shape idea as `SkillCategory`) and derives the flat `COMMON_VALUES` from it so existing consumers (reducer matching, loader, definitions test) keep working. The weight field stays gone. The original values keep their exact spelling so saved profiles still load as built-ins. Proposed categories (about 8 to 10): Character and integrity; Relationships and community; Collaboration and leadership; Learning and growth; Craft and work; Drive and achievement; Freedom and autonomy; Wellbeing and balance; Impact and society. Target at least 100 values, roughly 11 to 14 per category, each added value described in `src/data/definitions/values.ts`. The existing data and definitions tests are extended: at least 100 values and 8 categories, no value in two categories, descriptions for all.
4. **One shared picker.** Extract `WordPicker` from `SkillStep`: it takes the categories, the selected and custom lists, the term kind, an optional limit, the labels and the dispatch callbacks, and renders the filter, category cards, Custom group, Add control and `SelectionStatus`. `ValuesStep` and `SkillStep` become thin wrappers. This gives values the card grid, filter and Custom group for free and keeps the two pages consistent. The values page is the only caller that passes a limit. Alternative: copy the skill markup into `ValuesStep`, rejected as duplication that would drift.
5. **Status and gating UI follow the limit.** `SelectionStatus` takes `limit?: number`: with a limit it shows "n of 10 selected" and the limit messages; without one, only "n selected". Dimming (`unavailable`) and the disabled Add control only apply when a limit is set and reached.
6. **Instructions.** `SelectionHelp` takes `limit?: number` and renders: a primary line ("Click a word to select or deselect it. Right-click a word to read its description."), the page line ("Select up to 10 values." or "Select as many skills as apply."), and one secondary line with the keyboard and touch alternatives ("Keyboard: focus a word and press ? or Shift+F10. Touch: press and hold."). Terminology: "description" in all user-visible text; the panel's accessible name becomes "Description of {word}" (internal names such as `DefinitionPanel` are unchanged to keep the diff small). The context-menu key keeps working but is not advertised, as the instructions now name only the commonly available alternatives.
7. **Loading.** The parser's 100-entry cap per list is unchanged and is above the largest catalog plus plenty of custom skills. Over-limit handling in `loadLanding` now only triggers for values (via `limitFor`).
8. **Scoring and card with many skills.** No structural change: existing grouped, multi-column layouts handle long lists. Verified by a test and a screenshot with 30 or more skills.

## Risks / Trade-offs

- [About 60 new values and descriptions to write; quality and sensible grouping] → Reviewed during implementation; coverage and uniqueness tests; categories chosen to be mutually distinct.
- [Existing saved profiles must still load] → Original value names kept verbatim; a test loads a profile containing every original value.
- [Unlimited skills make scoring and the card long] → Already grouped and multi-column; checked at 360 and 1600 px with 30 or more skills; a limit can be reintroduced per page with one config line.
- [Refactoring both pages into one picker could regress behavior] → Existing component and end-to-end tests run unchanged against the refactor before values are regrouped.
- [Value-page filter and categories add UI on a page that was simple] → Reuses the already-tested skill picker; no new interaction patterns.
