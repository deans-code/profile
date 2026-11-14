import type { SourceContribution } from '../types'

/**
 * Site Reliability Engineering (2017) and The Site Reliability Workbook (2018), Google, published by O’Reilly (https://sre.google/sre-book/table-of-contents/ and https://sre.google/workbook/table-of-contents/), licensed CC BY-NC-ND 4.0.
 * Read: both tables of contents (chapter and part titles). Because the licence forbids adaptations, only the names of the practices are used, with descriptions written for this app. Standing references still in wide use, so their age is not a bar.
 */
export const googleSreBooks: SourceContribution = {
  source: 'google-sre-books',
  checked: '2026-11-14',
  categories: {
    'Reliability and operations': {
      'Monitoring and observability': '',
      'Service level objectives': '',
      'Error budgets': '',
      'Eliminating toil': '',
      'Incident management': '',
      'Blameless postmortems': 'Learning from incidents without blaming individuals.',
      'On-call practices': 'Running a sustainable on-call rota with clear support and escalation.',
      'Alerting on service levels': 'Alerting on what matters to users instead of on every internal signal.',
      'Canary releases': 'Rolling a change out to a small share of traffic before everyone.',
      'Release engineering': 'Building and releasing software reliably and repeatably.',
      'Handling overload': 'Keeping a service useful when demand exceeds capacity.',
      'Cascading failure prevention': 'Stopping one failing component from taking others down.',
      'Load balancing': 'Spreading traffic across servers for capacity and resilience.',
      'Reliability testing': 'Testing that the system keeps working under failure and load.',
      'Data integrity': 'Making sure data stays correct and recoverable.',
    },
  },
}
