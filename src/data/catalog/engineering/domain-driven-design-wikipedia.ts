import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Domain-driven design" (https://en.wikipedia.org/wiki/Domain-driven_design, CC BY-SA 4.0, edited 15 October 2026).
 * Read: its core concepts, context mapping and related patterns. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const domainDrivenDesignWikipedia: SourceContribution = {
  source: 'domain-driven-design-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Architecture and design': {
      'Domain-driven design': '',
      CQRS: '',
      'Bounded contexts': 'Drawing explicit boundaries around where each domain model applies.',
      'Ubiquitous language': 'Using the same business words in conversation, requirements and code.',
      'Context mapping': 'Mapping how bounded contexts relate and integrate with each other.',
      'Aggregates and domain events': 'Modelling consistency boundaries and the things that happen in the domain.',
      'Event storming': 'Exploring a business domain by mapping its events with the people involved.',
      'Event sourcing': 'Storing every change as an event and rebuilding state from them.',
    },
    'Design principles and patterns': {
      'Repository pattern': 'Hiding how data is stored behind a collection-like interface.',
    },
  },
}
