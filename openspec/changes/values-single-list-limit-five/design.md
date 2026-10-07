# Design

## Context

After `ai-engineering-tab-and-experience-modes` (implemented, not archived, so `openspec/specs/` is empty): `ProfileState` has `mode` (shared across pages), `selectedValues: PerMode<string[]>` and per-mode skills; `MAX_SELECTION = 20` applies per mode through `limitFor`/`overBy`/`isFull`; `WordPicker` always renders `ModeSwitch`; `Profile.values` is an `Experience` object; `parseExperience` reads values like skills; `loadProfile` already resets `mode`. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Values are a single list with limit 5, with no mode concept at all.
- `mode` can only mean "which skill list the page edits", and resets whenever the page changes.
- Old and intermediate files still load.

**Non-Goals:**
- Changing skill state, skill limits or the switch component.

## Decisions

1. **Values become `string[]` in state.** `selectedValues: string[]`, so values cannot hold a "desired" selection by construction, rather than hiding the switch over unused state. Actions `toggleValue`, `addCustomValue` and `removeCustomValue` no longer read `mode`. `selectedFor`, `selectionCount`, `overBy`, `pageComplete` and `isFull` branch on `page === 'values'` to ignore the mode argument. Alternative: keep per-mode values and just hide the switch, rejected because a stale hidden desired list could block navigation or leak into exports.
2. **Limit constant.** `MAX_SELECTION = 5`; `LIMITS.values` unchanged in shape. `stepBlockedReason` and `firstOver` no longer loop modes for values (still loop for any future limited skill page), and the message drops "under {mode}" for values: "Deselect N words on the values page to continue (limit 5)." Superseded wording from the earlier change's spec: "limit of 20 per option", "under Previous experience".
3. **Reset on navigation.** The reducer handles it, so every route is covered: `goTo` sets `mode: 'experience'`, and `loadProfile` already does. The Edit button and the stepper both use `goTo`. Selecting an option still dispatches `setMode`. This replaces the "Option carries between pages" requirement of the earlier change. Alternative: key the picker by step and keep mode in component state, rejected because the footer counts and instructions would need the same state, and `useStepNavigation` already routes through `goTo`.
4. **Values page UI.** `WordPicker` takes `mode`, `counts` and `onModeChange` as optional; when omitted the switch is not rendered and `SelectionHelp` omits the option line (`mode` optional). `ValuesStep` passes none. `SelectionHelp`'s limit line for values becomes "Select up to 5 values." (the "for each option" suffix applies only when a mode is present, which for the limit is never now, so it is removed).
5. **Profile and export.** `Profile.values: string[]` (sorted); `buildProfile` copies and sorts; `toJson` writes the array; `toMarkdown` writes values as a plain list under "## Values"; `ProfileCard` renders values as a single chip list. Skills are untouched.
6. **Loading.** `parseProfile` reads `values` with a new `parseValues`: an array of strings is used as is; an object with `experience`/`desired` merges both lists in that order and removes duplicates ignoring case; the existing limits (100 entries per list, 100 characters, 1 MB) still apply to each list before merging. `profileToState` produces `selectedValues: string[]`, with unknown names as custom values. `LoadedProfile` changes accordingly. `loadLanding` and the reducer already open the values page when over the limit.
7. **Superseded requirements** (reconcile on archive): from `experience-modes`, "Two experience options on every selection page" (not the values page), "Option carries between pages" (now resets), "Values limit applies per option" (now 5, single list), and the values part of "Instructions describe the options"; from `profile-export`, JSON/Markdown values shape; from `profile-flow`, "Profile card shows both options" for values; from `profile-loading`, the values part of "Load new-format profiles". This change's specs state the final behavior.

## Risks / Trade-offs

- [Users with files holding more than 5 values are blocked until they trim] → The values page opens with a precise message; nothing is discarded on load.
- [Merging desired values into values may surprise] → Documented in the README and covered by a test; the alternative of dropping them loses data.
- [State type change touches many tests] → Type-checking finds every use; tests are updated in the same task group as the code.
- [Resetting mode in `goTo` makes typing flows like "choose Desired, press Continue" start fresh] → That is the requested behavior; selections are kept and counts shown.
