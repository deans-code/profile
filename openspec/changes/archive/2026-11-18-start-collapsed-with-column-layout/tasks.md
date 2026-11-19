## 1. Collapsed start and controls

- [x] 1.1 In `src/components/WordPicker.tsx`, replace the `collapsed` set with an `expanded` set that starts empty; adding a custom entry still expands the Custom card; a filter with text still shows matching cards open without changing the set
- [x] 1.2 Add "Collapse all" and "Show all" buttons above the cards, with an `aria-live="polite"` status line ("All sections collapsed" / "All sections shown")
- [x] 1.3 Style the toolbar for phone width, light, dark and the accessibility options (44px targets, focus ring)

## 2. Column layout

- [x] 2.1 In `src/styles.css`, deal cards into fixed flex columns by position (`useColumnCount`, `chunk` in `WordPicker.tsx`, `.category-column` styles) instead of CSS multi-column, which rebalanced and moved every card on expand
- [ ] 2.2 Check one column at phone width with no sideways scroll, and that expanding one card does not stretch its neighbours

## 3. Tests

- [x] 3.1 Add a test helper that clicks "Show all", and use it in tests that find chips on first render (`src/broad-terms.test.tsx`, `src/App.test.tsx`, `src/limits.test.tsx`, `src/values-grouping.test.tsx` and others that fail)
- [x] 3.2 Update `src/collapse.test.tsx` for the collapsed start, and add tests for Collapse all, Show all, selections kept, the live status, the "N selected" count after loading a profile, and the Custom card opening on add
- [x] 3.3 Run the full test suite, type check and build

## 4. Verify

- [ ] 4.1 Check the values page and one skills page by hand at phone width and wide, and open a card with a neighbour to confirm the neighbour does not grow
