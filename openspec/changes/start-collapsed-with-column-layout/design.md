## Context

`WordPicker` keeps a `collapsed` set of category names, empty by default, and renders cards inside `.categories`, a CSS grid with `repeat(auto-fill, minmax(24rem, 1fr))`. Grid items in a row stretch to the tallest card, so opening one card makes its neighbours tall too.

## Decisions

1. **Start collapsed by inverting the state.** Track `expanded: Set<string>` instead of `collapsed`, empty by default, so every card, including the Custom card, starts collapsed. Adding a custom entry adds `Custom` to `expanded`. A filter with text still shows matching cards open without touching the set.
2. **Collapse all / Show all** are two buttons in a small toolbar above the cards, beside the filter. "Show all" expands every card (all categories, plus Custom when it exists). "Collapse all" empties the set. Both are `type="button"` with 44px targets, and an `aria-live="polite"` line says "All sections collapsed" or "All sections shown". While a filter has text, matching cards are forced open regardless, which is acceptable.
3. **Columns via CSS multi-column**, not grid: `.categories { column-width: 24rem; column-gap: 1rem; }` and `.category { break-inside: avoid; margin-bottom: 1rem; }`. Each card takes its own height, so a card opening only moves the ones below it in its column. Alternatives: grid with `align-items: start` leaves row gaps and cards do not flow up; a JS masonry is heavier.
4. **Reading order trade-off:** multi-column fills the first column top to bottom before the next, so DOM and tab order stay in category order and match what a screen reader reads. The visual order across columns differs from row-wise order; accepted.
5. **Selections stay visible when collapsed** through the existing "N selected" header text, which matters more now that cards start closed.
6. The Custom card behaviour from the previous change is kept: adding an entry expands it before scrolling.

## Risks / Trade-offs

- Many existing tests assume visible chips on first render. Mitigation: a test helper that clicks "Show all" first, rather than editing each test by hand.
- A collapsed start costs a click for every visitor. Mitigation: "Show all" is one click and sits next to the filter.
- Column balancing can reflow when a card opens, shifting cards across columns. Accepted; cards never split.
- The `collapsible-categories` spec is not in the main specs until the previous change is archived, so this change's delta cannot be archived before it.

## Open Questions

None blocking. Assumed: two separate buttons rather than one toggle, and the state is not remembered between pages or visits.
