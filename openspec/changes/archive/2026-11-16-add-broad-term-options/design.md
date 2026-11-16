# Design

## Context

Each skills section is a merged, cited catalog (`mergeContributions`) rendered by `WordPicker` as category cards, a Custom card and a pinned bar. Selection state holds option names; names not in the catalog load as custom entries. Every built-in option needs a definition, and every option in the merged catalog carries source citations (the Sources section shows only cited sources). Sections have their own theme accent colour. Existing rules: no option shared between sections, no case-insensitive duplicates within one, groups of at least six.

## Goals / Non-Goals

**Goals:** let a user pick a broader term per section; keep individual options available; make broader terms visually distinct and accessible.

**Non-Goals:** auto-selecting or hiding covered options; changing existing categories or citations; broader terms for values.

## Decisions

**Assumption to confirm:** "include the individual options under those new options" is read as "the individual options remain available beneath the Broader terms card, in their existing category cards", not as nesting copies of them inside the new card. Duplicating each option in two places would show the same name twice on the page, break name-based lookups, and make selection confusing. The definition panel of a broader term lists what it covers, which links the two. If nesting was meant, the card can render each broader term with a collapsible list of its covered options as a follow-up.

**Data: a separate broader-terms file, outside the cited catalog.** Per section: `{ name, description, covers: string[] }[]`. The merged catalog and its attribution are untouched, so the citation rules (no option without a listed source, no orphan sources) are not weakened. Broader terms are the app's own grouping and are labelled as such in the README. *Alternative:* add them as a cited source category. Rejected: no published source defines these groupings, and a fake citation would misstate provenance.

**Integrity checks (tests):** every `covers` name exists in the same section's catalog; each term covers at least 3 options; names are unique ignoring case across all sections and do not equal any existing option, value or custom-reserved name; at least 8 per section; each has a non-empty definition that mentions each covered option.

**Rendering:** `WordPicker` takes an optional `broadTerms` prop and renders a "Broader terms" card before the category cards, using the same chip button, so selection, experience modes, long-press and keyboard definitions behave identically. The filter applies to the card like any other, hiding it when nothing matches. Broader terms count toward selections like any skill (unlimited for skills).

**Colour:** a `.chip.broad` style with its own tokens (`--broad`, `--broad-tint`, `--broad-text`), separate from the per-section accent so it stands out on every tab, defined for light, dark and the accessibility options. Selected state keeps the existing check mark and fill so selection does not rely on colour either. The card heading and a short caption ("Broader terms cover several options below") give a non-colour cue. Contrast of text, border and selected state is checked against WCAG AA (4.5:1 text, 3:1 non-text) in each theme.

**Initial broader terms (to be confirmed against real catalog names at apply time; each must cover at least 3 existing options):**
- Technical: CI/CD, Containerisation, Container orchestration, Infrastructure as code, Observability, Relational databases, NoSQL databases, Message brokers, Unit testing frameworks, Build automation, Front-end frameworks, Server-side frameworks, Identity and single sign-on, Version control.
- Engineering: Microservice architecture, Clean architecture, Test automation, Reliability engineering, Application security, Continuous delivery, Cloud-native practices, Design patterns, Agile delivery.
- Interpersonal: Communication, Collaboration, Coaching and mentoring, Facilitation, Conflict resolution, Negotiation, Stakeholder management, Emotional intelligence, Problem solving.
- AI engineering: Large language model providers, AI coding assistants, AI agents, Retrieval-augmented generation, Prompt and context engineering, Model evaluation, AI security, AI governance, Local model inference.

**Saved profiles:** names matching a broader term (ignoring case and whitespace) load as that built-in option in the right section; no format change.

## Risks / Trade-offs

- [Overlap makes the user pick both a term and its tools] → Intentional; selection is independent, and the definition says so.
- [A broader term name collides with a future option] → The uniqueness test fails until resolved.
- [Same name on two sections, such as "Communication"] → Names are checked unique across sections; interpersonal keeps it, others use distinct wording.
- [Colour clash with a section accent] → Tokens chosen to differ from all six accents and checked per theme; card heading and caption keep it understandable without colour.
- [Maintenance of `covers`] → Test fails if a covered option is renamed or removed.
