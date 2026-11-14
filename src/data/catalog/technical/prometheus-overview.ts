import type { SourceContribution } from '../types'

/**
 * Prometheus, "Overview" (https://prometheus.io/docs/introduction/overview/), read 14 November 2026; components are Apache 2.0.
 * Read: the server, client libraries, exporters, Alertmanager and the PromQL query language. Descriptions are written for this app.
 */
export const prometheusOverview: SourceContribution = {
  source: 'prometheus-overview',
  checked: '2026-11-14',
  categories: {
    'Monitoring and logging': {
      Prometheus: '',
      Alertmanager: 'The Prometheus component that groups, routes and silences alerts.',
      PromQL: 'The query language used to select and combine Prometheus metrics.',
    },
  },
}
