# Profile

## :movie_camera: Background

A tool to help capture an individual's profile: what they value, and what hands-on, engineering, interpersonal and AI engineering experience they have and want.

Users pick up to 5 values from grouped, common choices, build skill lists from curated catalogs, record both previous and desired experience, and finish with a profile card that can be downloaded as JSON or Markdown.

The software runs entirely in the browser. No data leaves the user's device, unless the user chooses to follow the optional ChatGPT link (see below), which sends only a generic prompt.

## :white_check_mark: Scope

- [x] Provide grouped values (over 100, in categories) to select from, with support for custom values.
- [x] Provide curated catalogs of technical development, engineering and interpersonal skills, with support for custom skills.
- [x] Record previous experience and desired experience separately on every skill page.
- [x] Provide an AI engineering page covering approaches, frameworks, tools, providers, open-weight models and local hardware.
- [x] Remove scoring.
- [x] Present a profile card with downloads as JSON and Markdown.
- [x] Provide a description for every built-in value and skill, opened by right-click (with keyboard and touch alternatives).
- [x] Use a wide, uniform layout with a distinct colour per section and animated changes between sections.
- [x] Limit values to 5 selections; skills are unlimited.
- [x] Choose values once (no previous or desired option for values), and open every skill page on previous experience.
- [x] Offer a link to ChatGPT, with a ready-made prompt, on the values and interpersonal pages to help discover more.
- [x] Load a previously downloaded JSON profile and continue editing it.
- [x] Provide a GitHub Actions workflow that tests, builds and deploys to Cloudflare Pages.
- [ ] Deploy to Cloudflare Pages and confirm the live site.

## :telescope: Future Gazing

- [ ] Autosave progress in the browser.
- [ ] Import a previously exported profile.
- [ ] Add further skill catalogs (for example, domain knowledge).

## :beetle: Known defects

No known defects.

## :crystal_ball: Use of AI

[Claude Code](https://claude.com/product/claude-code) was used to assist in the development of this software, with planning and changes managed using [OpenSpec](https://openspec.dev/).

## :rocket: Getting Started

### :computer: System Requirements

#### Software

![Node.js](https://img.shields.io/badge/Node.js-latest_LTS-blueviolet "Node.js")
![React](https://img.shields.io/badge/React-19-blueviolet "React")
![TypeScript](https://img.shields.io/badge/TypeScript-latest-blueviolet "TypeScript")
![Vite](https://img.shields.io/badge/Vite-latest-blueviolet "Vite")

> [!NOTE]
> Other operating systems and versions will work, where versions are specified treat as minimums.

#### Hardware

No special hardware is required.

### :floppy_disk: System Configuration

No configuration is required. The application has no backend, accounts or secrets.

The application is built for the root of its host (`/`), which is what Cloudflare Pages needs. To serve it from a sub-path instead (for example, a GitHub Pages project site at `/profile/`), set `VITE_BASE` when building:

```bash
VITE_BASE=/profile/ npm run build              # macOS, Linux, Git Bash
$env:VITE_BASE = '/profile/'; npm run build    # PowerShell
```

### :wrench: Development Setup

Clone the repository.

Install the dependencies:

```bash
npm install
```

Start the development server and open <http://localhost:5173/profile/>:

```bash
npm run dev
```

To check the production build locally, build and preview it, then open <http://localhost:4173/profile/>:

```bash
npm run build
npm run preview
```

## :zap: Features

- Over 100 common values in nine categories (for example Character and integrity, Learning and growth, Society and the world), with a filter and custom values, all shown at the same size in cards that use the full width of the screen.
- Technical development, engineering and interpersonal skill catalogs, grouped by category into cards, with filtering and custom skills. The technical catalog is guided by published developer surveys (see [Sources](#sources)), which are also listed at the bottom of every page.
- A limit of 5 selected values, with a running count. Skills have no limit.
- A short description for every built-in value and skill (custom entries have none).
- Loading of a saved JSON profile, validated before it replaces the current profile.
- A distinct colour for each section, with accessible contrast in light and dark themes.
- Scroll-to-top and an animated change of section when moving between steps (skipped when the system asks for reduced motion).
- Two options on every skill page, **Previous experience** and **Desired experience**, each with its own selections and count. Every page opens on Previous experience. Values have a single list.
- Guided steps that require at least one value and at least one skill in each section (in either option) before the profile.
- Profile card showing previous and desired words for every skill page, and one list of values, without scores.
- Download of the profile as JSON or Markdown, generated locally.

## :bookmark: Sources

### Technical development

The catalog is guided by these reports:

- [Stack Overflow Developer Survey 2026: Technology](https://survey.stackoverflow.co/2026/technology/data), by Stack Overflow.
- [The State of Developer Ecosystem 2026: Tools and trends](https://devecosystem.jetbrains.com/tools-and-trends), by JetBrains. Only part of this page could be read (its charts did not load), so it contributed databases, cloud providers and JetBrains IDEs.
- [State of Cloud Native Development, Q1 2026](https://www.cncf.io/wp-content/uploads/2026/03/State-of-Cloud-Native-Development-Q1-2026.pdf), by SlashData with the Cloud Native Computing Foundation, sponsored by the Continuous Delivery Foundation (licensed CC BY-NoDerivatives 4.0). It describes practices rather than products, so it contributed technologies such as service meshes, API gateways and observability tools; its practices are held for the Engineering tab.

- [Technology Radar, Volume 35](https://www.thoughtworks.com/radar), by Thoughtworks (November 2026): platforms, tools and frameworks in the Adopt, Trial and Assess rings that are not AI-specific. No reuse terms are stated, so it is linked and credited only.
- [Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/), by GitHub (28 October 2026): the top languages by contributors, GitHub Actions and Dependabot. No reuse terms are stated, so it is linked and credited only.

**Selection rule.** The Technical development catalog was rebuilt from these sources, one source at a time. A technology is offered when it has at least 5% usage in a ranked list in the Stack Overflow survey, or is named as in current use by the JetBrains or CNCF reports, and is not already offered on another page. Every option records all the sources that support it, and its description panel (right-click) lists them. Options that no source supports are not offered; a saved profile that contains one still loads it as a custom entry. Security operations vendors, AI-assisted tools and LLM vendors from the Stack Overflow lists are left for the Engineering and AI engineering tabs. The sources guide which technologies appear; their data is not reproduced in the app.

Source files live in `src/data/catalog/technical/`, one per source, each with the date it was read.

### Engineering

The Engineering catalog was rebuilt from these sources, one at a time:

- [DORA capabilities catalog](https://dora.dev/capabilities/) (State of AI-assisted Software Development 2025), by DORA, Google Cloud, licensed CC BY 4.0: technical and process capabilities. Only the dora.dev pages were read, not the full report. Its people and culture capabilities are held for the Interpersonal tab.
- [OWASP Top 10:2025](https://top10.owasp.org/2025), by the OWASP Foundation, licensed CC BY 3.0: each of the ten risk categories is offered as the skill of preventing it.
- [Technology Radar, Volume 35](https://www.thoughtworks.com/radar), by Thoughtworks: engineering techniques (Caution-ring items are not used).
- [State of Cloud Native Development, Q1 2026](https://www.cncf.io/wp-content/uploads/2026/03/State-of-Cloud-Native-Development-Q1-2026.pdf), by SlashData: practices such as microservices, feature flagging and chaos engineering (CC BY-NoDerivatives, linked and credited only).
- [Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/), by GitHub: code review, automated dependency updates and push protection. Stacked pull requests are not offered because the Radar places them in its Caution ring.

Source files live in `src/data/catalog/engineering/`.

### Interpersonal

The Interpersonal catalog was rebuilt from published skills frameworks, since there are no usage surveys for these skills:

- [DORA capabilities catalog](https://dora.dev/capabilities/), by DORA, Google Cloud (CC BY 4.0): its people and culture capabilities, such as a generative culture, learning culture, transformational leadership and customer feedback.
- [Career Readiness Competencies](https://www.naceweb.org/career-readiness/competencies/career-readiness-defined/), by the National Association of Colleges and Employers (NACE). NACE allows non-commercial use only; the app uses just the competency names with its own descriptions and credits NACE. The page shows no edition date and marks Equity and Inclusion as under review.
- [SFIA 9](https://sfia-online.org/en/the-sfia-framework/sfia-9), by the SFIA Foundation (October 2024): the names of its generic attributes (such as collaboration, communication and adaptability). SFIA is licensed and copying is prohibited, so only names are used and the individual skills directory was not read.
- [The 2020 Scrum Guide](https://scrumguides.org/scrum-guide.html), by Ken Schwaber and Jeff Sutherland (CC BY-SA 4.0): self-managing teams, facilitation, coaching and inspecting and adapting. It is a standing framework, so its 2020 edition is still current.

Considered and not used: the World Economic Forum Future of Jobs Report and the PMI Pulse of the Profession (both refuse automated access, so they could not be read), and LinkedIn's most in-demand skills article (the latest readable edition is from February 2024, older than the two-year limit).

Source files live in `src/data/catalog/interpersonal/`.

### AI engineering

The AI engineering catalog was rebuilt the same way, one source at a time. A model provider, tool or practice is offered when a source names it as in current use or leading:

- [Stack Overflow Developer Survey 2026: Technology](https://survey.stackoverflow.co/2026/technology/data), by Stack Overflow: LLM vendors used by at least 5% of respondents, and the problems with AI-generated code that cost the most time.
- [The State of Developer Ecosystem 2026: Artificial intelligence](https://devecosystem.jetbrains.com/artificial-intelligence), by JetBrains. Its charts of AI tools did not load, so only what the page text states was used (AI agents, AI features, agent guideline files).
- [LLM Rankings](https://openrouter.ai/rankings), by OpenRouter (data through 13 November 2026, licensed CC BY 4.0): top models, apps, market share by author and fastest inference providers. Model families are listed rather than dated versions.
- [Technology Radar, Volume 35](https://www.thoughtworks.com/radar), by Thoughtworks (November 2026): AI-related tools, platforms and techniques in the Adopt, Trial and Assess rings. The Caution ring is not used. No reuse terms are stated, so it is linked and credited only.
- [The 2026 AI Index Report](https://hai.stanford.edu/ai-index/2026-ai-index-report), by Stanford HAI: only the highlights page was read.

- [Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/), by GitHub: the fastest-growing and most-engaged AI projects, and use of GitHub Copilot and multiple models.
- [DORA capabilities catalog](https://dora.dev/capabilities/), by DORA, Google Cloud: organisational readiness for AI.

Options with several supporting sources list all of them in their description (right-click). Source files live in `src/data/catalog/ai/`.

## :paperclip: Usage

1. Select the values that describe you, or add your own, then continue.
2. Select skills in each of the technical development, engineering, interpersonal and AI engineering sections. Use the filter to find skills, or add your own.
3. On each skill page, choose **Previous experience** (what you have done) or **Desired experience** (what you want to do) at the top, and select words for each. A word can be in both.
4. Review your profile card, then use **Download JSON** or **Download Markdown**. Use **Edit** to go back and make changes.

### Selection limit

The values page allows up to 5 selected values, including your own. At the limit the remaining values are dimmed and a message explains how to free a slot: deselect a value, then choose another. Descriptions still open for dimmed values.

The technical development, engineering, interpersonal and AI engineering pages have no limit: select as many skills as apply. The profile card lists every selected skill.

### Technical development and AI engineering

Technical development covers hands-on skills (languages, data, cloud, containers and GPUs, observability). Everything about working with AI is on the **AI engineering** page: approaches such as vibe coding and spec-driven development, frameworks such as Superpowers and OpenSpec, terminal tools, desktop apps and editor plugins, open-source tools such as OpenCode, providers and gateways such as Fireworks AI and OpenRouter, open-weight models, local tools such as Ollama, llama.cpp and LM Studio, local hardware, and agent extensibility.

### Discovering more with ChatGPT

The values and interpersonal pages begin with a link to ChatGPT. It opens ChatGPT in a new tab with a prompt already written that explains what you are trying to capture (your values, or your interpersonal skills) and asks for suggestions. Pick the suggestions you like and add them with **Add your own**.

The prompt is the same for everyone: it does not include anything you have selected or typed. Nothing is sent anywhere unless you click the link. The prompts are in `src/data/assistant.ts`.

### Loading a saved profile

Use **Load saved profile** (top right, on any page) and choose a JSON file previously saved with **Download JSON**. The profile card opens, and **Edit** takes you back through the steps with everything selected as saved.

- The file is read in your browser only; nothing is uploaded.
- If you already have selections you are asked to confirm before they are replaced.
- Files that are not valid profiles (not JSON, wrong structure, over 1 MB) are rejected with a message, and your current profile is left unchanged.
- A saved profile with more than 5 values (for example, one edited by hand or saved when the limit was higher) is loaded in full. The values page opens, and you must deselect down to 5 before you can continue. Any number of skills loads normally.
- Profiles saved when values had two options load with both lists merged into one.
- Profiles saved before experience options existed (with scores) still load: their words become previous experience, the scores are ignored and the AI engineering page starts empty.
- Markdown downloads cannot be loaded.

The JSON format is `values: [...]` (a list of names) and `skills.<technical|engineering|interpersonal|ai>: { experience, desired }`, each a list of names.

### Descriptions

Click a word to select or deselect it. To see what it means:

| Input | Action |
|-------|--------|
| Mouse | Right-click the word |
| Keyboard | Focus the word and press `?`, the context-menu key or `Shift`+`F10` |
| Touch | Press and hold the word |

Press `Escape`, use **Close** or click elsewhere to dismiss the description. Custom words have no description, so right-clicking them shows the browser's normal menu.

### Accessibility options

The **Accessibility** button at the top of every page opens two choices:

- **Theme**: Match system (the default, follows your operating system), Light or Dark.
- **Text size**: Default, Large, Larger or Largest.

Changes apply immediately. They are saved in your browser (`localStorage`, key `profile-builder-preferences`) and applied before the page first paints on your next visit. They are not part of the downloaded profile.

## :ship: Deployment

The site is a static build (`dist/`) hosted on Cloudflare Pages. `.github/workflows/deploy.yml` runs on every push to `main` (and can be run manually from the Actions tab). It installs dependencies, runs the tests, builds and deploys with Wrangler (direct upload); a failing test stops the deployment.

### One-time setup

1. In the repository, go to **Settings > Secrets and variables > Actions** and add `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`. The token needs **Account > Cloudflare Pages > Edit** permission.
2. Push to `main`, or run the workflow manually. The workflow does not create the Pages project, so create it once first with `npx wrangler pages project create profile --production-branch=main` (or in the Cloudflare dashboard). The run log prints the deployment URL (<https://profile.pages.dev> unless Cloudflare assigns a different name).
3. If GitHub Pages was previously enabled, go to **Settings > Pages** and unpublish it. It is no longer used.

> [!NOTE]
> The application is built for the root of its host (`base` is `/`). To serve from a sub-path, set `VITE_BASE` when building (see [System Configuration](#floppy_disk-system-configuration)).

### Other static hosts

The build output is host-agnostic. For Netlify or similar, use `npm run build` as the build command and `dist` as the output directory; set `VITE_BASE` if the site is not served from the root.

## :hammer_and_wrench: Architecture

- **React, TypeScript and Vite**, with no backend.
- **One reducer** (`src/state/profile.ts`) holds the wizard state. Each step is a view over it, so navigating back keeps every selection.
- **Catalogs as data** (`src/data`), separate from the components, so the lists can be edited without touching the UI. Values and skills share one picker (`WordPicker`): category cards, filter, Custom group and status.
- **Descriptions as data** (`src/data/definitions`), one map per list, with a test that fails if any built-in value or skill is missing a description. One panel (`DefinitionPanel`) is shared by every word, and `TermButton` handles right-click, keyboard and long-press.
- **Section colours** are CSS custom properties set per `data-section`, with tests that check their contrast in both themes.
- **Limits and loading**: limits are per page (`LIMITS`, currently values only) and enforced in the reducer, and `src/load.ts` is the validated inverse of the JSON export. A loaded profile replaces the state in one `loadProfile` action.
- **Section changes** go through `useStepNavigation`, which scrolls to the top, sets the animation direction, moves focus to the new heading and ignores repeat requests while the change settles.
- **Export as pure functions** (`src/export.ts`), producing the JSON and Markdown (with Markdown escaping of user text) before a local download.

Planning artifacts for the change are in `openspec/`.

## :question: Tests

```bash
npm test             # run the Vitest suite once
npm run test:watch   # run the tests in watch mode
npm run build        # type-check and build
```

## :wave: Contributing

This tool was built to aid the management of a software engineering team and is a personal project at this stage.

## :gift: License

This software is licensed under the [MIT](LICENSE) license.

## :book: Further reading

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Vitest](https://vitest.dev/)
- [Cloudflare Pages direct upload with CI](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/)
- [OpenSpec](https://openspec.dev/)
