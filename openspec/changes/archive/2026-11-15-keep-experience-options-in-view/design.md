## Context

`ModeSwitch` renders a `role="radiogroup"` pill, inline in `WordPicker`'s section, between the experience intro and the selection help. The footer `.nav` is already `position: sticky; bottom: 0; z-index: 5`. `.app` uses `overflow-x: clip`, which (unlike `hidden`) does not stop descendants from sticking. The definition panel is `position: fixed; z-index: 10`. The step view animates with `transform`, which does not affect sticky inside it once settled. The pill is `inline-flex`, which wraps on narrow screens.

## Goals / Non-Goals

**Goals:**
- Keep the switch visible while scrolling any skill page, on desktop and phone widths.
- Keep it compact on phones and out of the way of focus and the description panel.

**Non-Goals:**
- Changing option behaviour, counts, or the values page.
- Making other controls (filter, add-your-own) sticky.

## Decisions

1. **Sticky wrapper.** Wrap the radiogroup in a `div.mode-bar` with `position: sticky; top: 0; z-index: 4` (below the footer nav and the description panel) and an opaque `var(--bg)` background with a bottom border so cards do not show through. The wrapper is a direct child of the tall section, so it sticks for the whole page.
   - Alternative: make the pill itself sticky. Rejected: its `inline-flex` box would pin only as wide as the pill and leave text visible beside it.
2. **Full-width, equal options on narrow screens.** At the existing 40rem breakpoint the pill becomes `display: flex` with two `flex: 1` buttons, minimum 44px tall, smaller padding, so it fits on one line at 320px or wraps to two compact lines.
3. **Scroll padding.** Add `scroll-padding-top` equal to the bar height (a CSS variable) so keyboard focus and "scroll into view" do not leave a word under the bar. Likewise bottom padding for the footer already exists in layout.
4. **No new announcements.** The radiogroup semantics and arrow-key handling are untouched.

## Risks / Trade-offs

- [Bar takes vertical space on small phones, which already have a sticky footer] → keep it one compact row; confirm at 320 x 568.
- [Sticky silently fails if an ancestor gains `overflow: hidden/auto`] → keep `overflow-x: clip` and add a test that the structure exists plus a manual browser check.
- [Overlap with the definition panel] → panel keeps the higher z-index.
- [Reduced-motion and high-contrast users] → no animation is added; borders use existing theme tokens.
