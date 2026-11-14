## Why

The rebuilt catalogs rest on three to seven sources per tab and are thin: Values has 13 groups, five of them with two or three entries, and has little that speaks to how people work with computers, in teams, alone, through change, or in business. Interpersonal and Engineering have only 50 and 61 options. Broader sources, older ones where they still apply, and reference lists such as Wikipedia's give more complete lists that stay traceable.

## What Changes

- Add more sources to every tab, targeting at least six per tab (candidates are in design.md; every address, edition and licence is confirmed by fetching it during implementation). Sources are no longer limited to the last two years: a source from earlier is accepted when it is a standing framework, standard or reference that is still in use (for example the Agile Manifesto, SWEBOK, ISO/IEC 25010, Belbin team roles, O*NET).
- Accept Wikipedia articles and lists as sources when they list the thing being offered (for example a list of values, programming languages or software development philosophies) and cite their own references. Each is linked by article title with its edit date and CC BY-SA 4.0 licence noted, as already done for Rokeach and Schwartz.
- Make every list more detailed by reading each source in full for the tab, not just its headline entries, and adding every worthwhile option not yet offered, each with a description and the sources that name it.
- Combine groups that have only a few options into broader groups (a minimum group size is enforced by a test), so a tab shows fewer, fuller groups.
- Rework the Values tab around where values apply, adding options for: doing good work and craft; building and delivering products with a computer; working in a team; working with others (customers, colleagues, partners, the public); working alone and remotely; adopting new ways of working; learning and growth; business and organisational life; personal character; how a person exists in the world (society, nature, fairness); and what a person expects from others.
- Show the new sources in each tab's Sources section and in each option's "Sourced from" list, using the existing attribution mechanism. README documents the new sources, the widened age rule, the Wikipedia rule, and the new group sizes.

## Capabilities

### New Capabilities
- `source-breadth`: how many sources each tab lists, which ages and kinds of source are acceptable (including Wikipedia), and how they are credited.
- `catalog-depth`: the minimum size of each tab's list and of each group, and the rule that a source is read in full for its tab.
- `work-and-life-values`: the contexts the Values tab covers and the grouping that presents them.

### Modified Capabilities
<!-- None in openspec/specs. This change extends tab-sources, option-attribution and catalog-verification from the pending verified-sources-for-every-tab change; apply and archive that one first. -->

## Impact

- `src/data/sources.ts` (new registry entries and tab lists), new per-source files under `src/data/catalog/*/`, each tab's `index.ts`, `src/data/definitions/*.ts` only where a derived description needs a fix, `src/data/attribution.test.ts` and other tests with hard-coded counts or group names (values grouping, size thresholds), `README.md`.
- No new runtime dependencies, no run-time network access, saved-profile format unchanged. Options or groups that are renamed or merged still load from older saved profiles: names missing from the catalog become custom entries, as now.
- Licence: sources are linked and credited, never reproduced. Wikipedia text is CC BY-SA 4.0 and is not copied; descriptions are written for this app. Sources whose terms forbid copying (for example SFIA, NACE) stay cited by name and link only.

## Assumptions

- "Tabs" means the five steps: Values, Technical development, Engineering, Interpersonal, AI engineering.
- "Combine groupings" applies to every tab, not only Values; groups under six options are merged, except where merging would mix unrelated things, in which case the group is kept and the reason recorded in the README.
- Older sources are accepted only where they remain in use now; a source superseded or retired is rejected. Technology options still follow the existing at-least-5%-usage or two-source rule, so old sources add breadth for frameworks and practices, not for outdated tools.
- Values drawn from a source other than the existing four are attributed the same way, and a value with no source on its tab is not added.
- Sources that refuse automated access (WEF, PMI, Mind) stay rejected unless another route to read them is found; none is cited unread.
