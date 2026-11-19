# Design

## Context

Section colours come from `--accent`, `--accent-text` and `--tint` set per `[data-section]` for light, dark and system-dark themes in `styles.css`. The switch's selected button, chips, category cards, Add and bulk buttons all read these variables. `WordPicker` renders the tools row, status, broad-term note and category cards inside one `<section>` that also holds the heading, lead and Help. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Two option colours per section, derived from the section colour, shared by switch, cards and words.
- Contrast preserved in both themes.

**Non-Goals:**
- No change to the section colours, stepper, heading, Help or Sources.
- No user-chosen colours.

## Decisions

- **Scope element:** wrap the tools row, status line, broad-term note and category cards in `<div className="mode-scope" data-mode={mode}>` (only when `mode` is set). The heading, lead and Help stay in the section colour. The sticky tools row stays sticky inside the wrapper, because the wrapper spans to the end of the cards.
- **Override the existing variables inside the scope** instead of adding new ones, so every control that already uses `--accent`/`--tint` picks the colour up with no per-component edits. A custom property cannot refer to itself, so the scope first captures the inherited section value in new properties set on an ancestor-independent rule (`--mode-base-accent: var(--accent)`, `--mode-base-tint: var(--tint)`) and then redefines `--accent`/`--tint` from them, for example `--accent: oklch(from var(--mode-base-accent) l c calc(h - 15))` for previous and `+ 15` for desired. If a self-reference proves unavoidable, the section variables can be renamed to `--section-accent`/`--section-tint` and `--accent`/`--tint` defined from them everywhere.
- **Rotate hue, keep lightness and chroma** (OKLCH). Contrast depends mainly on lightness, so AA contrast for text and boundaries is preserved by construction; `--tint` is shifted the same way. ±15° is a starting point to be tuned by eye ("slightly").
- **Fallback:** browsers without relative colour syntax ignore the declarations inside `@supports (color: oklch(from red l c h))`, so they keep the section colour, which is still correct.
- **Previous is −15°, desired +15°**, so neither equals the section colour exactly but both remain neighbours of it; the alternative of leaving previous at the section colour was rejected because the user asked for both to differ.

## Risks / Trade-offs

- [Hue shift of 15° may be too subtle, or too strong for some sections (for example technical teal vs blue)] → Tune the angle in the browser; keep it one CSS variable.
- [Contrast not exactly preserved because hue affects relative luminance] → Check selected chip, switch button and card border in both themes at both options with a contrast checker before finishing.
- [Sticky tools row behaves differently inside a new wrapper] → Verify pinning while scrolling in the browser.
- [Old browsers without relative colour] → Fallback to section colour, no loss of function.
