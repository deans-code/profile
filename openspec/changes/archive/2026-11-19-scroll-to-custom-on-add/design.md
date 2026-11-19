# Design

## Context

Values and all skills tabs render through one component, `WordPicker`, which shows category cards plus a "Custom" card (only when there are custom entries) below them. `AddEntry` sits in the sticky `.pinned-bar` and calls `onAddCustom`; the reducer either appends a new custom entry, or, when the text matches an existing entry, selects that entry (or does nothing at the limit). The page already scrolls to top on step change in `useStepNavigation`, and `prefersReducedMotion()` exists there. A global `:focus` scroll margin uses `--pinned-bar-height`.

## Goals / Non-Goals

**Goals:** after a successful add of a new custom entry, the Custom card, including the new entry, is in view and not under the pinned bar, on every tab.

**Non-Goals:** moving focus away from the input (the user may add several in a row); highlighting or announcing the entry beyond what exists; changing where custom entries are stored or listed.

## Decisions

**Detect "a new custom entry was added" from state, not from the click.** `WordPicker` remembers `custom.length` and, in an effect, scrolls when the length has grown since the previous render and the growth came from an add in this picker. A ref `pendingReveal` is set in a wrapper around `onAddCustom` and consumed by the effect. This avoids scrolling on profile load or tab switch (length changes without a pending add) and on adds that the reducer turns into a selection (length unchanged). *Alternative:* scroll on every add click. Rejected: it would scroll to a Custom card that may not exist or did not change.

**Scroll target.** Give the Custom card a ref and call `scrollIntoView({ block: 'nearest', behavior })` on it, with `behavior` `'auto'` when `prefersReducedMotion()` is true, else `'smooth'`. `nearest` means a Custom card already in view does not jump, and one off screen is brought in. A CSS `scroll-margin-top: var(--pinned-bar-height)` on the Custom card keeps it clear of the sticky bar. *Alternative:* `block: 'start'` always. Rejected: it jerks the page when the card is already visible.

**Filter.** If the typed filter text does not match the new entry, the Custom card is hidden and cannot be revealed. On a successful add, clear the filter (the existing filter-keeps-selections spec is unaffected: selections are retained). *Alternative:* leave the filter and show a message. Rejected as the user explicitly asked to see the entry.

**Where.** Implemented once in `WordPicker`, so values and every skills tab get it; no per-tab code.

## Risks / Trade-offs

- [Effect runs before the new card is in the DOM] → run it in `useEffect` after the render that contains the new entry, and guard when the element is missing.
- [Smooth scrolling in jsdom tests] → jsdom has no layout; tests stub `Element.prototype.scrollIntoView` and assert it is called with the expected options.
- [Clearing the filter surprises the user] → only on a successful add, and the entry is then visible, which is the point of the change.
