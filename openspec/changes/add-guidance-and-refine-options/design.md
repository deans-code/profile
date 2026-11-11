# Design

## Context

`App.tsx` renders the header (title, load button, `ol.stepper` of buttons) and the active step; `WordPicker` hosts `ModeSwitch` and `SelectionHelp`. Words live in `data/values.ts` and `data/skills.ts`, with descriptions in `data/definitions/*.ts`. Data tests require unique words, no word shared between pages, and a description per word. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:** a visible purpose and route; a stepper that shows position and completion; an experience intro above the mode switch; curated lists.
**Non-Goals:** new steps, scoring, export changes, changing limits, restyling the app.

## Decisions

- **Introduction in the header area, always visible.** A short paragraph under the title and above the stepper. A dismissible first-run banner was rejected: it needs persistence and hides the purpose on return.
- **Stepper stays a nav list of buttons.** Add step numbers, a `Step N of 6: Name` status line, a completed marker (derived from the existing selection and `stepBlockedReason` logic, not new state) and a "Next: X" hint near Continue. Keeps existing keyboard and `aria-current="step"` behaviour.
- **Experience intro lives in `WordPicker` above `ModeSwitch`,** rendered only when a mode is present, so the values page is unaffected.
- **Curation is recorded as explicit lists in the specs,** so apply and tests are concrete. Each removal deletes the word and its description; each addition needs a description. Words stay unique across pages.
- **Old saved profiles:** words no longer built in should load as custom entries via the existing custom-entry path in `load.ts`. Verify this during apply rather than assume.

## Risks / Trade-offs

- Removing words may break tests that name them; update those tests.
- "Weak" is a judgement; the lists are proposals and can be edited at review before apply.
- Completed markers only mean "has a selection", matching the existing completion rule.
