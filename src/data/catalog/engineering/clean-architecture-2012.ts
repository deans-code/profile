import type { SourceContribution } from '../types'

/**
 * Robert C. Martin, "The Clean Architecture" (https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), 13 August 2012.
 * Read in full: the four layers (entities, use cases, interface adapters, frameworks and drivers), the Dependency Rule and the use of dependency inversion at boundaries. No licence is stated, so only the names of its ideas are used, with descriptions written for this app. The original reference for Clean Architecture.
 */
export const cleanArchitecture2012: SourceContribution = {
  source: 'clean-architecture-2012',
  checked: '2026-11-14',
  categories: {
    'Clean and decoupled architecture': {
      'Clean Architecture': 'Layering a system so source-code dependencies point only inward, keeping business rules independent of frameworks, UI and databases.',
      'Dependency rule': 'Letting source code depend only on things closer to the core, never on outer details.',
      'Use case layer': 'Keeping application-specific business rules in their own layer that orchestrates the entities.',
      'Interface adapters': 'Converting data between the form the core uses and the form the web, database or other outside world needs.',
      'Simple data across boundaries': 'Passing plain data structures across boundaries rather than entities or database rows.',
      'Testable business rules': 'Keeping business rules testable without UI, database or web server.',
    },
  },
}
