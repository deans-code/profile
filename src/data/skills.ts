import { BROAD_TERMS, type BroadTerm } from './broad-terms'
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

/** Every built-in skill name a user can select on a page: the catalog plus the page's broader terms. */
export function selectableSkillNames(section: Section): string[] {
  return [...BROAD_TERMS[section].map((t) => t.name), ...catalogSkillNames(section)]
}

/** How many of a term's covered options sit in each category of its section, in catalog order. */
function coverCounts(section: Section, term: BroadTerm): { category: string; count: number }[] {
  return CATALOGS[section].map((c) => ({ category: c.category, count: term.covers.filter((n) => c.skills.includes(n)).length }))
}

/** True when two categories hold equally many of the term's options, so its placement would be a guess. */
export function broadTermHasTie(section: Section, term: BroadTerm): boolean {
  const counts = coverCounts(section, term).map((c) => c.count).sort((a, b) => b - a)
  return counts[0] === counts[1]
}

/** The category that holds most of the options a broader term covers; a tie goes to the category listed first. */
export function broadTermCategory(section: Section, term: BroadTerm): string {
  return coverCounts(section, term).reduce((best, c) => (c.count > best.count ? c : best)).category
}

/** A section's categories with each broader term placed first in its own category. */
export function categoriesWithBroadTerms(section: Section): { category: string; words: string[]; broad: string[] }[] {
  return CATALOGS[section].map((c) => {
    const broad = BROAD_TERMS[section].filter((t) => broadTermCategory(section, t) === c.category).map((t) => t.name)
    return { category: c.category, words: [...broad, ...c.skills], broad }
  })
}
