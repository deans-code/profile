## Why

On the skill pages the Previous experience / Desired experience switch sits near the top, and the pages are long. Once the user scrolls into the catalog the switch is out of sight, so they can forget there are two lists to fill in. The switch should travel with them, on desktop and on mobile.

## What Changes

- The experience option switch (with both counts) becomes sticky: it stays at the top of the viewport while the user scrolls the skill page, and returns to its normal place at the top of the page.
- It stays readable and usable on narrow screens: full width, two equal touch-sized options, no more than one or two lines tall, so it does not cover much of the page.
- It does not hide focused words, the description panel or the footer navigation: focused content scrolls clear of it and the description panel stays above it.
- No change to what the options do, their counts, keyboard behaviour (arrow keys) or the values page, which has no options.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `experience-modes`: the options stay visible while the skill page is scrolled, on desktop and mobile.

## Impact

- `src/components/ModeSwitch.tsx` (wrapper element), `src/components/WordPicker.tsx` (placement), `src/styles.css` (sticky bar, mobile layout, scroll padding).
- Tests for the structure; sticky positioning itself cannot be measured in jsdom, so it is verified in a browser at desktop and phone widths.
- README: a line under the experience options description.

## Assumptions

- "Sticky" means pinned to the top of the viewport (the footer navigation already pins to the bottom).
- The existing count labels, e.g. "Previous experience (3)", are enough to show both need completing; no new warning text is added. Say so if you want an extra "still to do" cue on an empty option.
