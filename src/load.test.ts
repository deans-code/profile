import { buildProfile, toJson } from './export'
import { MAX_ENTRIES, MAX_FILE_BYTES, MAX_NAME_LENGTH, parseProfile, profileToState } from './load'
import { initialState, reducer, type Action } from './state/profile'

const run = (actions: Action[]) => actions.reduce(reducer, initialState)

const lists = (experience: string[], desired: string[] = []) => ({ experience, desired })

/** A file in the current format. */
const file = (overrides: Record<string, unknown> = {}) =>
  JSON.stringify({
    exportedAt: '2026-01-02T03:04:05.000Z',
    values: ['Integrity', 'Curiosity'],
    skills: {
      technical: lists(['Python']),
      engineering: lists([], ['Scrum']),
      interpersonal: lists(['Teamwork']),
      ai: lists(['Ollama'], ['OpenRouter']),
    },
    ...overrides,
  })

/** A file downloaded before experience options existed: scored skills and no AI page. */
const legacyFile = (overrides: Record<string, unknown> = {}) =>
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
      values: ['Integrity', 'Curiosity'],
      skills: {
        technical: lists(['Python']),
        engineering: lists([], ['Scrum']),
        interpersonal: lists(['Teamwork']),
        ai: lists(['Ollama'], ['OpenRouter']),
      },
    })
  })

  it('round-trips with toJson', () => {
    const state = run([
      { type: 'toggleValue', name: 'Integrity' },
      { type: 'addCustomValue', text: 'Grit "quoted" *star*' },
      { type: 'toggleSkill', section: 'technical', name: 'Python' },
      { type: 'addCustomSkill', section: 'technical', text: 'C# & café' },
      { type: 'toggleSkill', section: 'engineering', name: 'Scrum' },
      { type: 'setMode', mode: 'desired' },
      { type: 'toggleSkill', section: 'technical', name: 'Python' },
      { type: 'toggleSkill', section: 'interpersonal', name: 'Teamwork' },
      { type: 'toggleSkill', section: 'ai', name: 'Ollama' },
      { type: 'addCustomSkill', section: 'ai', text: 'My own tool' },
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
          technical: lists(['Python', ' python ']),
          engineering: lists([]),
          interpersonal: lists([]),
          ai: lists([]),
        },
      }),
    )
    expect(p.values).toEqual(['Integrity', 'Trust'])
    expect(p.skills.technical.experience).toEqual(['Python'])
    expect(p.skills.engineering).toEqual(lists([]))
  })

  it('loads lists above the selection limit in full', () => {
    const values = Array.from({ length: 8 }, (_, i) => `Value ${i}`)
    expect(ok(file({ values })).values).toHaveLength(8)
  })

  describe('values in the format with two options', () => {
    it('merges both lists into one, without duplicates ignoring case', () => {
      const p = ok(file({ values: { experience: ['Integrity'], desired: ['Curiosity', 'integrity'] } }))
      expect(p.values).toEqual(['Integrity', 'Curiosity'])
    })

    it('treats a missing list as empty', () => {
      expect(ok(file({ values: { experience: ['Integrity'] } })).values).toEqual(['Integrity'])
    })

    it('checks the entries of each list', () => {
      expect(error(file({ values: { experience: [], desired: [3] } }))).toMatch(/not text/)
      expect(error(file({ values: { experience: 'Integrity' } }))).toMatch(/not a list/)
    })
  })

  describe('files from before experience options', () => {
    it('loads values and skills as previous experience, ignoring scores, with an empty AI page', () => {
      expect(ok(legacyFile())).toEqual({
        values: ['Integrity'],
        skills: {
          technical: lists(['Python']),
          engineering: lists(['Scrum']),
          interpersonal: lists(['Teamwork']),
          ai: lists([]),
        },
      })
    })

    it('does not validate the old scores', () => {
      const text = legacyFile({
        skills: { technical: [{ name: 'Python', score: 99 }], engineering: [], interpersonal: [] },
      })
      expect(ok(text).skills.technical).toEqual(lists(['Python']))
    })

    it('loads names that are no longer built in as custom entries', () => {
      const text = legacyFile({
        skills: {
          technical: [{ name: 'Retired skill', score: 5 }],
          engineering: [],
          interpersonal: [],
        },
      })
      const state = profileToState(ok(text))
      expect(state.customSkills.technical).toEqual(['Retired skill'])
    })
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
      expect(error(file({ skills: { technical: lists([]), engineering: lists([]), ai: lists([]) } }))).toMatch(
        /interpersonal skills are missing/,
      ))

    it('non-text value names', () => expect(error(file({ values: ['ok', 3] }))).toMatch(/not text/))
    it('non-text skill names', () =>
      expect(
        error(
          file({
            skills: { technical: lists([7 as never]), engineering: lists([]), interpersonal: lists([]), ai: lists([]) },
          }),
        ),
      ).toMatch(/not text/))
    it('empty names', () => expect(error(file({ values: ['  '] }))).toMatch(/empty name/))
    it('values that are neither a list nor an object', () =>
      expect(error(file({ values: 'Integrity' }))).toMatch(/values list is not in a form/))
    it('legacy entries that are not skills', () =>
      expect(
        error(legacyFile({ skills: { technical: [{ name: 'Python' }, 5], engineering: [], interpersonal: [] } })),
      ).toMatch(/not a skill/))

    it('too many entries in any list', () => {
      const many = Array.from({ length: MAX_ENTRIES + 1 }, (_, i) => `v${i}`)
      expect(error(file({ values: many }))).toMatch(/more than 100/)
      expect(error(file({ values: { experience: [], desired: many } }))).toMatch(/more than 100/)
      const skills = { technical: lists([], many), engineering: lists([]), interpersonal: lists([]), ai: lists([]) }
      expect(error(file({ skills }))).toMatch(/more than 100/)
    })

    it('names that are too long', () =>
      expect(error(file({ values: ['x'.repeat(MAX_NAME_LENGTH + 1)] }))).toMatch(/longer than 100/))

    it('oversized files, before parsing', () =>
      expect(error('x'.repeat(MAX_FILE_BYTES + 1))).toMatch(/larger than 1 MB/))
  })
})

describe('profileToState', () => {
  it('restores built-ins with their spelling and others as custom entries, in the right option', () => {
    const p = ok(
      file({
        values: ['integrity', 'Grit'],
        skills: {
          technical: lists(['python'], ['Zig']),
          engineering: lists([]),
          interpersonal: lists([]),
          ai: lists(['ollama', 'Home-grown agent'], ['Home-grown agent']),
        },
      }),
    )
    const s = { ...initialState, ...profileToState(p) }
    expect(s.selectedValues).toEqual(['Integrity', 'Grit'])
    expect(s.customValues).toEqual(['Grit'])
    expect(s.selectedSkills.technical).toEqual(lists(['Python'], ['Zig']))
    expect(s.customSkills.technical).toEqual(['Zig'])
    expect(s.selectedSkills.ai).toEqual(lists(['Ollama', 'Home-grown agent'], ['Home-grown agent']))
    expect(s.customSkills.ai).toEqual(['Home-grown agent'])
  })

  it('keeps sections separate', () => {
    const s = { ...initialState, ...profileToState(ok(file())) }
    expect(s.customSkills.engineering).toEqual([])
    expect(s.selectedSkills.interpersonal).toEqual(lists(['Teamwork']))
    expect(s.selectedSkills.engineering).toEqual(lists([], ['Scrum']))
  })
})

// The built-in values as they were before values were grouped; saved profiles may contain any of them.
const ORIGINAL_VALUES = [
  'Integrity',
  'Honesty',
  'Respect',
  'Collaboration',
  'Learning',
  'Quality',
  'Trust',
  'Accountability',
  'Curiosity',
  'Autonomy',
  'Growth',
  'Empathy',
  'Innovation',
  'Transparency',
  'Craftsmanship',
  'Reliability',
  'Teamwork',
  'Excellence',
  'Ownership',
  'Simplicity',
  'Pragmatism',
  'Kindness',
  'Courage',
  'Fairness',
  'Diversity',
  'Inclusion',
  'Work-life balance',
  'Impact',
  'Openness',
  'Humility',
  'Perseverance',
  'Creativity',
  'Mentorship',
  'Sustainability',
  'Security',
  'Stability',
  'Freedom',
  'Fun',
  'Recognition',
  'Community',
  'Service',
  'Adaptability',
  'Focus',
  'Discipline',
  'Balance',
  'Generosity',
  'Patience',
  'Compassion',
  'Authenticity',
  'Ambition',
  'Efficiency',
  'Fairness in pay',
  'Continuous improvement',
  'Customer focus',
  'Open source',
  'Ethics',
  'Wellbeing',
  'Leadership',
  'Purpose',
  'Resilience',
]

describe('profiles saved before values were grouped', () => {
  it('restores every original value as a built-in value, not a custom one', () => {
    expect(ORIGINAL_VALUES).toHaveLength(60)
    const state = profileToState(ok(file({ values: ORIGINAL_VALUES.map((v) => v.toUpperCase()) })))
    expect(state.customValues).toEqual([])
    expect(state.selectedValues).toEqual(ORIGINAL_VALUES)
  })
})
