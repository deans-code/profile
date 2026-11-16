# Proposal

## Why

The skill lists are long (the technical tab alone has about 300 options). Someone who knows "CI/CD" but not which tools implement it must hunt through many tool names. Broader terms such as CI/CD, Containerisation or Observability let a user say what they know at the level they know it, with the specific tools still available.

## What Changes

- Each of the four skill sections (technical, engineering, interpersonal, AI engineering) gets a **Broader terms** card at the top of its list, holding broader options that cover groups of the existing options (for example "CI/CD" covering Jenkins, GitHub Actions and GitLab CI/CD).
- Broader terms are ordinary selectable options: they work with previous and desired experience, the filter, definitions, the profile export and loading. Selecting one does not select the options it covers, and the covered individual options stay in their existing category cards below, unchanged.
- Each broader term has a definition, and its definition lists the individual options it covers.
- Broader terms are shown in a different colour from other options, with a visible card heading as well, so colour is not the only cue. The colour meets contrast requirements in light, dark and the accessibility options.
- Each section offers at least 8 broader terms (an initial set is listed in design.md); each covers at least 3 existing options.
- Saved profiles keep loading; a saved name that matches a broader term loads as that built-in option.

## Capabilities

### New Capabilities

- `broad-term-options`: broader selectable terms shown at the top of each skills section in a distinct colour, each tied to the existing options it covers.

### Modified Capabilities

None. (Skill selection, filtering, definitions and export behave as before for these options; the new capability states what is specific to them.)

## Impact

- `src/data/catalog/{technical,engineering,interpersonal,ai}/` (a broader-terms data file per section) and `src/data/skills.ts` (exposing them).
- `src/data/definitions/*.ts` (definitions for each broader term).
- `src/components/WordPicker.tsx`, `SkillStep.tsx`, `TermButton.tsx` (the card and the chip style), `src/styles.css` (colour tokens, including dark mode and accessibility options).
- `src/load.ts`, state and export code only if they check names against the catalog.
- Tests: data, load, UI and accessibility (contrast).
- Broader terms are the app's own groupings, not drawn from a published list, so they carry no source citation and do not affect the Sources section. README gets a short note.
