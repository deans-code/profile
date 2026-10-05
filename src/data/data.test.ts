import { CATALOGS, SECTIONS, catalogSkillNames } from './skills'
import { COMMON_VALUES, VALUE_CATEGORIES } from './values'

const norm = (s: string) => s.trim().toLowerCase()

describe('values data', () => {
  it('has at least 100 values, unique ignoring case', () => {
    expect(COMMON_VALUES.length).toBeGreaterThanOrEqual(100)
    const names = COMMON_VALUES.map((v) => norm(v.name))
    expect(new Set(names).size).toBe(names.length)
  })

  it('has at least 8 categories, none empty, and no value in two categories', () => {
    expect(VALUE_CATEGORIES.length).toBeGreaterThanOrEqual(8)
    for (const c of VALUE_CATEGORIES) {
      expect(c.category.trim()).not.toBe('')
      expect(c.values.length).toBeGreaterThan(0)
    }
    const all = VALUE_CATEGORIES.flatMap((c) => c.values.map(norm))
    expect(new Set(all).size).toBe(all.length)
    expect(new Set(VALUE_CATEGORIES.map((c) => norm(c.category))).size).toBe(VALUE_CATEGORIES.length)
  })

  it('flattens the categories into the full list', () => {
    expect(COMMON_VALUES.map((v) => v.name)).toEqual(VALUE_CATEGORIES.flatMap((c) => c.values))
  })
})

describe('skill catalogs', () => {
  it.each(SECTIONS)('%s has at least 40 skills across at least 5 categories', (section) => {
    expect(catalogSkillNames(section).length).toBeGreaterThanOrEqual(40)
    expect(CATALOGS[section].length).toBeGreaterThanOrEqual(5)
  })

  it.each(SECTIONS)('%s has no duplicates within the section', (section) => {
    const names = catalogSkillNames(section).map(norm)
    expect(new Set(names).size).toBe(names.length)
  })

  it('has no skill shared between sections', () => {
    const all = SECTIONS.flatMap((s) => catalogSkillNames(s).map(norm))
    expect(new Set(all).size).toBe(all.length)
  })

  it('has no empty categories', () => {
    for (const s of SECTIONS) for (const c of CATALOGS[s]) expect(c.skills.length).toBeGreaterThan(0)
  })
})
