## Context

`WordPicker` renders category cards, each with broader-term groups and loose options. Selection state lives in `profile.ts` (`selectedValues`, `selectedSkills[section][mode]`). `BROAD_TERMS[kind]` lists each term's `covers`. Today the reducers just toggle one name.

## Goals / Non-Goals

**Goals:** make a term and the options it covers mutually exclusive; make groups look clearly bounded; let each category card collapse.
**Non-Goals:** changing the catalog, limits, export format, or how saved profiles load.

## Decisions

1. **Exclusivity lives in the reducer**, not the UI, so it holds for every path (click, keyboard, adding a custom entry that matches a built-in). Helpers `coveredBy(kind, term)` and `termsCovering(kind, option)` come from `broad-terms.ts`.
   - Selecting a term removes all names in its `covers` from the current mode's selection.
   - Selecting an option removes every broader term that covers it.
   - Deselecting only removes that name.
2. **"Related" means the term's full `covers` list**, including covered options shown in other categories, so the profile never holds a term and something it stands for. Alternative considered: only the options shown in the same group; rejected because an option shown elsewhere would still duplicate the term.
3. **Limit handling:** the full-limit check stays first, so a new selection at the limit is still blocked even though it would remove others. Simple and predictable; revisit if it feels wrong.
4. **Mode scoping:** removal affects only the current mode (previous or desired), matching how selection works today.
5. **Solid styling:** `.broad-group` and `.chip.broad` change from `1px dashed` to solid; the group gets a thicker (2px) border in `--broad` so it stays at least 3:1. The term chip is told apart from the selected state by its label and border colour, since selected already uses `--accent` and a checkmark. The caption and "Broad" label remain as non-colour cues.
6. **Collapse:** each card heading becomes a `<button aria-expanded aria-controls>` inside the `<h3>`, toggling a content region. State is local `useState` keyed by category, default all expanded, not persisted. While a filter query is non-empty all matching cards render expanded (their stored state is kept and restored when the filter clears). Collapsed headers show "N selected" when N > 0. Adding a custom entry already scrolls to the Custom card; it must also expand it.
7. Collapsed content is not rendered (or is `hidden`), so hidden chips are not focusable.

## Risks / Trade-offs

- Existing tests assert independence of terms and options and must be rewritten. Mitigation: update the spec and tests together.
- Users may be surprised that picking a term clears options they already chose. Mitigation: the page note says so.
- Collapsed cards hide selections. Mitigation: the selected count in the header, plus the existing profile preview.

## Open Questions

None blocking. Assumed: cards start expanded and collapse state is not remembered between pages.
