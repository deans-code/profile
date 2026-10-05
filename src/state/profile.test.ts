import {
  MAX_SELECTION,
  initialState,
  isFull,
  limitFor,
  loadLanding,
  overBy,
  reducer,
  getScore,
  stepBlockedReason,
  type Action,
  type ProfileState,
} from './profile'
import { COMMON_VALUES } from '../data/values'
import { catalogSkillNames } from '../data/skills'

const run = (actions: Action[], from: ProfileState = initialState) => actions.reduce(reducer, from)

describe('values', () => {
  it('selects and deselects', () => {
    const s1 = run([{ type: 'toggleValue', name: 'Integrity' }])
    expect(s1.selectedValues).toEqual(['Integrity'])
    expect(run([{ type: 'toggleValue', name: 'Integrity' }], s1).selectedValues).toEqual([])
  })

  it('adds a custom value as selected', () => {
    const s = run([{ type: 'addCustomValue', text: '  Grit ' }])
    expect(s.customValues).toEqual(['Grit'])
    expect(s.selectedValues).toEqual(['Grit'])
  })

  it('ignores empty entries', () => {
    expect(run([{ type: 'addCustomValue', text: '   ' }])).toBe(initialState)
  })

  it('selects the existing value instead of adding a duplicate', () => {
    const s = run([{ type: 'addCustomValue', text: ' integrity ' }])
    expect(s.customValues).toEqual([])
    expect(s.selectedValues).toEqual(['Integrity'])
  })

  it('does not duplicate a custom value', () => {
    const s = run([
      { type: 'addCustomValue', text: 'Grit' },
      { type: 'addCustomValue', text: 'GRIT' },
    ])
    expect(s.customValues).toEqual(['Grit'])
    expect(s.selectedValues).toEqual(['Grit'])
  })

  it('removes a custom value from cloud and selection', () => {
    const s = run([
      { type: 'addCustomValue', text: 'Grit' },
      { type: 'removeCustomValue', name: 'Grit' },
    ])
    expect(s.customValues).toEqual([])
    expect(s.selectedValues).toEqual([])
  })
})

describe('skills', () => {
  it('selects, deselects and keeps sections separate', () => {
    const s = run([{ type: 'toggleSkill', section: 'technical', name: 'Python' }])
    expect(s.selectedSkills.technical).toEqual(['Python'])
    expect(s.selectedSkills.engineering).toEqual([])
    const back = run([{ type: 'toggleSkill', section: 'technical', name: 'Python' }], s)
    expect(back.selectedSkills.technical).toEqual([])
  })

  it('adds a custom skill to one section only', () => {
    const s = run([{ type: 'addCustomSkill', section: 'technical', text: 'Zig' }])
    expect(s.customSkills.technical).toEqual(['Zig'])
    expect(s.selectedSkills.technical).toEqual(['Zig'])
    expect(s.customSkills.engineering).toEqual([])
  })

  it('rejects empty and duplicate custom skills, selecting the existing match', () => {
    expect(run([{ type: 'addCustomSkill', section: 'technical', text: ' ' }])).toBe(initialState)
    const s = run([{ type: 'addCustomSkill', section: 'technical', text: ' python ' }])
    expect(s.customSkills.technical).toEqual([])
    expect(s.selectedSkills.technical).toEqual(['Python'])
  })

  it('removes a custom skill and its score', () => {
    const s = run([
      { type: 'addCustomSkill', section: 'technical', text: 'Zig' },
      { type: 'setScore', section: 'technical', name: 'Zig', score: 9 },
      { type: 'removeCustomSkill', section: 'technical', name: 'Zig' },
    ])
    expect(s.customSkills.technical).toEqual([])
    expect(s.selectedSkills.technical).toEqual([])
    expect(s.scores.technical).toEqual({})
  })
})

describe('scores', () => {
  const base = run([{ type: 'toggleSkill', section: 'technical', name: 'Python' }])

  it('defaults to 5', () => {
    expect(getScore(base, 'technical', 'Python')).toBe(5)
  })

  it('sets and clamps to 1-10 whole numbers', () => {
    const set = (score: number) =>
      getScore(run([{ type: 'setScore', section: 'technical', name: 'Python', score }], base), 'technical', 'Python')
    expect(set(8)).toBe(8)
    expect(set(0)).toBe(1)
    expect(set(99)).toBe(10)
    expect(set(6.4)).toBe(6)
  })

  it('ignores scores for unselected skills', () => {
    expect(run([{ type: 'setScore', section: 'technical', name: 'Go', score: 9 }], base)).toBe(base)
  })

  it('resets when deselected and reselected', () => {
    const s = run(
      [
        { type: 'setScore', section: 'technical', name: 'Python', score: 9 },
        { type: 'toggleSkill', section: 'technical', name: 'Python' },
        { type: 'toggleSkill', section: 'technical', name: 'Python' },
      ],
      base,
    )
    expect(getScore(s, 'technical', 'Python')).toBe(5)
  })

  it('keeps existing scores when another skill is added', () => {
    const s = run(
      [
        { type: 'setScore', section: 'technical', name: 'Python', score: 9 },
        { type: 'toggleSkill', section: 'technical', name: 'Go' },
      ],
      base,
    )
    expect(getScore(s, 'technical', 'Python')).toBe(9)
    expect(getScore(s, 'technical', 'Go')).toBe(5)
  })
})

describe('step gating', () => {
  const withValue = run([{ type: 'toggleValue', name: 'Integrity' }])
  const oneSection = run([{ type: 'toggleSkill', section: 'technical', name: 'Python' }], withValue)
  const complete = run(
    [
      { type: 'toggleSkill', section: 'engineering', name: 'Scrum' },
      { type: 'toggleSkill', section: 'interpersonal', name: 'Teamwork' },
    ],
    oneSection,
  )

  it('blocks leaving values until one is selected', () => {
    expect(stepBlockedReason(initialState, 'technical')).not.toBeNull()
    expect(run([{ type: 'goTo', step: 'technical' }]).step).toBe('values')
    expect(run([{ type: 'goTo', step: 'technical' }], withValue).step).toBe('technical')
  })

  it('blocks scoring until every section has a selection and names the missing ones', () => {
    expect(stepBlockedReason(oneSection, 'scoring')).toMatch(/engineering, interpersonal/)
    expect(run([{ type: 'goTo', step: 'scoring' }], oneSection).step).toBe('values')
    expect(run([{ type: 'goTo', step: 'scoring' }], complete).step).toBe('scoring')
  })

  it('retains selections when navigating back', () => {
    const s = run(
      [
        { type: 'goTo', step: 'scoring' },
        { type: 'goTo', step: 'values' },
      ],
      complete,
    )
    expect(s.selectedValues).toEqual(['Integrity'])
    expect(s.selectedSkills.technical).toEqual(['Python'])
  })
})

describe('selection limit', () => {
  const values = COMMON_VALUES.map((v) => v.name)
  const technical = catalogSkillNames('technical')
  const pick = (n: number, names: string[]): Action[] =>
    names.slice(0, n).map((name) => ({ type: 'toggleValue', name }))
  const pickSkills = (n: number): Action[] =>
    technical.slice(0, n).map((name) => ({ type: 'toggleSkill', section: 'technical', name }))

  it('stops selecting values at the limit', () => {
    const s = run([...pick(MAX_SELECTION, values), { type: 'toggleValue', name: values[MAX_SELECTION] }])
    expect(s.selectedValues).toHaveLength(MAX_SELECTION)
    expect(s.selectedValues).not.toContain(values[MAX_SELECTION])
  })

  it('does not limit skills: 30 can be selected in a section', () => {
    const s = run(pickSkills(30))
    expect(s.selectedSkills.technical).toHaveLength(30)
  })

  it('limits only the values page; skills are unaffected by a full values page', () => {
    const s = run([
      ...pick(MAX_SELECTION, values),
      ...pickSkills(MAX_SELECTION + 5),
      { type: 'toggleSkill', section: 'engineering', name: 'Scrum' },
    ])
    expect(s.selectedValues).toHaveLength(MAX_SELECTION)
    expect(s.selectedSkills.technical).toHaveLength(MAX_SELECTION + 5)
    expect(s.selectedSkills.engineering).toEqual(['Scrum'])
  })

  it('reports limits per page: values only', () => {
    expect(limitFor('values')).toBe(MAX_SELECTION)
    expect(limitFor('technical')).toBeUndefined()
    expect(limitFor('engineering')).toBeUndefined()
    expect(limitFor('interpersonal')).toBeUndefined()
    expect(isFull(run(pickSkills(40)), 'technical')).toBe(false)
  })

  it('counts custom entries and rejects one past the limit', () => {
    const s = run([
      ...pick(MAX_SELECTION - 1, values),
      { type: 'addCustomValue', text: 'Grit' },
      { type: 'addCustomValue', text: 'Mettle' },
    ])
    expect(s.selectedValues).toHaveLength(MAX_SELECTION)
    expect(s.selectedValues).toContain('Grit')
    expect(s.customValues).toEqual(['Grit'])
  })

  it('does not select an existing match for a duplicate custom entry when full', () => {
    const s = run([
      ...pick(MAX_SELECTION, values),
      { type: 'addCustomValue', text: values[MAX_SELECTION].toUpperCase() },
    ])
    expect(s.selectedValues).toHaveLength(MAX_SELECTION)
    expect(s.selectedValues).not.toContain(values[MAX_SELECTION])
  })

  it('accepts custom skills past ten', () => {
    const s = run([...pickSkills(15), { type: 'addCustomSkill', section: 'technical', text: 'Zig' }])
    expect(s.customSkills.technical).toEqual(['Zig'])
    expect(s.selectedSkills.technical).toHaveLength(16)
    const dup = run([
      ...pickSkills(15),
      { type: 'addCustomSkill', section: 'technical', text: technical[20].toUpperCase() },
    ])
    expect(dup.selectedSkills.technical).toContain(technical[20])
  })

  it('lets a word be swapped after deselecting', () => {
    const s = run([
      ...pick(MAX_SELECTION, values),
      { type: 'toggleValue', name: values[0] },
      { type: 'toggleValue', name: values[MAX_SELECTION] },
    ])
    expect(s.selectedValues).toHaveLength(MAX_SELECTION)
    expect(s.selectedValues).toContain(values[MAX_SELECTION])
    expect(s.selectedValues).not.toContain(values[0])
  })

  describe('over-limit pages (for example a loaded profile)', () => {
    const over: ProfileState = { ...initialState, selectedValues: values.slice(0, MAX_SELECTION + 2) }

    it('reports how many to remove', () => {
      expect(overBy(over, 'values')).toBe(2)
      expect(overBy(initialState, 'values')).toBe(0)
    })

    it('allows deselecting but not selecting', () => {
      expect(reducer(over, { type: 'toggleValue', name: values[MAX_SELECTION + 2] })).toBe(over)
      expect(reducer(over, { type: 'toggleValue', name: values[0] }).selectedValues).toHaveLength(MAX_SELECTION + 1)
    })

    it('blocks moving forward, naming the page and count, but not moving back', () => {
      expect(stepBlockedReason(over, 'technical')).toMatch(/Deselect 2 words on the values page/)
      expect(reducer(over, { type: 'goTo', step: 'technical' }).step).toBe('values')
      const onTechnical = { ...over, step: 'technical' as const }
      expect(reducer(onTechnical, { type: 'goTo', step: 'values' }).step).toBe('values')
    })

    it('does not block later steps for a skill page holding more than ten', () => {
      const s: ProfileState = {
        ...initialState,
        selectedValues: ['Integrity'],
        selectedSkills: {
          technical: technical.slice(0, 40),
          engineering: ['Scrum'],
          interpersonal: ['Teamwork'],
        },
      }
      expect(overBy(s, 'technical')).toBe(0)
      expect(stepBlockedReason(s, 'engineering')).toBeNull()
      expect(stepBlockedReason(s, 'card')).toBeNull()
    })

    it('unblocks once within the limit', () => {
      const fixed = run(
        [
          { type: 'toggleValue', name: values[0] },
          { type: 'toggleValue', name: values[1] },
        ],
        over,
      )
      expect(stepBlockedReason(fixed, 'technical')).toBeNull()
    })
  })
})

describe('loadProfile', () => {
  const values = COMMON_VALUES.map((v) => v.name)
  const complete = {
    selectedValues: ['Integrity'],
    customValues: [],
    selectedSkills: { technical: ['Python'], engineering: ['Scrum'], interpersonal: ['Teamwork'] },
    customSkills: { technical: [], engineering: [], interpersonal: [] },
    scores: { technical: { Python: 9 }, engineering: {}, interpersonal: {} },
  }

  it('replaces everything at once and lands on the profile card when complete', () => {
    const before = run([
      { type: 'toggleValue', name: 'Trust' },
      { type: 'toggleSkill', section: 'technical', name: 'Go' },
      { type: 'setScore', section: 'technical', name: 'Go', score: 2 },
    ])
    const s = reducer(before, { type: 'loadProfile', profile: complete })
    expect(s.step).toBe('card')
    expect(s.selectedValues).toEqual(['Integrity'])
    expect(s.selectedSkills.technical).toEqual(['Python'])
    expect(getScore(s, 'technical', 'Python')).toBe(9)
    expect(s.scores.technical).toEqual({ Python: 9 })
  })

  it('opens the values page for an over-limit values list, keeping every value', () => {
    const profile = { ...complete, selectedValues: values.slice(0, MAX_SELECTION + 2) }
    expect(loadLanding(profile).notice).toMatch(/Deselect 2 words on the values page/)
    const s = reducer(initialState, { type: 'loadProfile', profile })
    expect(s.step).toBe('values')
    expect(s.selectedValues).toHaveLength(MAX_SELECTION + 2)
  })

  it('loads many skills without asking to deselect, but still gates over-limit values', () => {
    const many = {
      ...complete,
      selectedSkills: { ...complete.selectedSkills, engineering: catalogSkillNames('engineering').slice(0, 30) },
    }
    expect(loadLanding(many)).toEqual({ step: 'card', notice: null })
    const both = { ...many, selectedValues: values.slice(0, MAX_SELECTION + 2) }
    const landing = loadLanding(both)
    expect(landing.step).toBe('values')
    expect(landing.notice).toMatch(/Deselect 2 words on the values page/)
    expect(reducer(initialState, { type: 'loadProfile', profile: both }).selectedSkills.engineering).toHaveLength(30)
  })

  it('opens the values page when there are no values, and the first empty section otherwise', () => {
    expect(reducer(initialState, { type: 'loadProfile', profile: { ...complete, selectedValues: [] } }).step).toBe(
      'values',
    )
    const noEngineering = { ...complete, selectedSkills: { ...complete.selectedSkills, engineering: [] } }
    const landing = loadLanding(noEngineering)
    expect(landing.step).toBe('engineering')
    expect(landing.notice).toMatch(/engineering/)
  })

  it('has no notice when the profile is complete', () => {
    expect(loadLanding(complete)).toEqual({ step: 'card', notice: null })
  })
})
