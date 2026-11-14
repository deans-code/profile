## Why

The catalogs on every tab were built by judgement or from three surveys, so many entries cannot be traced to evidence and the user cannot see where any option comes from. The app needs a broader, current set of credible sources for each tab, every option checked against them, and each option's description showing exactly which listed sources support it.

## What Changes

- Expand the source list from three to a vetted set per tab, each chosen because it shows what is used or relevant now, or what was recently adopted and is still in use (candidates and selection rules are in design.md; every source's address and date is confirmed by fetching it during implementation).
- Show sources under the tab they belong to (Values, Technical development, Engineering, Interpersonal, AI engineering) instead of one shared list. The Profile page keeps no sources section.
- Review every existing option on every tab against that tab's sources. Keep and attribute options the sources support, add options the sources show to be widely used or relevant and not yet offered, and remove options no listed source supports (saved profiles that contain removed names still load, as custom entries).
- Rewrite entries and descriptions where a source shows they are out of date or inaccurate.
- When the user right-clicks (or uses the keyboard or long-press equivalent) an option, the description panel adds a "Sourced from" list naming every listed source that supports that option, as links to the sources shown on the tab.
- Record, for each option, the sources that support it and the date it was checked, in a reviewable data file, with automated tests that enforce coverage and consistency.
- README documents the sources per tab, the selection and verification rules, and how to refresh them.

## Capabilities

### New Capabilities
- `tab-sources`: the vetted, credited source list shown on each tab, and the rules a source must meet.
- `option-attribution`: every option on every tab records the listed sources that support it, and its description panel shows them.
- `catalog-verification`: how options are checked against sources, what happens to options no source supports, and the tests that keep the data honest.

### Modified Capabilities
<!-- None in openspec/specs. This change builds on the pending source-technologies-from-surveys change (single shared Sources list, technical additions); apply that change and archive it first, then this change replaces its shared list with per-tab lists. -->

## Impact

- `src/data/sources.ts` (sources keyed by tab, with accessed date), `src/data/skills.ts` and `src/data/values.ts` (catalog edits), a new per-option attribution data file, `src/data/definitions*` (description fixes), `src/components/DefinitionPanel.tsx` (Sources in the panel), `src/App.tsx` and `src/styles.css` (per-tab Sources section), tests, `README.md`.
- No new runtime dependencies; no network access at run time (all source data is transcribed into the repository as names and links only).
- Saved-profile format unchanged. Removed options become custom entries on load.
- Licence: sources are linked and credited, never reproduced; sources with no-derivatives or no-reuse terms (for example the CNCF report) are cited by name and link only. Each source's terms are checked before it is added.

## Assumptions

- "Tabs" means the five steps: Values, Technical development, Engineering, Interpersonal, AI engineering.
- Options that no listed source supports are removed rather than kept unsourced, because the request asks for verified options only.
- Values and interpersonal options are supported by published frameworks and workforce research rather than usage surveys, and are attributed the same way.
- An option attributed to several sources lists all of them, in the order the sources appear on the tab.
