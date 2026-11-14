import type { SourceContribution } from '../types'

/**
 * Wikipedia, "SOLID" (https://en.wikipedia.org/wiki/SOLID, CC BY-SA 4.0, edited 10 October 2026).
 * Read: the five SOLID principles and the concepts around them. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const solidWikipedia: SourceContribution = {
  source: 'solid-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Design principles and patterns': {
      'Separation of concerns': '',
      'Loose coupling': '',
      'Single responsibility principle': 'Each module or class has one reason to change.',
      'Open-closed principle': 'Extend behaviour without modifying existing code.',
      'Liskov substitution principle': 'Subtypes can stand in for their base types without surprises.',
      'Interface segregation principle': 'Prefer small, focused interfaces over large general ones.',
      'Dependency inversion principle': 'Depend on abstractions, not on concrete details.',
      'Design by contract': 'Specifying what each part requires and guarantees.',
    },
    'Software quality and maintenance': {
      Testability: 'How easily the software can be tested.',
      Modularity: 'Building the software from parts that can be changed independently.',
    },
  },
}
