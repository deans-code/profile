# Tasks

## 1. Guidance UI

- [x] 1.1 Add the introduction above the stepper in `src/App.tsx` and style it in `src/styles.css`
- [x] 1.2 Number the steps, add the "Step N of 6" status, completed markers and a "Next: X" hint
- [x] 1.3 Add the experience intro above `ModeSwitch` in `WordPicker` (skill pages only)
- [x] 1.4 Update `SelectionHelp` wording if it now duplicates the intro

## 2. Curate values

- [x] 2.1 Remove the weak values listed in the values-selection spec from `src/data/values.ts` and their descriptions
- [x] 2.2 Add the new values with descriptions in suitable categories

## 3. Curate skills

- [x] 3.1 Technical: remove and add per the technical-skills-catalog spec, with descriptions
- [x] 3.2 Engineering and interpersonal: same, per the spec
- [x] 3.3 AI engineering: same, per the ai-engineering-section spec
- [x] 3.4 Confirm no word is shared between pages and every word has a description

## 4. Saved profiles and tests

- [x] 4.1 Verify loading a profile with a removed word keeps it as a custom entry; fix `src/load.ts` if not
- [x] 4.2 Update tests naming removed words; add tests for the intro, step indicator and experience intro
- [x] 4.3 Run the full test suite, type check and build
