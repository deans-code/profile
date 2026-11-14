import { TECHNICAL } from './catalog/technical'
import type { TermKind } from './definitions'
import { SOURCE_REGISTRY, TAB_SOURCES, type Source, type SourceId } from './sources'

export interface Attribution {
  /** Every listed source that supports the option. */
  sources: SourceId[]
  /** ISO date the option was last checked against those sources. */
  checked: string
}

/** Supporting sources per tab and option name. Filled in tab by tab as each is verified. */
export const ATTRIBUTION: Record<TermKind, Record<string, Attribution>> = {
  values: {},
  technical: TECHNICAL.attribution,
  engineering: {},
  interpersonal: {},
  ai: {},
}

const norm = (s: string) => s.trim().toLowerCase()

const INDEX: Record<TermKind, Map<string, Attribution>> = {
  values: new Map(),
  technical: new Map(),
  engineering: new Map(),
  interpersonal: new Map(),
  ai: new Map(),
}
for (const kind of Object.keys(ATTRIBUTION) as TermKind[]) {
  for (const [name, a] of Object.entries(ATTRIBUTION[kind])) INDEX[kind].set(norm(name), a)
}

/** The sources supporting a built-in option, in the order they appear on its tab; empty for custom entries. */
export function getSources(kind: TermKind, name: string): Source[] {
  const a = INDEX[kind].get(norm(name))
  if (!a) return []
  const order = TAB_SOURCES[kind]
  return [...a.sources].sort((x, y) => order.indexOf(x) - order.indexOf(y)).map((id) => SOURCE_REGISTRY[id])
}

export function getAttribution(kind: TermKind, name: string): Attribution | undefined {
  return INDEX[kind].get(norm(name))
}
