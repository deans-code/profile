## Context

`ModeSwitch` renders the sticky `.mode-bar` (top: 0, z-index 4, opaque background, border below). `AddEntry` is a separate tinted panel in normal flow with a title, a help sentence, an input and an Add button, plus an optional limit message. In `WordPicker` the order is: lead and hint, assistant link, experience intro, mode bar, selection help, add entry, filter, categories. On the values page there is no mode bar. On a 320 x 568 phone the existing bar is about 59 px and the sticky footer navigation is about 150 px.

## Goals / Non-Goals

**Goals:**
- One pinned bar holding the options and the add-your-own controls, side by side where there is room.
- Keep the bar short enough that the catalog is still usable on a phone.
- Keep the add form's accessibility: label, help association, limit status.

**Non-Goals:**
- Pinning the filter box or the selection help.
- Changing add behavior, duplicate handling or limits.

## Decisions

1. **One bar, two children.** Make the pinned container a shared element in `WordPicker` (reusing the `mode-bar` styles) holding `ModeSwitch` (when there are options) and a compact `AddEntry`. Position and stacking stay as they are. Alternative: two separate sticky elements. Rejected: two stuck elements at `top: 0` overlap, and stacking offsets would need measured heights.
2. **Layout.** Desktop (above 40rem): a single flex row, options on the left, add form filling the remaining width (input grows, Add button fixed). Phone: two rows, options then input + Add, each at least 44 px tall. Estimated bar height is about 70 px on desktop and about 110 px on a phone.
3. **Compact add box.** Drop the tinted panel and title from the pinned version. The label stays as a visually hidden label (so `getByLabelText` and screen readers still work) and the placeholder reads "Add your own skill" / "Add your own value". The accent border on the input keeps it highlighted.
4. **Help text moves out.** The sentence "Not in the lists? Type it and press Add or Enter. It will appear under Custom, selected." becomes a normal-flow paragraph above the bar, and the input keeps `aria-describedby` pointing at it. Alternative: keep it inside the bar. Rejected: it adds one to three lines of pinned height on a phone.
5. **Limit message.** Keep `role="status"` text in the bar, shown only when the values page is full; it replaces nothing else, and on phones it may wrap, so it is short and sits beside Add or under the row.
6. **Scroll padding.** Raise `scroll-padding-top` to the new bar height on both breakpoints so focused words are not hidden.

## Risks / Trade-offs

- [A 110 px bar plus the 150 px footer leaves under half of a 568 px phone screen for the catalog] → measure at 320 x 568; if too tight, shrink padding, and as a fallback unpin only the help or the limit text, never the input.
- [Opening the on-screen keyboard on a phone shrinks the viewport further] → the bar stays at the top and the input stays visible; check in a real mobile browser, not only a resized window.
- [Moving the help text away from the input may reduce clarity] → keep `aria-describedby`, and place the paragraph directly above the bar.
- [Tests depend on the old panel order] → update them to the new structure rather than loosening the assertions.
