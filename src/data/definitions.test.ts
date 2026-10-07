import { definedNames, getDefinition, type TermKind } from './definitions'
import { CATALOGS, SECTIONS, catalogSkillNames } from './skills'
import { COMMON_VALUES } from './values'

const norm = (s: string) => s.trim().toLowerCase()
const sentences = (text: string) => text.split(/(?<=[.!?])\s+/).filter(Boolean)

const BUILT_IN: Record<TermKind, string[]> = {
  values: COMMON_VALUES.map((v) => v.name),
  technical: catalogSkillNames('technical'),
  engineering: catalogSkillNames('engineering'),
  interpersonal: catalogSkillNames('interpersonal'),
  ai: catalogSkillNames('ai'),
}
const KINDS = Object.keys(BUILT_IN) as TermKind[]

describe('definitions', () => {
  it.each(KINDS)('%s: every built-in term has a non-empty definition', (kind) => {
    const missing = BUILT_IN[kind].filter((n) => !getDefinition(kind, n)?.trim())
    expect(missing).toEqual([])
  })

  it.each(KINDS)('%s: no definition is orphaned from the catalog', (kind) => {
    const known = new Set(BUILT_IN[kind].map(norm))
    expect(definedNames(kind).filter((n) => !known.has(norm(n)))).toEqual([])
  })

  it.each(KINDS)('%s: definitions are at most two sentences', (kind) => {
    for (const n of BUILT_IN[kind]) {
      const text = getDefinition(kind, n) ?? ''
      expect({ n, count: sentences(text).length <= 2 }).toEqual({ n, count: true })
    }
  })

  it('looks up case-insensitively and returns undefined for custom terms', () => {
    expect(getDefinition('values', ' integrity ')).toBeTruthy()
    expect(getDefinition('values', 'My own value')).toBeUndefined()
  })

  it('covers categories only for known sections', () => {
    expect(SECTIONS.every((s) => CATALOGS[s].length > 0)).toBe(true)
  })
})
