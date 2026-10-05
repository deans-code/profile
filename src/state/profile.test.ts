import { initialState, reducer, getScore, stepBlockedReason, type Action, type ProfileState } from './profile'

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
    const s = run([{ type: 'goTo', step: 'scoring' }, { type: 'goTo', step: 'values' }], complete)
    expect(s.selectedValues).toEqual(['Integrity'])
    expect(s.selectedSkills.technical).toEqual(['Python'])
  })
})
