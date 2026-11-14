## Context

Catalogs are `CATALOGS` in `src/data/skills.ts` (categories of name lists for four skill tabs) and values in `src/data/values.ts`. Descriptions live in `src/data/definitions/*.ts`, looked up by `getDefinition(kind, name)` and rendered by `Panel` in `src/components/DefinitionPanel.tsx`. `src/data/sources.ts` holds one flat list shown on every page via `App.tsx`. Loading a saved profile already turns names not in the catalog into custom entries (`src/load.ts`), so removing catalog entries does not break saved files. The pending `source-technologies-from-surveys` change adds the shared three-source list and the technical additions that this change builds on; apply and archive it first. See proposal.md for scope.

## Goals / Non-Goals

**Goals:** per-tab credible sources; every option attributed, with all supporting sources; descriptions show their sources; verification is repeatable and tested.
**Non-Goals:** fetching sources at run time, showing statistics or rankings, changing the profile format, a live refresh job, or sources for custom entries.

## Decisions

1. **Candidate sources per tab** (each must be fetched and confirmed reachable, current, and permissive of linking before it is listed; any that fail are dropped and the replacement recorded in the README):
   - Technical development: Stack Overflow Developer Survey 2026, JetBrains State of Developer Ecosystem 2026, CNCF/SlashData State of Cloud Native Development, GitHub Octoverse, Thoughtworks Technology Radar, State of JS / State of CSS surveys, TIOBE index.
   - Engineering: DORA State of AI-assisted Software Development report, Google SRE books, OWASP Top 10 and ASVS, SWEBOK Guide v4 (IEEE Computer Society), CNCF annual survey, Thoughtworks Technology Radar, ISO/IEC 25010.
   - Interpersonal: World Economic Forum Future of Jobs Report, LinkedIn skills reports, NACE career readiness competencies, SFIA skills framework, Stack Overflow survey (collaboration tools and work practices).
   - AI engineering: Stack Overflow survey AI section, Stanford AI Index, Thoughtworks Technology Radar, GitHub Octoverse, OpenRouter model rankings, Hugging Face leaderboards and trending models, a vendor-neutral enterprise AI adoption survey.
   - Values: Schwartz theory of basic human values, VIA Institute character strengths, Rokeach value survey, Barrett Values Centre value lists, a current workplace-values survey.
   Rejected up front: vendor marketing pages, undated blog posts, sources without a named publisher, and paywalled reports whose contents cannot be checked.
2. **One attribution data file, keyed by tab and option name**: `src/data/attribution.ts` exports `ATTRIBUTION: Record<TermKind, Record<string, { sources: SourceId[]; checked: string }>>` where `SourceId` is a key in the per-tab source registry. Alternative: change each category's `skills: string[]` to objects, rejected because it touches every catalog consumer (selection, export, load, tests) for a display-only fact; a separate file keeps the catalog shape and lets one test join the two.
3. **Source registry keyed by id, with per-tab membership**: `SOURCES` becomes `Record<SourceId, Source>` (title, publisher, url, year) and `TAB_SOURCES: Record<TermKind, SourceId[]>` fixes the list and the display order for each tab. Order here drives the order in "Sourced from".
4. **Panel shows sources by looking up attribution**: `Panel` renders a "Sourced from" list of `<a target="_blank" rel="noopener noreferrer">` after the description text, using `getAttribution(kind, name)`. No change to positioning, focus or dismissal logic. Custom entries still have no panel.
5. **Verification is a documented manual process plus enforcing tests.** The sources are web pages and PDFs with no stable API, so a person (or Claude in a session) reads each source, records support in `attribution.ts` with the check date, and tests enforce structure (spec: catalog-verification). Each task group does one tab so the review is checkable. The inclusion rule for new options per tab is written in the README (technology: at least 10% in a ranked Stack Overflow list or named by two or more sources; others: named by at least one source and distinct from existing options).
6. **Removal over keeping unsourced entries.** Unsupported options are removed from the catalog; `load.ts` already preserves them as custom entries. Alternative: keep them marked "no source", rejected because the request is for verified options only and it would clutter the lists.
7. **Per-tab Sources section** reuses the existing `section.sources` element, now rendered from `TAB_SOURCES[state.step]` and omitted on the card. Only a non-footer section, as before, so tests that find `footer` still work.
8. **Wording of the source note**: "These sources guided which options are offered. Their data is not reproduced here." stays, and licence-restricted sources are cited by name and link only.

## Risks / Trade-offs

- Verification is judgement-heavy and labour-intensive across about 600 options → process per tab with recorded date, spot-check tests, and a README rule so reviewers can audit; start with technical, which has the most ranked data.
- Interpersonal and values options have weak usage data → attribute to frameworks and workforce research, and accept fewer sources per option; options that none support are removed.
- Source pages change or move → store title, publisher, year and date checked, not copied content; the README says how to refresh.
- Licence terms (for example no-derivatives) → link and credit only; check terms before listing.
- Removing options may surprise returning users → saved profiles still load them as custom entries; the change is recorded in the README.
- Attribution file and catalog can drift → the integrity test joins them and fails on mismatch.

## Migration Plan

1. Apply and archive `source-technologies-from-surveys`. 2. Land the registry, attribution file, panel change and tests with the technical tab. 3. Add each remaining tab in turn. 4. Update the README. Roll back by reverting the commits; no stored data changes.

## Open Questions

- Exact candidate list per tab is finalised during implementation once each source has been fetched; sources that fail the qualifying rules are replaced, which does not change the specs.
