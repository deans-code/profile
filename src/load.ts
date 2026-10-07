import { SECTIONS, SECTION_LABELS, catalogSkillNames } from './data/skills'
import { COMMON_VALUES } from './data/values'
import type { Experience, Profile } from './export'
import { MODES, type LoadedProfile } from './state/profile'

export const MAX_FILE_BYTES = 1024 * 1024
export const MAX_ENTRIES = 100
export const MAX_NAME_LENGTH = 100

export type ParseResult = { ok: true; profile: Profile } | { ok: false; error: string }

const fail = (error: string): ParseResult => ({ ok: false, error })
const norm = (s: string) => s.trim().toLowerCase()
const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)

type Parsed<T> = { value: T } | { error: string }

function checkName(value: unknown, where: string): string | { error: string } {
  if (typeof value !== 'string') return { error: `${where} contains a name that is not text.` }
  const name = value.trim()
  if (!name) return { error: `${where} contains an empty name.` }
  if (name.length > MAX_NAME_LENGTH) {
    return { error: `${where} contains a name longer than ${MAX_NAME_LENGTH} characters.` }
  }
  return name
}

/**
 * Reads a list of names, either plain strings or (in files from before experience options) objects
 * with a `name`, whose scores are ignored. Trims names and removes duplicates ignoring case.
 */
function parseNames(list: unknown, where: string, legacyObjects: boolean): Parsed<string[]> {
  if (!Array.isArray(list)) return { error: `${where} are not a list.` }
  if (list.length > MAX_ENTRIES) return { error: `${where} have more than ${MAX_ENTRIES} entries.` }
  const out: string[] = []
  const seen = new Set<string>()
  for (const raw of list) {
    if (legacyObjects && !isObject(raw)) return { error: `${where} contain an entry that is not a skill.` }
    const name = checkName(legacyObjects ? (raw as Record<string, unknown>).name : raw, where)
    if (typeof name !== 'string') return name
    if (!seen.has(norm(name))) {
      seen.add(norm(name))
      out.push(name)
    }
  }
  return { value: out }
}

/**
 * Reads the previous and desired experience for one page. A plain list (an older file) is treated
 * as previous experience.
 */
function parseExperience(raw: unknown, where: string, missingOk: boolean): Parsed<Experience> {
  if (raw === undefined && missingOk) return { value: { experience: [], desired: [] } }
  if (raw === undefined) return { error: `${where} are missing from the file.` }

  if (Array.isArray(raw)) {
    const names = parseNames(raw, where, raw.some(isObject))
    return 'error' in names ? names : { value: { experience: names.value, desired: [] } }
  }
  if (!isObject(raw)) return { error: `${where} are not in a form this app can read.` }

  const out = { experience: [], desired: [] } as Experience
  for (const mode of MODES) {
    const names = parseNames(raw[mode] ?? [], where, false)
    if ('error' in names) return names
    out[mode] = names.value
  }
  return { value: out }
}

/**
 * Reads a profile previously downloaded as JSON, in the current format or the older one with scores
 * (scores are ignored and the entries count as previous experience). Extra properties and the export
 * timestamp are ignored, names are trimmed, and duplicates (ignoring case) are removed, keeping the first.
 */
export function parseProfile(text: string): ParseResult {
  if (text.length > MAX_FILE_BYTES) return fail('This file is larger than 1 MB, so it is not a profile from this app.')

  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    return fail('This file is not valid JSON, so it cannot be loaded as a profile.')
  }

  if (!isObject(data) || data.values === undefined || !isObject(data.skills)) {
    return fail('This file is not a profile downloaded from this app: it needs "values" and "skills".')
  }

  const values = parseExperience(data.values, 'The values lists', false)
  if ('error' in values) return fail(values.error)

  const skills = {} as Profile['skills']
  for (const section of SECTIONS) {
    const where = `The ${SECTION_LABELS[section].toLowerCase()} skills`
    // Files from before the AI engineering page have no such section.
    const parsed = parseExperience(data.skills[section], where, section === 'ai')
    if ('error' in parsed) return fail(parsed.error)
    skills[section] = parsed.value
  }

  return { ok: true, profile: { values: values.value, skills } }
}

/**
 * Maps a parsed profile onto builder state (everything except the step and mode). Names matching a
 * built-in entry use its spelling; anything else becomes a custom entry, kept once per page.
 */
export function profileToState(profile: Profile): LoadedProfile {
  const resolve = (lists: Experience, builtIn: string[]) => {
    const known = new Map(builtIn.map((n) => [norm(n), n]))
    const custom: string[] = []
    const selected = { experience: [], desired: [] } as Experience
    for (const mode of MODES) {
      selected[mode] = lists[mode].map((name) => {
        const match = known.get(norm(name))
        if (match) return match
        const existing = custom.find((c) => norm(c) === norm(name))
        if (existing) return existing
        custom.push(name)
        return name
      })
    }
    return { selected, custom }
  }

  const values = resolve(profile.values, COMMON_VALUES.map((v) => v.name))
  const selectedSkills = {} as LoadedProfile['selectedSkills']
  const customSkills = {} as LoadedProfile['customSkills']
  for (const section of SECTIONS) {
    const skills = resolve(profile.skills[section], catalogSkillNames(section))
    selectedSkills[section] = skills.selected
    customSkills[section] = skills.custom
  }

  return { selectedValues: values.selected, customValues: values.custom, selectedSkills, customSkills }
}
