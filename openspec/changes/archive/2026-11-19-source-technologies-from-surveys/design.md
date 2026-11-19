# Design

## Context

Catalogs live in `src/data/skills.ts` (`CATALOGS.technical` is a list of `{ category, skills }`), with one description per entry in `src/data/definitions/technical.ts`. Existing tests require no skill shared between pages, no empty categories, and a description for every entry. The page layout is in `src/App.tsx`, where `footer.nav` holds Back/Continue and several tests locate it with `document.querySelector('footer')`. See proposal.md for scope and source limits.

Source findings (read while planning):
- **Stack Overflow 2026**, ranked usage: PowerShell 24.6%, jQuery 19.7%, Express 15.6%, ASP.NET Core 19.9%, MariaDB 20.3%, OpenSearch 17.4%, Firebase 11.1%, Vercel 10.7%, Podman 13.0%, Datadog 14.4%, Keycloak 18.6%, Auth0 29.7%, Okta 28.7%, npm 54.6%, pnpm 19.0%, pip 42.1%, uv 23.3%, Homebrew 27.3%, Make 22.8%, VS Code 70.9%, Visual Studio 27.6%, IntelliJ IDEA 24.3%, Vim 27.2%, Neovim 14.7%, Jest 20.8%, Vitest 19.4%, pytest 28.0%, JUnit 21.4%, Playwright 24.9%, Postman 32.6%, ESLint 37.1%, SonarQube 18.8%.
- **JetBrains 2026** (partly rendered): PostgreSQL, MySQL, AWS, Google Cloud, Azure, Supabase, Firebase, and regional providers including Hetzner.
- **CNCF/SlashData Q1 2026**: Kubernetes, service meshes, observability tools, serverless, feature flagging, chaos engineering and immutable infrastructure as practices; no product ranking.

## Goals / Non-Goals

**Goals:**
- Add the sourced entries by a stated, repeatable rule, with descriptions.
- List and credit the sources in the app and README.

**Non-Goals:**
- Removing existing entries, or changing other pages or the AI engineering catalog.
- Showing percentages or any source data in the app (CC BY-ND forbids altering the CNCF report and the app only needs to credit it).
- Fetching survey data at build or run time.

## Decisions

1. **Hand-curated additions, rule recorded in docs.** The data is added by editing `skills.ts` rather than generating it, because the sources are web pages and a PDF with no stable API. The rule (10% in a ranked Stack Overflow list, or named in the JetBrains/CNCF reports, and not already on any page) is written in the spec and README so later refreshes are consistent.
2. **Two new categories, one move.** "Testing and code quality tools" and "Editors, IDEs and package managers" group tools the existing categories did not fit. "Playwright" moves from Web and frontend to avoid a duplicate; its name is unchanged so saved profiles load.
3. **Skip entries below the threshold or already present.** Excluded: Pulumi (2.0%), OpenTofu (3.6%), OpenShift (3.2%), Oracle (9.4%), DynamoDB (9.3%), DigitalOcean (9.6%), Netlify (5.6%), and "Feature flags" and "Chaos engineering", which are on Engineering. Notepad++ and Android Studio are omitted as editors too narrow to describe a skill; they can be added later under the same rule.
4. **Entry names.** Combine closely related tools into one word, following existing style (for example "Deno and Bun"): "Vim and Neovim", "pip and uv", "Auth0 and Okta", "Make and Makefiles". Add "Visual Studio Code" and "Visual Studio" separately.
5. **Sources section as a non-footer element.** Render `<section className="sources" aria-labelledby=...>` after the step controls, not a second `<footer>`, so tests that find the step controls with `document.querySelector('footer')` keep working. Links use `target="_blank"` with `rel="noopener noreferrer"`.
6. **Source data lives in one small module.** A `SOURCES` array (title, publisher, url) in `src/data/sources.ts` feeds the page; the README is edited by hand to match, and a test asserts the three URLs appear in both.
7. **README placement.** Add a "Sources" section after "Features" with the list and selection rule, and a Features bullet pointing to it.

## Risks / Trade-offs

- **Survey data is a snapshot and parts were unreadable** (JetBrains charts, CNCF product detail). Mitigation: the rule is explicit about which source supports each entry type, and the README says the JetBrains figures were only partly available.
- **Catalog grows and some pages become long.** About 35 entries are added, mostly in two new categories. Mitigation: the existing filter; the "Cloud and DevOps" card grows by two only.
- **Duplicate names across pages would fail existing tests.** Mitigation: check every new name against all catalogs before adding (done for "Feature flags").
- **Licence.** CC BY-ND bars altering the CNCF report. Mitigation: only a link and credit are used; no figures from it are reproduced in the app.
- **Merge overlap** with `improve-usability-clarity-and-navigation` in `src/App.tsx` and `src/styles.css`. Mitigation: that change is committed, so this one builds on it.
