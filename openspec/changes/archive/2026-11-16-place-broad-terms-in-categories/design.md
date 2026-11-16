# Design

## Context

`WordPicker` currently takes `broadTerms` and renders them as a first card headed "Broader terms", styled with `.chip.broad` (purple tint background and purple border). `.chip[aria-pressed='true']` uses the section tint and a 2px accent border, and `.chip.broad[aria-pressed='true']` overrides it back to the same purple tint, so selected and unselected broader terms look alike and both resemble selected ordinary chips.

## Decisions

**Placement by majority category.** `broad-terms.ts` gains `broadTermCategory(section, term)`: the catalog category containing the most of `term.covers`, ties to the first category in catalog order. Measured against the current data, every term resolves to one clear category (CI/CD covers 14 options, all in "Containers, infrastructure and delivery"; "Infrastructure automation tools" splits 2 to 1; "Architectural styles" 4 to 2; "Resilience patterns" 4 in Microservice and integration patterns against 2 and 1 elsewhere). *Alternative:* an explicit `category` field on each term. Rejected: it is another string per term to keep in step with the catalog, when the covers already say where a term belongs. The data test asserts the computed category exists and that no term has a tie, so a catalog change that makes placement ambiguous fails loudly.

**Rendering.** `SkillStep` builds each category's word list as its broader terms first, then its options, and passes the set of broader names so `WordPicker` can style them. The separate `broadTerms` card, its heading constant and its caption are removed. The filter, the counts ("Showing x of y") and the Custom card work on the merged lists as before. A broader term never appears in two places.

**Distinct from selected.** Selected is defined by the existing `.chip[aria-pressed='true']` (accent border, tint, check mark) and broader terms inherit it unchanged, so a selected broader term looks like any selected option. Unselected broader terms keep the normal surface background and get a dashed 1px border in `--broad` plus a small "Broad" label after the text. The label is visible text, so the cue is not colour-only; it is `aria-hidden` so the accessible name stays the term itself. The purple tint background and the selected-state overrides are dropped. Hover keeps the accent border.

**Explanation.** One line under the filter hint on skills pages: "Options with a dashed border are broader terms. Choosing one does not choose the options it covers." Shown only where the page has broader terms.

**Colour tokens.** `--broad` stays (light `#a21caf`, dark `#e879f9`); `--broad-tint` is no longer used and is removed. The dashed border against the chip background must reach 3:1 and the label 4.5:1 in light, dark and each accessibility option; the existing contrast test is extended. `--broad` must differ from every section accent and from the selected tint and accent colours.

## Risks / Trade-offs

- [A term sits in the category holding only most of its covers] → Intentional; its definition still lists everything it covers.
- [A dashed border is subtle at small sizes] → The "Broad" label and the page note carry the meaning; the border reinforces it.
- [Longer chip text wraps onto more lines] → The grid already wraps text; check at narrow widths in the browser.
