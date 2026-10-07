import { SECTIONS, SECTION_LABELS, type Section } from './data/skills'
import { MODES, MODE_LABELS, type Mode, type ProfileState } from './state/profile'

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

/** Escapes Markdown syntax so user text renders literally. */
export function escapeMarkdown(text: string): string {
  return text
    .replace(/[\r\n]+/g, ' ')
    .replace(/[\\`*_{}[\]()<>#+\-.!|~&]/g, (c) => `\\${c}`)
}

export function toMarkdown(profile: Profile): string {
  const lines: string[] = ['# Profile']
  const page = (heading: string, lists: Experience) => {
    lines.push('', `## ${heading}`)
    for (const mode of MODES) {
      if (lists[mode].length === 0) continue
      lines.push('', `### ${MODE_LABELS[mode]}`, '')
      for (const name of lists[mode]) lines.push(`- ${escapeMarkdown(name)}`)
    }
  }
  lines.push('', '## Values', '')
  for (const name of profile.values) lines.push(`- ${escapeMarkdown(name)}`)
  for (const section of SECTIONS) page(SECTION_LABELS[section], profile.skills[section])
  return lines.join('\n') + '\n'
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
