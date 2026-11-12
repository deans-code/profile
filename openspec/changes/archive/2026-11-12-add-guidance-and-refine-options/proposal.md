# Proposal

## Why

The app opens straight onto the values picker with no statement of what it is for, and the step bar looks like a row of tabs rather than a path to walk through. On skill pages the Previous/Desired switch appears with no explanation of why the profile asks for both. Separately, the word lists have grown long and some entries are obscure, duplicated in meaning, or off-topic, which dilutes the choices that matter while newer practices are missing.

## What Changes

- Add an introduction at the top of the app, above the steps, saying what the tool is for and how it works (pick values, then skills on four pages, then get a profile).
- Make the step bar read as a guided route: numbered steps, a "Step N of 6" indicator, completed steps marked, and a clear "next" direction.
- Add an intro line above the Previous/Desired switch on every skill page stating that the profile is built from previous experience and desired experience.
- Review every page's options. Remove weak entries (obscure, overlapping, vague or out of scope for a working profile) and add strong ones, across values, technical development, engineering, interpersonal and AI engineering.
- Keep each added/removed word consistent with its description, so every listed word has one.

## Capabilities

### New Capabilities
- `page-guidance`: the app introduction, the guided step indicator, and the per-page experience intro.

### Modified Capabilities
- `experience-modes`: the options on skill pages gain an intro explaining the two options.
- `profile-flow`: step navigation shows numbered position, completion and direction.
- `values-selection`: curated values list.
- `technical-skills-catalog`: curated technical development, engineering and interpersonal lists.
- `ai-engineering-section`: curated AI engineering list.

## Impact

- `src/App.tsx`, `src/components/WordPicker.tsx` / `ModeSwitch.tsx` / `SkillStep.tsx`, `src/styles.css`.
- `src/data/values.ts`, `src/data/skills.ts`, and the matching `src/data/definitions/*.ts`.
- Tests that assert the catalogs and step navigation. Saved profiles containing a removed word must still load.
- Out of scope: scoring, new steps, changes to export format, changes to selection limits.
