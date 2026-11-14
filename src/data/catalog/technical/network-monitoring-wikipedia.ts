import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Comparison of network monitoring systems" (https://en.wikipedia.org/wiki/Comparison_of_network_monitoring_systems, CC BY-SA 4.0, edited 2 October 2026).
 * Read: the comparison table. Systems are offered when widely used and long-established open-source monitors. Descriptions are written for this app; no article text is copied.
 */
export const networkMonitoringWikipedia: SourceContribution = {
  source: 'network-monitoring-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Monitoring and logging': {
      Nagios: 'A long-established open-source system for monitoring servers, networks and services.',
      Zabbix: 'An open-source platform for monitoring servers, networks and applications.',
      Icinga: 'An open-source monitoring system that began as a fork of Nagios.',
      Checkmk: 'A monitoring tool for servers, networks and applications with automatic discovery.',
    },
  },
}
