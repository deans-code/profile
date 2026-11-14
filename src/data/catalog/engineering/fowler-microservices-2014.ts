import type { SourceContribution } from '../types'

/**
 * James Lewis and Martin Fowler, "Microservices" (https://martinfowler.com/articles/microservices.html), 25 March 2014.
 * Read: the nine characteristic headings (componentization via services, business capabilities, products not projects, smart endpoints and dumb pipes, decentralized governance and data management, infrastructure automation, design for failure, evolutionary design). About a third of the page came through the fetch tool summary and is not used. Only names of ideas are used, with descriptions written for this app. A standing definition of the style.
 */
export const fowlerMicroservices2014: SourceContribution = {
  source: 'fowler-microservices-2014',
  checked: '2026-11-14',
  categories: {
    'Architecture and design': {
      'Microservices architecture': '',
    },
    'Microservice and integration patterns': {
      'Database per service': '',
      'Decentralised data management': 'Letting each service manage its own data and model.',
      'Decompose by business capability': '',
      'Products, not projects': 'Having a team own a service for its whole life rather than handing it over after delivery.',
      'Smart endpoints and dumb pipes': 'Putting the logic in services and keeping the communication channel simple.',
      'Decentralised governance': 'Letting teams choose their own tools while sharing what is useful.',
      'Design for failure': 'Building services that tolerate other services failing.',
    },
  },
}
