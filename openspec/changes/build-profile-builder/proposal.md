# Proposal

## Why

People struggle to articulate who they are professionally: what they value and where their skills stand. A guided tool that offers curated choices, then asks for a simple self-rating, produces a shareable profile quickly. The repository is greenfield, so this is the first feature.

## What Changes

- Add a guided, step-by-step profile builder (values → technical development skills → engineering skills → interpersonal skills → scoring → profile card).
- Values step: a selectable "cloud" of common values; users may also add custom values.
- Skills steps: three comprehensive but relevant curated catalogs (technical development, engineering, interpersonal), grouped by category, with the ability to add custom skills.
- Scoring step: once all sections have selections, show every selected skill with a 1–10 slider beside it.
- Profile card: a summary of values and scored skills, with buttons to download as JSON or Markdown.

## Capabilities

### New Capabilities
- `values-selection`: Values cloud with common values, selection toggling and custom values.
- `skills-selection`: Curated catalogs for technical development, engineering and interpersonal skills, with selection and custom additions.
- `skill-scoring`: Scoring of selected skills on a 1–10 scale via sliders, and the gating between selection and scoring.
- `profile-export`: Profile card presentation and JSON/Markdown download.

### Modified Capabilities
<!-- None: no existing specs. -->

## Impact

- New client-side web application in the repo root (no existing code affected).
- No backend, accounts or persistence of user data off-device; export is by local file download.
- Hosting: deployable as a static site on a free host (GitHub Pages), keeping running costs at zero.
- Assumptions: single-user, runs entirely in the browser; the profile is not stored server-side. Technology choices are in design.md.
- Out of scope: authentication, sharing links, importing a previously exported profile, localization.
