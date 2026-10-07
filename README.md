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
- [x] Provide a GitHub Actions workflow for deployment to GitHub Pages.
- [x] Deploy to GitHub Pages and confirm the live site.

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

The application is served under the `/profile/` base path, which is what GitHub Pages needs for a project site. To serve from the root instead (for example, on a custom domain or another static host), set `VITE_BASE` when building:

```bash
VITE_BASE=/ npm run build              # macOS, Linux, Git Bash
$env:VITE_BASE = '/'; npm run build    # PowerShell
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
- Technical development, engineering and interpersonal skill catalogs, grouped by category into cards, with filtering and custom skills.
- A limit of 5 selected values, with a running count. Skills have no limit.
- A short description for every built-in value and skill (custom entries have none).
- Loading of a saved JSON profile, validated before it replaces the current profile.
- A distinct colour for each section, with accessible contrast in light and dark themes.
- Scroll-to-top and an animated change of section when moving between steps (skipped when the system asks for reduced motion).
- Two options on every skill page, **Previous experience** and **Desired experience**, each with its own selections and count. Every page opens on Previous experience. Values have a single list.
- Guided steps that require at least one value and at least one skill in each section (in either option) before the profile.
- Profile card showing previous and desired words for every skill page, and one list of values, without scores.
- Download of the profile as JSON or Markdown, generated locally.

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

## :ship: Deployment

The site is a static build (`dist/`) hosted on GitHub Pages. `.github/workflows/deploy.yml` runs on every push to `main` (and can be run manually from the Actions tab). It installs dependencies, runs the tests, builds and deploys; a failing test stops the deployment.

### One-time setup

1. Push the repository to GitHub.
2. In the repository, go to **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`, or run the workflow manually. When it finishes the site is live at `https://<owner>.github.io/<repo>/`, which for this repository should be <https://deans-code.github.io/profile/>.

> [!WARNING]
> The `base` path in `vite.config.ts` defaults to `/profile/` and must match the repository name. If the repository is renamed, update it (or set `VITE_BASE` in the workflow's build step), otherwise the site loads without its scripts and styles.

### Other static hosts

The build output is host-agnostic. For Cloudflare Pages, Netlify or similar, use `npm run build` as the build command, `dist` as the output directory, and set `VITE_BASE=/` so assets resolve from the root.

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
- [GitHub Pages](https://docs.github.com/en/pages)
- [OpenSpec](https://openspec.dev/)
