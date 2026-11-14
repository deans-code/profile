import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Software architecture" (https://en.wikipedia.org/wiki/Software_architecture, CC BY-SA 4.0, edited 3 November 2026).
 * Read: its principles, practices, styles, quality attributes and evaluation methods. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const softwareArchitectureWikipedia: SourceContribution = {
  source: 'software-architecture-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Architecture and design': {
      'Microservices architecture': '',
      'Event-driven architecture': '',
      'Layered architecture': 'Organising a system into layers, each depending only on the layer beneath.',
      'Hexagonal architecture': 'Keeping the core logic independent of its inputs and outputs through ports and adapters.',
      'Serverless architecture': 'Building on managed functions and services rather than servers you run.',
      'Architectural decision records': 'Writing down important architectural decisions and the reasons for them.',
      'C4 model': 'Describing a system at four levels of zoom: context, containers, components and code.',
      'Architectural fitness functions': 'Automated checks that the system keeps the architectural qualities you care about.',
      'Architecture trade-off analysis': 'Weighing quality attributes against each other to choose between designs.',
      'Architectural views': 'Describing a system from several viewpoints, such as structure, behaviour and deployment.',
      'Circuit breaker pattern': '',
      'Domain versus technical partitioning': 'Choosing whether to split a system by business area or by technical layer.',
      'Monolith and distributed architectures': 'Choosing between a single deployable unit and a distributed system.',
      'Modular monolith': 'Keeping one deployable unit with strictly separated internal modules.',
    },
    'Design principles and patterns': {
      'Separation of concerns': '',
      'Conway’s law': '',
    },
    'Software quality and maintenance': {
      Compatibility: 'How well the software coexists and works with other systems.',
      Reliability: 'How well the software keeps working under stated conditions.',
      Maintainability: 'How easily the software can be understood, changed and tested.',
      Testability: '',
      Extensibility: 'How easily new capabilities can be added.',
    },
  },
}
