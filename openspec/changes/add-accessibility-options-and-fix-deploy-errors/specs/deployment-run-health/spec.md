## ADDED Requirements

### Requirement: Deployment run is free of avoidable errors
A push to `main` that passes tests and build SHALL deploy to Cloudflare Pages in a run whose steps report no errors or error annotations. The workflow SHALL NOT attempt to create the Pages project on each run, and SHALL use a fixed, current deployment tool version rather than relying on whichever tool is preinstalled.

#### Scenario: Project already exists
- **WHEN** the workflow runs and the Pages project already exists
- **THEN** no step attempts to create it and no "project already exists" error is reported

#### Scenario: Clean deploy
- **WHEN** tests and build pass on `main`
- **THEN** the deploy step succeeds using the pinned tool version and the run shows no error annotations

#### Scenario: Genuine failure still fails
- **WHEN** the deploy step itself fails (for example, invalid credentials or a missing project)
- **THEN** the run fails and the error is shown, rather than being ignored
