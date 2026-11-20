## Context

`SelectionHelp.tsx` renders three paragraphs (click/right-click, optional "you are choosing" note, and a `help-alt` line starting "Mouse: right-click…"). `.help-block` in `src/styles.css` gives inner blocks a 1px border plus a 4px accent left bar on `var(--surface)`.

## Decisions

- **Wording:** line one becomes "**Right-click** a word to read its description."; the `help-alt` line becomes "**Keyboard:** focus a word and press ?  or Shift+F10. **Touch:** press and hold." The optional mode note is unchanged.
- **Inner block styling:** remove the border and accent bar from `.help-block`; keep the radius and padding. Choose a background that differs only subtly from the surrounding Help block (for example a slightly tinted/mixed `var(--surface)`), checked in light and dark themes. Text contrast stays at 4.5:1. The 3:1 boundary requirement applies to the outer Help block, not the inner blocks.
- Outer Help block styling is not changed.

## Risks

- Without a border, the subtle background must still be perceptible; verify visually in both themes and adjust the mix if not.
