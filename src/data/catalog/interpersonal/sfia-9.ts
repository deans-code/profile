import type { SourceContribution } from '../types'

/**
 * SFIA 9, the Skills Framework for the Information Age (https://sfia-online.org/en/the-sfia-framework/sfia-9),
 * published October 2024 by the SFIA Foundation. SFIA is used under licence and copying its material is prohibited, so
 * only the names of its generic attributes are used, with descriptions written for this app. Credited: Collaboration,
 * Communication, Improvement mindset, Creativity, Decision-making, Leadership, Learning and development, Planning,
 * Problem-solving, Adaptability and Influence. Autonomy, Complexity, Knowledge, Digital mindset and Security, privacy
 * and ethics are not interpersonal skills. The individual skills directory was not read.
 */
export const sfia9: SourceContribution = {
  source: 'sfia-9',
  checked: '2026-11-14',
  categories: {
    Communication: {
      Communication: '',
      'Influencing others': 'Persuading and guiding people and decisions, including those you have no authority over, by building credibility and trust.',
    },
    'Teamwork and collaboration': {
      'Teamwork and collaboration': '',
    },
    'Leadership, coaching and facilitation': {
      Leadership: '',
    },
    'Thinking and problem solving': {
      'Problem-solving': 'Breaking down difficult problems, finding root causes and working out practical solutions.',
      'Decision-making': 'Weighing options and evidence and committing to a clear choice, in proportion to the risk.',
      Creativity: 'Generating new ideas and approaches, and finding original ways to solve problems.',
      Planning: 'Organising work, time and resources so that goals are met and priorities are clear.',
    },
    'Personal effectiveness': {
      Adaptability: 'Adjusting quickly and positively to new situations, changing priorities and unfamiliar demands.',
      'Improvement mindset': 'Looking for ways to make your work, your team and your processes steadily better.',
      'Learning and development': 'Keeping your knowledge and skills up to date and helping others grow theirs.',
    },
  },
}
