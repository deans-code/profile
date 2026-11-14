# Profile

## :movie_camera: Background

A tool to help capture an individual's profile: what they value, and what hands-on, engineering, interpersonal and AI engineering experience they have and want.

Users pick up to 5 values from grouped, common choices, build skill lists from curated catalogs, record both previous and desired experience, and finish with a profile card that can be downloaded as JSON or Markdown.

The software runs entirely in the browser. No data leaves the user's device, unless the user chooses to follow the optional ChatGPT link (see below), which sends only a generic prompt.

## :white_check_mark: Scope

- [x] Provide grouped values (over 100, in categories) to select from, with support for custom values.
- [x] Provide curated catalogs of technical development, engineering and interpersonal skills, with support for custom skills.
- [x] Record previous experience and desired experience separately on every skill page.
- [x] Provide an AI engineering page covering approaches, frameworks, tools, providers, open-weight models and local hardware.
- [x] Remove scoring.
- [x] Present a profile card with downloads as JSON and Markdown.
- [x] Provide a description for every built-in value and skill, opened by right-click (with keyboard and touch alternatives).
- [x] Use a wide, uniform layout with a distinct colour per section and animated changes between sections.
- [x] Limit values to 5 selections; skills are unlimited.
- [x] Choose values once (no previous or desired option for values), and open every skill page on previous experience.
- [x] Offer a link to ChatGPT, with a ready-made prompt, on the values and interpersonal pages to help discover more.
- [x] Load a previously downloaded JSON profile and continue editing it.
- [x] Provide a GitHub Actions workflow that tests, builds and deploys to Cloudflare Pages.
- [ ] Deploy to Cloudflare Pages and confirm the live site.

## :telescope: Future Gazing

- [ ] Autosave progress in the browser.
- [ ] Import a previously exported profile.
- [ ] Add further skill catalogs (for example, domain knowledge).

## :beetle: Known defects

No known defects.

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

The application is built for the root of its host (`/`), which is what Cloudflare Pages needs. To serve it from a sub-path instead (for example, a GitHub Pages project site at `/profile/`), set `VITE_BASE` when building:

```bash
VITE_BASE=/profile/ npm run build              # macOS, Linux, Git Bash
$env:VITE_BASE = '/profile/'; npm run build    # PowerShell
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

- Over 100 common values in nine categories (for example Character and integrity, Learning and growth, Society and the world), with a filter and custom values, all shown at the same size in cards that use the full width of the screen.
- Technical development, engineering and interpersonal skill catalogs, grouped by category into cards, with filtering and custom skills. The technical catalog is guided by published developer surveys (see [Sources](#sources)), which are also listed at the bottom of every page.
- A limit of 5 selected values, with a running count. Skills have no limit.
- A short description for every built-in value and skill (custom entries have none).
- Loading of a saved JSON profile, validated before it replaces the current profile.
- A distinct colour for each section, with accessible contrast in light and dark themes.
- Scroll-to-top and an animated change of section when moving between steps (skipped when the system asks for reduced motion).
- Two options on every skill page, **Previous experience** and **Desired experience**, each with its own selections and count. Every page opens on Previous experience. Values have a single list.
- Guided steps that require at least one value and at least one skill in each section (in either option) before the profile.
- Profile card showing previous and desired words for every skill page, and one list of values, without scores.
- Download of the profile as JSON or Markdown, generated locally.

## :bookmark: Sources

### Values

The Values catalog was rebuilt from published value frameworks, one at a time. These describe values rather than usage, so they are attributed the same way:

- [VIA Character Strengths](https://www.viacharacter.org/character-strengths), by the VIA Institute on Character: the 24 strengths in six virtue categories. VIA allows personal, non-commercial use and reserves its rights, so only the names are used with descriptions written for this app.
- [Theory of basic human values](https://en.wikipedia.org/wiki/Theory_of_basic_human_values), Wikipedia's summary of Shalom Schwartz's theory (Schwartz 1992; Schwartz et al. 2012): the ten basic values in four groups. Schwartz's own paper could not be read (its PDF refused automated access), and the nineteen refined values are not listed on the article, so they are not used.
- [Rokeach Value Survey](https://en.wikipedia.org/wiki/Rokeach_Value_Survey), Wikipedia's summary of Milton Rokeach, The Nature of Human Values (1973): 18 terminal and 18 instrumental values.
- [The 2020 Scrum Guide](https://scrumguides.org/scrum-guide.html): its five values (commitment, focus, openness, respect, courage).
- [Manifesto for Agile Software Development and its twelve principles](https://agilemanifesto.org/) (2001): the four values and twelve principles. The authors allow free copying only of the whole manifesto, so only the ideas are named. A standing statement of values for software delivery that is still in wide use.
- [Extreme programming](https://en.wikipedia.org/wiki/Extreme_programming), on Wikipedia (CC BY-SA 4.0, edited 14 October 2026): the five values (communication, simplicity, feedback, courage, respect) and the principles.
- [Lean software development](https://en.wikipedia.org/wiki/Lean_software_development), on Wikipedia (CC BY-SA 4.0, edited 22 December 2025): the seven principles.
- [Work ethic](https://en.wikipedia.org/wiki/Work_ethic), on Wikipedia (CC BY-SA 4.0, edited 6 August 2026): the factors and attitudes of a good work ethic.
- [Value (ethics)](https://en.wikipedia.org/wiki/Value_(ethics)), on Wikipedia (CC BY-SA 4.0, edited 1 November 2026): its examples of values, the consumer-research List of Values and the moral foundations.
- [Outline of self](https://en.wikipedia.org/wiki/Outline_of_self), virtues section, on Wikipedia (CC BY-SA 4.0, edited 27 November 2025; the address /wiki/List_of_virtues redirects to it): the grouped lists of virtues. Only virtues that apply to work, learning, relationships and a person's place in the world are used.
- [Self-determination theory](https://en.wikipedia.org/wiki/Self-determination_theory), on Wikipedia (CC BY-SA 4.0, edited 7 November 2026), summarising Deci and Ryan: autonomy, competence and relatedness, intrinsic goals and motivation.

Considered and not used: the Barrett Values Centre (its list is part of a paid assessment); the ACM Code of Ethics and the ACM/IEEE-CS Software Engineering Code of Ethics (the ACM site refused automated access, HTTP 403); Google re:Work's Project Aristotle (the guide address returned a not-found page); Wikipedia's DevOps article (it names three principles, shared ownership, workflow automation and rapid feedback, but no list of values beyond what other sources already give); Wikipedia's Core values (a disambiguation page that names no values).

The wikipedia sources are CC BY-SA 4.0. Their text is not copied; descriptions are written for this app. Parts of some Wikipedia pages came through the fetch tool's summary rather than verbatim, so each source file records that.

**Groups.** Values are grouped by where they apply, not by source: Doing good work; Building and delivering with computers; Working in a team; Working with others; Working alone and remotely; Adopting new ways of working; Learning and growth; Business and organisation; Personal character; Society and the world; What I expect from others; and Wellbeing and a good life. A value that fits several contexts appears once, in the context it fits best, and lists every source that names it. Saved profiles still load: a value that is no longer offered by that name becomes a custom value.

Source files live in `src/data/catalog/values/`.

### Technical development

The catalog is guided by these reports:

- [Stack Overflow Developer Survey 2026: Technology](https://survey.stackoverflow.co/2026/technology/data), by Stack Overflow.
- [The State of Developer Ecosystem 2026: Tools and trends](https://devecosystem.jetbrains.com/tools-and-trends), by JetBrains. Only part of this page could be read (its charts did not load), so it contributed databases, cloud providers and JetBrains IDEs.
- [State of Cloud Native Development, Q1 2026](https://www.cncf.io/wp-content/uploads/2026/03/State-of-Cloud-Native-Development-Q1-2026.pdf), by SlashData with the Cloud Native Computing Foundation, sponsored by the Continuous Delivery Foundation (licensed CC BY-NoDerivatives 4.0). It describes practices rather than products, so it contributed technologies such as service meshes, API gateways and observability tools; its practices are held for the Engineering tab.

- [Technology Radar, Volume 35](https://www.thoughtworks.com/radar), by Thoughtworks (November 2026): platforms, tools and frameworks in the Adopt, Trial and Assess rings that are not AI-specific. No reuse terms are stated, so it is linked and credited only.
- [Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/), by GitHub (28 October 2026): the top languages by contributors, GitHub Actions and Dependabot. No reuse terms are stated, so it is linked and credited only.

- [TIOBE Index, November 2026](https://www.tiobe.com/tiobe-index/), by TIOBE Software BV: the top 30 languages by rating; languages at 0.5% or more are offered (the page allows its index to be shown if TIOBE is cited).
- [State of CSS 2025](https://2025.stateofcss.com/), by Devographics: the Other Tools results (CSS frameworks, CSS-in-JS, pre- and post-processors and utilities), offering tools used by about 5% or more of the respondents to a question. No licence is shown on the pages read.
- Wikipedia lists and comparisons (CC BY-SA 4.0; text is not copied and descriptions are written for this app). A technology from these lists is offered when the page shows it as maintained (a latest release in 2024 or later where the page gives dates; discontinued items are left out) and it is widely used. Parts of the longer pages came through the fetch tool's summary rather than verbatim, which each source file records:
  - [Comparison of continuous integration software](https://en.wikipedia.org/wiki/Comparison_of_continuous_integration_software) (edited 20 July 2026)
  - [List of build automation software](https://en.wikipedia.org/wiki/List_of_build_automation_software) (edited 3 March 2026)
  - [Comparison of version-control software](https://en.wikipedia.org/wiki/Comparison_of_version-control_software) (edit date not shown; active products only)
  - [List of unit testing frameworks](https://en.wikipedia.org/wiki/List_of_unit_testing_frameworks) (edit date not shown; read verbatim up to C++, the rest summarised and the last part unread)
  - [Message broker](https://en.wikipedia.org/wiki/Message_broker) (edited 11 April 2026)
  - [List of game engines](https://en.wikipedia.org/wiki/List_of_game_engines) (edit date not shown; the last part was not read and the page has no status column, so only well-known engines are offered)
  - [List of single sign-on implementations](https://en.wikipedia.org/wiki/List_of_single_sign-on_implementations) (edited 2 June 2026)
  - [Comparison of relational database management systems](https://en.wikipedia.org/wiki/Comparison_of_relational_database_management_systems) (edit date not shown; products with a 2024 or later release)
  - [NoSQL](https://en.wikipedia.org/wiki/NoSQL) (edited 8 November 2026)
  - [Comparison of server-side web frameworks](https://en.wikipedia.org/wiki/Comparison_of_server-side_web_frameworks) (edited 12 November 2026; only the part read verbatim is used)
  - [Comparison of JavaScript-based web frameworks](https://en.wikipedia.org/wiki/Comparison_of_JavaScript-based_web_frameworks) (edited 11 November 2026)

**Groups.** Containers, infrastructure and delivery; Messaging and integration; Monitoring and logging; Languages; Databases; Cloud platforms and hosting; Editors and IDEs; Web frameworks and technologies; Styling and front-end tooling; Package managers; Build tools; Testing and code quality; Game development and graphics; Version control; Identity and access. Build and delivery tools joined Containers and infrastructure; Game development grew into Game development and graphics. Backbone.js, which that comparison lists, is left out: no survey names it, so it fails the usage rule (and its name would also clash with the page's Back button in the existing tests).

Considered and not used: State of JS (survey.stateofjs.com no longer resolves, and the Devographics page for the 2025 results did not render), PYPL (its ranking is drawn by script and was not in the fetched page), and Wikipedia's business integration comparison (every release it lists is dated 2018 or earlier).

**Selection rule.** The Technical development catalog was rebuilt from these sources, one source at a time. A technology is offered when it has at least 5% usage in a ranked list in the Stack Overflow survey, or is named as in current use by the JetBrains or CNCF reports, and is not already offered on another page. Every option records all the sources that support it, and its description panel (right-click) lists them. Options that no source supports are not offered; a saved profile that contains one still loads it as a custom entry. Security operations vendors, AI-assisted tools and LLM vendors from the Stack Overflow lists are left for the Engineering and AI engineering tabs. The sources guide which technologies appear; their data is not reproduced in the app.

Source files live in `src/data/catalog/technical/`, one per source, each with the date it was read.

### Engineering

The Engineering catalog was rebuilt from these sources, one at a time:

- [DORA capabilities catalog](https://dora.dev/capabilities/) (State of AI-assisted Software Development 2025), by DORA, Google Cloud, licensed CC BY 4.0: technical and process capabilities. Only the dora.dev pages were read, not the full report. Its people and culture capabilities are held for the Interpersonal tab.
- [OWASP Top 10:2025](https://top10.owasp.org/2025), by the OWASP Foundation, licensed CC BY 3.0: each of the ten risk categories is offered as the skill of preventing it.
- [Technology Radar, Volume 35](https://www.thoughtworks.com/radar), by Thoughtworks: engineering techniques (Caution-ring items are not used).
- [State of Cloud Native Development, Q1 2026](https://www.cncf.io/wp-content/uploads/2026/03/State-of-Cloud-Native-Development-Q1-2026.pdf), by SlashData: practices such as microservices, feature flagging and chaos engineering (CC BY-NoDerivatives, linked and credited only).
- [Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/), by GitHub: code review, automated dependency updates and push protection. Stacked pull requests are not offered because the Radar places them in its Caution ring.
- [SWEBOK Guide, version 4.0](https://www.computer.org/education/bodies-of-knowledge/software-engineering) (2024), by the IEEE Computer Society: its knowledge areas. The guide is copyright protected and may not be copied or adapted, so only the names of knowledge areas are used. A standing body of knowledge, so its age is not a bar.
- [Site Reliability Engineering](https://sre.google/sre-book/table-of-contents/) (2017) and [The Site Reliability Workbook](https://sre.google/workbook/table-of-contents/) (2018), by Google, published by O'Reilly (CC BY-NC-ND 4.0): only the chapter and part titles were read, and only the names of practices are used because the licence forbids adaptations. Standing references still in wide use.
- [The Twelve-Factor App](https://12factor.net/), by Adam Wiggins (last updated 2017): the twelve factors. No licence is stated, so only the names of the practices are used.
- [Azure Well-Architected Framework: pillars](https://learn.microsoft.com/en-us/azure/well-architected/pillars), by Microsoft (2025), and [AWS Well-Architected Framework: the pillars](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html), by Amazon Web Services: the pillar names only. No reuse terms were visible; the individual pillar pages were not read.
- Wikipedia articles (CC BY-SA 4.0; text is not copied and descriptions are written for this app; parts of some pages came through the fetch tool's summary rather than verbatim, which each source file records):
  - [List of software development philosophies](https://en.wikipedia.org/wiki/List_of_software_development_philosophies) (edited 10 September 2026): only practices and principles that apply to everyday engineering work are used, not every item.
  - [SOLID](https://en.wikipedia.org/wiki/SOLID) (edited 10 October 2026)
  - [Software design pattern](https://en.wikipedia.org/wiki/Software_design_pattern) (edited 12 September 2026): only widely used patterns are offered.
  - [Software architecture](https://en.wikipedia.org/wiki/Software_architecture) (edited 3 November 2026)
  - [Domain-driven design](https://en.wikipedia.org/wiki/Domain-driven_design) (edited 15 October 2026)
  - [Microservices](https://en.wikipedia.org/wiki/Microservices) (edited 4 October 2026)
  - [ISO/IEC 9126](https://en.wikipedia.org/wiki/ISO/IEC_9126) (edited 24 June 2026), which describes the quality model that ISO/IEC 25010 replaced; the address /wiki/ISO/IEC_25010 redirects to it
  - [Technical debt](https://en.wikipedia.org/wiki/Technical_debt) (edited 16 October 2026)
  - [Code refactoring](https://en.wikipedia.org/wiki/Code_refactoring) (edited 9 November 2026)
  - [Software testing](https://en.wikipedia.org/wiki/Software_testing) (edited 31 October 2026)
  - [Site reliability engineering](https://en.wikipedia.org/wiki/Site_reliability_engineering) (edited 4 October 2026)

**Groups.** Architecture and design; Design principles and patterns; Delivery and process; Cloud-native and platform practices; Testing; Software quality and maintenance; Reliability and operations; Security; Software knowledge areas. The Security group is unchanged. Exploratory testing, previously removed because no source named it, returns because the Software testing article names it.

Source files live in `src/data/catalog/engineering/`.

### Interpersonal

The Interpersonal catalog was rebuilt from published skills frameworks, since there are no usage surveys for these skills:

- [DORA capabilities catalog](https://dora.dev/capabilities/), by DORA, Google Cloud (CC BY 4.0): its people and culture capabilities, such as a generative culture, learning culture, transformational leadership and customer feedback.
- [Career Readiness Competencies](https://www.naceweb.org/career-readiness/competencies/career-readiness-defined/), by the National Association of Colleges and Employers (NACE). NACE allows non-commercial use only; the app uses just the competency names with its own descriptions and credits NACE. The page shows no edition date and marks Equity and Inclusion as under review.
- [SFIA 9](https://sfia-online.org/en/the-sfia-framework/sfia-9), by the SFIA Foundation (October 2024): the names of its generic attributes (such as collaboration, communication and adaptability). SFIA is licensed and copying is prohibited, so only names are used and the individual skills directory was not read.
- [The 2020 Scrum Guide](https://scrumguides.org/scrum-guide.html), by Ken Schwaber and Jeff Sutherland (CC BY-SA 4.0): self-managing teams, facilitation, coaching and inspecting and adapting. It is a standing framework, so its 2020 edition is still current.
- [O*NET OnLine: transferable skills and abilities](https://www.onetonline.org/find/descriptor/browse/Skills/), by the US Department of Labor (CC BY 4.0, site updated 6 October 2026): its social, problem solving and systems skills and its idea generation, reasoning and communication abilities. The Work Styles page returned 404 and is not used.
- Wikipedia articles (CC BY-SA 4.0; text is not copied, descriptions are written for this app; parts of some pages came through the fetch tool's summary rather than verbatim, which each source file records):
  - [Soft skills](https://en.wikipedia.org/wiki/Soft_skills) (edited 23 September 2026)
  - [Social skills](https://en.wikipedia.org/wiki/Interpersonal_skills) (edited 25 October 2026; the address redirects to it)
  - [Emotional intelligence](https://en.wikipedia.org/wiki/Emotional_intelligence) (edited 9 November 2026)
  - [Cultural intelligence](https://en.wikipedia.org/wiki/Cultural_intelligence) (edited 7 September 2025)
  - [Team role inventories](https://en.wikipedia.org/wiki/Team_Role_Inventories), the nine Belbin team roles (edited 16 October 2026)
  - [Tuckman's stages of group development](https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development) (edited 11 September 2026)
  - [Team composition](https://en.wikipedia.org/wiki/Team_composition) (edited 26 July 2026)
  - [Active listening](https://en.wikipedia.org/wiki/Active_listening) (edited 1 November 2026)
  - [Conflict resolution](https://en.wikipedia.org/wiki/Conflict_resolution) (edited 2 November 2026)
  - [Negotiation](https://en.wikipedia.org/wiki/Negotiation) (edited 15 September 2026)
  - [Assertiveness](https://en.wikipedia.org/wiki/Assertiveness) (edited 12 August 2026)
  - [Mentorship](https://en.wikipedia.org/wiki/Mentorship) (edited 1 September 2026)
  - [Public speaking](https://en.wikipedia.org/wiki/Public_speaking) (edited 10 November 2026)
  - [Facilitation (organisational)](https://en.wikipedia.org/wiki/Facilitation_(organisational)) (edited 1 December 2024)
  - [Psychological safety](https://en.wikipedia.org/wiki/Psychological_safety) (edited 4 October 2026)
  - [Time management](https://en.wikipedia.org/wiki/Time_management) (edited 8 October 2026)
  - [Delegation](https://en.wikipedia.org/wiki/Delegation) (edited 26 September 2026)

**Groups.** Communication; Teamwork and collaboration; Team roles; Leadership, coaching and facilitation; Conflict and negotiation; Emotional and cultural intelligence; Culture, inclusion and safety; Customers and stakeholders; Thinking and problem solving; Personal effectiveness. The Belbin roles are offered as the skill of playing each role and Tuckman's stages as the skill of guiding a team through each stage.

Considered and not used: the ESCO skills classification (its transversal skills hierarchy did not load), the Thomas-Kilmann conflict mode instrument page on Wikipedia (404; the conflict styles are taken from the Conflict resolution article), Wikipedia's Feedback article (about feedback in general, not workplace feedback), the World Economic Forum Future of Jobs Report and the PMI Pulse of the Profession (both refuse automated access, so they could not be read), and LinkedIn's most in-demand skills article (the latest readable edition is from February 2024, older than the two-year limit).

Source files live in `src/data/catalog/interpersonal/`.

### AI engineering

The AI engineering catalog was rebuilt the same way, one source at a time. A model provider, tool or practice is offered when a source names it as in current use or leading:

- [Stack Overflow Developer Survey 2026: Technology](https://survey.stackoverflow.co/2026/technology/data), by Stack Overflow: LLM vendors used by at least 5% of respondents, and the problems with AI-generated code that cost the most time.
- [The State of Developer Ecosystem 2026: Artificial intelligence](https://devecosystem.jetbrains.com/artificial-intelligence), by JetBrains. Its charts of AI tools did not load, so only what the page text states was used (AI agents, AI features, agent guideline files).
- [LLM Rankings](https://openrouter.ai/rankings), by OpenRouter (data through 13 November 2026, licensed CC BY 4.0): top models, apps, market share by author and fastest inference providers. Model families are listed rather than dated versions.
- [Technology Radar, Volume 35](https://www.thoughtworks.com/radar), by Thoughtworks (November 2026): AI-related tools, platforms and techniques in the Adopt, Trial and Assess rings. The Caution ring is not used. No reuse terms are stated, so it is linked and credited only.
- [The 2026 AI Index Report](https://hai.stanford.edu/ai-index/2026-ai-index-report), by Stanford HAI: only the highlights page was read.

- [Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/), by GitHub: the fastest-growing and most-engaged AI projects, and use of GitHub Copilot and multiple models.
- [DORA capabilities catalog](https://dora.dev/capabilities/), by DORA, Google Cloud: organisational readiness for AI.
- [OWASP Top 10 for Large Language Model Applications, 2025](https://genai.owasp.org/llm-top-10/), by the OWASP Gen AI Security Project (CC BY-SA 4.0): each of the ten risks is offered as the skill of guarding against it.
- [Artificial Intelligence Risk Management Framework (AI RMF 1.0)](https://www.nist.gov/itl/ai-risk-management-framework), by NIST (January 2023, under revision): only the overview page was read, and it names the four functions (govern, map, measure, manage) only in an image caption; the Playbook was not read.
- [Model Context Protocol specification](https://modelcontextprotocol.io/specification/latest): its roles, server features (resources, prompts, tools), elicitation and security principles. The page shows no licence or date, so only names of concepts are used.
- Wikipedia articles (CC BY-SA 4.0; text is not copied and descriptions are written for this app; parts of the longer pages came through the fetch tool's summary rather than verbatim, which each source file records):
  - [Retrieval-augmented generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) (edited 14 November 2026)
  - [Prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering) (read through 39,943 of 146,112 characters verbatim, the rest summarised; edit date not shown)
  - [MLOps](https://en.wikipedia.org/wiki/MLOps) (edited 4 November 2026)
  - [AI alignment](https://en.wikipedia.org/wiki/AI_alignment) (about 40,000 characters verbatim, the middle summarised and the last third not read; edit date not shown)
  - [Vector database](https://en.wikipedia.org/wiki/Vector_database) (edited 7 November 2026)
  - [Fine-tuning (deep learning)](https://en.wikipedia.org/wiki/Fine-tuning_(deep_learning)) (edited 9 November 2026)
  - [Intelligent agent](https://en.wikipedia.org/wiki/Intelligent_agent) (edited 7 November 2026)
  - [Reinforcement learning from human feedback](https://en.wikipedia.org/wiki/Reinforcement_learning_from_human_feedback) (edited 26 October 2026)

**Groups.** Approaches and ways of working; Prompting and context engineering; Agents and extensibility; AI coding tools and agents; Model providers and open-weight models; Inference platforms, gateways and local runtimes; Retrieval and data for AI; Training and fine-tuning; Building and operating AI applications; Evaluating and choosing models; AI security; AI governance and alignment. Wikipedia's Large language model article was only read through a summary, so it is not listed as a source; the Generative AI navigation box on several pages is a list of products and was used only as an index, not as evidence.

Options with several supporting sources list all of them in their description (right-click). Source files live in `src/data/catalog/ai/`.

### Verifying and refreshing the sources

Each tab's options come from one data file per source (`src/data/catalog/<tab>/<source>.ts`). Each file records the date the source was read, the options it supports (with a description for any option it introduces) and any options an earlier source already added, which then gain this source. To refresh a tab:

1. Re-read the source and update or add its file, setting the `checked` date.
2. Add or remove sources in `src/data/sources.ts` (the registry and the per-tab order) and in the tab's `index.ts`.
3. Run `npm test`. The tests fail if an option has no source, cites a source that is not on its tab, has no description, appears on two tabs, or if a listed source supports nothing, a tab has fewer than six sources, a tab is below its minimum size (Values 150, Technical 250, Engineering 120, Interpersonal 100, AI engineering 120), or any group has fewer than six options. There are no exceptions to the group-size rule at present.

A source qualifies when it has an identifiable publisher, can be read at its address, permits being linked and credited, and is still in use: a recent survey or report, or an older standing framework, standard or reference (for example the Agile Manifesto of 2001, SWEBOK, the Twelve-Factor App or Belbin team roles). A source that has been superseded or retired does not qualify, and technology options still need 5% usage or two sources, so old sources add breadth for practices and principles rather than for outdated tools. Wikipedia articles and lists qualify when they list the items offered and cite their own references; each is linked by title with its edit date and CC BY-SA 4.0 licence, and its text is not copied. Sources that refuse automated access, or whose licence forbids reuse, are cited by name and link only, and some were not used (see each tab above).

Each source is read in full for its tab: every worthwhile item it names is offered, with a description written for this app, or is left out for a stated reason (for example Wikipedia's list of software development philosophies is long, so only practices and principles that apply to everyday engineering work are used). The fetch tool sometimes returned only part of a long page verbatim and summarised the rest; each source file records this, and nothing is listed from a page that could not be read at all.

Because the catalogs were rebuilt, many options from earlier versions are no longer offered. A saved profile that contains one still loads, and the option appears as a custom entry.

## :paperclip: Usage

1. Select the values that describe you, or add your own, then continue.
2. Select skills in each of the technical development, engineering, interpersonal and AI engineering sections. Use the filter to find skills, or add your own.
3. On each skill page, choose **Previous experience** (what you have done) or **Desired experience** (what you want to do) at the top, and select words for each. A word can be in both.
4. Review your profile card, then use **Download JSON** or **Download Markdown**. Use **Edit** to go back and make changes.

### Selection limit

The values page allows up to 5 selected values, including your own. At the limit the remaining values are dimmed and a message explains how to free a slot: deselect a value, then choose another. Descriptions still open for dimmed values.

The technical development, engineering, interpersonal and AI engineering pages have no limit: select as many skills as apply. The profile card lists every selected skill.

### Technical development and AI engineering

Technical development covers hands-on skills (languages, data, cloud, containers and GPUs, observability). Everything about working with AI is on the **AI engineering** page: approaches such as vibe coding and spec-driven development, frameworks such as Superpowers and OpenSpec, terminal tools, desktop apps and editor plugins, open-source tools such as OpenCode, providers and gateways such as Fireworks AI and OpenRouter, open-weight models, local tools such as Ollama, llama.cpp and LM Studio, local hardware, and agent extensibility.

### Discovering more with ChatGPT

The values and interpersonal pages begin with a link to ChatGPT. It opens ChatGPT in a new tab with a prompt already written that explains what you are trying to capture (your values, or your interpersonal skills) and asks for suggestions. Pick the suggestions you like and add them with **Add your own**.

The prompt is the same for everyone: it does not include anything you have selected or typed. Nothing is sent anywhere unless you click the link. The prompts are in `src/data/assistant.ts`.

### Loading a saved profile

Use **Load saved profile** (top right, on any page) and choose a JSON file previously saved with **Download JSON**. The profile card opens, and **Edit** takes you back through the steps with everything selected as saved.

- The file is read in your browser only; nothing is uploaded.
- If you already have selections you are asked to confirm before they are replaced.
- Files that are not valid profiles (not JSON, wrong structure, over 1 MB) are rejected with a message, and your current profile is left unchanged.
- A saved profile with more than 5 values (for example, one edited by hand or saved when the limit was higher) is loaded in full. The values page opens, and you must deselect down to 5 before you can continue. Any number of skills loads normally.
- Profiles saved when values had two options load with both lists merged into one.
- Profiles saved before experience options existed (with scores) still load: their words become previous experience, the scores are ignored and the AI engineering page starts empty.
- Markdown downloads cannot be loaded.

The JSON format is `values: [...]` (a list of names) and `skills.<technical|engineering|interpersonal|ai>: { experience, desired }`, each a list of names.

### Descriptions

Click a word to select or deselect it. To see what it means:

| Input | Action |
|-------|--------|
| Mouse | Right-click the word |
| Keyboard | Focus the word and press `?`, the context-menu key or `Shift`+`F10` |
| Touch | Press and hold the word |

Press `Escape`, use **Close** or click elsewhere to dismiss the description. Custom words have no description, so right-clicking them shows the browser's normal menu.

### Accessibility options

The **Accessibility** button at the top of every page opens two choices:

- **Theme**: Match system (the default, follows your operating system), Light or Dark.
- **Text size**: Default, Large, Larger or Largest.

Changes apply immediately. They are saved in your browser (`localStorage`, key `profile-builder-preferences`) and applied before the page first paints on your next visit. They are not part of the downloaded profile.

## :ship: Deployment

The site is a static build (`dist/`) hosted on Cloudflare Pages. `.github/workflows/deploy.yml` runs on every push to `main` (and can be run manually from the Actions tab). It installs dependencies, runs the tests, builds and deploys with Wrangler (direct upload); a failing test stops the deployment.

### One-time setup

1. In the repository, go to **Settings > Secrets and variables > Actions** and add `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`. The token needs **Account > Cloudflare Pages > Edit** permission.
2. Push to `main`, or run the workflow manually. The workflow does not create the Pages project, so create it once first with `npx wrangler pages project create profile --production-branch=main` (or in the Cloudflare dashboard). The run log prints the deployment URL (<https://profile.pages.dev> unless Cloudflare assigns a different name).
3. If GitHub Pages was previously enabled, go to **Settings > Pages** and unpublish it. It is no longer used.

> [!NOTE]
> The application is built for the root of its host (`base` is `/`). To serve from a sub-path, set `VITE_BASE` when building (see [System Configuration](#floppy_disk-system-configuration)).

### Other static hosts

The build output is host-agnostic. For Netlify or similar, use `npm run build` as the build command and `dist` as the output directory; set `VITE_BASE` if the site is not served from the root.

## :hammer_and_wrench: Architecture

- **React, TypeScript and Vite**, with no backend.
- **One reducer** (`src/state/profile.ts`) holds the wizard state. Each step is a view over it, so navigating back keeps every selection.
- **Catalogs as data** (`src/data`), separate from the components, so the lists can be edited without touching the UI. Values and skills share one picker (`WordPicker`): category cards, filter, Custom group and status.
- **Descriptions as data** (`src/data/definitions`), one map per list, with a test that fails if any built-in value or skill is missing a description. One panel (`DefinitionPanel`) is shared by every word, and `TermButton` handles right-click, keyboard and long-press.
- **Section colours** are CSS custom properties set per `data-section`, with tests that check their contrast in both themes.
- **Limits and loading**: limits are per page (`LIMITS`, currently values only) and enforced in the reducer, and `src/load.ts` is the validated inverse of the JSON export. A loaded profile replaces the state in one `loadProfile` action.
- **Section changes** go through `useStepNavigation`, which scrolls to the top, sets the animation direction, moves focus to the new heading and ignores repeat requests while the change settles.
- **Export as pure functions** (`src/export.ts`), producing the JSON and Markdown (with Markdown escaping of user text) before a local download.

Planning artifacts for the change are in `openspec/`.

## :question: Tests

```bash
npm test             # run the Vitest suite once
npm run test:watch   # run the tests in watch mode
npm run build        # type-check and build
```

## :wave: Contributing

This tool was built to aid the management of a software engineering team and is a personal project at this stage.

## :gift: License

This software is licensed under the [MIT](LICENSE) license.

## :book: Further reading

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Vitest](https://vitest.dev/)
- [Cloudflare Pages direct upload with CI](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/)
- [OpenSpec](https://openspec.dev/)
