import type { SourceContribution } from '../types'

/**
 * Alistair Cockburn, "Hexagonal architecture" (https://alistair.cockburn.us/hexagonal-architecture/), technical report dated 4 September 2005, copyright 2022.
 * Read in full: ports and adapters, primary and secondary (driving and driven) ports, and testing with mock adapters. All rights reserved, so only names of ideas are used, with descriptions written for this app. The original reference for Hexagonal architecture.
 */
export const hexagonalArchitectureCockburn: SourceContribution = {
  source: 'hexagonal-architecture-cockburn',
  checked: '2026-11-14',
  categories: {
    'Clean and decoupled architecture': {
      'Hexagonal architecture': '',
      'Externalised infrastructure': '',
      'Primary and secondary ports': 'Separating the ports that drive the application from the ones the application drives.',
      'Adapters for each technology': 'Writing one adapter per outside technology so any can be swapped without touching the core.',
      'In-memory adapters for testing': 'Running the application against fake or in-memory adapters so it can be tested without real infrastructure.',
    },
  },
}
