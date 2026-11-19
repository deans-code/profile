# Proposal

## Why

The add-your-own form is pinned at the top of each selection page, but a new custom entry appears in the Custom card at the bottom of the list. The user presses Add and sees nothing change on screen, so they cannot tell the entry was added.

## What Changes

- When the user adds a new custom entry on any selection tab (values and each skills tab), the page scrolls to the Custom card so the new entry is visible, clear of the pinned bar.
- Scrolling is smooth, or instant when the user prefers reduced motion.
- If the active filter would hide the new entry, the filter is cleared so the entry is shown.
- No scroll happens when nothing new was added: empty text, a blocked add at the limit, or text that matches an existing built-in or custom entry (which is selected instead).
- Loading a profile or switching tabs does not trigger this scroll.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `values-selection`: adding a custom value reveals the Custom card.
- `skills-selection`: adding a custom skill reveals the Custom card on that skills tab.

## Impact

- `src/components/WordPicker.tsx` (shared by the values and skills pages) and possibly `src/components/AddEntry.tsx`; a small shared helper for the reduced-motion check may be reused from `src/useStepNavigation.ts`.
- `src/styles.css` (scroll margin on the Custom card so it clears the pinned bar).
- Component tests for the values and skills pages.
- No change to state, saved profile format or the catalog.
