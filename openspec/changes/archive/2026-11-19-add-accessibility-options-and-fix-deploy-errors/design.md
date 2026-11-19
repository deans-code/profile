## Context

Palettes are CSS custom properties on `:root` and `[data-section]`, with a `@media (prefers-color-scheme: dark)` block overriding them; `src/theme.test.ts` parses that block to check contrast. Sizes are mostly `rem`, but some are `px` (e.g. 44px buttons). The header row holds the title and `LoadProfile`. The deploy run (43397708004) succeeded but logged: wrangler-action's `npx --no-install wrangler --version` failed (wrangler not installed) so it installed 3.90.0, and the "Ensure Pages project exists" step (`continue-on-error`) failed with code 8000002 because the project exists.

## Goals / Non-Goals

**Goals:** explicit theme and text-size choice, persisted, no flash on load, existing contrast guarantees kept; a quiet deploy run.
**Non-Goals:** high-contrast or reduced-motion modes, font family choice, per-section settings, syncing preferences across devices, saving them in the profile file.

## Decisions

1. **Theme via `data-theme` on `<html>`** (`light` | `dark`; absent = system). Duplicate the dark palette under `:root[data-theme='dark']` and scope the media query to `:root:not([data-theme='light'])`. Alternative: toggle classes in JS and drop the media query, rejected because "Match system" should work without JS and stay live if the OS setting changes. To avoid divergence, the contrast test reads both dark blocks and asserts identical tokens. Also set `color-scheme` per theme so native controls match.
2. **Text size by root font-size percentage** (100 / 112.5 / 125 / 150%) set through `data-text-size` on `<html>`, with `px` sizes for text-bearing controls converted to `rem` (the 44px min-height becomes `2.75rem`). Alternative: CSS `zoom`, rejected as non-standard and it breaks layout calculations. Percentages honour the browser's own default size.
3. **Persistence in `localStorage`** under one key, validated on read, all access in try/catch. An inline script in `index.html` applies the saved attributes before first paint. Alternative: apply in a React effect, rejected as it flashes the wrong theme.
4. **UI**: a new `AccessibilityOptions` component in the header row, a disclosure button ("Accessibility") opening a panel with two radio groups (`fieldset`/`legend`), reusing existing button styles. Radios give correct keyboard behaviour and announce selection. A small `preferences.ts` module owns read/validate/write/apply so the component and the inline script share the value lists.
5. **Deploy workflow**: delete the ensure-project step; set `wranglerVersion` on the deploy step to a current 4.x so the action installs it itself instead of falling back to 3.90.0; move checkout, setup-node and wrangler-action to the latest majors that target Node 24, checking release notes first. The README gains a one-time "create the Pages project" instruction, since the workflow no longer does it.

## Risks / Trade-offs

- Duplicated dark palette → test asserts the two blocks match.
- Large text could break layouts (stepper, header row, word pickers) → wrap rules, and a manual check at the largest size at 1280px and mobile width.
- Pinned wrangler may drift behind → bump deliberately; noted in a workflow comment.
- A newer action major may change inputs → verify with a manual `workflow_dispatch` run before relying on it.

## Migration Plan

Ship together. Roll back by reverting the commit; saved preferences are harmless when ignored. If the new workflow fails, revert `deploy.yml` only.
