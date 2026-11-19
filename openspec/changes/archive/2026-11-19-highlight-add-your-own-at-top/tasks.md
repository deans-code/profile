## 1. Move and restructure

- [x] 1.1 In `src/components/WordPicker.tsx` render `AddEntry` between `SelectionHelp` and the filter block, and remove it from below the category cards
- [x] 1.2 In `src/components/AddEntry.tsx` add a visible heading from the existing `label` prop (keeping the accessible name), the instruction paragraph linked with `aria-describedby`, and the limit reason shown when `full`

## 2. Styling

- [x] 2.1 In `src/styles.css` style `.add-entry` as a highlighted panel (accent border, tint background, emphasised input, primary Add button) for light and dark themes, using `--text` for body copy
- [x] 2.2 Make the panel stack to one column at phone width and check the instruction wraps cleanly

## 3. Tests

- [x] 3.1 Add tests: the control appears before the filter and the first category on the values page and a skill page, and after the experience options on a skill page
- [x] 3.2 Add tests: the instruction text is present and described-by the input; the limit reason shows beside the disabled Add at 5 values and not for skills
- [x] 3.3 Confirm existing add-word tests still pass unchanged (label, Enter to add, duplicates, limit)
- [x] 3.4 Run the full test suite and a production build

## 4. Review

- [ ] 4.1 Review the instruction and limit wording with the user before archive
- [ ] 4.2 Check the values page and a skill page in the running app at desktop and phone widths in light and dark themes
