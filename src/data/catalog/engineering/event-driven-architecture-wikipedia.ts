import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Event-driven architecture" (https://en.wikipedia.org/wiki/Event-driven_architecture, CC BY-SA 4.0, edited 10 October 2026).
 * Read: broker and mediator topologies, domain and integration events and event evolution. Descriptions are written for this app; no article text is copied.
 */
export const eventDrivenArchitectureWikipedia: SourceContribution = {
  source: 'event-driven-architecture-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Architecture and design': {
      'Event-driven architecture': '',
    },
    'Microservice and integration patterns': {
      'Domain events': '',
      'Broker topology': 'Passing events between components through a broker with no central orchestrator.',
      'Mediator topology': 'Using a mediator to control the flow of events between components.',
    },
  },
}
