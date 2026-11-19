import { SECTIONS, type Section } from './data/skills'
import { type Mode, type ProfileState } from './state/profile'

/** The words chosen on one page, for each experience option. */
export type Experience = Record<Mode, string[]>

export interface Profile {
  values: string[]
  skills: Record<Section, Experience>
}

const byName = (a: string, b: string) => a.localeCompare(b)

const sorted = (lists: Experience): Experience => ({
  experience: [...lists.experience].sort(byName),
  desired: [...lists.desired].sort(byName),
})

export function buildProfile(state: ProfileState): Profile {
  const skills = {} as Profile['skills']
  for (const section of SECTIONS) skills[section] = sorted(state.selectedSkills[section])
  return { values: [...state.selectedValues].sort(byName), skills }
}

export function toJson(profile: Profile, exportedAt: Date = new Date()): string {
  const skills = {} as Profile['skills']
  for (const section of SECTIONS) skills[section] = profile.skills[section]
  return JSON.stringify({ exportedAt: exportedAt.toISOString(), values: profile.values, skills }, null, 2)
}

export function downloadFile(filename: string, content: string, mimeType: string): void {
  const url = URL.createObjectURL(new Blob([content], { type: `${mimeType};charset=utf-8` }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
