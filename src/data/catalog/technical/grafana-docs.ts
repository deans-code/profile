import type { SourceContribution } from '../types'

/**
 * Grafana Labs, documentation home (https://grafana.com/docs/), updated November 2026, read 14 November 2026.
 * Read: the product list (Grafana, Mimir, Loki, Tempo, Pyroscope, Alloy and others). Only names are used, with descriptions written for this app.
 */
export const grafanaDocs: SourceContribution = {
  source: 'grafana-docs',
  checked: '2026-11-14',
  categories: {
    'Monitoring and logging': {
      Grafana: '',
      'Grafana Loki': 'A log storage system from Grafana Labs that indexes labels rather than the full text of logs.',
      'Grafana Tempo': 'A distributed tracing store from Grafana Labs.',
      'Grafana Mimir': 'A scalable long-term store for Prometheus metrics from Grafana Labs.',
    },
  },
}
