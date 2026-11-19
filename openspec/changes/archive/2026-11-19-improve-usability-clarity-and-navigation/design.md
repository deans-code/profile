# Design

## Context

The app is a single-page React + Vite app. `src/App.tsx` renders the header (title, load control, intro, `step-status`, `ol.stepper` of buttons) and a footer with Back and Continue. Step availability comes from `stepBlockedReason` in `src/state/profile.ts`, which also supplies message text. Styling is in `src/styles.css`, with per-section accent colours (`--accent`, `--tint`) for light and dark themes. The stepper currently renders small outlined pills and its completed marker is a CSS string that displays as a garbled glyph. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Bolder, clearer step navigation (badges, check marks, locked styling, progress bar, 44px targets).
- Clearer wording and presentation of every message, with the blocked reason as a prominent callout.
- Clearer visual hierarchy and contrast in both themes.
- Back/Continue always in reach and naming their destination.

**Non-Goals:**
- Changing step order, completion rules, limits, data, or the saved-profile format.
- A new layout paradigm (sidebar, router, wizard library) or new dependencies.
- Re-theming the section accent colours.
- A full accessibility audit beyond the items specified.

## Decisions

1. **Keep the existing structure, restyle and reword.** The `nav > ol.stepper > button` markup and `aria-current='step'` stay; changes are CSS plus small markup additions (a number badge element, a status label, a progress element). This keeps tests and keyboard behaviour stable. Alternative (rebuild as a sidebar) rejected: bigger change, and the request was for bolder, not different.
2. **Replace CSS-counter content with real elements.** The number badge and the check mark become real DOM (an `aria-hidden` badge, and a check element with visually hidden text "complete") instead of `::before`/`::after` generated content. This removes the broken glyph, keeps encoding concerns out of CSS, and gives assistive technology a text equivalent. Write the check as an inline SVG or a Unicode escape, and confirm the files are saved as UTF-8.
3. **Native progress element.** Use `<progress max="6" value="N">` (styled), where N is the count of complete steps; the Profile step counts only once it is the current step. Native element gives accessibility for free.
4. **Sticky footer.** `footer.nav` becomes `position: sticky; bottom: 0` with a surface background and top border so it stays in reach on long pages; add bottom padding to `main` so the last words are not hidden. Sticky (not fixed) keeps it inside the app container.
5. **Destination-named buttons from existing data.** Labels derive from `STEP_LABELS` for `prev` and `next`: "Back to X", "Continue to Y", and "Finish and view profile" when next is `card`.
6. **Message wording lives where it is generated.** Reword in `stepBlockedReason`, `SelectionStatus`, `LoadProfile` and `SelectionHelp`; do not add a message framework. Tests that assert exact strings are updated alongside. Messages follow one pattern: what happened, then what to do.
7. **Callout for the blocked reason.** Replace the small muted `p.blocked` with a bordered callout using full-contrast text plus a label ("Before you continue:"), kept as `role="status"`. `LoadProfile` messages get a leading text label per kind so they do not rely on colour alone.
8. **Intro and page lead.** The intro becomes a purpose sentence plus a three-item ordered list. Add a `lead` prop to `WordPicker` rendered under the `h2`; `ValuesStep` and `SkillStep` pass it.
9. **Contrast.** Raise `--muted` in both themes to at least 4.5:1 on `--bg` and `--surface`, and check each accent against its tint. Verify by calculation during implementation, not by eye.

## Risks / Trade-offs

- **Existing tests assert current strings and stepper text.** Mitigation: update expectations in the same task as each wording change; keep accessible names that tests query by role where possible.
- **Sticky footer on small screens can cover content or the on-screen keyboard.** Mitigation: bottom padding on `main`, compact footer padding at narrow widths, manual check at phone width.
- **Longer button labels may wrap on narrow screens.** Mitigation: allow wrapping and stack Back above Continue below a width breakpoint.
- **Progress counting ambiguity.** Decision: the Profile step is not counted until it is open, so the bar reaches 5 of 6 on the last skill page and fills when the Profile opens.
- **Wording is subjective.** Mitigation: the final strings are reviewed with the user before archive (task 3.4).
