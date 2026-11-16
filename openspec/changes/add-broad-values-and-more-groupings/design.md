# Design

## Context

`BROAD_TERMS` is keyed by skills section. `broadTermCategory` and `categoriesWithBroadTerms` (in `skills.ts`) place a term in the category holding most of its covered options, and `WordPicker` styles the names passed in `broadTerms`. Values live in `VALUE_CATEGORIES` (11 categories), are limited to 5 to 10 selections, load through `resolve(profile.values, COMMON_VALUES names)`, and take definitions from `VALUE_DEFINITIONS`. `TermKind` already includes `'values'`.

Current coverage (observed): 66 terms. Categories with no term: Editors and IDEs (24 options), Game development and graphics (17), Software knowledge areas (9). Least-covered large categories: Testing and code quality (45 options, 2 terms, 32 uncovered), Microservice and integration patterns (42, 2 terms, 31 uncovered), Web frameworks and technologies (43, 2, 26), Languages (35, 2, 23), Databases (39, 3, 20).

## Decisions

**Key broader terms by kind, not section.** `BROAD_TERMS` becomes `Record<TermKind, BroadTerm[]>` with a `values` entry. The category helpers take a kind and read categories from `CATALOGS[section]` or `VALUE_CATEGORIES`. No new component: `ValuesStep` passes the broader names to `WordPicker`, which already renders the label, dashed border and note. *Alternative:* a separate values file and component. Rejected: it would duplicate placement and look code for no benefit.

**Broader values use the limit (assumption).** A broader value is a value like any other: selectable, counted toward the 5 to 10 limit, in the export, and it does not select what it covers. *Alternative:* exempt them from the limit. Rejected: a person could then exceed 10 chosen values and the exported profile would mean something different. Each definition names what the term covers so people can choose between the group and a specific word.

**Initial broader values** (placed by the majority rule; every covered name exists in the catalog today):

- Doing good work: *Quality and craftsmanship* (Excellence, Craftsmanship, Workmanship, Detail orientation, Conscientiousness, Diligence); *Drive and achievement* (Achievement, A sense of accomplishment, Results-focus, Goal orientation, Hard work, Perseverance, Initiative).
- Working in a team: *Team spirit* (Collaboration, Teamwork, Cooperation, Solidarity, Sense of belonging, Sportsmanship); *Shared ownership of outcomes* (Collective responsibility, Self-organisation, Empowerment, Commitment, Trust).
- Working with others: *Kindness and empathy* (Compassion, Empathy, Benevolence, Forgiveness, Hospitality, Generativity); *Respectful dealing with people* (Respect, Politeness, Tact, Tolerance, Listening, Broad-mindedness).
- Learning and growth: *Lifelong learning* (Curiosity, Self-improvement, Personal development, Mastery, Self-cultivation, Amplifying learning); *Clear thinking* (Critical thinking, Problem solving, Insight, Understanding, Common sense, Wisdom, Intellect).
- Personal character: *Honesty and ethics* (Honesty, Integrity, Ethical behaviour, Authenticity, Humility, Self-respect); *Inner strength* (Courage, Resilience, Optimism, Self-confidence, Patience, Equanimity, Emotional control).
- Working alone and remotely: *Working independently* (Self-direction, Independence, Self-reliance, Self-management, Autonomy, Self-discipline, Intrinsic motivation).
- Adopting new ways of working: *Adaptability* (Openness to change, Adaptation, Responding to change, Embracing change, Open-mindedness); *Learning from experience* (Inspection, Regular reflection, Continuous improvement, Transparency).
- Business and organisation: *Fairness at work* (Meritocracy, Fair pay, Work-life balance, Professional ethics); *Commitment to the organisation* (Loyalty, Organisational commitment, Duty, Obedience, Conformity); *Ambition and success* (Ambition, Power, Social recognition, Prosperity).
- Society and the world: *Social justice* (Equality, Justice, Fairness, Human rights, Democracy, Welfare of others); *Caring for people and the planet* (Altruism, Charity, Social responsibility, Environmental concern, Citizenship); *Peace and safety* (A world at peace, Nonviolence, National security, Security).
- Building and delivering with computers: *Engineering excellence* (Technical excellence, Working software, Built-in quality, Maintainable work, Simplicity, Automation); *Lean flow of work* (Eliminating waste, Sustainable pace, Early and frequent delivery, Optimising the whole, Feedback).
- What I expect from others: *Respect from others* (Dignity and respect, Fair treatment, Good faith, Being listened to); *Support and feedback from others* (Support to do my job, Honest feedback, Recognition for my work, Trust from others, Reliability from others, Accountability from others).

**More skills groupings: a rule plus a worklist.** Rule, enforced by a data test: each category has at least 2 broader terms placed in it (1 if it lists fewer than 8 options), each covering at least 3 options. Worklist, found by comparing terms to the catalog: (1) the three empty categories first, for example Editors and IDEs (JetBrains IDEs, terminal editors), Game development and graphics (game engines, web 3D libraries) and Software knowledge areas (the groups of requirements, construction, maintenance and management); (2) Team roles split by Belbin's three groups (action, people, thinking); (3) the five least-covered large categories above get 2 to 4 more terms each, so few options are left uncovered where a natural grouping exists. Exact terms are chosen at apply time against the real catalog names, one section per task, and the data test fails on any name that does not exist. Terms may overlap; each option's own category is unchanged.

**Integrity checks (tests), extended:** names unique ignoring case across values, every section's options and every term; every `covers` name exists in the same kind; at least 3 covered; at least 2 terms per category (1 under 8 options); a term's majority category exists with no tie; each definition names every covered option.

**Values load and export.** `profileToState` resolves saved value names against the broader value names as well as the built-in values, restoring spelling. No file-format change. Definitions come from `broadTermDefinition`, merged into the values definitions the way `withBroadTerms` does for skills.

## Risks / Trade-offs

- [Picking a broader value uses a scarce slot] → Intentional and explained in its definition.
- [Many dashed chips make a page noisy] → Terms sit only first in their own category and the target is about 2 to 4 per category; checked in the browser at narrow and wide widths.
- [Overlapping covers confuse] → Allowed deliberately; each definition states what it covers.
- [Majority placement ties as lists grow] → The tie test fails and the cover list is adjusted.
