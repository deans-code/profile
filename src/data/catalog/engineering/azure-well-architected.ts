import type { SourceContribution } from '../types'

/**
 * Microsoft Azure Well-Architected Framework, pillars (https://learn.microsoft.com/en-us/azure/well-architected/pillars), page dated 2025.
 * Read: the five pillars and their one-line principles. No reuse terms were visible, so only the pillar names are used, with descriptions written for this app.
 */
export const azureWellArchitected: SourceContribution = {
  source: 'azure-well-architected',
  checked: '2026-11-14',
  categories: {
    'Cloud-native and platform practices': {
      'Performance efficiency': '',
      'Cost optimisation': 'Spending on cloud resources according to what the workload needs.',
      'Operational excellence': 'Running and monitoring systems well and improving how they are run.',
    },
  },
}
