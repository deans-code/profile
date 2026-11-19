## Context

- `vite.config.ts` defaults `base` to `/profile/` (overridable with `VITE_BASE`). The manual Cloudflare deployment serves from `/`, so `index.html` references `/profile/assets/*.js|css` which 404. This is the observed failure and the likely only defect; any others are found by checking the live deployment (task 3).
- `.github/workflows/deploy.yml` deploys to GitHub Pages (test, build, upload-pages-artifact, deploy-pages).
- The URL given, `*.workers.dev`, is a Workers (static assets) deployment. Cloudflare Pages projects are served at `<project>.pages.dev`.
- The Cloudflare account ID and API token already exist as repository secrets (names assumed `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`, the names used in Cloudflare's direct-upload CI guide; confirm in repo settings).

## Goals / Non-Goals

**Goals:**
- Working site at the root of the Cloudflare Pages URL.
- One workflow: test, build, deploy to Cloudflare Pages on push to `main`.

**Non-Goals:**
- Custom domain, preview deployments for pull requests, Cloudflare Git integration.
- Removing or migrating the existing `workers.dev` Worker; that stays under the owner's control.
- App feature changes.

## Decisions

- **Default base `/`** rather than setting `VITE_BASE=/` in the workflow. Cloudflare is the target and root hosting is the common case; keeping `VITE_BASE` as an override preserves the sub-path option. Alternative (keep `/profile/` and set the env var in CI) leaves local `npm run build`/`preview` broken for root hosting, which is how the manual deploy failed.
- **Direct upload via `cloudflare/wrangler-action`** running `pages deploy dist --project-name=profile`, per the linked guide. Alternative (Cloudflare Git integration) was rejected: the user specified the CI/direct-upload route with secrets already set, and it keeps the test gate in GitHub Actions.
- **Project creation:** the Pages project must exist. Create it once with `wrangler pages project create profile --production-branch=main`, rather than relying on deploy to create it.
- **Replace** `deploy.yml` in place rather than keeping both workflows, satisfying the retire requirement. The `pages`/`id-token` permissions and `github-pages` environment are dropped; `contents: read` and `deployments: write` remain sufficient.

## Risks / Trade-offs

- [Token lacks Pages permission] → Document that it needs Account > Cloudflare Pages > Edit; the deploy step fails visibly.
- [Secret names differ from assumption] → Check in repo settings before apply; adjust the workflow references.
- [Old GitHub Pages site stays up until disabled] → README step to disable Pages in repository settings; the old URL is not redirected.
- [Public URL changes] → Mention the new `pages.dev` address in the README.
- [Other defects unknown] → Verified against the live URL after first deploy, with fixes added as tasks if needed.

## Migration Plan

1. Merge the config and workflow change to `main`; first run deploys to Pages.
2. Verify the `pages.dev` URL; then disable GitHub Pages in repo settings.
3. Rollback: revert the commit and, if required, re-enable GitHub Pages (the previous workflow is in git history).
