import type { SourceContribution } from '../types'

/**
 * Microsoft Azure Architecture Center, "Cloud Design Patterns" (https://learn.microsoft.com/en-us/azure/architecture/patterns/), updated 13 November 2026.
 * Read in full: the table of 44 patterns. No licence is shown, so only names of patterns are used, with descriptions written for this app.
 */
export const azureCloudDesignPatterns: SourceContribution = {
  source: 'azure-cloud-design-patterns',
  checked: '2026-11-14',
  categories: {
    'Architecture and design': {
      CQRS: '',
      'Circuit breaker pattern': '',
      'Event sourcing': '',
    },
    'Microservice and integration patterns': {
      'API gateway pattern': '',
      'BFF (backend for frontend)': '',
      'Strangler fig pattern': '',
      'Saga pattern': '',
      'Anti-corruption layer': '',
      'Sidecar pattern': 'Running supporting functions in a companion process or container alongside the main one.',
      'Ambassador pattern': 'Using a helper service to make outbound network calls on behalf of an application.',
      'Idempotent consumer': '',
      'Service choreography': 'Letting services react to each other’s events with no central controller.',
      'Publisher-subscriber': 'Announcing events to many interested consumers without knowing who they are.',
      'Competing consumers': 'Having several consumers process messages from the same queue in parallel.',
      'Queue-based load leveling': 'Using a queue to absorb bursts so a service is not overwhelmed.',
      'Claim check pattern': 'Sending a reference to a large payload instead of the payload itself.',
      'Compensating transaction': 'Undoing earlier steps of a multi-step operation when a later one fails.',
      'Bulkhead pattern': 'Isolating resources so a failure in one part does not take down the rest.',
      'Retry pattern': 'Retrying temporary failures sensibly instead of failing at once.',
      'Rate limiting': 'Controlling how much a client or tenant can use a service.',
      'Asynchronous request-reply': 'Decoupling a long-running back-end task from the caller that needs a response.',
      'Health check API': '',
    },
  },
}
