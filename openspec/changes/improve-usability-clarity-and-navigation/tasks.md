## 1. Step navigation

- [ ] 1.1 In `src/App.tsx`, render each stepper button with a number badge element, the step name, and a check element with visually hidden "complete" text for completed steps; remove the `::before`/`::after` counter rules and the garbled check glyph from `src/styles.css`
- [ ] 1.2 Style the stepper: min 44px targets, dominant current step, locked look for blocked steps (lock indicator, existing reason still available), in light and dark themes
- [ ] 1.3 Add a progress bar under the stepper exposing complete-of-six to assistive technology, with the Profile step counted only when open
- [ ] 1.4 Save `styles.css` as UTF-8 and confirm the check mark renders with no garbled glyph

## 2. Footer navigation

- [ ] 2.1 Label Back/Continue by destination ("Back to Values", "Continue to Engineering", "Finish and view profile")
- [ ] 2.2 Make `footer.nav` sticky with a surface background, add bottom padding to `main`, and stack the buttons at narrow widths
- [ ] 2.3 Replace the muted `p.blocked` with a prominent callout beside Continue, keeping `role="status"`

## 3. Messages

- [ ] 3.1 Reword `stepBlockedReason` in `src/state/profile.ts` to the "what happened, then what to do" pattern, keeping the same blocking logic
- [ ] 3.2 Reword `SelectionStatus` and `SelectionHelp` (count, limit reached, over limit with the exact fix)
- [ ] 3.3 Reword `LoadProfile` success, error, cancel and replace-confirm messages, adding a text label per kind (Loaded / Could not load / Cancelled) so colour is not the only signal
- [ ] 3.4 Review the final wording list with the user before archive

## 4. Header, page lead and visual design

- [ ] 4.1 Replace the intro paragraph in `src/App.tsx` with a purpose sentence and a three-item "how it works" list
- [ ] 4.2 Add a `lead` prop to `src/components/WordPicker.tsx` rendered under the heading; pass leads from `ValuesStep` and `SkillStep`
- [ ] 4.3 Strengthen type hierarchy and spacing in `src/styles.css`; give primary buttons a style distinct from secondary controls
- [ ] 4.4 Raise `--muted` and check accent-on-tint contrast to at least 4.5:1 in both themes, verified by calculation

## 5. Tests and verification

- [ ] 5.1 Update string and stepper assertions in `src/guidance.test.tsx`, `src/limits.test.tsx`, `src/load-ui.test.tsx`, `src/App.test.tsx`, `src/transitions.test.tsx` and any other test broken by the new wording
- [ ] 5.2 Add tests: step badges and check mark with accessible text, progress value, destination-named buttons, callout `role=status`, page leads, load message labels
- [ ] 5.3 Run the full test suite and a production build
- [ ] 5.4 Run the app and check desktop and phone widths in light and dark themes, including a long page with the sticky footer
