# Proposal

## Why

The profile builder is being used to capture where an AI engineering team stands. Scoring each skill from 1 to 10 is subjective and adds a whole step, while what the team really needs to know is who has done what, and who wants to learn what. The "Technical development" page mixes hands-on skills with a thin AI category, yet the AI tooling landscape (agentic coding tools, spec-driven frameworks, inference providers, open-weight and local models) is now large enough to deserve its own page.

## What Changes

- **Remove the scoring feature**: no scoring step, no sliders, no scores in the profile card, JSON or Markdown. **BREAKING** for the export format (see Impact).
- **Refocus "Technical development" on hands-on experience**: the "AI and machine learning" category leaves the page, and the catalog is rebalanced towards hands-on skills an AI engineering team builds on (languages, data and storage, APIs, cloud, containers and GPUs, notebooks and data tooling).
- **Add a new "AI engineering" page** (its own tab, with its own colour) with a large, categorised catalog covering:
  - **Approaches**: vibe coding, spec-driven development, agentic coding, AI-assisted test-driven development, context engineering and others.
  - **Frameworks and methodologies**: Superpowers, OpenSpec, GitHub Spec Kit, BMAD Method and similar.
  - **Tools by form**: terminal (TUI/CLI) agents, desktop apps and AI-first editors, and plugins for IDEs and code editors.
  - **Open-source tools**: such as OpenCode, Aider and Goose.
  - **Providers and gateways**: closed-model vendors, inference providers such as Fireworks and OpenRouter, and cloud platforms.
  - **Open-weight models** and **running them on local hardware**: tools such as Ollama, llama.cpp and LM Studio, plus quantisation and hardware topics.
  - **Agent extensibility**: MCP, skills, sub-agents, hooks, instruction files.
- **Two options on every selection page**: a choice between **Previous experience** and **Desired experience**. Each page keeps two independent selections, so a word can be in either or both.
- Custom entries, filtering, descriptions (right-click) and the values limit of 20 continue to work, applied per option.

## Capabilities

### New Capabilities
- `experience-modes`: Previous and desired experience selection on every selection page, with independent lists, counts and limits.
- `ai-engineering-section`: The AI engineering page and its categorised, described catalog.
- `technical-skills-catalog`: The hands-on focus of the Technical development page, without AI engineering content.
- `profile-flow`: The step order and completion rules once scoring is gone and the AI engineering page exists.
- `profile-export`: The profile card, JSON and Markdown content: both experience lists per page, no scores.
- `profile-loading`: Loading new-format profiles and older profiles that contain scores.

### Modified Capabilities
<!-- None can be declared: earlier changes are not archived into openspec/specs, which is empty. design.md lists which earlier requirements this change supersedes. -->

## Impact

- Code: `src/state/profile.ts` (steps, sections, state shape, reducer, gating, load landing), `src/data/skills.ts` and `src/data/definitions/*` (catalog rebalance, new AI catalog and descriptions), `src/export.ts`, `src/load.ts`, `src/App.tsx`, `ProfileCard`, `SkillStep`/`ValuesStep`/`WordPicker`/`SelectionStatus`/`SelectionHelp`, a new mode switch component, `src/styles.css` (remove scoring styles, add the AI section colour and mode switch), tests and README.
- Removed: `ScoringStep` and score constants, helpers and tests.
- **Export format change**: JSON becomes `values: { experience, desired }` and `skills.<section>: { experience, desired }` with plain names and a new `ai` section. Older downloaded profiles still load (scores ignored, entries treated as previous experience).
- Roughly 150 AI engineering catalog entries, each with a description, to author. Tool and product names change quickly, so they are reviewed for currency at implementation time.
- No new dependencies; the app stays fully client-side.
- Out of scope: any replacement for scoring or proficiency levels, per-entry notes, URLs or version information, team-level aggregation, autosave, an AI-suggestion link on the new page.
- Assumptions (reasonable defaults, easy to change):
  - "Each page" means the values page and all four skill pages; the profile card page shows the results.
  - The mode choice is sticky: choosing "Desired experience" on one page keeps that mode on the next page, and each page shows its counts for both options.
  - A page is complete when at least one word is selected in either option; the AI engineering page is required like the other skill pages.
  - The values limit of 20 applies to each option separately.
  - "Hands-on, not through AI engineering" means the Technical page lists skills about building and operating software and data systems directly, and everything about working with AI tools, models and providers lives on the AI engineering page, including skills for building AI-powered applications (for example RAG, evals, fine-tuning).
