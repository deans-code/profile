import type { SourceContribution } from '../types'

/**
 * Chris Richardson, "A pattern language for microservices" (https://microservices.io/patterns/index.html), copyright 2026, all rights reserved.
 * Read in full: the 53 patterns across service boundaries, collaboration, transactional messaging, deployment, communication, API, discovery, reliability, observability and UI. Rights are reserved, so only names of patterns are used, with descriptions written for this app.
 */
export const microservicesIoPatterns: SourceContribution = {
  source: 'microservices-io-patterns',
  checked: '2026-11-14',
  categories: {
    'Architecture and design': {
      'Microservices architecture': '',
      CQRS: '',
      'Circuit breaker pattern': '',
      'Event sourcing': '',
      'Service discovery': '',
    },
    'Microservice and integration patterns': {
      'API gateway pattern': 'Giving clients one entry point that routes and combines calls to the services behind it.',
      'BFF (backend for frontend)': 'Giving each kind of client its own backend that fits its needs.',
      'Strangler fig pattern': 'Replacing a legacy system piece by piece, growing new code around it until the old can be retired.',
      'Saga pattern': 'Keeping data consistent across services with a series of local transactions and compensating steps.',
      'Transactional outbox': 'Saving outgoing messages in the same transaction as the data change so none is lost.',
      'Anti-corruption layer': 'Translating between a legacy or foreign model and your own so its design does not leak in.',
      'Database per service': 'Giving each service its own private data store.',
      'Domain events': 'Publishing an event whenever something meaningful happens in the domain.',
      'Idempotent consumer': 'Making message handlers safe to run more than once with the same message.',
      'Health check API': 'Exposing an endpoint that reports whether a service is working.',
      'Decompose by business capability': 'Dividing a system into services that match what the business does.',
      'Decompose by subdomain': 'Dividing a system into services along domain-driven subdomains.',
      'Service per team': 'Giving each service to one team to own.',
      'API composition': 'Answering a query by calling several services and joining the results.',
      'Command-side replica': 'Keeping a local read-only copy of another service’s data to avoid calls.',
      'Microservice chassis': 'Using a framework that handles cross-cutting concerns for each service.',
      'Service template': 'Starting new services from a template with standard concerns built in.',
    },
    'Cloud-native and platform practices': {
      'Configuration in the environment': '',
    },
    Testing: {
      'Contract testing': '',
    },
    'Reliability and operations': {
      'Distributed tracing': '',
      'Log aggregation': '',
    },
  },
}
