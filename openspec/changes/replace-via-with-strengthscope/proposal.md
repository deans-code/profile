# Proposal

## Why

The values list leans on the VIA Institute on Character (US-based) for its 24 character strengths. The project would rather cite a UK-based organisation that profiles people. Strengthscope (Strengthscope Limited, London) is one: it publishes a 24-strength model in four clusters, with the strength names listed on its public glossary page.

## What Changes

- Remove the VIA Character Strengths source (the `via-character-strengths` catalog file, its entry in the source registry, its tab listing and its README entry).
- Add Strengthscope as the replacement source, using all 24 strength names as values, with descriptions written for this app (no Strengthscope wording is reproduced), grouped into the app's existing value categories.
- Make sure every value that VIA used to supply (including names also listed by other sources, which previously took their description from VIA) still has a non-empty description and the right category.
- Profiles saved with VIA-only strengths (for example "Humor" or "Prudence") keep loading, as custom values.
- No UI changes.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `source-citation-integrity`: the values tab cites Strengthscope (a UK-based profiling organisation) for its character strengths in place of the VIA Institute, with a link to the page the list was read from, and no longer cites VIA anywhere.

## Impact

- `src/data/catalog/values/` (delete `via-character-strengths.ts`, add `strengthscope-strengths.ts`, update `index.ts` and any descriptions that relied on VIA).
- `src/data/sources.ts` (registry entry and `TAB_SOURCES.values`).
- `README.md` (source list).
- Tests that count values or check descriptions (`src/data/data.test.ts`, `depth.test.ts`, `values-grouping.test.tsx`) may need updating.
- Strengthscope's terms prohibit copying or creating derivatives of its content without written permission; only the short strength names are used (the same approach taken for VIA). See design.md.
