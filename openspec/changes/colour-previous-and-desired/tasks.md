# Tasks

## 1. Mode scope

- [ ] 1.1 In `WordPicker.tsx`, wrap the tools row, status line, broad-term note and category cards in `<div className="mode-scope" data-mode={mode}>` when `mode` is set (no wrapper attribute on the values page); verify with a test that the wrapper carries the active mode on skill pages, changes when the switch is used, and is absent on the values page.

## 2. Colours

- [ ] 2.1 In `src/styles.css`, add the scoped overrides that rotate the hue of `--accent` and `--tint` by −15° (previous) and +15° (desired) inside `.mode-scope`, guarded by `@supports` for relative colour; verify in the browser that the switch's selected button, category cards and chips change colour together when switching.
- [ ] 2.2 Check contrast in the browser for the selected switch button, selected chips and card borders in light, dark and system-dark, for both options and all four skill sections (≥4.5:1 text, ≥3:1 boundaries), tune the angle if needed, and verify the tools row still pins while scrolling.

## 3. Final checks

- [ ] 3.1 Run `npm test`, `npm run build` and `openspec validate colour-previous-and-desired --strict` and verify all succeed.
