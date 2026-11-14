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
}

/** The sources shown under each tab, in display order. The Profile page has none. */
export const TAB_SOURCES: Record<TermKind, SourceId[]> = {
  values: [],
  technical: ['stack-overflow-2026', 'jetbrains-2026', 'cncf-2026'],
  engineering: [],
  interpersonal: [],
  ai: [],
}

export function sourcesFor(kind: TermKind): Source[] {
  return TAB_SOURCES[kind].map((id) => SOURCE_REGISTRY[id])
}

export const SOURCES_NOTE =
  'These sources guided which options are offered. Their data is not reproduced here.'
