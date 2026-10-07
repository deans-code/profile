import { SECTIONS, SECTION_LABELS, catalogSkillNames, type Section } from '../data/skills'
import { COMMON_VALUES } from '../data/values'

export type Step = 'values' | Section | 'card'

export const STEPS: Step[] = ['values', ...SECTIONS, 'card']

/** Whether a selection records what the user has done or what they want to do. */
export type Mode = 'experience' | 'desired'

export const MODES: Mode[] = ['experience', 'desired']

export const MODE_LABELS: Record<Mode, string> = {
  experience: 'Previous experience',
  desired: 'Desired experience',
}

/** Most values that can be selected in each mode. */
export const MAX_SELECTION = 20

/** A page with selectable words. */
export type Page = 'values' | Section

export const PAGES: Page[] = ['values', ...SECTIONS]

/** Per-page selection limits (per mode). Pages that are not listed have no limit. */
export const LIMITS: Partial<Record<Page, number>> = { values: MAX_SELECTION }

/** The most words selectable on a page in one mode, or undefined when the page has no limit. */
export const limitFor = (page: Page): number | undefined => LIMITS[page]

export type PerMode<T> = Record<Mode, T>

export interface ProfileState {
  step: Step
  /** The option the selection pages are editing. Shared by every page. */
  mode: Mode
  selectedValues: PerMode<string[]>
  customValues: string[]
  selectedSkills: Record<Section, PerMode<string[]>>
  customSkills: Record<Section, string[]>
}

/** What a loaded profile supplies: everything except where the user is. */
export type LoadedProfile = Omit<ProfileState, 'step' | 'mode'>

const perMode = <T>(make: () => T): PerMode<T> => ({ experience: make(), desired: make() })

const perSection = <T>(make: () => T): Record<Section, T> =>
  Object.fromEntries(SECTIONS.map((s) => [s, make()])) as Record<Section, T>

export const initialState: ProfileState = {
  step: 'values',
  mode: 'experience',
  selectedValues: perMode<string[]>(() => []),
  customValues: [],
  selectedSkills: perSection(() => perMode<string[]>(() => [])),
  customSkills: perSection<string[]>(() => []),
}

export type Action =
  | { type: 'setMode'; mode: Mode }
  | { type: 'toggleValue'; name: string }
  | { type: 'addCustomValue'; text: string }
  | { type: 'removeCustomValue'; name: string }
  | { type: 'toggleSkill'; section: Section; name: string }
  | { type: 'addCustomSkill'; section: Section; text: string }
  | { type: 'removeCustomSkill'; section: Section; name: string }
  | { type: 'goTo'; step: Step }
  | { type: 'loadProfile'; profile: LoadedProfile }

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

/** Words selected on a page in the given mode (the active mode by default). */
export function selectedFor(state: ProfileState, page: Page, mode: Mode = state.mode): string[] {
  return page === 'values' ? state.selectedValues[mode] : state.selectedSkills[page][mode]
}

export function selectionCount(state: ProfileState, page: Page, mode: Mode = state.mode): number {
  return selectedFor(state, page, mode).length
}

export function isFull(state: ProfileState, page: Page): boolean {
  const limit = limitFor(page)
  return limit !== undefined && selectionCount(state, page) >= limit
}

/** How many words must be deselected in one mode before the page is within its limit. */
export function overBy(state: ProfileState, page: Page, mode: Mode): number {
  const limit = limitFor(page)
  return limit === undefined ? 0 : Math.max(0, selectionCount(state, page, mode) - limit)
}

/** A page is complete when at least one word is selected in either mode. */
export function pageComplete(state: ProfileState, page: Page): boolean {
  return MODES.some((m) => selectionCount(state, page, m) > 0)
}

const pageLabel = (page: Page) => (page === 'values' ? 'values' : SECTION_LABELS[page].toLowerCase())

export function missingSections(state: ProfileState): Section[] {
  return SECTIONS.filter((s) => !pageComplete(state, s))
}

/** The first page (before the given step index) and mode that is over its limit, if any. */
function firstOver(state: ProfileState, before: number): { page: Page; mode: Mode; over: number } | undefined {
  for (const page of PAGES) {
    if (STEPS.indexOf(page) >= before) continue
    for (const mode of MODES) {
      const over = overBy(state, page, mode)
      if (over > 0) return { page, mode, over }
    }
  }
  return undefined
}

/** Why a step cannot be entered yet, or null when it is available. */
export function stepBlockedReason(state: ProfileState, step: Step): string | null {
  if (step === 'values') return null
  const over = firstOver(state, STEPS.indexOf(step))
  if (over) {
    const noun = over.over === 1 ? 'word' : 'words'
    return `Deselect ${over.over} ${noun} under ${MODE_LABELS[over.mode]} on the ${pageLabel(over.page)} page to continue (limit ${limitFor(over.page)}).`
  }
  if (!pageComplete(state, 'values')) return 'Select at least one value first.'
  if (step === 'card') {
    const missing = missingSections(state)
    if (missing.length > 0) {
      return `Select at least one skill in: ${missing.map((s) => SECTION_LABELS[s].toLowerCase()).join(', ')}.`
    }
  }
  return null
}

/**
 * Where to open a freshly loaded profile: the profile card when it is complete, otherwise the
 * first page that needs attention, with a message saying what to do.
 */
export function loadLanding(profile: LoadedProfile): { step: Step; notice: string | null } {
  const state: ProfileState = { ...profile, step: 'values', mode: 'experience' }
  const notice = stepBlockedReason(state, 'card')
  if (!notice) return { step: 'card', notice: null }
  const page =
    firstOver(state, STEPS.length)?.page ??
    (!pageComplete(state, 'values') ? 'values' : SECTIONS.find((s) => !pageComplete(state, s))) ??
    'values'
  return { step: page, notice }
}

const without = (list: string[], name: string) => list.filter((n) => n !== name)
const toggle = (list: string[], name: string) => (list.includes(name) ? without(list, name) : [...list, name])

/** Removes a name from both modes' lists. */
const withoutBoth = (lists: PerMode<string[]>, name: string): PerMode<string[]> => ({
  experience: without(lists.experience, name),
  desired: without(lists.desired, name),
})

const withMode = <T>(lists: PerMode<T>, mode: Mode, value: T): PerMode<T> => ({ ...lists, [mode]: value })

export function reducer(state: ProfileState, action: Action): ProfileState {
  const mode = state.mode
  switch (action.type) {
    case 'setMode':
      return { ...state, mode: action.mode }

    case 'toggleValue': {
      const selected = state.selectedValues[mode]
      if (!selected.includes(action.name) && isFull(state, 'values')) return state
      return { ...state, selectedValues: withMode(state.selectedValues, mode, toggle(selected, action.name)) }
    }

    case 'addCustomValue': {
      const text = action.text.trim()
      if (!text) return state
      const selected = state.selectedValues[mode]
      const existing = findMatch(allValues(state), text)
      if (existing) {
        return selected.includes(existing) || isFull(state, 'values')
          ? state
          : { ...state, selectedValues: withMode(state.selectedValues, mode, [...selected, existing]) }
      }
      if (isFull(state, 'values')) return state
      return {
        ...state,
        customValues: [...state.customValues, text],
        selectedValues: withMode(state.selectedValues, mode, [...selected, text]),
      }
    }

    case 'removeCustomValue':
      return {
        ...state,
        customValues: without(state.customValues, action.name),
        selectedValues: withoutBoth(state.selectedValues, action.name),
      }

    case 'toggleSkill': {
      const { section, name } = action
      const selected = state.selectedSkills[section][mode]
      if (!selected.includes(name) && isFull(state, section)) return state
      return {
        ...state,
        selectedSkills: {
          ...state.selectedSkills,
          [section]: withMode(state.selectedSkills[section], mode, toggle(selected, name)),
        },
      }
    }

    case 'addCustomSkill': {
      const { section } = action
      const text = action.text.trim()
      if (!text) return state
      const selected = state.selectedSkills[section][mode]
      const existing = findMatch(allSkillNames(state, section), text)
      const withSelected = (name: string): ProfileState['selectedSkills'] => ({
        ...state.selectedSkills,
        [section]: withMode(state.selectedSkills[section], mode, [...selected, name]),
      })
      if (existing) {
        return selected.includes(existing) || isFull(state, section)
          ? state
          : { ...state, selectedSkills: withSelected(existing) }
      }
      if (isFull(state, section)) return state
      return {
        ...state,
        customSkills: { ...state.customSkills, [section]: [...state.customSkills[section], text] },
        selectedSkills: withSelected(text),
      }
    }

    case 'removeCustomSkill': {
      const { section, name } = action
      return {
        ...state,
        customSkills: { ...state.customSkills, [section]: without(state.customSkills[section], name) },
        selectedSkills: {
          ...state.selectedSkills,
          [section]: withoutBoth(state.selectedSkills[section], name),
        },
      }
    }

    case 'loadProfile':
      return { ...action.profile, mode: 'experience', step: loadLanding(action.profile).step }

    case 'goTo':
      return stepBlockedReason(state, action.step) ? state : { ...state, step: action.step }
  }
}
