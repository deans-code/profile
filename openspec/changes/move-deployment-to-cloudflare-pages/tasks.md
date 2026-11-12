## 1. Fix root serving

- [ ] 1.1 Change the default `base` in `vite.config.ts` to `/` (keep the `VITE_BASE` override) and update its comment. Verify: `npm run build` then `dist/index.html` references `/assets/...` and `npm test` passes.
- [ ] 1.2 Add a test that asserts the default base is `/` and that `VITE_BASE` overrides it. Verify: `npm test` passes and fails if the default reverts to `/profile/`.
- [ ] 1.3 Serve `dist` locally (`npm run preview`) and confirm the app renders with no failed asset requests.

## 2. Cloudflare Pages deployment

- [ ] 2.1 Confirm the repository secret names for the account ID and API token (repo settings) and that the token has Cloudflare Pages edit permission; confirm a Pages project `profile` exists, creating it with `wrangler pages project create profile --production-branch=main` if not. Verify: the project is listed in the Cloudflare dashboard.
- [ ] 2.2 Replace `.github/workflows/deploy.yml` with a workflow that runs `npm ci`, `npm test`, `npm run build`, then deploys `dist` with `cloudflare/wrangler-action` (`pages deploy dist --project-name=profile`) on push to `main` and `workflow_dispatch`. Remove the GitHub Pages steps, permissions and environment. Verify: the YAML is valid and a manual run succeeds, printing the deployment URL.
- [ ] 2.3 Confirm a failing test stops the deploy. Verify: by step ordering, the deploy step does not run when tests fail.

## 3. Verify live site and fix defects

- [ ] 3.1 Open the deployed `pages.dev` URL and walk the full flow (values, four skill pages, profile, export and load). Verify: no console errors or failed requests and the flow completes.
- [ ] 3.2 Fix any defects found (add a test per fix) and redeploy. Verify: `npm test` passes and the live site behaves correctly.

## 4. Documentation

- [ ] 4.1 Update `README.md`: Cloudflare Pages deployment steps (secrets, token permission, project), root base-path note with `VITE_BASE` override, new URL, disabling GitHub Pages, and the checklist items. Verify: no remaining references to GitHub Pages as the host.
- [ ] 4.2 Disable GitHub Pages in repository settings after the first successful Cloudflare deploy. Verify: the old Pages site is no longer published.
