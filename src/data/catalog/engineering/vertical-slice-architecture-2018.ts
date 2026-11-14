import type { SourceContribution } from '../types'

/**
 * Jimmy Bogard, "Vertical Slice Architecture" (https://www.jimmybogard.com/vertical-slice-architecture/), 19 April 2018.
 * Read in full: organising around requests or use cases, minimising coupling between slices and maximising it within one. No licence is stated, so only names of ideas are used, with descriptions written for this app. The original reference for Vertical Slice Architecture.
 */
export const verticalSliceArchitecture2018: SourceContribution = {
  source: 'vertical-slice-architecture-2018',
  checked: '2026-11-14',
  categories: {
    'Clean and decoupled architecture': {
      'Vertical Slice Architecture': 'Organising code around each request or use case, from front to back, instead of around technical layers.',
      'Organising by feature, not layer': 'Grouping code by the feature or request it serves so related changes happen in one place.',
      'Minimising coupling between slices': 'Keeping slices independent of each other while keeping code within a slice closely related.',
    },
  },
}
