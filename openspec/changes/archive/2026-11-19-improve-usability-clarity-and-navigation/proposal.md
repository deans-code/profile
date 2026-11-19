## Why

The app works but asks first-time users to decode it: the step navigation is a row of small, outlined pills that look like secondary buttons, blocked-step reasons are tiny muted text beside the Continue button, the introduction is one dense paragraph, and the "completed" tick in the stepper renders as a garbled character (`¹3`) because of a broken glyph in `styles.css`. Users cannot easily tell where they are, what to do next, or why they are stuck.

## What Changes

- Make the step navigation bolder and clearer: larger touch targets, a visible numbered badge per step, a clear "current" treatment, a real check mark for completed steps (replacing the broken glyph), an explicit "locked" look for unavailable steps, and a connecting progress bar showing how far along the route the user is.
- Make the page header clearer: replace the single dense intro paragraph with a short purpose line plus a three-part "how it works" summary, and give each step page a one-line "what to do on this page" lead under its heading.
- Make messages clearer and more actionable: rewrite blocked-step, over-limit, load-success, load-error and load-cancel messages in plain language that says what happened and what to do next; show the blocked reason as a prominent callout beside the footer controls (not tiny muted text) and say what the Continue button will do ("Continue to Engineering", "Finish and view profile").
- Make the visual design clearer: stronger type hierarchy (heading, lead, hint), higher-contrast text for secondary copy, more spacing between sections, and a distinct primary button style versus secondary controls, in both light and dark themes.
- Make Back/Continue more prominent: a sticky footer bar that stays visible on long pages so navigation is always in reach.
- No change to step order, completion rules, selection limits, data, or the saved-profile format.

## Capabilities

### New Capabilities
- `user-messages`: Plain-language wording and presentation rules for every user-facing status, blocked, limit and load message.

### Modified Capabilities
- `page-guidance`: Introduction becomes purpose line plus "how it works" summary; add a one-line page lead on every step page; step indicator gains badges, check marks, locked styling and a progress bar.
- `profile-flow`: Footer navigation names its destination, stays visible (sticky), and presents the blocked reason as a prominent callout.

## Impact

- Code: `src/App.tsx` (header, stepper, footer), `src/components/SelectionStatus.tsx`, `src/components/SelectionHelp.tsx`, `src/components/LoadProfile.tsx`, `src/components/ValuesStep.tsx`, `src/components/SkillStep.tsx`, `src/components/WordPicker.tsx` (page lead), `src/state/profile.ts` (message wording only), `src/styles.css` (stepper, footer, typography, contrast, both themes).
- Tests: `src/guidance.test.tsx`, `src/limits.test.tsx`, `src/load-ui.test.tsx`, `src/App.test.tsx` and any test asserting current message text need updated expectations; new tests for the step badges, check mark, sticky footer destination label and message wording.
- No new dependencies, no data or export format changes, and no conflict with the in-progress `move-deployment-to-cloudflare-pages` change (deployment files only).
- Assumption: "bolder" navigation means more visually prominent, not a different layout paradigm (no sidebar or router); the single-page step flow is kept.
