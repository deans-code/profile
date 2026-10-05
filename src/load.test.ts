import { buildProfile, toJson } from './export'
import { MAX_ENTRIES, MAX_FILE_BYTES, MAX_NAME_LENGTH, parseProfile, profileToState } from './load'
import { initialState, reducer, getScore, type Action } from './state/profile'

const run = (actions: Action[]) => actions.reduce(reducer, initialState)

const file = (overrides: Record<string, unknown> = {}) =>
  JSON.stringify({
    exportedAt: '2026-01-02T03:04:05.000Z',
    values: ['Integrity'],
    skills: {
      technical: [{ name: 'Python', score: 8 }],
      engineering: [{ name: 'Scrum', score: 5 }],
      interpersonal: [{ name: 'Teamwork', score: 7 }],
    },
    ...overrides,
  })

const ok = (text: string) => {
  const r = parseProfile(text)
  if (!r.ok) throw new Error(r.error)
  return r.profile
}
const error = (text: string) => {
  const r = parseProfile(text)
  if (r.ok) throw new Error('expected a rejection')
  return r.error
}

describe('parseProfile', () => {
  it('reads a valid file', () => {
    expect(ok(file())).toEqual({
      values: ['Integrity'],
      skills: {
        technical: [{ name: 'Python', score: 8 }],
        engineering: [{ name: 'Scrum', score: 5 }],
        interpersonal: [{ name: 'Teamwork', score: 7 }],
      },
    })
  })

  it('round-trips with toJson', () => {
    const state = run([
      { type: 'toggleValue', name: 'Integrity' },
      { type: 'addCustomValue', text: 'Grit "quoted" *star*' },
      { type: 'toggleSkill', section: 'technical', name: 'Python' },
      { type: 'addCustomSkill', section: 'technical', text: 'C# & café' },
      { type: 'setScore', section: 'technical', name: 'Python', score: 9 },
      { type: 'toggleSkill', section: 'engineering', name: 'Scrum' },
      { type: 'toggleSkill', section: 'interpersonal', name: 'Teamwork' },
      { type: 'setScore', section: 'interpersonal', name: 'Teamwork', score: 2 },
    ])
    const original = buildProfile(state)
    const loaded = profileToState(ok(toJson(original)))
    const again = buildProfile({ ...state, ...loaded })
    expect(again).toEqual(original)
    expect(toJson(again, new Date(0))).toBe(toJson(original, new Date(0)))
  })

  it('ignores unknown properties and the timestamp, trims, and removes case-insensitive duplicates', () => {
    const p = ok(
      file({
        extra: { anything: true },
        values: ['  Integrity ', 'integrity', 'Trust'],
        skills: {
          technical: [
            { name: 'Python', score: 8, note: 'x' },
            { name: ' python ', score: 2 },
          ],
          engineering: [],
          interpersonal: [],
        },
      }),
    )
    expect(p.values).toEqual(['Integrity', 'Trust'])
    expect(p.skills.technical).toEqual([{ name: 'Python', score: 8 }])
    expect(p.skills.engineering).toEqual([])
  })

  it('loads lists above the selection limit in full', () => {
    const values = Array.from({ length: 12 }, (_, i) => `Value ${i}`)
    expect(ok(file({ values })).values).toHaveLength(12)
  })

  describe('rejections', () => {
    it('not JSON', () => expect(error('hello world')).toMatch(/not valid JSON/))
    it('empty text', () => expect(error('')).toMatch(/not valid JSON/))
    it.each([['null'], ['[]'], ['42'], ['"text"']])('JSON that is not an object (%s)', (t) =>
      expect(error(t)).toMatch(/not a profile/),
    )
    it('missing skills', () => expect(error(JSON.stringify({ values: ['a'] }))).toMatch(/not a profile/))
    it('missing values', () => expect(error(JSON.stringify({ skills: {} }))).toMatch(/not a profile/))
    it('a missing skills section', () =>
      expect(error(file({ skills: { technical: [], engineering: [] } }))).toMatch(/interpersonal skills are missing/))

    it('non-text value names', () => expect(error(file({ values: ['ok', 3] }))).toMatch(/not text/))
    it('non-text skill names', () =>
      expect(
        error(file({ skills: { technical: [{ name: 7, score: 5 }], engineering: [], interpersonal: [] } })),
      ).toMatch(/not text/))
    it('empty names', () => expect(error(file({ values: ['  '] }))).toMatch(/empty name/))
    it('entries that are not skills', () =>
      expect(error(file({ skills: { technical: ['Python'], engineering: [], interpersonal: [] } }))).toMatch(
        /not a skill/,
      ))

    it.each([[11], [0], [4.5], ['7'], [null], [-1]])('score %j, naming the skill', (score) => {
      const text = file({ skills: { technical: [{ name: 'Python', score }], engineering: [], interpersonal: [] } })
      expect(error(text)).toMatch(/score for "Python" must be a whole number from 1 to 10/)
    })

    it('too many entries', () => {
      const values = Array.from({ length: MAX_ENTRIES + 1 }, (_, i) => `v${i}`)
      expect(error(file({ values }))).toMatch(/more than 100/)
      const skills = {
        technical: Array.from({ length: MAX_ENTRIES + 1 }, (_, i) => ({ name: `s${i}`, score: 5 })),
        engineering: [],
        interpersonal: [],
      }
      expect(error(file({ skills }))).toMatch(/more than 100/)
    })

    it('names that are too long', () =>
      expect(error(file({ values: ['x'.repeat(MAX_NAME_LENGTH + 1)] }))).toMatch(/longer than 100/))

    it('oversized files, before parsing', () =>
      expect(error('x'.repeat(MAX_FILE_BYTES + 1))).toMatch(/larger than 1 MB/))
  })
})

describe('profileToState', () => {
  it('restores built-ins with their spelling and others as custom entries', () => {
    const p = ok(
      file({
        values: ['integrity', 'Grit'],
        skills: {
          technical: [
            { name: 'python', score: 8 },
            { name: 'Zig', score: 3 },
          ],
          engineering: [],
          interpersonal: [],
        },
      }),
    )
    const s = { ...initialState, ...profileToState(p) }
    expect(s.selectedValues).toEqual(['Integrity', 'Grit'])
    expect(s.customValues).toEqual(['Grit'])
    expect(s.selectedSkills.technical).toEqual(['Python', 'Zig'])
    expect(s.customSkills.technical).toEqual(['Zig'])
    expect(getScore(s, 'technical', 'Python')).toBe(8)
    expect(getScore(s, 'technical', 'Zig')).toBe(3)
  })

  it('does not store default scores and keeps sections separate', () => {
    const s = { ...initialState, ...profileToState(ok(file())) }
    expect(s.scores.engineering).toEqual({})
    expect(s.customSkills.engineering).toEqual([])
    expect(s.selectedSkills.interpersonal).toEqual(['Teamwork'])
  })
})
