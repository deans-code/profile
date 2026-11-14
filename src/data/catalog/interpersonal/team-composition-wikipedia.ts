import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Team composition" (https://en.wikipedia.org/wiki/Team_composition, CC BY-SA 4.0, edited 26 July 2026).
 * Read: the knowledge, skills and abilities needed for teamwork (Stevens and Campion): conflict resolution, collaborative problem solving, communication, goal setting, planning and task coordination. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const teamCompositionWikipedia: SourceContribution = {
  source: 'team-composition-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Teamwork and collaboration': {
      'Teamwork and collaboration': '',
      'Collaborative problem solving': 'Working through a problem together with the people it affects.',
      'Goal setting and performance management': '',
      'Planning and task coordination': 'Working out who does what and when, so the team’s work fits together.',
    },
    'Conflict and negotiation': {
      'Conflict resolution': 'Settling disagreements so people can work together again.',
    },
    'Personal effectiveness': {
      'Self-management': '',
    },
  },
}
