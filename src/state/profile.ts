import { SECTIONS, catalogSkillNames, type Section } from '../data/skills'
import { COMMON_VALUES } from '../data/values'

export type Step = 'values' | Section | 'scoring' | 'card'

export const STEPS: Step[] = ['values', ...SECTIONS, 'scoring', 'card']

export const DEFAULT_SCORE = 5
export const MIN_SCORE = 1
export const MAX_SCORE = 10

export interface ProfileState {
  step: Step
  selectedValues: string[]
  customValues: string[]
  selectedSkills: Record<Section, string[]>
  customSkills: Record<Section, string[]>
  /** Only skills the user has moved off the default are stored. */
  scores: Record<Section, Record<string, number>>
}

const perSection = <T,>(make: () => T): Record<Section, T> => ({
  technical: make(),
  engineering: make(),
  interpersonal: make(),
})

export const initialState: ProfileState = {
  step: 'values',
  selectedValues: [],
  customValues: [],
  selectedSkills: perSection<string[]>(() => []),
  customSkills: perSection<string[]>(() => []),
  scores: perSection<Record<string, number>>(() => ({})),
}

export type Action =
  | { type: 'toggleValue'; name: string }
  | { type: 'addCustomValue'; text: string }
  | { type: 'removeCustomValue'; name: string }
  | { type: 'toggleSkill'; section: Section; name: string }
  | { type: 'addCustomSkill'; section: Section; text: string }
  | { type: 'removeCustomSkill'; section: Section; name: string }
  | { type: 'setScore'; section: Section; name: string; score: number }
  | { type: 'goTo'; step: Step }

const norm = (s: string) => s.trim().toLowerCase()

function findMatch(candidates: string[], text: string): string | undefined {
  const key = norm(text)
  return candidates.find((c) => norm(c) === key)
}

export function allValues(state: ProfileState): string[] {
  return [...COMMON_VALUES.map((v) => v.name), ...state.customValues]
}

export function allSkillNames(state: ProfileState, section: Section): string[] {
  return [...catalogSkillNames(section), ...state.customSkills[section]]
}

export const clampScore = (n: number) => Math.min(MAX_SCORE, Math.max(MIN_SCORE, Math.round(n)))

export function getScore(state: ProfileState, section: Section, name: string): number {
  return state.scores[section][name] ?? DEFAULT_SCORE
}

export function missingSections(state: ProfileState): Section[] {
  return SECTIONS.filter((s) => state.selectedSkills[s].length === 0)
}

/** Why a step cannot be entered yet, or null when it is available. */
export function stepBlockedReason(state: ProfileState, step: Step): string | null {
  if (step === 'values') return null
  if (state.selectedValues.length === 0) return 'Select at least one value first.'
  if (step === 'scoring' || step === 'card') {
    const missing = missingSections(state)
    if (missing.length > 0) return `Select at least one skill in: ${missing.join(', ')}.`
  }
  return null
}

const without = (list: string[], name: string) => list.filter((n) => n !== name)
const toggle = (list: string[], name: string) => (list.includes(name) ? without(list, name) : [...list, name])

function dropScore(state: ProfileState, section: Section, name: string): ProfileState['scores'] {
  const rest = { ...state.scores[section] }
  delete rest[name]
  return { ...state.scores, [section]: rest }
}

export function reducer(state: ProfileState, action: Action): ProfileState {
  switch (action.type) {
    case 'toggleValue':
      return { ...state, selectedValues: toggle(state.selectedValues, action.name) }

    case 'addCustomValue': {
      const text = action.text.trim()
      if (!text) return state
      const existing = findMatch(allValues(state), text)
      if (existing) {
        return state.selectedValues.includes(existing)
          ? state
          : { ...state, selectedValues: [...state.selectedValues, existing] }
      }
      return {
        ...state,
        customValues: [...state.customValues, text],
        selectedValues: [...state.selectedValues, text],
      }
    }

    case 'removeCustomValue':
      return {
        ...state,
        customValues: without(state.customValues, action.name),
        selectedValues: without(state.selectedValues, action.name),
      }

    case 'toggleSkill': {
      const { section, name } = action
      const selected = state.selectedSkills[section]
      const nowSelected = !selected.includes(name)
      const next: ProfileState = {
        ...state,
        selectedSkills: { ...state.selectedSkills, [section]: toggle(selected, name) },
      }
      return nowSelected ? next : { ...next, scores: dropScore(next, section, name) }
    }

    case 'addCustomSkill': {
      const { section } = action
      const text = action.text.trim()
      if (!text) return state
      const existing = findMatch(allSkillNames(state, section), text)
      const selected = state.selectedSkills[section]
      if (existing) {
        return selected.includes(existing)
          ? state
          : { ...state, selectedSkills: { ...state.selectedSkills, [section]: [...selected, existing] } }
      }
      return {
        ...state,
        customSkills: { ...state.customSkills, [section]: [...state.customSkills[section], text] },
        selectedSkills: { ...state.selectedSkills, [section]: [...selected, text] },
      }
    }

    case 'removeCustomSkill': {
      const { section, name } = action
      return {
        ...state,
        customSkills: { ...state.customSkills, [section]: without(state.customSkills[section], name) },
        selectedSkills: { ...state.selectedSkills, [section]: without(state.selectedSkills[section], name) },
        scores: dropScore(state, section, name),
      }
    }

    case 'setScore': {
      const { section, name } = action
      if (!state.selectedSkills[section].includes(name)) return state
      return {
        ...state,
        scores: {
          ...state.scores,
          [section]: { ...state.scores[section], [name]: clampScore(action.score) },
        },
      }
    }

    case 'goTo':
      return stepBlockedReason(state, action.step) ? state : { ...state, step: action.step }
  }
}
