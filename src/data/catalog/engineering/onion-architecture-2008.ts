import type { SourceContribution } from '../types'

/**
 * Jeffrey Palermo, "The Onion Architecture", parts 1 to 3 (https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/), 29 July to 4 August 2008.
 * Read in full: the independent domain model at the centre, interfaces defined by inner layers and implemented by outer ones, coupling toward the centre, and the core running separately from infrastructure. No licence is stated, so only names of ideas are used, with descriptions written for this app. The original reference for Onion Architecture.
 */
export const onionArchitecture2008: SourceContribution = {
  source: 'onion-architecture-2008',
  checked: '2026-11-14',
  categories: {
    'Clean and decoupled architecture': {
      'Onion Architecture': 'Putting an independent domain model at the centre, with infrastructure and UI in outer rings that depend inward.',
      'Dependency rule': '',
      'Independent domain model': 'Building the application around an object model that does not depend on infrastructure.',
      'Externalised infrastructure': 'Pushing databases, file systems and external services to the outside, behind interfaces the core defines.',
    },
  },
}
