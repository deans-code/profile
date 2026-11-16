import { readFileSync } from 'node:fs'
import { BROAD_TERMS, broadTermDefinition } from './broad-terms'
import { getDefinition, type TermKind } from './definitions'
import { SECTIONS, broadTermCategory, broadTermHasTie, categoriesOf, categoriesWithBroadTerms, groupedCategories } from './skills'

const norm = (s: string) => s.trim().toLowerCase()

const KINDS: TermKind[] = ['values', ...SECTIONS]

describe('broader terms data', () => {
  it.each(SECTIONS)('%s has at least 8 broader terms', (section) => {
    expect(BROAD_TERMS[section].length).toBeGreaterThanOrEqual(8)
  })

  it('values has at least 20 broader terms', () => {
    expect(BROAD_TERMS.values.length).toBeGreaterThanOrEqual(20)
  })

  it.each(KINDS)('%s: each term covers at least 3 existing options and has a description', (kind) => {
    for (const t of BROAD_TERMS[kind]) {
      expect(t.covers.length, t.name).toBeGreaterThanOrEqual(3)
      expect(t.description.trim(), t.name).not.toBe('')
    }
  })

  it.each(KINDS)('%s: every covered option exists on the same page, once per term', (kind) => {
    const known = new Set(categoriesOf(kind).flatMap((c) => c.words).map(norm))
    for (const t of BROAD_TERMS[kind]) {
      expect(t.covers.filter((c) => !known.has(norm(c))), t.name).toEqual([])
      expect(new Set(t.covers.map(norm)).size, t.name).toBe(t.covers.length)
    }
  })

  it('has names that are unique across values, skills and terms', () => {
    const all = KINDS.flatMap((k) => BROAD_TERMS[k].map((t) => norm(t.name)))
    expect(new Set(all).size).toBe(all.length)
    const taken = new Set(KINDS.flatMap((k) => categoriesOf(k).flatMap((c) => c.words.map(norm))))
    expect(all.filter((n) => taken.has(n))).toEqual([])
  })

  it.each(KINDS)('%s: every broader term has one clear category that exists', (kind) => {
    const categories = categoriesOf(kind).map((c) => c.category)
    for (const t of BROAD_TERMS[kind]) {
      expect(categories, t.name).toContain(broadTermCategory(kind, t))
      expect(broadTermHasTie(kind, t), t.name).toBe(false)
    }
    const placed = categoriesWithBroadTerms(kind).flatMap((c) => c.broad)
    expect(placed.sort()).toEqual(BROAD_TERMS[kind].map((t) => t.name).sort())
  })

  it.each(KINDS)('%s: every category has at least two broader terms, or one if it lists fewer than 8 options', (kind) => {
    const thin = categoriesWithBroadTerms(kind)
      .map((c) => ({ category: c.category, have: c.broad.length, need: c.words.length - c.broad.length < 8 ? 1 : 2 }))
      .filter((c) => c.have < c.need)
      .map((c) => `${c.category} (${c.have} of ${c.need})`)
    expect(thin).toEqual([])
  })

  it('places CI/CD in Containers, infrastructure and delivery and Honesty and ethics in Personal character', () => {
    const ci = BROAD_TERMS.technical.find((t) => t.name === 'CI/CD')!
    expect(broadTermCategory('technical', ci)).toBe('Containers, infrastructure and delivery')
    const honest = BROAD_TERMS.values.find((t) => t.name === 'Honesty and ethics')!
    expect(broadTermCategory('values', honest)).toBe('Personal character')
  })

  it('leaves the cited catalogs untouched', () => {
    const names = new Set(KINDS.flatMap((k) => BROAD_TERMS[k].map((t) => norm(t.name))))
    for (const k of KINDS) for (const c of categoriesOf(k)) expect(c.words.filter((n) => names.has(norm(n)))).toEqual([])
  })

  it.each(KINDS)('%s: each definition names every covered option', (kind) => {
    for (const t of BROAD_TERMS[kind]) {
      const text = getDefinition(kind, t.name) ?? ''
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

describe('grouping options under broader terms', () => {
  it.each(KINDS)('%s: every option is shown once, and the flat words match categoriesWithBroadTerms', (kind) => {
    const grouped = groupedCategories(kind)
    const shown = grouped.flatMap((c) => [...c.groups.flatMap((g) => [g.term, ...g.options]), ...c.others])
    expect(new Set(shown).size).toBe(shown.length)
    const flat = categoriesWithBroadTerms(kind).flatMap((c) => c.words)
    expect([...shown].sort()).toEqual([...flat].sort())
    grouped.forEach((c, i) => {
      const own = new Set(categoriesOf(kind)[i].words)
      for (const g of c.groups) for (const o of g.options) expect(own.has(o), `${g.term} / ${o}`).toBe(true)
    })
  })

  it('puts an option covered by two terms under the one with the shorter covers list', () => {
    const rider = groupedCategories('technical').find((c) => c.category === 'Editors and IDEs')!
    const owner = rider.groups.find((g) => g.options.includes('Rider'))!
    expect(owner.term).toBe('Platform and enterprise IDEs')
    expect(rider.groups.find((g) => g.term === 'JetBrains IDEs')!.options).not.toContain('Rider')
  })

  it('keeps covered options from other categories out of the group', () => {
    const iac = BROAD_TERMS.technical.find((t) => t.name === 'Infrastructure automation tools')!
    expect(iac.covers).toContain('HCL')
    const group = groupedCategories('technical').flatMap((c) => c.groups).find((g) => g.term === iac.name)!
    expect(group.options).not.toContain('HCL')
  })

  it.each(KINDS)('%s: every broader term heads at least two options', (kind) => {
    const thin = groupedCategories(kind).flatMap((c) => c.groups).filter((g) => g.options.length < 2).map((g) => `${g.term} (${g.options.length})`)
    expect(thin).toEqual([])
  })
})
