import { BROAD_TERMS, type BroadTerm } from './broad-terms'
import { AI } from './catalog/ai'
import { ENGINEERING } from './catalog/engineering'
import { INTERPERSONAL } from './catalog/interpersonal'
import { TECHNICAL } from './catalog/technical'
import type { TermKind } from './definitions'
import { VALUE_CATEGORIES } from './values'

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

/** Every built-in name a user can select on a page: the catalog plus the page's broader terms. */
export function selectableNames(kind: TermKind): string[] {
  return [...BROAD_TERMS[kind].map((t) => t.name), ...categoriesOf(kind).flatMap((c) => c.words)]
}

/** Every built-in skill name a user can select on a skills page. */
export function selectableSkillNames(section: Section): string[] {
  return selectableNames(section)
}

/** The categories of a page's built-in options: the value categories, or a skills section's catalog. */
export function categoriesOf(kind: TermKind): { category: string; words: string[] }[] {
  return kind === 'values'
    ? VALUE_CATEGORIES.map((c) => ({ category: c.category, words: c.values }))
    : CATALOGS[kind].map((c) => ({ category: c.category, words: c.skills }))
}

/** How many of a term's covered options sit in each category of its page, in catalog order. */
function coverCounts(kind: TermKind, term: BroadTerm): { category: string; count: number }[] {
  return categoriesOf(kind).map((c) => ({ category: c.category, count: term.covers.filter((n) => c.words.includes(n)).length }))
}

/** True when two categories hold equally many of the term's options, so its placement would be a guess. */
export function broadTermHasTie(kind: TermKind, term: BroadTerm): boolean {
  const counts = coverCounts(kind, term).map((c) => c.count).sort((a, b) => b - a)
  return counts[0] === counts[1]
}

/** The category that holds most of the options a broader term covers; a tie goes to the category listed first. */
export function broadTermCategory(kind: TermKind, term: BroadTerm): string {
  return coverCounts(kind, term).reduce((best, c) => (c.count > best.count ? c : best)).category
}

/** A page's categories with each broader term placed first in its own category. */
export function categoriesWithBroadTerms(kind: TermKind): { category: string; words: string[]; broad: string[] }[] {
  return categoriesOf(kind).map((c) => {
    const broad = BROAD_TERMS[kind].filter((t) => broadTermCategory(kind, t) === c.category).map((t) => t.name)
    return { category: c.category, words: [...broad, ...c.words], broad }
  })
}
