import { VALUES } from './catalog/values'

export interface ValueCategory {
  category: string
  values: string[]
}

export interface CommonValue {
  name: string
}

/** Categories come from the per-source files under src/data/catalog/values. */
export const VALUE_CATEGORIES: ValueCategory[] = VALUES.categories.map((c) => ({ category: c.category, values: c.skills }))

/** Every built-in value, flattened from the categories. */
export const COMMON_VALUES: CommonValue[] = VALUE_CATEGORIES.flatMap((c) => c.values.map((name) => ({ name })))
