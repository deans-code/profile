import { buildProfile, escapeMarkdown, toJson, toMarkdown } from './export'
import { initialState, reducer, type Action } from './state/profile'

const run = (actions: Action[]) => actions.reduce(reducer, initialState)

const state = run([
  { type: 'toggleValue', name: 'Integrity' },
  { type: 'addCustomValue', text: 'Craft "quality" *always*' },
  { type: 'toggleSkill', section: 'technical', name: 'Python' },
  { type: 'toggleSkill', section: 'technical', name: 'Go' },
  { type: 'addCustomSkill', section: 'technical', text: 'C# & café' },
  { type: 'toggleSkill', section: 'engineering', name: 'Scrum' },
  { type: 'toggleValue', name: 'Curiosity' },
  { type: 'setMode', mode: 'desired' },
  { type: 'toggleSkill', section: 'technical', name: 'Python' },
  { type: 'toggleSkill', section: 'interpersonal', name: 'Teamwork' },
  { type: 'toggleSkill', section: 'ai', name: 'OpenRouter' },
  { type: 'toggleSkill', section: 'ai', name: 'Ollama' },
])
const profile = buildProfile(state)

describe('buildProfile', () => {
  it('sorts each list alphabetically, keeps skill options apart and has one values list', () => {
    expect(profile.skills.technical).toEqual({ experience: ['C# & café', 'Go', 'Python'], desired: ['Python'] })
    expect(profile.skills.ai).toEqual({ experience: [], desired: ['Ollama', 'OpenRouter'] })
    expect(profile.values).toEqual(['Craft "quality" *always*', 'Curiosity', 'Integrity'])
  })
})

describe('toJson', () => {
  const text = toJson(profile, new Date('2026-01-02T03:04:05Z'))
  const json = JSON.parse(text)

  it('has the documented structure', () => {
    expect(json.exportedAt).toBe('2026-01-02T03:04:05.000Z')
    expect(json.values).toEqual(['Craft "quality" *always*', 'Curiosity', 'Integrity'])
    expect(Object.keys(json.skills)).toEqual(['technical', 'engineering', 'interpersonal', 'ai'])
    expect(json.skills.engineering).toEqual({ experience: ['Scrum'], desired: [] })
    expect(json.skills.ai).toEqual({ experience: [], desired: ['Ollama', 'OpenRouter'] })
  })

  it('has plain names and no scores', () => {
    expect(text).not.toMatch(/score/i)
    for (const section of Object.values<{ experience: unknown[]; desired: unknown[] }>(json.skills)) {
      for (const name of [...section.experience, ...section.desired]) expect(typeof name).toBe('string')
    }
  })

  it('includes custom entries and survives special characters', () => {
    expect(json.skills.technical.experience).toContain('C# & café')
    expect(json.values).toContain('Craft "quality" *always*')
  })
})

describe('toMarkdown', () => {
  const md = toMarkdown(profile)

  it('has a title, values section and one section per page', () => {
    expect(md).toContain('# Profile')
    expect(md).toContain('## Values')
    expect(md).toContain('## Technical development')
    expect(md).toContain('## Engineering')
    expect(md).toContain('## Interpersonal')
    expect(md).toContain('## AI engineering')
  })

  it('lists values once, without option headings', () => {
    const values = md.slice(md.indexOf('## Values'), md.indexOf('## Technical development'))
    expect(values).toContain('- Curiosity')
    expect(values).toContain('- Integrity')
    expect(values).not.toContain('###')
  })

  it('lists previous and desired experience for skills, omitting empty lists, with no scores', () => {
    expect(md).toContain('### Previous experience')
    expect(md).toContain('### Desired experience')
    expect(md).toContain('- Python')
    expect(md).not.toContain('/10')
    const ai = md.slice(md.indexOf('## AI engineering'))
    expect(ai).toContain('### Desired experience')
    expect(ai).not.toContain('### Previous experience')
  })

  it('escapes Markdown syntax in user text and keeps non-ASCII', () => {
    expect(md).toContain('Craft "quality" \\*always\\*')
    expect(md).toContain('C\\# \\& café')
  })
})

describe('escapeMarkdown', () => {
  it('escapes syntax characters and flattens newlines', () => {
    expect(escapeMarkdown('# [x](y) `z` <b>\nnext')).toBe('\\# \\[x\\]\\(y\\) \\`z\\` \\<b\\> next')
  })
})
