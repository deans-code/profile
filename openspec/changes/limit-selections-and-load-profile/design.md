# Design

## Context

Builds on the app as it stands after `build-profile-builder` and `refine-profile-ui` (both implemented and committed, neither archived, so `openspec/specs/` is still empty and this change adds capabilities rather than modifying them). State lives in one reducer (`src/state/profile.ts`) with gating in `stepBlockedReason`; words are `TermButton`s; one `DefinitionPanel` is shared; export is the pure `toJson`/`toMarkdown` in `src/export.ts`. See proposal.md for the audit findings in the definition controls, which were confirmed by reading `TermButton.tsx` and `DefinitionPanel.tsx`.

## Goals / Non-Goals

**Goals:**
- Enforce the limit in the reducer so no UI path can exceed it.
- A loader that is the exact inverse of `toJson`, validated strictly and applied atomically.
- Definition controls that are correct on mouse, keyboard and touch.

**Non-Goals:**
- Markdown loading, an info button, definitions on scoring/card pages, autosave.

## Decisions

1. **Limit enforced in the reducer.** `MAX_SELECTION = 10` in `profile.ts`. `toggleValue`, `toggleSkill`, `addCustomValue` and `addCustomSkill` become no-ops when they would select an 11th word (including selecting an existing match for a duplicate custom entry). Deselecting is always allowed. Helpers `selectionCount(state, page)` and `overBy(state, page)` feed the UI. The reducer is the single source of truth; the UI only mirrors it. Alternative: UI-only disabling, rejected because loaded or future code paths could bypass it.
2. **Gating rule for over-limit pages.** A step is blocked when any selection page earlier in `STEPS` than the target is over its limit (moving back is never blocked). The message names the page and how many words to deselect. This reuses the existing `stepBlockedReason` and stepper/Continue behavior with no special cases.
3. **Limit feedback.** A small `SelectionStatus` component shows "n of 10 selected" (polite live region) and, at the limit, a message "Limit reached: deselect a word to choose another". Unselected words get `aria-disabled="true"` and a dimmed style rather than `disabled`, so they stay focusable and still open definitions. The Add button is disabled at the limit while keeping the typed text. Over the limit, the count reads "12 of 10 selected" and the message says how many to remove.
4. **Loader as a pure module** (`src/load.ts`) with `parseProfile(text): { ok: true; profile } | { ok: false; error }`, the inverse of `toJson`. It checks size (≤ 1 MB, tested before parsing), JSON validity, the shape (`values: string[]`, `skills.{technical,engineering,interpersonal}: {name: string, score: integer 1–10}[]`), at most 100 entries per list and names of at most 100 characters, trims names and removes case-insensitive duplicates, and ignores unknown properties and `exportedAt`. Errors are specific (for example, which skill has the bad score). A second function maps the parsed profile onto state: names matching a built-in (normalized) use the built-in's canonical spelling, others become custom entries; scores equal to the default are not stored. Alternatives: a schema library (extra dependency for one small shape) and loading Markdown (lossy and out of scope).
5. **Atomic load via a `loadProfile` reducer action** that replaces selections, custom entries and scores and sets the landing step. Landing: the profile card if every gate passes; otherwise the first page needing attention (empty or over its limit), with a message. Nothing changes unless parsing succeeded.
6. **Load control in the app header** (`LoadProfile` component) so it is available on every page: a button that opens a hidden `<input type="file" accept=".json,application/json">`; the input value is cleared after each pick so the same file can be chosen again. The file is read with `FileReader` (local only). A live region announces success (with file name) or the error. If the user has any selection, a successful parse leads to an inline "Replace your current profile?" confirmation with Replace and Cancel (inline, not `window.confirm`, for consistent styling and testability); with no selections the load applies immediately. Navigation uses the existing `useStepNavigation` so loading gets the same scroll and animation.
7. **Definition control fixes.**
   - `TermButton`: clear the long-press flag on any new `pointerdown` and shortly after `pointerup`/`pointercancel`, so only the click belonging to the press is suppressed.
   - `DefinitionPanel`: stop closing on `resize`. Instead recompute the position on `scroll`, `resize` and `visualViewport` resize, and close when the anchor is fully off screen. Close when the anchor leaves the document (a `MutationObserver` on the body while the panel is open) and when the provider's `resetKey` (the current step) changes. Section change by keyboard, filter-hidden words and removed custom words are all covered by these.
   - Accessibility: words with a definition get `aria-haspopup="dialog"`; while open, the word gets `aria-describedby` pointing at the panel's fixed id.
   - Instructions: a test per described control (right-click, `?`, context-menu key, Shift+F10, long-press) so the instructions cannot drift from behavior.
8. **Relationship to earlier changes.** `definition-controls` overlaps `term-definitions` from `refine-profile-ui`. Archiving the earlier changes first would let these become modifications; until then they stand alone and are consistent with the existing specs.

## Risks / Trade-offs

- [Limit surprises users, especially with loaded or older files] → Over-limit files load in full, and the page explains how many to deselect; no data is silently dropped.
- [A hostile or huge file] → Size, entry-count and name-length caps, strict validation, local-only processing, and names rendered as text only (React escaping).
- [Replacing the current profile by accident] → Inline confirmation when progress exists.
- [File input is awkward to test and use with assistive technology] → A real labelled button plus live region; tests use `userEvent.upload`.
- [Repositioning logic adds complexity] → Kept to one `reposition` function used by every trigger, with tests for viewport changes and removal.
- [Scoring page gets long with up to 30 sliders] → Existing multi-column layout handles it; no change needed.
