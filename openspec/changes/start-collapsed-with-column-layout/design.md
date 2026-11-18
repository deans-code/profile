## Context

`WordPicker` keeps a `collapsed` set of category names, empty by default, and renders cards inside `.categories`, a CSS grid with `repeat(auto-fill, minmax(24rem, 1fr))`. Grid items in a row stretch to the tallest card, so opening one card makes its neighbours tall too.

## Decisions

1. **Start collapsed by inverting the state.** Track `expanded: Set<string>` instead of `collapsed`, empty by default, so every card, including the Custom card, starts collapsed. Adding a custom entry adds `Custom` to `expanded`. A filter with text still shows matching cards open without touching the set.
2. **Collapse all / Show all** are two buttons in a small toolbar above the cards, beside the filter. "Show all" expands every card (all categories, plus Custom when it exists). "Collapse all" empties the set. Both are `type="button"` with 44px targets, and an `aria-live="polite"` line says "All sections collapsed" or "All sections shown". While a filter has text, matching cards are forced open regardless, which is acceptable.
3. **Fixed columns dealt by position**, not CSS multi-column and not grid. CSS columns rebalance every time a card's height changes, so opening one card made cards jump between columns. Instead `WordPicker` measures the container (`ResizeObserver`), works out how many 24rem columns fit, and splits the cards into that many runs of consecutive cards, each in a flex column (`.category-column`, `align-items: flex-start`). A card's column depends only on its position and the column count, so opening a card moves only the cards below it in its own column. Grid was rejected because rows stretch neighbours; a masonry library was rejected as heavier. Without `ResizeObserver` (jsdom) there is one column.
4. **Reading order:** consecutive runs keep DOM and tab order equal to category order, matching what a screen reader reads. A filter changes which cards are shown, so columns are re-dealt then; acceptable.
5. **Selections stay visible when collapsed** through the existing "N selected" header text, which matters more now that cards start closed.
6. The Custom card behaviour from the previous change is kept: adding an entry expands it before scrolling.

## Risks / Trade-offs

- Many existing tests assume visible chips on first render. Mitigation: a test helper that clicks "Show all" first, rather than editing each test by hand.
- A collapsed start costs a click for every visitor. Mitigation: "Show all" is one click and sits next to the filter.
- Changing the window width re-deals cards into a different number of columns. Accepted; opening and closing cards never does.
- The `collapsible-categories` spec is not in the main specs until the previous change is archived, so this change's delta cannot be archived before it.

## Open Questions

None blocking. Assumed: two separate buttons rather than one toggle, and the state is not remembered between pages or visits.
