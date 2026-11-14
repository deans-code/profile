import { AI } from './catalog/ai'
import { ENGINEERING } from './catalog/engineering'
import { INTERPERSONAL } from './catalog/interpersonal'
import { TECHNICAL } from './catalog/technical'

export type Section = 'technical' | 'engineering' | 'interpersonal' | 'ai'

export const SECTIONS: Section[] = ['technical', 'engineering', 'interpersonal', 'ai']

export const SECTION_LABELS: Record<Section, string> = {
  technical: 'Technical development',
  engineering: 'Engineering',
  interpersonal: 'Interpersonal',
  ai: 'AI engineering',
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export const CATALOGS: Record<Section, SkillCategory[]> = {
  technical: TECHNICAL.categories,
  engineering: ENGINEERING.categories,
  interpersonal: INTERPERSONAL.categories,
  ai: AI.categories,
}

export function catalogSkillNames(section: Section): string[] {
  return CATALOGS[section].flatMap((c) => c.skills)
}
