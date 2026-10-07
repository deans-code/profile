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

describe('technical development catalog', () => {
  const names = catalogSkillNames('technical')

  it('has no AI and machine learning category', () => {
    expect(CATALOGS.technical.map((c) => norm(c.category))).not.toContain('ai and machine learning')
  })

  it('has no AI tool, model or provider entries', () => {
    const banned = ['prompt', 'llm', 'machine learning', 'copilot', 'claude', 'openai', 'ollama']
    expect(names.filter((n) => banned.some((b) => norm(n).includes(b)))).toEqual([])
  })

  it('has hands-on skills an AI engineering team relies on', () => {
    for (const needle of ['gpu', 'cuda', 'jupyter', 'pandas', 'vector', 'pipelines', 'observability', 'kubernetes']) {
      expect(names.some((n) => norm(n).includes(needle))).toBe(true)
    }
  })

  it('keeps the original names that remain', () => {
    for (const name of ['TypeScript', 'Python', 'Docker', 'Kubernetes', 'Data analysis', 'SQL']) {
      expect(names).toContain(name)
    }
  })
})

describe('AI engineering catalog', () => {
  const names = catalogSkillNames('ai').map(norm)
  const category = (needle: string) => CATALOGS.ai.find((c) => norm(c.category).includes(needle))

  it('has at least ten categories', () => {
    expect(CATALOGS.ai.length).toBeGreaterThanOrEqual(10)
  })

  it.each([
    'approaches',
    'frameworks',
    'terminal',
    'desktop',
    'plugins',
    'open-source',
    'closed-model',
    'inference providers',
    'open-weight models',
    'local runtimes',
    'local hardware',
    'agent extensibility',
  ])('has a %s category with at least four entries', (needle) => {
    expect(category(needle)?.skills.length ?? 0).toBeGreaterThanOrEqual(4)
  })

  it.each([
    'Vibe coding',
    'Spec-driven development',
    'Superpowers',
    'OpenSpec',
    'OpenCode',
    'Fireworks AI',
    'OpenRouter',
    'Ollama',
    'llama.cpp',
    'LM Studio',
    'Running open-weight models on local hardware',
  ])('includes %s', (name) => {
    expect(names).toContain(norm(name))
  })

  it('puts the named entries under the matching topics', () => {
    expect(category('inference providers')?.skills).toEqual(expect.arrayContaining(['OpenRouter', 'Fireworks AI']))
    expect(category('local runtimes')?.skills).toEqual(expect.arrayContaining(['Ollama', 'llama.cpp', 'LM Studio']))
    expect(category('local hardware')?.skills).toContain('Running open-weight models on local hardware')
  })

  it('is large', () => {
    expect(names.length).toBeGreaterThanOrEqual(100)
  })
})
