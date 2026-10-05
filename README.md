# profile

A tool to help capture an individual's profile. Pick your values from a cloud, choose technical development, engineering and interpersonal skills from curated lists (or add your own), score each skill from 1 to 10, then download your profile card as JSON or Markdown.

The app runs entirely in the browser; no data leaves the device.

## Running locally

Requires a current LTS version of Node.js.

```bash
npm install      # install dependencies
npm run dev      # start the dev server
npm test         # run the test suite once
npm run test:watch  # run tests in watch mode
npm run build    # type-check and build to dist/
npm run preview  # serve the production build locally
```

The app is served under the `/profile/` base path (needed for GitHub Pages), so open:

- Dev server: <http://localhost:5173/profile/>
- Preview of the production build: <http://localhost:4173/profile/>

To serve from the root instead (for example on a custom domain or another host), set `VITE_BASE`:

```bash
VITE_BASE=/ npm run build        # macOS/Linux/Git Bash
$env:VITE_BASE = '/'; npm run build   # PowerShell
```

## Deployment

The site is a static build (`dist/`) hosted free on GitHub Pages. `.github/workflows/deploy.yml` runs on every push to `main` (and can be run manually from the Actions tab): it installs dependencies, runs the tests, builds, and deploys. A failing test stops the deploy.

### One-time setup

1. Push the repository to GitHub.
2. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually). When it finishes, the site is live at `https://<owner>.github.io/<repo>/`, which for this repository should be <https://deans-code.github.io/profile/>.

### If the repository is renamed

The `base` path in `vite.config.ts` defaults to `/profile/` and must match the repository name. Update the default there (or set `VITE_BASE` in the workflow's build step), otherwise the site loads without its scripts and styles.

### Other static hosts

The build output is host-agnostic. For Cloudflare Pages, Netlify or similar, use `npm run build` as the build command, `dist` as the output directory, and `VITE_BASE=/` so assets resolve from the root.
