import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Site reliability engineering" (https://en.wikipedia.org/wiki/Site_reliability_engineering, CC BY-SA 4.0, edited 4 October 2026).
 * Read: its principles and common practices. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const siteReliabilityEngineeringWikipedia: SourceContribution = {
  source: 'site-reliability-engineering-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Reliability and operations': {
      'Monitoring and observability': '',
      'Chaos engineering': '',
      'Service level objectives': 'Setting measurable targets for how reliable a service should be.',
      'Error budgets': 'Using the allowed amount of unreliability to balance change against stability.',
      'Eliminating toil': 'Automating repetitive manual operations work.',
      'Incident management': 'Organising a clear response when a service fails.',
      'Capacity planning': 'Forecasting demand and making sure there is enough capacity.',
      'High availability': 'Designing so the service stays up through failures.',
      'Disaster recovery': 'Planning and rehearsing how to recover after a major failure.',
    },
  },
}
