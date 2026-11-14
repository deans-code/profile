import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Team Role Inventories" (https://en.wikipedia.org/wiki/Team_Role_Inventories, CC BY-SA 4.0, edited 16 October 2026).
 * Read: the nine Belbin team roles (the address Belbin_Team_Inventory redirects to it). Role names are written as the skill of playing that role. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const teamRoleInventoriesWikipedia: SourceContribution = {
  source: 'team-role-inventories-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Team roles': {
      'Generating ideas (Plant)': 'Bringing creative, unconventional ideas to the team.',
      'Networking outside the team (Resource Investigator)': 'Exploring outside contacts and opportunities and bringing them back to the team.',
      'Chairing and delegating (Co-ordinator)': 'Clarifying goals, drawing out contributions and delegating work fairly.',
      'Driving the team on (Shaper)': 'Pushing the team to keep moving and overcome obstacles.',
      'Analysing options impartially (Monitor Evaluator)': 'Weighing options calmly and judging them accurately.',
      'Smoothing conflict (Teamworker)': 'Supporting teammates and easing friction so the team works well together.',
      'Turning ideas into action (Implementer)': 'Turning plans and ideas into practical, workable actions.',
      'Finishing carefully (Completer Finisher)': 'Checking details, catching errors and making sure work is finished properly.',
      'Deep specialist expertise (Specialist)': 'Bringing deep knowledge of one subject to the team.',
    },
  },
}
