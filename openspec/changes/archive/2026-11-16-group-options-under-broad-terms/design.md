# Design

## Context

`categoriesWithBroadTerms(kind)` returns each category's words as its broader terms followed by its options, and `WordPicker` renders one flat `ul.chips` per card, marking names in the `broadTerms` set with a dashed border and a "Broad" label. Measured against the current data: 196 terms; 125 options are covered by more than one term in their category (overlap is deliberate); 7 covered options live outside their term's category; 7 terms would head fewer than two options once each option is shown once.

## Decisions

**Each option is shown once, under its most specific term.** Duplicating an option under every term covering it would show one name in several places, break name-based lookups in the UI and tests, and make selection look like several separate choices. For an option in a category, the owning term is the term placed in that category that covers it with the shortest `covers` list; ties go to the term listed first. Options with no owner are "other options". *Alternative:* first listed term wins. Rejected: it lets a broad umbrella steal options from a precise sibling. *Alternative:* show duplicates. Rejected as above.

**Grouping lives in data code, rendering stays dumb.** A new `groupedCategories(kind)` in `src/data/skills.ts` returns, per category, `{ category, groups: { term, options }[], others: string[] }`. `categoriesWithBroadTerms` stays for the flat lists used by counts, filter and tests. `WordPicker` gets a `groups` structure per category instead of the flat `broadTerms` name set (the flat set is still derived for styling).

**Markup and look.** In a card, each group is a `div role="group"` labelled by its term chip's text, with the term chip first, a one-line caption "Groups these:" (visible text, so the relationship is not colour-only), then the options as chips in the same grid. The group has a dashed left and top border in `--broad` with a little padding so it reads as one unit. Options keep the normal chip look. If a card has groups and also leftover options, the leftovers sit below under a muted "Other options" line; if it has no groups (none today after the minimum rule, but Custom and future cases), no heading is shown. The existing dashed chip and "Broad" label stay on the term.

**Filter.** A group shows when its term or any of its options match; inside it, only matching options show, and the term chip always shows with a matching group so the grouping stays visible (a muted look is not needed). The "Showing x of y" count keeps counting words that match by name, so a group header shown only for context is not counted. A card hides when no word in it matches.

**Selection and limits unchanged.** Term and options are independent selectable words with the same keyboard, definition and long-press behaviour; counts and the values limit are as before.

**Data adjustment for thin groups.** Add a data test: each broader term heads at least two options (shown once, in its own category). Fix the seven failures found by dropping or reworking terms that only repeat their siblings: the Belbin umbrella term (its three role groups own all nine options), and widening or retitling the others (NoSQL databases, Unit testing frameworks, Identity providers and SSO, Code quality and refactoring, Application security practices, Coding agent tools) so they keep at least two options of their own, for example by trimming overlap from the more specific sibling. Exact edits are made at apply time against the real lists.

**Note text.** "Each dashed option is a broader term. It heads the group of options below it, and choosing it does not choose them." Shown on the values page and the skills pages as now.

**Covered options in other categories.** Not moved; the group shows only options of the same card. The definition keeps naming all covered options.

## Risks / Trade-offs

- [An option sits under one term although several cover it] → The definition of each term still names all it covers; the placement rule is deterministic and tested.
- [Groups make cards taller] → Same number of chips, a little extra padding and one caption line per group; checked at narrow widths.
- [Filtering shows a term chip that does not itself match] → Intentional so the group stays readable; it is not counted in "Showing x of y".
- [Reworking thin terms drops a grouping someone liked] → Only seven terms are affected and each reworked grouping keeps its options reachable.
