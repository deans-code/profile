import type { SourceContribution } from '../types'

/**
 * Robert C. Martin, "Screaming Architecture" (https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html), 30 September 2011.
 * Read in full: an architecture that shows its use cases, with frameworks as tools. No licence is stated, so only names of ideas are used, with descriptions written for this app.
 */
export const screamingArchitecture2011: SourceContribution = {
  source: 'screaming-architecture-2011',
  checked: '2026-11-14',
  categories: {
    'Clean and decoupled architecture': {
      'Use case layer': '',
      'Screaming architecture': 'Structuring code so its top level shows what the system does, not which framework it uses.',
      'Treating frameworks as tools': 'Using frameworks without letting them dictate the architecture.',
      'Deferring technical decisions': 'Leaving choices about database, web server and delivery mechanism open as long as sensible.',
      'Testable business rules': '',
    },
  },
}
