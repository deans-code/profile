# Tasks

## 1. Definitions data

- [x] 1.1 Remove the `weight` field from the values data and its `weight-*` styles, rendering all values uniformly; verify `npm run build` and the existing tests pass
- [x] 1.2 Write definitions for all built-in values in `src/data/definitions.ts`, with a lookup helper keyed by normalized name; verify a data test asserts every value has a non-empty definition
- [x] 1.3 Write definitions for all technical development and engineering skills; verify the coverage test now asserts both catalogs and none are orphaned
- [x] 1.4 Write definitions for all interpersonal skills; verify the coverage test passes for all three catalogs and every definition is at most two sentences

## 2. Definition panel and activation

- [x] 2.1 Build the definition panel and its context (single open term, viewport-clamped positioning, Escape/outside-press/close button dismissal, focus return); verify component tests for dismiss, switching words and one-panel-at-a-time
- [x] 2.2 Add the `useTermActivation` hook (right-click, ContextMenu/Shift+F10/"?", 500 ms touch long-press with click suppression) and apply it to value and skill buttons, leaving custom entries to the browser menu; verify tests for right-click not changing selection, keyboard opening, long-press not toggling, and custom entries not opening a panel

## 3. Instructions

- [x] 3.1 Add the `SelectionHelp` instructions to the top of the values and skill steps (click to select, right-click for definition, keyboard and long-press alternatives); verify component tests find the instructions on every selection step

## 4. Theming and layout

- [x] 4.1 Make all words one uniform size and align them in a responsive grid, with a check mark on selected words; verify a test that selected and unselected words share a size class and a visual check at desktop width
- [x] 4.2 Add per-section colour tokens (`data-section`, light and dark) applied to buttons, selected words, focus ring and the stepper, and a contrast test over the palette; verify the contrast test passes for both themes
- [x] 4.3 Widen the layout (120rem ceiling, category cards in a grid, multi-column scoring and profile card, single column on phones); verify screenshots at 360, 1024 and 1600 px wide show the intended layout and no horizontal scrolling

## 5. Section transitions

- [x] 5.1 Add scroll-to-top, direction-aware enter animation, heading focus, reduced-motion handling and a navigation lock to the app shell; verify tests for scroll call, direction classes, focus on the heading, reduced motion and a rapid double Continue causing one change
- [x] 5.2 Apply the same transition to Back, Edit and stepper navigation; verify tests for those entry points

## 6. Documentation and integration

- [x] 6.1 Update the README (features, usage including definitions and shortcuts, known defects) and the end-to-end test for the new behavior; verify `npm test` and `npm run build` pass and the README matches the app
