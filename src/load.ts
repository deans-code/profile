import { SECTIONS, SECTION_LABELS, catalogSkillNames, type Section } from './data/skills'
import { COMMON_VALUES } from './data/values'
import type { Profile } from './export'
import { DEFAULT_SCORE, MAX_SCORE, MIN_SCORE, type ProfileState } from './state/profile'

export const MAX_FILE_BYTES = 1024 * 1024
export const MAX_ENTRIES = 100
export const MAX_NAME_LENGTH = 100

export type ParseResult = { ok: true; profile: Profile } | { ok: false; error: string }

const fail = (error: string): ParseResult => ({ ok: false, error })
const norm = (s: string) => s.trim().toLowerCase()
const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)

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
 * Reads a profile previously downloaded as JSON. Extra properties and the export timestamp are ignored,
 * names are trimmed, and duplicates (ignoring case) are removed, keeping the first.
 */
export function parseProfile(text: string): ParseResult {
  if (text.length > MAX_FILE_BYTES) return fail('This file is larger than 1 MB, so it is not a profile from this app.')

  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    return fail('This file is not valid JSON, so it cannot be loaded as a profile.')
  }

  if (!isObject(data) || !Array.isArray(data.values) || !isObject(data.skills)) {
    return fail('This file is not a profile downloaded from this app: it needs "values" and "skills".')
  }
  if (data.values.length > MAX_ENTRIES) return fail(`The values list has more than ${MAX_ENTRIES} entries.`)

  const values: string[] = []
  const seenValues = new Set<string>()
  for (const raw of data.values) {
    const name = checkName(raw, 'The values list')
    if (typeof name !== 'string') return fail(name.error)
    if (!seenValues.has(norm(name))) {
      seenValues.add(norm(name))
      values.push(name)
    }
  }

  const skills = {} as Profile['skills']
  for (const section of SECTIONS) {
    const list = data.skills[section]
    const where = `The ${SECTION_LABELS[section].toLowerCase()} skills`
    if (!Array.isArray(list)) return fail(`${where} are missing from the file.`)
    if (list.length > MAX_ENTRIES) return fail(`${where} have more than ${MAX_ENTRIES} entries.`)

    const out: Profile['skills'][Section] = []
    const seen = new Set<string>()
    for (const raw of list) {
      if (!isObject(raw)) return fail(`${where} contain an entry that is not a skill.`)
      const name = checkName(raw.name, where)
      if (typeof name !== 'string') return fail(name.error)
      const score = raw.score
      if (typeof score !== 'number' || !Number.isInteger(score) || score < MIN_SCORE || score > MAX_SCORE) {
        return fail(`The score for "${name}" must be a whole number from ${MIN_SCORE} to ${MAX_SCORE}.`)
      }
      if (!seen.has(norm(name))) {
        seen.add(norm(name))
        out.push({ name, score })
      }
    }
    skills[section] = out
  }

  return { ok: true, profile: { values, skills } }
}

/**
 * Maps a parsed profile onto builder state (everything except the step). Names matching a built-in
 * entry use its spelling; anything else becomes a custom entry in the same list.
 */
export function profileToState(profile: Profile): Omit<ProfileState, 'step'> {
  const builtInValues = new Map(COMMON_VALUES.map((v) => [norm(v.name), v.name]))
  const customValues: string[] = []
  const selectedValues = profile.values.map((name) => {
    const builtIn = builtInValues.get(norm(name))
    if (builtIn) return builtIn
    customValues.push(name)
    return name
  })

  const selectedSkills = {} as ProfileState['selectedSkills']
  const customSkills = {} as ProfileState['customSkills']
  const scores = {} as ProfileState['scores']
  for (const section of SECTIONS) {
    const builtIn = new Map(catalogSkillNames(section).map((n) => [norm(n), n]))
    selectedSkills[section] = []
    customSkills[section] = []
    scores[section] = {}
    for (const { name, score } of profile.skills[section]) {
      const canonical = builtIn.get(norm(name)) ?? name
      if (!builtIn.has(norm(name))) customSkills[section].push(name)
      selectedSkills[section].push(canonical)
      if (score !== DEFAULT_SCORE) scores[section][canonical] = score
    }
  }

  return { selectedValues, customValues, selectedSkills, customSkills, scores }
}
