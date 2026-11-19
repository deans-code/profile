# Design

## Context

Page help is a `<details className="page-help">` in `WordPicker.tsx` containing, in order: `AssistantLink` (an `<aside className="assistant">` with a dashed border), `SelectionHelp` (an `<aside className="help">` already tinted), the experience-intro `<p>`, `AddEntryHelp` (`<p className="add-help">`) and the filter hint `<p className="filter-hint">`. The side bar has `<details className="route-help">` for "How this works" and "Privacy" in `App.tsx`. Each section sets `--accent`, `--tint` and the page defines `--surface`, `--border`. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Area block: tinted background, accent border. Inner blocks: one shared colour that is visibly different.
- Reuse existing variables so both themes and all sections work without new colours.

**Non-Goals:**
- No new text, headings or reordering; no change to collapse logic.

## Decisions

- **Area block** = the `<details>` element itself: `background: var(--tint); border: 1px solid var(--accent); border-radius: var(--radius); padding: 0.25rem 0.75rem`, with the summary inside, so a collapsed Help reads as a bar. Apply to `.page-help` and `.route-help`.
- **Inner blocks** share one rule, `.help-block { background: var(--surface); border: 1px solid var(--border); border-left: 4px solid var(--accent); border-radius: var(--radius); padding: 0.5rem 1rem; margin: 0.5rem 0; }`. `--surface` (white in light, dark grey in dark) contrasts with `--tint` in both themes, and the thicker accent left edge ties each block to the section.
- **Apply `.help-block` by adding the class** to the existing elements: `assistant` and `help` asides, the experience intro, `add-help` and `filter-hint` paragraphs. The existing `.help` tint/border and `.assistant` dashed border rules are removed or overridden so the block style is consistent, and their element tags (`aside` with `aria-label`) are kept for accessibility.
- **Sidebar areas have one topic each**, so they get the area block only. The Privacy bullets stay a list inside it; splitting them into inner blocks was rejected as noise.
- **Assumption:** "help areas" means the page Help areas and the side bar's How this works and Privacy; the sources list and Add form are not help areas.

## Risks / Trade-offs

- [Five stacked inner blocks make the expanded Help long] → Tight padding and margins; the area is collapsed by default.
- [`--surface` inner blocks inside a `--tint` block may look too similar in some dark sections] → Check all four skill sections, values and the side bar in both themes in the browser; the border colours keep them separate.
- [A bordered `details` changes the summary's hit area] → Keep the summary at least 44px tall and verify keyboard focus outlines are visible.

## Optional skill pages

**Context:** `pageComplete` returns true for a skill page only with at least one word in either mode; `stepBlockedReason` refuses the profile card while `missingSections` is non-empty, and `loadLanding` uses the same rule. The navigation's check marks and progress bar use `pageComplete`.

**Decisions**
- **Blocking:** drop the skill-page check from `stepBlockedReason` (values minimum and over-limit rules stay). `missingSections` and its message are removed. `loadLanding` then returns the profile card for any file whose values are valid and within limits.
- **Check marks and progress:** an empty skill page cannot be "complete" by selection alone, and showing it as incomplete forever would be wrong now that it is optional. Track the furthest step the user has reached (`furthest` in state, advanced by `goTo` and set by `loadProfile` from the landing step). A skill step shows as complete if it has a selection or its index is below `furthest`. Alternative rejected: treat all skill steps as always complete, which makes the progress bar misleading.
- **Profile card:** a skill group with no words in either option shows a short "Nothing chosen" line under its heading instead of a bare heading. The exported file is unchanged: empty lists are already valid.
- **Values page** keeps its 5 to 10 rule and message.
- **Assumption:** "no selection of values on all tabs apart from values" means no required selection of skills on the four skill pages; the values page stays required.

**Risks**
- [Existing tests assert the old rule] → update them with the behavior change in the same task group.
- [`furthest` must reset when a profile is loaded or the user restarts] → set it from the landing step on load; it starts at the first step.
