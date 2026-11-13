## 1. Catalog entries

- [x] 1.1 In `src/data/skills.ts` add "PowerShell" (Languages), "jQuery" (Web and frontend), "Express", "ASP.NET Core", "Keycloak", "Auth0 and Okta" (Backend and APIs), "MariaDB", "OpenSearch" (Data), "Firebase", "Vercel", "Hetzner Cloud", "Podman", "Service mesh" (Cloud and DevOps), "Datadog" (Observability tooling)
- [x] 1.2 Add category "Testing and code quality tools" with Playwright (moved from Web and frontend), Jest, Vitest, pytest, JUnit, Postman, ESLint, SonarQube
- [x] 1.3 Add category "Editors, IDEs and package managers" with Visual Studio Code, Visual Studio, IntelliJ IDEA, Vim and Neovim, npm, pnpm, pip and uv, Homebrew, Make and Makefiles
- [x] 1.4 Confirm no new name exists on another page (including case differences) and no existing technical name was changed or removed

## 2. Descriptions

- [x] 2.1 Add a one-sentence description for every new entry in `src/data/definitions/technical.ts`, matching the existing style

## 3. Sources in the app

- [x] 3.1 Create `src/data/sources.ts` with the three sources (title, publisher, url) and the guidance sentence
- [x] 3.2 Render a "Sources" section after the step controls in `src/App.tsx` on every step, with links opening in a new tab (`rel="noopener noreferrer"`), publisher credits and the statement that the sources only guided which technologies appear
- [x] 3.3 Style the section in `src/styles.css` (muted, readable, light and dark themes, wraps at phone width)

## 4. README

- [x] 4.1 Add a "Sources" section to `README.md` with the three links, publishers, the selection rule, and a note that JetBrains data was only partly available
- [x] 4.2 Add a Features bullet linking to the Sources section and update the description of the technical catalog

## 5. Tests and verification

- [x] 5.1 Update `src/data/data.test.ts` and `src/data/definitions.test.ts`: new entries present, new categories present, Playwright only in Testing, no cross-page duplicates, every entry described
- [x] 5.2 Add a UI test: the Sources list with three correct links and credits appears on the values page, a skill page and the profile; add a test that the README contains the same three URLs
- [x] 5.3 Run the full test suite and a production build
- [ ] 5.4 Check the Technical development page and the Sources section in the running app at desktop and phone widths
