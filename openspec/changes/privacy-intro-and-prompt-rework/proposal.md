# Proposal

## Why

The app handles personal reflections, yet nothing tells users where that data goes. Its one-line purpose also omits two things the profile is really for: what the user wants to learn and where they want to grow. The ChatGPT helper prompt asks for 15 "correct" values, which is the opposite of reflecting. The Markdown download adds a second format to maintain that cannot be loaded back. And the values page shows its cards at full width while the skill pages use columns.

## What Changes

- Add a privacy notice to the introduction: a short visible line, and a fuller "Privacy" statement behind a collapsible control. A code audit (below) supports every claim in it, and it states the real exceptions honestly.
- Reword the introduction's purpose line to cover what the user values, can do, wants to learn, and where they want to grow (ambition).
- Rework the ChatGPT prompt so ChatGPT interviews the user, one question at a time, to help them uncover their values, and only then reflects themes back. It no longer asks for a list of 15. Update the link's explanatory text to match. Same approach for the interpersonal-skills prompt (assumption, for consistency).
- Remove the Markdown download: the button, the exporter and its tests. JSON remains.
- Make the values page lay out its category cards in columns like the other pages. Root cause to be confirmed first in a real browser (see design).
- Update README and specs that mention Markdown.

### Privacy audit (verified in the repo)
- No network calls in app code: no `fetch`, XHR, beacons, WebSockets, analytics or third-party scripts, fonts or CDNs. Profile state lives in memory and is lost on reload.
- No cookies are set. The only browser storage is `localStorage` holding the theme and text-size preferences (no profile content).
- JSON download and "Load saved profile" run locally.
- Exceptions to state: the static host (Cloudflare Pages) serves the files and may keep ordinary server request logs the app cannot see or control; links out (sources, and ChatGPT if clicked) leave the site, and the ChatGPT link sends only a fixed generic prompt, never selections.

## Capabilities

### New Capabilities
- `privacy-statement`: what the app tells users about data handling and what must stay true for it to be accurate.
- `chatgpt-discovery`: the ChatGPT helper link and the question-led prompts it opens.

### Modified Capabilities
- `page-guidance`: purpose line mentions learning goals and ambition.
- `profile-export`: Markdown download removed; JSON only.
- `values-profile-format`: values list in the card and JSON only.
- `unlimited-skill-selection`: many-skills export is JSON only.
- `collapsible-categories`: the values page also uses the column layout.

## Impact

- `src/App.tsx`, `src/components/ProfileCard.tsx`, `src/export.ts`, `src/data/assistant.ts`, `src/components/AssistantLink.tsx`, `src/components/WordPicker.tsx` / `src/styles.css`, `README.md`.
- Tests: `src/App.test.tsx`, `src/export.test.ts`, `src/assistant.test.tsx`, plus new layout and privacy tests.
- Breaking for users: the Markdown download no longer exists.
- Builds on the header collapsibles from `collapsible-instructions-and-help`; this change adds a sibling "Privacy" collapsible in the same header.
