## Why

The Technical development catalog was curated by judgement, so it misses widely used technologies (for example PowerShell, Express, ASP.NET Core, MariaDB, pytest, Jest, npm, VS Code) and cannot show where its entries come from. Basing it on published developer surveys makes the list defensible and current, and crediting the sources is both good practice and, for the CNCF report, a licence condition.

## What Changes

- Add technologies to the Technical development page that rank highly in the Stack Overflow Developer Survey 2026 (technology section), appear in the JetBrains Developer Ecosystem 2026 "Tools and trends" report, or are named by the CNCF/SlashData State of Cloud Native Development Q1 2026 report. Selection rule: at least 10% usage in a ranked Stack Overflow list, or named in the JetBrains or CNCF reports, and not already on any page.
- Add two categories: "Testing and code quality tools" (moving "Playwright" into it) and "Editors, IDEs and package managers".
- Add a short description for every new entry.
- Keep every existing entry name, so saved profiles still load.
- Add a "Sources" list at the bottom of every page, with a link and attribution for each of the three sources.
- Add the same sources to the README, with a note on how the catalog was derived from them.
- No change to the AI engineering, Engineering, Interpersonal or Values pages, the step flow, or the saved-profile format.

## Capabilities

### New Capabilities
- `data-sources`: Where the catalog's technology data comes from, and the requirement to list and credit those sources in the app and the README.

### Modified Capabilities
- `technical-skills-catalog`: Entries are selected from the named surveys by a stated rule, and the page includes specific newly sourced entries and categories.

## Impact

- Code: `src/data/skills.ts` (new entries and categories), `src/data/definitions/technical.ts` (descriptions), `src/App.tsx` and `src/styles.css` (Sources section at the bottom of the page), `README.md` (sources section, features note).
- Tests: `src/data/data.test.ts` and `src/data/definitions.test.ts` (new entries present, no duplicates across pages, every entry described); a UI test for the Sources list on every page.
- No new dependencies and no data or export format changes.
- Source limits found while planning:
  - **JetBrains** page: only partly readable (charts did not load); it supplied PostgreSQL, MySQL, AWS, Google Cloud, Azure and regional providers such as Hetzner, but no ranked language, framework or tool lists.
  - **CNCF** report: describes practices and adoption (Kubernetes, serverless, service meshes, observability, feature flagging, chaos engineering) rather than product rankings.
  - **Stack Overflow** survey: supplies most of the ranked lists and drives most additions.
- Licence: the CNCF report (by SlashData, sponsored by the Continuous Delivery Foundation, in partnership with CNCF) is CC BY-NoDerivatives 4.0, so the app and README link to it and credit it but do not reproduce or alter its content.
- Assumptions: "the technologies" means the Technical development page; the AI engineering page already covers the Stack Overflow LLM vendors. Existing entries not found in the sources stay, because removing them would break saved profiles. Overlaps with the in-progress `improve-usability-clarity-and-navigation` change are limited to `src/App.tsx` and `src/styles.css`.
