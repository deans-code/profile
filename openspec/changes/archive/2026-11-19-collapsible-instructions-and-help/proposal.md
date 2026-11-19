# Proposal

## Why

Every page stacks a long header on top of the real work: the intro, a three-step "how it works" list, the step status, progress bar and step navigation all run together, then each page adds two more blocks of help text (the ChatGPT "Not sure?" box and the "Click a word…" instructions) before any words appear. The header reads as one undifferentiated block and pushes the selectable words down the page.

## What Changes

- Put the "how it works" instructions in the header behind a collapsible control (collapsed by default).
- Visually separate the intro (title, one-line purpose and the collapsible instructions) from the step navigation (status, progress bar and stepper), so they read as two distinct areas.
- On every selection page (values and the four skill pages), move the "Not sure which … fit you?" ChatGPT box and the "Click a word…" instructions into a single collapsible "Help" area, collapsed by default.
- Reword the add-your-own hint from "Not in the lists? Type it…" to "Want to add a value not here? …" (noun follows the page: "value" on values, "skill" on skill pages). It stays visible next to the add box.
- Applies to all tabs/pages.

## Capabilities

### New Capabilities

### Modified Capabilities
- `page-guidance`: the route instructions become collapsible; intro and step navigation are visually separated.
- `selection-instructions`: the selection instructions and the ChatGPT suggestion are grouped in a collapsible Help area; the add-your-own hint wording changes.

## Impact

- `src/App.tsx` (header), `src/components/WordPicker.tsx`, `SelectionHelp.tsx`, `AssistantLink.tsx`, `AddEntry.tsx`, `src/styles.css`.
- Tests that read the instructions, `AssistantLink` or the "Not in the lists" text: `src/App.test.tsx`, `src/add-entry.test.tsx`, `src/assistant.test.tsx`.
- No data, state or profile-format changes.
