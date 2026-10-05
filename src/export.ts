import { SECTIONS, SECTION_LABELS, type Section } from './data/skills'
import { getScore, type ProfileState } from './state/profile'

export interface ScoredSkill {
  name: string
  score: number
}

export interface Profile {
  values: string[]
  skills: Record<Section, ScoredSkill[]>
}

/** Score descending, then name. */
const byScoreThenName = (a: ScoredSkill, b: ScoredSkill) => b.score - a.score || a.name.localeCompare(b.name)

export function buildProfile(state: ProfileState): Profile {
  const skills = {} as Record<Section, ScoredSkill[]>
  for (const section of SECTIONS) {
    skills[section] = state.selectedSkills[section]
      .map((name) => ({ name, score: getScore(state, section, name) }))
      .sort(byScoreThenName)
  }
  return { values: [...state.selectedValues].sort((a, b) => a.localeCompare(b)), skills }
}

export function toJson(profile: Profile, exportedAt: Date = new Date()): string {
  return JSON.stringify(
    {
      exportedAt: exportedAt.toISOString(),
      values: profile.values,
      skills: {
        technical: profile.skills.technical,
        engineering: profile.skills.engineering,
        interpersonal: profile.skills.interpersonal,
      },
    },
    null,
    2,
  )
}

/** Escapes Markdown syntax so user text renders literally. */
export function escapeMarkdown(text: string): string {
  return text
    .replace(/[\r\n]+/g, ' ')
    .replace(/[\\`*_{}[\]()<>#+\-.!|~&]/g, (c) => `\\${c}`)
}

export function toMarkdown(profile: Profile): string {
  const lines: string[] = ['# Profile', '', '## Values', '']
  for (const v of profile.values) lines.push(`- ${escapeMarkdown(v)}`)
  for (const section of SECTIONS) {
    lines.push('', `## ${SECTION_LABELS[section]}`, '')
    for (const s of profile.skills[section]) lines.push(`- ${escapeMarkdown(s.name)} — ${s.score}/10`)
  }
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
