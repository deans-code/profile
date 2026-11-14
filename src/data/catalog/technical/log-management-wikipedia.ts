import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Log management" (https://en.wikipedia.org/wiki/Log_management, CC BY-SA 4.0, edited 1 July 2026).
 * Read: collection, retention and analysis of logs, NIST SP 800-92 and syslog. Descriptions are written for this app; no article text is copied.
 */
export const logManagementWikipedia: SourceContribution = {
  source: 'log-management-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Monitoring and logging': {
      'Log management': 'Collecting, storing, searching and retaining the logs that systems produce.',
      Syslog: 'A long-standing standard for sending log messages from devices and services to a collector.',
    },
  },
}
