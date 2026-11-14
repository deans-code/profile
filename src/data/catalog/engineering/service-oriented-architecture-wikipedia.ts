import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Service-oriented architecture" (https://en.wikipedia.org/wiki/Service-oriented_architecture, CC BY-SA 4.0, edited 15 October 2026 per the fetch tool summary).
 * Read: its service design principles and composition (the first 39,932 of 86,404 characters verbatim, the rest summarised and not used for options). Descriptions are written for this app; no article text is copied.
 */
export const serviceOrientedArchitectureWikipedia: SourceContribution = {
  source: 'service-oriented-architecture-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Microservice and integration patterns': {
      'Service choreography': '',
      'Service orchestration': 'Using a central coordinator to direct the steps of a process across services.',
      'Service-oriented architecture': 'Building applications from reusable services with standard contracts.',
      'Standardised service contracts': 'Describing every service with a shared, agreed contract.',
      'Service autonomy': 'Letting each service control its own logic and resources.',
      'Service composability': 'Designing services that can be combined into larger ones.',
    },
  },
}
