# Proposal

## Why

All guidance, privacy, navigation, accessibility and load controls sit in a tall header above the content, pushing the actual work (choosing values and skills) down the page. A persistent side bar keeps the supporting material and navigation always at hand and lets the main panel be only the task.

## What Changes

- Introduce a two-panel layout: a side bar and a main panel.
- Side bar holds: the title and introduction (with the privacy line), "How this works", "Privacy", step navigation (status, progress, step buttons), Accessibility options and Load profile.
- Main panel holds everything else: the page heading and lead, the selection content, Back/Continue controls and Sources.
- On wide screens the side bar stays in view while the main panel scrolls; on narrow screens the side bar stacks above the main panel.
- The header block (introduction above navigation) is removed in favour of the side bar.

## Capabilities

### New Capabilities
- `app-layout`: Side bar plus main panel arrangement, what belongs in each, and how it adapts to narrow screens.

### Modified Capabilities
- `page-guidance`: Introduction and step navigation live in the side bar rather than a header; replaces the "visually separated header areas" requirement.
- `accessibility-options`: The Accessibility control is in the side bar rather than the page header.
- `privacy-statement`: The Privacy control is in the side bar rather than the header.

## Impact

- `src/App.tsx` (restructure header into aside + main), `src/styles.css` (layout, sticky side bar, vertical stepper, responsive rules).
- Component behavior (AccessibilityOptions, LoadProfile, steps, state) is unchanged.
- Existing tests that query the header or layout may need updates; no data, export or storage changes.
