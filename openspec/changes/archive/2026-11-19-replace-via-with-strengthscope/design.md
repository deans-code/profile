# Design

## Context

Each values source is a `SourceContribution` file merged in order by `mergeContributions`: the first source to name a value sets its category and description, and later sources only add themselves to its citations. VIA is currently first, so it supplies the category and description for names that other sources list with an empty description (for example Honesty). Removing VIA without care would leave those with empty descriptions. Unknown names in saved profiles already load as custom values.

## Goals / Non-Goals

**Goals:** replace VIA with a UK-based profiling source and carry over all 24 of its values; keep every value described and categorised; keep old profiles loading.

**Non-Goals:** changing the UI, the value limits, or other sources; adding Strengthscope's assessment or scoring.

## Decisions

**Source: Strengthscope.** Strengthscope Limited is based in London and lists its 24 strengths at https://www.strengthscope.com/glossary (no edition date; footer "© 2006-2026"; terms updated March 2026). The strengths: Emotional (Courage, Emotional control, Enthusiasm, Optimism, Resilience, Self-confidence); Relational (Collaboration, Compassion, Developing others, Empathy, Leading, Persuasiveness, Relationship building); Thinking (Common sense, Creativity, Critical thinking, Detail orientation, Strategic mindedness); Execution (Decisiveness, Efficiency, Flexibility, Initiative, Results-focus, Self-improvement). *Alternative considered:* Cappfinity Strengths Profile (UK, formerly Realise2, 60 strengths). Rejected because its dictionary is not published on a public page that could be cited, so the names could not be verified. Barrett Values Centre and similar were not confirmed as UK-based.

**Category mapping** (the app's six categories, not Strengthscope's four clusters, to keep the existing grouped layout):
- Personal character: Courage, Emotional control, Enthusiasm, Optimism, Resilience, Self-confidence
- Working in a team: Collaboration, Developing others, Leading
- Working with others: Compassion, Empathy, Persuasiveness, Relationship building
- Learning and growth: Common sense, Critical thinking, Flexibility, Self-improvement
- Doing good work: Creativity, Detail orientation, Strategic mindedness, Decisiveness, Efficiency, Initiative, Results-focus

**Names and descriptions.** Strengthscope's terms (s2.3, s10.1) forbid copying, republishing or creating derivatives of its content without written permission; the terms do not mention the strength names. As with VIA, only the short names are used and every description is written for this app. The Strengthscope file goes first in the values merge order, as VIA was.

**Descriptions that VIA supplied.** Names previously described by VIA and listed with an empty description elsewhere (found by diffing the merged catalog before and after) need a description written in the source that lists them. Courage, Creativity, Empathy, Flexibility and Resilience are covered because Strengthscope also names them. Honesty is not, so it needs one. The apply step checks the merged catalog for empty descriptions.

**Old profiles.** VIA-only names (Humor, Prudence, Fairness, and so on) are no longer built in and load as custom values, per existing behaviour. No migration.

## Risks / Trade-offs

- [Strengthscope has not given written permission] → Names only, own descriptions, source cited; revisit or request permission if the project is published commercially.
- [Value count drops below 100 or a category empties] → Check counts after the change; add values from existing sources if needed (the VIA-only names are about 18 and Strengthscope adds up to 24 minus overlaps).
- [Glossary page changes] → The catalog records the check date; the list was read on 2026-11-16.
