# Tasks

## 1. Capture current state

- [ ] 1.1 Record the merged values catalog (names, categories, descriptions, count) before changes and list names whose description comes from VIA; verify the list is saved in the scratchpad for later comparison.

## 2. Replace the source

- [ ] 2.1 Add `src/data/catalog/values/strengthscope-strengths.ts` with the 24 names, original descriptions and the category mapping in design.md, source `strengthscope-strengths`, checked `2026-11-16`; verify `npx tsc --noEmit` passes.
- [ ] 2.2 Register Strengthscope in `src/data/sources.ts` (title "Strengthscope strengths", publisher "Strengthscope Limited", URL https://www.strengthscope.com/glossary, year 2026), replace the VIA entry in `TAB_SOURCES.values`, and delete the VIA registry entry; verify no `via-character-strengths` references remain via grep.
- [ ] 2.3 Update `src/data/catalog/values/index.ts` (swap the import and keep the source first) and delete `via-character-strengths.ts`; verify the build succeeds.
- [ ] 2.4 Fill any empty descriptions left by removing VIA (Honesty and any others from task 1.1) in the source that lists them; verify a test that every value has a non-empty description passes.

## 3. Tests and docs

- [ ] 3.1 Add or update data tests: all 24 Strengthscope names present and cited, no VIA citation, value count at least 100 in at least 8 categories, no case-insensitive duplicates; verify `npm test` passes.
- [ ] 3.2 Add a load test that a profile with "Humor" loads as a custom value; verify it passes.
- [ ] 3.3 Replace the VIA entry in `README.md` with Strengthscope, noting that only names are used with descriptions written for this app; verify a case-insensitive search for "VIA" in README.md and src finds no source references.

## 4. Integration check

- [ ] 4.1 Run the full test suite and build, and open the values page to confirm the strengths show grouped with descriptions and the source list names Strengthscope; verify all pass.
