import { BROAD_TERMS, broadTermDefinition } from './broad-terms'
import type { Section } from './skills'
import { AI_DEFINITIONS } from './definitions/ai'
import { ENGINEERING_DEFINITIONS } from './definitions/engineering'
import { INTERPERSONAL_DEFINITIONS } from './definitions/interpersonal'
import { TECHNICAL_DEFINITIONS } from './definitions/technical'
import { VALUE_DEFINITIONS } from './definitions/values'

export type TermKind = 'values' | Section

/** A page's catalog definitions plus one for each of its broader terms. */
const withBroadTerms = (section: TermKind, catalog: Record<string, string>): Record<string, string> => ({
  ...catalog,
  ...Object.fromEntries(BROAD_TERMS[section].map((t) => [t.name, broadTermDefinition(t)])),
})

const SKILL_DEFINITIONS: Record<Section, Record<string, string>> = {
  technical: withBroadTerms('technical', TECHNICAL_DEFINITIONS),
  engineering: withBroadTerms('engineering', ENGINEERING_DEFINITIONS),
  interpersonal: withBroadTerms('interpersonal', INTERPERSONAL_DEFINITIONS),
  ai: withBroadTerms('ai', AI_DEFINITIONS),
}

const DEFINITIONS: Record<TermKind, Record<string, string>> = {
  values: withBroadTerms('values', VALUE_DEFINITIONS),
  ...SKILL_DEFINITIONS,
}

const norm = (s: string) => s.trim().toLowerCase()

const INDEX: Record<TermKind, Map<string, string>> = {
  values: new Map(),
  technical: new Map(),
  engineering: new Map(),
  interpersonal: new Map(),
  ai: new Map(),
}
for (const kind of Object.keys(DEFINITIONS) as TermKind[]) {
  for (const [name, text] of Object.entries(DEFINITIONS[kind])) INDEX[kind].set(norm(name), text)
}

/** Definition text for a built-in value or skill, or undefined (for example, custom entries). */
export function getDefinition(kind: TermKind, name: string): string | undefined {
  return INDEX[kind].get(norm(name))
}

export function definedNames(kind: TermKind): string[] {
  return Object.keys(DEFINITIONS[kind])
}
