# Profile

## :movie_camera: Background

A tool to help capture an individual's profile: what they value, and where their technical development, engineering and interpersonal skills stand.

Users pick their values from a cloud of common choices, build skill lists from curated catalogs, score each skill from 1 to 10, and finish with a profile card that can be downloaded as JSON or Markdown.

The software runs entirely in the browser. No data leaves the user's device.

## :white_check_mark: Scope

- [x] Provide a cloud of common values to select from, with support for custom values.
- [x] Provide curated catalogs of technical development, engineering and interpersonal skills, with support for custom skills.
- [x] Score each selected skill from 1 to 10 using sliders.
- [x] Present a profile card with downloads as JSON and Markdown.
- [x] Provide a GitHub Actions workflow for deployment to GitHub Pages.
- [ ] Deploy to GitHub Pages and confirm the live site.

## :telescope: Future Gazing

- [ ] Autosave progress in the browser.
- [ ] Import a previously exported profile.
- [ ] Add further skill catalogs (for example, domain knowledge).

## :beetle: Known defects

The layout at phone widths and keyboard use of the score sliders have not yet been checked manually.

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

- Values cloud of around 60 common values, with custom values.
- Technical development, engineering and interpersonal skill catalogs, grouped by category, with filtering and custom skills.
- Guided steps that require at least one value and at least one skill in each section before scoring.
- Scoring of every selected skill from 1 to 10.
- Profile card showing values and scored skills.
- Download of the profile as JSON or Markdown, generated locally.

## :paperclip: Usage

1. Select the values that describe you, or add your own, then continue.
2. Select skills in each of the technical development, engineering and interpersonal sections. Use the filter to find skills, or add your own.
3. Score each selected skill using the sliders (1 is a beginner, 10 is an expert).
4. Review your profile card, then use **Download JSON** or **Download Markdown**. Use **Edit** to go back and make changes.

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
- **One reducer** (`src/state/profile.ts`) holds the wizard state. Each step is a view over it, so navigating back keeps every selection and score.
- **Catalogs as data** (`src/data`), separate from the components, so the lists can be edited without touching the UI.
- **Export as pure functions** (`src/export.ts`), producing the JSON and Markdown (with Markdown escaping of user text) before a local download.

Planning artifacts for the change are in `openspec/`.

## :question: Tests

```bash
npm test             # run the Vitest suite once
npm run test:watch   # run the tests in watch mode
npm run build        # type-check and build
```

## :wave: Contributing

This repository was created primarily for my own exploration of the technologies involved.

## :gift: License

This software is licensed under the [MIT](LICENSE) license.

## :book: Further reading

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Vitest](https://vitest.dev/)
- [GitHub Pages](https://docs.github.com/en/pages)
- [OpenSpec](https://openspec.dev/)
