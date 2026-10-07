# Design

## Context

Builds on the app from `build-profile-builder` (already in the repo): one reducer in `src/state/profile.ts`, step components in `src/components`, catalogs in `src/data`, and a single `src/styles.css`. Values and skills are rendered as toggle buttons (`aria-pressed`); the values cloud currently varies size by a `weight` field, and the layout is capped at 56rem. See proposal.md for motivation and the specs for behavior.

That change's specs are not archived yet, so `openspec/specs/` is empty and this change adds new capabilities rather than modifying existing ones. Where this change supersedes a decision there (Decision 5 of the original design: a size-varying cloud), this change wins; the original specs never required varying sizes.

## Goals / Non-Goals

**Goals:**
- Wide, uncluttered, uniform presentation with a distinct colour per section.
- Definitions reachable by right-click, keyboard and touch.
- Animated, accessible section changes.
- No new runtime dependencies.

**Non-Goals:**
- Definitions for custom entries, external dictionary lookups, editable definitions.
- A router or URL per section.

## Decisions

1. **Definitions as a separate data module** (`src/data/definitions.ts`, a map from normalized name to text), not embedded in the catalogs. Keeps catalog edits and definition edits independent and the catalog types unchanged. A data test asserts every built-in value and skill has a non-empty definition (and none are orphaned), so adding a catalog entry without a definition fails the build. Alternative: embed `{ name, definition }` in the catalogs, rejected as a larger refactor of every consumer.
2. **One definition panel owned by the app shell.** A small context (`open(term, anchorEl)` / `close()`) holds the single open term, so only one panel can be open and focus can return to the anchor. The panel is a non-modal `role="dialog"` popover positioned from the anchor's rectangle and clamped to the viewport; closes on Escape, outside press and a close button. Alternatives: the native Popover API (inconsistent positioning control and test support in jsdom) and a library such as Floating UI (extra dependency for one panel).
3. **One `useTermActivation(name)` hook** used by every value and skill button, returning handlers:
   - `onContextMenu`: opens the definition and calls `preventDefault` only for built-in terms (custom terms keep the browser menu, per the spec).
   - `onKeyDown`: `ContextMenu`, `Shift+F10` and `?` open it. (The browser also fires `contextmenu` for the first two from the keyboard, which the handler above already covers; the hook de-duplicates by ignoring a second open for the same term within one tick.)
   - Long-press: a 500 ms timer on `pointerdown` for `pointerType === 'touch'`, cancelled on move, up or cancel; when it fires it opens the definition and suppresses the click that would otherwise toggle selection. This is needed because iOS Safari does not fire `contextmenu` on long-press.
4. **Instructions as a shared `SelectionHelp` component** at the top of the values and skill steps: one short paragraph covering click to select, right-click for the definition, and the keyboard and long-press alternatives.
5. **Uniform size and tidy rows.** Remove `weight` from the values data and the `weight-*` styles. Words render in a CSS grid (`repeat(auto-fill, minmax(11rem, 1fr))`) so uniformly sized words align in tidy columns that grow with the screen. Alternative: keep flex-wrap pills, which look ragged without size variation.
6. **Wide layout.** Replace the 56rem cap with `max-width: min(100% - 2rem, 120rem)`. Skill categories become cards in a responsive grid (`auto-fill, minmax(20rem, 1fr)`); the scoring step lays the three skill groups out as columns when width allows, and the profile card uses columns for values and skills. Below about 40rem everything is a single column.
7. **Colours by section via `data-section`.** The app wrapper carries `data-section="<step>"`, and CSS custom properties (`--accent`, `--accent-text`, `--tint`) are defined per section for light and dark under `prefers-color-scheme`. Everything that already uses the accent (primary buttons, selected chips, focus ring, stepper current item) picks the colour up automatically; stepper items carry their own section attribute so each shows its own colour. A Vitest test parses the palette from `styles.css` and asserts WCAG AA contrast for button text and boundaries in both themes. Selected words also gain a check mark (`::before`) so colour is not the only cue. Palette: six well-separated hues (for example blue, teal, orange, purple, rose, green) tuned in implementation.
8. **Section transitions with CSS and a small hook.** On step change the content wrapper is keyed by step and given `enter-forward` or `enter-backward` (direction from the step index delta), running a ≤350 ms translate and fade keyframe. An effect scrolls with `window.scrollTo({ top: 0, behavior })` (smooth unless `prefers-reduced-motion`) and focuses the new section heading (`tabIndex={-1}`, `preventScroll`). Under reduced motion the keyframe is disabled and scrolling is instant. A short lock (matching the animation duration, none under reduced motion) makes the navigation handler ignore a second request while a change is settling. Alternatives: an animation library or the View Transitions API (patchy support and unnecessary here).

## Risks / Trade-offs

- [About 300 definitions to write; quality and accuracy] → One or two plain sentences each, reviewed during implementation, with a coverage test to prevent gaps.
- [Right-click is not discoverable and unavailable on touch] → Instructions at the top, keyboard shortcuts and long-press alternatives.
- [Suppressing the browser context menu surprises some users] → Only on built-in words, and the instructions say why; custom words keep the normal menu.
- [Long-press and click interplay on touch] → The long-press handler suppresses the following click; covered by a test with simulated pointer events.
- [Section colours failing contrast, especially in dark mode] → Contrast test against the actual CSS values.
- [Animation making the app feel slow or causing motion sickness] → Short duration, direction-aware, fully disabled under reduced motion.
- [Wide layouts hurting readability on very large screens] → A 120rem ceiling and multi-column grids keep line lengths short.
