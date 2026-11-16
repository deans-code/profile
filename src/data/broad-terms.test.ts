import { readFileSync } from 'node:fs'
import { BROAD_TERMS, broadTermDefinition } from './broad-terms'
import { getDefinition } from './definitions'
import { CATALOGS, SECTIONS, broadTermCategory, broadTermHasTie, catalogSkillNames, categoriesWithBroadTerms } from './skills'
import { COMMON_VALUES } from './values'

const norm = (s: string) => s.trim().toLowerCase()

describe('broader terms data', () => {
  it.each(SECTIONS)('%s has at least 8 broader terms, each covering at least 3 existing options', (section) => {
    expect(BROAD_TERMS[section].length).toBeGreaterThanOrEqual(8)
    for (const t of BROAD_TERMS[section]) {
      expect(t.covers.length, t.name).toBeGreaterThanOrEqual(3)
      expect(t.description.trim(), t.name).not.toBe('')
    }
  })

  it.each(SECTIONS)('%s: every covered option exists in the same section, once per term', (section) => {
    const known = new Set(catalogSkillNames(section).map(norm))
    for (const t of BROAD_TERMS[section]) {
      expect(t.covers.filter((c) => !known.has(norm(c))), t.name).toEqual([])
      expect(new Set(t.covers.map(norm)).size, t.name).toBe(t.covers.length)
    }
  })

  it('has names that are unique across sections, options and values', () => {
    const all = SECTIONS.flatMap((s) => BROAD_TERMS[s].map((t) => norm(t.name)))
    expect(new Set(all).size).toBe(all.length)
    const taken = new Set([
      ...SECTIONS.flatMap((s) => catalogSkillNames(s).map(norm)),
      ...COMMON_VALUES.map((v) => norm(v.name)),
    ])
    expect(all.filter((n) => taken.has(n))).toEqual([])
  })

  it.each(SECTIONS)('%s: every broader term has one clear category that exists', (section) => {
    const categories = CATALOGS[section].map((c) => c.category)
    for (const t of BROAD_TERMS[section]) {
      expect(categories, t.name).toContain(broadTermCategory(section, t))
      expect(broadTermHasTie(section, t), t.name).toBe(false)
    }
    const placed = categoriesWithBroadTerms(section).flatMap((c) => c.broad)
    expect(placed.sort()).toEqual(BROAD_TERMS[section].map((t) => t.name).sort())
  })

  it('places CI/CD in Containers, infrastructure and delivery', () => {
    const term = BROAD_TERMS.technical.find((t) => t.name === 'CI/CD')!
    expect(broadTermCategory('technical', term)).toBe('Containers, infrastructure and delivery')
  })

  it('leaves the cited catalogs untouched', () => {
    const names = new Set(SECTIONS.flatMap((s) => BROAD_TERMS[s].map((t) => norm(t.name))))
    for (const s of SECTIONS) for (const c of CATALOGS[s]) expect(c.skills.filter((n) => names.has(norm(n)))).toEqual([])
  })

  it.each(SECTIONS)('%s: each definition names every covered option', (section) => {
    for (const t of BROAD_TERMS[section]) {
      const text = getDefinition(section, t.name) ?? ''
      expect(text, t.name).toBe(broadTermDefinition(t))
      for (const c of t.covers) expect(text, `${t.name} / ${c}`).toContain(c)
    }
  })
})

/** WCAG relative luminance and contrast ratio. */
function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

describe('broader term colours', () => {
  const css = readFileSync('src/styles.css', 'utf-8')
  const token = (re: RegExp, name: string) => new RegExp(name + ':[ ]*(#[0-9a-fA-F]{6})').exec(re.exec(css)?.[0] ?? '')?.[1] ?? ''

  const themes = {
    light: {
      block: /:root \{[^}]*\}/,
      surface: '#ffffff', page: '#f7f8fa', text: '#1c2430',
    },
    dark: {
      block: /:root\[data-theme='dark'\] \{[^}]*\}/,
      surface: '#1b212b', page: '#12161d', text: '#e8ecf2',
    },
  }

  it.each(Object.keys(themes))('%s: dashed border and label meet WCAG AA on the chip, page and selected tint', (name) => {
    const t = themes[name as keyof typeof themes]
    const broad = token(t.block, '--broad')
    expect(broad).not.toBe('')
    expect(contrast(broad, t.surface)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(broad, t.page)).toBeGreaterThanOrEqual(4.5)
  })

  it('has no leftover tint token', () => {
    expect(css).not.toContain('--broad-tint')
  })

  it('differs from every section accent', () => {
    const accents = [...css.matchAll(/--accent:\s*(#[0-9a-fA-F]{6})/g)].map((m) => m[1].toLowerCase())
    const broad = [...css.matchAll(/--broad:\s*(#[0-9a-fA-F]{6})/g)].map((m) => m[1].toLowerCase())
    expect(broad.length).toBe(3)
    for (const b of broad) expect(accents).not.toContain(b)
  })
})
