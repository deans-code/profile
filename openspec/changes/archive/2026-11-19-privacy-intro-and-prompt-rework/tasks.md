## 1. Introduction and privacy

- [x] 1.1 In `src/App.tsx`, reword the purpose line to cover values, skills, what the user wants to learn and ambition
- [x] 1.2 Add the short visible privacy line under the purpose line
- [x] 1.3 Add a collapsed "Privacy" `<details>` beside "How this works" with the full statement (memory only, no cookies, theme/text size in localStorage, local downloads and loading, host server logs, outside links incl. ChatGPT with generic prompt only)
- [x] 1.4 Style the privacy line and details to match the header blocks
- [x] 1.5 Add `src/privacy.test.ts` guarding against network calls, cookie writes and third-party assets in app source and `index.html`
- [x] 1.6 Add component tests: privacy line visible on every page; Privacy details collapsed by default and shows the exceptions when opened; purpose line mentions learning and ambition

## 2. ChatGPT prompts

- [x] 2.1 Rewrite `VALUES_PROMPT` in `src/data/assistant.ts` as a one-question-at-a-time interview that reflects themes and candidate values at the end, with no list count
- [x] 2.2 Rewrite `INTERPERSONAL_PROMPT` in the same shape
- [x] 2.3 Update `AssistantLink.tsx` copy and note to match (questions, nothing selected is sent, add what you discover with the box)
- [x] 2.4 Update `src/assistant.test.tsx`: prompts ask for questions one at a time, contain no "15" or "Please suggest", and are identical regardless of selections

## 3. Remove Markdown

- [x] 3.1 Remove the Download Markdown button from `ProfileCard.tsx`
- [x] 3.2 Remove `toMarkdown` and `escapeMarkdown` from `src/export.ts` and their tests in `src/export.test.ts`
- [x] 3.3 Update `src/App.test.tsx` download tests (JSON only; many-skills test checks JSON count) and `src/sources.test.tsx` if it references Markdown
- [x] 3.4 Update `README.md` (feature list, usage, limitations, design notes) to drop Markdown

## 4. Values page layout

- [ ] 4.1 Reproduce the full-width cards on the values page in a browser (first load, resize, back from a skill page) and record the cause
- [ ] 4.2 Fix the cause in `WordPicker.tsx` / `styles.css` so values and skills use the same columns
- [ ] 4.3 Add a test with a mocked width/`ResizeObserver` asserting several `.category-column` elements on the values page and on return from a skill page

## 5. Verify

- [x] 5.1 Run the full test suite, typecheck and build
- [ ] 5.2 Check every page in the browser: privacy line and details, purpose wording, Help area prompt text, profile card without Markdown, values columns at wide and phone widths
