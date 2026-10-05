import { buildProfile, escapeMarkdown, toJson, toMarkdown } from './export'
import { initialState, reducer, type Action } from './state/profile'

const run = (actions: Action[]) => actions.reduce(reducer, initialState)

const state = run([
  { type: 'toggleValue', name: 'Integrity' },
  { type: 'addCustomValue', text: 'Craft "quality" *always*' },
  { type: 'toggleSkill', section: 'technical', name: 'Python' },
  { type: 'toggleSkill', section: 'technical', name: 'Go' },
  { type: 'addCustomSkill', section: 'technical', text: 'C# & café' },
  { type: 'setScore', section: 'technical', name: 'Python', score: 9 },
  { type: 'setScore', section: 'technical', name: 'C# & café', score: 9 },
  { type: 'toggleSkill', section: 'engineering', name: 'Scrum' },
  { type: 'toggleSkill', section: 'interpersonal', name: 'Teamwork' },
  { type: 'setScore', section: 'interpersonal', name: 'Teamwork', score: 7 },
])
const profile = buildProfile(state)

describe('buildProfile', () => {
  it('orders skills by score descending then name', () => {
    expect(profile.skills.technical).toEqual([
      { name: 'C# & café', score: 9 },
      { name: 'Python', score: 9 },
      { name: 'Go', score: 5 },
    ])
  })
})

describe('toJson', () => {
  const json = JSON.parse(toJson(profile, new Date('2026-01-02T03:04:05Z')))

  it('has the documented structure', () => {
    expect(json.exportedAt).toBe('2026-01-02T03:04:05.000Z')
    expect(json.values).toEqual(['Craft "quality" *always*', 'Integrity'])
    expect(Object.keys(json.skills)).toEqual(['technical', 'engineering', 'interpersonal'])
    expect(json.skills.engineering).toEqual([{ name: 'Scrum', score: 5 }])
    expect(json.skills.interpersonal).toEqual([{ name: 'Teamwork', score: 7 }])
  })

  it('includes custom entries and survives special characters', () => {
    expect(json.skills.technical[0].name).toBe('C# & café')
    expect(json.values).toContain('Craft "quality" *always*')
  })
})

describe('toMarkdown', () => {
  const md = toMarkdown(profile)

  it('has a title, values section and one section per skill group', () => {
    expect(md).toContain('# Profile')
    expect(md).toContain('## Values')
    expect(md).toContain('## Technical development')
    expect(md).toContain('## Engineering')
    expect(md).toContain('## Interpersonal')
    expect(md).toContain('- Python — 9/10')
    expect(md).toContain('- Scrum — 5/10')
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
