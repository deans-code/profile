import {
  MAX_SELECTION,
  STEPS,
  initialState,
  isFull,
  limitFor,
  loadLanding,
  overBy,
  pageComplete,
  reducer,
  selectedFor,
  stepBlockedReason,
  type Action,
  type LoadedProfile,
  type PerMode,
  type ProfileState,
} from './profile'
import { COMMON_VALUES } from '../data/values'
import { catalogSkillNames } from '../data/skills'

const run = (actions: Action[], from: ProfileState = initialState) => actions.reduce(reducer, from)
const exp = (names: string[]): PerMode<string[]> => ({ experience: names, desired: [] })
const des = (names: string[]): PerMode<string[]> => ({ experience: [], desired: names })
const desired: Action = { type: 'setMode', mode: 'desired' }

describe('steps', () => {
  it('has no scoring step and puts AI engineering after interpersonal', () => {
    expect(STEPS).toEqual(['values', 'technical', 'engineering', 'interpersonal', 'ai', 'card'])
  })
})

describe('experience modes', () => {
  it('starts on previous experience and switches', () => {
    expect(initialState.mode).toBe('experience')
    expect(run([desired]).mode).toBe('desired')
  })

  it('keeps the two lists independent, allowing the same word in both', () => {
    const s = run([
      { type: 'toggleSkill', section: 'technical', name: 'Python' },
      desired,
      { type: 'toggleSkill', section: 'technical', name: 'Python' },
    ])
    expect(s.selectedSkills.technical).toEqual({ experience: ['Python'], desired: ['Python'] })
    const off = run([{ type: 'toggleSkill', section: 'technical', name: 'Python' }], s)
    expect(off.selectedSkills.technical).toEqual({ experience: ['Python'], desired: [] })
  })

  it('keeps values in one list whatever the mode', () => {
    const s = run([desired, { type: 'toggleValue', name: 'Integrity' }])
    expect(s.selectedValues).toEqual(['Integrity'])
    expect(selectedFor(s, 'values')).toEqual(['Integrity'])
    expect(selectedFor(s, 'values', 'experience')).toEqual(['Integrity'])
    expect(pageComplete(run([desired, { type: 'toggleValue', name: 'Integrity' }]), 'values')).toBe(true)
  })

  it('opens every page on previous experience, keeping desired selections', () => {
    const s = run([
      { type: 'toggleValue', name: 'Integrity' },
      { type: 'goTo', step: 'technical' },
      desired,
      { type: 'toggleSkill', section: 'technical', name: 'Python' },
    ])
    expect(s.mode).toBe('desired')
    for (const step of ['engineering', 'values'] as const) {
      const next = run([{ type: 'goTo', step }], s)
      expect(next.step).toBe(step)
      expect(next.mode).toBe('experience')
    }
    const back = run([{ type: 'goTo', step: 'values' }], s)
    expect(back.selectedSkills.technical.desired).toEqual(['Python'])
  })

  it('shares one custom entry between modes and removes it from both', () => {
    const s = run([
      desired,
      { type: 'addCustomSkill', section: 'ai', text: 'Zig' },
      { type: 'setMode', mode: 'experience' },
      { type: 'addCustomSkill', section: 'ai', text: 'zig' },
    ])
    expect(s.customSkills.ai).toEqual(['Zig'])
    expect(s.selectedSkills.ai).toEqual({ experience: ['Zig'], desired: ['Zig'] })
    const removed = run([{ type: 'removeCustomSkill', section: 'ai', name: 'Zig' }], s)
    expect(removed.customSkills.ai).toEqual([])
    expect(removed.selectedSkills.ai).toEqual({ experience: [], desired: [] })
  })

  it('counts a page as complete when either mode has a selection', () => {
    expect(pageComplete(initialState, 'ai')).toBe(false)
    expect(pageComplete(run([desired, { type: 'toggleSkill', section: 'ai', name: 'Ollama' }]), 'ai')).toBe(true)
  })
})

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

  it('removes a custom value from the group and the selection', () => {
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
    expect(s.selectedSkills.technical).toEqual(exp(['Python']))
    expect(s.selectedSkills.engineering).toEqual(exp([]))
    const back = run([{ type: 'toggleSkill', section: 'technical', name: 'Python' }], s)
    expect(back.selectedSkills.technical).toEqual(exp([]))
  })

  it('adds a custom skill to one section only', () => {
    const s = run([{ type: 'addCustomSkill', section: 'technical', text: 'Zig' }])
    expect(s.customSkills.technical).toEqual(['Zig'])
    expect(s.selectedSkills.technical).toEqual(exp(['Zig']))
    expect(s.customSkills.engineering).toEqual([])
  })

  it('rejects empty and duplicate custom skills, selecting the existing match', () => {
    expect(run([{ type: 'addCustomSkill', section: 'technical', text: ' ' }])).toBe(initialState)
    const s = run([{ type: 'addCustomSkill', section: 'technical', text: ' python ' }])
    expect(s.customSkills.technical).toEqual([])
    expect(s.selectedSkills.technical).toEqual(exp(['Python']))
  })

  it('selects AI engineering skills', () => {
    const s = run([{ type: 'toggleSkill', section: 'ai', name: 'OpenRouter' }])
    expect(s.selectedSkills.ai).toEqual(exp(['OpenRouter']))
  })
})

describe('step gating', () => {
  const withValue = run([{ type: 'toggleValue', name: 'Integrity' }])
  const oneSection = run([{ type: 'toggleSkill', section: 'technical', name: 'Python' }], withValue)
  const complete = run(
    [
      { type: 'toggleSkill', section: 'engineering', name: 'Scrum' },
      { type: 'toggleSkill', section: 'interpersonal', name: 'Teamwork' },
      { type: 'toggleSkill', section: 'ai', name: 'Ollama' },
    ],
    oneSection,
  )

  it('blocks leaving values until one is selected', () => {
    expect(stepBlockedReason(initialState, 'technical')).not.toBeNull()
    expect(run([{ type: 'goTo', step: 'technical' }]).step).toBe('values')
    expect(run([{ type: 'goTo', step: 'technical' }], withValue).step).toBe('technical')
  })

  it('accepts a profile that only has desired selections', () => {
    const s = run([
      desired,
      { type: 'toggleValue', name: 'Integrity' },
      { type: 'toggleSkill', section: 'technical', name: 'Python' },
      { type: 'toggleSkill', section: 'engineering', name: 'Scrum' },
      { type: 'toggleSkill', section: 'interpersonal', name: 'Teamwork' },
      { type: 'toggleSkill', section: 'ai', name: 'Ollama' },
    ])
    expect(stepBlockedReason(s, 'card')).toBeNull()
  })

  it('blocks the profile until every section has a selection and names the missing ones', () => {
    expect(stepBlockedReason(oneSection, 'card')).toMatch(/engineering, interpersonal, ai engineering/)
    expect(run([{ type: 'goTo', step: 'card' }], oneSection).step).toBe('values')
    expect(run([{ type: 'goTo', step: 'card' }], complete).step).toBe('card')
  })

  it('blocks the profile when only the AI engineering page is empty', () => {
    expect(stepBlockedReason(complete, 'card')).toBeNull()
    const empty = run([{ type: 'toggleSkill', section: 'ai', name: 'Ollama' }], complete)
    expect(stepBlockedReason(empty, 'card')).toMatch(/ai engineering/)
  })

  it('retains selections when navigating back', () => {
    const s = run(
      [
        { type: 'goTo', step: 'card' },
        { type: 'goTo', step: 'values' },
      ],
      complete,
    )
    expect(s.selectedValues).toEqual(['Integrity'])
    expect(s.selectedSkills.technical).toEqual(exp(['Python']))
  })
})

describe('selection limit', () => {
  const values = COMMON_VALUES.map((v) => v.name)
  const technical = catalogSkillNames('technical')
  const pick = (n: number, names: string[]): Action[] =>
    names.slice(0, n).map((name) => ({ type: 'toggleValue', name }))
  const pickSkills = (n: number): Action[] =>
    technical.slice(0, n).map((name) => ({ type: 'toggleSkill', section: 'technical', name }))

  it('uses a limit of 5 values', () => {
    expect(MAX_SELECTION).toBe(5)
  })

  it('stops selecting values at the limit', () => {
    const s = run([...pick(MAX_SELECTION, values), { type: 'toggleValue', name: values[MAX_SELECTION] }])
    expect(s.selectedValues).toHaveLength(MAX_SELECTION)
    expect(s.selectedValues).not.toContain(values[MAX_SELECTION])
  })

  it('applies the one limit whatever the mode', () => {
    const s = run([...pick(MAX_SELECTION, values), desired, { type: 'toggleValue', name: values[MAX_SELECTION] }])
    expect(s.selectedValues).toHaveLength(MAX_SELECTION)
    expect(isFull(s, 'values')).toBe(true)
    expect(isFull(run([{ type: 'toggleValue', name: values[0] }], s), 'values')).toBe(false)
  })

  it('does not limit skills: 30 can be selected in a section, in either mode', () => {
    expect(run(pickSkills(30)).selectedSkills.technical.experience).toHaveLength(30)
    expect(run([desired, ...pickSkills(30)]).selectedSkills.technical.desired).toHaveLength(30)
  })

  it('reports limits per page: values only', () => {
    expect(limitFor('values')).toBe(MAX_SELECTION)
    for (const page of ['technical', 'engineering', 'interpersonal', 'ai'] as const) {
      expect(limitFor(page)).toBeUndefined()
    }
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
    expect(s.selectedSkills.technical.experience).toHaveLength(16)
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
      expect(overBy(over, 'values', 'experience')).toBe(2)
      expect(overBy(initialState, 'values', 'experience')).toBe(0)
    })

    it('allows deselecting but not selecting', () => {
      expect(reducer(over, { type: 'toggleValue', name: values[MAX_SELECTION + 2] })).toBe(over)
      expect(reducer(over, { type: 'toggleValue', name: values[0] }).selectedValues).toHaveLength(
        MAX_SELECTION + 1,
      )
    })

    it('blocks moving forward, naming the page, count and limit, but not moving back', () => {
      expect(stepBlockedReason(over, 'technical')).toBe(
        'Deselect 2 words on the values page to continue (limit 5).',
      )
      expect(reducer(over, { type: 'goTo', step: 'technical' }).step).toBe('values')
      const onTechnical = { ...over, step: 'technical' as const }
      expect(reducer(onTechnical, { type: 'goTo', step: 'values' }).step).toBe('values')
    })

    it('does not block later steps for a skill page holding more than ten', () => {
      const s: ProfileState = {
        ...initialState,
        selectedValues: ['Integrity'],
        selectedSkills: {
          technical: exp(technical.slice(0, 40)),
          engineering: exp(['Scrum']),
          interpersonal: exp(['Teamwork']),
          ai: exp(['Ollama']),
        },
      }
      expect(overBy(s, 'technical', 'experience')).toBe(0)
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
  const complete: LoadedProfile = {
    selectedValues: ['Integrity'],
    customValues: [],
    selectedSkills: {
      technical: exp(['Python']),
      engineering: des(['Scrum']),
      interpersonal: exp(['Teamwork']),
      ai: exp(['Ollama']),
    },
    customSkills: { technical: [], engineering: [], interpersonal: [], ai: [] },
  }

  it('replaces everything at once, resets the mode and lands on the profile card when complete', () => {
    const before = run([desired, { type: 'toggleValue', name: 'Trust' }, { type: 'toggleSkill', section: 'technical', name: 'Go' }])
    const s = reducer(before, { type: 'loadProfile', profile: complete })
    expect(s.step).toBe('card')
    expect(s.mode).toBe('experience')
    expect(s.selectedValues).toEqual(['Integrity'])
    expect(s.selectedSkills.technical).toEqual(exp(['Python']))
    expect(s.selectedSkills.engineering).toEqual(des(['Scrum']))
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
      selectedSkills: { ...complete.selectedSkills, engineering: exp(catalogSkillNames('engineering').slice(0, 30)) },
    }
    expect(loadLanding(many)).toEqual({ step: 'card', notice: null })
    const both = { ...many, selectedValues: values.slice(0, MAX_SELECTION + 2) }
    const landing = loadLanding(both)
    expect(landing.step).toBe('values')
    expect(landing.notice).toMatch(/Deselect 2 words/)
    expect(
      reducer(initialState, { type: 'loadProfile', profile: both }).selectedSkills.engineering.experience,
    ).toHaveLength(30)
  })

  it('opens the values page when there are no values, and the first empty section otherwise', () => {
    expect(
      reducer(initialState, { type: 'loadProfile', profile: { ...complete, selectedValues: [] } }).step,
    ).toBe('values')
    const noEngineering = { ...complete, selectedSkills: { ...complete.selectedSkills, engineering: exp([]) } }
    const landing = loadLanding(noEngineering)
    expect(landing.step).toBe('engineering')
    expect(landing.notice).toMatch(/engineering/)
  })

  it('opens the AI engineering page when it has no selection in either option', () => {
    const noAi = { ...complete, selectedSkills: { ...complete.selectedSkills, ai: exp([]) } }
    const landing = loadLanding(noAi)
    expect(landing.step).toBe('ai')
    expect(landing.notice).toMatch(/ai engineering/)
  })

  it('has no notice when the profile is complete', () => {
    expect(loadLanding(complete)).toEqual({ step: 'card', notice: null })
  })
})
