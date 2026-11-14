import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Social skills" (https://en.wikipedia.org/wiki/Interpersonal_skills, CC BY-SA 4.0, edited 25 October 2026).
 * Read: its lists of interpersonal skills, including the US Employment and Training Administration list, goal setting and building rapport. The address redirects to the Social skills article. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const socialSkillsWikipedia: SourceContribution = {
  source: 'social-skills-wikipedia',
  checked: '2026-11-14',
  categories: {
    Communication: {
      Communication: '',
      'Influencing others': '',
      'Active listening': 'Giving someone your full attention, so you understand what they mean and they feel heard.',
    },
    'Teamwork and collaboration': {
      'Teamwork and collaboration': '',
      'Goal setting and performance management': 'Agreeing goals with others and tracking progress toward them.',
    },
    'Leadership, coaching and facilitation': {
      Delegation: 'Handing over tasks together with the authority to do them, and supporting people while they do.',
    },
    'Conflict and negotiation': {
      Persuasion: '',
    },
    'Emotional and cultural intelligence': {
      Empathy: '',
      'Social skills': 'Handling relationships and getting along well with different people.',
      'Social perceptiveness': '',
    },
    'Culture, inclusion and safety': {
      'Building working relationships': 'Investing in strong, trusting relationships with colleagues.',
    },
    'Customers and stakeholders': {
      'Service orientation': '',
      'Showing care': 'Showing others that you care about their needs and wellbeing.',
      Hospitality: 'Making people feel welcome and looked after.',
      'Building rapport': 'Quickly establishing a comfortable, trusting connection with someone.',
    },
    'Personal effectiveness': {
      'Self-management': 'Setting your own goals, planning and checking your own progress.',
    },
  },
}
