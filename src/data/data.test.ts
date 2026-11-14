import { CATALOGS, SECTIONS, catalogSkillNames } from './skills'
import { COMMON_VALUES, VALUE_CATEGORIES } from './values'

const norm = (s: string) => s.trim().toLowerCase()

describe('values data', () => {
  it('has at least 60 values, unique ignoring case', () => {
    expect(COMMON_VALUES.length).toBeGreaterThanOrEqual(60)
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
  it.each(SECTIONS)('%s has at least 25 skills across at least 5 categories', (section) => {
    expect(catalogSkillNames(section).length).toBeGreaterThanOrEqual(25)
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

  it('offers widely used technologies in each category', () => {
    for (const name of ['TypeScript', 'Python', 'SQL', 'Docker', 'Kubernetes', 'PostgreSQL', 'React', 'npm', 'Visual Studio Code']) {
      expect(names).toContain(name)
    }
  })
})

describe('AI engineering catalog', () => {
  const names = catalogSkillNames('ai').map(norm)
  const category = (needle: string) => CATALOGS.ai.find((c) => norm(c.category).includes(needle))

  it('has at least six categories', () => {
    expect(CATALOGS.ai.length).toBeGreaterThanOrEqual(6)
  })

  it.each(['model providers', 'approaches', 'inference platforms', 'ai coding tools', 'agents and extensibility', 'open-weight models'])(
    'has a %s category with at least three entries',
    (needle) => {
      expect(category(needle)?.skills.length ?? 0).toBeGreaterThanOrEqual(3)
    },
  )

  it.each(['Anthropic', 'OpenAI', 'Claude Code', 'OpenRouter', 'OpenCode', 'Agent sandboxing', 'Open-weight models'])(
    'includes %s',
    (name) => {
      expect(names).toContain(norm(name))
    },
  )

  it('puts the named entries under the matching topics', () => {
    expect(category('inference platforms')?.skills).toEqual(expect.arrayContaining(['OpenRouter', 'LiteLLM']))
    expect(category('ai coding tools')?.skills).toEqual(expect.arrayContaining(['Claude Code', 'OpenAI Codex']))
  })

  it('has no editor already offered on the Technical tab', () => {
    expect(names).not.toContain('cursor')
    expect(names).not.toContain('zed')
  })
})

describe('technical catalog sourced from surveys', () => {
  const technical = CATALOGS.technical
  const names = catalogSkillNames('technical')
  const category = (name: string) => technical.find((c) => c.category === name)

  it('offers the surveyed technologies', () => {
    for (const name of ['PowerShell', 'jQuery', 'Express', 'ASP.NET Core', 'MariaDB', 'OpenSearch', 'Firebase', 'Vercel', 'Podman', 'Datadog', 'pnpm']) {
      expect(names).toContain(name)
    }
  })

  it('groups tools into their categories', () => {
    expect(category('Testing and code quality')?.skills).toEqual(
      expect.arrayContaining(['Playwright', 'Jest', 'Vitest', 'pytest', 'JUnit', 'Postman', 'ESLint', 'SonarQube']),
    )
    expect(category('Editors and IDEs')?.skills).toEqual(
      expect.arrayContaining(['Visual Studio Code', 'Visual Studio', 'IntelliJ IDEA', 'Vim', 'Neovim']),
    )
    expect(category('Package managers')?.skills).toEqual(expect.arrayContaining(['npm', 'pnpm', 'pip', 'uv', 'Homebrew']))
  })

  it('lists Playwright once, only under testing', () => {
    expect(names.filter((n) => n === 'Playwright')).toHaveLength(1)
    expect(category('Web frameworks and technologies')?.skills).not.toContain('Playwright')
  })
})
