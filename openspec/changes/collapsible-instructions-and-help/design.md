## Context

`App.tsx` renders a single `<header>` containing title row, intro, an always-open `ol.how-it-works`, step status, progress and the stepper. `WordPicker.tsx` renders `AssistantLink` and `SelectionHelp` as always-visible blocks, then `AddEntryHelp` and the pinned bar. Category cards already use a button with `aria-expanded` (see `collapsible-categories`).

## Goals / Non-Goals

**Goals:** collapse route instructions and page help by default; make intro vs navigation read as two areas; reword the add hint.
**Non-Goals:** changing selection behavior, step logic, data or the profile format; changing the pinned bar.

## Decisions

- **Native `<details>/<summary>`** for both collapsibles. It gives keyboard/touch operation, expanded-state semantics and non-focusable hidden content for free, and needs no state. A custom button plus state (as category cards use) was rejected as more code for no gain. Summary labels: "How this works" (header) and "Help" (pages).
- **Header split** into two wrappers inside `<header>`: `.intro-block` (title row, intro, instructions details) and `.nav-block` (step status, progress, stepper nav). The latter gets its own tint background, border and padding, plus spacing from the intro. Markup order is unchanged.
- **One Help area** per page in `WordPicker`: `<details className="page-help">` containing `AssistantLink` (when present) and `SelectionHelp`. The `aside` landmarks keep their aria-labels inside. `AddEntryHelp` stays outside, above the pinned bar.
- **Hint wording** takes a `noun` prop derived from `kind` (`values` → "value", otherwise "skill"), via `AddEntryHelp`.
- Open/closed state is not persisted; it resets on step change since pages remount, consistent with cards starting collapsed.

## Risks / Trade-offs

- Users may miss controls hidden in Help → the summary says "Help" and the add box stays visible. Accepted by the request.
- Existing tests that query the instructions or ChatGPT box while collapsed may fail, since jsdom treats closed `details` content as inaccessible → update tests to expand Help first.
