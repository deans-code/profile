import type { SourceId } from '../sources'

/** What one source contributed to a tab: options grouped by category, each with a description. */
export interface SourceContribution {
  source: SourceId
  /** ISO date the source was read and its options checked. */
  checked: string
  /** Category name -> option name -> description. Options already added by an earlier source only gain this source. */
  categories: Record<string, Record<string, string>>
}

export interface MergedCatalog {
  categories: { category: string; skills: string[] }[]
  descriptions: Record<string, string>
  attribution: Record<string, { sources: SourceId[]; checked: string }>
}

const norm = (s: string) => s.trim().toLowerCase()

/**
 * Merges contributions in order. The first source to name an option sets its category and description;
 * every later source that names it is added to its sources, and the check date is the latest.
 */
export function mergeContributions(contributions: SourceContribution[]): MergedCatalog {
  const categories: { category: string; skills: string[] }[] = []
  const descriptions: Record<string, string> = {}
  const attribution: MergedCatalog['attribution'] = {}
  const byName = new Map<string, string>()

  for (const c of contributions) {
    for (const [category, options] of Object.entries(c.categories)) {
      let group = categories.find((g) => g.category === category)
      for (const [name, description] of Object.entries(options)) {
        const key = norm(name)
        const existing = byName.get(key)
        if (existing) {
          const a = attribution[existing]
          if (!a.sources.includes(c.source)) a.sources.push(c.source)
          if (c.checked > a.checked) a.checked = c.checked
          continue
        }
        if (!group) {
          group = { category, skills: [] }
          categories.push(group)
        }
        group.skills.push(name)
        descriptions[name] = description
        attribution[name] = { sources: [c.source], checked: c.checked }
        byName.set(key, name)
      }
    }
  }
  return { categories, descriptions, attribution }
}
