import type { SourceContribution } from '../types'

/**
 * Cloud Native Computing Foundation, "Projects" (https://www.cncf.io/projects/), copyright 2026, read 14 November 2026.
 * Read: the list of graduated and incubating projects. Tools are offered when listed as graduated or incubating. Only names are used, with descriptions written for this app.
 */
export const cncfProjects: SourceContribution = {
  source: 'cncf-projects',
  checked: '2026-11-14',
  categories: {
    'Monitoring and logging': {
      Prometheus: 'An open-source system that collects and stores metrics and raises alerts.',
      Fluentd: 'An open-source data collector that gathers logs from many sources and sends them on.',
      Thanos: 'An open-source add-on that gives Prometheus long-term storage and a global view across servers.',
      Cortex: 'An open-source, horizontally scalable store for Prometheus metrics.',
      OpenTelemetry: '',
      Jaeger: '',
    },
  },
}
