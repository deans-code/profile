import { SECTIONS, SECTION_LABELS, catalogSkillNames, type Section } from '../data/skills'
import { COMMON_VALUES } from '../data/values'

export type Step = 'values' | Section | 'scoring' | 'card'

export const STEPS: Step[] = ['values', ...SECTIONS, 'scoring', 'card']

export const DEFAULT_SCORE = 5
export const MIN_SCORE = 1
export const MAX_SCORE = 10

/** Most values that can be selected. */
export const MAX_SELECTION = 10

/** A page with selectable words. */
export type Page = 'values' | Section

export const PAGES: Page[] = ['values', ...SECTIONS]

/** Per-page selection limits. Pages that are not listed have no limit. */
export const LIMITS: Partial<Record<Page, number>> = { values: MAX_SELECTION }

/** The most words selectable on a page, or undefined when the page has no limit. */
export const limitFor = (page: Page): number | undefined => LIMITS[page]

export interface ProfileState {
  step: Step
  selectedValues: string[]
  customValues: string[]
  selectedSkills: Record<Section, string[]>
  customSkills: Record<Section, string[]>
  /** Only skills the user has moved off the default are stored. */
  scores: Record<Section, Record<string, number>>
}

const perSection = <T>(make: () => T): Record<Section, T> => ({
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
  | { type: 'loadProfile'; profile: Omit<ProfileState, 'step'> }

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

export function selectionCount(state: ProfileState, page: Page): number {
  return page === 'values' ? state.selectedValues.length : state.selectedSkills[page].length
}

export function isFull(state: ProfileState, page: Page): boolean {
  const limit = limitFor(page)
  return limit !== undefined && selectionCount(state, page) >= limit
}

/** How many words must be deselected before the page is within its limit. */
export function overBy(state: ProfileState, page: Page): number {
  const limit = limitFor(page)
  return limit === undefined ? 0 : Math.max(0, selectionCount(state, page) - limit)
}

const pageLabel = (page: Page) => (page === 'values' ? 'values' : SECTION_LABELS[page].toLowerCase())

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
  const target = STEPS.indexOf(step)
  for (const page of PAGES) {
    const over = overBy(state, page)
    if (STEPS.indexOf(page) < target && over > 0) {
      return `Deselect ${over} ${over === 1 ? 'word' : 'words'} on the ${pageLabel(page)} page to continue (limit ${limitFor(page)}).`
    }
  }
  if (state.selectedValues.length === 0) return 'Select at least one value first.'
  if (step === 'scoring' || step === 'card') {
    const missing = missingSections(state)
    if (missing.length > 0) return `Select at least one skill in: ${missing.join(', ')}.`
  }
  return null
}

/**
 * Where to open a freshly loaded profile: the profile card when it is complete, otherwise the
 * first page that needs attention, with a message saying what to do.
 */
export function loadLanding(profile: Omit<ProfileState, 'step'>): { step: Step; notice: string | null } {
  const state: ProfileState = { ...profile, step: 'values' }
  const notice = stepBlockedReason(state, 'card')
  if (!notice) return { step: 'card', notice: null }
  const page =
    PAGES.find((p) => overBy(state, p) > 0) ??
    (state.selectedValues.length === 0 ? 'values' : SECTIONS.find((s) => state.selectedSkills[s].length === 0)) ??
    'values'
  return { step: page, notice }
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
      if (!state.selectedValues.includes(action.name) && isFull(state, 'values')) return state
      return { ...state, selectedValues: toggle(state.selectedValues, action.name) }

    case 'addCustomValue': {
      const text = action.text.trim()
      if (!text) return state
      const existing = findMatch(allValues(state), text)
      if (existing) {
        return state.selectedValues.includes(existing) || isFull(state, 'values')
          ? state
          : { ...state, selectedValues: [...state.selectedValues, existing] }
      }
      if (isFull(state, 'values')) return state
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
      if (nowSelected && isFull(state, section)) return state
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
        return selected.includes(existing) || isFull(state, section)
          ? state
          : { ...state, selectedSkills: { ...state.selectedSkills, [section]: [...selected, existing] } }
      }
      if (isFull(state, section)) return state
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

    case 'loadProfile':
      return { ...action.profile, step: loadLanding(action.profile).step }

    case 'goTo':
      return stepBlockedReason(state, action.step) ? state : { ...state, step: action.step }
  }
}
