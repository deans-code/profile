# Design

## Context

`WordPicker.tsx` renders, in order: heading, lead, `hint` paragraph, experience intro (skill pages), a Help `<details>` (ChatGPT link and `SelectionHelp`), `AddEntryHelp` (the "Want to add…" paragraph, referenced by the input's `aria-describedby`), the sticky `.pinned-bar` (mode switch + Add), a broad-terms note, a `.filter-block` (label, hint, input, count) and a `.bulk-bar` (Show all, Collapse all, live status). See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- One tools row: mode switch (skills only), Add, filter, Show all, Collapse all.
- Explanatory text lives in Help; nothing is lost that is useful.

**Non-Goals:**
- No change to filtering, bulk, add or mode behavior, state or export.
- No new help content beyond a one-line filter hint.

## Decisions

- **Reuse `.pinned-bar` as the tools row** and move the filter input and bulk buttons into it. The filter label becomes visually hidden (`visually-hidden` label) with the placeholder "Filter…"; the visible "Filter skills" heading and hint paragraph are removed.
- **Keep the filter count and bulk status outside the row**, directly below it, as live regions, so the row stays short.
- **Narrow screens:** the pinned part stays as today (options, then Add). The filter and bulk buttons form a second group that is not sticky. Implement with a wrapper that is `display: contents` below 40rem, so only the first group is sticky, and a single flex row above it.
- **Help contents** in order: ChatGPT link, selection instructions, add-your-own instruction (same element, moved), filter hint ("Type part of a word to show only the {noun} that match. Your selections are kept."), and, on skill pages, the experience explanation ("…switching with the options above"). `AddEntryHelp` keeps its id so the input's `aria-describedby` still works while Help is collapsed (descriptions are computed from hidden content).
- **Remove the `hint` line** ("Select the skills that apply, or add your own.") and its prop: it repeats the lead. The experience explanation is kept because it states something the lead does not (what previous vs desired mean).
- **Assumptions:** "these items" in the request means the filter and Show all / Collapse all joining the existing pinned row; the Add control and options stay where they are. A taller pinned row on wide screens is acceptable; `--pinned-bar-height` is adjusted if needed.

## Risks / Trade-offs

- [Row too wide at mid widths wraps into two lines and makes the pinned bar tall] → Let it wrap, give the filter a flexible width (min ~10rem), and update `--pinned-bar-height` so focus scroll margins stay correct.
- [Hidden Help content used as `aria-describedby`] → Already the case today for collapsed content in other places; add a test that the accessible description still contains the instruction.
- [Existing tests read the removed or moved text] → Update them in the same task group.
