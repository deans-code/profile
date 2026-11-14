import type { SourceContribution } from '../types'

/**
 * OpenTelemetry documentation and vendor list (https://opentelemetry.io/docs/ and https://opentelemetry.io/ecosystem/vendors/), read 14 November 2026; the pages show no date.
 * Read: the three signals (traces, metrics, logs), the Collector and the list of vendors that support OpenTelemetry. Tools are offered when the vendor list names them. Descriptions are written for this app.
 */
export const openTelemetryDocs: SourceContribution = {
  source: 'opentelemetry-docs',
  checked: '2026-11-14',
  categories: {
    'Monitoring and logging': {
      OpenTelemetry: 'An open standard and set of tools for creating and exporting traces, metrics and logs from applications.',
      Jaeger: 'An open-source system for collecting and viewing distributed traces.',
      'Fluent Bit': 'A lightweight open-source agent that collects, filters and forwards logs and metrics.',
      Grafana: 'An open-source tool for building dashboards and alerts from metrics, logs and traces.',
      Dynatrace: 'A commercial platform for monitoring applications, infrastructure and user experience.',
      'New Relic': 'A commercial observability platform for application performance, logs and infrastructure.',
      Honeycomb: 'A commercial observability service for exploring traces and events in production systems.',
      Datadog: '',
      Splunk: '',
      Sentry: '',
      VictoriaMetrics: '',
    },
  },
}
