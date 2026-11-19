# site-deployment Specification

## Purpose
Defines how the built site is published and what a visitor must be able to rely on: the app loads from the root of its host, and every change on `main` is deployed to Cloudflare Pages only when the tests pass.

## ADDED Requirements

### Requirement: Site loads from the host root
The built site SHALL load and run when served from the root of a host, with its scripts and styles resolved from root-relative paths and no path prefix required.

#### Scenario: Open the deployed root URL
- **WHEN** a visitor opens the root URL of the Cloudflare Pages site
- **THEN** the Profile Builder app renders its introduction and values step, and no script or stylesheet request fails

#### Scenario: Build for another path
- **WHEN** the site is built with an explicit base path setting
- **THEN** its assets are requested under that path instead of the root

### Requirement: Automatic deployment to Cloudflare Pages
Each push to `main`, and each manual run, SHALL deploy the built site to the Cloudflare Pages project using the Cloudflare account ID and API token held as repository secrets. The deployment SHALL happen only after the tests and the build succeed.

#### Scenario: Push to main
- **WHEN** a commit is pushed to `main` and tests and build pass
- **THEN** the build output is published to Cloudflare Pages and the run reports the deployment URL

#### Scenario: Failing tests
- **WHEN** a test or the build fails
- **THEN** nothing is deployed and the run fails

#### Scenario: Missing credentials
- **WHEN** the Cloudflare account ID or API token secret is absent
- **THEN** the deploy step fails with a visible error rather than silently skipping

### Requirement: GitHub Pages deployment retired
The repository SHALL NOT deploy to GitHub Pages.

#### Scenario: Push to main after the move
- **WHEN** a commit is pushed to `main`
- **THEN** no GitHub Pages deployment runs
