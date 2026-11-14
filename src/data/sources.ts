import type { TermKind } from './definitions'

export type SourceId = string

export interface Source {
  id: SourceId
  title: string
  publisher: string
  url: string
  /** Year or edition of the publication the link points to. */
  year: number
}

/** Every published source the app cites. Each is linked and credited, never reproduced. */
export const SOURCE_REGISTRY: Record<SourceId, Source> = {
  'stack-overflow-2026': {
    id: 'stack-overflow-2026',
    title: 'Stack Overflow Developer Survey 2026: Technology',
    publisher: 'Stack Overflow',
    url: 'https://survey.stackoverflow.co/2026/technology/data',
    year: 2026,
  },
  'jetbrains-2026': {
    id: 'jetbrains-2026',
    title: 'The State of Developer Ecosystem 2026: Tools and trends',
    publisher: 'JetBrains',
    url: 'https://devecosystem.jetbrains.com/tools-and-trends',
    year: 2026,
  },
  'cncf-2026': {
    id: 'cncf-2026',
    title: 'State of Cloud Native Development, Q1 2026',
    publisher: 'SlashData, sponsored by the Continuous Delivery Foundation, in partnership with the Cloud Native Computing Foundation',
    url: 'https://www.cncf.io/wp-content/uploads/2026/03/State-of-Cloud-Native-Development-Q1-2026.pdf',
    year: 2026,
  },
  'jetbrains-ai-2026': {
    id: 'jetbrains-ai-2026',
    title: 'The State of Developer Ecosystem 2026: Artificial intelligence',
    publisher: 'JetBrains',
    url: 'https://devecosystem.jetbrains.com/artificial-intelligence',
    year: 2026,
  },
  'openrouter-rankings-2026': {
    id: 'openrouter-rankings-2026',
    title: 'LLM Rankings (usage data through 13 November 2026)',
    publisher: 'OpenRouter',
    url: 'https://openrouter.ai/rankings',
    year: 2026,
  },
  'thoughtworks-radar-35': {
    id: 'thoughtworks-radar-35',
    title: 'Technology Radar, Volume 35',
    publisher: 'Thoughtworks',
    url: 'https://www.thoughtworks.com/radar',
    year: 2026,
  },
  'stanford-ai-index-2026': {
    id: 'stanford-ai-index-2026',
    title: 'The 2026 AI Index Report',
    publisher: 'Stanford Institute for Human-Centered AI',
    url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report',
    year: 2026,
  },
  'dora-2025': {
    id: 'dora-2025',
    title: 'DORA capabilities catalog (State of AI-assisted Software Development 2025)',
    publisher: 'DORA, Google Cloud',
    url: 'https://dora.dev/capabilities/',
    year: 2025,
  },
  'owasp-top10-2025': {
    id: 'owasp-top10-2025',
    title: 'OWASP Top 10:2025',
    publisher: 'OWASP Foundation',
    url: 'https://top10.owasp.org/2025',
    year: 2025,
  },
  'octoverse-2026': {
    id: 'octoverse-2026',
    title: 'Octoverse 2026: Commits and pushes reach new highs as developers build with agents',
    publisher: 'GitHub',
    url: 'https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/',
    year: 2026,
  },
  'nace-career-readiness': {
    id: 'nace-career-readiness',
    title: 'Career Readiness Competencies',
    publisher: 'National Association of Colleges and Employers (NACE)',
    url: 'https://www.naceweb.org/career-readiness/competencies/career-readiness-defined/',
    year: 2025,
  },
  'sfia-9': {
    id: 'sfia-9',
    title: 'SFIA 9: Skills Framework for the Information Age',
    publisher: 'SFIA Foundation',
    url: 'https://sfia-online.org/en/the-sfia-framework/sfia-9',
    year: 2024,
  },
  'scrum-guide-2020': {
    id: 'scrum-guide-2020',
    title: 'The 2020 Scrum Guide',
    publisher: 'Ken Schwaber and Jeff Sutherland',
    url: 'https://scrumguides.org/scrum-guide.html',
    year: 2020,
  },
  'via-character-strengths': {
    id: 'via-character-strengths',
    title: 'VIA Character Strengths',
    publisher: 'VIA Institute on Character',
    url: 'https://www.viacharacter.org/character-strengths',
    year: 2026,
  },
  'schwartz-basic-values': {
    id: 'schwartz-basic-values',
    title: 'Theory of basic human values (Schwartz), as summarised on Wikipedia',
    publisher: 'Wikipedia contributors, citing Shalom H. Schwartz (1992, 2012)',
    url: 'https://en.wikipedia.org/wiki/Theory_of_basic_human_values',
    year: 2026,
  },
  'rokeach-value-survey': {
    id: 'rokeach-value-survey',
    title: 'Rokeach Value Survey, as summarised on Wikipedia',
    publisher: 'Wikipedia contributors, citing Milton Rokeach (1973)',
    url: 'https://en.wikipedia.org/wiki/Rokeach_Value_Survey',
    year: 2025,
  },
  'agile-manifesto-2001': {
    id: 'agile-manifesto-2001',
    title: 'Manifesto for Agile Software Development and its twelve principles',
    publisher: 'Beck, Beedle, van Bennekum, Cockburn, Cunningham, Fowler, Grenning, Highsmith, Hunt, Jeffries, Kern, Marick, Martin, Mellor, Schwaber, Sutherland and Thomas',
    url: 'https://agilemanifesto.org/',
    year: 2001,
  },
  'extreme-programming-wikipedia': {
    id: 'extreme-programming-wikipedia',
    title: 'Extreme programming, as described on Wikipedia',
    publisher: 'Wikipedia contributors (CC BY-SA 4.0, edited 14 October 2026)',
    url: 'https://en.wikipedia.org/wiki/Extreme_programming',
    year: 2026,
  },
  'lean-software-development-wikipedia': {
    id: 'lean-software-development-wikipedia',
    title: 'Lean software development, as described on Wikipedia',
    publisher: 'Wikipedia contributors (CC BY-SA 4.0, edited 22 December 2025)',
    url: 'https://en.wikipedia.org/wiki/Lean_software_development',
    year: 2025,
  },
  'work-ethic-wikipedia': {
    id: 'work-ethic-wikipedia',
    title: 'Work ethic, as described on Wikipedia',
    publisher: 'Wikipedia contributors (CC BY-SA 4.0, edited 6 August 2026)',
    url: 'https://en.wikipedia.org/wiki/Work_ethic',
    year: 2026,
  },
  'value-ethics-wikipedia': {
    id: 'value-ethics-wikipedia',
    title: 'Value (ethics), as described on Wikipedia',
    publisher: 'Wikipedia contributors (CC BY-SA 4.0, edited 1 November 2026)',
    url: 'https://en.wikipedia.org/wiki/Value_(ethics)',
    year: 2026,
  },
  'outline-of-self-wikipedia': {
    id: 'outline-of-self-wikipedia',
    title: 'Outline of self: virtues, as listed on Wikipedia',
    publisher: 'Wikipedia contributors (CC BY-SA 4.0, edited 27 November 2025)',
    url: 'https://en.wikipedia.org/wiki/Outline_of_self',
    year: 2025,
  },
  'self-determination-theory-wikipedia': {
    id: 'self-determination-theory-wikipedia',
    title: 'Self-determination theory, as summarised on Wikipedia',
    publisher: 'Wikipedia contributors, citing Deci and Ryan (CC BY-SA 4.0, edited 7 November 2026)',
    url: 'https://en.wikipedia.org/wiki/Self-determination_theory',
    year: 2026,
  },
}

/** The sources shown under each tab, in display order. The Profile page has none. */
export const TAB_SOURCES: Record<TermKind, SourceId[]> = {
  values: [
    'via-character-strengths',
    'schwartz-basic-values',
    'rokeach-value-survey',
    'scrum-guide-2020',
    'agile-manifesto-2001',
    'extreme-programming-wikipedia',
    'lean-software-development-wikipedia',
    'work-ethic-wikipedia',
    'value-ethics-wikipedia',
    'outline-of-self-wikipedia',
    'self-determination-theory-wikipedia',
  ],
  technical: ['stack-overflow-2026', 'jetbrains-2026', 'cncf-2026', 'thoughtworks-radar-35', 'octoverse-2026'],
  engineering: ['dora-2025', 'owasp-top10-2025', 'thoughtworks-radar-35', 'cncf-2026', 'octoverse-2026'],
  interpersonal: ['dora-2025', 'nace-career-readiness', 'sfia-9', 'scrum-guide-2020'],
  ai: ['stack-overflow-2026', 'jetbrains-ai-2026', 'openrouter-rankings-2026', 'thoughtworks-radar-35', 'stanford-ai-index-2026', 'octoverse-2026', 'dora-2025'],
}

export function sourcesFor(kind: TermKind): Source[] {
  return TAB_SOURCES[kind].map((id) => SOURCE_REGISTRY[id])
}

export const SOURCES_NOTE =
  'These sources guided which options are offered. Their data is not reproduced here.'
