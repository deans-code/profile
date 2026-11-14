import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Microservices" (https://en.wikipedia.org/wiki/Microservices, CC BY-SA 4.0, edited 4 October 2026).
 * Read: its characteristics, best practices and challenges. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const microservicesWikipedia: SourceContribution = {
  source: 'microservices-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Architecture and design': {
      'Microservices architecture': '',
      'Hexagonal architecture': '',
      'Architectural fitness functions': '',
      'Bounded contexts': '',
      'Circuit breaker pattern': '',
      'Service discovery': 'Letting services find each other without fixed addresses.',
      'Service mesh': 'Handling service-to-service communication, security and observability in a shared layer.',
      'Modular monolith': '',
    },
    'Design principles and patterns': {
      'Loose coupling': '',
      'Unix philosophy': '',
      'Conway’s law': '',
    },
    Testing: {
      'Contract testing': 'Verifying that services keep to the agreements between them.',
    },
    'Software quality and maintenance': {
      Modularity: '',
    },
    'Reliability and operations': {
      'Monitoring and observability': '',
      'Distributed tracing': 'Following a request across services to see where time and errors arise.',
      'Log aggregation': 'Collecting logs from every service into one searchable place.',
    },
  },
}
