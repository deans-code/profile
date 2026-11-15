## 1. Markup

- [ ] 1.1 Create a shared pinned bar in `WordPicker` that holds the options (skill pages only) and the add-your-own form, reusing the existing sticky bar element
- [ ] 1.2 Make `AddEntry` compact: visually hidden label, placeholder text, input and Add on one row, limit message inside the form; move the explanatory sentence to a normal-flow paragraph above the bar and keep `aria-describedby` on the input
- [ ] 1.3 Keep the filter box, selection help and categories in normal flow, and confirm the values page renders the bar with only the add form

## 2. Styles

- [ ] 2.1 Lay the bar out as one row above 40rem (options left, add form filling the rest) and as two rows on phones, with touch targets of at least 44 px
- [ ] 2.2 Remove or adapt the tinted panel styles for `.add-entry`, keeping an accent border on the input, in every theme and in dark mode
- [ ] 2.3 Update `scroll-padding-top` for the taller bar at both breakpoints

## 3. Tests and docs

- [ ] 3.1 Update `add-entry.test.tsx` for the new order and the paragraph above the bar; add tests that the form sits in the same pinned bar as the options on skill pages and alone on the values page, and that the input is labelled and described
- [ ] 3.2 Check in a browser at 1280 x 800 and 320 x 568: the bar stays pinned through a long page, adding a custom entry while pinned works without scrolling, the limit message shows on the values page, nothing overlaps the footer nav or description panel, Tab focus is not hidden, and enough of the catalog remains visible on the phone
- [ ] 3.3 Update the README note on pinned options, then run the tests, type check and build
