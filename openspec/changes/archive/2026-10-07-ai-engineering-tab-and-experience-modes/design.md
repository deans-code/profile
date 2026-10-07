# Design

## Context

Current code (see proposal.md for motivation): `Section = 'technical' | 'engineering' | 'interpersonal'` in `src/data/skills.ts` drives the steps, state, catalogs, definitions and export. `ProfileState` holds `selectedValues`, `customValues`, `selectedSkills`, `customSkills` and `scores`. `STEPS = values, ...SECTIONS, scoring, card`. `WordPicker` renders one selected list plus a custom list; `SelectionStatus`/`SelectionHelp` show the limit and instructions; `export.ts` and `load.ts` handle `{ values: string[], skills: Record<Section, {name, score}[]> }`. Earlier changes are not archived, so `openspec/specs/` is empty.

## Goals / Non-Goals

**Goals:**
- One state shape that holds two independent selections per page, reused by every page through the existing picker.
- Scoring removed completely, with no dead code.
- Older profile files keep loading.

**Non-Goals:**
- Proficiency levels, notes, aggregation, autosave, changes to the descriptions panel behavior.

## Decisions

1. **Mode is a value, lists are keyed by it.** Add `type Mode = 'experience' | 'desired'` and `MODES`. State becomes:
   - `mode: Mode` (sticky, shared by all pages),
   - `values: Record<Mode, string[]>`, `customValues: string[]`,
   - `skills: Record<Section, Record<Mode, string[]>>`, `customSkills: Record<Section, string[]>`.

   Custom entries are stored once per page (not per mode) so a custom word added for one option remains offered in the Custom group and can be selected in the other. Selected-ness is per mode; the existing "remove" control on a custom entry deletes it from the group and from both lists. Alternative, per-mode custom lists, rejected because the same custom word would need re-adding and duplicates would complicate export and loading.
2. **Actions gain a mode.** `toggleValue`/`toggleSkill`/`addCustom*` act on `state.mode` (the reducer reads it, so the components stay thin); a new `setMode` action switches it. Removing the score fields deletes `setScore`, `dropScore`, `getScore`, `clampScore` and the constants. `selectedValues`/`selectedSkills` usages are replaced by selectors `selectedFor(state, page)` (active mode) and `countFor(state, page, mode)`.
3. **Sections.** `Section` gains `'ai'`: `SECTIONS = ['technical','engineering','interpersonal','ai']`, labelled "AI engineering". `STEPS = ['values', ...SECTIONS, 'card']` and the scoring step is deleted. `PAGES` is unchanged in meaning. `TermKind`, `INDEX` and per-section maps in `definitions.ts` gain `ai` and the new definitions file `src/data/definitions/ai.ts`.
4. **Completion and limits.** `pageComplete(state, page)` is true when either mode has a selection. `missingSections` and `stepBlockedReason` use it. The values limit is checked per mode: `overBy(state, 'values', mode)`; gating reports the worst offending mode and names it ("Deselect 2 values under Desired experience to continue (limit 20)."). `isFull` uses the active mode. `loadLanding` finds the first over-limit or incomplete page the same way.
5. **Mode switch component.** New `ModeSwitch` at the top of every picker page: an ARIA radio group (`role="radiogroup"` with two `role="radio"` buttons, arrow-key navigation) labelled "Previous experience (n)" / "Desired experience (n)". Chosen over tabs because it changes what the page edits, not which page is shown, and over a checkbox per word because every word would then need two controls and the right-click/Add interactions would get ambiguous. A segmented control is also compact and works at 360 px. `SelectionHelp` gets the active mode name and the extra line from the spec.
6. **Picker wiring.** `WordPicker` already receives `selected`, `custom`, `limit` and callbacks; `ValuesStep` and `SkillStep` now pass the active-mode list and render `ModeSwitch` above the picker. `SelectionStatus` reads "n of 20 selected" for the active mode only, with the other mode's count in the switch.
7. **Catalogs.** `skills.ts`: remove the "AI and machine learning" category from technical; add hands-on categories and entries (for example Python data tooling such as NumPy and pandas, Jupyter notebooks, vector and search databases such as pgvector and Qdrant, data pipelines such as Airflow, GPU and CUDA, Docker and Kubernetes (existing), observability tooling, message queues). Names that stay keep their spelling. Add `CATALOGS.ai` with about 11 to 14 categories and roughly 150 entries: Approaches; Frameworks and methodologies; Terminal (TUI/CLI) tools; Desktop apps and AI-first editors; IDE and editor plugins; Open-source tools; Closed-model providers; Inference providers and gateways; Open-weight models; Local runtimes and tools; Local hardware and optimisation; Agent extensibility; Building AI applications (RAG, evals, fine-tuning, guardrails). Entries are verified for currency during implementation (product names change; remove or rename stale ones). A data test asserts the spec's required entries and category topics and that names are unique within and across the technical and AI catalogs, which resolves the previous "LLM application development" and "Prompt engineering" entries by moving them to the AI page.
8. **Theming.** Add an `ai` section colour token and `data-section="ai"` styling beside the existing three; delete scoring/slider/bar styles except where the card reuses them.
9. **Export and card.** `buildProfile` returns `{ values: Experience, skills: Record<Section, Experience> }` where `Experience = { experience: string[]; desired: string[] }`, sorted alphabetically. `toJson` writes that shape; `toMarkdown` writes, per page, "Previous experience" and "Desired experience" lists omitting empty ones. `ProfileCard` renders the two groups per page (chips, no bars).
10. **Loading.** `parseProfile` accepts two shapes, detected structurally. New: `values` is an object with `experience`/`desired` arrays and each `skills.<section>` is an object likewise (sections missing from the file are treated as empty only for `ai`, to tolerate hand-edited older files; other missing sections are errors as today). Legacy: `values` is an array and skills are `{name, score}` arrays; names become `experience`, scores are ignored (not validated beyond being an object with a name), `ai` is empty. Existing checks (1 MB, 100 entries per list, 100 characters, trimming, de-duplication ignoring case) apply to every list. `profileToState` maps each name to a built-in or custom entry per page, and puts custom names into the page's Custom group. `loadProfile` leaves `mode` as `experience`.
11. **Superseded earlier requirements** (to reconcile when earlier changes are archived; this change's specs state the final behavior): `skill-scoring` (all), the scoring and sliders in `profile-export`, `skills-selection` page list (three sections), `values-selection` limit (now per option, 20), the `selection-limits` and `profile-loading` requirements about a single list, and the `selection-instructions` wording (extended with the option line).

## Risks / Trade-offs

- [Wide state-shape change touches most files and tests] → Do it first in the reducer with selectors so components change mechanically; update tests alongside each group of tasks; type-checking (`tsc`) finds every stale use.
- [Catalog currency: AI tool and model names churn quickly] → Review each entry during implementation, prefer durable names, keep descriptions generic ("a terminal-based coding agent") rather than version- or price-specific.
- [Authoring about 150 descriptions] → Coverage and two-sentence tests as for values and skills; one batch per category.
- [Sticky mode could surprise users who miss the switch] → The active option is repeated in the instructions and in the page heading area, and both counts are always visible.
- [Custom entry shared between modes] → Removing a custom entry removes it from both lists; documented in the control's label.
- [Old files with a custom "AI" skill under technical] → Loads as a custom technical entry; users can re-pick it on the AI page. Acceptable, no heuristics.
- [BREAKING JSON format] → Legacy loading path with tests, and the README documents the new format.
