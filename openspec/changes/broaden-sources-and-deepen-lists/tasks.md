## 1. Rules and tests first

- [ ] 1.1 Raise the per-tab source minimum from three to six in `src/data/attribution.test.ts` and add a test that each source's year is recorded and that no registered source is unused. Verify: the test fails for every tab until sources are added.
- [ ] 1.2 Add a test that every group on every tab has at least six options, with an `EXCEPTIONS` list (empty) read from the test file, and a test that a category name is spelled identically across all source files of a tab. Verify: fails for current small groups.
- [ ] 1.3 Add size-floor tests (Values 150, Technical 250, Engineering 120, Interpersonal 100, AI 120) and update thresholds in existing tests that now conflict. Verify: fails for tabs below their floor.
- [ ] 1.4 Update `src/load.test.ts` so options and group names removed or merged by this change load as custom entries. Verify: passes now and after each tab.

## 2. Values tab (work and life contexts)

- [ ] 2.1 Vet and register at least three new Values sources from the candidates (Agile Manifesto and principles, Extreme Programming, ACM/IEEE-CS and ACM codes of ethics, Wikipedia value, virtue and work-ethic articles, Project Aristotle, Hofstede, self-determination theory). Verify: each address opens; rejects and reasons noted.
- [ ] 2.2 Define the eleven context groups in design decision 6 and re-home every existing value into one by meaning, renaming categories in the VIA, Schwartz, Rokeach and Scrum files. Verify: one group per value, every group at least six, values-grouping tests rewritten and passing.
- [ ] 2.3 Read each new source in full and add its worthwhile values, each with a description, to the best context group, covering work, delivery with computers, teams, others, isolation and remote work, new ways of working, learning, business, personal, world and expectations of others. Verify: integrity tests pass; values at least 150; every context group at least six.

## 3. Interpersonal tab

- [ ] 3.1 Vet and register at least three new sources (O*NET, ESCO, Wikipedia soft skills, emotional intelligence, Belbin, Tuckman, Thomas-Kilmann, Project Aristotle). Verify: each opens; rejects noted.
- [ ] 3.2 Read each in full, add worthwhile options with descriptions and attribution, and merge groups under six. Verify: integrity and group-size tests pass; at least 100 options.

## 4. Engineering tab

- [ ] 4.1 Vet and register at least two new sources (SWEBOK v4, ISO/IEC 25010, Google SRE book, Twelve-Factor App, Wikipedia design pattern, SOLID and software development philosophy articles, Agile Manifesto, cloud well-architected pillars). Verify: each opens; rejects noted.
- [ ] 4.2 Read each in full, add worthwhile options with descriptions and attribution, and merge groups under six (for example fold Reliability and operations into a broader group). Verify: integrity and group-size tests pass; at least 120 options.

## 5. AI engineering tab

- [ ] 5.1 Vet and register at least one new source beyond the current seven that adds options (Hugging Face, LMArena or Artificial Analysis, NIST AI RMF, OWASP Top 10 for LLM Applications, MCP specification, Wikipedia large language model and retrieval-augmented generation articles). Verify: each opens; rejects noted.
- [ ] 5.2 Read each in full, add worthwhile options with descriptions and attribution, and merge groups under six (Local runtimes, Building AI applications, Open-weight models, Organisational readiness and AI safety each joined to a related group). Verify: integrity and group-size tests pass; at least 120 options.

## 6. Technical development tab

- [ ] 6.1 Vet and register at least one new source that adds options (State of JS, State of CSS, TIOBE, PYPL, Wikipedia language, framework and database lists). Verify: each opens; rejects noted.
- [ ] 6.2 Read each in full, add technologies passing the 5% or two-source rule with descriptions and attribution, and merge groups under six (Game development, Messaging and integration, Identity and access, Build and delivery tools). Verify: integrity and group-size tests pass; at least 250 options.

## 7. Documentation and final checks

- [ ] 7.1 Update `README.md`: every new source with publisher, year or edition, and, for Wikipedia, edit date and licence; the "still in use" age rule; the read-in-full rule; the group-size rule and exceptions; new group names per tab; rejected sources. Verify: `src/sources.test.tsx` confirms every registry URL appears in the README.
- [ ] 7.2 Run `npm test` and `npm run build`. Verify: both pass.
- [ ] 7.3 Walk each tab in the browser: group headings, long lists at largest text size, Sources section, right-click an option with several sources. Verify: no layout overlap, wrong or broken links, or missing groups.
