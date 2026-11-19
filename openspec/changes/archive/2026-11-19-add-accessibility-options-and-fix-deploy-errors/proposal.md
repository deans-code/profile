## Why

Visitors cannot adjust the app to their needs: colours follow only the operating system's light/dark setting and text size cannot be changed from the page. Separately, the latest Cloudflare Pages run (https://github.com/deans-code/profile/actions/runs/43397708004) is marked successful but reports errors (`npx canceled due to missing packages`, `A project with this name already exists [code: 8000002]`) that make real failures hard to spot.

## What Changes

- Add an "Accessibility" control at the top of the page, beside the existing Load profile control, with:
  - Theme: Match system (default), Light, Dark.
  - Text size: Default, Large, Larger, Largest.
- Apply the choices to the whole app immediately, including all section palettes, and remember them in the browser across visits.
- Make the colour palettes switchable by an explicit theme choice rather than only by `prefers-color-scheme`.
- Clean up the deployment workflow so a healthy run reports no errors: remove the "ensure project exists" step (the `profile` project already exists, which causes the code 8000002 error) and pin a current wrangler version so the action does not fail its `npx --no-install` check and fall back to wrangler 3.90.0.
- Move the workflow's actions to versions that run natively on a supported Node runtime, clearing the Node.js 20 deprecation warning where newer majors exist.

## Capabilities

### New Capabilities
- `accessibility-options`: user-selectable theme and text size, applied app-wide and remembered.
- `deployment-run-health`: the Cloudflare Pages workflow completes without error annotations when the site deploys.

### Modified Capabilities
<!-- None: section-theming is unchanged for the default (system) behaviour; the existing site-deployment requirements live in the pending move-deployment-to-cloudflare-pages change. -->

## Impact

- `src/App.tsx` (new control in header), a new accessibility component, `src/styles.css` (theme selectors, scalable sizes), `src/theme.test.ts` (palette checks must cover explicit light/dark), new tests.
- `.github/workflows/deploy.yml`; `README.md` (project must be created once in Cloudflare; accessibility note).
- No new runtime dependencies; preferences stored in `localStorage` only.
