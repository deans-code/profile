import { ATTRIBUTION, getAttribution, getSources } from './attribution'
import { definedNames, type TermKind } from './definitions'
import { COMMON_VALUES } from './values'
import { SECTIONS, catalogSkillNames } from './skills'
import { SOURCE_REGISTRY, TAB_SOURCES, sourcesFor } from './sources'

const norm = (s: string) => s.trim().toLowerCase()
const KINDS: TermKind[] = ['values', ...SECTIONS]

function optionNames(kind: TermKind): string[] {
  return kind === 'values' ? COMMON_VALUES.map((v) => v.name) : catalogSkillNames(kind)
}

describe('source registry', () => {
  it('gives every source a title, publisher, address and year', () => {
    for (const s of Object.values(SOURCE_REGISTRY)) {
      expect(s.title.trim()).not.toBe('')
      expect(s.publisher.trim()).not.toBe('')
      expect(s.url).toMatch(/^https:\/\//)
      expect(s.year).toBeGreaterThanOrEqual(2000)
    }
  })

  it('lists only registered sources on each tab, without repeats', () => {
    for (const kind of KINDS) {
      const ids = TAB_SOURCES[kind]
      expect(new Set(ids).size).toBe(ids.length)
      for (const id of ids) expect(SOURCE_REGISTRY[id]).toBeDefined()
      expect(sourcesFor(kind).map((s) => s.id)).toEqual(ids)
    }
  })

  it('lists at least six sources on every tab', () => {
    for (const kind of KINDS) expect(TAB_SOURCES[kind].length, `${kind} has too few sources`).toBeGreaterThanOrEqual(6)
  })

  it('has no source in the registry that no tab lists', () => {
    const listed = new Set(KINDS.flatMap((k) => TAB_SOURCES[k]))
    for (const id of Object.keys(SOURCE_REGISTRY)) expect(listed.has(id)).toBe(true)
  })
})

describe('attribution lookup', () => {
  it('returns nothing for custom names', () => {
    expect(getSources('technical', 'Not a built-in option')).toEqual([])
    expect(getAttribution('technical', 'Not a built-in option')).toBeUndefined()
  })

  it('is case-insensitive and orders sources as the tab lists them', () => {
    const kind = KINDS.find((k) => Object.keys(ATTRIBUTION[k]).length > 0)
    if (!kind) return
    const [name, a] = Object.entries(ATTRIBUTION[kind])[0]
    expect(getAttribution(kind, name.toUpperCase())).toBe(a)
    const ids = getSources(kind, name).map((s) => s.id)
    expect(ids).toEqual(TAB_SOURCES[kind].filter((id) => a.sources.includes(id)))
  })
})

// A tab that lists sources is a tab being verified: it must be fully and consistently attributed.
describe.each(KINDS.filter((k) => TAB_SOURCES[k].length > 0))('%s attribution integrity', (kind) => {
  const names = optionNames(kind)

  it('attributes every option to at least one source on the tab, with a check date', () => {
    for (const name of names) {
      const a = getAttribution(kind, name)
      expect(a, `${name} has no attribution`).toBeDefined()
      expect(a!.sources.length, `${name} has no sources`).toBeGreaterThan(0)
      for (const id of a!.sources) expect(TAB_SOURCES[kind], `${name} cites ${id}`).toContain(id)
      expect(a!.checked).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('attributes only options that exist, and every option has a description', () => {
    const set = new Set(names.map(norm))
    for (const name of Object.keys(ATTRIBUTION[kind])) expect(set.has(norm(name)), `${name} is not an option`).toBe(true)
    const defined = new Set(definedNames(kind).map(norm))
    for (const name of names) expect(defined.has(norm(name)), `${name} has no description`).toBe(true)
  })

  it('has no listed source that supports no option', () => {
    const used = new Set(Object.values(ATTRIBUTION[kind]).flatMap((a) => a.sources))
    for (const id of TAB_SOURCES[kind]) expect(used.has(id), `${id} supports nothing`).toBe(true)
  })
})
