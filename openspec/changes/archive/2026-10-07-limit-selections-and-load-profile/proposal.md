# Proposal

## Why

Users can currently select unlimited words, which produces long, unfocused profiles and very long scoring pages. A cap encourages choosing what matters most. Users also cannot return to a profile they have already downloaded; they must start again to change anything. Finally, a review of the controls that open definitions found faults that make them unreliable in some situations.

## What Changes

- Limit selection to 10 words on each page: 10 values, and 10 skills in each of the technical development, engineering and interpersonal sections. Custom entries count toward the limit. Show a "n of 10" count, and when the limit is reached explain it and stop further selection (deselecting frees a slot).
- Add a **Load saved profile** control that reads a previously downloaded JSON file, replaces the current profile with it, and lands on the profile card, from which the user can edit with the existing Edit action. Invalid files are rejected with a clear message and change nothing.
- Fix the faults found in the definition controls (audit findings, below) and cover them with tests.

Audit findings in the definition controls, each to be fixed:
- A touch long-press that does not end in a click leaves a stale "suppress next click" flag, so the next mouse or touch selection is silently swallowed.
- The open definition panel is dismissed by any `resize` event, which mobile browsers fire when the address bar shows or hides, so it can close immediately after a long-press.
- The panel stays open, anchored to a word that is no longer on screen, when the section changes while it is open (for example by keyboard).
- The panel is not programmatically associated with the word it describes, and words give no hint that a definition is available.

## Capabilities

### New Capabilities
- `selection-limits`: The maximum of 10 selections per page, its feedback and its enforcement.
- `profile-loading`: Loading a saved JSON profile, its validation, replacement of the current profile, and handling of over-limit files.
- `definition-controls`: Reliable behavior of the controls that open and close definitions, correcting the faults above.

### Modified Capabilities
<!-- None. The earlier changes (build-profile-builder, refine-profile-ui) are not yet archived into openspec/specs, so nothing can be modified yet; see design.md for how this change relates to them. -->

## Impact

- Affects the profile reducer and gating (`src/state/profile.ts`), the values and skill steps, `TermButton`, `DefinitionPanel`, the app shell and the profile export module (a new loader that is the inverse of `toJson`).
- Adds one new UI control and a file-reading path; the file is read in the browser only, nothing is uploaded.
- No new runtime dependencies expected.
- Out of scope: loading Markdown files, a visible info button for definitions, definitions on the scoring and card pages, automatic saving, loading from a URL.
- Assumptions:
  - "Page" means each selection step (values and the three skill sections); the scoring and card pages have no selection of their own.
  - A loaded profile that exceeds a limit (for example one downloaded before this change, or edited by hand) is loaded in full rather than truncated, and the user must deselect down to the limit before continuing from that page.
  - Loading replaces the current profile after confirmation if there is unsaved progress.
