import type { SourceContribution } from '../types'

/**
 * AWS Well-Architected Framework, pillars of the framework (https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html).
 * Read: the six pillars. The page shows no edition date or reuse terms, so only the pillar names are used, with descriptions written for this app. The pillar pages themselves were not read.
 */
export const awsWellArchitected: SourceContribution = {
  source: 'aws-well-architected',
  checked: '2026-11-14',
  categories: {
    'Cloud-native and platform practices': {
      'Performance efficiency': '',
      'Cost optimisation': '',
      'Operational excellence': '',
      Sustainability: 'Reducing the environmental impact of the workloads you run.',
    },
  },
}
