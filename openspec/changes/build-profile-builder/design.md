# Design

## Context

Greenfield repo (only LICENSE and README; the `.gitignore` is a generic .NET one). The app is a single-user, browser-only wizard. See proposal.md for motivation and the specs for behavior.

## Goals / Non-Goals

**Goals:**
- Static client-side app deployable to any static host; no backend.
- Catalog data separate from UI so it can be edited without touching components.
- Export logic as pure functions that are unit-testable.
- Keyboard-accessible, responsive UI.

**Non-Goals:**
- Persistence across sessions, import of exported files, accounts, server APIs.

## Decisions

1. **Vite + React + TypeScript, tested with Vitest and Testing Library.** Chosen for being widely used, well supported and established: React is the most widely adopted UI library, TypeScript is the mainstream typed layer, and Vite is the standard tooling now that Create React App is retired. Use current LTS Node and stable releases only, with mainstream libraries (no niche dependencies). Alternatives: Next.js (established, but heavier than a browser-only wizard needs); vanilla JS with no build (fewer dependencies, but state across five steps becomes harder to maintain); Blazor (matches the .NET `.gitignore`, but heavier for a static widget). Also add Node entries to `.gitignore`.
2. **Wizard state in one reducer at the app root** (`values`, `skills[section]`, `scores`, `step`). Steps are views over this state, so back-navigation preserves everything and "deselect resets score" is a single reducer rule. Alternative: per-step local state plus syncing, rejected as error-prone.
3. **Steps:** Values → Technical → Engineering → Interpersonal → Scoring → Card. The scoring step is reachable only when every section is non-empty; stepper allows going back freely, forward only to steps whose prerequisites are met.
4. **Catalogs as typed TS data modules** (`category → skills[]`), at least 40 skills and 5 categories per section, ~50 common values. Test enforces size minimums and uniqueness within and across sections. Alternative: JSON files fetched at runtime, rejected as unnecessary I/O.
5. **Values cloud as a flow-wrapped set of toggle buttons** (`aria-pressed`) with size/weight variation by commonness for the "cloud" feel. Alternative: a canvas/word-cloud layout library, rejected for accessibility and dependency weight.
6. **Scoring via native `<input type="range" min=1 max=10 step=1>`** with a visible numeric readout; native keyboard and a11y behavior come free.
7. **Custom entries** normalized by trim and case-insensitive comparison; stored as part of state alongside the catalog, in a "Custom" category for skills.
8. **Export** via pure `toJson(profile)` and `toMarkdown(profile)` functions, delivered by creating a `Blob` and an object URL for an anchor download. Markdown output escapes special characters in user text. Filenames `profile.json` / `profile.md`.
9. **Styling:** plain CSS with variables, supporting light/dark via `prefers-color-scheme`; no UI library.

10. **Hosting: static site on GitHub Pages (free), deployed by a GitHub Actions workflow.** The app is pure static output (`dist/`), so any static host works and hosting cost is zero. Pages is chosen because the repo is already in git and needs no extra account. Constraints this places on the app: no server-side code or routing (the wizard is a single page driven by state, so no SPA rewrite rules are needed), and Vite `base` set to the repo path for project-site URLs. Alternatives: Cloudflare Pages or Netlify (also free, with preview deploys; equally viable since the build output is host-agnostic).

## Risks / Trade-offs

- [Catalog subjectivity: "comprehensive but relevant" is a judgment call] → Keep catalogs in one data module, require custom entries, and review lists during implementation.
- [Long scoring list on many selections] → Group by section, sticky section headings.
- [No persistence: a refresh loses progress] → Accepted for v1; a `localStorage` autosave is a candidate follow-up.
- [Host lock-in or a wrong `base` path breaking asset URLs] → Build output is host-agnostic; `base` is configured in one place and verified against the deployed URL.
- [Markdown injection from custom entries] → Escape in `toMarkdown`, covered by tests.
