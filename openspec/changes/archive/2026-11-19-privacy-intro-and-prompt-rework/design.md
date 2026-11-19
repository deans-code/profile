## Context

- The header (after `collapsible-instructions-and-help`) has an intro block with a purpose line and a collapsed "How this works" `<details>`.
- State is a `useReducer` in `App.tsx`; the only persistence is `localStorage` for theme and text size (`src/preferences.ts`, plus an inline script in `index.html`). No `fetch`, XHR, cookies or third-party assets exist in `src/` or `index.html`; deployment is Cloudflare Pages (`.github/workflows/deploy.yml`).
- `ProfileCard.tsx` offers Download JSON, Download Markdown and Edit; `export.ts` has `toMarkdown` and `escapeMarkdown`.
- `src/data/assistant.ts` holds the prompts; `AssistantLink.tsx` holds the text around the link.
- Cards are dealt into columns by `useColumnCount` in `WordPicker.tsx` using a `ResizeObserver` on `.categories`. The same component renders both values and skills, so the full-width values page is a measurement/timing problem, not a separate layout.

## Goals / Non-Goals

**Goals:** tell users truthfully how their data is handled; mention learning and ambition in the purpose line; make the ChatGPT helper an interview; drop Markdown; fix the values layout.
**Non-Goals:** adding any storage, analytics or network behavior; changing JSON format or loading; a cookie banner (no cookies are set, so none is needed).

## Decisions

- **Honest wording over the literal ask.** The request says "no data is collected, no cookies", which the audit supports for the app itself. The statement also names what it cannot promise: host server logs, links that leave the app, and `localStorage` for theme and text size (not a cookie, never holds profile content). Short visible line: "Runs entirely in your browser. Nothing you choose is collected or sent anywhere, and no cookies are used." Fuller text sits behind a "Privacy" `<details>` next to "How this works".
- **Purpose line:** "Build a personal profile of what you value, what you can do, what you want to learn and where you want to grow." Wording can be tuned during apply; the spec only requires the four ideas.
- **Guard test** (`privacy.test.ts`) reads `src/**` (non-test) and `index.html` and fails on `fetch(`, `XMLHttpRequest`, `sendBeacon`, `WebSocket`, `document.cookie`, or `<script src=`/`<link href=` pointing to `http`. Cheap, and keeps the statement true.
- **Prompt design:** instruct ChatGPT to act as a reflective coach: ask one short question at a time about moments of pride, frustration, admiration and trade-offs; after about 6 to 8 answers, reflect back themes and name candidate values as single words or short phrases with a sentence each, for the user to confirm or change; never invent answers. No list count. The interpersonal prompt follows the same shape about working with others. `AssistantLink` copy becomes "ChatGPT can ask you questions to help uncover your {noun}", with the note that nothing selected is sent and the user can add what they find with the add box.
- **Markdown removal:** delete the button, `toMarkdown`, `escapeMarkdown` and their tests; keep `downloadFile`/`toJson`. README updated. Archived specs and changes are left as history.
- **Values layout:** reproduce first in a real browser (first load, resize, navigate from a skill page). Likely causes to check: `useColumnCount` measuring `.categories` before layout settles or while the entering step animation applies, and an initial count of 1 never updated; an observer attached once on mount with `[ref]` that is lost if the element mounts later. Fix at the cause (for example measure in a layout effect and observe the element reliably, or default the count from the viewport) and add a test with a mocked `ResizeObserver`/width that asserts multiple `.category-column` elements on the values page.

## Risks / Trade-offs

- A privacy statement is a promise: wording must not overreach, hence the exceptions and the guard test.
- Question-led prompts take longer for the user than a list; the explanatory text sets that expectation, and the user may still pick from the lists directly.
- Removing Markdown may surprise anyone who relied on it; JSON still carries everything.
- The layout root cause is unconfirmed until reproduced; if it turns out to be CSS-only, the task still holds but the fix site changes.
