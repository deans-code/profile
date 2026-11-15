## 1. Markup

- [x] 1.1 Wrap the `ModeSwitch` radiogroup in a `mode-bar` element in `ModeSwitch.tsx`, keeping its roles, labels and arrow-key behaviour unchanged
- [x] 1.2 Confirm `WordPicker` places the bar as a direct child of the page section and renders it only on skill pages

## 2. Styles

- [x] 2.1 Add sticky styling for `.mode-bar` in `src/styles.css`: `top: 0`, z-index below the footer nav and description panel, opaque background and a bottom border using theme tokens, in light and dark themes
- [x] 2.2 Add the narrow-screen layout (at the existing 40rem breakpoint): full-width flex, two equal options, at least 44 px tall, compact padding
- [x] 2.3 Add `scroll-padding-top` for the bar height so focused words are not hidden; check `.app` overflow does not break sticky

## 3. Tests and docs

- [x] 3.1 Add a test that each skill page renders the radiogroup inside `.mode-bar` and the values page renders neither; update any existing test that depends on the old structure
- [x] 3.2 Check in a browser at desktop and 320 px widths: the bar stays pinned through a long page, switching works while pinned, nothing overlaps the footer nav or description panel, and Tab focus is not hidden
- [x] 3.3 Add a line to the README experience options description, and run the tests, type check and build
