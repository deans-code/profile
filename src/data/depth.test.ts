import type { TermKind } from './definitions'
import { CATALOGS, SECTIONS, catalogSkillNames } from './skills'
import { VALUE_CATEGORIES, COMMON_VALUES } from './values'

const KINDS: TermKind[] = ['values', ...SECTIONS]

/** Minimum number of options each tab offers (spec: catalog-depth). Floors, not quotas. */
const FLOORS: Record<TermKind, number> = { values: 150, technical: 250, engineering: 120, interpersonal: 100, ai: 120 }

/** Minimum options in any group. */
const MIN_GROUP = 6

/**
 * Groups allowed to be smaller than MIN_GROUP, as `${kind}: ${group}`. Empty unless the README records why
 * merging the group would mix unrelated things.
 */
const EXCEPTIONS: string[] = []

function groups(kind: TermKind): { name: string; count: number }[] {
  return kind === 'values'
    ? VALUE_CATEGORIES.map((c) => ({ name: c.category, count: c.values.length }))
    : CATALOGS[kind].map((c) => ({ name: c.category, count: c.skills.length }))
}

describe('catalog depth', () => {
  it.each(KINDS)('%s offers at least its minimum number of options', (kind) => {
    const n = kind === 'values' ? COMMON_VALUES.length : catalogSkillNames(kind).length
    expect(n, `${kind} has ${n}`).toBeGreaterThanOrEqual(FLOORS[kind])
  })

  it.each(KINDS)('%s has no group of fewer than six options', (kind) => {
    const small = groups(kind).filter((g) => g.count < MIN_GROUP && !EXCEPTIONS.includes(`${kind}: ${g.name}`))
    expect(small, `small groups on ${kind}`).toEqual([])
  })

  it('lists only exceptions that exist and are still small', () => {
    for (const e of EXCEPTIONS) {
      const [kind, ...rest] = e.split(': ')
      const g = groups(kind as TermKind).find((x) => x.name === rest.join(': '))
      expect(g, `${e} is not a group`).toBeDefined()
      expect(g!.count, `${e} is no longer small`).toBeLessThan(MIN_GROUP)
    }
  })
})
