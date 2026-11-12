## Why

The site is deployed to GitHub Pages and is being moved to Cloudflare Pages. A manual deployment to Cloudflare (https://profile.dean-lynn.workers.dev/) does not work: the build defaults to the `/profile/` base path, so from the site root the page requests its scripts and styles at `/profile/assets/...`, which do not exist, and the page stays blank.

## What Changes

- Build for the site root by default (`base` of `/`), so assets resolve on Cloudflare and on any host serving from the root. The GitHub Pages `/profile/` path is no longer needed.
- Replace the GitHub Pages workflow with a GitHub Actions workflow that runs the tests, builds, and deploys `dist/` to a Cloudflare Pages project using direct upload (Wrangler), using the Cloudflare account ID and API token already stored as repository secrets.
- Remove the GitHub Pages deployment workflow and update the README's deployment and base-path guidance.
- Fix any other defects found when the deployed build is checked against the live Cloudflare URL.

## Capabilities

### New Capabilities
- `site-deployment`: how the built site is published: served correctly from the root of its host, and deployed automatically to Cloudflare Pages from `main` only after tests pass.

### Modified Capabilities

## Impact

- `vite.config.ts` (default base), `.github/workflows/deploy.yml` (replaced), `README.md` (deployment section, base-path note, checklist).
- Hosting changes from GitHub Pages to Cloudflare Pages; the public URL changes (a `*.pages.dev` address). The existing `profile.dean-lynn.workers.dev` address is a Workers deployment, not Pages, and is outside this workflow.
- Requires a Cloudflare API token with Cloudflare Pages edit permission in the repository secrets.
